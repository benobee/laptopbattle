Template.videoCard.helpers({
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

Template.videoCard.events({

    'click .card' : function(){

        $('.spinner-wrapper').removeClass('hide');
        Session.set("url" , this.url);
        Session.set("video" , this._id);
        Session.set("videoUserId" , this.id);
        Router.go('/battle/'+ this._id + '?url=' + this.url);
        $('#spinner-wrapper').fadeIn();
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