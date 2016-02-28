Template.navbar.events({
	'click #toggleSidebar' : function(){
     LaptopBattle.menu.toggleSidebar();
  },
  'click #signOut':function(e){
      e.preventDefault();

      $('#menuStart').sidebar('hide');
      $('.spinner-wrapper').fadeIn();

      Meteor.logout();
  }
});

Template.navbar.helpers({
  'signInTitle':function(){
    if(Meteor.user()){
      return Meteor.user().username;
    } else {
      return 'Sign In';
    }   
  }
});

Template.navbar.onRendered(function(){
  LaptopBattle.menu.init();
});

Template.navbarStatic.helpers({
  'signInTitle':function(){

      return Meteor.user().username;
 
  }
});

Template.navbarMobile.events({

  'click .icon.sidebar'(){

    $('.ui.sidebar').sidebar('toggle');

  }
});











