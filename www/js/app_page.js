

$(function () {

    //give marign to account for nav toggle div
    var navToggleHeight = $("#nav_toggle").innerHeight();
    var negativeNavToggleHeight = 0 - navToggleHeight;
    $(".page_html, .map_wrap").css("margin-top", navToggleHeight + 20)

    //give marign to account for tabgroup div
    if ($("body").hasClass("portrait")) {
        var tabGroupHeight = $("#tabgroup").innerHeight();
        $(".page_html").css("margin-bottom", tabGroupHeight + 20);
    }

    //nav toggle business
    var headerHeight = $(".header").height();
    var oldMarignTop;
    $("#nav_toggle").toggle(
    function () {
        $('html, body').animate({ scrollTop: 0 }, 'slow');
        //return false;
        $("#nav_toggle").removeClass("fixed_nav_toggle");
        oldMarignTop = $(".home_content").css("margin-top");
        $(".home_content").animate({ marginTop: 0 - headerHeight }, 2500);
    },
    function () {

        $(".home_content").animate({ marginTop: oldMarignTop }, 2500, function () {
            $("#nav_toggle").addClass("fixed_nav_toggle");
        });
    });
    

    

    



});

