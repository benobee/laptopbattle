Template.profile.events({
  'click .square.button.logout':function(e){
      e.preventDefault();

      $('#menuStart').sidebar('hide');
      $('.spinner-wrapper').fadeIn();

      Meteor.logout();

  },
  'click .square.button.profile':function(e){
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
  }
});


