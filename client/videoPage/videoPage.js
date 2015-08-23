Template.videoPage.helpers({
  id:function(){
    var id = Session.get('video');
    return id; 
  },
  url:function(){
    var id = Session.get('video');
    return Videos.findOne(id);
  },
  comment: function(){

    return Comments.find({'videoId': Session.get('video') });
  },
  date: function(){
    return moment(this.date).fromNow();
  },
  time: function(){
    return this.time;
  }
});

Template.videoPage.events({
  
  'click .closeButton': function(e){
    
    $(".videoPage").fadeOut('slow');
    $(".videoPage").css('transform','translateY(100%)');
    $(".videoPage").promise().done(function(){
    
    $('.main-video').transition('fade');
    Session.set("video" , '' );
    player.destroy();
    });       
  },
  'click #play': function(e){
    player.playVideo();
  },
  'click #pause': function(e){
    player.pauseVideo();
  },
  'click #stop': function(e){
    player.stopVideo();
  }
})