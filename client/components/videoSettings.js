Template.videoSettings.onRendered(function(){

  $('#addVideo').popup();

});

Template.videoSettings.helpers({

  userVideo: function() {

      if(Accounts.admin){

        return Videos.find();

      } else {

        return Videos.find({ id: Meteor.userId() });
        
      }      
  },
  user : function() {

      if(this.id == Meteor.userId()){

         return true;

      } else {

         return false;
      }
  }

});

Template.videoSettings.events({
  
    'click #closeUploadForm' : function(){

      LaptopBattle.menu.toggleUploadForm();

    },
    'click .admin .trash': function(e){

      e.stopPropagation(); 
      Meteor.call('deleteVideo', this._id);     

    },
    'click .addVideo' : function(){

      LaptopBattle.menu.toggleUploadForm();

    },
    'click #videoList .item ' : function(e){
     //navigate to video edit page

    }
});



