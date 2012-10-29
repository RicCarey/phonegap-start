var infowindow = null;

function initialize() {

    centreMap();

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



   var contentString = null;

   infowindow = new google.maps.InfoWindow({
	content: "holding..."
	});

    for (var i = 0; i < pois.length; i++) {
        var poi = pois[i];

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(poi.lat, poi.lon),
            map: map,
            title: poi.name,
            html: '<div class="poi-description"><a href="#" data-id="poiid_' + poi.id +'">' + poi.name + '</a></div>'
        });



        google.maps.event.addListener(marker, 'click', function () {
            map.setCenter(this.position);
            infowindow.setContent(this.html);
            infowindow.open(map, this);
        });  
    }

    var poiId;
    $(document).on("click", ".poi-description a", function (e) {
        e.preventDefault();
        poiId = $(this).attr("data-id");
                 $(".map_wrap").fadeOut(400, function () {
                                    $(".page_html").fadeIn(400).load("content/list.htm .page_body", function () {
                                        listInitialize();
                                       
                                    });
                                    
                });

    });      

}




