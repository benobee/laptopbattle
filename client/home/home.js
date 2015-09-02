Template.home.helpers({
    videos: function() {
      return Videos.find({}, {sort: {date: -1}});     
    }
});

Template.mainVideos.rendered = function () {
  $('#spinner-wrapper').hide();
};

Template.mainVideos.helpers({
    like: function() {       
      return Likes.find({'videoId': this._id });
    },
    count: function(){
      var count = Likes.find({'videoId': this._id }).count();
      return count;
      
    },
    liked: function(){
      if (Likes.find({'videoId': this._id }).count() >= 1){
        return '#C20000';
      }
      else{
        return '';
      }
    }
});

Template.home.events({

  'click .button.expand' : function(e){
    var id = 'controls' + this._id;
    $('.main-video').transition('fly down');
    $('.expand').attr("disabled", "disabled");
    setTimeout('$(".expand").removeAttr("disabled")', 1500);
    Session.set("video" , this._id );
    Session.set("url" , this.url );
    var x = Session.get('video');
    var url = Session.get('url');
    $(".videoPage").fadeIn('fast');

    onYouTubeIframeAPIReady = function () {
        player = new YT.Player("player", {
            height     : "auto", 
            width      : "100%",
            controls   : 0,
            autohide   : 1,
            showinfo   : 0,
            videoId    : url, 
            events     : {
                onReady: function (event) {

                    // $('#thumb').append('<img style="width:100%;max-height:400px" src="http://img.youtube.com/vi/'+url+'/0.jpg"/>');
                    var d = player.getDuration('player');
                    Session.set("duration", d);  
                    $(".videoPage").css('transform','translateY(0%)'); 
                }
            }
        });
    };
    YT.load();
    },
    'click #like': function(e){

      Likes.insert({

      'videoId' : this._id,
      'userId' : Meteor.user()._id,
      'name': Meteor.user().profile.name,
      'date': new Date()

    });
    }
});


