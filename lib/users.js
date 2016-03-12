//add point array to users
Meteor.users.votes = [];
Meteor.users.pointCount = {};

Meteor.methods({

  updatePlayer(id, state){

    Meteor.users.update({ _id : id }, {

      $set: {

          player : !state

      }        
    });

  },
  removeUser(id){

    Accounts.users.remove({_id: id});

  },
  changeUsername(newUsername){

    Meteor.users.update({_id:Meteor.user()._id}, {

    	$set:{

    		username : newUsername }

    	});

  }

});