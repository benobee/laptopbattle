if (Meteor.isServer) {

  Meteor.startup(function () {
  	//run code on startup

  	//Meteor.absoluteUrl('http://laptopbattle.meteor.com', 'secure');
  	
  });


// search for videos
YoutubeApi.authenticate({
    type: 'key',
    key: 'AIzaSyDGdvn1D_JHsk6LAd2kHNjlxVCuaVtW814'
});

Meteor.methods({
    searchVideo: function(search) {
        YoutubeApi.search.list({
            part: "id",
            type: "video",
            maxResults: 5,
            q: search,
        }, function (err, data) {
            console.log(err, data);
        });
    }
});

}

// Snapfox.allow({
//   insert: function(userId, doc){
//     return userId;
//   },
//   remove: function(userId, doc){
//     return userId;
//   },
// });
