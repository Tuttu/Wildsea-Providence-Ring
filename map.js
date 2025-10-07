hex = new OI.hexmap(document.getElementById('hexmap1'),{
	// Define the HexJSON - https://open-innovations.org/projects/hexmaps/hexjson
	'grid': {'show':true},
	'label': {
		'show': false,	// Show a label
		'clip': true, 
		format: txt => `${txt}`
	},
	//padding: 0,
	'patterns': [  
		'<pattern id="swirl-pattern" height="100%" width="100%" patternUnits="objectBoundingBox"><image href="data:image/svg+xml,<svg id=\'waves-7\' width=\'100%\' height=\'100%\' xmlns=\'http://www.w3.org/2000/svg\'><defs><pattern id=\'waves-7-pattern\' patternUnits=\'userSpaceOnUse\' width=\'35.584\' height=\'30.585\' patternTransform=\'scale(2) rotate(0)\'><rect x=\'0\' y=\'0\' width=\'100%\' height=\'100%\' fill=\'wheat\'/><path d=\'M36.908 9.243c-5.014 0-7.266 3.575-7.266 7.117 0 3.376 2.45 5.726 5.959 5.726 1.307 0 2.45-.463 3.244-1.307.744-.811 1.125-1.903 1.042-3.095-.066-.811-.546-1.655-1.274-2.185-.596-.447-1.639-.894-3.162-.546-.48.1-.778.58-.662 1.06.1.48.58.777 1.06.661.695-.149 1.274-.066 1.705.249.364.265.546.645.562.893.05.679-.165 1.308-.579 1.755-.446.48-1.125.744-1.936.744-2.55 0-4.188-1.538-4.188-3.938 0-2.466 1.44-5.347 5.495-5.347 2.897 0 6.008 1.888 6.388 6.058.166 1.804.067 5.147-2.598 7.034a.868.868 0 00-.142.122c-1.311.783-2.87 1.301-4.972 1.301-4.088 0-6.123-1.952-8.275-4.021-2.317-2.218-4.7-4.518-9.517-4.518-4.094 0-6.439 1.676-8.479 3.545.227-1.102.289-2.307.17-3.596-.496-5.263-4.567-7.662-8.159-7.662-5.015 0-7.265 3.574-7.265 7.116 0 3.377 2.45 5.727 5.958 5.727 1.307 0 2.449-.463 3.243-1.308.745-.81 1.126-1.903 1.043-3.095-.066-.81-.546-1.654-1.274-2.184-.596-.447-1.639-.894-3.161-.546-.48.1-.778.58-.662 1.06.099.48.579.777 1.059.66.695-.148 1.275-.065 1.705.25.364.264.546.645.563.893.05.679-.166 1.307-.58 1.754-.447.48-1.125.745-1.936.745-2.549 0-4.188-1.539-4.188-3.939 0-2.466 1.44-5.345 5.495-5.345 2.897 0 6.008 1.87 6.389 6.057.163 1.781.064 5.06-2.504 6.96-1.36.864-2.978 1.447-5.209 1.447-4.088 0-6.124-1.952-8.275-4.021-2.317-2.218-4.7-4.518-9.516-4.518v1.787c4.088 0 6.123 1.953 8.275 4.022 2.317 2.218 4.7 4.518 9.516 4.518 4.8 0 7.2-2.3 9.517-4.518 2.151-2.069 4.187-4.022 8.275-4.022s6.124 1.953 8.275 4.022c2.318 2.218 4.701 4.518 9.517 4.518 4.8 0 7.2-2.3 9.516-4.518 2.152-2.069 4.188-4.022 8.276-4.022s6.123 1.953 8.275 4.022c2.317 2.218 4.7 4.518 9.517 4.518v-1.788c-4.088 0-6.124-1.952-8.275-4.021-2.318-2.218-4.701-4.518-9.517-4.518-4.103 0-6.45 1.683-8.492 3.556.237-1.118.304-2.343.184-3.656-.497-5.263-4.568-7.663-8.16-7.663z\'  stroke-width=\'1\' stroke=\'none\' fill=\'hsla(47,80.9%,61%,1)\'/><path d=\'M23.42 41.086a.896.896 0 01-.729-.38.883.883 0 01.215-1.242c2.665-1.887 2.764-5.23 2.599-7.034-.38-4.187-3.492-6.058-6.389-6.058-4.055 0-5.495 2.88-5.495 5.346 0 2.4 1.639 3.94 4.188 3.94.81 0 1.49-.265 1.936-.745.414-.447.63-1.076.58-1.755-.017-.248-.2-.629-.547-.893-.43-.315-1.026-.398-1.704-.249a.868.868 0 01-1.06-.662.868.868 0 01.662-1.059c1.523-.348 2.566.1 3.161.546.729.53 1.209 1.374 1.275 2.185.083 1.191-.298 2.284-1.043 3.095-.794.844-1.936 1.307-3.244 1.307-3.508 0-5.958-2.35-5.958-5.726 0-3.542 2.25-7.117 7.266-7.117 3.591 0 7.663 2.4 8.16 7.663.347 3.79-.828 6.868-3.344 8.656a.824.824 0 01-.53.182zm0-30.585a.896.896 0 01-.729-.38.883.883 0 01.215-1.242c2.665-1.887 2.764-5.23 2.599-7.034-.381-4.187-3.493-6.058-6.389-6.058-4.055 0-5.495 2.88-5.495 5.346 0 2.4 1.639 3.94 4.188 3.94.81 0 1.49-.266 1.936-.746.414-.446.629-1.075.58-1.754-.017-.248-.2-.629-.547-.894-.43-.314-1.026-.397-1.705-.248A.868.868 0 0117.014.77a.868.868 0 01.662-1.06c1.523-.347 2.566.1 3.161.547.729.53 1.209 1.374 1.275 2.185.083 1.191-.298 2.284-1.043 3.095-.794.844-1.936 1.307-3.244 1.307-3.508 0-5.958-2.35-5.958-5.726 0-3.542 2.25-7.117 7.266-7.117 3.591 0 7.663 2.4 8.16 7.663.347 3.79-.828 6.868-3.344 8.656a.824.824 0 01-.53.182zm29.956 1.572c-4.8 0-7.2-2.3-9.517-4.518-2.151-2.069-4.187-4.022-8.275-4.022S29.46 5.486 27.31 7.555c-2.317 2.218-4.7 4.518-9.517 4.518-4.8 0-7.2-2.3-9.516-4.518C6.124 5.486 4.088 3.533 0 3.533s-6.124 1.953-8.275 4.022c-2.317 2.218-4.7 4.518-9.517 4.518-4.8 0-7.2-2.3-9.516-4.518-2.152-2.069-4.188-4.022-8.276-4.022V1.746c4.8 0 7.2 2.3 9.517 4.518 2.152 2.069 4.187 4.022 8.275 4.022s6.124-1.953 8.276-4.022C-7.2 4.046-4.816 1.746 0 1.746c4.8 0 7.2 2.3 9.517 4.518 2.151 2.069 4.187 4.022 8.275 4.022s6.124-1.953 8.275-4.022c2.318-2.218 4.7-4.518 9.517-4.518 4.8 0 7.2 2.3 9.517 4.518 2.151 2.069 4.187 4.022 8.275 4.022s6.124-1.953 8.275-4.022c2.317-2.218 4.7-4.518 9.517-4.518v1.787c-4.088 0-6.124 1.953-8.275 4.022-2.317 2.234-4.717 4.518-9.517 4.518z\'  stroke-width=\'1\' stroke=\'none\' fill=\'hsla(4.1,89.6%,58.4%,1)\'/></pattern></defs><rect width=\'800%\' height=\'800%\' transform=\'translate(0,0)\' fill=\'url(%23waves-7-pattern)\'/></svg>" x="0" y="0" width="25%" preserveAspectRatio="xMidYMid meet"></image></pattern>',
		'<pattern id="chevron-pattern" height="100%" width="100%" patternUnits="objectBoundingBox"><image href="data:image/svg+xml,<svg id=\'chevron\' width=\'100%\' height=\'100%\' xmlns=\'http://www.w3.org/2000/svg\'><defs><pattern id=\'chevron-pattern\' patternUnits=\'userSpaceOnUse\' width=\'20\' height=\'80\' patternTransform=\'scale(2) rotate(0)\'><rect x=\'0\' y=\'0\' width=\'100%\' height=\'100%\' fill=\'hsla(240,6.7%,17.6%,1)\'/><path d=\'M-5 5L5.1 15 15 5l10 10\'  stroke-linecap=\'square\' stroke-width=\'1\' stroke=\'hsla(47,80.9%,61%,1)\' fill=\'none\'/><path d=\'M-5 25L5.1 35 15 25l10 10\'  stroke-linecap=\'square\' stroke-width=\'1\' stroke=\'hsla(4.1,89.6%,58.4%,1)\' fill=\'none\'/><path d=\'M-5 45L5.1 55 15 45l10 10\'  stroke-linecap=\'square\' stroke-width=\'1\' stroke=\'hsla(186.8,100%,41.6%,1)\' fill=\'none\'/><path d=\'M-5 65L5.1 75 15 65l10 10\'  stroke-linecap=\'square\' stroke-width=\'1\' stroke=\'hsla(258.5,59.4%,59.4%,1)\' fill=\'none\'/></pattern></defs><rect width=\'800%\' height=\'800%\' transform=\'translate(0,0)\' fill=\'url(%23chevron-pattern)\'/></svg>" x="0" y="0" width="25%" preserveAspectRatio="xMidYMid meet"></image></pattern>',
		'<pattern id="wave-pattern" patternContentUnits="objectBoundingBox" width="1" height="1"><image href="wave.svg" preserveAspectRatio="xMidYMid meet" x="0" y="0" width="1" height="1"></image></pattern>'
	],
	'hexjson':{
	"layout":"odd-q",
	"originPoint": "left-top",
	"hexes": {
		"Top-Left":{"n":"0,0","q":0,"r":0},          
		"Bottom-Left":{"n":"00,31","q":0,"r":31},
		"Leafshadow":{"n":"Leafshadow Research Center","q":9,"r":11},
		"Fields1":{"n":"09,13","q":9,"r":13,"region":"Abundance"},
		"AbundanceAirship":{"n":"Observation Airship","q":9,"r":14},
		"SqwikerTrail":{"n":"Sqwiker's Trail","q":9,"r":15},
		"WillyWreck":{"n":"Willy's Ship wreck","q":9,"r":16},
		"RotipedeHive":{"n":"Caved-in Rotidepes Hive","q":10,"r":10},
		"Fields2":{"n":"10,12","q":10,"r":12,"region":"Abundance"},
		"Abundance":{"n":"Abundance","q":10,"r":13,"region":"Abundance"},
		"Providence":{"n":"Providence","q":10,"r":20},
		"CalmSea1":{"n":"Calm Sea","q":10,"r":11},
		"RotipedeTunnels":{"n":"Opened Rotipedes tunnels","q":11,"r":11},
		"Opulence":{"n":"Opulence","q":18,"r":11},
		"Repentance":{"n":"Repentance","q":22,"r":20},
		"Penitence":{"n":"Penitence","q":24,"r":14},
		"Bottom-Right":{"n":"35,31","q":35,"r":31}
	},
	"boundaries": {		
		"Abundance": {
			"type": "region",
			"edges": [
				{"q":10,"r":12,"e":1},
				{"q":10,"r":12,"e":2},				
				{"q":10,"r":12,"e":6},
				{"q":11,"r":12,"e":1},
				{"q":11,"r":12,"e":2},
				{"q":11,"r":12,"e":3},
				{"q":11,"r":13,"e":2},
				{"q":11,"r":13,"e":3},
				{"q":11,"r":13,"e":4},
				{"q":10,"r":14,"e":3},
				{"q":10,"r":14,"e":4},
				{"q":10,"r":14,"e":5},
				{"q":9,"r":13,"e":4},
				{"q":9,"r":13,"e":5},
				{"q":9,"r":13,"e":6},
				{"q":9,"r":12,"e":5},
				{"q":9,"r":12,"e":6},
				{"q":9,"r":12,"e":1}
			]
		}
	}
	},
// NEW: This array is for images that should grow with the hex.
'overflowImages': [
	{
		'src': 'Providence.svg',      // Path to your image
		'hex': 'Providence',          // The ID of the hex to anchor to
		'width': 49,            // The desired width in pixels
		'height': 35,           // The desired height in pixels
	},
	{
		'src': 'Abundance.svg',
		'hex': 'Abundance',
		'width': 61,
		'height': 30
	},
	{
		'src': 'Opulence.svg',
		'hex': 'Opulence',
		'width': 69,
		'height': 44
	},
	{
		'src': 'Fields.svg',
		'hex': 'Fields1',
		'width': 30,
		'height': 25
	},
	{
		'src': 'Fields.svg',
		'hex': 'Fields2',
		'width': 30,
		'height': 25
	},
	{
		'src': 'Wreck.svg',
		'hex': 'WillyWreck',
		'width': 31,
		'height': 25
	},
	{
		'src': 'AirShip.svg',
		'hex': 'AbundanceAirship',
		'width': 24,
		'height': 19
	},
	{
		'src': 'Trail.svg',
		'hex': 'SqwikerTrail',
		'width': 26,
		'height': 22
	},
	{
		'src': 'Trail.svg',
		'hex': 'RotipedeTunnels',
		'width': 26,
		'height': 22
	},
	{
		'src': 'CalmSea.svg',
		'hex': 'CalmSea1',
		'width': 30,
		'height': 24
	},
	{
		'src': 'Hole.svg',
		'hex': 'Leafshadow',
		'width': 30,
		'height': 25
	},
	{
		'src': 'Hole.svg',
		'hex': 'RotipedeHive',
		'width': 30,
		'height': 25
	}
],
// NEW SETTING to add images to the top layer
'images': [
{
	'src': 'Label-Providence.png',
	'hex': 'Providence',
	'dx': 0,
	'dy': 30,
	'width': 103,
	'height': 26
	},
{
	'src': 'Label-Abundance.png',
	'hex': 'Abundance',
	'dx': 0,
	'dy': 30,
	'width': 103,
	'height': 26
	},
{
	'src': 'Label-Opulence.png',
	'hex': 'Opulence',
	'dx': 0,
	'dy': 30,
	'width': 103,
	'height': 26
	},
{
	'src': 'Label-Repentance.png',
	'hex': 'Repentance',
	'dx': 0,
	'dy': 30,
	'width': 103,
	'height': 26
	},
{
	'src': 'Label-Penitence.png',
	'hex': 'Penitence',
	'dx': 0,
	'dy': 30,
	'width': 103,
	'height': 26
	},
{
	'src': 'Dark-Mist.png',
	'hex': 'Providence',
	'dx': 155,
	'dy': -77,
	'width': 286,
	'height': 274
	},
{
	'src': 'compass.png',
	'hex': 'Bottom-Left',
	'dx': 50,
	'dy': -50,
	'width': 67,
	'height': 71
	}
],

// START: Added 'ready' function for legend setup
// This function is called by the library only after the map is fully initialized
// MODIFICATION: The 'ready' function is updated to handle boundary highlighting


ready: function() {
// 'this' refers to the hex map instance ('hex')
const poiLegendItems = document.querySelectorAll('#poi-legend li');
const regionLegendItems = document.querySelectorAll('#region-legend li');

// --- 1. Setup for POI (Hexagon) Highlighting ---
poiLegendItems.forEach(item => {
	const hexId = item.getAttribute('data-hex-id');
	
	// Ensure the hex exists in the map's data
	if (hexId && this.areas[hexId]) {
		// On mouseover, focus ONLY on the hex
		item.addEventListener('mouseover', () => {
			this.regionFocus(hexId);
		});

		// On mouseout, blur ONLY the hex
		item.addEventListener('mouseout', () => {
			this.regionBlur(hexId);
		});
	}
});

// --- 2. Setup for Region (Boundary) Highlighting ---
regionLegendItems.forEach(item => {
	const regionId = item.getAttribute('data-region-id');

	// Ensure the boundary line exists in the map's data
	const boundaryPath = this.lines[regionId];
	if (regionId && boundaryPath) {
		
		// On mouseover, highlight ONLY the boundary line
		item.addEventListener('mouseover', () => {
			boundaryPath.classList.add('boundary-highlight');
		});

		// On mouseout, remove the highlight ONLY from the boundary line
		item.addEventListener('mouseout', () => {
			boundaryPath.classList.remove('boundary-highlight');
		});
	}
});
}
});

