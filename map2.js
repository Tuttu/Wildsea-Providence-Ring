S(document).ready(function(){
	var hexmap = S.hexmap('hexmap1',{
		'formatLabel': function(id,hex){
			// "id" = unique ID of the hex
			// "hex" = object containing the properties of the specific hex
			str = hex.n
			str += '<div class="default">Default</div>'
			str += '<div class="when-selected">Hover</div>';
			return str;
		}
	});

	hexmap.positionHexes().resize();
});