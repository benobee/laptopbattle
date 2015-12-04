Router.configure({
	layoutTemplate:'layout'
});

// Router.route('/', function() {
// 	
// });

Router.route('/', function(){
	this.render('battleHome');
});

Router.route('/battleHome', function () {
	this.render('battleHome');
	$('#spinner-wrapper').fadeOut();
});

Router.route('/battle', function () {
	this.render('battleVideo');
});

Router.configure({
	action: function () {
    // render all templates and regions for this route
    this.render();
	},
	onStop:function(){
		$('#spinner-wrapper').fadeOut();
	}
});