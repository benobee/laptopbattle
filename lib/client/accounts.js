Accounts.onEmailVerificationLink(function(token){

	Accounts.verifyEmail(token);
	Router.go('/qualifiers');

});

Accounts.onResetPasswordLink(function(token){

	Accounts.resetPassword(token, Random.id());
	Router.go('/qualifiers');

});

// Accounts.onLoginFailure(function(){

// 	Router.go('/login');
// 	alert('password failed');

// });

