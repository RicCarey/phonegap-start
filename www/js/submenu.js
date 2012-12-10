
$(document).ready(function () {

    //icon resize

    //get high density 
    var subMenuDpr = 1;
    var subMenuImageSize;

    if (window.devicePixelRatio !== undefined) {
        subMenuDpr = window.devicePixelRatio;
    }

    
    subMenuAbsoluteImageSize = Math.ceil($(".pagesubMenu a").outerHeight(true));

    //calc which image to get
    if (167 < subMenuAbsoluteImageSize) {
        //ipad
        subMenuImageSize = 284;
    } else if (105 < subMenuAbsoluteImageSize && subMenuAbsoluteImageSize < 167) {
        //s3
        subMenuImageSize = 166;
    } else if (65 < subMenuAbsoluteImageSize && subMenuAbsoluteImageSize < 105) {
        //iphone4
        subMenuImageSize = 105;
    } else if (subMenuAbsoluteImageSize < 65) {
        //smaller
        subMenuImageSize = 65;
    }
    //if high density use double 
    if (subMenuDpr > 1) {
        subMenuImageSize = subMenuImageSize * 2;
    }
  
 
  $(".pagesubMenu .iconSrcSwap").each(function (index) {
      $(this).attr("src", $(this).attr("data-src").replace("/size/", "/" + subMenuImageSize + "/"));
  });

  $(".externalLink").click(function (e) {
      

      if (device.platform == "iPhone" || device.platform == "iPod" || device.platform == "iPad" || device.platform == "iOS") {
         
      } else if (device.platform == undefined || device.platform == null || device.platform == "") {
          e.preventDefault();
          var linkHref = $(this).attr("href");
          navigator.app.loadUrl(linkHref, { openExternal: true });

          var args = new blackberry.invoke.BrowserArguments(linkHref);
          blackberry.invoke.invoke(blackberry.invoke.APP_BROWSER, args);
      } else {
          e.preventDefault();
          var linkHref = $(this).attr("href");
          navigator.app.loadUrl(linkHref, { openExternal: true });

          var args = new blackberry.invoke.BrowserArguments(linkHref);
          blackberry.invoke.invoke(blackberry.invoke.APP_BROWSER, args);
      }
     

  });


});

