//database method definitions
Meteor.methods({
  vote(videoID, userID){ 
    Videos.update(videoID, {
      $push: {
        'votes': {
          'videoId' : videoID, 
          'userId' : userID   
        }
      }
    });
  },
  removeVote(videoID, userID){
    Videos.update(videoID, {
      $pull: { votes: { userId : userID } }
    });
  },
  updateTitle(titleID, titleValue){
  	Videos.update(titleID, {$set: {title: titleValue}});
  },
  deleteVideo(videoID){
    Videos.remove(videoID);
  },
  addVideo(id, name, url, title){
    Videos.insert({
      'id': id,
      'name': name,
      'url': url,
      'date': new Date(),
      'title': title
    });
  },
  addComment(id, userId, user, val, time, videoUserId){
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
  deleteComment(id, videoUserId){
    Comments.remove(id);
    Meteor.users.update(videoUserId, { $inc: { 'pointCount' : -5 }});

  },
  admin(id){
     var admin = ['dAA6p3iA47v9sAKm6'];
     if(id == admin){
      Accounts.admin = true;
     } else {
      Accounts.admin = false;
     }
  },
  addPoints(videoId, id, type){
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
  removePoints(voterId, videoId, videoUserId){
    Meteor.users.update(videoUserId, { $inc: { 'pointCount' : -100 }});
    Meteor.users.update(videoUserId, {
      $pull: { votes: { 'voterId' : voterId, 'videoId' : videoId } }
    });
  },
  changeUsername(newUsername){
    Meteor.users.update({_id:Meteor.user()._id}, {$set:{"username":newUsername}});
  }
});

if(Meteor.isServer){
  Meteor.methods({
    checkUser(username){
      Accounts.findUserByUsername(username);
    }
  });
}



