Meteor.startup(function(){
	var user = Meteor.userId();	
	Meteor.call("admin", user, function(error, result){
		if(error){
			console.log(error);
		}
	});
});