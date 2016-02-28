Template.join.events({
  'click #rules':function(){
    $('.ui.long.modal').modal('show');
  }
});

Template.home.onRendered(function(){

    Session.set("url", 'MV_cCzI17eE');
    Session.set("video", 'TRCqnzKsGvwb8TsLD'); 

  $('.spinner-wrapper').addClass('hide');	

});
