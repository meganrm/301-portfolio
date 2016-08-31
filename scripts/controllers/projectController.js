(function(module){
  var mainpageController = {};
  mainpageController.reveal = function(){
    $('.tab-content').fadeOut();
    $('#projects').fadeIn();
  };

  module.mainpageController = mainpageController;
})(window);
