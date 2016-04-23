Router.configure({
	onBeforeAction: function(){
		this.next();
		$('.pusher #pageContent').hide();
	},
	onAfterAction: function(){
		$(document).scrollTop(0);
		$('.pusher #pageContent').fadeIn();
		$('.ui.sidebar').sidebar('hide');
	}
});

Router.route('/', function(){
	this.render('home');
	this.layout('site');
});

Router.route('/account/password/change', function(){
	this.render('changePassword');
	this.layout('site');
});

Router.route('/about', function(){
	this.render('about');
	this.layout('site');
});

Router.route('/account/password/reset', function(){
	this.render('forgotPassword');
	this.layout('site');
});

Router.route('/account/verify', function(){
	this.render('verify');
	this.layout('site');
});

Router.route('/email/verified', function(){
	this.render('emailVerified');
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

Router.route('/login', function(){
	this.render('login');
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
	this.render('rules');
	this.layout('app');
});

Router.route('/qualifiers', {
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

Router.route('/battle/:_id', {

	layoutTemplate: 'app',
	template: 'battleVideo',
	loadingTemplate: 'loading',
	action: function(){

	  this.render();
	  
	},
	subscriptions: function() {
	    this.subscribe('items');

	    // add the subscription to the waitlist
	    this.subscribe('item', this.params._id).wait();
  	},
  	onBeforeAction: function(){
		this.next();
		$('.pusher #pageContent').hide();
	},
	onAfterAction: function(){
		$(document).scrollTop(0);
		$('.pusher #pageContent').show();
	}

});

Router.route('/share/:_id', {

	action: function(){
	  this.render();
	  $('#spinner-wrapper').fadeIn();
    },
    template: 'site',
    onAfterAction: function(){
          $(document).ready(function(){

	      var params = window.location;
	      console.log(params);

	      var id = params.pathname.split('/share/');
	      console.log(id[1], params.pathname);
	      Session.set('video', id[1]);

	      var url = params.search.split('?url=');
	      console.log(url[1]);
	      Session.set('url', url[1]);

	      //Router.go('/battle/'+ id[1] + window.location.search);
	      $('.spinner-wrapper').removeClass('hide');

	      //Session.set("videoUserId" , this.id);
	      Router.go('/battle/'+ id[1] + '?url=' + url[1]);
     
	  });
	}	

});





