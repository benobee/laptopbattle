Template.navbar.events({
	'click #toggleSidebar' : function(){
     LaptopBattle.menu.toggleSidebar();
  }
});

Template.navbar.helpers({
  'signInTitle':function(){
    if(Meteor.user()){
      return Meteor.user().username;
    } else {
      return 'Sign In';
    }
    
  }
});

Template.navbar.onRendered( function(){
  LaptopBattle.menu.init();
});

//sidebar form handling
Template.sidebarLeft.events({
    'submit #battleUpload': function(e) {
      e.preventDefault();

      $.when( LaptopBattle.menu.toggleSidebar() ).done(function(){
      if(Meteor.user().username){
        var name = Meteor.user().username;
      } else {
        var name = Meteor.user().profile.name;
      }
      var url = $('#url').val();
      var res = url.split("=");
      Meteor.call('addVideo', Meteor.user()._id, name, res[1], $('#title').val(), function(){
        //reset the form
        $("#battleUpload")[0].reset();
      });  
    });
    },
    'click #closeUploadForm' : function(){
      LaptopBattle.menu.toggleUploadForm();
    },
    'click #closeMenu' : function(){
      LaptopBattle.menu.toggleSidebar();
    }
});

Template.myVideos.helpers({
    userVideo: function() {
      if(Accounts.admin == true){
        return Videos.find();
      } else {
        return Videos.find({id: Meteor.userId()});
      }      
    },
    user : function() {
      if(this.id == Meteor.userId()){
         return true;
      } else {
         return false;
      }
    }
});

Template.myVideos.events({
    'click .admin .trash': function(e){
     e.stopPropagation(); 
     Meteor.call('deleteVideo', this._id);     
    },
    'click #addVideo' : function(){
      LaptopBattle.menu.toggleUploadForm();
    },
    'change #updateTitle' : function(e){
      e.preventDefault();
      var value = $(e.currentTarget).val();
      Meteor.call('updateTitle', this._id, value);
      $(".videoAdminPanel").transition('drop');
    },
    'click #videoList .item ' : function(e){
      e.stopPropagation();
      var title = this.title;
      LaptopBattle.menu.adminPanel.toggle(e.currentTarget, title);    
    },
    'click .videoAdminPanel' : function(e){
      e.stopPropagation();
      $(e.currentTarget).transition('drop');
    },
    'click .videoAdminPanel input' : function(e){
      e.stopPropagation();
    }
});

Template.userAccount.events({
  'click #login' : function(e){
    e.preventDefault();
    $('.spinner-wrapper').fadeIn();
    $('#menu').sidebar('hide');
    var user = $('#username').val();
    var password = $('#password').val();
    Meteor.loginWithPassword(user, password, function(error, success){
      if(error){
        console.log(error);
      } else {
        LaptopBattle.user.onLogIn();
      }
    });
  },
  'click #signOut':function(e){
    e.preventDefault();
    $('#menu').sidebar('hide');
    $('.spinner-wrapper').fadeIn();
    Meteor.logout(function(){
      LaptopBattle.user.onLogIn();
    });
  },
  'click #createAccount':function(e){
    e.preventDefault();
    var username = $('#createUsername').val();
    var email = $('#createEmail').val();
    var password = $('#createPassword').val();
    //console.log(password);

    Accounts.createUser({ 'username': username, 'email': email, 'password': password }, function(){
      LaptopBattle.user.onLogIn();
    });
  },
  'click #create':function(e){
    e.preventDefault();
    $('#loginForm').hide();
    $('#createAccountForm').show();
  }
});

Template.userAccount.helpers({
  title: function(){
    if( Meteor.user()){
      return Meteor.user().username;
    } else {
      return 'Sign In';
    }
  }
});