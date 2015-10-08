//initiailze the nav sidebar
Template.navbar.events({
	'click #toggleSidebar'(){
     $('#menu')
     .sidebar('setting', 'transition', 'overlay')
     .sidebar('toggle');
  	},
    'click #instrument'(){
      $('.shape').shape('flip over');
    }
});

//sidebar form handling
Template.sidebarLeft.events({
    'submit #battleUpload': function(e) {


      $.when( $('#menu').sidebar('toggle') ).done(function(){
      $('#videoUploadForm').transition('fade down');
      $('#addVideo').show();

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
      //reset the form
      $("#battleUpload")[0].reset();
    });
    },
    'click #closeUploadForm'(e){
      $('#videoUploadForm').transition('fade down');
      $('#addVideo').show();
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
    'click .lb-button-ui': function(e){
     Videos.remove(this._id);
     $('#menu').sidebar('toggle');
    },
    'click #addVideo'(e){
      $('#videoUploadForm').transition('fade down');
      $('#addVideo').hide();
    },
    'click .title'(e){
      var text = $(e.currentTarget).html();
      var container = $(e.currentTarget).parent().html('<form id="changeText"><input value="'+text+'"></form>');
      console.log(container);
    }
});
