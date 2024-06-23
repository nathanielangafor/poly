/**
 * @name _common
 * @function handle scroling
 * @function initial parallax, tooltip, carousel, etc
 */

var $header = $('header.header.app-bar');
var $pageNav = $("#page_nav");
var sticky = 0;

// Sticky header
if($("#header").length > 0) {
  sticky = $header[0].offsetTop + 80;
}

function fixedNav() {
  if (window.pageYOffset > sticky) {
    $header.addClass("fixed");
  } else {
    $header.removeClass("fixed");
  }
}

// Bottom right navigation,
function fixedFabNav() {
  if (window.pageYOffset > 500) {
    $pageNav.addClass("show");
  } else {
    $pageNav.removeClass("show");
  }
}

/**
 * @name Random Shape
 * @function to generate random shape decoration
 */

function randomShape(top, left, width, height, rotate) {
  return {
    top: Math.floor(Math.random() * top) + 'px',
    left: Math.floor(Math.random() * left) + 'px',
    width: Math.floor(Math.random() * (width - 100) + 100) + 'px',
    height: Math.floor(Math.random() * (height - 100) + 100) + 'px',
    transform: `rotate(${Math.floor(Math.random() * rotate)}deg)`,
  }
}

/**
 * @name Feature Progress
 * @function handle progress on scroll window
 */
function playProgress() {
  var $progress = $('#progress');
  if ($progress.length < 1) {
    return;
  }
  var progressOffset = $progress[0].getBoundingClientRect();
  if (progressOffset.top < 200) {
    $progress.removeClass('zero');
  }
}

/**
 * @name Feature Tab
 * @function handle tab
 */

// Tab initial
$('.tabs-slider').tabs({
  swipeable: true
});

$('.tabs-basic').tabs({
  swipeable: false
});

/**
 * @name Modal
 * @function handle Modal
 */

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.modal-popup');
  var instances = M.Modal.init(elems);
});

/**
  * #name Tooltip
  * @function handle Tooltip
*/
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.tooltiped');
  var instances = M.Tooltip.init(elems);
});

$(document).ready(function(){
  // Fixed nav
  setTimeout(function() {
    window.onscroll = function() {
      playProgress();
      fixedNav();
      fixedFabNav();
    };
  }, 500)
  // Preloader
  $('#preloader').delay(1000).fadeOut('fast');
  $(".transition-page").addClass('page-fadeUp-transition-enter').delay(1000).queue(function(){
    $(this)
    .removeClass('page-fadeUp-transition-enter')
    .addClass('page-fadeUp-transition-enter-active')
    .dequeue()
    .delay(1400).queue(function(){
      $(this)
      .removeClass('page-fadeUp-transition-enter-active')
      .addClass('page-fadeUp-transition-exit')
      .dequeue();
    })
  });
  
  // Open Page scroll navigation
  $('.scrollnav').navScroll({
    scrollSpy: true,
    activeParent: true,
    activeClassName: 'current'
  });
  
  // initial wow
  new WOW().init();

  // initial scroll parallax
  $('#parallax-left, #parallax-right, #parallax-double, #parallax-banner').enllax();
    
  // Accordion init
  $('.collapsible:not(".expandable")').collapsible();
  $('.collapsible.expandable').collapsible({
      accordion: false
  });

  // Select
  $('.select').formSelect();

  // Countdown
  $('[data-countdown]').each(function() {
    var $this = $(this),
        finalDate = $(this).data('countdown');

    var now = Date.now();
    var future = new Date(now + finalDate);
    const formatedFuture = future.toLocaleDateString('en-CA').replace(/-/g, '/') + ' ' + future.toLocaleTimeString('en-US');
    $this.countdown(formatedFuture, function(event) {
      $this.html(event.strftime(''
      + '<span><strong>%d</strong>Days</span><i><strong>:</strong></i>'
      + '<span><strong>%H</strong>Hours</span><i><strong>:</strong></i>'
      + '<span><strong>%M</strong>Minutes</span><i><strong>:</strong></i>'
      + '<span><strong>%S</strong>Seconds</span>'));
    });
  });

  // Validate form
  var toastHTML = '<span>Message Sent</span><button onclick="M.Toast.dismissAll()" class="btn-icon waves-effect toast-action"><i class="material-icons">close</i></button>';
  $.validate({
    form: "#contact_form",
    onSuccess: function(form) {
      M.toast({html: toastHTML});
      return false;
    }
  })
});

/**
 * @name about call action
 * @function to generate random shape for blur effect
 */

$(function() {
  $('#about-call-action .fog .double-main').css(randomShape(100, 300, 600, 500, 120));
  $('#about-call-action .fog .triple-light').css(randomShape(200, 200, 100, 400, 90));
  $('#about-call-action .fog .triple-main').css(randomShape(400, 500, 400, 500, 160));
});

/**
 * @name about carousel collage
 * @function to handle carousel
 */
$(function() {
  var $carousel = $('#collage-carousel');
  // Handle carousel tag
  $carousel.slick({
    dots: false,
    infinite: true,
    speed: 7000,
    autoplaySpeed: 7000,
    autoplay: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    cssEase: 'linear',
    responsive: [{
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    }]
  });
});

/**
 * @name profile gallery
 * @function filter for profile
 */

$("#filter_about_gallery.filter button").click(function(){
  var name = $(this).data("filter");
  $("#filter_about_gallery.filter button").removeClass("selected");
  $(this).addClass("selected");

  if (name !== 'all') {
    $("#image_about_gallery .item").css({"visibility": "hidden"}).hide();
    setTimeout(function() {
      $("#image_about_gallery .item[data-category="+name+"]").css({"visibility": "visible"}).show();
    }, 10);
  } else {
    setTimeout(function() {
      $("#image_about_gallery .item").css({"visibility": "visible"}).show();
    }, 10);
  }
  $("#image_about_gallery .item").removeClass("loaded");
  setTimeout(function() {
    $("#image_about_gallery .item").addClass("loaded");
  }, 700);
});

/**
 * @name counter carausel
 * @function marquee carousel for counter with caro
 */

$(function() {
  var $carousel = $('#counter-logo-carousel');
  // Handle carousel tag
  $carousel.slick({
    dots: false,
    infinite: true,
    speed: 9000,
    autoplaySpeed: 9000,
    autoplay: true,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
    variableWidth: true,
    cssEase: 'linear',
    responsive: [{
      breakpoint: 960,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    }, {
      breakpoint: 800,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    }, {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }]
  });
});
/**
 * @name Artworks Blur Decoration
 * @function to apply random shape to blur decoration
 */

$(function() {
  // start
  $('#blur-gradient-artwork .fogs .start .double-main').css(randomShape(100, 300, 600, 500, 120));
  $('#blur-gradient-artwork .fogs .start .accent').css(randomShape(200, 400, 400, 300, 60));
  $('#blur-gradient-artwork .fogs .start .triple-light').css(randomShape(200, 200, 100, 400, 90));
  $('#blur-gradient-artwork .fogs .start .triple-main').css(randomShape(400, 500, 400, 500, 160));
  // end
  $('#blur-gradient-artwork .fogs .end .double-main').css(randomShape(100, 300, 600, 500, 120));
  $('#blur-gradient-artwork .fogs .end .accent').css(randomShape(200, 400, 400, 300, 60));
  $('#blur-gradient-artwork .fogs .end .triple-light').css(randomShape(200, 200, 100, 400, 90));
  $('#blur-gradient-artwork .fogs .end .triple-main').css(randomShape(400, 100, 400, 500, 160));
})
/**
 * @name parallax-banner
 * @function handle youtube video banner
 */

// initial parallax mouse movement
var scene1 = document.getElementById('scene1');
var scene2 = document.getElementById('scene2');
var scene3 = document.getElementById('scene3');
if (scene1) {
  var parallaxInstance1 = new Parallax(scene1);
}

if (scene2) {
  var parallaxInstance2 = new Parallax(scene2);
}

if (scene3) {
  var parallaxInstance3 = new Parallax(scene3);
}

/******** END Parallax banner ********/
/**
 * @name banner hero banner slider
 * @function handle slider banner
 */

var $carousel = $('#banner-slider');
var $carouselNav = $('#banner_nav a');

