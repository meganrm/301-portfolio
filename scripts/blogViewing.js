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


blogView.filterByCategory();
