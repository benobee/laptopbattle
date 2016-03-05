Meteor.publish("videos", function(){

  return Videos.find();

});

Meteor.publish("comments", function(){

  return Comments.find();

});

Meteor.publish("levels", function(){

  return Levels.find();

});

Meteor.publish("users", function(){

	return Meteor.users.find({}, 
	  {
	  	fields: { 
	  		username   : 1, 
	  		votes      : 1, 
	  		pointCount : 1, 
	  		admin      : 1, 
	  		age        : 1, 
	  		location   : 1, 
	  		player     : 1,
	  		profile	   : 1,
	  		emails     : 1
	  	}
	  }, 
	  {
	  	sort: 
		  	{
		  		pointCount: -1
		  	}
	  });

});

Accounts.users.allow({
 update:function(){

   	return true;

 }
})

Meteor.users.deny({
  update: function() {

    return true;

  }
});

Accounts.users.allow({
 remove:function(){

   if(Meteor.user().profile.admin){

   	return true;

   } 
  }
})