$(function() {
  // slick carousel config
  $carousel.slick({
    dots: false,
    arrows: false,
    speed: 800,
    slidesToShow: 1,
    infinite: true,
    autoplay: false,
    cssEase: 'ease-out',
    responsive: [
      {
        breakpoint: 960,
        settings: {
          dots: true,
          fade: true
        }
      }
    ]
  });
});

$carouselNav.click(function() {
  var index = $(this).data("slide");
  $carousel.slick('slickGoTo', index);
});

$carousel.on('afterChange', function(event, slick, currentSlide){
  var active = currentSlide;
  $carouselNav.removeClass("active");
  $('#banner_nav > a[data-slide='+active+']').addClass("active");
});

/**
 * @name Chat
 * @function chating with with customer support
 * @function open and close (toggle) chat pannel
 */

var $chatPanel = $('#chat_panel'),
    $closeChat = $('#close_chat'),
    $chatContainer = $('#chat-container ul'),
    $chatField = $('#chat_field'),
    $sendMessage = $('#send_message'),
    $toggleChat = $('#toggle_chat');

$toggleChat.click(function() {
  $chatPanel.toggleClass('show')
});

$closeChat.click(function() {
  $chatPanel.removeClass('show')
});

function sendChat() {
  var chatVal = $chatField.val();
  $chatContainer.append('<li class="justify-content-end"><span class="talk">' + chatVal + '</span></li>')
  $chatField.val('');

  // scroll to bottom
  var ctn = document.getElementById('chat-container')
  setTimeout(function() {
    ctn.scrollTo(0, ctn.scrollHeight)
  }, 300);
}

$sendMessage.click(function() {
  sendChat();
});

$chatField.on('keypress',function(e) {
  if(e.which == 13) {
    sendChat();
  }
});

// Counter Scroll
(function ($) {
  $(window).on("load", function () {
    $(document).scrollzipInit();
    $(document).rollerInit();
  });
  $(window).on("load scroll resize", function () {
    $('.numscroller').scrollzip({
      showFunction: function () {
        numberRoller($(this).attr('data-slno'));
      },
      wholeVisible: false,
    });
  });
  $.fn.scrollzipInit = function () {
    $('body').prepend("<div style='position:fixed;top:0px;left:0px;width:0;height:0;' id='scrollzipPoint'></div>");
  };
  $.fn.rollerInit = function () {
    var i = 0;
    $('.numscroller').each(function () {
      i++;
      $(this).attr('data-slno', i);
      $(this).addClass("roller-title-number-" + i);
    });
  };
  $.fn.scrollzip = function (options) {
    var settings = $.extend({
      showFunction: null,
      hideFunction: null,
      showShift: 0,
      wholeVisible: false,
      hideShift: 0,
    }, options);
    return this.each(function (i, obj) {
      $(this).addClass('scrollzip');
      if ($.isFunction(settings.showFunction) && $('#scrollzipPoint').length > 0) {
        if (!$(this).hasClass('isShown') &&
          ($(window).outerHeight() + $('#scrollzipPoint').offset().top - settings.showShift) > ($(this).offset().top + ((settings.wholeVisible) ? $(this).outerHeight() : 0)) &&
          ($('#scrollzipPoint').offset().top + ((settings.wholeVisible) ? $(this).outerHeight() : 0)) < ($(this).outerHeight() + $(this).offset().top - settings.showShift)
        ) {
          $(this).addClass('isShown');
          settings.showFunction.call(this);
        }
      }
      if ($.isFunction(settings.hideFunction)) {
        if (
          $(this).hasClass('isShown') &&
          (($(window).outerHeight() + $('#scrollzipPoint').offset().top - settings.hideShift) < ($(this).offset().top + ((settings.wholeVisible) ? $(this).outerHeight() : 0)) ||
            ($('#scrollzipPoint').offset().top + ((settings.wholeVisible) ? $(this).outerHeight() : 0)) > ($(this).outerHeight() + $(this).offset().top - settings.hideShift))
        ) {
          $(this).removeClass('isShown');
          settings.hideFunction.call(this);
        }
      }
      return this;
    });
  };

  function numberRoller(slno) {
    var min = $('.roller-title-number-' + slno).attr('data-min');
    var max = $('.roller-title-number-' + slno).attr('data-max');
    var timediff = $('.roller-title-number-' + slno).attr('data-delay');
    var increment = $('.roller-title-number-' + slno).attr('data-increment');
    var numdiff = max - min;
    var timeout = (timediff * 1000) / numdiff;
    numberRoll(slno, min, max, increment, timeout);
  }

  function numberRoll(slno, min, max, increment, timeout) { //alert(slno+"="+min+"="+max+"="+increment+"="+timeout);
    if (min <= max) {
      $('.roller-title-number-' + slno).html(min);
      min = parseFloat(min) + parseFloat(increment);
      setTimeout(function () {
        numberRoll(eval(slno), eval(min.toFixed(2)), eval(max), eval(increment), eval(timeout))
      }, timeout);
    } else {
      $('.roller-title-number-' + slno).html(max);
    }
  }
})(jQuery);
/**
 * @name Filter
 * @function filter product list base on category, price, tag, etc
 * @function sort product list by name or price
 * @function switch view grid or list
 */

// switch view
$('#switch_view button').click(function() {
  $('#switch_view button').removeClass('active');
  $(this).addClass('active');

  var view = $(this).data('value');
  if(view === 'grid') {
    $('#product_result > .col').addClass('col-lg-4').removeClass('col-sm-12');
    $('#product_result .product-card').addClass('portrait').removeClass('landscape');
  } else {
    $('#product_result > .col').addClass('col-sm-12').removeClass('col-lg-4');
    $('#product_result .product-card').addClass('landscape').removeClass('portrait');
  }
});

// collect values
function removeArray(arr) {
  var what, a = arguments, L = a.length, ax;
  while (L > 1 && arr.length) {
    what = a[--L];
    while ((ax= arr.indexOf(what)) !== -1) {
      arr.splice(ax, 1);
    }
  }
  return arr;
}

var checkAll = [
  'check-a',
  'check-b',
  'check-c',
  'check-d',
  'check-e',
  'check-f'
];

var filterVal = {
  category: 'all',
  rating: 0,
  radio: 'all',
  check: checkAll,
  range: {
    from: 0,
    to: 100
  },
  tags: ['tag-one', 'tag-two', 'tag-three', 'tag-four']
};

var sortVal = {
  sortBy: 'price',
  sortfrom: -1,
  sortTo: 1
}

function intersection(firstArray, secondArray) {
  return firstArray.filter(function(element) {
    return secondArray.includes(element);
  })
}

function checkFilter(item, filterData){
  if (filterData !== 'all') {
    return item === filterData;
  }
  return true;
}

// Get filtered data list
function filterResult() {
  var cardItems = $('#product_result').data('items');

  return cardItems.filter(function(cardItem) {
    return (
      checkFilter(cardItem.category, filterVal.category) &&
      checkFilter(cardItem.radio, filterVal.radio) &&
      cardItem.price >= filterVal.range.from &&
      cardItem.price <= filterVal.range.to &&
      cardItem.rating >= filterVal.rating &&
      filterVal.check.indexOf(cardItem.check) > -1 &&
      intersection(filterVal.tags, cardItem.tag).length > 0
    )
  }).sort(function(a, b) {
    return a[sortVal.sortBy] > b[sortVal.sortBy] ? sortVal.sortFrom : sortVal.sortTo
  });
}

// HTML Template
function productCard(rating = 0, price = 0, img, title, desc, type = 'full', orientation = 'portrait', href = '#') {
  var star = '<i class="material-icons star-icon" title="1">star</i>';
  var start_disable = '<i class="material-icons star-icon-disable" title="1">star</i>';

  function renderStar(rating) {
    return star.repeat(rating) + start_disable.repeat(5 - rating)
  }

  var $item = `<div class="col col-sm-4">
    <div class="card product-card portrait ${type}">
      <a class="waves-effect hidden-link" href=${href}>&nbsp;</a>
      <div class="figure">
        <div class="responsive-img" style="background-image:url(${img})">&nbsp;</div>
      </div>
      <div class="desc">
        <div class="text">
          <h6 class="title pb-2 text-truncate">${title}</h6>
          <p class="use-text-paragraph">${desc}</p>
        </div>
        <div>
          <div class="property">
            <div class="rating">
              ${renderStar(rating)}
            </div>
            <strong>$${price}</strong>
          </div>
          <a class="btn btn-outlined primary button block" href=${href}>see detail</a>
        </div>
      </div>
    </div>
  </div>`

  return $item;
}

