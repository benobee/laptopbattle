Comments = new Mongo.Collection('comments');

Meteor.methods({

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

  }

})