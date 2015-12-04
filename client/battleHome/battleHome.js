//load all videos and populate on the page
Template.battleHome.helpers({
  videos : {
      'content' : Videos.find({}, {sort: {date: -1}}),
      'length'  : function(){
        return this.content.count();
      }
  }
});
// Template.home.onRendered(function(){
//   $(".owl-carousel").owlCarousel({
//     items : 1,
//     autoPlay : true
//   });
// });

//handle video card user interactions
Template.mainVideos.helpers({
    count : function(){
      //show count of votes per video
      if(this.votes == undefined){
        return "no votes";
      } else if (this.votes.length == 1){
        return this.votes.length + " " + "vote";  
      } else {
        return this.votes.length + " " + "votes";
      }           
    },
    voted : function(){
      var voteList = _.map(this.votes, function(user){
        return user.userId;
      });
      var voted = _.contains(voteList, Meteor.userId());
      if (voted == true){
        return 1;
      } else {
        return 0;
      }
    }
});

Template.battleHome.events({
    'click .card' : function(){
      Session.set("url" , this.url);
      Session.set("video" , this._id);
      Router.go('/battle?id='+ this._id + '&url=' + this.url);
    },
    'click .extra.content.vote'(e){
      //vote for the video
      e.stopPropagation();
      Meteor.call("vote", this._id, Meteor.user()._id);
    },
    'click .extra.content.voted'(e){
      //remove vote for the video
      e.stopPropagation();
      Meteor.call("removeVote", this._id, Meteor.user()._id);
    }
});

Template.mainVideos.onRendered(function (){
  $('#spinner-wrapper').fadeOut();
  Session.set('duration', null);
});
