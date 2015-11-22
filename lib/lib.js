//mongoDB collections
Comments = new Mongo.Collection('comments');
Videos = new Mongo.Collection('videos');
Points = new Mongo.Collection('points');
Levels = new Mongo.Collection('levels');

Videos.votes = [];

//database
Meteor.methods({
  vote: function(videoID, userID){ 
    Videos.update(videoID, {
      $push: {
        'votes':{
          'videoId' : videoID, 
          'userId' : userID   
        }
      }
    });
  },
  removeVote: function(videoID, userID){ 
    Videos.update(videoID, {
      $pull: { votes: { userId : userID } }
    });
  },
  updateTitle: function(titleID, titleValue){
  	Videos.update(titleID, {$set: {title: titleValue}});	
  },
  deleteVideo: function(videoID){
    Videos.remove(videoID);
  },
  addVideo: function(id, name, url, title){
    Videos.insert({
      'id': id,
      'name': name,
      'url': url,
      'date': new Date(),
      'title': title
    });     
  },
  addComment : function(id, user, val, time){
    Comments.insert({
      'videoId' : id,
      'name': user,
      'post': val,
      'date': new Date(),
      'time': time
    });
  }
});
