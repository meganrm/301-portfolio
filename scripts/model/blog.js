
(function(module){

  function Post(opts){
    for (var keys in opts) {
      this[keys] = opts[keys];
    };
  };

  Post.allArticles =[];
  Post.poststopublish = [];

  Post.allCategories = function(){
    return Post.allArticles.map(function(ele){
      return ele['category'];
    }).filter(function(element, index, array){
      return array.indexOf(element) === index;
    });
  };


  Post.prototype.toHtml = function(templateid){
    var source = $(templateid).html();
    var renderTemplate = Handlebars.compile(source);
    return renderTemplate(this);
  };

//blog handeling
  Post.loadIntoObjectArray = function(name){
    var retreivedData =  JSON.parse(localStorage.getItem(name));
    Post.allArticles = retreivedData.sort(function(firstEle, secondEle){
      return (new Date(secondEle.publishedOn)) - (new Date(firstEle.publishedOn));
    }).map(function(ele){
      var post = new Post(ele);
      post.daysAgo = parseInt((new Date() - new Date(post.publishedOn))/60/60/24/1000);
      post.publishStatus = post.publishedOn ? 'published ' + post.daysAgo + ' days ago' : '(draft)';
      return post;
    });
  };

  module.Post = Post;
})(window);