// Render filtered list to HTML
function renderResult() {
  var items = filterResult();
  $('#result_length').text(items.length);
  $('#product_result').html('');
  for (i=0; i<items.length; i++) {
    $('#product_result').append(productCard(items[i].rating, items[i].price, items[i].img, items[i].title, 'Category: '+items[i].category+' ~ '+'Tag: '+items[i].tag+' ~ '+'Check: '+items[i].check+' ~ '+'Radio: '+items[i].radio, 'round', 'portrait', '/detail-product'))
  }
}

// sort filter
$('#sort_by').change(function(e){
  var val = e.target.value;
  switch (val) {
    case 'title-asc':
      sortVal.sortBy = 'title'
      sortVal.sortFrom = 1
      sortVal.sortTo = -1
      break
    case 'title-desc':
      sortVal.sortBy = 'title'
      sortVal.sortFrom = -1
      sortVal.sortTo = 1
      break
    case 'price-asc':
      sortVal.sortBy = 'price'
      sortVal.sortFrom = -1
      sortVal.sortTo = 1
      break
    default:
      sortVal.sortBy = 'price'
      sortVal.sortFrom = 1
      sortVal.sortTo = -1
  }
  renderResult();
});

// category filter
$('.filter_category li a').click(function() {
  var val = $(this).data('value');

  $('.filter_category li a').removeClass('active');
  $(this).addClass('active');

  filterVal.category = val;
  renderResult();
});

// rating filter
$('.filter_rating li a').click(function() {
  var val = $(this).data('value');

  $('.filter_rating li a').removeClass('active');
  $(this).addClass('active');

  filterVal.rating = Number(val);
  renderResult();
});

// category radio
$('.filter_radio li input[type="radio"]').click(function() {
  var val = $(this).val();
  $('.filter_radio li').removeClass('active');
  $(this).parents('.collection-item').addClass('active');

  filterVal.radio = val;
  renderResult();
});

// category checkbox
$('.filter_check li input[type="checkbox"]').click(function() {
  var val = $(this).val();

  $('.filter_check li').removeClass('active');
  $(this).parents('.collection-item').addClass('active');

  if($(this).is(':checked')) {
    filterVal.check.push(val)
  } else {
    removeArray(filterVal.check, val);
  }
  renderResult();
});

// select all categories
$('.select_all_categories').click(function(){
  filterVal.check = checkAll;
  $('.filter_check input[type="checkbox"]').prop('checked', true);
  renderResult();
});

// category tags
$('.filter_tags .btn-tag input[type="checkbox"]').click(function() {
  var val = $(this).val();
  if($(this).is(':checked')) {
    filterVal.tags.push(val)
  } else {
    removeArray(filterVal.tags, val);
  }
  renderResult();
});

// price filter
$('.filter_price button').click(function() {
  filterVal.range.from = Number($('#price_from').val());
  filterVal.range.to = Number($('#price_to').val());
  renderResult();
});


// handle mobile filter
document.addEventListener('DOMContentLoaded', function() {
  var filterModal = document.getElementById('modal_filter');
  var instances = M.Modal.init(filterModal, {
    onOpenStart: function() {
      var filter_sidebar = $('#filter_sidebar > aside');
      filter_sidebar.detach();
      $('#filter_mobile').append(filter_sidebar);
    },
    onCloseEnd: function() {
      var filter_mobile = $('#filter_mobile > aside');
      filter_mobile.detach();
      $('#filter_sidebar').append(filter_mobile);
    }
  });
});

// Filter by category
$('#collection-tab button').click(function(){
  var name = $(this).data("filter");
  $("#collection-tab button").removeClass("selected");
  $(this).addClass("selected");

  if (name !== 'all') {
    $("#item-list-collection > .row").hide();
    setTimeout(function() {
      $("#"+name).show();
    }, 10)
  } else {
    setTimeout(function() {
      $("#item-list-collection > .row").show();
    }, 10)
  }
});

/**
 * @name Validate Form Contact
 * @function handle form validation
 */

var toastHTML = '<span>Message Sent</span><button onclick="M.Toast.dismissAll()" class="btn-icon waves-effect toast-action"><i class="material-icons">close</i></button>';
$.validate({
  form: "#contact_form",
  onSuccess: function(form) {
    M.toast({html: toastHTML});
    return false;
  }
});


/**
 * @name Footer Fog Decoration
 * @function to apply random shape to footer decoration element
 */

$(function() {
  // start
  $('.footer-deco .fogs .start .double-main').css(randomShape(100, 300, 600, 500, 120));
  $('.footer-deco .fogs .start .accent').css(randomShape(200, 400, 400, 300, 60));
  $('.footer-deco .fogs .start .triple-light').css(randomShape(200, 200, 100, 400, 90));
  $('.footer-deco .fogs .start .triple-main').css(randomShape(400, 500, 400, 500, 160));
  // end
  $('.footer-deco .fogs .end .double-main').css(randomShape(100, 300, 600, 500, 120));
  $('.footer-deco .fogs .end .accent').css(randomShape(200, 400, 400, 300, 60));
  $('.footer-deco .fogs .end .triple-light').css(randomShape(200, 200, 100, 400, 90));
  $('.footer-deco .fogs .end .triple-main').css(randomShape(400, 100, 400, 500, 160));
})
/**
 * @name form
 * @function handle form validation
 */

$(document).ready(function(){
  var toastHTML = '<span>Message Sent</span><button onclick="M.Toast.dismissAll()" class="btn-icon waves-effect toast-action me-1"><i class="material-icons">close</i></button>';
  $.validate({
    form: "#contact_form",
    onSuccess: function(form) {
      M.toast({html: toastHTML});
      return false;
    }
  });

  $.validate({
    form: "#login_form"
  });

  $.validate({
    form: "#register_form",
    modules : "security"
  });
});

/**
 * @name form gradient
 * @function handle form decoration
 */

$(document).ready(function(){
  $('#style_gr .triple-main').css(randomShape(100, 300, 600, 500, 120));
  $('#style_gr .primary-light').css(randomShape(200, 400, 400, 300, 60));
  $('#style_gr .double-main').css(randomShape(200, 200, 100, 400, 90));
  $('#style_gr .triple-light').css(randomShape(400, 500, 400, 500, 160));
});
var darkMode = 'true';
if (typeof Storage !== 'undefined') { // eslint-disable-line
  darkMode = localStorage.getItem('bungalionDark') || 'true';
}

var $header = $('#header'),
    $menu = $('#mobile_menu'),
    $slideMenu = $('#slide-menu'),
    isOpen = false,
    isOpenHamburger = false;

document.addEventListener('DOMContentLoaded', function() {
  // initial dropdown
  var dropdownTrigger = document.querySelectorAll('.dropdown-trigger');
  var instancesDropdown = M.Dropdown.init(dropdownTrigger, {
    closeOnClick: false,
    alignment: 'left'
  });

  // Dropdown list hover
  var droplistHover = document.querySelectorAll('.droplist-trigger-hover');
  var $droplistHover = M.Dropdown.init(droplistHover, {
    closeOnClick: false,
    alignment: 'left',
    hover: true,
    coverTrigger: false,
  });

  var droplistHoverChild = document.querySelectorAll('.droplist-trigger-hover-child');
  var $droplistHoverChild = M.Dropdown.init(droplistHoverChild, {
    closeOnClick: false,
    alignment: 'right',
    hover: true,
    onOpenStart: function(elem) {
      var sibling = $(elem).parent().siblings().find('.droplist-trigger-hover-child');
      for(var i=0; i<sibling.length; i++) {
        M.Dropdown.getInstance(sibling[i]).close();
      }
    }
  });

  // Dropdown list click
  var droplistClick = document.querySelectorAll('.droplist-trigger-click');
  var $droplistClick = M.Dropdown.init(droplistClick, {
    closeOnClick: false,
    alignment: 'left',
    coverTrigger: false,
  });

  var droplistClickChild = document.querySelectorAll('.droplist-trigger-click-child');
  var $droplistClickChild = M.Dropdown.init(droplistClickChild, {
    closeOnClick: false,
    alignment: 'right',
    onOpenStart: function(elem) {
      var sibling = $(elem).parent().siblings().find('.droplist-trigger-click-child');
      for(var i=0; i<sibling.length; i++) {
        M.Dropdown.getInstance(sibling[i]).close();
      }
    }
  });

  // Megamenu click
  var megaClick = document.querySelectorAll('.megamenu-trigger-click');
  var $megaMenu = $('.mega-menu');

  var $megaClick = M.Dropdown.init(megaClick, {
    closeOnClick: false,
    alignment: 'left',
    coverTrigger: false,
    constrainWidth: true,
    container: $('#container_menu'),
    onOpenEnd: function() {
      $header.addClass('open-drawer');
      $('.megamenu-trigger-click').removeClass('active');
      $(this.el).addClass('active');
    },
    onCloseEnd: function() {
      $header.removeClass('open-drawer');
    }
  });
  
  $(document).click(function(e) {
    var target = e.target;
    if($(target).parents('.mega-menu-root').length <= 0) {
      $header.removeClass('open-drawer');
      $('.megamenu-trigger-click').removeClass('active');
    }
  })
});

