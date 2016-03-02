Template.createAccount.events({
  
   'click #accountSubmit'(e){

    e.preventDefault();
  
    var data = $('#createAccountForm').serializeArray();

    var username = data[0].value;
    var password = data[1].value;
    var email = data[2].value;
    var age = data[3].value;
    var location = data[4].value;

    Meteor.call('submitUser', username, password, email, age, location, function(error, result){

        Router.go('/account/verify');

        Session.set('verify', {

            username : username,       
            email    : email  

        });           
    });

  }
});

