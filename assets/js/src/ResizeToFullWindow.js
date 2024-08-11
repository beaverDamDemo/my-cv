var ResizeToFullWindow = (function () {
  'use strict';

  var $wrapper = $('#wrapper');

  function resizeWrapper () {
    var width = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;

      var height = window.innerHeight
      || document.documentElement.clientHeight
      || document.body.clientHeight;

    var ratioWidth = width / 1024;

    $($wrapper[0]).css({
      'transform': 'scale(' + ratioWidth + ') translateX(-50%)',
      '-webkit-transform': 'scale(' + ratioWidth + ') translateX(-50%)',
      '-moz-transform': 'scale(' + ratioWidth + ') translateX(-50%)',
      '-o-transform': 'scale(' + ratioWidth + ') translateX(-50%)',
      '-ms-transform': 'scale(' + ratioWidth + ') translateX(-50%)',
      'left' : '50%'
    });
  };
  resizeWrapper();

  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  var myEfficientFn = debounce(function() {
    console.log('debaunce');
    resizeWrapper();
  }, 50);

  window.addEventListener('resize', myEfficientFn);

  return {
    scale: resizeWrapper
  }

})();