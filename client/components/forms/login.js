Template.login.onRendered(function(){

  if(Session.get('user') !== null){

    Router.go('/battles');

  }

});

Template.login.events({
	'click .square.button.login'(e){

	    e.preventDefault();

      var username = $('.lb-input.name').val();
      var password = $('.lb-input.password').val();

      Meteor.loginWithPassword(username, password, function(){

        Router.go('/battles');
        if(Meteor.user().player){

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

        Router.go('/battles');

      if (err) 
        Session.set('errorMessage', err.reason || 'Unknown error'); 

    	});

  	}
})