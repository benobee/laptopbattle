Accounts.onLogin(function(){
  
  Session.set("id",Meteor.user()._id);
  Session.set("name",Meteor.user().profile['name']);
  Session.set("image",Meteor.user().services.google.picture);

});

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
      return Likes.find({'videoId': this._id }).count();
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
  'click #expand' : function(e){
    Session.set("video" , '' );
    Session.set("video" , this._id );
    var x = Session.get('video');
    $(".videoPage").css('transform','translateY(0%)');

  },
  'click #add-video' : function(e){

      $('#add-modal-wrapper').slideToggle();
      $('#add-video').hide();
      $('#close-video').show();
  },
  'click #close-video' : function(e){
      $('#add-modal-wrapper').slideToggle();
      $('#add-video').show();
      $('#close-video').hide();
  },
  'submit form': function(e) {

      var url = $('#url').val();
      var res = url.split("=");

      e.preventDefault();
      Videos.insert({

        'id': Meteor.user()._id,
        'name': Meteor.user().profile.name,
        'url': res[1],
        'date': new Date(),
        'title': $('#title').val()

      });

      $("#battleUpload")[0].reset();

      $('#add-modal-wrapper').hide('slow');
      $('#add-video').show();
      $('#close-video').hide();
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
    // var id = Session.get('video');
    return Comments.find({'videoId': Session.get('video') });
  },
  date: function(){
    return moment(this.date).fromNow();
  }
});

Template.videoPage.events({
    'click #addComment': function(e){
      var id = Session.get('video');
      console.log(id);
    e.preventDefault();

    Comments.insert({

      'videoId' : id,
      'name': Meteor.user().profile.name,
      'post': $( '#post' ).val(),
      'date': new Date()

    });

    $( "#commentForm" )[0].reset();
  },
  'click .closeButton': function(e){
   $(".videoPage").css('transform','translateY(100%)');       
  }
})
