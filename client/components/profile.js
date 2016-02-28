Template.profile.events({
	'click .square.button.login'(e){

	    e.preventDefault();

      var username = $('.lb-input.name').val();
      var password = $('.lb-input.password').val();

      Meteor.loginWithPassword(username, password);
      
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

      if (err) 
        Session.set('errorMessage', err.reason || 'Unknown error');    
    });

  },
  'click .square.button.logout':function(e){
      e.preventDefault();

      $('#menuStart').sidebar('hide');
      $('.spinner-wrapper').fadeIn();

      Meteor.logout();
  },
  'change #settingsForm':function(e){
    e.preventDefault();

    var newUsername = $('.lb-input.username').val();
    Meteor.call('changeUsername', newUsername, function(error, result){

      //confirm message

    });    
  },
  'submit #settingsForm':function(e){
    e.preventDefault();   
  },
  'click .square.button.battle'(e){
    e.preventDefault();
    Router.go('/battles');

  }  
});

Template.profile.helpers({

  admin : function(){

    if (Accounts.admin){

       return true;

    } else {

       return false;

    }

  },
  username : function(){

    return Meteor.user().username;
    
  }

});


