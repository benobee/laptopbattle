Template.timeline.helpers({
  comment: function(){
    var id = Session.get('video');
    return Comments.find({'videoId': id});
  }
});