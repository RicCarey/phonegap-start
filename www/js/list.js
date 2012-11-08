function listInitialize() {

    if (!window.searchResults) {
        navigator.notification.alert(
                    "An error has occurred attempting to load the list data, please try restarting the app.",
                    //callBackFunctionB, // Specify a function to be called 
                    'Error',
                    "OK"
                );
    }
    var locationText;
    if (window.poiType == "Nots-pharmacies") {
        locationText = "Pharmacies"

    } else if (window.poiType == "Nots-gps") {
        locationText = "GPs"

    } else if (window.poiType == "Nots-walkin-centre") {
        locationText = "Walk In Centres"

    } else if (window.poiType == "Nots-AE") {
        locationText = "A&Es"

    } else if (window.poiType == "Nots-C-Card-Sex-health") {
        locationText = "Sexual Health C-Card Scheme"
    }

    $(".introduction_text_content").remove();
    $(".introduction_text").append('<div class="introduction_text_content">Showing the nearest ' + window.searchResults.poi.length + ' result(s) for ' + locationText + '.</div> ').fadeIn();


    $(".list-ul li").remove();
    var listPois = window.searchResults.poi;


    for (var i = 0; i < listPois.length; i++) {
        var listPoi = listPois[i];



        var key;
        for (var d = 0, len = listPoi.detailsGroupOrder.length; d < len; d++) {
            var key = listPoi.detailsGroupOrder[d];
            //key, listPoi.details[key], listPoi.detailsPropertyOrder[key];
        }

        $(".list-ul").append('<li><div class="listtoggle" id="poiid_' + listPoi.id + '">' + listPoi.name + '</div>'
                    + '<ul class="details' + i + '"><li class="detail_title">' + key + '</ul></li>'
                );

        //listPoi.distance

        for (var p = 0, propLength = listPoi.detailsPropertyOrder[key].length; p < propLength; p++) {
            var propKey = listPoi.detailsPropertyOrder[key];
            $(".details" + i).append('<li><label>' + propKey[p] + ':</label><div class="details_info">' + listPoi.details[key][propKey[p]].replace(/\r\n|\r|\n/g, "<br />") + '</div></li>');
        }
       
       
    }

    $('#nav_toggle img').clone().appendTo(".listtoggle");
    $(".listtoggle").css("paddingRight", $('#nav_toggle img').width());
    


    //list toggle
    var lst = $(".listtoggle").click(function () {
        if ($(this).parent().children("ul").hasClass("slid_down")) {
            $(this).parent().children("ul").slideUp().removeClass("slid_down");
            $(this).children("img").attr("src", "images/icons/" + window.imageSize + "/toggle.png");
        } else {

            var top = $(this).data("scollPos");
            var functionScroolToView = function () {
//                $("html").animate({ scrollTop: top }, function () {
                   $(window).scrollTop(top);
//                });
            }

            $(".slid_down").slideUp().removeClass("slid_down");
            $(".listtoggle img").attr("src", "images/icons/" + window.imageSize + "/toggle.png");

            $(this).parent().children("ul").slideDown(function () {
                functionScroolToView();
            }).addClass("slid_down");

            $(this).children("img").attr("src", "images/icons/" + window.imageSize + "/toggle_rotated.png");
            functionScroolToView();

        }

    });
    function caclulateScollOffsets() {
        var detailsZeroParent = $(".details0").parent();
        var detailsZeroOffset = detailsZeroParent.offset();
        lst.each(function (i) {

            var listToggleOffset = $(this).parent().offset();
            var top = (listToggleOffset.top - detailsZeroOffset.top);
            $(this).data("scollPos", top);
        });
    }
    caclulateScollOffsets();
    $(window).on("resizeWindow", caclulateScollOffsets);

    if (!window.poiId == null || !window.poiId == "") {
        $("#" + window.poiId).click();
    }
    
}


