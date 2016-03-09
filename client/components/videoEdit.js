Template.videoEdit.events({

	'click #save'(e){
        e.preventDefault();
		var data = $('#videoEditForm').serializeArray();

	    var url = data[1].value;
	    var res = url.split("=");

		Meteor.call('updateVideo', this._id, data[0].value, res[1]);
		LaptopBattle.menu.hideForm();

		var element = document.getElementById('videoEditSettings');

		if(element !== null){
			
	    	var view = Blaze.getView(element);
	      	Blaze.remove(view);

		}

	},
	'click #deleteVideo'(e){
		e.preventDefault();

		Meteor.call('deleteVideo', this._id, function(error, result){

		    $('.forms').transition('fade');
			var element = document.getElementById('videoEditSettings');

			if(element !== null){
				
		    	var view = Blaze.getView(element);
		      	Blaze.remove(view);

			}

		});

	}
});


Template.videoEdit.helpers({

	title : function(){

		return this.title;

	},
	link : function(){

		return 'https://www.youtube.com/watch?v=' + this.url;

	}

});
