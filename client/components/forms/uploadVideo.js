Template.uploadVideo.events({
  'click #closeUploadForm'(e){
    LaptopBattle.menu.toggleUploadForm();
  },
  'submit #battleUpload': function(e) {
      e.preventDefault();

      $.when( LaptopBattle.menu.toggleSidebar() ).done(function(){
      if(Meteor.user().username){
        var name = Meteor.user().username;
      } else {
        var name = Meteor.user().profile.name;
      }
      var url = $('#url').val();
      var res = url.split("=");
      Meteor.call('addVideo', Meteor.user()._id, name, res[1], $('#title').val(), function(){
        //reset the form
        $("#battleUpload")[0].reset();
        LaptopBattle.menu.toggleUploadForm();
      });  
    });
  }
});