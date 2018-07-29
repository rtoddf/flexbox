var isDefined = function(obj){
    return typeof(obj) !== 'undefined' && obj !== null ? obj : ''
}

function autoCenter(m){
    var bounds = new google.maps.LatLngBounds()
    $.each(m, function(index, marker){
        bounds.extend(marker.position)
    })
    map.fitBounds(bounds)
}

function SortByName(a, b){
	var aName = a.name.toLowerCase();
	var bName = b.name.toLowerCase(); 
	return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
}

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};