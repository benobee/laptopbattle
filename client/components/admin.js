Template.admin.helpers({

	'users'(){

		return Accounts.users.find();

	},
	'player'(){

		if(this.player){

			return 'checked';

		}

	}
});

Template.admin.events({

	'click .ui.button.red'(){

	    Meteor.call('removeUser', this._id, function(error, result){

	    	if(error){

	    		console.log(error);

	    	}
	    });
	},
	'change .checkbox'(e){

			var type, 
					state;

			var type = $(e.currentTarget).data('type');
			var state = $(e.currentTarget).data('state');


			if(state !== undefined){

				var state = $(e.currentTarget).data('state');


			} else {

				var state = false;
			}

			if (type == "player"){   

						Meteor.call('updatePlayer', this._id, state, function(result, error){

							if(error){

								console.log(error);

							}
						});

			}  else if (type == "active"){   

						Meteor.call('updateActive', this._id, state, function(result, error){

							if(error){

								console.log(error);

							}
						});

			}
	}
});









