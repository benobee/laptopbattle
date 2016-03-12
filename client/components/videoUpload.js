Template.videoUpload.events({
  'click #closeUploadForm'(e){

    LaptopBattle.menu.toggleUploadForm();
    
  },
  'submit #videoUploadForm': function(e) {
      e.preventDefault();

      var name = Meteor.user().username;
      var url = $('#url').val();
      var res = url.split("=");
      var title = $('#title').val();

      Meteor.call('addVideo', Meteor.user()._id, name, res[1], title, function(){
        //reset the form
        $("#battleUpload")[0].reset();

        LaptopBattle.menu.hideForm();

      });  

   }
});