Template.verify.onRendered(function(){

	Session.set('verify', { username: 'benobee', email: 'benobee@gmail.com'});
	var verify = Session.get('verify');

	if(verify !== undefined){

		Meteor.call('checkUser', verify.email, function(error, result){

			if(error){
				console.log(error);
			}

			Meteor.call('sendVerificationEmail', result._id, verify.email);

		});

	}
});

Accounts.onEmailVerificationLink(function(){

	Router.go('/email/verified');

});