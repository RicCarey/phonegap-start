function listInitialize() {

    if (!window.searchResults) {
        alert("An error has occurred attempting to load the list data, please try restarting the app.");
    }

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






    //list toggle
    var lst = $(".listtoggle").click(function () {
        if ($(this).parent().children("ul").hasClass("slid_down")) {
            $(this).parent().children("ul").slideUp().removeClass("slid_down");
        } else {

            var top = $(this).data("scollPos");
            var functionScroolToView = function () {
                $("html, body").animate({ scrollTop: top }, function () {
                    $(window).scrollTop(top);
                });
            }

            $(".slid_down").slideUp().removeClass("slid_down");
            $(this).parent().children("ul").slideDown(function () {
                functionScroolToView();
            }).addClass("slid_down");
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


