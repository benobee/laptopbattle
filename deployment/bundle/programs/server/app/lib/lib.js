(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// lib/lib.js                                                          //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
//mongoDB collections                                                  //
Comments = new Mongo.Collection('comments');                           // 2
Videos = new Mongo.Collection('videos');                               // 3
Levels = new Mongo.Collection('levels');                               // 4
                                                                       //
//create array in the videos collection                                //
Videos.votes = [];                                                     // 7
                                                                       //
//add point array to users                                             //
Meteor.users.votes = [];                                               // 10
Meteor.users.pointCount = {};                                          // 11
                                                                       //
//database method definitions                                          //
Meteor.methods({                                                       // 14
  vote: function (videoID, userID) {                                   // 15
    Videos.update(videoID, {                                           // 16
      $push: {                                                         // 17
        'votes': {                                                     // 18
          'videoId': videoID,                                          // 19
          'userId': userID                                             // 20
        }                                                              //
      }                                                                //
    });                                                                //
  },                                                                   //
  removeVote: function (videoID, userID) {                             // 25
    Videos.update(videoID, {                                           // 26
      $pull: { votes: { userId: userID } }                             // 27
    });                                                                //
  },                                                                   //
  updateTitle: function (titleID, titleValue) {                        // 30
    Videos.update(titleID, { $set: { title: titleValue } });           // 31
  },                                                                   //
  deleteVideo: function (videoID) {                                    // 33
    Videos.remove(videoID);                                            // 34
  },                                                                   //
  addVideo: function (id, name, url, title) {                          // 36
    Videos.insert({                                                    // 37
      'id': id,                                                        // 38
      'name': name,                                                    // 39
      'url': url,                                                      // 40
      'date': new Date(),                                              // 41
      'title': title                                                   // 42
    });                                                                //
  },                                                                   //
  addComment: function (id, userId, user, val, time, videoUserId) {    // 45
    Meteor.users.update(videoUserId, { $inc: { 'pointCount': 5 } });   // 46
    Comments.insert({                                                  // 47
      'videoId': id,                                                   // 48
      'userId': userId,                                                // 49
      'name': user,                                                    // 50
      'post': val,                                                     // 51
      'date': new Date(),                                              // 52
      'time': time                                                     // 53
    });                                                                //
  },                                                                   //
  deleteComment: function (id, videoUserId) {                          // 56
    Comments.remove(id);                                               // 57
    Meteor.users.update(videoUserId, { $inc: { 'pointCount': -5 } });  // 58
  },                                                                   //
  admin: function (id) {                                               // 60
    var admin = ['nKz4CRLMpQxQFP23D'];                                 // 61
    if (id == admin) {                                                 // 62
      Accounts.admin = true;                                           // 63
    } else {                                                           //
      Accounts.admin = false;                                          // 65
    }                                                                  //
  },                                                                   //
  addPoints: function (videoId, id, type) {                            // 68
    Meteor.users.update(id, { $inc: { 'pointCount': 100 } });          // 69
    Meteor.users.update(id, {                                          // 70
      $push: {                                                         // 71
        'votes': {                                                     // 72
          'videoId': videoId,                                          // 73
          'user': id,                                                  // 74
          'type': type,                                                // 75
          'voterId': Meteor.userId(),                                  // 76
          'time': new Date()                                           // 77
        }                                                              //
      }                                                                //
    });                                                                //
  },                                                                   //
  removePoints: function (voterId, videoId, videoUserId) {             // 82
    Meteor.users.update(videoUserId, { $inc: { 'pointCount': -100 } });
    Meteor.users.update(videoUserId, {                                 // 84
      $pull: { votes: { 'voterId': voterId, 'videoId': videoId } }     // 85
    });                                                                //
  },                                                                   //
  changeUsername: function (newUsername) {                             // 88
    Meteor.users.update({ _id: Meteor.user()._id }, { $set: { "username": newUsername } });
  }                                                                    //
});                                                                    //
                                                                       //
ServiceConfiguration.configurations.upsert({ service: "facebook" }, {  // 93
  $set: {                                                              // 96
    appId: "442572199236703",                                          // 97
    secret: "91ac94b88c3ceabf6dec283fa0ed2b22"                         // 98
  }                                                                    //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=lib.js.map
