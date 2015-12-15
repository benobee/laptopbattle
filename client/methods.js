//UI
var LaptopBattle = (function(){

//menu related events and methods
var menu = {
    init: function(){
        $('#menu').sidebar({
              dimPage: true,
              closable: true,  
              transition: 'overlay',
              onShow: function(){
                //do stuff
              },
              onHide: function(){
                $('.videoAdminPanel').find().hide();
                $('#videoUploadForm').hide();
                $('#loginForm').show();
                $('#createAccountForm').hide();
              }
          });
    },
    hideSidebar : function(){
      $('#menu').sidebar('hide');
    },
    toggleSidebar : function(){
        $('#menu').sidebar('toggle');
    },  
    toggleUploadForm: function(){
        $('#videoUploadForm').transition('drop');
        $('#addVideo').transition('drop');
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
     play: function(){
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
            videoId    : Session.get('url'), 
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
      onReady : function onReady(event) {
                    $('#spinner-wrapper').fadeOut();
                    $('.videoPage').show();
                    player.playVideo();  
      },
      onStateChange: function onStateChange(event){

                  if (event.data == 0){
                    player.stopVideo();
                    player.clearVideo();
                    player.seekTo(0, true);

                    var next = $('#playListItems').find('.active').next().attr('href');
                    if(next !== undefined){
                      var nextSession = $('#playListItems').find('.active').next().attr('name');
                      Session.set('video', nextSession);
                      var search = $('#playListItems').find('.active').next().attr('href');
                      var url = search.split('=');
                      player.loadVideoById(url[2]);
                    } else{                     
                      var nextSession = $('#playListItems').find('.item').first().attr('name');                     
                      Session.set('video', nextSession);
                      var search = $('#playListItems').find('.item').first().attr('href');
                      var url = search.split('=');
                      player.loadVideoById(url[2]);
                    }
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

var user = {
  onLogIn : function (){
    Tracker.autorun(function(){
       if(Meteor.userId()){
        LaptopBattle.menu.hideSidebar();
         $.when( $('.spinner-wrapper').fadeIn() ).done(function(){           
            Router.go('/battles');
         });
         
       } else {         
          $.when( LaptopBattle.menu.hideSidebar() ).done(function(){
          Router.go('/');
          $('.spinner-wrapper').fadeOut();
         });
           
       }  
    });
  }
}

return {
  user : user,
  menu : menu,
  video: video
}

})();

window.LaptopBattle = LaptopBattle;


