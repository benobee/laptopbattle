Router.configure({
	layoutTemplate:'layout'
});

Router.route('/', function () {
    this.render('home');
});

Router.map(function(){
	this.route('home', {
		path:'/home'
	});
	this.route('profile', {
		path:'/profile'
	});
});

