Meteor.startup(function(){
  
  if (Meteor.isClient){

      Tracker.autorun(function(){
        
        Session.set("url", 'MV_cCzI17eE');
        Session.set("video", 'TRCqnzKsGvwb8TsLD');
        Session.set('user', Meteor.user() );

        if (location.pathname == '/battle'){

            var parse = window.location.search.substring(1).split("=");
            Session.set("video", parse[2]);
            Session.set("url", parse[1]);

        } 
    });
  } 
});

