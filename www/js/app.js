//fire after resize
var waitForFinalEvent = (function () {
    var timers = {};
    return function (callback, ms, uniqueId) {
        if (!uniqueId) {
            uniqueId = "Don't call this twice without a uniqueId";
        }
        if (timers[uniqueId]) {
            clearTimeout(timers[uniqueId]);
        }
        timers[uniqueId] = setTimeout(callback, ms);
    };
})();

//Global Variables
var scrollEnabled;
var screenHeight;
var windowWidth;
var windowHeight;
var scaleMeasure;
var scale;
var fontSize;
var homeContentHeight;
var homeContentHeightDiff;
var expanderMargin;
var biggestHeight;
var iconRows;
var listAnchorHeight;
var iconHeight;
var iconWidth;
var nhsLogoHeight;
var straplineHeight;
var straplineMargin;
var dpr;
var absoluteImageSize;
var imageSize;
var newImageHref;
var negativeHomeContentHeight;
var negativePageHeight;
var pageLoad;
var navMarign;
var tabGroupinnerHeight;

var naviagtionToggleHeight;
var mapPageChrome;

var mapPaddingTop;
var mapPadding;
var mapHeight;
var mapNewHeight;
var navHeight;
var lastScreenHeight;
var lastScreenWidth;
var resizeEnabled = true;
var navToggleHeight;
var negativeNavToggleHeight;
var tabGroupHeight;
function windowResize() {
    if (resizeEnabled) {

        $("body").removeClass("landscape").removeClass("portrait");
        $(".expander").hide();
        $("#nav_toggle").css("display", "none");
        $(".home_content").height("auto");
        $('.nav li .icon img').height("auto").css("maxWidth", "auto").width("auto").css("maxHeight", "auto");
        $('.nav li .label').height("auto");
        $("#tabgroup img").height("auto").width("auto");
        $("#tabgroup").width("1px").height("1px");
        $(".page_html").width("auto");
        $(".map_wrap").width("84%");
        iconHeight = 0;
        $(".home_content").css("marginTop", "0");

        //screen sizes
        screenHeight = screen.height;
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;



        //     $('meta[name=viewport]').attr('content', 'width=' + windowWidth + ', initial-scale=1, maximum-scale=1, user-scalable=no, height=' + windowHeight + ', target-densityDpi=device-dpi');

        //--orientation

        if (windowWidth > windowHeight) {
            $("body").addClass("landscape");
            scaleMeasure = windowHeight;
            $('meta[name=viewport]').attr('content', 'width=device-height, initial-scale=1.0, user-scalable=no, height=device-width, target-densityDpi=device-dpi');
        } else {
            $("body").addClass("portrait");
            scaleMeasure = windowWidth;
            $('meta[name=viewport]').attr('content', 'width=device-width, initial-scale=1.0, user-scalable=no, height=device-height, target-densityDpi=device-dpi');
        }

        //--font scale

        if (scaleMeasure > 240) {
            scale = scaleMeasure / 240;
            fontSize = (12 * scale) + "px";

            $("body").css("font-size", fontSize);
        }


        //get heights without icons
        homeContentHeight = $(".home_content").outerHeight(true);
        homeContentHeightDiff = windowHeight - homeContentHeight;

        if (homeContentHeight < windowHeight) {

            $(".home_content").height(homeContentHeight + homeContentHeightDiff);

        }

        //apply height differnece to box to expand down to bottom
        expanderMargin = $(".nav ul").css("marginTop");

        if ($("body").hasClass("content-page")) {
            homeContentHeightDiff = windowHeight - $("#nhs_logo").height();
            homeContentHeightDiff = homeContentHeightDiff - 40;
            navHeight = $(".nav").height();
            $(".home_content").css("marginTop", 0 - $(".home_content").height());

        }

        $(".expander").height(homeContentHeightDiff);
        $(".expander").show();
        //align labels
        biggestHeight = 0;
        $('.nav li .label').each(function (index) {
            biggestHeight = Math.max(biggestHeight, $(this).outerHeight(true));
        }).css("height", biggestHeight);
        //resize icons

        if ($("body").hasClass("portrait")) {
            iconRows = 4;
        } else {
            iconRows = 2;
        }
        listAnchorHeight = homeContentHeightDiff / iconRows;
        $('.nav li a').height(listAnchorHeight);

        iconHeight = listAnchorHeight - biggestHeight;

        $('.nav li .icon').height(Math.ceil(iconHeight));
        $('#nav_toggle img').height(Math.ceil(iconHeight) / 2).css("marginTop", 0 - Math.ceil(iconHeight) / 4);
        iconWidth = $(".nav ul li .icon").width();

        if (iconWidth > iconHeight) {
            $('.nav li .icon img').height(Math.ceil(iconHeight)).css("maxWidth", Math.ceil(iconWidth));
        } else {
            $('.nav li .icon img').width(Math.ceil(iconWidth)).css("maxheight", (iconHeight));
        }
   //    $("#nav_toggle").show();

        if (windowWidth > windowHeight) {
            nhsLogoHeight = $("#nhs_logo").height();
            straplineHeight = $("#strapline").height();
            straplineMargin = nhsLogoHeight - straplineHeight;
            $("#strapline").css("margin-top", straplineMargin / 2);
        };
        //tabgroup calc
        if ($("body").hasClass("portrait")) {
            $('#tabgroup, #tabgroup img').height(Math.ceil(iconHeight) / 1.5)
            $('#tabgroup').width(windowWidth * 0.9)
            $(".introduction_text").width("auto");
            $(".page_html, .list_html").width("auto");
        } else {
   
            $('#tabgroup').width(windowWidth * 0.10).height(windowHeight - $("#nav_toggle").outerHeight(true));
   
           

            $('#tabgroup img').width(windowWidth * 0.10)
            //account for tabgroup width in content
            $(".page_html").width(windowWidth * 0.86);
            $(".list_html").width(windowWidth * 0.86);
            $(".map_wrap").width(windowWidth * 0.72);
            $(".introduction_text").width(windowWidth * 0.78);
        }


        //icon resize

        //get high density 
        dpr = 1;

        if (window.devicePixelRatio !== undefined) {
            dpr = window.devicePixelRatio;
        }


        absoluteImageSize = Math.ceil(iconHeight);

        //calc which image to get
        if (167 < absoluteImageSize) {
            //ipad
            window.imageSize = 284;
        } else if (105 < absoluteImageSize && absoluteImageSize < 167) {
            //s3
            window.imageSize = 166;
        } else if (65 < absoluteImageSize && absoluteImageSize < 105) {
            //iphone4
            window.imageSize = 105;
        } else if (absoluteImageSize < 65) {
            //smaller
            window.imageSize = 65;
        }
        //if high density use double 
        if (dpr > 1) {
            window.imageSize = window.imageSize * 2;
        }
        //swap images


        $('.iconSrcSwap').each(function (index) {
            $(this).attr("src", $(this).attr("src").replace("/size/", "/" + window.imageSize + "/"));
        });


        //content page load

        negativeHomeContentHeight = 0 - $(".home_content").outerHeight(true);
        negativePageHeight = 0 - windowHeight;
//        if ($("#nav_toggle").is(':visible')) {
//            window.navToggleVis = false;
//        } else {
//            window.navToggleVis = true;
            $("#nav_toggle").show();
//        }
        
        navMarign = $(".nav").outerHeight(true) - $("#nav_toggle").outerHeight(true);
       
//        if (window.navToggleVis) {
//            $("#nav_toggle").hide();
//        }
       

        if ($("body").hasClass("content-page")) {


            if ($("body").hasClass("show_nav")) {

                $(".nav").css("marginTop", 0);

            } else {
                $(".nav").css("marginTop", 0);
                navMarign = $(".nav").outerHeight(true) - $("#nav_toggle").outerHeight(true);
                $(".nav").css("marginTop", 0 - navMarign);
            }
        }




        //  map navigate
        $(document).on("click", "#map a", function (e) {
            e.preventDefault();

            $(".page_html").fadeOut(400, function () {
                $(".list_html").fadeOut(400);
                //            $.getScript("js/map.js");
                $(".map_wrap").fadeIn(400, function () {
                    tabGroupinnerHeight = 10;

                    if ($("body").hasClass("portrait")) {
                        tabGroupinnerHeight = $("#tabgroup").innerHeight() + 20;
                    }
                    naviagtionToggleHeight = $("#nav_toggle").innerHeight();
                    mapPageChrome = naviagtionToggleHeight + 20 + tabGroupinnerHeight;

                    mapPaddingTop = $(".map_wrap").css("paddingTop") ;
                    mapPadding = parseInt(mapPaddingTop) * 2;
                    mapHeight = windowHeight - mapPageChrome;
                    window.mapNewHeight = mapHeight - (mapPadding + 20);

                    //$(".map_wrap").height(mapNewHeight);



                    $('html, body').animate({ scrollTop: 0 }, 'slow');
                    initialize();
                    searchForm();
                    //close menu if open
                    if ($("#nav_toggle").hasClass("fixed_nav_toggle")) {

                    } else {
                        $("#nav_toggle").click();
                    }

                });
            });

        });

        //give marign to account for nav toggle div
        navToggleHeight = $("#nav_toggle").innerHeight();
        negativeNavToggleHeight = 0 - navToggleHeight;
        $(".page_html, .introduction_text").css("margin-top", navToggleHeight + 20)
        //account for intotext


        //give marign to account for tabgroup div
        if ($("body").hasClass("portrait")) {
            tabGroupHeight = $("#tabgroup").innerHeight();
            $(".page_html").css("margin-bottom", tabGroupHeight + 30);
            $(".list_html").css("margin-bottom", tabGroupHeight + 20);
        }

        $(window).trigger("resizeWindow");
    }  
};

