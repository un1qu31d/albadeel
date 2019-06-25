$.fn.categorization = function (configuration) {
  const settings = $.extend( {}, {
    slidesBerPage: 8,
    templates: {
      bullet: '<li><a class="courses__bullet" href="#"></a></li>'
    },
    selector: {
      slides: '.slides',
      slide: '.slide',
      bullets: '.bullets',
      bullet: '.bullet',
      tags: '.tags',
      tag: '.tag'
    }
  }, configuration);
  return this.each(function () {
    const categorization = $(this);
    function activePage(number) {
      $(settings.selector.slide, categorization).each(function () {
        $(this).removeClass('status--active');
      });
      $(settings.selector.bullet, categorization).each(function () {
        $(this).removeClass('status--active');
      });
      $([...$(settings.selector.bullet, categorization)][number-1]).addClass('status--active');
      [...$(settings.selector.slide, categorization)]
      .filter(slide => $(slide).hasClass('status--available'))
      .filter((slide, index) => (index >= ((number * settings.slidesBerPage) - settings.slidesBerPage)) && (index < (number * settings.slidesBerPage)))
      .forEach(slide => {
        $(slide).addClass('status--active');
      });
    }
    function pagination() {
      $(settings.selector.bullet, categorization).remove();
      const availableSlidesCount = [...$(settings.selector.slide, categorization)].filter(slide => $(slide).hasClass('status--available')).length;
      let pagesCount = Math.ceil(availableSlidesCount / settings.slidesBerPage);
      while(pagesCount) {
        $(settings.selector.bullets, categorization).append(settings.templates.bullet);
        pagesCount--;
      }
      activePage(1);
    }
    function showSlidesByTags(tags) {
      $(settings.selector.slide, categorization).each(function () {
        $(this).removeClass('status--available');
        $(this).removeClass('status--active');
      });
      $(settings.selector.tag, categorization).each(function () {
        $(this).removeClass('status--active');
      });
      [...$(settings.selector.tag, categorization)]
      .filter(tag => {
        return $(tag).data('tag').toString().split(',').toString() === tags.toString();
      })
      .forEach(tag => {
        $(tag).addClass('status--active');
      });
      [...$(settings.selector.slide, categorization)]
      .filter(slide => $(slide).data('tag').toString().split(',').some(tag => tags.indexOf(tag) !== -1))
      .forEach(slide => {
        $(slide).addClass('status--available');
      });
      pagination();
    }
    $(settings.selector.tag, categorization).on('click', function (e) {
      e.preventDefault();
      showSlidesByTags($(this).data('tag').toString().split(','));
    });
    $(categorization).on('click', settings.selector.bullet, function (e) {
      e.preventDefault();
      activePage($(this).index()+1);
    });
    $([...$(settings.selector.tag, categorization)][0]).trigger('click');
  });
};