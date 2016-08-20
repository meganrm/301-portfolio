var poststopublish = [];

function Post(opts){
  for (keys in opts) {
    this[keys] = opts[keys];
  };
};

var authorList = new Post();
authorList.authors = ['author', 'author2'];


Post.prototype.toHtml= function(templateid){
  var source = $(templateid).html();
  var renderTemplate = Handlebars.compile(source);
  return renderTemplate(this);
};

Post.prototype.createFilter= function(){
  var $parentOptions = $('#category-filter');
  if ($parentOptions.find('option[value="' + this.category + '"]').length===0){
    $('<option>').val(this.category).text(this.category).appendTo($parentOptions);
  };
};


postsObjList.sort(function(firstEle, secondEle){
  return (new Date(secondEle.publishedOn)) - (new Date(firstEle.publishedOn));
});

postsObjList.forEach(function(element){
  poststopublish.push(new Post(element));
});

$('#current-authors').append(authorList.toHtml('#author-template'));


poststopublish.forEach(function(article){
  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
  article.createFilter();
  $('#blog-posts').append(article.toHtml('#article-template'));
});
