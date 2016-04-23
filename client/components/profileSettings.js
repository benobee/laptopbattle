Template.profileSettings.events({
  'submit #settingsForm':function(e){
    e.preventDefault();
    var newUsername = $('.lb-input.username').val();
    Meteor.call('changeUsername', newUsername, function(error, result){
      //confirm message
    LaptopBattle.menu.hideForm();  
    }); 
  },
  'click .square.button.logout':function(e){
      e.preventDefault();
      LaptopBattle.menu.hideForm();  
      $('.spinner-wrapper').fadeIn();
      Meteor.logout();

  },
  'click .square.button.password':function(e){
    e.preventDefault();
    Router.go('/account/password/change');
  }
});

Template.profileSettings.helpers({
  'username':function(){
    if(Meteor.user()){
      return Meteor.user().username;
    }
  }
})