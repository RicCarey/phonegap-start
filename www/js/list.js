function listInitialize() {

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
            $(".details" + i).append('<li><label>' + propKey[p] + ':</label><div class="details_info">' + listPoi.details[key][propKey[p]].replace("/n","<br />/n") + '</div></li>');
        }

       
    }




    //list toggle
    $(".listtoggle").click(function () {
        //        alert("hello world");
        if ($(this).parent().children("ul").hasClass("slid_down")) {
            $(this).parent().children("ul").slideUp().removeClass("slid_down");
        } else {
            $(".slid_down").slideUp().removeClass("slid_down");
            var detailsZeroParent = $(".details0").parent();
            var detailsZeroOffset = detailsZeroParent.offset();
            var detailsZeroOffsetDouble = detailsZeroOffset.top * 1.5;
            var listToggleOffset = $(this).offset();
            $(window).scrollTop(listToggleOffset.top - detailsZeroOffset.top);
            $(this).parent().children("ul").slideDown().addClass("slid_down");
        }

    });

    if (!window.poiId == null || !window.poiId == "") {
        $("#" + window.poiId).click();
    }

}


