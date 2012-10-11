$(function () {
//    var windowWidth = window.innerWidth;
    //    var windowHeight = window.innerHeight;
    var windowWidth = screen.width;
    var windowHeight = screen.height;
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
    $(".home .nav").height(navHeight);

    //icon load
    $("#pharmacy_icon").click(function (e) {
        e.preventDefault;
        $("body").removeClass("home");
        $(".nav").height("auto");
        $(".home_content").slideUp("slow");

        $(".page_html").load("content/pharmacy_info.htm .page_body");
        $.getScript("js/app_page.js");

    });

    
});
