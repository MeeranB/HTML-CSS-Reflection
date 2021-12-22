"use strict";

//Force scroll to top on refresh
$(window).on("beforeunload", function () {
  $(window).scrollTop(0);
});
$.scrollDirection.init();

var checkWidth = function checkWidth() {
  return $(window).width();
};

var useSidebar = function useSidebar(sidebarType) {
  var bodyStyleMap = {
    desktop: "shift-left",
    mobile: "shift-left-mobile"
  };
  $(".hamburger").off("click");
  $(".hamburger").on("click", function () {
    $(".hamburger").toggleClass("is-active");
    $("body").addClass(bodyStyleMap[sidebarType]);
    $(".lightbox").show();
    $(".hidden-nav-container").show();
  });
};

var addLightboxSidebarListener = function addLightboxSidebarListener() {
  $(".lightbox").on("click", function () {
    $(".hamburger").removeClass("is-active");
    $("body").removeClass("shift-left shift-left-mobile");
    $(".hidden-nav-container").hide();
    $(".lightbox").hide();
  });
};

$(function () {
  var cookieConsent = localStorage.getItem("cookie-consent");
  var windowWidth = checkWidth();

  if (!cookieConsent) {
    $(".lightbox").show().css("display", "flex");
    $(".cookie-modal").show();
    $("body").css("overflow", "hidden");
  } else if (cookieConsent) {
    $(".lightbox").hide();
    addLightboxSidebarListener();
  }

  if (windowWidth < 992) {
    useSidebar("mobile");
  } else if (windowWidth >= 992) {
    useSidebar("desktop");
  }
});
$(".cookie-consent").on("click", function () {
  $(".lightbox").hide();
  addLightboxSidebarListener();
  $("body").css("overflow", "auto");
  localStorage.setItem("cookie-consent", true);
});
$(window).on("resize", function () {
  var windowWidth = checkWidth();

  if (windowWidth < 992) {
    if ($("body").hasClass("shift-left")) {
      $("body").removeClass("shift-left");
      $("body").addClass("shift-left-mobile");
    }

    useSidebar("mobile");
  } else if (windowWidth >= 992) {
    if ($("body").hasClass("shift-left-mobile")) {
      $("body").removeClass("shift-left-mobile");
      $("body").addClass("shift-left");
    }

    useSidebar("desktop");
  }
});
var header = $(".main-header");
var scrollingHeader = header.clone({
  withDataAndEvents: true
}).addClass("scrolling-header");
var hoverMenu = $("#hover-nav-container")[0];
var options = {
  threshold: 0
};
var observer = new IntersectionObserver(function (entries, observer) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) {
      console.log("header has left the screen");
      $("body").prepend(scrollingHeader);
      useSidebar("desktop");
    } else if (entry.isIntersecting) {
      console.log("header has entered the screen");
      scrollingHeader.remove();
    }
  });
}, options);
observer.observe(hoverMenu);
//# sourceMappingURL=all.js.map
