

$(function () {
    $("#nav_toggle").click(function (e) {
        e.preventDefault;
        $(".home_content").slideToggle();

    });
    $("#tabgroup").hide();

    var navToggleHeight = $("#nav_toggle").innerHeight();
    var negativeNavToggleHeight = 0 - navToggleHeight;
    $("#nav_toggle").css("margin-bottom", negativeNavToggleHeight);
    $(".h1").css("padding-top", navToggleHeight);

});
