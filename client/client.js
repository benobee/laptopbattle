Template.profile.helpers({
   	userVideo: function() {    
      return Videos.find();
   	},
    avatar: function() {
      
      if (Meteor.user() !== null){
        return Meteor.user().services.google.picture;
      }      
    }
});

Template.home.helpers({
    videos: function() {    
      return Videos.find();
    },
    comment: function(){
      return Comments.find({'videoId': this._id });
    },
    date: function(){
      return moment(this.date).fromNow();
    }
});

Template.home.events({
  'click #addComment': function(e){
    e.preventDefault();

    Comments.insert({

      'videoId' : this._id,
      'name': Meteor.user().profile.name,
      'post': $('#comment'+this._id).val(),
      'date': new Date()

    });

    $("#form"+this._id)[0].reset();
  }
})

Template.profile.events({
    'submit form': function(e) {
      e.preventDefault();
      Videos.insert({

        'id': Meteor.user()._id,
        'name': Meteor.user().profile.name,
        'url': $(e.target).find('#url').val(),
        'date': new Date(),
        'title': $(e.target).find('#title').val()

      });

      $("#battleUpload")[0].reset();
    },
    'click .lb-button-ui': function(e){

     Videos.remove(this._id);

    },
    'mouseenter .lb-video': function(e){
      $('#'+this._id+' .video-ui').show();
    },
    'mouseleave .lb-video': function(e){
      $('#'+this._id+' .video-ui').hide();
    }
});

Meteor.Spinner.options = {
    lines: 13, // The number of lines to draw
    length: 10, // The length of each line
    width: 4, // The line thickness
    radius: 15, // The radius of the inner circle
    corners: 0.7, // Corner roundness (0..1)
    rotate: 0, // The rotation offset
    direction: 1, // 1: clockwise, -1: counterclockwise
    color: '#fff', // #rgb or #rrggbb
    speed: 1, // Rounds per second
    trail: 60, // Afterglow percentage
    shadow: true, // Whether to render a shadow
    hwaccel: false, // Whether to use hardware acceleration
    className: 'spinner', // The CSS class to assign to the spinner
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    top: 'auto', // Top position relative to parent in px
    left: 'auto' // Left position relative to parent in px
};

Template.notifications.onCreated(function () {
  // Use this.subscribe inside onCreated callback
  this.subscribe("notifications");
});