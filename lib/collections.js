//mongoDB collections
Comments = new Mongo.Collection('comments');
Videos = new Mongo.Collection('videos');
Levels = new Mongo.Collection('levels');

//create array in the videos collection
Videos.votes = [];

//add point array to users
Meteor.users.votes = [];
Meteor.users.pointCount = {};