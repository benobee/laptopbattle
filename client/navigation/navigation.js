Template.game.helpers({
  'points':function(){
    if(Meteor.user().pointCount){
      return Meteor.user().pointCount;
    } else {
      return '0';
    }    
  },
  rank: function(){
    var users = Meteor.users.find({}, {sort: {pointCount: -1}}).fetch();
    var id = Meteor.userId();

    for(var i in users){
      if(users[i]._id == id && users[i].pointCount > 0){
        var index = parseInt(i);
        var rank = index + 1;

        return rank;
      }      
    }
  }
});

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

Template.navbar.onRendered(function(){
  LaptopBattle.menu.init();
});

Template.profileHeader.helpers({
  title: function(){
    if( Meteor.user()){
      return Meteor.user().username;
    } else {
      return 'Sign In';
    }
  }
});

Template.sidebar.events({
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
    }
});

Template.myVideos.onRendered(function(){
  $('.dark.button').popup();
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
    'click #videoList .item ' : function(e){

        $('.spinner-wrapper').removeClass('hide');
        Session.set("url" , this.url);
        Session.set("video" , this._id);
        Session.set("videoUserId" , this.id);
        Router.go('/battle?id='+ this._id + '&url=' + this.url);
  
    }
});

Template.sidebarStart.events({
  'click #login' : function(e){
    e.preventDefault();
    $.when( $('.spinner-wrapper').removeClass('hide') ).then(function(){
    var user = $('#email').val();
    var password = $('#password').val();

    Meteor.loginWithPassword(user, password, function(error, success){
      if(error){
        console.log(error);
        $('.spinner-wrapper').fadeOut();
      } else {
         $.when( LaptopBattle.menu.hideSidebar() ).done(function(){           
            Router.go('/battles');
         });
      }
    });
    });
    $('#menuStart').sidebar('hide');
  },
  'click #create':function(e){
    e.preventDefault();
    $('#loginForm').hide();
    $('.hiddenForm').show();
  }
});

Template.userAccount.events({
  'click #signOut':function(e){
    e.preventDefault();

    $('#menuStart').sidebar('hide');
    $('.spinner-wrapper').fadeIn();
    Meteor.logout();
  }
});

Template.createAccount.events({
  'click #createAccount':function(e){
    e.preventDefault();
    var username = $('#createUsername').val();
    var email = $('#createEmail').val();
    var password = $('#createPassword').val();
    //console.log(password);

    Accounts.createUser({ 'username': username, 'email': email, 'password': password }, function(){
      LaptopBattle.user.onLogIn();
    });
  }
});

Template.profileHeader.events({
  'click #editProfile':function(e){
    $('#profileContent').html('');
    var parentNode = document.getElementById('profileContent');
    Blaze.render(Template.profileSettings, parentNode);
  },
  'click #profileHeader .profile':function(){
    $('#profileContent').html('');
    var parentNode = document.getElementById('profileContent');
    Blaze.render(Template.dashboard, parentNode);
  }
});

Template.profileHeader.onRendered(function(){
  $('.ui.pointing.dropdown').dropdown({
    on: 'hover'
  });
  $('#profileContent').html('');
  var parentNode = document.getElementById('profileContent');
  Blaze.render(Template.dashboard, parentNode);
});

Template.profileSettings.events({
  'click #updateSettings':function(e){
    e.preventDefault();
    var newUsername = $('#newUsername').val();
    Meteor.call('changeUsername', newUsername, function(){
      $('#profileSettings').html('');
     var parentNode = document.getElementById('profileContent');
     Blaze.render(Template.dashboard, parentNode);
    });    
  }
});

Template.profileSettings.onRendered(function(){
  $('#newUsername').val(Meteor.user().username);
});