// --- Tooltip Interactivity ---

// Your existing mouseover code with one addition to make it visible
hex.on('mouseover',function(e){
var svg, tip, bb, bbo, hexEl;
svg = e.data.hexmap.el;
hexEl = e.target; // The hexagon SVG element being hovered

// Get any existing tooltip for this hexmap
tip = svg.querySelector('.tooltip');
if(!tip){
	// Add a new tooltip
	tip = document.createElement('div');
	tip.classList.add('tooltip');
	svg.appendChild(tip);
}

// --- ADD THIS LINE ---
// Ensure the tooltip is visible when hovering a new hex
tip.style.display = 'block';

// Update contents of tooltip
// Added a fallback in case a hex has no region
tip.innerHTML = e.data.data.n+' ('+e.data.data.q+','+e.data.data.r+')<br />Region: '+(e.data.data.region || 'N/A');

// Update position of tooltip
bb = hexEl.getBoundingClientRect();
bbo = svg.getBoundingClientRect();
tip.style.left = Math.round(bb.left + bb.width/2 - bbo.left + svg.scrollLeft)+'px';
tip.style.top = Math.round(bb.top + bb.height/2 - bbo.top)+'px';
});


// --- ADD THIS NEW EVENT HANDLER ---
// This function will hide the tooltip when the mouse leaves a hexagon.
hex.on('mouseout', function(e){
var svg = e.data.hexmap.el;
var tip = svg.querySelector('.tooltip');
if(tip) {
	// Hide the tooltip
	tip.style.display = 'none';
}
});