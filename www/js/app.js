//NB - this needs to be bind so that the phone doesnt calculate the heights and such without images loaded.
//$(window).bind("load", function () {
$(window).load(function () {
    var windowWidth = screen.width;
    var windowHeight = screen.height;

    //REMOVE THIS SNIFFING BEFORE GOING LIVE PLEASE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //REMOVE THIS SNIFFING BEFORE GOING LIVE PLEASE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //REMOVE THIS SNIFFING BEFORE GOING LIVE PLEASE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //REMOVE THIS SNIFFING BEFORE GOING LIVE PLEASE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    if (navigator.userAgent.indexOf("Firefox") != -1) {
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
    }
    //REMOVE THIS SNIFFING BEFORE GOING LIVE PLEASE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //REMOVE THIS SNIFFING BEFORE GOING LIVE PLEASE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //REMOVE THIS SNIFFING BEFORE GOING LIVE PLEASE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //REMOVE THIS SNIFFING BEFORE GOING LIVE PLEASE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

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
        $(".home_content").height(homeContentHeight + homeContentHeightDiff);
    }
    //apply height differnece to box to expand down to bottom
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
        iconRows = 3;
    } else {
        iconRows = 2;
    }
    var iconLabelSpace = biggestHeight * iconRows;
    var totalIconHeight = homeContentHeightDiff - iconLabelSpace;
    $('.nav li .icon').height(totalIconHeight / iconRows);



    if (windowWidth > windowHeight) {
        var nhsLogoHeight = $("#nhs_logo").height();
        var straplineHeight = $("#strapline").height();
        var straplineMargin = nhsLogoHeight - straplineHeight;
        $("#strapline").css("margin-top", straplineMargin / 2);
    };



    //content page load

    var negativeHomeContentHeight = 0 - $(".home_content").outerHeight(true);
    var negativePageHeight = 0 - windowHeight;

    var pageLoad;


    $(".nav a").click(function (e) {
        e.preventDefault();
        pageLoad = $(this).attr("href");
        var poiType = $(this).attr("data-poitype");
        $("#map, #list").addClass("disabled");

        if ($("body").hasClass("home")) {

            $(".nav").addClass("right_edge_rounded");
            $("#nav_toggle").show();
            $(".home_content").animate({
                marginTop: negativePageHeight
            }, 2500, function () {
                $("#nav_toggle").css("position", "fixed").addClass("fixed_nav_toggle");
                $("#tabgroup").slideDown(function () {
                    $("body").removeClass("home");

                });

            });

            
            $(".page_html").load(pageLoad + " .page_body", function () {
                $.getJSON("http://poi.nationalservers.co.uk/v1/search?format=json&key=nottingham-city-nhs&loc=wrexham&callback=?&type=" + poiType, function (data) {
                    window.searchResults = data;
                    $("#map, #list").removeClass("disabled");
                });
            });
            $.getScript("js/app_page.js");
            $("body").addClass("content-page");
        } else {
            $(".page_html").fadeOut(400, function () {
                $(".map_wrap").fadeOut(400);
                $(".page_html").fadeIn(400).load(pageLoad + " .page_body", function () {
                    $.getJSON("http://poi.nationalservers.co.uk/v1/search?format=json&key=nottingham-city-nhs&loc=wrexham&callback=?&type=" + poiType, function (data) {
                        window.searchResults = data;
                        $("#map, #list").removeClass("disabled");
                    });
                    $("#nav_toggle").click();
                    $('html, body').animate({ scrollTop: 0 }, 'slow');
                });
            });

        }
    });

    //give marign to account for nav toggle div
    var navToggleHeight = $("#nav_toggle").innerHeight();
    var negativeNavToggleHeight = 0 - navToggleHeight;
    $(".page_html, .map_wrap").css("margin-top", navToggleHeight + 20)

    //give marign to account for tabgroup div
    if ($("body").hasClass("portrait")) {
        var tabGroupHeight = $("#tabgroup").innerHeight();
        $(".page_html").css("margin-bottom", tabGroupHeight + 20);
    }


    //  map navigate
    $(document).on("click", "#map a", function (e) {
        e.preventDefault();

        $(".page_html").fadeOut(400, function () {
            //           $.getScript("js/map.js");
            $(".map_wrap").fadeIn(400, function () {

                var mapPageChrome = navToggleHeight + 20 + tabGroupHeight + 20;

                var mapPaddingTop = $(".map_wrap").css("paddingTop");
                var mapPadding = parseInt(mapPaddingTop) * 2;
                var mapHeight = windowHeight - mapPageChrome;
                var mapNewHeight = mapHeight - mapPadding;

                $(".map_wrap").height(mapNewHeight);

                $('html, body').animate({ scrollTop: 0 }, 'slow');
                initialize();
                //close menu if open
                if ($("#nav_toggle").hasClass("fixed_nav_toggle")) {

                } else {
                    $("#nav_toggle").click();
                }

            });
        });
    });








});
