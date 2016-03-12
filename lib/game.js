Levels = new Mongo.Collection('levels');

Meteor.methods({

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
  removePoints(userId, videoId, videoUserId){

    Meteor.users.update(videoUserId, { $inc: { 'pointCount' : -100 }});
    Meteor.users.update(videoUserId, {

      $pull: { votes: { 'voterId' : userId, 'videoId' : videoId } }

    });
  }

});