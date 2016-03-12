Videos = new Mongo.Collection('videos');

//create array in the videos collection
Videos.votes = [];

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

    Videos.remove({_id : videoID });

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
  }
});







