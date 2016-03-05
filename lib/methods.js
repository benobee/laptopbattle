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
  updateVideo(titleID, titleValue, linkValue){

  	Videos.update(titleID, {$set: {title : titleValue, link : linkValue }});

  },
  deleteVideo(videoID){

    Videos.remove(videoID);

  },
  addVideo(id, name, url, title){

    Videos.insert({

      'id'    : id,
      'name'  : name,
      'url'   : url,
      'date'  : new Date(),
      'title' : title,
      'state': {

        share    : true,
        vote     : true,
        playlist : true

      }
    });
  },
  updatePlayer(id, state){

    Meteor.users.update({ _id : id }, {

      $set: {

          player : !state

      }        
    });

  },
  removeUser(id){

    Accounts.users.remove({_id: id});

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

    findUser(email){

        return Accounts.findUserByEmail(email);

    },
    sendVerificationEmail(userId){

      console.log('sending email to ' + userId);

      Accounts.sendVerificationEmail(userId);

    },
    submitUser: function(username, password, email, age, location){

      var userId = Accounts.createUser({ 

        'username' : username,
        'password' : password, 
        'email'    : email,
        'profile'  : {
          'age'      : age,
          'location' : location
        },
        callback : function(){

          return this;

        }
      });

      Meteor.users.update({ _id : userId }, {

        $set: {

          player : true

        }        
      });

      Accounts.sendVerificationEmail(userId);

    }
  });
}







