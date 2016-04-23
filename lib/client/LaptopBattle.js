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
    },
    toggleVideoEditForm: function(){
        $('.forms').transition('fade');
        $('.lb-form.videoEdit').transition('drop');
    },
}

//video related events and methods
var video = {
     play: function(url){
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
            videoId    : url,
            events     : LaptopBattle.video.eventSettings
                
        });
      }
      LaptopBattle.video.load();

    },
    load : function(){
      YT.load();
    },
    next : function(){     
      var data = $('#playNext').data('url');
      var videoId = data.split('=');
      Router.go('/battle/' + data);
      Session.set("url", videoId[0]);
      Session.set("video", videoId[1]);
      player.loadVideoById(videoId[1]); 
    },
    destroy: function(){
      player.destroy();
    },
    eventSettings: {
      onReady : function (event) {
                    $('#spinner-wrapper').fadeOut();
                    $('.videoPage').show();
      },
      onStateChange: function (event){
                  if (event.data == 0){
                    player.stopVideo();
                    player.clearVideo();
                    //player.seekTo(0, true);
                    LaptopBattle.video.next();

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


