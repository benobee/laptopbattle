Template.login.onRendered(function(){

  if(Session.get('user') !== null){

    Router.go('/battlers');

  }

});

Template.login.events({
	'click .square.button.login'(e){

	    e.preventDefault();

      var email = $('.lb-input.email').val();
      var password = $('.lb-input.password').val();

      Meteor.loginWithPassword(email, password, function(){

        Router.go('/battlers');
        
        if(Meteor.user().profile.player){

          Session.set('player', true); 

        }      
      });    
	},
  'click #signup'(e){

    e.preventDefault();
    Router.go('/account/create');
    
  	},
  	'click #facebookLoginButton'(e){
    	e.preventDefault();
    	Meteor.loginWithFacebook({
      
      requestPermissions: ['public_profile', 'email', 'user_friends']
      }, function (err, data) {

        Router.go('/battlers');

      if (err) 
        Session.set('errorMessage', err.reason || 'Unknown error'); 

    	});

  	}
})