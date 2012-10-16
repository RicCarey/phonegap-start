

$(function () {

    //hide tab group to slide it back in on laod
    $("#tabgroup").hide();

    //give marign to account for nav toggle div
    var navToggleHeight = $("#nav_toggle").innerHeight();
    var negativeNavToggleHeight = 0 - navToggleHeight;
    $(".page_html, .map_wrap").css("margin-top", navToggleHeight + 10)
    
    //give marign to accoutn for tabgroup div
    if( $("body").hasClass("portrait")){
        var tabGroupHeight = $("#tabgroup").innerHeight();
        $(".page_html").css("margin-bottom", tabGroupHeight + 10);
    }
    

    //nav toggle business
    var headerHeight = $(".header").height();
    var oldMarignTop;
    $("#nav_toggle").toggle(
    function () {
        $("html").scrollTop("0");
        $("#nav_toggle").css("position", "relative").removeClass("fixed_nav_toggle");
        oldMarignTop = $(".home_content").css("margin-top");
        $(".home_content").animate({ marginTop: 0 - headerHeight }, 2500);
    },
    function () {

        $(".home_content").animate({ marginTop: oldMarignTop }, 2500, function () {
            $("#nav_toggle").css("position", "fixed").addClass("fixed_nav_toggle");
        });
    });


    



});

