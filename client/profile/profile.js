Template.profile.helpers({

    userVideo: function() {
        var id = Session.get("id");

        if (Videos.find({id: id})){
           
           return Videos.find({id: id});
        }
        else{
          $('#videoMessage').html('<p>Upload some videos Dawg</p>');
        }
    },
    avatar: function() {     
      if (Session.get("image") !== null){
        return Session.get("image");
      }      
    },
    userName: function(){
       if (Session.get("name") !== null){
        return Session.get("name");
      }            
    } 
});

Template.profile.events({

    'submit form': function(e) {

      var url = $('#url').val();
      var res = url.split("=");

      e.preventDefault();
      Videos.insert({

        'id': Meteor.user()._id,
        'name': Meteor.user().profile.name,
        'url': res[1],
        'date': new Date(),
        'title': $(e.target).find('#title').val()

      });

      $("#battleUpload")[0].reset();
    },
    'click .lb-button-ui': function(e){
     Videos.remove(this._id);
    },
    'mouseenter .lb-video': function(e){
      $('#'+this._id+' .video-ui').attr("style","top:20%");
    },
    'mouseleave .lb-video': function(e){
      $('#'+this._id+' .video-ui').attr("style","top:-150px");
    },
    'click .time' : function(e){
      console.log(player.getCurrentTime());
    }
});



