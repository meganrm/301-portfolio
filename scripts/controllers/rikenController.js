(function(module){
  var rikenApp = {};
  rikenApp.reveal = function(){
    $('.tab-content').fadeOut();
    $('#riken-form').fadeIn();
  };

  module.rikenApp = rikenApp;
})(window);
