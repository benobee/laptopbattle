Accounts.emailTemplates.siteName = "Laptop Battle";
Accounts.emailTemplates.from = "Battle Master Pro <contact@laptopbattle.com>";
Accounts.emailTemplates.verifyEmail.subject = function (user) {

    return "Welcome, " + user.username + "!";

};

Accounts.emailTemplates.verifyEmail.text = function (user, url) {
   return "You are about to begin an exciting career at Laptop Battle!"
     + " To activate your account, simply click the link below:\n\n"
     + url;
};

// LIVE AUTH
ServiceConfiguration.configurations.upsert(
  	{ service: "facebook" },
    	{
	        $set: {
	          appId: "442572199236703",
	          secret: "91ac94b88c3ceabf6dec283fa0ed2b22"
	        }
  		}
);

// // // TEST AUTH 
// ServiceConfiguration.configurations.upsert(
//   { service: "facebook" },
//     {
//        $set: {
//           appId: "516546195172636",
//           loginStyle: "popup",
//           secret: "b6f6ccdcbbe750118869a0d8e1c7a953"
//        }
//   	}
// );

Meteor.methods({
    findUser(email){
       return Accounts.findUserByEmail(email);
    },
    sendVerificationEmail(userId){
      Accounts.sendVerificationEmail(userId);
    },
    submitUser: function(username, password, email, age, location){
      var userId = Accounts.createUser({ 

        'username' : username,
        'password' : password, 
        'email'    : email,
        'profile'  : {
          'location' : location
        },
        callback : function(){
          return this;
        }
      });
      Meteor.users.update({ _id : userId }, {
        $set: {
          player : true
        }        
      });
      Accounts.sendVerificationEmail(userId);
    },
    resetUserPassword: function(email){
        var userId = Accounts.findUserByEmail(email);
        Accounts.sendResetPasswordEmail(userId, email);
    },
    changeUserPassword(userId, newPassword){
      Accounts.setPassword(userId, newPassword, {logout:false});
    }
});
