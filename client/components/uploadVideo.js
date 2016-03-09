Template.uploadVideo.events({
  'click #closeUploadForm'(e){

    LaptopBattle.menu.toggleUploadForm();
    
  },
  'submit #videoUploadForm': function(e) {
      e.preventDefault();

      var name = Session.get('username');
      var url = $('#url').val();
      var res = url.split("=");

      Meteor.call('addVideo', Meteor.user()._id, name, res[1], $('#title').val(), function(){
        //reset the form
        $("#battleUpload")[0].reset();

        LaptopBattle.menu.hideForm();

      });  

   }
});