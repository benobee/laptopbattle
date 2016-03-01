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
  return Meteor.users.find({}, {fields: { username: 1, votes: 1, pointCount: 1, admin : 1, player : 1, facebook: 1 }}, {sort: {pointCount: -1}});
});

Meteor.users.deny({
  update: function() {
    return true;
  }
});


