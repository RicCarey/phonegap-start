var infowindow = null;

function initialize() {

    if (!window.searchResults){
        alert("An error has occurred attempting to load Google Maps, please restart the app.");
    }
    $("#map_canvas").remove();
    $(".map_wrap").append('<div id="map_canvas" style="width:100%; height:100%"></div>');
    var locationText;
    if (window.poiType == "Nots-pharmacies") {
        locationText = "Pharmacies"

    }else if (window.poiType == "Nots-gps") {
        locationText = "GPs"
    
     }else if (window.poiType == "Nots-walkin-centre") {
        locationText = "Walk In Centres"
    
     }else if (window.poiType == "Nots-AE") {
        locationText = "A&Es"
    
     }else if (window.poiType == "Nots-C-Card-Sex-health") {
        locationText = "Sexual Health C-Card Scheme"
    }
       
    $(".introduction_text_content").remove();
    $(".introduction_text").append('<div class="introduction_text_content">Showing the nearest ' + window.searchResults.poi.length + ' result(s) for ' + locationText + '. Try searching to refine results.</div> ').fadeIn();
    var mapWrapHeight = window.mapNewHeight - $(".introduction_text").height();
    $(".map_wrap").height(mapWrapHeight);
    var latlngbounds = new google.maps.LatLngBounds();

    centreMap();
    var centreOn = new google.maps.LatLng(window.searchResults.location.lat, window.searchResults.location.lon);
    var mapOptions = {
        zoom: 11,
        center: centreOn,

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

 
    map.setCenter(centreOn);
    latlngbounds.extend(centreOn);

   var contentString = null;

   infowindow = new google.maps.InfoWindow({
	content: "holding..."
	});


    for (var i = 0; i < pois.length; i++) {
        var poi = pois[i];
        var point = new google.maps.LatLng(poi.lat, poi.lon);

        var marker = new google.maps.Marker({
            position: point,
            map: map,
            title: poi.name,
            html: '<div class="poi-description"><a href="#" data-id="poiid_' + poi.id +'">' + poi.name + '</a></div>'
        });

        latlngbounds.extend(point);

        google.maps.event.addListener(marker, 'click', function () {
            map.setCenter(this.position);
            infowindow.setContent(this.html);
            infowindow.open(map, this);
        });  
    }
    var centre = function () {

        map.fitBounds(latlngbounds);


  
        var fixZoom = function () {
            if (map.getZoom() > 15) {
                map.setZoom(15);
            }
        }

        setTimeout(fixZoom, 200);
        fixZoom();

    }

    centre();

    $(document).on("click", ".poi-description a", function (e) {
        e.preventDefault();
        window.poiId = $(this).attr("data-id");
                 $(".map_wrap").fadeOut(400, function () {
                                    $(".list_html").fadeIn(400).load("content/list.htm .page_body", function () {
                                        listInitialize();
                                       
                                    });
                                    
                });

    });      

}




