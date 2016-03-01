Meteor.startup(function(){

  if (Meteor.loggingIn()){
    console.log('logging in');
  }
  
  if (Meteor.isClient){

      Meteor.call("player", function(error, result){

        console.log(result);

        if(error){

          console.log(error);
          
        }

      });
      Tracker.autorun(function(){
        
        Session.set("url", 'MV_cCzI17eE');
        Session.set("video", 'TRCqnzKsGvwb8TsLD');
        Session.set('user', Meteor.user() );

        if (location.pathname == '/battle'){

            var parse = window.location.search.substring(1).split("=");
            Session.set("video", parse[2]);
            Session.set("url", parse[1]);

        } else {

            if ( (Meteor.userId() == 'MzmXRMzSseGQD3SSL') || (Meteor.userId() == '2FSADpWjQbKBajbhD') || (Meteor.userId() == 'rQqhamub39gYXtZaD')){

              // Accounts.admin = true;  

            } 

        }
    });
  } 
});

