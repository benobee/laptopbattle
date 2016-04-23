Template.forms.events({
	'click .forms'(){

		LaptopBattle.menu.hideForm();

		var element = document.getElementById('videoEditSettings');
		if(element !== null){

	    	var view = Blaze.getView(element);
	      	Blaze.remove(view);

		}


	},
	'click .popupForm'(e){

		e.stopPropagation();

	}

});
