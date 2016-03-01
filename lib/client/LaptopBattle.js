//UI
var LaptopBattle = (function(){

//menu related events and methods
var menu = {
    hideForm : function(){
        $('.forms').transition('hide');
        $('.popupForm').transition('hide');
    },  
    toggleUploadForm: function(){
        $('.forms').transition('fade');
        $('.lb-form.upload').transition('drop');
    },
    toggleForm: function(target){
        $('.forms').transition('fade');
        $('.lb-form.' + target).transition('drop');
    }
}

//video related events and methods
var video = {
     play: function(video){

      $.when( $( '#spinner-wrapper').fadeIn() ).done(function(){
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
            videoId    : video, 
            events     : LaptopBattle.video.eventSettings
                
        });
      }
        LaptopBattle.video.load();
      });
    },
    load : function(){
      YT.load();
    },
    destroy: function(){
      $(".videoPage").fadeOut().promise().done(function(){
        $('#spinner-wrapper').hide();
        //kill the youtube player
        player.destroy();
      });
      LaptopBattle.video.resetSessions();
    },
    eventSettings: {
      onReady : function (event) {
                    $('#spinner-wrapper').fadeOut();
                    $('.videoPage').show();

                    //player.playVideo();
                    //player.mute();  
                    
      },
      onStateChange: function (event){

                  if (event.data == 0){
                    player.stopVideo();
                    // player.clearVideo();
                    player.seekTo(0, true);

                  } else if(event.data == 1){
                      
                      //initialize playback slider
                      $('#slider').fadeIn();

                      //set durations and set session
                      $('#commentSidebar').fadeIn();
                      var duration = player.getDuration();
                      Session.set('duration', duration);                 

                      //create a constant broadcast of the video position
                      Meteor.setInterval(function(){
                      var time = player.getCurrentTime();
                      var duration = Session.get('duration');
                      Session.set('time', time);
                      $("#progress").val( $( "#slider" ).slider( "value", time ));                     
                      }, 125);

                      $( "#slider" ).slider({
                        range: "max",
                        min: 0,
                        max: duration,
                        slide( event, ui ) {
                          $( "#progress" ).val( ui.value );
                          player.seekTo(ui.value, true);
                        }
                      });
                      
                  } 
      }      
    },
    resetSessions : function(){
        Session.set("video" , '' );
        Session.set('time', '');
    },
    getTickPosition:function(tick){
      var duration = Session.get("duration");
      var position = tick.time / duration * 100;
      return position;
    }
}

return {
  menu : menu,
  video: video
}

})();

window.LaptopBattle = LaptopBattle;


