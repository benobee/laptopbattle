Template.battleVideo.onRendered(function(){

  function run(){
    var url = (function(){ 

      var params = window.location;
      var id = params.pathname.split('/battle/');
      Session.set('video', id[1]);

      var url = params.search.split('?url=');
      Session.set('url', url[1]);

      return url[1];

    })();
    LaptopBattle.video.play(url);
  }

  $(document).ready(function(){
    Meteor.setTimeout(run, 1000);
  });

});

//get the comments for a video
Template.battleVideo.helpers({
  comment : function(){
    return Comments.find({'videoId': Session.get('video') ,'time': { $lt: Session.get('time') } }, {sort: {time: -1}, limit: 10});

  },
  next: function(){
    var current = Videos.findOne({_id: Session.get('video')});
    var query = Videos.find({date: {$gt: current.date}, "state.vote" : true }, {sort: {date: 1}, limit:1});
    if(query.fetch().length !== 0){
      return query.fetch()[0]._id + '?url=' + query.fetch()[0].url;   
      return true;
    }

  },
  previous: function(){
    var current = Videos.findOne({_id: Session.get('video')});
    var query = Videos.find({date: {$lt: current.date}, "state.vote" : true }, {sort: {date: 1}, limit:1});
    if(query.fetch().length !== 0){
      return query.fetch()[0]._id + '?url=' + query.fetch()[0].url;   
      return true;
    }
  },
  data : function() {        
    var controller = Iron.controller();
    var params = controller.getParams();
    if(params._id !== undefined){
    var q = Videos.findOne({_id: params._id});
      Session.set("url", params.query.url);
      Session.set("video", params._id);
    } else {
      var q = Videos.findOne({_id: 'WvomSQb6RjCEHgoms'});
      Session.set("url", q.url);
      Session.set("video", q._id);
      LaptopBattle.video.play(Session.get('url')); 
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
      var controller = Iron.controller();
      var params = controller.getParams();      
      return "https://www.facebook.com/sharer/sharer.php?u=http%3A//laptopbattle.com//battle/" + params._id + "?url=" + params.query.url;
    }  
});

//new comment form
Template.battleVideo.events({
  'click #playNext'(){
    LaptopBattle.video.next();
  },
  'click .square.button.vote' : function(e){
    e.stopPropagation();
    Meteor.call("addPoints", this._id, this.id, "vote");
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
  var videoUserId = this.id;
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
