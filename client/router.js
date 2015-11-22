Router.configure({
	layoutTemplate:'layout'
});

Router.route('/', function () {
    this.render('battleHome');   
});

Router.route('/battleHome', function () {
	this.render('battleHome');
});

Router.route('/battleVideo', function () {
	this.render('battleVideo');
});
