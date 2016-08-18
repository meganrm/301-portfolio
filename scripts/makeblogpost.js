var poststopublish = [];

function Post(opts){
  this.title = opts.title;
  this.category = opts.category;
  this.publishedOn = opts.publishedOn;
  this.content = opts.content;
  this.image = opts.image;

}

Post.prototype.toHtml= function(){
  var $newblogPost = $('article.template').clone();
  $newblogPost.removeClass('template');
  $newblogPost.addClass('published-Post');

  $newblogPost.attr('data-category', this.category);
  $newblogPost.find('header h2').text(this.title);
  $newblogPost.find('.content').html(this.content);
  $newblogPost.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');

  $newblogPost.find('.date time').attr({
    'title': this.publishedOn,
    'datatime' : this.publishedOn
  });


  var $parentOptions = $('#category-filter');
  if ($parentOptions.find('option[value="' + this.category + '"]').length===0){
    $('<option>').val(this.category).text(this.category).appendTo($parentOptions);
  };
  console.log('new blog' + $newblogPost);
  return $newblogPost;
};



postsObjList.sort(function(firstEle, secondEle){
  return (new Date(secondEle.publishedOn)) - (new Date(firstEle.publishedOn));
});

postsObjList.forEach(function(element){
  poststopublish.push(new Post(element));
});

poststopublish.forEach(function(article){
  console.log(article.toHtml());
  $('#blog-posts').append(article.toHtml());
});
