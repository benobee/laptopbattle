//UI
var LaptopBattle = (function(){

//menu related events and methods
var menu = {
    init: function(){
        $('.ui.sidebar').sidebar({
              dimPage: false,
              transition : 'overlay',
              closable: true,  
              onHide: function(){
                $('.videoAdminPanel').hide();
                $('#videoUploadForm').hide();
                $('#loginForm').show();
                $('.hiddenForm').hide();
              }
          });
    },
    hideSidebar : function(){
      $('.ui.sidebar').sidebar('hide');
    },
    toggleSidebar : function(){
        $('.ui.sidebar').sidebar('toggle');
    },
    hideForm : function(){
        $('.forms').transition('hide');
        $('#videoUploadForm').transition('hide');
    },  
    toggleUploadForm: function(){
        $('.forms').transition('fade');
        $('#videoUploadForm').transition('drop');
    },
    sidebar: {
      toggle : function(){
        $('.ui.sidebar').sidebar('toggle');
      },
      render:function(template){
        $('#profileMenuContent').html(template);
      }
    },
    adminPanel: {
      isVisible: function(){
        return $('.videoAdminPanel').transition('is visible');
      },
      toggle: function(element, title){
        $('#updateTitle').val(title);
        var visible = LaptopBattle.menu.adminPanel.isVisible();

        if(visible == false){
          var adminPanel = $('.videoAdminPanel');
          $(element).append(adminPanel);
          $('.videoAdminPanel').transition('drop');
        } else {
          var adminPanel = $('.videoAdminPanel');
          $(adminPanel).transition({
            animation: 'drop',
            duration : '50ms',
            allowRepeats: true,
            onStart : function(){
              $(adminPanel).transition('drop');          
            },
            onComplete : function(){            
              $(element).append(adminPanel);
            }
          });       
        }
      }     
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


