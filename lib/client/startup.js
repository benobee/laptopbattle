Meteor.startup(function(){
  
  if (Meteor.isClient){

      Tracker.autorun(function(){

       if(Meteor.user() !== null){

          Meteor.call("player", function(error, result){

            Session.set('player', result);
            
            if(error) {

              console.log(error);   

            }
          });
        } 
        
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

