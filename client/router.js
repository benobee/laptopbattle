Router.configure({
	layoutTemplate:'layout'
});

Router.route('/', function(){
	this.render('home');
});

Router.route('/home', function(){
	this.render('home');
});

Router.route('/leaderboard', function(){
	this.render('leaderboard');
});

Router.route('/rules', {
	template: 'rulesPage'
});

Router.route('/battles', {
	template: 'battleHome',
	waitOn: function(){
	  return Meteor.subscribe('videos');
	},
	loadingTemplate: 'loadingSpinner'
});

Router.route('/battle', {
	loadingTemplate: 'loading',
	action: function(){
	  this.render('battleVideo');
	}
});

Router.configure({
	onBeforeAction: function(){
		this.next();
		$('.pusher .content').hide();
		$('.spinner-wrapper').removeClass('hide');
	},
	onAfterAction: function(){
		$('.pusher .content').fadeIn();
		$('.spinner-wrapper').fadeOut();
	}
});