//NB - this needs to be bind so that the phone doesnt calculate the heights and such without images loaded.
//$(window).bind("load", function () {

//$(window).load(function () {
$(document).ready(function () {

    //disable scrolling
    scrollEnabled = false;
    $("html").on("touchmove", function (e) {
        if (!scrollEnabled) { e.preventDefault(); }
    });

    windowResize();
    $(".nav .internal-link a").click(function (e) {
        e.preventDefault();
        pageLoad = $(this).attr("href");
        window.poiType = $(this).attr("data-poitype");
        centreMap();

        if ($("body").hasClass("home")) {
            scrollEnabled = true;
            $("html,body").css("overflow", "auto");
            $(".nav").addClass("right_edge_rounded");
            $("#nav_toggle").show();
            $(".home_content").animate({
                marginTop: negativePageHeight
            }, 1250, function () {
                $("#nav_toggle").addClass("fixed_nav_toggle");
                $("#tabgroup").slideDown(function () {
                    $("body").removeClass("home");
                    $(".nav").css("position", "fixed").css("marginTop", 0 - navMarign);
                });

            });


            $(".page_html").show().load(pageLoad + " .page_body", function () {
                $.getJSON("http://poi.nationalservers.co.uk/v1/search?format=json&key=nottingham-city-nhs&" + window.jsonLocation + "&callback=?&limit=15&type=" + window.poiType, function (data) {
                    alert("http://poi.nationalservers.co.uk/v1/search?format=json&key=nottingham-city-nhs&" + window.jsonLocation + "&callback=?&limit=15&type=" + window.poiType);
                    window.searchResults = data;
                    if (window.poiType == "" || window.poiType == null) {
                        $("#map, #list").addClass("disabled");
                    } else {
                        $("#map, #list").removeClass("disabled");
                    }
                    $("#info").click(function (event) {
                        event.preventDefault();
                        $(".page_html, .map_wrap").fadeOut(400, function () {
                            $(".introduction_text").hide();
                            $(".list_html").hide();
                            $(".search").hide();
                            $(".page_html").fadeIn(400).load(pageLoad + " .page_body");


                        });

                        if ($("#nav_toggle").hasClass("fixed_nav_toggle")) {

                        } else {
                            $("#nav_toggle").click();
                        }

                    });

                    $("#list").click(function (listEvent) {
                        listEvent.preventDefault();
                        $(".map_wrap").fadeOut(400);
                        $(".page_html").fadeOut(400, function () {
                            $(".list_html").fadeIn(400).load("content/list.htm .page_body", function () {
                                listInitialize();
                                $("#second_search_label").click();
                                searchForm();
                                //                                
                                //                                $(".list-ul").css("marginTop", 0 - (navToggleHeight));
                            });

                        });
                        if ($("#nav_toggle").hasClass("fixed_nav_toggle")) {

                        } else {
                            $("#nav_toggle").click();
                        }

                    });

                });
            });

            $("body").addClass("content-page");
        } else {
            $(".page_html").fadeOut(400, function () {
                $(".map_wrap").fadeOut(400);
                $(".introduction_text").fadeOut(400);
                $(".list_html").fadeOut(400);
                $("#nav_toggle").click();
                $(".search").fadeOut(400);
                $(".page_html").fadeIn(400).load(pageLoad + " .page_body", function () {
                    $.getJSON("http://poi.nationalservers.co.uk/v1/search?format=json&key=nottingham-city-nhs&" + window.jsonLocation + "&callback=?&limit=15&type=" + window.poiType, function (data) {
                         window.searchResults = data;
                        if (window.poiType == "" || window.poiType == null) {
                            $("#map, #list").addClass("disabled");
                        } else {
                            $("#map, #list").removeClass("disabled");
                        }
                    });

                    $('html, body').animate({ scrollTop: 0 }, 'slow');
                });
            });

        }
    });

    //nav toggle business

    $("#nav_toggle").toggle(
    function () {
        $("#nav_toggle img").attr("src", "images/icons/" + window.imageSize + "/toggle_rotated.png");
        $("#nav_toggle").removeClass("fixed_nav_toggle");
        $("body").addClass("show_nav");
        $(".nav").animate({ marginTop: 0 }, 1250);
    },
    function () {

        $(".nav").animate({ marginTop: 0 - navMarign }, 1250, function () {
            $("#nav_toggle").addClass("fixed_nav_toggle");

        });
        $("#nav_toggle img").attr("src", "images/icons/" + window.imageSize + "/toggle.png");
        $("body").removeClass("show_nav");
    });

    $("#postocdeSearch").focus(function () {
        resizeEnabled = false;
    });
    $("#postocdeSearch").blur(function () {
        resizeEnabled = true;
    });
    //search submit
    $("#postcodesearchform").submit(function (e) {
        e.preventDefault();
        window.postcodeSearch = $("#postocdeSearch").val();
        $("#second_search_label").click();
        centreMap();
        $.getJSON("http://poi.nationalservers.co.uk/v1/search?format=json&key=nottingham-city-nhs&" + window.jsonLocation + "&callback=?&limit=15&type=" + window.poiType, function (data) {
            window.tempSearchResults = data;
            if (!window.tempSearchResults.location) {
                //                showMessage(
                //                   "The location you have searched for has not been recognised, try another location.",
                //                    function () {
                //                        //do nothing
                //                    },
                //                    'Error',
                //                    "OK"
                //                );
                navigator.notification.alert("The location you have searched for has not been recognised, try another location.", function () { }, 'Error', "OK");
            } else {
                window.searchResults = window.tempSearchResults;
                listInitialize();
                initialize();
            }
        });

    });

});

