//mongoDB collections
Comments = new Mongo.Collection('comments');
Videos = new Mongo.Collection('videos');

Meteor.methods({
  votes: function(videoID, userID, name){ 
    Videos.update(videoID, {
      $push: {
        'votes':[{
            'videoId' : videoID, 
            'userId' : userID, 
            'name': name       
        }]
      }
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
  }
});

