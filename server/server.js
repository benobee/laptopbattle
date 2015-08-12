if (Meteor.isServer) {

  Meteor.startup(function () {
  	//run code on startup

  });
}

Comments.allow({
  insert: function(userId, doc){
    return userId;
  },
  remove: function(userId, doc){
    return userId;
  },
});

Videos.allow({
  insert: function(userId, doc){
    return userId;
  },
  remove: function(userId, doc){
    return userId;
  },
});