$(window).resize(function () {
    waitForFinalEvent(function () {



            windowResize();

    }, 500, "1");
});

function doOnOrientationChange() {
    switch (window.orientation) {
        case -90:
        case 90:
            waitForFinalEvent(function () {

               
                windowResize();
               

            }, 500, "1");
            break;
        default:
            waitForFinalEvent(function () {

              
                windowResize();
               

            }, 500, "1");
            break;
    }
}

window.onorientationchange = function () {
    doOnOrientationChange();
};

//window.onload = doOnOrientationChange();

function searchForm() {
    
    $(".search").show("slide", { direction: "left" }, 500);
    $("#first_search_label").click(function () {
        $(".search").width("90%");
        $("#first_search_label").hide();
        $(".searchform").show("slide", { direction: "left" }, 500, function () {
            $("#postocdeSearch").focus();
        });

    });
    $("#second_search_label").click(function () {
        $("#postocdeSearch").blur();
        $(".searchform").hide("slide", { direction: "left" }, 500, function () {
          
            $("#first_search_label").show();
            $(".search").width("auto");
        });
        
    });




};

//function showMessage(message, callback, title, buttonName) {

//    title = title || "default title";
//    buttonName = buttonName || 'OK';

//    if (navigator.notification && navigator.notification.alert) {

