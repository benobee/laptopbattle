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
                LaptopBattle.menu.toggleMenuClose();       
              },
              onHide: function(){
                LaptopBattle.menu.toggleMenuClose();
                LaptopBattle.menu.hideVideoAdminPanel();
              }
          });
    },
    toggleSidebar : function(){
        $('#menu').sidebar('toggle');
    },  
    toggleUploadForm: function(){
        $('#videoUploadForm').transition('drop');
        $('#addVideo').transition('drop');
    },
    toggleMenuClose: function(){
        var opacity = $('#closeMenu').css('opacity');
        if (opacity == 1){
          $('#closeMenu').animate({
            opacity: 0
          }, 100);
        } else {
          $('#closeMenu').animate({
            opacity: 1
          }, 100);
        }    
    },
    hideVideoAdminPanel : function(){

    },
    openVideoAdminPanel: function(element){

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
      };
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
                    var duration = player.getDuration('player');
                    Session.set("duration", duration);
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
                      
                      //set durations and set session
                      $('#commentSidebar').fadeIn();
                      var duration = player.getDuration();
                      Session.set('duration', duration);

                      //create a constant broadcast of the video position
                      Meteor.setInterval(function(){
                      var time = player.getCurrentTime();

                    Session.set('time', time);
                    }, 125);    
                  } 
      }        
    },
    resetSessions : function(){
        Session.set("video" , '' );
        Session.set('time', '');
        Session.set('duration', '');
    },
    scrollToActive: function(){
        var container = $('#playListItems');
        var active = $('#playListItems').find('.active');
        console.log(container, active, $('#playListItems').height() );


    }
}

//expose API to window
return{
  menu : menu,
  video: video
}

})()

window.LaptopBattle = LaptopBattle;


