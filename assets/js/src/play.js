$('.closeButton').on('click', function(e) {
	$('main').removeClass('active');
	$('.monster').addClass('active');
	$(this).addClass('hidden')
	$('#fontBtn').addClass('hidden');
	setTimeout(function() {
		$('.replay-envelope').addClass('active')
		resetMarbles()
	}, 3300)
})

$('#fontBtn').on('click', function(e) {
	e.preventDefault();
	$('#fontBtn').addClass('hidden');
	$('body').css({
		'font-family': 'Open Sans, Arial, Helvetica'
	})
	$('#wrapper section').css({
		'text-transform': 'none'
	})
	$('main').css({
		'font-size' : '1.1em'
	})
})

$('#replay-button').on('click', function() {
	$('.replay-envelope').removeClass('active')
	animateMarbles()
})

// var ResizeToFullWindow = (function () {
//   'use strict';
//   var $wrapper = $('#wrapper');

//   function resizeWrapper () {
//     var width = window.innerWidth
//       || document.documentElement.clientWidth
//       || document.body.clientWidth;

//       var height = window.innerHeight
//       || document.documentElement.clientHeight
//       || document.body.clientHeight;

//     width = $('body').width();
//     height = $('body').height();
//     var ratioHeightWidth = $('body').width() / 1024;
//     var ratioHeight = $('body').height() / 768;
//     var ratioToUse = (ratioHeightWidth < ratioHeight) ? ratioHeightWidth:ratioHeight;

//     var scaleRatioLabel;
//     if(ratioHeightWidth < ratioHeight) {
//       scaleRatioLabel = 'w';
//     }
//     else {
//       scaleRatioLabel = 'h';
//     }

//     window.scaleRatio = ratioToUse;
//     window.scaleRatioLabel = scaleRatioLabel;

//     $($wrapper[0]).css({
//       'transform': 'scale(' + ratioToUse + ') translateX(-50%)',
//       '-webkit-transform': 'scale(' + ratioToUse + ') translateX(-50%)',
//       '-moz-transform': 'scale(' + ratioToUse + ') translateX(-50%)',
//       '-o-transform': 'scale(' + ratioToUse + ') translateX(-50%)',
//       '-ms-transform': 'scale(' + ratioToUse + ') translateX(-50%)',
//       'left' : '50%'
//     });
//   };
//   resizeWrapper();

//   function debounce(func, wait, immediate) {
//     var timeout;
//     return function() {
//       var context = this, args = arguments;
//       var later = function() {
//         timeout = null;
//         if (!immediate) func.apply(context, args);
//       };
//       var callNow = immediate && !timeout;
//       clearTimeout(timeout);
//       timeout = setTimeout(later, wait);
//       if (callNow) func.apply(context, args);
//     };
//   };


//   var myEfficientFn = debounce(function() {
//     // console.log('debaunce');
//     resizeWrapper();
//   }, 50);

//   window.addEventListener('resize', myEfficientFn);

//   return {
//     scale: resizeWrapper
//   }
// })();