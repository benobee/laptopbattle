Template.login.onRendered(function(){

  if(Session.get('user') !== null){

    Router.go('/qualifiers');

  }

});

Template.login.events({
	'click .square.button.login'(e){

	    e.preventDefault();

      var email = $('.lb-input.email').val();
      var password = $('.lb-input.password').val();

      Meteor.call('findUser', email, function(error, result){        

          if( (result !== undefined) && (result.emails[0].verified == true) ){

             Meteor.loginWithPassword(email, password, function(){

                Router.go('/qualifiers');
                Session.set('player', true); 
     
            });            

          } else {

             $('.ui.small.modal').modal('show');

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

      if(!err){

        Router.go('/qualifiers');

      }

      if (err) 
        Session.set('errorMessage', err.reason || 'Unknown error'); 

    	});

  	}
});

Template.forgotPassword.events({

  'click #passwordReset'(e){
    e.preventDefault();
    var email = $('.lb-input.email').val();
    console.log(email);

    Meteor.call('resetUserPassword', email, function(error, result){

      $('#passwordSent').transition('fade');

    });   
  }
});












