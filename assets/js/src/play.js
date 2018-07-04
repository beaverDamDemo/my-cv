$('.closeButton').on('click', function(e) {
	$('main').removeClass('active');
	$('.monster').addClass('active');
	$(this).addClass('hidden')
	$('#fontBtn').addClass('hidden');
})

$('#fontBtn').on('click', function(e) {
	e.preventDefault();
	$('#fontBtn').addClass('hidden');
	$('body').css({
		'font-family': 'Open Sans, Arial, Helvetica'
	})
	$('main').css({
		'font-size' : '1.1em'
	})
})