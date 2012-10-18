

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

 
    

    

    



});

