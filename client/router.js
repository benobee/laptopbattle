Router.configure({
	layoutTemplate:'layout'
});

Router.route('/', function(){
	this.render('home');
});

Router.route('/home', function(){
	this.render('home');
});

Router.route('/leaderboard', function () {
	this.render('leaderboard');
});

Router.route('/battles', function () {
	this.render('battleHome');
});

Router.route('/battle', function () {
	this.render('battleVideo');
});

Router.configure({
	action: function () {
	    this.render();
	}
});