$(document).ready(function(){
  // Dark and Light mode config
  if(darkMode === 'false') {
    $('#app').removeClass('theme--dark');
    $('#app').addClass('theme--light');
    $('#theme_switcher').prop('checked', true);
  }
  $('.menu-setting .switch input[type="checkbox"]').change(function() {
    if($(this).is(':checked')) {
      // dark
      localStorage.setItem('bungalionDark', "true");
      $('#app').removeClass('theme--light');
      $('#app').addClass('theme--dark');
    } else {
      // light
      localStorage.setItem('bungalionDark', "false");
      $('#app').removeClass('theme--dark');
      $('#app').addClass('theme--light');
    }
  });

  // Initial sidenav for mobile menu
  $('#mobile_menu').click(function() {
    isOpen = !isOpen;
    if(isOpen) {
      $('.sidenav').sidenav('open')  
    } else {
      $('.sidenav').sidenav('close');
      return false;
    }
  });

  // Hamburger menu
  function openMenu() {
    $('#main_menu').fadeIn();
    $header.addClass('open-drawer');
    $menu.addClass('is-active');
    $slideMenu.addClass('menu-open');
  }

  function closeMenu() {
    $('#main_menu').fadeOut();
    $header.removeClass('open-drawer');
    $menu.removeClass('is-active');
    $slideMenu.removeClass('menu-open');
  }

  $('#hamburger_menu').click(function() {
    isOpenHamburger = !isOpenHamburger;
    if(isOpenHamburger) {
      openMenu();
      $(this).addClass('is-active');
    } else {
      closeMenu();
      $(this).removeClass('is-active');
    }
  });
  
  $('#main_menu a').click(function() {
    closeMenu();
    isOpenHamburger = false;
  })

  // SideNav
  $('.sidenav').sidenav({
    onOpenStart: function() {
      isOpen = true;
      $header.addClass('open-drawer');
      $menu.addClass('is-active');
      $slideMenu.addClass('menu-open');
    },
    onCloseEnd: function() {
      isOpen = false;
      $header.removeClass('open-drawer');
      $menu.removeClass('is-active');
      $slideMenu.removeClass('menu-open');
    },
    edge: 'right'
  });
});
/**
 * @name Banner Animation
 * @function handle canvas animation using vanta.js
 */

var vantaEl = document.getElementById('vanta_art');
$(function(){
  setTimeout(function() {
    if(vantaEl !== null) {
      window.VANTA.HALO({
        el: '#vanta_art',
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 400.00,
        minWidth: 400.00,
        size: 3.00
      })
    }
  }, 1000);
});


/**
 * @name Banner Animation
 * @function handle canvas animation using particles.js
 */

