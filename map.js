hex = new OI.hexmap(document.getElementById('hexmap1'),{
	// Define the HexJSON - https://open-innovations.org/projects/hexmaps/hexjson
    'grid': {'show':true},
    'label': {
		'show': true,	// Show a label
		'clip': true
    },
	'hexjson':{
		"layout":"odd-q",
        'minCoordinates': "left-top",
		"hexes": {
            "G":{"n":"0,0","q":0,"r":0},
            "A":{"n":"0,1","q":0,"r":1},
            "B":{"n":"1,0","q":1,"r":0},
            "I":{"n":"0,31","q":0,"r":31},
            "L":{"n":"34,0","q":34,"r":0},
            "J":{"n":"35,0","q":35,"r":0},
            "K":{"n":"35,31","q":35,"r":31}
		}
	}
});