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

Meteor.publish("videos", function(){
  return Videos.find();
});

Meteor.publish("likes", function(){
  return Likes.find();
});

Meteor.publish("comments", function(){
  return Comments.find();
});



