Template.createAccount.events({
  
   'click #accountSubmit'(e){

    e.preventDefault();
  
    var data = $('#createAccountForm').serializeArray();

    var username = data[0].value;
    var password = data[1].value;
    var email = data[2].value;
    var location = data[3].value;

    Meteor.call('submitUser', username, password, email, location );
    Router.go('/account/verify');
    
  }
});

