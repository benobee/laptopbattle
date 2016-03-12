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