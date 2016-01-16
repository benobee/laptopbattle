Template.battleVideo.onRendered(function(){
  var shareURL = (function(){
    return {
      parse : function(){
        return window.location.search.substring(1).split("&");
      },
      url : function(){
        var url = this.parse();
        var split = url[1].split("=");
        return split[1]; 
      },
      _id : function(){
        var id = this.parse();
        var split = id[0].split("=");
        return split[1]; 
      }
    }
  })();
  if(shareURL.url()){   
    Session.set("video", shareURL._id());
    Session.set("url", shareURL.url());
  }
  LaptopBattle.video.play();
});

//get the comments for a video
Template.allComments.helpers({
  id : function(){
    var id = Session.get('video');
    return id;
  },
  url : function(){
    var id = Session.get('video');
    return Videos.findOne(id);
  },
  comment : function(){
    return Comments.find({'videoId': Session.get('video') ,'time': { $lt: Session.get('time') }}, {sort: {time: -1}, limit: 10});
  }
});

//process the data into readable format for comments
Template.post.helpers({
  date : function(){
    return moment(this.date).fromNow();
  },
  time : function(){
    return this.time;
  },   
  admin : function(){
    if(this.userId == Meteor.user()._id){
       return true;
    } else {
       return false;
    }
  } 
});

Template.post.events({
  'click .post .marker': function(){
    player.seekTo(this.time, true);
  },
  'click .post .trash': function(){
    Meteor.call("deleteComment", this._id, Session.get("videoUserId"));
  }
})

//new comment form
Template.sidebarRight.events({   
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

//on new post animate from right to left removing the css class "loading"
Template.post.onRendered(function (){
  var $post = $(this.find('.post'));
  Meteor.defer(function() {
    $post.removeClass('loading').transition('hide').transition({
      animation  : 'fade left',
      duration   : '0.5s' }).promise();
  });
});

Template.timeline.helpers({
  comment: function(){
    var id = Session.get('video');
    return Comments.find({'videoId': id});
  }
});

Template.tick.events({
  'click .timeline.tick': function(){
    player.seekTo(this.time, true);
  },
  'mouseenter .timeline.tick': function(e){
    $(e.currentTarget).popup("show");
  }
});

Template.tick.helpers({
  videoFrame: function(){  
    var duration = Session.get("duration");
    this.position = LaptopBattle.video.getTickPosition(this);
    if(duration !== null){
      $('#timeline').css("opacity",1);
      return this.position; 
    }
  }  
});

