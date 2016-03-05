Template.tick.events({
  'click .timeline.tick': function(){

    player.seekTo(this.time, true);
    
  },
  'mouseenter .timeline.tick': function(e){

    $(e.currentTarget).popup("show");

  }
});

Template.tick.helpers({

  videoFrame: function(){ 

    var duration = Session.get("duration");
    this.position = LaptopBattle.video.getTickPosition(this);

    if(duration !== null){

      $('#timeline').css("opacity",1);
      return this.position; 
    }
  }  
});
