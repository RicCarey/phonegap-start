$(function () {
    //    var 
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

    //orientation
    var scaleMeasure;
    if (windowWidth > windowHeight) {
        $("body").addClass("landscape");
        scaleMeasure = windowHeight;
    } else {
        $("body").addClass("portrait");
        scaleMeasure = windowWidth;
    }

    //font scale

    if (scaleMeasure > 240) {
        var scale = scaleMeasure / 240;
        var fontSize = (12 * scale) + "px";

        $("body").css("font-size", fontSize);
    }
    //Home nav fit
    var headerHeight = $(".header").height();
    var navHeight = windowHeight - headerHeight;
    //   $(".home .nav").height(navHeight);
    var testNavHeight = $(".home .nav").height();
    $(".home .nav").height(testNavHeight);

    //icon load
    var negativeHomeContentHeight = 0 - $(".home_content").innerHeight();

    $("#pharmacy_icon").click(function (e) {
        e.preventDefault;


        //$(".home_content").slideUp("slow");

        $(".home_content").animate({
            marginTop: negativeHomeContentHeight
        }, 5000, function () {
            $("#nav_toggle").css("position", "fixed");
            $("#tabgroup").slideDown(function () {
                $("body").removeClass("home");
                //                $(".nav").height("auto");
            });

        });

        $(".page_html").load("content/pharmacy_info.htm .page_body");
        $.getScript("js/app_page.js");

    });
    //map stretch
    //  $("#map_canvas").height(300px");



});
