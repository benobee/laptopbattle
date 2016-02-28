Template.createAccount.events({
  
   'click #accountSubmit'(e){

    e.preventDefault();
      
    var username = $('#createName').val();
    var password = $('#createPassword').val();

    Accounts.createUser({ 

      'username': username, 
      'password': password 

    }); 

    Router.go('/account');

  }
});

