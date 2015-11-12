//initiailze the nav sidebar
Template.navbar.events({
	'click #toggleSidebar'(){
     $('#menu').sidebar('toggle');
  	}
});

Template.navbar.onRendered( function(){
  $('#menu').sidebar({
      dimPage: true,
      closable: true,  
      transition: 'overlay',
      onShow: function(){
        $('#closeMenu').css('opacity','1');
        
      },
      onHide: function(){
        $('#closeMenu').css('opacity','0');
        var x = $('#videoUploadForm').css('display');
        if (x == 'block'){
          $('#videoUploadForm').transition('drop');
          $('#addVideo').transition('drop');
        }
      }
    });
});

//sidebar form handling
Template.sidebarLeft.events({
    'submit #battleUpload': function(e) {

      $.when( $('#menu').sidebar('toggle') ).done(function(){
      var url = $('#url').val();
      var res = url.split("=");
      e.preventDefault();
      Meteor.call('addVideo', Meteor.user()._id, Meteor.user().profile.name, res[1], $('#title').val(), function(){
        //reset the form
        $("#battleUpload")[0].reset();
      });  
    });
    },
    'click #closeUploadForm'(e){
      $('#videoUploadForm').transition('drop');
      $('#addVideo').transition('drop');
      $('#closeMenu').css('opacity','1');
    },
    'click #closeMenu'(e){
      $('#menu').sidebar('toggle');
    }
});

Template.myVideos.helpers({
    userVideo: function() {
      return Videos.find();
        // var id = Session.get("id");

        // if (Videos.find({id: id})){
           
        //    return Videos.find({id: id});
        // }
        // else{
        //   $('#videoMessage').html('<p>Upload some videos Dawg</p>');
        // }
    },
});

Template.myVideos.events({
    'click .delete': function(e){
     Meteor.call('deleteVideo', this._id, function(error, result){
        if(error){
          console.log(error);
        }
        else{
          //$('#menu').sidebar('toggle');
        }        
     });     
    },
    'click #addVideo'(e){
      $('#videoUploadForm').transition('drop');
      $('#addVideo').transition('drop');
      $('#closeMenu').css('opacity','0');
    },
    'change #updateTitle'(e){
      e.preventDefault();
      var value = $(e.currentTarget).val();
      Meteor.call('updateTitle', this._id, value, function(error, result){
        if (error){
          console.log(error);
        }
      });   
    },
    'click .cancel'(e){
      var message = $(e.currentTarget).closest('.messageConfirm');
      $(message).transition('slide left');
    },
    'click .deleteVideo'(e){
      var message = $(e.currentTarget).parent().find('.messageConfirm');
      $(message).transition('slide left');
    }
});