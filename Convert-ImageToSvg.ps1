<#
.SYNOPSIS
    Converts one or more pixel art images into pixel-perfect SVG files.

.DESCRIPTION
    This script reads an input image pixel by pixel, groups pixels by color, and generates an optimized SVG file. 
    It combines adjacent horizontal pixels of the same color into a single SVG <path> element to minimize file size.

    The function is designed to work within the PowerShell pipeline, allowing you to pipe files directly from Get-ChildItem for batch conversions.

.PARAMETER LiteralPath
    The full path to the source image file(s) to be converted. Wildcards are not supported; use Get-ChildItem and pipe the results for multiple files.
    This parameter accepts file objects directly from the pipeline.

.PARAMETER OutputPath
    Specifies the output path.
    - If converting a single file, this can be a full path to the new .svg file.
    - If converting multiple files (via pipeline), this must be a path to a DIRECTORY where the SVG files will be saved.
    - If omitted, each SVG will be saved in the same directory as its source image.

.EXAMPLE
    # Convert a single image and save the SVG in the same folder
    .\Convert-ImageToSvg.ps1 -LiteralPath "C:\Art\character.png"

.EXAMPLE
    # Convert a single image and specify the output file name
    .\Convert-ImageToSvg.ps1 -LiteralPath ".\mario.png" -OutputPath ".\mario-vector.svg"

.EXAMPLE
    # Convert all PNG and JPG files in the current directory
    Get-ChildItem -Path . -Include *.png, *.jpg | .\Convert-ImageToSvg.ps1

.EXAMPLE
    # Convert all images in a folder and its subfolders, saving the SVGs to a single output directory
    Get-ChildItem -Path "C:\SourceArt" -Recurse -Include *.png, *.bmp | .\Convert-ImageToSvg.ps1 -OutputPath "C:\OutputSVGs"

.INPUTS
    System.String
    System.IO.FileInfo
    You can pipe file paths or FileInfo objects (from Get-ChildItem) to this cmdlet.

.OUTPUTS
    None
    This function does not output objects to the pipeline. It writes files directly to the disk.
