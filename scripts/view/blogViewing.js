(function(module){


  var blogView = {};

  blogView.createFilter= function(){
    var $parentOptions = $('#category-filter');
    if ($parentOptions.find('option[value="' + this.category + '"]').length===0){
      $('<option>').val(this.category).text(this.category).appendTo($parentOptions);
    };
  };

  blogView.filterByCategory = function (){
    $('#category-filter').on('change', function(){
      var $blog = $('.published-Post');
      $blog.hide();
      if ($(this).val()) {
        $('#blog-posts').find('article[data-category="' + $(this).val() + '"]').fadeIn('slow');

      }
    });
  };

  blogView.renderBlog = function(){
    Post.allArticles.forEach(function(ele){
      $('#blog-posts').append(ele.toHtml('#article-template'));
    })
    blogView.createFilter;
    blogView.filterByCategory;
  }
  Post.fetchAll('/../scripts/blogposts.json', 'blogs', blogView.renderBlog);

  module.blogView = blogView;

})(window);
