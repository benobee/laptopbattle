//load all videos and populate on the page
Template.home.helpers({
    videos() {
      return Videos.find({}, {sort: {date: -1}});     
    }
});

// spinner show before loading
Template.mainVideos.rendered = function () {
  $('#spinner-wrapper').hide();
};

//handle video card interactions
Template.mainVideos.helpers({
    like() {       
      return Likes.find({'videoId': this._id });
    },
    count(){

      //show count of votes per video
      var count = Likes.find({'videoId': this._id }).count();
      return count;      
    },
    liked(){

      //set color of the vote button
      if (Likes.find({'videoId': this._id }).count() >= 1){
        return '#C20000';
      }
      else{
        return '';
      }
    }
});

Template.home.events({

  'click .button.expand'(e){

    //build id
    var id = 'controls' + this._id;

    //bring up video page
    $('.main-video').transition('fly down');

    //fix button from being click twice before page video page is open
    $('.expand').attr("disabled", "disabled");
    setTimeout('$(".expand").removeAttr("disabled")', 1500);

    //set session id for the selected video and fade in the video page
    Session.set("video" , this._id );
    Session.set("url" , this.url );
    var x = Session.get('video');
    var url = Session.get('url');
    $(".videoPage").fadeIn('fast');

    //get youtube player ready
    onYouTubeIframeAPIReady = function () {
        player = new YT.Player("player", {
            height     : "auto", 
            width      : "100%",
            controls   : 0,
            autohide   : 1,
            showinfo   : 0,
            videoId    : url, 
            events     : {
                onReady(event) {;
                    var d = player.getDuration('player');
                    Session.set("duration", d);  
                    $(".videoPage").css('transform','translateY(0%)');
                    player.playVideo(); 
                },
                onStateChange(event){
                  if (event.data == 0){
                    player.stopVideo();
                    player.seekTo(0, true);
                    $('#pause').hide();
                    $('#play').show();
                  }
                  else if(event.data == 1){

                     $('#play').hide();
                      $('#pause').show();
                      $('#pause').css('opacity','1');
                      
                      //set durations and set session
                      var duration = player.getDuration();
                      Session.set('duration', duration);

                      //create a constant broadcast of the video position
                      Meteor.setInterval(function(){
                      var time = player.getCurrentTime();
                      var s = Session.get('duration');
    
                      //create the range of the playback slider on new interval
                      $( "#slider" ).slider({
                        range: "max",
                        min: 0,
                        max: s,
                        value: time
                      });

                    Session.set('time', time);
                    }, 125);    
                  } 
                }
            }
        });
    };
    //load youtube player
    YT.load();
    },
    'click #like'(e){
      //vote for the video
      Likes.insert({

      'videoId' : this._id,
      'userId' : Meteor.user()._id,
      'name': Meteor.user().profile.name,
      'date': new Date()

    });
    }
});


