$.fn.slider = function(configuration) {
  const settings = $.extend( {}, {
    selector: {
      slides: '.slides',
      slide: '.slide'
    }
  }, configuration);
  return this.each(function() {
    const slider = $(this);
    let navigationAbility = true;
    function activeSlide(index) {
      const currentIndex = $([...$(settings.selector.slide, slider)].filter(slide => $(slide).hasClass('status--active'))).index();
      if (currentIndex !== index) {
        navigationAbility = false;
        const activeSlides = $([...$(settings.selector.slide, slider)].filter(slide => $(slide).hasClass('status--active')));
        activeSlides.each(function() {
          $(this).addClass('transition');
          $(this).removeClass('status--active');
          $(this).addClass(currentIndex < index ? 'end' : 'start');
        });
        $([...$(settings.selector.slide, slider)][index]).addClass(currentIndex < index ? 'start' : 'end');
        window.getComputedStyle($([...$(settings.selector.slide, slider)][index])[0]).getPropertyValue('transform');
        $([...$(settings.selector.slide, slider)][index]).addClass('transition');
        $([...$(settings.selector.slide, slider)][index]).removeClass(currentIndex < index ? 'start' : 'end');
        function transitionEndFunction(event) {
          activeSlides.each(function() {
            $(this).removeClass('transition');
            $(this).removeClass(currentIndex < index ? 'end' : 'start');
          });
          event.target.classList.remove('transition');
          event.target.removeEventListener('transitionend', transitionEndFunction);
          navigationAbility = true;
        }
        [...$(settings.selector.slide, slider)][index].addEventListener('transitionend', transitionEndFunction);
      } else {
        $(settings.selector.slide, slider).each(function() {
          $(this).removeClass('status--active');
        });
      }
      $([...$(settings.selector.slide, slider)][index]).addClass('status--active');
    }
    function nextSlide() {
      if (navigationAbility) {
        const currentIndex = $([...$(settings.selector.slide, slider)].filter(slide => $(slide).hasClass('status--active'))).index();
        let nextIndex = currentIndex;
        nextIndex = ++nextIndex < [...$(settings.selector.slide, slider)].length ? nextIndex : 0;
        if (currentIndex !== nextIndex) {
          activeSlide(nextIndex);
        }
      }
    }
    function previousSlide() {
      if (navigationAbility) {
        const currentIndex = $([...$(settings.selector.slide, slider)].filter(slide => $(slide).hasClass('status--active'))).index();
        let previousIndex = currentIndex;
        previousIndex = --previousIndex >= 0 ? previousIndex : ([...$(settings.selector.slide, slider)].length - 1);
        if (currentIndex !== previousIndex) {
          activeSlide(previousIndex);
        }
      }
    }
    if ([...$(settings.selector.slide, slider)].filter(slide => $(slide).hasClass('status--active')).length !== 1) {
      activeSlide(0);
    } else {
      activeSlide($([...$(settings.selector.slide, slider)].filter(slide => $(slide).hasClass('status--active'))).index());
    }
    $('.type--next', slider).on('click', function() {
      nextSlide();
    });
    $('.type--previous', slider).on('click', function() {
      previousSlide();
    });
  });
};