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

function windowResize() {
   


    //screen sizes
     screenHeight = screen.height;
     windowWidth = window.innerWidth;
     windowHeight = window.innerHeight;


    //--orientation
    
    if (windowWidth > windowHeight) {
        $("body").addClass("landscape");
        scaleMeasure = windowHeight;
    } else {
        $("body").addClass("portrait");
        scaleMeasure = windowWidth;
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

    iconWidth = $(".nav ul li .icon").width();

    if (iconWidth > iconHeight) {
        $('.nav li .icon img').height(Math.ceil(iconHeight)).css("maxWidth", Math.ceil(iconWidth));
    } else {
        $('.nav li .icon img').width(Math.ceil(iconWidth)).css("maxheight", (iconHeight));
    }
    $("#nav_toggle").show();

    if (windowWidth > windowHeight) {
         nhsLogoHeight = $("#nhs_logo").height();
         straplineHeight = $("#strapline").height();
         straplineMargin = nhsLogoHeight - straplineHeight;
        $("#strapline").css("margin-top", straplineMargin / 2);
    };
    //tabgroup calc
    if ($("body").hasClass("portrait")) {
        $('#tabgroup, #tabgroup img').height(Math.ceil(iconHeight));
        $('#tabgroup').width(windowWidth * 0.9)
    } else {
        $('#tabgroup').width(windowWidth * 0.10).height(windowHeight - $("#nav_toggle").outerHeight(true));
        $('#tabgroup img').width(windowWidth * 0.10)
        //account for tabgroup width in content
        $(".page_html").width(windowWidth * 0.88);
        $(".map_wrap").width(windowWidth * 0.78);
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
        imageSize = 284;
    } else if (105 < absoluteImageSize && absoluteImageSize < 165) {
        //s3
        imageSize = 166;
    } else if (65 < absoluteImageSize && absoluteImageSize < 105) {
        //iphone4
        imageSize = 105;
    } else if (absoluteImageSize < 65) {
        //smaller
        imageSize = 65;
    }
    //if high density use double 
    if (dpr > 1) {
        imageSize = imageSize * 2;
    }
    //swap images
   

    $('.iconSrcSwap').each(function (index) {
        $(this).attr("src", $(this).attr("src").replace("/size/", "/" + imageSize + "/"));
    });


    //content page load

     negativeHomeContentHeight = 0 - $(".home_content").outerHeight(true);
     negativePageHeight = 0 - windowHeight;

     navMarign = $(".nav").outerHeight(true) - $("#nav_toggle").outerHeight(true);






    //  map navigate
    $(document).on("click", "#map a", function (e) {
        e.preventDefault();

        $(".page_html").fadeOut(400, function () {
            //            $.getScript("js/map.js");
            $(".map_wrap").fadeIn(400, function () {
                 tabGroupinnerHeight = 10;

                if ($("body").hasClass("portrait")) {
                    tabGroupinnerHeight = $("#tabgroup").innerHeight() + 20;
                }
                 naviagtionToggleHeight = $("#nav_toggle").innerHeight();
                 mapPageChrome = naviagtionToggleHeight + 20 + tabGroupinnerHeight;

                 mapPaddingTop = $(".map_wrap").css("paddingTop");
                 mapPadding = parseInt(mapPaddingTop) * 2;
                 mapHeight = windowHeight - mapPageChrome;
                 mapNewHeight = mapHeight - mapPadding;

                $(".map_wrap").height(mapNewHeight);



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
                    window.searchResults = data;
                    if (window.poiType == "" || window.poiType == null) {
                        $("#map, #list").addClass("disabled");
                    } else {
                        $("#map, #list").removeClass("disabled");
                    }
                    $("#info").click(function (event) {
                        event.preventDefault();
                        $(".page_html, .map_wrap").fadeOut(400, function () {
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
                            $(".page_html").fadeIn(400).load("content/list.htm .page_body", function () {
                                listInitialize();
                                searchForm();
                            });

                        });
                        if ($("#nav_toggle").hasClass("fixed_nav_toggle")) {

                        } else {
                            $("#nav_toggle").click();
                        }

                    });

                });
            });
            $.getScript("js/app_page.js");
            $("body").addClass("content-page");
        } else {
            $(".page_html").fadeOut(400, function () {
                $(".map_wrap").fadeOut(400);
                $("#nav_toggle").click();

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
    //var headerHeight = $(".header").height();
    // var oldMarignTop;
    $("#nav_toggle").toggle(
    function () {
        //$('html, body').animate({ scrollTop: 0 }, 'slow');
        //return false;
        $("#nav_toggle").removeClass("fixed_nav_toggle");
        //   oldMarignTop = $(".home_content").css("margin-top");
        //    $(".home_content").animate({ marginTop: 0 - headerHeight }, 2500);
        $(".nav").animate({ marginTop: 0 }, 1250);
    },
    function () {

        //$(".home_content").animate({ marginTop: oldMarignTop }, 2500, function () {
        $(".nav").animate({ marginTop: 0 - navMarign }, 1250, function () {
            $("#nav_toggle").addClass("fixed_nav_toggle");
        });
    });
});

$(window).resize(function () {
    waitForFinalEvent(function () {
        $("body").removeClass("landscape").removeClass("portrait");
        $(".expander").hide();
        $("#nav_toggle").hide();
        $(".home_content").height("auto");
        $('.nav li .icon img').height("auto").css("maxWidth", "auto").width("auto").css("maxHeight", "auto");
        $('.nav li .label').height("auto");
        $("#tabgroup img").height("auto").width("auto");
        $("#tabgroup").width("1px").height("1px");
        $(".page_html").width("auto");
        $(".map_wrap").width("auto");
        windowResize();

    }, 500, "1");
});

function searchForm() {
    
    $(".search").show("slide", { direction: "left" }, 500);
    $("#first_search_label").click(function () {
        $("#first_search_label").hide();
        $(".searchform").show("slide", { direction: "left" }, 500);
    });
    $("#second_search_label").click(function () {
        $(".searchform").hide("slide", { direction: "left" }, 500, function () {
            $("#first_search_label").show();
        });
        
    });

    $("#postcodesearchform").submit(function (e) {
        e.preventDefault();
        window.postcodeSearch = $("#postocdeSearch").val();
        centreMap();
        $.getJSON("http://poi.nationalservers.co.uk/v1/search?format=json&key=nottingham-city-nhs&" + window.jsonLocation + "&callback=?&limit=15&type=" + window.poiType, function (data) {
            window.searchResults = data;
            listInitialize();
            initialize();
            $("#second_search_label").click();
        });

    });
    

};