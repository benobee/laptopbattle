Accounts.users.allow({
 update:function(){

   	return true;

 }
})

Meteor.users.deny({
  update: function() {

    return true;

  }
});

Accounts.users.allow({
 remove:function(){

   if(Meteor.user().profile.admin){

   	return true;

   } 
  }
});