Meteor.startup(function(){
	var user = Meteor.userId();	
	Meteor.call("admin", user, function(error, result){
		if(error){
			console.log(error);
		}
	});
	if (Meteor.isClient){
      Tracker.autorun(function(){
        if(Meteor.userId() == null){      
          Router.go('/');           
        }  
      });
	}	
});