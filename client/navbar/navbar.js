Template.navbar.events({
	'click #toggleSidebar' : function(){
     $('#menu')
     .sidebar('setting', 'transition', 'push')
     .sidebar('toggle');
  	}
});

Template.sidebarLeft.events({
    'submit #battleUpload': function(e) {

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

      $("#battleUpload")[0].reset();
      $('#add-modal-wrapper').hide('slow');
      $('#add-video').show();
      $('#close-video').hide();
    }
});

