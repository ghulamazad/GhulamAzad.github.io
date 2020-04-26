(function ($) {
  "use strict"; // Start of use strict
  // varible
  var window_box = $(window), // For window ready
    document_func = $(document), // For documetn ready
    html_body = $("html, body"), // For html and bocy select
    body = $("body"), // For body select
    navbar_scroll = $(".navbar-collapse ul li a"), // For nav section select function
    sticky_header = $(".site-header"), // Sticky fix header
    scroll_up = $(".scrollup"), // For scroll to top
    project_box = $(".project_items"), // For project isotop & popup
    project_box_filter = $(".project_filter"); // for project filter

  // Page Loader
  window_box.on("load", function () {
    body.addClass("loaded");
  });
  document_func.on("click", "div.stop_loading", function () {
    body.addClass("loaded");
  });

  // jQuery for page scrolling feature - requires jQuery Easing plugin
  document_func.on("click", "a.page-scroll", function (event) {
    var $anchor = $(this);
    html_body.stop().animate(
      {
        scrollTop: $($anchor.attr("href")).offset().top - 50,
      },
      1250,
      "easeInOutExpo"
    );
    event.preventDefault();
  });
  // Highlight the top nav as scrolling occurs
  body.scrollspy({
    target: ".navbar-fixed-top",
    offset: 100,
  });
  // Closes the Responsive Menu on Menu Item Click
  navbar_scroll.on("click", function () {
    $(".navbar-toggle:visible").click();
  });
  // Offset for Main Navigation
  sticky_header.affix({
    offset: {
      top: 50,
    },
  });

  // Back To Top Script
  window_box.on("scroll", function () {
    if ($(this).scrollTop() > 100) {
      scroll_up.fadeIn();
    } else {
      scroll_up.fadeOut();
    }
  });
  scroll_up.on("click", function () {
    html_body.animate(
      {
        scrollTop: 0,
      },
      600
    );
    return false;
  });

  // Skill Bar Script
  // ##### window on refresh #####
  var progress_bar = $(".bar-inner"),
    skills_top = $(".skill_area").offset().top - 200,
    window_top = window_box.scrollTop();
  if (window_top >= skills_top) {
    progress_bar.each(function () {
      var data_percent = $(this).attr("data-percent");
      $(this).css("width", data_percent);
    });
  }
  // ##### window on scroll #####
  window_box.on("scroll", function () {
    var skills_top = $(".skill_area").offset().top - 200,
      window_top = window_box.scrollTop();
    if (window_top >= skills_top) {
      progress_bar.each(function () {
        var data_percent = $(this).attr("data-percent");
        $(this).css("width", data_percent);
      });
    }
  });

  // Isotope Scritp
  var $grid = project_box.isotope({
    itemSelector: ".project_tile",
    percentPosition: true,
    masonry: {
      columnWidth: ".project_tile",
    },
  });
  project_box_filter.on("click", "li", function () {
    project_box_filter.find(".active").removeClass("active");
    $(this).addClass("active");
    var filterValue = $(this).attr("data-filter");
    $grid.isotope({ filter: filterValue });
  });
  $grid.imagesLoaded().progress(function () {
    $grid.isotope("layout");
  });
})(jQuery); // End of use strict
