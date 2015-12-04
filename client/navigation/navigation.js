Template.navbar.events({
	'click #toggleSidebar' : function(){
     LaptopBattle.menu.toggleSidebar();
  }
});

Template.navbar.onRendered( function(){
  LaptopBattle.menu.init();
});

//sidebar form handling
Template.sidebarLeft.events({
    'submit #battleUpload': function(e) {
      e.preventDefault();

      $.when( LaptopBattle.menu.toggleSidebar() ).done(function(){
      var url = $('#url').val();
      var res = url.split("=");
      Meteor.call('addVideo', Meteor.user()._id, Meteor.user().profile.name, res[1], $('#title').val(), function(){
        //reset the form
        $("#battleUpload")[0].reset();
      });  
    });
    },
    'click #closeUploadForm' : function(){
      LaptopBattle.menu.toggleUploadForm();
    },
    'click #closeMenu' : function(){
      LaptopBattle.menu.toggleSidebar();
    }
});

Template.myVideos.helpers({
    userVideo: function() {
      if(Accounts.admin == true){
        return Videos.find();
      } else {
        return Videos.find({id: Meteor.userId()});
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

Template.myVideos.events({
    'click .admin .trash': function(e){
     e.stopPropagation(); 
     Meteor.call('deleteVideo', this._id);     
    },
    'click #addVideo' : function(){
      LaptopBattle.menu.toggleUploadForm();
    },
    'change #updateTitle' : function(e){
      e.preventDefault();
      var value = $(e.currentTarget).val();
      Meteor.call('updateTitle', this._id, value);   
    },
    'click #videoList .item ' : function(e){
      e.stopPropagation();
      var title = this.title;
      LaptopBattle.menu.adminPanel.toggle(e.currentTarget, title);    
    },
    'click .videoAdminPanel' : function(e){
      e.stopPropagation();
      $(e.currentTarget).transition('drop');
    },
    'click .videoAdminPanel input' : function(e){
      e.stopPropagation();
    }
});