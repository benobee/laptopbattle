Router.configure({
	layoutTemplate:'layout'
});

Router.route('/', function () {
    this.render('home');   
});

Router.route('/home', function () {
	this.render('home');
});

Router.route('/instrument', function () {
	this.render('instrument');
});
