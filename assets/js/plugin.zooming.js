$.fn.zooming = function (configuration) {
  const settings = $.extend( {}, {
    selector: {
      stage: '.stage',
      slides: '.slides',
      slide: '.slide'
    }
  }, configuration);
  return this.each(function () {
    const zooming = $(this);
    function activeSlide(number) {
      $(settings.selector.slide, zooming).each(function () {
        $(this).removeClass('status--active');
      });
      $([...$(settings.selector.slide, zooming)][number-1]).addClass('status--active');
      $('img', $(settings.selector.stage, zooming)).attr('src', $('img', $([...$(settings.selector.slide, zooming)][number-1])).attr('src'));
    }
    $(settings.selector.slide, zooming).on('click', settings.selector.bullet, function (e) {
      e.preventDefault();
      activeSlide($(this).index()+1);
    });
    $([...$(settings.selector.slide, zooming)][0]).trigger('click');
  });
};