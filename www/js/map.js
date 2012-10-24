

function initialize() {
    //set default long and lat
    var centreOnLong = window.searchResults.location.lon;
    var centreOnLat = window.searchResults.location.lat;
    
    centreOnLong = prompt("Please enter your name");
//    // Wait for PhoneGap to load
//    //
//    document.addEventListener("deviceready", onDeviceReady, false);
//    // PhoneGap is ready
//    //
//    function onDeviceReady() {
//        navigator.geolocation.getCurrentPosition(onSuccess, onError);
//    }
//    // onSuccess Geolocation
//    //
//    function onSuccess(position) {
//        //    var element = document.getElementById('geolocation');
//        //    element.innerHTML = 'Latitude: ' + position.coords.latitude + '<br />' +
//        //                            'Longitude: ' + position.coords.longitude + '<br />' +
//        //                            'Altitude: ' + position.coords.altitude + '<br />' +
//        //                            'Accuracy: ' + position.coords.accuracy + '<br />' +
//        //                            'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '<br />' +
//        //                            'Heading: ' + position.coords.heading + '<br />' +
//        //                            'Speed: ' + position.coords.speed + '<br />' +
//        //                            'Timestamp: ' + new Date(position.timestamp) + '<br />';
//        centreOnLong = position.coords.longitude;
//        centreOnLat = position.coords.latitude;
//        alert("changed pos");
//    }
//    // onError Callback receives a PositionError object
//    //
//    //function onError(error) {
//    //    alert('code: ' + error.code + '\n' +
//    //              'message: ' + error.message + '\n');
//    //}

    var mapOptions = {
        zoom: 12,
        center: new google.maps.LatLng(centreOnLat, centreOnLong),
//        center: new google.maps.LatLng(window.searchResults.location.lat, window.searchResults.location.lon),

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


