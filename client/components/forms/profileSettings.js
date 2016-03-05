Template.profileSettings.events({
	
  'submit #settingsForm':function(e){
    e.preventDefault();

    var newUsername = $('.lb-input.username').val();
    Meteor.call('changeUsername', newUsername, function(error, result){

      //confirm message
    LaptopBattle.menu.hideForm();  

    }); 

  } 
});

Template.profileSettings.helpers({

  username : function(){
      var user = Session.get('user');
      if(user.username !== undefined) {

        return user.username;

      }
  }
})