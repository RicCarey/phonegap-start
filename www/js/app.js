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
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;
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







    //content page load

    var negativeHomeContentHeight = 0 - $(".home_content").outerHeight(true);
    var negativePageHeight = 0 - windowHeight;

    var pageLoad;
    $(".nav a").click(function (e) {

        e.preventDefault();
        pageLoad = $(this).attr("href");
        $(".nav").addClass("right_edge_rounded");
        $("#nav_toggle").show();
        $(".home_content").animate({
            marginTop: negativePageHeight
        }, 2500, function () {
            $("#nav_toggle").css("position", "fixed").addClass("fixed_nav_toggle");
            $("#tabgroup").slideDown(function () {
                $("body").removeClass("home");
                //                $(".nav").height("auto");
            });

        });


        $(".page_html").load(pageLoad + " .page_body");
        $.getScript("js/app_page.js");
        $("body").addClass("content-page");
    });



});
