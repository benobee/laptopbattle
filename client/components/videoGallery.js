//load all videos and populate on the page
Template.battleHome.helpers({
  videos : {
      'content' : Videos.find({}, {sort: {date: -1}}),
      'length'  : function(){

        return this.content.count();

      }
  }
});

Template.battleHome.onRendered(function (){

  Session.set('duration', null);

});


