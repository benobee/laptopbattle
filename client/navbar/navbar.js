Template.navbar.events({
	'click #toggleSidebar' : function(){
     $('#menu')
     .sidebar('setting', 'transition', 'push')
     .sidebar('toggle');
  	},
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

Template.sidebarRight.events({
    
    'submit #commentForm': function(e){
      var time = player.getCurrentTime();
      console.log(time);
      var id = Session.get('video');
     
    e.preventDefault();

    Comments.insert({

      'videoId' : id,
      'name': Meteor.user().profile.name,
      'post': $( '#post' ).val(),
      'date': new Date(),
      'time': time

    });

    $( "#commentForm" )[0].reset();
    }
});

Template.sidebarRight.helpers({
  id:function(){
    var id = Session.get('video');
    return id; 
  },
  url:function(){
    var id = Session.get('video');
    return Videos.findOne(id);
  },
  comment: function(){

    return Comments.find({'videoId': Session.get('video') });
  },
  date: function(){
    return moment(this.date).fromNow();
  },
  time: function(){
    return this.time;
  }
});

Template.sidebarRight.onRendered(function () {
  $('#commentSlider')
  .sidebar('setting', 'transition', 'overlay')
  .sidebar()
  ;
});


