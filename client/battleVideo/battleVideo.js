Template.battleVideo.helpers({
  id : function(){
    var id = Session.get('video');
    return id; 
  },
  url : function(){   
    //find the video object for the id
    var id = Session.get('video');
    return Videos.findOne(id);
  },
  duration : function(){   
    var s = Session.get('duration');
    return moment.duration(Math.floor(s * 1000)).asMinutes() + ' minutes';
  }
});

Template.battleVideo.onRendered(function(){
  LaptopBattle.video.play();
  LaptopBattle.video.scrollToActive();
});

Template.battleVideo.events({  
  'click .closeButton': function(){
    Router.go('/');
    LaptopBattle.video.destroy();
  },
  'click .post': function(e){
    var x = $(this);
    player.seekTo(x[0].time, true);
  }
});

//get the play List
Template.playList.helpers({
  playList : function(){
    //create playlist
    return Videos.find({}, {sort: {date: -1}});  
  },
  activeVideo : function(){  
    var id = Session.get('video');
    if (id == this._id) {
      return "active active-video";
    } else {
      return "video-queue";
    }
  }
});

Template.playList.events({
  'click .item' : function(e){
    Session.set('video', $(e.currentTarget).find('href').context.name);
    var search = $(e.currentTarget).find('href').context.search;
    var url = search.split('=');
    player.loadVideoById(url[2]);
  }
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
  }
});

//new comment form
Template.sidebarRight.events({   
    'submit #commentForm'(e){
      e.preventDefault();
      var time = player.getCurrentTime();
      var id = Session.get('video');
      var user = Meteor.user().profile.name;
      var val = $( '#post' ).val();
      Meteor.call('addComment', id, user, val, time);
      $( "#commentForm" )[0].reset();
    }
});

//on new post animate from right to left removing the css class "loading"
Template.post.onRendered(function (){
  var $post = $(this.find('.post'))
  Meteor.defer(function() {
    $post.removeClass('loading').transition('hide').transition({
    animation  : 'fade left',
    duration   : '0.5s' }).promise();
  });
});
