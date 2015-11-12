//load all videos and populate on the page
Template.home.helpers({
  videos() {    
      var videos = Videos.find({}, {sort: {date: -1}});
      return videos;     
  }
});

// Template.home.onRendered(function(){
//   $(".owl-carousel").owlCarousel({
//     items : 1,
//     autoPlay : true
//   });
// });

//handle video card user interactions
Template.mainVideos.helpers({
    count(){
      //show count of votes per video
      if (this.votes.length == 1){
        return this.votes.length + " " + "vote";  
      }
      else{
        return this.votes.length + " " + "votes";
      }           
    },
    voted(){
      var voteList = _.map(this.votes, function(user){
        return user[0].userId;
      });
      var voted = _.contains(voteList, Meteor.userId());
      if (voted == true){
        return '#F82262';
      }
      else{
        return '';
      }
    }
});

Template.home.events({
    'click .card' : function(e){
    Session.set("video" , this._id );
    Session.set("url" , this.url );

    $.when( $('#spinner-wrapper').fadeIn() ).done(function(){
    //get youtube player ready    
    onYouTubeIframeAPIReady = function () {
        player = new YT.Player("player", {
            height     : "auto",
            modestbranding : 1, 
            width      : "100%",
            controls   : 0,
            rel        : 0,
            disablekb  : 1,
            enablejsapi: 1,
            autohide   : 1,
            showinfo   : 0,
            videoId    : Session.get('url'), 
            events     : {
                onReady(event) {
                    $('#spinner-wrapper').fadeOut();
                    $('.videoPage').show();  
                    var d = player.getDuration('player');
                    Session.set("duration", d);  
                    player.playVideo();
                },
                onStateChange(event){

                  if (event.data == 0){
                    player.stopVideo();
                    player.clearVideo();
                    player.seekTo(0, true);
                    $('#pause').hide();
                    $('#play').show();

                    var next = $('#playListItems').find('.active').next().attr('href');
                    if(next !== undefined){
                      var nextSession = $('#playListItems').find('.active').next().attr('name');
                      Session.set('video', nextSession);
                      var search = $('#playListItems').find('.active').next().attr('href');
                      var url = search.split('=');
                      player.loadVideoById(url[2]);
                    }
                    else{                     
                      var nextSession = $('#playListItems').find('.item').first().attr('name');                     
                      Session.set('video', nextSession);
                      var search = $('#playListItems').find('.item').first().attr('href');
                      var url = search.split('=');
                      player.loadVideoById(url[2]);
                    }
                  }
                  else if(event.data == 1){

                      // $('#play').hide();
                      // $('#pause').show();
                      // $('#pause').css('opacity','1');
                      
                      //set durations and set session
                      var duration = player.getDuration();
                      Session.set('duration', duration);

                      //create a constant broadcast of the video position
                      Meteor.setInterval(function(){
                      var time = player.getCurrentTime();
                      // var s = Session.get('duration');
    
                      //create the range of the playback slider on new interval
                      // $( "#slider" ).slider({
                      //   range: "max",
                      //   min: 0,
                      //   max: s,
                      //   value: time
                      // });

                    Session.set('time', time);
                    }, 125);    
                  } 
                }
            }
        });
    };
    //load youtube player
    YT.load();
    });
        
    //fix button from being click twice before page video page is open
    $('.playVideo').attr("disabled", "disabled");
    setTimeout('$(".playVideo").removeAttr("disabled")', 1500);
    },
    'click .extra.content.vote'(e){
    //vote for the video
    e.stopPropagation();

    Meteor.call("votes", this._id, Meteor.user()._id);
    }
});

Template.mainVideos.onRendered(function (){
  $('#spinner-wrapper').fadeOut();
});
