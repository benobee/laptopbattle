//process the data into readable format for comments
Template.post.helpers({

  date : function(){

    return moment(this.date).fromNow();

  },
  time : function(){

    return this.time;

  },   
  admin : function() {

    if(Meteor.user()) {

      if (this.userId == Meteor.user()._id) {

       return true;

      } else {

       return false;

      }
    }
  } 
});

Template.post.events({
  'click .post .marker': function() {

    player.seekTo(this.time, true);

  },
  'click .post .trash': function() {

    Meteor.call("deleteComment", this._id, Session.get("videoUserId"));

  }
});

//on new post animate from right to left removing the css class "loading"
Template.post.onRendered(function () {

  var $post = $(this.find('.post'));

  Meteor.defer(function() {

    $post.removeClass('loading').transition('hide').transition({

      animation  : 'fade left',
      duration   : '0.5s' }).promise();

  });
});