Accounts.onEmailVerificationLink(function(token){

	Accounts.verifyEmail(token);
	Router.go('/battlers');

});

Accounts.onResetPasswordLink(function(token){

	Accounts.resetPassword(token, Random.id());
	Router.go('/battlers');

});

// Accounts.onLoginFailure(function(){

// 	Router.go('/login');
// 	alert('password failed');

// });

