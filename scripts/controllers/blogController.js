(function(module){
  var blogController = {};

  blogController.reveal = function(){
    $('.tab-content').fadeOut();
    $('#blog-posts').fadeIn();
  };

  module.blogController = blogController;
})(window);
