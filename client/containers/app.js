Template.leaderboard.helpers({

  'user':function(){
     var users = Meteor.users.find({ pointCount: { $gt: 0 } }, { sort: { pointCount: -1 }});
     leaderboard = users.fetch();
     return leaderboard;
  },

  'index':function(){
     var rank = leaderboard.indexOf(this);
     return rank + 1;
  }

});

//load all videos and populate on the page
Template.battleHome.helpers({
  videos : {
      'content' : Videos.find({}, {sort: {date: -1}}),
      'length'  : function(){
        return this.content.count();
      }
  }
});

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

        $('.spinner-wrapper').removeClass('hide');
        Session.set("url" , this.url);
        Session.set("video" , this._id);
        Session.set("videoUserId" , this.id);
        Router.go('/battle?id='+ this._id + '&url=' + this.url);

    },
    'click .extra.content.vote' : function(e){

        //vote for the video
        e.stopPropagation();
        Meteor.call("vote", this._id, Meteor.user()._id);
        Meteor.call("addPoints", this._id, this.id, "vote");

    },
    'click .extra.content.voted' : function(e){

        //remove vote for the video
        e.stopPropagation();
        Meteor.call("removeVote", this._id, Meteor.user()._id );
        Meteor.call("removePoints", Meteor.userId(), this._id, this.id);

    }
});

Template.mainVideos.onRendered(function (){

  Session.set('duration', null);

});


