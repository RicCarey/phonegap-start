function listInitialize() {
    
    var listPois = window.searchResults.poi;
    for (var i = 0; i < listPois.length; i++) {
        var listPoi = listPois[i];
        $(".list-ul").append('<li><div>' + listPoi.name + '</div>' +
            '<ul><li>something else' + '</li></ul></li>'
        );

//        var marker = new google.maps.Marker({
//            position: new google.maps.LatLng(poi.lat, poi.lon),
//            map: map,
//            title: 
//        });

   }


    //list toggle
    $(".list-ul > li > ul").hide();
    $(".list-ul > li > div").click(function () {
        if ($(this).parent().children("ul").hasClass("slid_down")) {
            $(this).parent().children("ul").removeClass("slid_down").slideUp();
        } else {
            $(".slid_down").slideUp().removeClass("slid_down");
            $(this).parent().children("ul").addClass("slid_down").slideDown();
        }

    });


}


