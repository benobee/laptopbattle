Template.videoSettings.onRendered(function(){

  $('#addVideo').popup();

});

Template.videoSettings.helpers({

  userVideo: function() {

      if( Meteor.user().admin ){

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
    'click .addVideo' : function(){

      LaptopBattle.menu.toggleUploadForm();

    },
    'click #videoList .item' : function(e){
     //navigate to video edit page

      var data = Videos.findOne({_id : this._id });

      var parentNode = document.getElementById('forms');
      Blaze.renderWithData(Template.videoEdit, data, parentNode);

      $('.forms').transition('fade');
      $('.lb-form.videoEdit').transition('drop');

    },
    'click .lb-form.videoEdit'(e){

      var element = document.getElementById('videoEditSettings');
      var view = Blaze.getView(element);
      Blaze.remove(view);

    }
});



