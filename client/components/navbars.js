Template.navbar.events({
  'click #signOut':function(e){
      e.preventDefault();
      $('#menuStart').sidebar('hide');
      Meteor.logout();
      Router.go('/');
  }
});

Template.navbar.helpers({
  'logo': {

    image : '/img/logo-glad.png'

  },
  'signInTitle':function(){

    if(Meteor.user()){

      return Meteor.user().username;

    } else {

      return 'Sign In';

    }   
  },
  'player':function(){

    if( Meteor.user().player ){

      return true;
           
    } else {

      return false;

    } 
  },
  'admin'(){
    
    if( Meteor.user().admin !== undefined){

      return true;

    } else {

      return false;

    }
  }
});

Template.navbarMobile.events({

  'click #toggleSidebar'(){

    $('.ui.sidebar').sidebar('toggle');

  }
});











