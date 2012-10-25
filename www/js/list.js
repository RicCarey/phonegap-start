function listInitialize() {
    
    var listPois = window.searchResults.poi;


    for (var i = 0; i < listPois.length; i++) {
        var listPoi = listPois[i];



        var key;
        for (var d = 0, len = listPoi.detailsGroupOrder.length; d < len; d++) {
            var key = listPoi.detailsGroupOrder[d];
            //key, listPoi.details[key], listPoi.detailsPropertyOrder[key];
        }

        $(".list-ul").append('<li><div class="listtoggle">' + listPoi.name + '</div>'
                    + '<ul class="details' + i + '"><li class="detail_title">' + key + '</ul></li>'
                );

        //listPoi.distance

        for (var p = 0, propLength = listPoi.detailsPropertyOrder[key].length; p < propLength; p++) {
            var propKey = listPoi.detailsPropertyOrder[key];
            $(".details" + i).append('<li><label>' + propKey[p] + ':</label><div class="details_info">' + listPoi.details[key][propKey[p]] + '</div></li>');
        }
    }

//    if (poi.details) {
//        for (var i = 0, len = poi.detailsGroupOrder.length; i < len; i++) {
//            var key = poi.detailsGroupOrder[i];
//            AllSections.push(createSection(key, poi.details[key], poi.detailsPropertyOrder[key]));
//        }
//    }


//    for (var key in p) {
//        if (p.hasOwnProperty(key)) {
//            alert(key + " -> " + p[key]);
//        }
//    }



    //list toggle
    $(".listtoggle").click(function () {
        if ($(this).parent().children("ul").hasClass("slid_down")) {
            $(this).parent().children("ul").removeClass("slid_down").slideUp();
        } else {
            $(".slid_down").slideUp().removeClass("slid_down");
            $(this).parent().children("ul").addClass("slid_down").slideDown();
        }

    });


}


