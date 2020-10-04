$('.closeButton').on('click', function(e) {
	$('main').removeClass('active');
	$('.monster').addClass('active');
	$(this).addClass('hidden')
	$('#fontBtn').removeClass('active');
	setTimeout(function() {
		$('.monster').removeClass('active');
		$('.replay-envelope').addClass('active')
		resetMarbles()
	}, 3300)
})

$('#fontBtn').on('click', function(e) {
	e.preventDefault();
	$('#fontBtn').addClass('hidden');
	$('body').css({
		'font-family': 'Open Sans, Arial, Helvetica',
    'font-size': '23px'
	})
  $('body table').css({
    'font-size': '0.7em'
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