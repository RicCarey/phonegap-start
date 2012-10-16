function initialize() {
    var mapOptions = {
        zoom: 12,
        center: new google.maps.LatLng(52.954843, -1.160145),

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

}

