Template.profile.events({
  'click .dark.button.profile':function(e){
      e.preventDefault();

      var target = $(e.currentTarget).data('target');
      LaptopBattle.menu.toggleForm(target);

  }
});

Template.profile.helpers({
  admin : function(){
    if ( Meteor.user().profile.admin ){

       return true;

    } else {

       return false;

    }
  },
  username : function(){

    if(Meteor.user()){

      return Meteor.user().username;

    }

  }
});

Template.profile.onRendered(function(){

   $('#profileSettingsButton').popup();

});