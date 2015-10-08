//spinner

Meteor.Spinner.options = {
    lines: 13, // The number of lines to draw
    length: 10, // The length of each line
    width: 4, // The line thickness
    radius: 15, // The radius of the inner circle
    corners: 0.7, // Corner roundness (0..1)
    rotate: 0, // The rotation offset
    direction: 1, // 1: clockwise, -1: counterclockwise
    color: '#fff', // #rgb or #rrggbb
    speed: 1, // Rounds per second
    trail: 60, // Afterglow percentage
    shadow: true, // Whether to render a shadow
    hwaccel: false, // Whether to use hardware acceleration
    className: 'spinner', // The CSS class to assign to the spinner
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    top: 'auto', // Top position relative to parent in px
    left: 'auto' // Left position relative to parent in px
};

//when user logs in with particular service, trigger events
Accounts.onLogin(function(){
  
  Session.set("id",Meteor.user()._id);
  Session.set("name",Meteor.user().profile['name']);
  Session.set("image",Meteor.user().services.google.picture);

});

Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
});

Meteor.subscribe("videos");
Meteor.subscribe("comments");
Meteor.subscribe("likes");