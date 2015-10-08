//mongoDB collections
Comments = new Mongo.Collection('comments');
Videos = new Mongo.Collection('videos');
Likes = new Mongo.Collection('likes');

Meteor.methods({
  likes: function(videoId, userId, name){
    
    Likes.insert({

      'videoId' : videoId,
      'userId' : userId,
      'name': name,
      'date': new Date()
      });
  }
});
 



