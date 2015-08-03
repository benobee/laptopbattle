Template.home.helpers({
    videos: function() {    
      return Videos.find();
    },
    comment: function(){
      return Comments.find({'videoId': this._id });
    },
    date: function(){
      return moment(this.date).fromNow();
    }
});

Template.home.events({
  'click #addComment': function(e){
    e.preventDefault();

    Comments.insert({

      'videoId' : this._id,
      'name': Meteor.user().profile.name,
      'post': $('#comment'+this._id).val(),
      'date': new Date()

    });

    $("#form"+this._id)[0].reset();
  }
});