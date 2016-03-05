Template.videoEdit.events({

	'submit #videoEditForm'(e){

		e.preventDefault();
		var data = $('#videoEditForm').serializeArray();
		console.log(data);

		Meteor.call('updateVideo', this._id, data[0].value, data[1].value);
		LaptopBattle.menu.hideForm();

	},
	'click #deleteVideo'(e){

		Meteor.call('deleteVideo', this._id);

	}
});

Template.videoEdit.helpers({
	videoData : function(){

		var id = Session.get('videoId');
		if (id !== undefined){

			return Videos.findOne({_id : id });	

		}

	},
	title : function(){

		return this.title;

	},
	link : function(){

		return this.url;

	}

})