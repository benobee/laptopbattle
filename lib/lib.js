//mongoDB collections
Comments = new Mongo.Collection('comments');
Videos = new Mongo.Collection('videos');
Levels = new Mongo.Collection('levels');

//create array in the videos collection
Videos.votes = [];

//add point array to users
Meteor.users.votes = [];
Meteor.users.pointCount = {};

//database method definitions
Meteor.methods({
  vote: function(videoID, userID){ 
    Videos.update(videoID, {
      $push: {
        'votes': {
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
  addComment : function(id, userId, user, val, time, videoUserId){
    Meteor.users.update(videoUserId, { $inc: { 'pointCount' : 5 }});
    Comments.insert({
      'videoId' : id,
      'userId' : userId,
      'name': user,
      'post': val,
      'date': new Date(),
      'time': time
    });
  },
  deleteComment : function(id, videoUserId){
    Comments.remove(id);
    Meteor.users.update(videoUserId, { $inc: { 'pointCount' : -5 }});
  },
  admin : function(id){
     var admin = ['nKz4CRLMpQxQFP23D'];
     if(id == admin){
      Accounts.admin = true;
     } else {
      Accounts.admin = false;
     }
  },
  addPoints: function(videoId, id, type){
    Meteor.users.update(id, { $inc: { 'pointCount' : 100 }});
    Meteor.users.update(id, {
        $push: {
          'votes' : {
            'videoId': videoId,
            'user'   : id, 
            'type'   : type,
            'voterId': Meteor.userId(),
            'time'   : new Date()  
          }
        }
    }); 
  },
  removePoints: function(voterId, videoId, videoUserId){
    Meteor.users.update(videoUserId, { $inc: { 'pointCount' : -100 }});
    Meteor.users.update(videoUserId, {
      $pull: { votes: { 'voterId' : voterId, 'videoId' : videoId } }
    });
  },
  changeUsername : function(newUsername){ 
    Meteor.users.update({_id:Meteor.user()._id}, {$set:{"username":newUsername}});
  }
});

