$(document).ready(function() {
  $('.scroll-top-switcher').on('click', function () {
    $("html, body").animate({ scrollTop: 0 }, 600);
  });
  $('.scroll-main-switcher').on('click', function () {
    $("html, body").animate({scrollTop: $('main').offset().top}, 600);
  });
  $('.slider').slider({
    selector: {
      slides: '.slider__slides',
      slide: '.slider__slide'
    }
  });
  $('.testimonials').slider({
    selector: {
      slides: '.testimonials__testimonials',
      slide: '.testimonials__testimonial'
    }
  });
});