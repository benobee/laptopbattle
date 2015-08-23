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
    // $('.main-video').not( document.getElementById( id ) ).transition('fly down');
    // $('#'+id).css('transform','scale(1.05,1.05)');
    Session.set("video" , this._id );
    Session.set("url" , this.url );
    var x = Session.get('video');
    var url = Session.get('url');
    $(".videoPage").fadeIn('fast');

    onYouTubeIframeAPIReady = function () {
        player = new YT.Player("player", {
            height: "auto", 
            width: "100%", 
            videoId: url, 
            events: {
                onReady: function (event) {
                    // event.target.playVideo();
                    // $('#'+id).css('transform','scale(1,1)').transition('fade');
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


