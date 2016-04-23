Template.changePassword.events({
	'submit #changePasswordForm'(e){
		e.preventDefault();
		var data = $('#changePasswordForm').serializeArray();
		var pw1 = data[0].value;
		var pw2 = data[1].value;
		if(pw1 == pw2){
			Meteor.call('changeUserPassword', Meteor.userId(), pw1, function(error, result){
				if(error){console.log(error);}
				$.when( Meteor.logout() ).then(function(){
					Router.go('/login');
				});
			});
		} else {
			$('#nope').modal('show');
		}
	}
});