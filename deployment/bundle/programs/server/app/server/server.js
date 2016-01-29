(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// server/server.js                                                    //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Meteor.publish("videos", function () {                                 // 1
  return Videos.find();                                                // 2
});                                                                    //
                                                                       //
Meteor.publish("comments", function () {                               // 5
  return Comments.find();                                              // 6
});                                                                    //
                                                                       //
Meteor.publish("levels", function () {                                 // 9
  return Levels.find();                                                // 10
});                                                                    //
                                                                       //
Meteor.publish("users", function () {                                  // 13
  return Meteor.users.find({}, { fields: { username: 1, votes: 1, pointCount: 1 } }, { sort: { pointCount: -1 } });
});                                                                    //
                                                                       //
Meteor.users.deny({                                                    // 17
  update: function () {                                                // 18
    return true;                                                       // 19
  }                                                                    //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=server.js.map
