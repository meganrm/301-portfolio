'use strict';
(function(module){


  var blogView = {};
// TODO: create a method to handle new post button
  blogView.createFilter = function(){
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

  blogView.handleCreateNewButton = function(){
    $('#create-post-button').on('click', function(){
      console.log('showing form', $('#new-blog-form'));
      $('#new-blog-form').toggleClass('hide');
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
  Post.fetchAll('/../scripts/blogposts.json', 'blogs', blogView.renderBlog);

  module.blogView = blogView;

})(window);
