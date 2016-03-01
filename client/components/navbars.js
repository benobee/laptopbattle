Template.navbar.events({
	'click #toggleSidebar' : function(){
     LaptopBattle.menu.toggleSidebar();
  },
  'click #signOut':function(e){
      e.preventDefault();

      $('#menuStart').sidebar('hide');
      $('.spinner-wrapper').fadeIn();

      Meteor.logout();
  },
  'click .item'(e){
    $('.nav .item').removeClass('active');
    $(e.currentTarget).addClass('active');

  }
});

Template.navbar.helpers({
  'signInTitle':function(){
    if(Meteor.user()){
      return Meteor.user().username;
    } else {
      return 'Sign In';
    }   
  },
  'player':function(){

    if( Session.get('player') ){

      return true;
           
    } else {

      return false;

    } 
  }
});

Template.navbarStatic.helpers({
  'player':function(){

    if( Session.get('player') ){

      return true;
           
    } else {

      return false;

    } 
  }
});

Template.navbarMobile.events({

  'click .icon.sidebar'(){

    $('.ui.sidebar').sidebar('toggle');

  }
});











