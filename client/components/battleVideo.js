//get the comments for a video
Template.battleVideo.helpers({
  comment : function(){

    return Comments.find({'videoId': Session.get('video') ,'time': { $lt: Session.get('time') }}, {sort: {time: -1}, limit: 10});

  },
  next: function(){

    var current = Videos.findOne({_id: Session.get('video')});
    var query = Videos.find({date: {$gt: current.date}}, {sort: {date: 1}, limit:1});

    if(query.fetch().length !== 0){
      return query.fetch()[0]._id + '?url=' + query.fetch()[0].url;   
      return true;
    }

  },
  previous: function(){

    var current = Videos.findOne({_id: Session.get('video')});
    var query = Videos.find({date: {$lt: current.date}}, {sort: {date: 1}, limit:1});

    if(query.fetch().length !== 0){
      return query.fetch()[0]._id + '?url=' + query.fetch()[0].url;   
      return true;
    }

  },
  data : function() {

    var controller = Iron.controller();
    var params = controller.getParams();

    console.log(params._id);

    if(params._id !== undefined){

    var q = Videos.findOne({_id: params._id});

    Session.set("url", params.query.url);
    Session.set("video", params._id); 

    } else {

      var q = {}
      Session.set("url", 'MV_cCzI17eE');
      Session.set("video", 'TRCqnzKsGvwb8TsLD'); 

    }
    return q;

  },
  count : function(){
      //show count of votes per video
      if(this.votes == undefined){

        return "no votes";

      } else if (this.votes.length == 1){

        return this.votes.length + " " + "vote";  

      } else {

        return this.votes.length + " " + "votes";
      }           
    },

    voted : function(){
      var voteList = _.map(this.votes, function(user){

        return user.userId;

      });
      
      var voted = _.contains(voteList, Meteor.userId());

      if (voted == true){

        return 1;

      } else {

        return 0;

      }

    },
    shareLink : function(){

      return "https://www.facebook.com/sharer/sharer.php?u=http%3A//laptopbattle.com" + window.location.pathname + window.location.search;

    }  
});

Template.battleVideo.onRendered(function(){

  LaptopBattle.video.play(Session.get('url'));

})

//new comment form
Template.battleVideo.events({
  'click #playNext'(e){
    var data = $(e.currentTarget).data('url');
    var videoId = data.split('=');

    player.loadVideoById(videoId[1]);
  },
  'click .square.button.vote' : function(e){
    e.stopPropagation();
    e.preventDefault();
    console.log(e);
    Meteor.call('vote', this._id, Meteor.userId());

  },
  'click .square.button.voted' : function(e){
        //remove vote for the video
        e.stopPropagation();
        Meteor.call("removeVote", this._id, Meteor.user()._id );
        Meteor.call("removePoints", Meteor.userId(), this._id, this.id);

  },

  'click #facebookLoginButton'(e){

    Meteor.loginWithFacebook({

        requestPermissions: ['public_profile', 'email', 'user_friends'], 
        loginStyle        : 'popup'

      }, function (err, response) {
         
      if (err) {

          Session.set('errorMessage', err.reason || 'Unknown error');  

        }
    });

  }, 
  'submit #commentForm'(e){
      e.preventDefault();

  if(Meteor.user().username){ 

    var name = Meteor.user().username;

  } else {

    var name = Meteor.user().profile.name;

  }
  var videoUserId = Session.get('videoUserId');
  var comment = {

        'videoTime' : player.getCurrentTime(),
        '_id'       : Session.get('video'),
        'userId'    : Meteor.user()._id,
        'user'      : name,
        'val'       : $( '#post' ).val(),
        'addComment'  : function(){
          Meteor.call('addComment', this._id, this.userId, this.user, this.val, this.videoTime, videoUserId);

          $( "#commentForm" )[0].reset();
        }
  };

    comment.addComment();  

  }
});
