Meteor.startup(function(){
  var user = Meteor.userId(); 
  Meteor.call("admin", user, function(error, result){

    if(error){

      console.log(error);
      
    }

  });
  
  if (Meteor.isClient){
      Tracker.autorun(function(){
        
        Session.set("url", 'MV_cCzI17eE');
        Session.set("video", 'TRCqnzKsGvwb8TsLD'); 

        if(Meteor.userId() == null){

          //Router.go('/');

        } else if (location.pathname == '/battle'){

            var parse = window.location.search.substring(1).split("=");
            Session.set("video", parse[2]);
            Session.set("url", parse[1]);

        } else {

            if ( (Meteor.userId() == 'MzmXRMzSseGQD3SSL') || (Meteor.userId() == '2FSADpWjQbKBajbhD') || (Meteor.userId() == 'rQqhamub39gYXtZaD')){

              //Router.go('/battles');

              Accounts.admin = true;  

            } else {

              //Router.go('/'); 

            }

        }
    });
  } 
});