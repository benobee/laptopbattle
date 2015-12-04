Meteor.publish("videos", function(){
  return Videos.find();
});

Meteor.publish("comments", function(){
  return Comments.find();
});

Meteor.publish("points", function(){
  return Points.find();
});

Meteor.publish("levels", function(){
  return Levels.find();
});




