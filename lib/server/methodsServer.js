Meteor.methods({

    findUser(email){

        return Accounts.findUserByEmail(email);

    },
    sendVerificationEmail(userId){

      console.log('sending email to ' + userId);

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

    }
});