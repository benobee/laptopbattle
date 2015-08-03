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