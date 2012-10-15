

$(function () {


    $("#tabgroup").hide();

    var navToggleHeight = $("#nav_toggle").innerHeight();
    var negativeNavToggleHeight = 0 - navToggleHeight;
    $("#nav_toggle").css("margin-bottom", negativeNavToggleHeight);
    $(".h1").css("padding-top", navToggleHeight);

    var headerHeight = $(".header").height();
    var oldMarignTop;
    $("#nav_toggle").toggle(
    function () {
        $("#nav_toggle").css("position", "relative");
        oldMarignTop = $(".home_content").css("margin-top");
        $(".home_content").animate({ marginTop: 0 - headerHeight }, 2500);
    },
    function () {
        $("#nav_toggle").css("position", "relative");
        $(".home_content").animate({ marginTop: oldMarignTop }, 2500);
    });

});

