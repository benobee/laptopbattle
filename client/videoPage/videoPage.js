Template.videoPage.helpers({
  id(){
    var id = Session.get('video');
    return id; 
  },
  url(){   
    //find the video object for the id
    var id = Session.get('video');
    return Videos.findOne(id);
  },
  duration(){   
    var s = Session.get('duration');
    return moment.duration(Math.floor(s * 1000)).asMinutes() + ' minutes';
  }
});

Template.videoPage.onRendered(function (){
    
    //initialize and configure volume slider 
    $( "#slider-volume" ).slider({
      range: "min",
      min: 0,
      max: 100,
      value: 85,
      slide( event, ui ) {
        $( "#amount" ).val( ui.value );
        player.setVolume(ui.value);      
      }
    });
    $( "#amount" ).val( $( "#slider-volume" ).slider( "value" ) );

    var s = Session.get('duration');

    //initialize playback slider
    $( "#slider" ).slider({
      range: "max",
      min: 0,
      max: s,
      value: 0,
      slide( event, ui ) {
        player.seekTo(ui.value, true);
      }
    });
    
});

Template.videoPage.events({
  
  'click .closeButton': function(e){

  location.hash = "";    
    $(".videoPage").fadeOut().promise().done(function(){
        $('#spinner-wrapper').hide();
        //kill the youtube player
        player.destroy();
    });

    //reset the session variables
    Session.set("video" , '' );
    Session.set('time', '');
    Session.set('duration', '');

    //reset the play / pause button
    $('#pause').hide();
    $('#play').show();   
  },
  'click #play': function(e){
    player.playVideo();
  },
  //handle the video controls
  'click #pause': function(e){
    player.pauseVideo();
    $('#pause').hide();
    $('#play').show();
  },
  'click #stop': function(e){
    player.stopVideo();
    $('#pause').hide();
    $('#play').show();
  },
  'mouseenter .volumeContainer': function(e){
    $('#slider-volume').css('opacity','1');    
  },
  'mouseleave .volumeContainer': function(e){
    $('#slider-volume').css('opacity','0');    
  },
  'click .post': function(e){
    var x = $(this);
    player.seekTo(x[0].time, true);
  }
});

//get the play List
Template.playList.helpers({
  playList(){
    //create playlist
    var playList = Videos.find({}, {sort: {date: -1}});  
    return playList;
  },
  activeVideo(){
    var id = Session.get('video');
    if(id == this._id){
      return "active active-video";
    }
    else{
      return "video-queue";
    }
  }
});

Template.playList.events({
  'click .item'(e){
    Session.set('video', $(e.currentTarget).find('href').context.name);
    var search = $(e.currentTarget).find('href').context.search;
    var url = search.split('=');
    player.loadVideoById(url[2]);
  }
});

//get the comments for a video
Template.allComments.helpers({
  id(){
    var id = Session.get('video');
    return id;
  },
  url(){
    var id = Session.get('video');
    return Videos.findOne(id);
  },
  comment(){
    return Comments.find({'videoId': Session.get('video') ,'time': { $lt: Session.get('time') }}, {sort: {time: -1}, limit: 10});
  }
});

//process the data into readable format for comments
Template.post.helpers({
  date(){
    return moment(this.date).fromNow();
  },
  time(){
    return this.time;
  }
});

//new comment form
Template.sidebarRight.events({
    
    'submit #commentForm'(e){
      var time = player.getCurrentTime();
      console.log(time);
      var id = Session.get('video');
     
    e.preventDefault();

    Comments.insert({

      'videoId' : id,
      'name': Meteor.user().profile.name,
      'post': $( '#post' ).val(),
      'date': new Date(),
      'time': time

    });
    $( "#commentForm" )[0].reset();
    }
});

Template.sidebarRight.onRendered(function () {
  $('#commentSlider')
  .sidebar('setting', 'transition', 'overlay')
  .sidebar()
  .sidebar({
    closable: false
  })
  ;
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
