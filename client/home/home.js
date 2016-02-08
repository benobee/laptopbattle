Template.join.events({
	'click #rules':function(){
		$('.ui.long.modal').modal('show');
	}
});

Template.home.onRendered(function(){	
	$('.spinner-wrapper').addClass('hide');

});

