Template.videoPage.helpers({
  id:function(){
    var id = Session.get('video');
    return id; 
  },
  url:function(){
    var id = Session.get('video');
    return Videos.findOne(id);
  },
  time: function(){
    return Session.get('time');    
  },
  duration: function(){   
    var s = Session.get('duration');
    return moment.duration(Math.floor(s * 1000)).asMinutes() + ' minutes';
  }
});

Template.videoPage.onRendered(function (){

    $( "#slider-volume" ).slider({
      orientation: "vertical",
      range: "min",
      min: 0,
      max: 100,
      value: 85,
      slide: function( event, ui ) {
        $( "#amount" ).val( ui.value );
      }
    });
    $( "#amount" ).val( $( "#slider-volume" ).slider( "value" ) );

var s = Session.get('duration');

    $( "#slider" ).slider({
      range: "max",
      min: 0,
      max: s,
      value: 0,
      slide: function( event, ui ) {
        player.seekTo(ui.value, true);
      }
    });
    
});

Template.videoPage.events({
  
  'click .closeButton': function(e){
    
    $(".videoPage").fadeOut('slow');
    $(".videoPage").css('transform','translateY(100%)');
    $(".videoPage").promise().done(function(){
    
    $('.main-video').transition('fade');
    Session.set("video" , '' );
    Session.set('time', '');
    Session.set('duration', '');
    player.destroy();
    $('#pause').hide();
    $('#play').show();
    });       
  },
  'click #play': function(e){
    $('#play').hide();
    $('#pause').show();
    $('#pause').css('opacity','1');
    player.playVideo();

    var duration = player.getDuration();
    Session.set('duration', duration);

    Meteor.setInterval(function(){
    var time = player.getCurrentTime();
    var s = Session.get('duration');

    $( "#slider" ).slider({
      range: "max",
      min: 0,
      max: s,
      value: time
    });

    Session.set('time', time);
    }, 125);    
  },
  'click #pause': function(e){
    player.pauseVideo();
    $('#pause').hide();
    $('#play').show();
  },
  'click #stop': function(e){
    player.stopVideo();
  },
  'mouseenter .volumeContainer': function(e){
    $('#slider-volume').css('opacity','1');
    $('#slider').css('opacity','0');
  },
  'mouseleave .volumeContainer': function(e){
    $('#slider-volume').css('opacity','0');
    $('#slider').css('opacity','1');
  }
});

Template.allComments.helpers({
  id:function(){
    var id = Session.get('video');
    return id;
  },
  url:function(){
    var id = Session.get('video');
    return Videos.findOne(id);
  },
  comment: function(){
    return Comments.find({'videoId': Session.get('video') ,'time': { $lt: Session.get('time') }}, {sort: {time: 1}});
  }
});

Template.post.helpers({
  date: function(){
    return moment(this.date).fromNow();
  },
  time: function(){
    return this.time;
  }
});

Template.sidebarRight.events({
    
    'submit #commentForm': function(e){
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
  ;
});

Template.post.onRendered(function (){
  
    $('.post').css('opacity','1').css('transform','translateX(0)'); 
    
});