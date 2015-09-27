//initialize the sidebar
 Template.layout.events({
   'click #battleComment': function(e){
    $('.ui.sidebar.right.comment')
    .sidebar('setting', 'transition', 'overlay')
    .sidebar('toggle');
    }
 });
