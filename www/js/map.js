

function initialize() {
  

    var mapOptions = {
        zoom: 11,
        center: new google.maps.LatLng(window.searchResults.location.lat, window.searchResults.location.lon),

        mapTypeControl: false,
        //                mapTypeControlOptions: {
        //                    style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
        //                },
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL,
            position: google.maps.ControlPosition.RIGHT_TOP
        },
        panControl: true,
        panControlOptions: {

            position: google.maps.ControlPosition.TOP_LEFT

        },

        streetViewControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map(document.getElementById("map_canvas"),
      mapOptions);

    var pois = window.searchResults.poi;
    for (var i = 0; i < pois.length; i++) {
        var poi = pois[i];

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(poi.lat, poi.lon),
            map: map,
            title: poi.name
        });

        var contentString = '<div class="poi-description">' + 'poi' + '</div>';
        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        google.maps.event.addListener(marker, 'click', function () {
            infowindow.open(map, marker);
        }); 
    }
        

}


