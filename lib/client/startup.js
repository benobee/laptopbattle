Meteor.startup(function(){
  
  if (Meteor.isClient){

      Tracker.autorun(function(){
        
        Session.set('user', Meteor.user() );

    });
  } 
});

