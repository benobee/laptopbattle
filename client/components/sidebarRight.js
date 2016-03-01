//get the comments for a video
Template.sidebarRight.helpers({
  id : function(){
    var id = Session.get('video');
    return id;
  },
  url : function(){
    var id = Session.get('video');
    return Videos.findOne(id);
  },
  comment : function(){
    return Comments.find({'videoId': Session.get('video') ,'time': { $lt: Session.get('time') }}, {sort: {time: -1}, limit: 10});
  }
});

//new comment form
Template.sidebarRight.events({
  'click #facebookLoginButton'(e){

    Meteor.loginWithFacebook({

        requestPermissions: ['public_profile', 'email', 'user_friends'], 
        loginStyle        : 'popup'

      }, function (err, response) {
         
      if (err) 
        Session.set('errorMessage', err.reason || 'Unknown error');    
    });

  },  
  'submit #commentForm'(e){
      e.preventDefault();

  if(Meteor.user().username){ 

    var name = Meteor.user().username;

  } else {

    var name = Meteor.user().profile.name;

  }
  var videoUserId = Session.get('videoUserId');
  var comment = {

        'videoTime' : player.getCurrentTime(),
        '_id'       : Session.get('video'),
        'userId'    : Meteor.user()._id,
        'user'      : name,
        'val'       : $( '#post' ).val(),
        'addComment'  : function(){
          Meteor.call('addComment', this._id, this.userId, this.user, this.val, this.videoTime, videoUserId);

          $( "#commentForm" )[0].reset();
        }
  };

    comment.addComment();  

  }
});