#>
function Convert-ImageToSvg {
    [CmdletBinding(SupportsShouldProcess = $true)]
    param(
        [Parameter(Mandatory = $true,
                   Position = 0,
                   ValueFromPipeline = $true,
                   ValueFromPipelineByPropertyName = $true)]
        [Alias('FullName', 'ImagePath')]
        [string[]]$LiteralPath,

        [Parameter(Mandatory = $false)]
        [string]$OutputPath
    )

    begin {
        # --- Runs once before processing any input ---
        try {
            # Add System.Drawing assembly if not already loaded (for PowerShell 7+)
            Add-Type -AssemblyName System.Drawing.Common
            $supportedExtensions = @('.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff')
            Write-Verbose "Initialized with supported extensions: $($supportedExtensions -join ', ')"

            # If an OutputPath is provided, check if it's a valid directory for batch processing
            if ($OutputPath -and ($LiteralPath.Count -gt 1) -and (-not (Test-Path -Path $OutputPath -PathType Container))) {
                throw "When processing multiple files, the -OutputPath parameter must be a valid directory."
            }
        }
        catch {
            Write-Error $_.Exception.Message
            # Stop the pipeline if initialization fails
            $PSCmdlet.ThrowTerminatingError($_)
        }
    }

    process {
        # --- Runs for each item from the pipeline or passed to -LiteralPath ---
        foreach ($path in $LiteralPath) {
            
            $resolvedPath = Resolve-Path -LiteralPath $path -ErrorAction SilentlyContinue
            if (-not $resolvedPath) {
                Write-Warning "Could not resolve path: $path"
                continue
            }

            $file = Get-Item -LiteralPath $resolvedPath
            
            # Skip directories or unsupported file types
            if ($file.PSIsContainer -or $supportedExtensions -notcontains $file.Extension.ToLower()) {
                Write-Verbose "Skipping unsupported file or directory: $($file.Name)"
                continue
            }

            $bitmap = $null
            try {
                Write-Host "Processing: $($file.FullName)" -ForegroundColor Cyan
                
                # --- 1. Load Image ---
                $bitmap = [System.Drawing.Bitmap]::new($file.FullName)
                $colorGroups = @{}

                Write-Verbose "Reading $($bitmap.Width)x$($bitmap.Height) pixel data..."

                # --- 2. Group Pixels by Color ---
                for ($y = 0; $y -lt $bitmap.Height; $y++) {
                    for ($x = 0; $x -lt $bitmap.Width; $x++) {
                        $pixelColor = $bitmap.GetPixel($x, $y)
                        if ($pixelColor.A -eq 0) { continue }
                        $colorKey = "rgba($($pixelColor.R),$($pixelColor.G),$($pixelColor.B),$([math]::Round($pixelColor.A / 255.0, 2)))"
                        if (-not $colorGroups.ContainsKey($colorKey)) {
                            $colorGroups[$colorKey] = [System.Collections.Generic.List[System.Drawing.Point]]::new()
                        }
                        $colorGroups[$colorKey].Add([System.Drawing.Point]::new($x, $y))
                    }
                }

                Write-Verbose "Found $($colorGroups.Count) unique colors. Optimizing paths..."

                # --- 3. Convert Color Groups to SVG Paths ---
                $pathBuilder = [System.Text.StringBuilder]::new()
                foreach ($color in $colorGroups.Keys) {
                    $sortedPoints = $colorGroups[$color] | Sort-Object -Property Y, X
                    if ($sortedPoints.Count -eq 0) { continue }
                    
                    $dataBuilder = [System.Text.StringBuilder]::new()
                    $currentPathStartPoint = $sortedPoints[0]
                    $currentPathWidth = 1

                    for ($i = 1; $i -lt $sortedPoints.Count; $i++) {
                        if (($sortedPoints[$i].Y -eq $sortedPoints[$i-1].Y) -and ($sortedPoints[$i].X -eq ($sortedPoints[$i-1].X + 1))) {
                            $currentPathWidth++
                        } else {
                            $dataBuilder.Append("M$($currentPathStartPoint.X) $($currentPathStartPoint.Y)h$($currentPathWidth)") | Out-Null
                            $currentPathStartPoint = $sortedPoints[$i]
                            $currentPathWidth = 1
                        }
                    }
                    $dataBuilder.Append("M$($currentPathStartPoint.X) $($currentPathStartPoint.Y)h$($currentPathWidth)") | Out-Null
                    $pathBuilder.AppendLine("<path stroke=`"$color`" d=`"$($dataBuilder.ToString())`" />") | Out-Null
                }

                # --- 4. Assemble and Save the Final SVG File ---
                Write-Verbose "Assembling final SVG..."
                $svgHeader = "<svg xmlns=`"http://www.w3.org/2000/svg`" viewBox=`"0 -0.5 $($bitmap.Width) $($bitmap.Height)`" shape-rendering=`"crispEdges`">`n"
                $svgMetadata = "<metadata>Generated with PowerShell Convert-ImageToSvg</metadata>`n"
                $svgFooter = "</svg>"
                $finalSvg = $svgHeader + $svgMetadata + $pathBuilder.ToString() + $svgFooter
                
                # --- Determine final output path ---
                $finalOutputPath = ""
                $baseName = [System.IO.Path]::GetFileNameWithoutExtension($file.FullName)

                if ($OutputPath) {
                     # If OutputPath is a directory, save file inside it
                    if (Test-Path -Path $OutputPath -PathType Container) {
                        $finalOutputPath = Join-Path -Path $OutputPath -ChildPath "$baseName.svg"
                    } else {
                        # Otherwise, use it as the full file path (for single file conversions)
                        $finalOutputPath = $OutputPath
                    }
                } else {
                    # Default: Save alongside the source file
                    $finalOutputPath = Join-Path -Path $file.DirectoryName -ChildPath "$baseName.svg"
                }
                
                # --- Write the file to disk ---
                if ($PSCmdlet.ShouldProcess($finalOutputPath, "Create SVG from $($file.Name)")) {
                    Set-Content -Path $finalOutputPath -Value $finalSvg -Encoding UTF8
                    Write-Host "Success! SVG saved to: $finalOutputPath" -ForegroundColor Green
                }

            }
            catch {
                Write-Error "An error occurred while processing '$($file.FullName)': $($_.Exception.Message)"
            }
            finally {
                # Clean up the bitmap object to release the file lock
                if ($bitmap) {
                    $bitmap.Dispose()
                }
            }
        }
    }
}

# This check allows the script to be dot-sourced to import the function,
# or run directly to execute the function with command-line arguments.
if ($MyInvocation.MyCommand.CommandType -eq 'ExternalScript') {
    Convert-ImageToSvg @PSBoundParameters
}