var particlesEl = document.getElementById('particles_background');
$(function(){
  if (particlesEl === null || particlesEl === undefined) {
    return;
  }
  setTimeout(function() {
    window.particlesJS('particles_background', {
      "particles": {
        "number": {
          "value": 6,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#b39ddb"
        },
        "shape": {
          "type": "polygon",
          "stroke": {
            "width": 0,
            "color": "#b39ddb"
          },
          "polygon": {
            "nb_sides": 6
          },
          "image": {
            "src": "img/github.svg",
            "width": 100,
            "height": 100
          }
        },
        "opacity": {
          "value": 0.3,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 160,
          "random": false,
          "anim": {
            "enable": true,
            "speed": 10,
            "size_min": 40,
            "sync": false
          }
        },
        "line_linked": {
          "enable": false,
          "distance": 200,
          "color": "#ffffff",
          "opacity": 1,
          "width": 2
        },
        "move": {
          "enable": true,
          "speed": 8,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": false,
            "mode": "grab"
          },
          "onclick": {
            "enable": false,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 400,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 400,
            "size": 40,
            "duration": 2,
            "opacity": 8,
            "speed": 3
          },
          "repulse": {
            "distance": 200,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
    });
  }, 1000)
});

/**
 * @name slideshow carousel
 * @function handle carousel hero banner
 */

$(function() {
  var $carousel = $('#hero_carousel');
  // Handle carousel
  $carousel.slick({
    dots: false,
    infinite: true,
    speed: 700,
    autoplaySpeed: 5000,
    autoplay: true,
    slidesToShow: 1,
    arrows: false,
    fade: true
  });
});

/**
 * @name video-banner
 * @function handle youtube video banner
 */

$(function(){
  var $youtubeElm = $('#youtube');
  // Initial youtube config
  $youtubeElm.YTPlayer({
    videoId: 'iB_9BlFuHqA',
    width: 1080,
    repeat: true,
    playerVars: {
      autoplay: 1,
      controls: 0,
      rel: 0,
      showinfo: 0,
      mute: 1,
      origin: 'http://localhost:9001'
    }
  });
});


/**
 * @name video-banner
 * @function handle youtube video banner
 * for media hero banner
 */

$(function(){
  var $youtubeElm = $('#youtube-media-banner'),
      $cover = $('#media-banner-cover'),
      isMobile = window.matchMedia(mq.mdDown).matches;
  // Initial youtube config
  $youtubeElm.YTPlayer({
    videoId: $youtubeElm.data('video'),
    repeat: true,
    width: '1080',
    height: '720',
    playerVars: {
      width: '1080',
      height: '720',
      autoplay: 0,
      controls: 0,
      rel: 0,
      showinfo: 0,
      mute: 1,
      origin: 'http://localhost:9000'
    },
    callback: function() {
      videoCallbackEvents();
    }
  });
  
  // Access all of YouTube's API events and methods by using player
  var videoCallbackEvents = function() {
    var player = $youtubeElm.data('ytPlayer').player;
    player.addEventListener('onStateChange', function(){
      if(isMobile) {
        player.pauseVideo();
      } else {
        $cover.hide();
      }
    });
  }
});



/**
 * @name carousel ai/research slider art
 * @function handle carousel with graphic art
 */

$(function() {
  var $carousel = $('#research-carousel');
  $('#prev_research').prop("disabled", true);

  if ($("html").attr("dir") === "rtl") {
    var lastSlide = Math.floor($carousel.data('length') - 2)
    setTimeout(function() {
      $carousel.slick('slickGoTo', lastSlide);
    }, 100);
  }

  if (window.innerWidth > 1279 && $("html").attr("dir") === "rtl") {
    var lastSlide = Math.floor($carousel.data('length') - 2)
    setTimeout(function() {
      $carousel.slick('slickGoTo', lastSlide);
    }, 100)
  }

  // Handle carousel
  $carousel.slick({
    dots: false,
    infinite: false,
    speed: 500,
    autoplay: false,
    slidesToShow: 4,
    arrows: false,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
  
  // Handle slick navigation
  $('#prev_research').click(function() {
    $carousel.slick('slickPrev');
  });
  $('#next_research').click(function() {
    $carousel.slick('slickNext');
  });

  // Fade effect
  var sliderArt = $('#art-ai-research');
  $carousel.on('afterChange', function(slick, currentSlide){
    if (currentSlide.currentSlide >= 1) {
      sliderArt.addClass('faded');
      $('#prev_research').prop("disabled", false);
    } else {
      sliderArt.removeClass('faded');
      $('#prev_research').prop("disabled", true);
    }
  });
});
/**
 @name Header
 @function initial dropdown menu
 @function initial side navigation for mobile
 */

$(document).ready(function(){  
  var $header = $('#header'),
      $menu = $('#mobile_menu_profile'),
      $slideMenu = $('.mobile-nav'),
      isOpen = false;

  // Hamburger menu
  function openMenu() {
    $('#main_menu').fadeIn();
    $menu.addClass('is-active');
    $slideMenu.addClass('menu-open');
    setTimeout(function(){
      $header.addClass('open-drawer');
    }, 10)
  }
  function closeMenu() {
    $('#main_menu').fadeOut();
    $header.removeClass('open-drawer');
    $menu.removeClass('is-active');
    $slideMenu.removeClass('menu-open');
  }
  $menu.click(function() {
    isOpen = !isOpen;
    if(isOpen) {
      openMenu();
    } else {
      closeMenu();
    }
  });
  
  $('#main_menu a').click(function() {
    closeMenu();
    isOpen = false;
  })
})

/**
 * @name testimonial carousel
 * @function handle carousel tag
 */

$(function() {
  var showSlide = 3;
  var $carousel = $('#testimonial_carousel');
  // Slick go to the last slide
  if (window.innerWidth > 1279) {
    var limit = window.innerWidth > 1400 ? 0 : 1
    var lastSlide = Math.floor($carousel.data('length') - showSlide + limit)
    setTimeout(function() {
      $carousel.slick('slickGoTo', lastSlide);
    }, 100)
  }
  // Handle carousel tag
  $carousel.slick({
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: showSlide,
    arrows: false,
    slidesToScroll: 1,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });

  // Fade effect
  var sliderArt = $('#art-avatar-testimonial');
  $carousel.on('afterChange', function(slick, currentSlide){
    var limit = window.innerWidth > 1400 ? 1 : 0
    var edge = Math.floor($carousel.data('length') - showSlide - limit);
    if (currentSlide.currentSlide <= edge) {
      sliderArt.addClass('faded');
    } else {
      sliderArt.removeClass('faded');
    }
  });
});

/**
 * @name news and event carousel
 * @function handle carousel tag
 */

$(function() {
  var $carousel = $('#blog_carousel'),
      $prevNav = $('#prev_blog');
  $prevNav.prop("disabled", true);

  if (window.innerWidth > 1279 && $("html").attr("dir") === "rtl") {
    var lastSlide = Math.floor($carousel.data('length') - 2)
    setTimeout(function() {
      $carousel.slick('slickGoTo', lastSlide);
    }, 100)
  }
  // Handle carousel tag
  $carousel.slick({
    dots: false,
    infinite: false,
    speed: 500,
    autoplay: false,
    slidesToShow: 4,
    arrows: false,
    pauseOnHover: true,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1080,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  $carousel.on('afterChange', function(slick, currentSlide){
    if (currentSlide.currentSlide >= 1) {
      $prevNav.prop("disabled", false);
    } else {
      $prevNav.prop("disabled", true);
    }
  });

  // Handle slick navigation
  $('#prev_blog').click(function() {
    $carousel.slick('slickPrev');
  });
  $('#next_blog').click(function() {
    $carousel.slick('slickNext');
  });
});


/**
 * @name statistic icon carousel
 * @function handle statistic icon carousel
 */

$(function() {
  var $carousel = $('#stats-expertise-carousel');
  // Handle carousel tag
  $carousel.slick({
    dots: false,
    infinite: true,
    speed: 5000,
    autoplaySpeed: 5000,
    autoplay: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
    variableWidth: true,
    cssEase: 'linear',
    responsive: [{
      breakpoint: 960,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    }, {
      breakpoint: 800,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    }, {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }]
  });
});

/**
 * @name gallery carousel
 * @function handle carousel gallery
 */

$(function() {
  var $carousel = $('#gallery_cv_carousel');
  // Handle carousel tag
  $carousel.slick({
    dots: false,
    infinite: false,
    speed: 500,
    autoplay: false,
    slidesToShow: 1,
    arrows: false
  });
  
  $("#filter_cv_gallery.filter button").click(function(){
    var name = $(this).data("filter");
    $("#filter_cv_gallery.filter button").removeClass("selected");
    $(this).addClass("selected");
    if($(".massonry .item[data-category="+name+"]").length < 1) {
      $('#no_data').removeClass("hide")
    } else {
      $('#no_data').addClass("hide")
    }

    if (name !== 'all') {
      $(".massonry .item").css({"visibility": "hidden"}).hide();
      setTimeout(function() {
        $(".massonry .item[data-category="+name+"]").css({"visibility": "visible"}).show();
      }, 10)
    } else {
      setTimeout(function() {
        $(".massonry .item").css({"visibility": "visible"}).show();
      }, 10)
    }
    $(".massonry .item").removeClass("loaded");
    setTimeout(function() {
      $(".massonry .item").addClass("loaded");
    }, 700)
  });

  // Handle popup detail
  $('#image_cv_gallery').each(function() { 
    $(this).magnificPopup({
      delegate: '.item a',
      type: 'image',
      mainClass: 'mfp-with-zoom', // this class is for CSS animation below
      gallery: {
        enabled: true
      },
      zoom: {
        enabled: true, // By default it's false, so don't forget to enable it

        duration: 300, // duration of the effect, in milliseconds
        easing: 'ease-in-out', // CSS transition easing function

        // The "opener" function should return the element from which popup will be zoomed in
        // and to which popup will be scaled down
        // By defailt it looks for an image tag:
        opener: function(openerElement) {
          // openerElement is the element on which popup was initialized, in this case its <a> tag
          // you don't need to add "opener" option if this code matches your needs, it's defailt one.
          return openerElement.is('img') ? openerElement : openerElement.find('img');
        }
      }
    });
  });
  $('#gallery_cv_carousel').each(function() { 
    $(this).magnificPopup({
      delegate: '.item-carousel a',
      type: 'image',
      mainClass: 'mfp-with-zoom', // this class is for CSS animation below
      gallery: {
        enabled: true
      },
      zoom: {
        enabled: true, // By default it's false, so don't forget to enable it

        duration: 300, // duration of the effect, in milliseconds
        easing: 'ease-in-out', // CSS transition easing function

        // The "opener" function should return the element from which popup will be zoomed in
        // and to which popup will be scaled down
        // By defailt it looks for an image tag:
        opener: function(openerElement) {
          // openerElement is the element on which popup was initialized, in this case its <a> tag
          // you don't need to add "opener" option if this code matches your needs, it's defailt one.
          return openerElement.is('img') ? openerElement : openerElement.find('img');
        }
      }
    });
  });
});
/**
 * @name carousel blockchain/project slider art
 * @function handle carousel with graphic art
 */

$(function() {
  var $carousel = $('#projects-carousel');
  $('#prev_project').prop("disabled", true);

  if ($("html").attr("dir") === "rtl") {
    var lastSlide = Math.floor($carousel.data('length') - 2)
    setTimeout(function() {
      $carousel.slick('slickGoTo', lastSlide);
    }, 100);
  }

  if (window.innerWidth > 1279 && $("html").attr("dir") === "rtl") {
    var lastSlide = Math.floor($carousel.data('length') - 2)
    setTimeout(function() {
      $carousel.slick('slickGoTo', lastSlide);
    }, 100)
  }

  // Handle carousel
  $carousel.slick({
    dots: true,
    infinite: false,
    speed: 500,
    autoplay: false,
    slidesToShow: 4,
    arrows: false,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
  
  // Handle slick navigation
  $('#prev_project').click(function() {
    $carousel.slick('slickPrev');
  });
  $('#next_project').click(function() {
    $carousel.slick('slickNext');
  });

  // Fade effect
  var sliderArt = $('#art-blockchain-projects');
  $carousel.on('afterChange', function(slick, currentSlide){
    if (currentSlide.currentSlide >= 1) {
      sliderArt.addClass('faded');
      $('#prev_project').prop("disabled", false);
    } else {
      sliderArt.removeClass('faded');
      $('#prev_project').prop("disabled", true);
    }
  });
});


/**
 * @name Animation Slider blockchain/event slider
 * @function event slider carousel
 */

var transition = {
  section: {
    show: "slideInUp",
    hide: "slideOutUp",
    delayShow: "delay0s"
  },
  figure: {
    show: "slideInUp",
    hide: "slideOutUp",
    delayShow: "delay0s"
  },
  h1: {
    show: "fadeInUp",
    hide: "fadeOutDown",
    delayShow: "delay0s"
  },
  article: {
    show: "fadeInUp",
    hide: "fadeOutDown",
    delayShow: "delay0s"
  },
}

$(function(){
  // animate slider
  $(".anim-slider").animateSlider({
    autoplay: true,
    interval: 20000,
    pagination: false,
    animations: {
      0: transition,
      1: transition,
      2: transition,
      3: transition,
    }
  });

  // Swipe
  $(".anim-slider").swipe( {
    //Generic swipe handler for all directions
    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
      if (direction === 'left') {
        $('.anim-arrows-prev').click()
      } else {
        $('.anim-arrows-next').click()
      }
    }
  });
});
/**
 * @name video-banner
 * @function handle youtube video banner
 */

$(function(){
  var $youtubeElm = $('#youtube-liquid-bg'),
      $cover = $('#banner-cover'),
      isMobile = window.matchMedia(mq.mdDown).matches;
  // Initial youtube config
  $youtubeElm.YTPlayer({
    videoId: '0cdLuY6R_kI',
    repeat: true,
    width: '1080',
    height: '720',
    playerVars: {
      width: '1080',
      height: '720',
      autoplay: 0,
      controls: 0,
      rel: 0,
      showinfo: 0,
      mute: 1,
      origin: 'http://localhost:9000'
    },
    callback: function() {
      videoCallbackEvents();
    }
  });
  
  // Access all of YouTube's API events and methods by using player
  var videoCallbackEvents = function() {
    var player = $youtubeElm.data('ytPlayer').player;
    player.addEventListener('onStateChange', function(){
      if(isMobile) {
        player.pauseVideo();
      } else {
        $cover.hide();
      }
    });
  }
});


/**
 * @name Price Chart
 * @function handle feature chart
 */

var coinData = [
  {
    status: 'up',
    dataCollection: [11, 13, 10, 4, 10, 12, 13, 16, 17, 20, 16, 16, 13, 10, 4, 6, 8, 9, 13, 16, 17, 20, 14, 16]
  },
  {
    status: 'up',
    dataCollection: [13, 16, 17, 20, 16, 16, 13, 10, 11, 29, 10, 4, 10, 12, 4, 17, 20, 16, 6, 8, 9, 13, 16, 17]
  },
  {
    status: 'down',
    dataCollection: [10, 12, 13, 16, 17, 20, 16, 16, 13, 11, 8, 10, 4, 10, 4, 6, 8, 9, 13, 16, 17, 20, 16, 6]
  },
  {
    status: 'up',
    dataCollection: [11, 10, 10, 16, 16, 13, 10, 4, 6, 8, 9, 13, 16, 17, 20, 16, 16, 4, 10, 12, 13, 16, 17, 20]
  },
  {
    status: 'down',
    dataCollection: [11, 9, 10, 4, 10, 12, 13, 16, 17, 20, 16, 16, 13, 10, 4, 6, 8, 9, 13, 16, 17, 20, 16, 16]
  }
]

function chartConfig(st, values) {
  var color = '';
  var cl = '';
  var gradient = ctx.createLinearGradient(0, 0, 0, 450);
  if (st === 'up') {
    cl = '93, 214, 98';
    color = 'rgb('+cl+')';

    gradient.addColorStop(0, 'rgba('+cl+', 0.5)');   
    gradient.addColorStop(0.15, 'rgba('+cl+', 0.0)');   
    gradient.addColorStop(1, 'rgba('+cl+', 0.0)');   
  } else if (st === 'down') {
    cl = '255, 114, 114';
    color = 'rgb('+cl+')';

    gradient.addColorStop(0, 'rgba('+cl+', 0.5)');   
    gradient.addColorStop(0.15, 'rgba('+cl+', 0.0)');   
    gradient.addColorStop(1, 'rgba('+cl+', 0.0)');   
  } else {
    cl = '185, 185, 185';
    color = 'rgb('+cl+')';

    gradient.addColorStop(0, 'rgba('+cl+', 0.5)');   
    gradient.addColorStop(0.2, 'rgba('+cl+', 0.0)');   
    gradient.addColorStop(1, 'rgba('+cl+', 0.0)');   
  }
  return {
    borderColor: color,
    backgroundColor: gradient,
    pointStyle: 'cross',
    fill: true,
    data: values
  }
}

var chartStyle = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  }
}

if($('#wallet-chart-price, #fintech-chart-price').length > 0) {
  for(var i = 0; i < coinData.length; i++) {
    var ctx = document.getElementById('chart_canvas'+i).getContext('2d');
    new Chart(
      ctx,
      {
        type: 'line',
        data: {
          labels: ['1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM', '10PM', '11PM', '00AM', '1AM', '2AM', '3AM', '4AM', '5AM', '6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12PM'],
          datasets: [chartConfig(coinData[i].status, coinData[i].dataCollection)]
        },
        options: {
          plugins: {
            legend: {
              display: false
            },
          },
          scales: {
            y: {
              display: false,
              grid: {
                borderWidth: 0,
                color: 'transparent'
              }
            },
            x: {
              display: false,
              grid: {
                borderWidth: 0,
                color: 'transparent'
              }
            }
          }
        }
      }
    );
  }
}

/**
 * @name Banner Slider Flip for Landing NFT v1
 * @function handle multiple slider
 */

$(function() {
  var $flip1 = $('.fade-slider #flip1'),
      $flip2 = $('.fade-slider #flip2'),
      $flip3 = $('.fade-slider #flip3'),
      $flip4 = $('.fade-slider #flip4');

  var slickOpts = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    fade: true,
    arrows: false,
    pauseOnHover: false
  };

  $flip1.slick({
    autoplaySpeed: 5000,
    ...slickOpts
  });
  $flip2.slick({
    autoplaySpeed: 6000,
    ...slickOpts
  });
  $flip3.slick({
    autoplaySpeed: 7000,
    ...slickOpts
  });
  $flip4.slick({
    autoplaySpeed: 8000,
    ...slickOpts
  });
})

/**
 * @name Banner Slider Carousel for Landing NFT v2
 * @function handle multiple slider
 */
$(function() {
  var $fadeCarousel = $('#fade-slider'),
      $rollCarousel = $('#roll-slider');

  $fadeCarousel.slick({
    dots: false,
    infinite: true,
    speed: 500,
    fade: true,
    arrows: false,
    asNavFor: '.multi-slider'
  });

  $rollCarousel.slick({
    autoplay: true,
    autoplaySpeed: 10000,
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    arrows: false,
    asNavFor: '.single-slider',
    responsive: [
      {
        breakpoint: 600,
        settings: {
          variableWidth: true,
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
});



/**
 * @name Parallax Fog Blur Effect
 * @function handle generating random blur for all nft parallax
 */
$(function() {
  $('.parallax-blur .fog .double-light').css(randomShape(100, 300, 600, 500, 120));
  $('.parallax-blur .fog .double-main').css(randomShape(200, 200, 100, 400, 9));
  $('.parallax-blur .fog .double-dark').css(randomShape(400, 100, 400, 500, 160));

  $('.parallax-blur .fog .triple-light').css(randomShape(200, 200, 100, 400, 90));
  $('.parallax-blur .fog .triple-main').css(randomShape(100, 300, 600, 500, 120));
  $('.parallax-blur .fog .triple-dark').css(randomShape(400, 100, 400, 500, 160));

  $('.parallax-blur .fog .primary-light').css(randomShape(100, 300, 600, 500, 120));
  $('.parallax-blur .fog .primary-dark').css(randomShape(300, 100, 60, 500, 200));
  
  $('.parallax-blur .fog .secondary-light').css(randomShape(300, 500, 500, 20, 60));
  $('.parallax-blur .fog .secondary-dark').css(randomShape(200, 400, 400, 300, 60));

  $('.parallax-blur .fog .accent').css(randomShape(200, 400, 400, 300, 60));
});

/**
 * @name Auction Slider
 * @function handle auction slider and slider art
 */

$(function() {
  var $carousel = $('#auction-carousel');
  $('#prev_auction').prop("disabled", true);

  if ($("html").attr("dir") === "rtl") {
    var lastSlide = Math.floor($carousel.data('length') - 2)
    setTimeout(function() {
      $carousel.slick('slickGoTo', lastSlide);
    }, 100);
  }

  if (window.innerWidth > 1279 && $("html").attr("dir") === "rtl") {
    var lastSlide = Math.floor($carousel.data('length') - 2)
    setTimeout(function() {
      $carousel.slick('slickGoTo', lastSlide);
    }, 100)
  }

  // Handle carousel
  $carousel.slick({
    dots: false,
    infinite: false,
    speed: 500,
    autoplay: false,
    slidesToShow: 3,
    arrows: false,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
  
  // Handle slick navigation
  $('#prev_auction').click(function() {
    $carousel.slick('slickPrev');
  });
  $('#next_auction').click(function() {
    $carousel.slick('slickNext');
  });

  // Fade effect
  var sliderArt = $('#art-nft-auction');
  $carousel.on('afterChange', function(slick, currentSlide){
    if (currentSlide.currentSlide >= 1) {
      sliderArt.addClass('faded');
      $('#prev_auction').prop("disabled", false);
      $('#nft-auction .slider-wrap').css('z-index', 11);
    } else {
      sliderArt.removeClass('faded');
      $('#prev_auction').prop("disabled", true);
      $('#nft-auction .slider-wrap').css('z-index', 0);
    }
  });

  $('.nft-slider-art .fog .triple-main').css(randomShape(100, 300, 600, 500, 120));
  $('.nft-slider-art .fog .triple-dark').css(randomShape(200, 400, 400, 300, 60));
  $('.nft-slider-art .fog .secondary-dark').css(randomShape(200, 200, 100, 400, 90));
  $('.nft-slider-art .fog .triple-light').css(randomShape(400, 500, 400, 500, 160));
  // end
});

/**
 * @name Slider Animation zIndex
 * @function handle z-index between carousel and blur animation
 */
$('#auction-carousel .item')
  .on("mouseover", function() {
    $('#nft-auction .slider-wrap').css('z-index', 11);
  })
  .on("mouseout", function() {
    $('#nft-auction .slider-wrap').css('z-index', 0);
  })

/**
 * @name Auction Slider2
 * @function handle auction fade slider
 */

$(function() {
  var $carousel = $('#auction-fade-slider');
  // Handle carousel
  $carousel.slick({
    dots: true,
    arrows: false,
    speed: 500,
    autoplaySpeed: 10000,
    infinite: true,
    autoplay: true,
    fade: true,
    cssEase: 'ease-out',
  });

  // Handle slick navigation
  $('#prev_fade_auction').click(function() {
    $carousel.slick('slickPrev');
  });
  $('#next_fade_auction').click(function() {
    $carousel.slick('slickNext');
  });
});
/**
 * @name Language
 * @function redirect to language specified page
 * @function via js through header and footer
 */

$(function(){
  // Language select in Headed
  $('#lang_menu li').click(function(){
    var $el_target = $(this).children();
    var url = window.location.toString(),
        path = window.location.pathname.split('/'),
        path_lang = path[path.length - 2],
        file = path[path.length - 1]
    var lang = $el_target.data("lang");
    
    window.location = url.replace(path_lang + "/" + file, lang + "/" + file);
  })
  
  // Language select in footer
  $('#lang_select').on('change', function() {
    var lang = $(this).val(); 
    var url = window.location.toString(),
        path = window.location.pathname.split('/'),
        path_lang = path[path.length - 2],
        file = path[path.length - 1]
    
    if(lang) {
      window.location = url.replace(path_lang + "/" + file, lang + "/" + file);
    }
    return false;
  });
});
// Initialize and add the map
(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})
        ({key: "AIzaSyCey8Yfn5LLE3pG4lQT41bMdTvwCZVVepU", v: "weekly"});

let map;
var mapEl = document.getElementById("map");

async function initMap() {
  // The location of Uluru
  const position = { lat: 44.933076, lng: 15.629058 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru
  map = new Map(mapEl, {
    zoom: 6,
    center: position,
    mapId: "DEMO_MAP_ID",
  });

  // The marker, positioned at Uluru
  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: "Uluru",
  });
}

if (mapEl) {
  initMap();
}
/**
 * Handle css class by using Media query
 * @alias xs, sm, md, lg, xl
 */

var mq = {
  smUp: "screen and (min-width: 600px)",
  mdUp: "screen and (min-width: 960px)",
  lgUp: "screen and (min-width: 1280px)",
  xlUp: "screen and (min-width: 1440px)",
  smDown: "screen and (max-width: 599px)",
  mdDown: "screen and (max-width: 959px)",
  lgDown: "screen and (max-width: 1279px)",
  xlDown: "screen and (max-width: 1439px)",
  sm: "screen and (min-width: 600px) and (max-width: 960px)",
  md: "screen and (min-width: 960px) and (max-width: 1280px)",
  lg: "screen and (min-width: 1280px) and (max-width: 1440px)",
  xl: "screen and (min-width: 1400px) and (max-width: 2560px)",
}

function mqAddClass(selectors) {
  $('#main-wrap').addClass(selectors);
}

function mqRemoveClass(selectors) {
  $('#main-wrap').removeClass(selectors);
}

// Define handler action
var handler_smUp = {
      match : function() { mqAddClass('mq-sm-up')},
      unmatch : function() { mqRemoveClass('mq-sm-up')}
    },
    handler_mdUp = {
      match : function() { mqAddClass('mq-md-up')},
      unmatch : function() { mqRemoveClass('mq-md-up')}
    },
    handler_lgUp = {
      match : function() { mqAddClass('mq-lg-up')},
      unmatch : function() { mqRemoveClass('mq-lg-up')}
    },
    handler_xlUp = {
      match : function() { mqAddClass('mq-xl-up')},
      unmatch : function() { mqRemoveClass('mq-xl-up')}
    },
    handler_smDown = {
      match : function() { mqAddClass('mq-sm-down')},
      unmatch : function() { mqRemoveClass('mq-sm-down')}
    },
    handler_mdDown = {
      match : function() { mqAddClass('mq-md-down')},
      unmatch : function() { mqRemoveClass('mq-md-down')}
    },
    handler_lgDown = {
      match : function() { mqAddClass('mq-lg-down')},
      unmatch : function() { mqRemoveClass('mq-lg-down')}
    },
    handler_xlDown = {
      match : function() { mqAddClass('mq-xl-down')},
      unmatch : function() { mqRemoveClass('mq-xl-down')}
    },
    handler_sm = {
      match : function() { mqAddClass('mq-sm')},
      unmatch : function() { mqRemoveClass('mq-sm')}
    },
    handler_md = {
      match : function() { mqAddClass('mq-md')},
      unmatch : function() { mqRemoveClass('mq-md')}
    },
    handler_lg = {
      match : function() { mqAddClass('mq-lg')},
      unmatch : function() { mqRemoveClass('mq-lg')}
    },
    handler_xl = {
      match : function() { mqAddClass('mq-xl')},
      unmatch : function() { mqRemoveClass('mq-xl')}
    };

// Register to enquire.js
enquire
  .register(mq.smUp, handler_smUp)
  .register(mq.mdUp, handler_mdUp)
  .register(mq.lgUp, handler_lgUp)
  .register(mq.xlUp, handler_xlUp)
  .register(mq.smDown, handler_smDown)
  .register(mq.mdDown, handler_mdDown)
  .register(mq.lgDown, handler_lgDown)
  .register(mq.xlDown, handler_xlDown)
  .register(mq.sm, handler_sm)
  .register(mq.md, handler_md)
  .register(mq.lg, handler_lg)
  .register(mq.xl, handler_xl);

/**
 * @name news and event carousel
 * @function handle carousel tag
 */

$(function() {
  var $carousel = $('#news-carousel');
  // Handle carousel tag
  $carousel.slick({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    arrows: false,
    autoplay: false,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          variableWidth: true,
        }
      }
    ]
  });
});
/**
 * @name parallax-title
 * @function to handle big title with scroll parallax
 */

var offset = 24;

// Handle window scroll to adjust element transformation and opacity
$(function() {
  var $decoTitle = $('.parallax-title .deco-title:not(".static")');

  var divider = window.innerWidth > 600 ? 1.5 : 3;

  // Set element transformation and opacity
  function setTransformTitle(transform, el) {
    $(el).parent().css('padding-top', (transform - offset) + 'px');
    if (transform > 30) {
      $(el).css('opacity', transform / 300);
    } else {
      $(el).css('opacity', 0.15);
    }
  }

  setTimeout(function() {
    $(window).scroll(function() {
      if ($decoTitle.length > 0) {
        $decoTitle.each(function() {
          var coordinat = $(this)[0].getBoundingClientRect();

          if (coordinat.top > 0) {
            var transform = coordinat.top / divider;
            setTransformTitle(transform, $(this));
          } else {
            setTransformTitle(offset, $(this));
          }
        });
      }
    });
  }, 500);
});


$(document).ready(function(){
  /**
   * @name Lightbox
   * @function handle slider carousel for detail item
   * @function handle lightbox popup for detail item
   */

  var $miniGallery = $('#mini_gallery');

  $miniGallery.each(function() {
    $(this).magnificPopup({
      delegate: '.item a',
      type: 'image',
      mainClass: 'mfp-with-zoom', // this class is for CSS animation below
      gallery: {
        enabled: true
      },
      zoom: {
        enabled: true, // By default it's false, so don't forget to enable it

        duration: 300, // duration of the effect, in milliseconds
        easing: 'ease-in-out', // CSS transition easing function

        // The "opener" function should return the element from which popup will be zoomed in
        // and to which popup will be scaled down
        // By defailt it looks for an image tag:
        opener: function(openerElement) {
          // openerElement is the element on which popup was initialized, in this case its <a> tag
          // you don't need to add "opener" option if this code matches your needs, it's defailt one.
          return openerElement.is('img') ? openerElement : openerElement.find('img');
        }
      }
    });
  });

  var expand = false;
  $('#show_all_gallery').click(function() {
    $miniGallery.parent().toggleClass('expand');
    expand = !expand;
    if (expand) {
      $(this).text('Hide Some Media');
    } else {
      $(this).text('Show All Media');
    }
  });
});


/**
 * @name Lightbox
 * @function handle slider carousel for detail item
 * @function handle lightbox popup for detail item
 */


$(document).ready(function(){
  var $detailCarousel = $('#detail_carousel');

  // slick carousel album
  $detailCarousel.slick({
    dots: true,
    arrows: false,
    slidesToShow: 1,
    infinite: false,
    autoplay: false
  });

  $detailCarousel.each(function() {
    $(this).magnificPopup({
      delegate: '.image a',
      type: 'image',
      mainClass: 'mfp-with-zoom', // this class is for CSS animation below
      gallery: {
        enabled: true
      },
      zoom: {
        enabled: true, // By default it's false, so don't forget to enable it

        duration: 300, // duration of the effect, in milliseconds
        easing: 'ease-in-out', // CSS transition easing function

        // The "opener" function should return the element from which popup will be zoomed in
        // and to which popup will be scaled down
        // By defailt it looks for an image tag:
        opener: function(openerElement) {
          // openerElement is the element on which popup was initialized, in this case its <a> tag
          // you don't need to add "opener" option if this code matches your needs, it's defailt one.
          return openerElement.is('img') ? openerElement : openerElement.find('img');
        }
      }
    });
  });
});


/**
 * @name Product Chart
 * @function handle product chart
 */

var coinData = {
  status: 'up',
  dataCollection: [13, 10, 4, 6, 8, 9, 13, 16, 17, 20, 14, 16]
};

function chartConfig(st, values) {
  var color = '';
  var cl = '';
  var gradient = ctx.createLinearGradient(0, 100, 0, 600);
  if (st === 'up') {
    cl = '93, 214, 98';
    color = 'rgb('+cl+')';

    gradient.addColorStop(0, 'rgba('+cl+', 0.5)');   
    gradient.addColorStop(0.15, 'rgba('+cl+', 0.0)');   
    gradient.addColorStop(1, 'rgba('+cl+', 0.0)');   
  } else if (st === 'down') {
    cl = '255, 114, 114';
    color = 'rgb('+cl+')';

    gradient.addColorStop(0, 'rgba('+cl+', 0.5)');   
    gradient.addColorStop(0.15, 'rgba('+cl+', 0.0)');   
    gradient.addColorStop(1, 'rgba('+cl+', 0.0)');   
  } else {
    cl = '185, 185, 185';
    color = 'rgb('+cl+')';

    gradient.addColorStop(0, 'rgba('+cl+', 0.5)');   
    gradient.addColorStop(0.2, 'rgba('+cl+', 0.0)');   
    gradient.addColorStop(1, 'rgba('+cl+', 0.0)');   
  }
  return {
    borderColor: color,
    backgroundColor: gradient,
    pointStyle: 'cross',
    fill: true,
    data: values
  }
}

var chartStyle = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  }
}

if($('#chart_product_detail').length > 0) {
  var ctx = document.getElementById('chart_product_detail').getContext('2d');
  new Chart(
    ctx,
    {
      type: 'line',
      data: {
        labels: ['1PM', '3PM', '5PM', '7PM', '9PM', '11PM', '1AM', '3AM', '5AM', '7AM', '9AM', '11AM'],
        datasets: [chartConfig(coinData.status, coinData.dataCollection)]
      },
      options: {
        plugins: {
          legend: {
            display: false
          },
        },
        scales: {
          x: {
            grid: {
              borderWidth: 0,
              color: 'transparent'
            }
          },
          y: {
            grid: {
              borderWidth: 1,
              color: 'rgba(131, 131, 131, 0.35)',
            }
          },
        }
      }
    }
  );
}


/**
 * @name carousel related services slider
 * @function handle carousel related services slider
 */

$(function() {
  var $carousel = $('#service-carousel');
  $('#prev_related_services').prop("disabled", true);

  // Handle carousel
  $carousel.slick({
    dots: true,
    infinite: false,
    speed: 500,
    autoplay: false,
    slidesToShow: 3,
    arrows: false,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  $carousel.on('afterChange', function(slick, currentSlide){
    if (currentSlide.currentSlide >= 1) {
      $('#prev_related_services').prop("disabled", false);
    } else {
      $('#prev_related_services').prop("disabled", true);
    }
  });

  // Handle slick navigation
  $('#prev_related_services').click(function() {
    $carousel.slick('slickPrev');
  });
  $('#next_related_services').click(function() {
    $carousel.slick('slickNext');
  });
});
/**
 * @name testimonial carousel
 * @function handle carousel tag
 */

$(function() {
  var $carousel = $('#testimonial-carousel');
  // Handle carousel tag
  $carousel.slick({
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 7000,
    slidesToShow: 3,
    arrows: false,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
  
  // Handle slick navigation
  $('#prev_testi').click(function() {
    $carousel.slick('slickPrev');
  });
  $('#next_testi').click(function() {
    $carousel.slick('slickNext');
  });
});
/**
 * @name video-iframe
 * @function handle youtube video iframe
 */

// 1. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 2. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.


document.addEventListener('DOMContentLoaded', function() {
  var player;
  function onYouTubeIframeAPIReady(id) {
    player = new YT.Player('video_iframe', {
      height: '360',
      width: '640',
      videoId: id,
      playerVars : {
        autoplay: 1,
        rel: 0,
      },
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  }

  // 3. The API will call this function when the video player is ready.
  function onPlayerReady(event) {
    // event.target.playVideo();
  }

  // 4. The API calls this function when the player's state changes.
  //    The function indicates that when playing a video (state=1),
  //    the player should play for six seconds and then stop.
  var done = false;
  function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
      // setTimeout(stopVideo, 6000);
      done = true;
    }
  }

  function playVideo() {
    player.playVideo();
  }

  function stopVideo() {
    player.stopVideo();
  }
  var videoModal = document.getElementById('video_modal');
  var instances = M.Modal.init(videoModal, {
    onOpenEnd: function(e, btn) {
      var videoId = btn.getAttribute("data-video");
      onYouTubeIframeAPIReady(videoId);
    },
    onCloseEnd: function() {
      stopVideo();
    }
  });
});

$(function() {
  $('#video_modal.modal .modal-close').click(function(){
    stopVideo();
  })
});
