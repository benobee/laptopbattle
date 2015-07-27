Comments = new Mongo.Collection('comments');
Videos = new Mongo.Collection('videos');
Level = new Mongo.Collection('level');

Router.route('/', function () {
  this.render('home');
});

Router.route('/home', function () {
  this.render('home');
});

Router.route('/profile', function () {
  this.render('profile');
});

