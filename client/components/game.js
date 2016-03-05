Template.game.helpers({

  'points':function(){

    if(Meteor.user().pointCount){

      return Meteor.user().pointCount;

    } else {

      return '0';

    }    
  },
  rank: function(){

    var users = Meteor.users.find({}, {sort: {pointCount: -1}}).fetch();
    var id = Meteor.userId();

    for(var i in users){

      if(users[i]._id == id && users[i].pointCount > 0){

        var index = parseInt(i);
        var rank = index + 1;

        return rank;
        
      }      
    }
  }
});