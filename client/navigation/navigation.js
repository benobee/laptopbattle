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
    'click #closeUploadForm' : function(e){
      LaptopBattle.menu.toggleUploadForm();
    },
    'click #closeMenu' : function(){
      LaptopBattle.menu.toggleSidebar();
    }
});

Template.myVideos.helpers({
    userVideo: function() {
      return Videos.find();
        var id = Session.get("id");

        if (Videos.find({id: id})){           
           return Videos.find({id: id});
        }
    },
});

Template.myVideos.events({
    'click .delete': function(){
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
    'click .admin.icon' : function(){
      var id = // parent id of element
      LaptopBattle.menu.openVideoAdminPanel(id);    
    },
    'click .videoAdminPanel' : function(e){
      $(e.currentTarget).transition('drop');
      LaptopBattle.menu.hideVideoAdminPanel();
    },
    'click .videoAdminPanel input' : function(e){
       e.stopPropagation();
    }
});