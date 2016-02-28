Router.configure({
	onBeforeAction: function(){
		this.next();
		$('.pusher #pageContent').hide();
		$('.spinner-wrapper').removeClass('hide');
	},
	onAfterAction: function(){
		$('.pusher #pageContent').fadeIn();
		$('.spinner-wrapper').fadeOut();
	}
});

Router.route('/', function(){
	this.render('home');
	this.layout('site');
});

Router.route('/videos', function(){
	this.render('spectate');
	this.layout('site');
});

Router.route('/signup', function(){
	this.render('signup');
	this.layout('site');
});

Router.route('/profile', function(){
	this.render('profile');
	this.layout('app');
});

Router.route('/account/create', function(){
	this.render('createAccount');
	this.layout('site');
});

Router.route('/home', function(){
	this.render('home');
	this.layout('site');
});

Router.route('/leaderboard', function(){
	this.render('leaderboard');
	this.layout('app');
});

Router.route('/rules', function(){
	this.render('rulesPage');
	this.layout('app');
});

Router.route('/battles', {
	template: 'battleHome',
	layoutTemplate: 'app',
	waitOn: function(){
	  return Meteor.subscribe('videos');
	},
	loadingTemplate: 'loadingSpinner'
});

Router.route('/video', {
	layoutTemplate: 'site',
	loadingTemplate: 'loading',
	action: function(){
	  this.render('battleVideo');
	}
});

Router.route('/battle', {
	layoutTemplate: 'app',
	loadingTemplate: 'loading',
	action: function(){
	  this.render('battleVideo');
	}
});

