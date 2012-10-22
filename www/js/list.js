function listInitialize() {
    
    var listPois = window.searchResults.poi;
    for (var i = 0; i < listPois.length; i++) {
        var listPoi = listPois[i];
        $(".list-ul").append('<li><div>' + listPoi.name + '</div>' +
        'something else' + '</li>'
        );

//        var marker = new google.maps.Marker({
//            position: new google.maps.LatLng(poi.lat, poi.lon),
//            map: map,
//            title: 
//        });

   }


}


