function docReady() {
    $("body").removeClass("landscape, portrait");

    //disable scrolling
    var scrollEnabled = false;
    $("html").on("touchmove", function (e) {
        if (!scrollEnabled) { e.preventDefault(); }
    });

    //screen sizes

    var screenHeight = screen.height;
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    //    var windowWidth = screen.width;
    //    var windowHeight = screen.height;

    //--orientation
    var scaleMeasure;
    if (windowWidth > windowHeight) {
        $("body").addClass("landscape");
        scaleMeasure = windowHeight;
    } else {
        $("body").addClass("portrait");
        scaleMeasure = windowWidth;
    }

    //--font scale

    if (scaleMeasure > 240) {
        var scale = scaleMeasure / 240;
        var fontSize = (12 * scale) + "px";

        $("body").css("font-size", fontSize);
    }


    //-- navfit/icons load

    //    var headerHeight = $(".header").height();
    //    var navHeight = windowHeight - headerHeight;
    //    var currentNavHeight = $(".nav").height();
    //    var navDiffernece = navHeight - currentNavHeight;
    //    $(".nav li").css("margin-bottom", Math.ceil(navDiffernece / 3));



    //get heights without icons
    var homeContentHeight = $(".home_content").outerHeight(true);
    var homeContentHeightDiff = windowHeight - homeContentHeight;

    if (homeContentHeight < windowHeight) {

        //        $("html").height(windowHeight);
        //        $("body").height(windowHeight);
        $(".home_content").height(homeContentHeight + homeContentHeightDiff);

    }

    //apply height differnece to box to expand down to bottom
    var expanderMargin = $(".nav ul").css("marginTop");
    $(".expander").height(homeContentHeightDiff);
    $(".expander").show();
    //align labels
    var biggestHeight = 0;
    $('.nav li .label').each(function (index) {
        biggestHeight = Math.max(biggestHeight, $(this).outerHeight(true));
    }).css("height", biggestHeight);
    //resize icons
    var iconRows;
    if ($("body").hasClass("portrait")) {
        iconRows = 4;
    } else {
        iconRows = 2;
    }
    var listAnchorHeight = homeContentHeightDiff / iconRows;
    $('.nav li a').height(listAnchorHeight);

    var iconHeight = listAnchorHeight - biggestHeight;

    //    var iconLabelSpace = biggestHeight * iconRows;
    //    var totalIconHeight = homeContentHeightDiff - iconLabelSpace;
    //    var iconHeight = totalIconHeight / iconRows;
    //    
    $('.nav li .icon').height(Math.ceil(iconHeight));

    var iconWidth = $(".nav ul li .icon").width();

    if (iconWidth > iconHeight) {
        $('.nav li .icon img').height(Math.ceil(iconHeight)).css("maxWidth", Math.ceil(iconWidth));
    } else {
        $('.nav li .icon img').width(Math.ceil(iconWidth)).css("maxheight", (iconHeight));
    }
    $("#nav_toggle").show();

    if (windowWidth > windowHeight) {
        var nhsLogoHeight = $("#nhs_logo").height();
        var straplineHeight = $("#strapline").height();
        var straplineMargin = nhsLogoHeight - straplineHeight;
        $("#strapline").css("margin-top", straplineMargin / 2);
    };
    //tabgroup calc
    if ($("body").hasClass("portrait")) {
        $('#tabgroup, #tabgroup img').height(Math.ceil(iconHeight));
    } else {
        $('#tabgroup').width(windowWidth * 0.10).height(windowHeight - $("#nav_toggle").outerHeight(true));
        $('#tabgroup img').width(windowWidth * 0.10)
        //account for tabgroup width in content
        $(".page_html").width(windowWidth * 0.88);
        $(".map_wrap").width(windowWidth * 0.78);
    }


    //icon resize

    //get high density 
    var dpr = 1;

    if (window.devicePixelRatio !== undefined) {
        dpr = window.devicePixelRatio;
    }


    var absoluteImageSize = Math.ceil(iconHeight);
    var imageSize;
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
    var newImageHref;

    $('.iconSrcSwap').each(function (index) {
        $(this).attr("src", $(this).attr("src").replace("/size/", "/" + imageSize + "/"));
    });


    //content page load

    var negativeHomeContentHeight = 0 - $(".home_content").outerHeight(true);
    var negativePageHeight = 0 - windowHeight;

    var pageLoad;
    var navMarign = $(".nav").outerHeight(true) - $("#nav_toggle").outerHeight(true);

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




    //  map navigate
    $(document).on("click", "#map a", function (e) {
        e.preventDefault();

        $(".page_html").fadeOut(400, function () {
            //            $.getScript("js/map.js");
            $(".map_wrap").fadeIn(400, function () {
                var tabGroupinnerHeight = 10;

                if ($("body").hasClass("portrait")) {
                    tabGroupinnerHeight = $("#tabgroup").innerHeight() + 20;
                }
                var naviagtionToggleHeight = $("#nav_toggle").innerHeight();
                var mapPageChrome = naviagtionToggleHeight + 20 + tabGroupinnerHeight;

                var mapPaddingTop = $(".map_wrap").css("paddingTop");
                var mapPadding = parseInt(mapPaddingTop) * 2;
                var mapHeight = windowHeight - mapPageChrome;
                var mapNewHeight = mapHeight - mapPadding;

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
};

//NB - this needs to be bind so that the phone doesnt calculate the heights and such without images loaded.
//$(window).bind("load", function () {

//$(window).load(function () {
$(document).ready(function () {
    docReady();

});

$(window).resize(function () {
    docReady();
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