Accounts.onEmailVerificationLink(function(token){

	Accounts.verifyEmail(token);
	Router.go('/battlers');

});