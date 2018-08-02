var ResizeToFullWindow = (function () {
  'use strict';

  var $wrapper = $('#wrapper');

  function resizeWrapper () {
    console.log(' resizing')
    var width = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;

      var height = window.innerHeight
      || document.documentElement.clientHeight
      || document.body.clientHeight;

    width = $('body').width();
    height = $('body').height();
    console.log('alt width, height: ', $('body').width(), ' ,', $('body').height() );

    // var ratioHeightWidth = width / 1024;
    var ratioHeightWidth = $('body').width() / 1024;
    // console.log('ratioHeightWidth', ratioHeightWidth);

    // var ratioHeight = height / 768;
    var ratioHeight = $('body').height() / 768;
    // console.log('ratioHeight', ratioHeight);

    console.log('ratioHeightWidth: ', ratioHeightWidth, 'ratioHeight: ', ratioHeight, 'width, height: ', width, ',', height)

    var ratioToUse = (ratioHeightWidth < ratioHeight) ? ratioHeightWidth:ratioHeight;

    var scaleRatioLabel;
    if(ratioHeightWidth < ratioHeight) {
      scaleRatioLabel = 'w';
    }
    else {
      scaleRatioLabel = 'h';
    }

    window.scaleRatio = ratioToUse;
    window.scaleRatioLabel = scaleRatioLabel;


    $($wrapper[0]).css({
      'transform': 'scale(' + ratioToUse + ') translateX(-50%)',
      '-webkit-transform': 'scale(' + ratioToUse + ') translateX(-50%)',
      '-moz-transform': 'scale(' + ratioToUse + ') translateX(-50%)',
      '-o-transform': 'scale(' + ratioToUse + ') translateX(-50%)',
      '-ms-transform': 'scale(' + ratioToUse + ') translateX(-50%)',
      'left' : '50%'
    });
    // $($wrapper[0]).css({
    //   'transform': 'scale(' + ratioToUse + ') translateX(0%)',
    //   '-webkit-transform': 'scale(' + ratioToUse + ') translateX(0%)',
    //   '-moz-transform': 'scale(' + ratioToUse + ') translateX(0%)',
    //   '-o-transform': 'scale(' + ratioToUse + ') translateX(0%)',
    //   '-ms-transform': 'scale(' + ratioToUse + ') translateX(0%)',
    //   'left' : '0%'
    // });
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
    // console.log('debaunce');
    resizeWrapper();
  }, 50);

  window.addEventListener('resize', myEfficientFn);

  function resetScale () {
    console.log(" resetting scael")
    var $_wrapper = $($wrapper[0]);

    $_wrapper.css({
      'transform': 'scale(' + 1 + ') translateX(-0%)',
      '-webkit-transform': 'scale(' + 1 + ') translateX(-0%)',
      '-moz-transform': 'scale(' + 1 + ') translateX(-0%)',
      '-o-transform': 'scale(' + 1 + ') translateX(-0%)',
      '-ms-transform': 'scale(' + 1 + ') translateX(-0%)',
      'left' : '0%',
      'transition' : 'all 0s linear'
    });
    // $_wrapper.css({
    //   'transform': 'scale(' + 1 + ') translateX(-0%)',
    //   '-webkit-transform': 'scale(' + 1 + ') translateX(-0%)',
    //   '-moz-transform': 'scale(' + 1 + ') translateX(-0%)',
    //   '-o-transform': 'scale(' + 1 + ') translateX(-0%)',
    //   '-ms-transform': 'scale(' + 1 + ') translateX(-0%)',
    //   'left' : '0%',
    //   'transition' : 'all 0s linear'
    // });    

    setTimeout(function () {
      $_wrapper.css({
        'transition' : 'all 0s ease'
      });
    }, 350);
  };

  return {
    scale: resizeWrapper,
    resetScale : resetScale
  }

})();