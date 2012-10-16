

$(function () {


    //nav toggle business
    var headerHeight = $(".header").height();
    var oldMarignTop;
    $("#nav_toggle").toggle(
    function () {
        $('html, body').animate({ scrollTop: 0 }, 'slow');
        //return false;
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