//        navigator.notification.alert(
//            message,    // message
//            callback,   // callback
//            title,      // title
//            buttonName  // buttonName
//        );

//    } else {

//        alert(message);
////        invoke(callback)
//    }

//};

function listInitialize() {

    if (!window.searchResults) {
        //          showMessage(
        //                    "An error has occurred attempting to load the list data, please try restarting the app.",
        //                    function(){},
        //                    'Error',
        //                    "OK"
        //                );

        navigator.notification.alert("An error has occurred attempting to load the list data, please try restarting the app.", function () { }, 'Error', "OK")
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
    $(".introduction_text").append('<div class="introduction_text_content">Showing the nearest ' + window.searchResults.poi.length + ' result(s) to "' + (window.searchResults.location.name || window.searchResults.location.postcode).toUpperCase() + '" for ' + locationText + '.</div> ').fadeIn();


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


var infowindow = null;

function initialize() {

    if (!window.searchResults) {
        alert("no search results");
        //        showMessage(
        //       
        //                    "An error has occurred attempting to load Google Maps, please restart the app.",
        //                    function(){},
        //                    'Error',
        //                    "OK"
        //                );
        navigator.notification.alert("An error has occurred attempting to load Google Maps, please restart the app.", function () {
            $.getJSON("http://poi.nationalservers.co.uk/v1/search?format=json&key=nottingham-city-nhs&" + window.jsonLocation + "&callback=?&limit=15&type=" + window.poiType, function (data) {
                window.searchResults = data;
                $(".map_wrap").remove();
                $("body").append('<div class="map_wrap"></div>');
                initialize();
            });
        }, 'Error', "OK");
        //        $(".map_wrap").remove();
    } else {
        alert("search results");
//        $("#map_canvas").remove();
//        $(".map_wrap").append('<div id="map_canvas" style="width:100%; height:100%"></div>');
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

        $(".introduction_text").append('<div class="introduction_text_content">Showing the nearest ' + window.searchResults.poi.length + ' result(s) to "' + (window.searchResults.location.name || window.searchResults.location.postcode).toUpperCase() + '" for ' + locationText + '.</div> ').fadeIn();
        var mapWrapHeight = window.mapNewHeight - $(".introduction_text").height();
        $(".map_wrap").height(mapWrapHeight);
        var latlngbounds = new google.maps.LatLngBounds();
        alert("before centre map");
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
                html: '<div class="poi-description"><a href="#" data-id="poiid_' + poi.id + '">' + poi.name + '</a></div>'
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

    }

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




