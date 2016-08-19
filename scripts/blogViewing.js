var blogView = {};

blogView.filterByCategory = function (){
  $('#category-filter').on('change', function(){
    var $blog = $('.published-Post');
    $blog.hide();
    if ($(this).val()) {
      $('#blog-posts').find('article[data-category="' + $(this).val() + '"]').fadeIn('slow');

    }
  });
};

blogView.filterByCategory();
