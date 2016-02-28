Template.forms.onRendered(function(){

	$(document).keyup(function(e) {
	     if (e.keyCode == 27) { 

	     	LaptopBattle.menu.hideForm();

	    }
	});
});

Template.forms.events({

	'click .esc'(){
		LaptopBattle.menu.hideForm();
	}

});
