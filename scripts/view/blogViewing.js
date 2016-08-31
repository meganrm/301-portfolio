(function(module){

  var blogView = {};
// TODO: create a method to handle new post button
  blogView.createFilter = function(){
    var allCategories = new Post();
    allCategories.categoryList = Post.allCategories();
    $('#category-filter').append(allCategories.toHtml('#category-template'));
  };


  blogView.filterByCategory = function (){
    $('#category-filter').on('change', function(){
      var $blog = $('.published-Post');
      $blog.hide();
      console.log('changing categories');
      if ($(this).val()) {
        $('#blog-posts').find('article[data-category="' + $(this).val() + '"]').fadeIn('slow');
      }
    });
  };

  blogView.handleCreateNewButton = function(){
    $('#toggleform').on('click', function(){
      if ($('#create-new-post.hidden').length === 1){
        $('#create-new-post').animate({right: 0}, 500).addClass('showing').removeClass('hidden');
      }
      else{
        $('#create-new-post').animate({right: '-28%'}, 500).addClass('hidden').removeClass('showing');
      }
    });
  };

  blogView.renderBlog = function(){
    Post.allArticles.forEach(function(ele){
      $('#blog-posts').append(ele.toHtml('#article-template'));
    });
    blogView.createFilter();
    blogView.filterByCategory();
    blogView.handleCreateNewButton();
  };

  Post.fetchAll('https://api.github.com/users/meganrm/repos/301-portolio/scripts/blogposts.json', 'blogs', blogView.renderBlog);
  module.blogView = blogView;

})(window);
