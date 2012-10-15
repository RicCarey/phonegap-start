//NB - this needs to be bind so that the phone doesnt calculate the heights and such without images loaded.
$(window).bind("load", function () {
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

    //    var headerHeight = $(".header").height();
    //    var navHeight = windowHeight - headerHeight;
    //    var currentNavHeight = $(".nav").height();
    //    var navDiffernece = navHeight - currentNavHeight;
    //    $(".nav li").css("margin-bottom", Math.ceil(navDiffernece / 3));




    var homeContentHeight = $(".home_content").outerHeight(true);
    var homeContentHeightDiff = windowHeight - homeContentHeight;

    if (homeContentHeight < windowHeight) {
        $(".home_content").height(homeContentHeight + homeContentHeightDiff);
    }
   
    $(".expander").height(homeContentHeightDiff);
    $(".expander").show();
    var biggestHeight = 0;
    $('.nav li .label').each(function (index) {
        biggestHeight = Math.max(biggestHeight, $(this).outerHeight(true));
    }).css("height", biggestHeight);

    var iconRows;
    if ($("body").hasClass("portrait")) {
        iconRows = 3;
    } else {
        iconRows = 2;
    }

    var iconLabelSpace = biggestHeight * iconRows;
    var totalIconHeight = homeContentHeightDiff - iconLabelSpace;
    $('.nav li .icon').height(totalIconHeight / iconRows);





    //    var pages = new Array();
    //    pages[0] = "SelfCare";
    //    pages[0] = "NHS Choices";
    //    pages[0] = "Pharmacy";
    //    pages[0] = "GPs";
    //    pages[0] = "Walk-In<br />Centre";
    //    pages[0] = "A&E";
    //    pages[0] = "About";
    //    pages[0] = "Contact";
    //    pages[0] = "Website";



    //   
    //    $(".home_content").append(function () {
    //        
    //        var i;
    //        for (i = 0; i < 5; i++) {
    //        i
    //        }
    //    });



    //icon load


    var negativeHomeContentHeight = 0 - $(".home_content").outerHeight(true);
    var negativePageHeight = 0 - windowHeight;


    $("#pharmacy_icon").click(function (e) {

        e.preventDefault;

        //$(".home_content").slideUp("slow");

        $(".home_content").animate({
            marginTop: negativePageHeight
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



});
