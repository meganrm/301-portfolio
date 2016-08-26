
(function(module){

  function Post(opts){
    for (keys in opts) {
      this[keys] = opts[keys];
    };
  };

  Post.allArticles =[];
  Post.poststopublish = [];

  Post.prototype.toHtml = function(templateid){
    var source = $(templateid).html();
    var renderTemplate = Handlebars.compile(source);
    return renderTemplate(this);
  };

//blog handeling
  Post.loadIntoObjectArray = function(inputdata){
    Post.allArticles = inputdata.sort(function(firstEle, secondEle){
      return (new Date(secondEle.publishedOn)) - (new Date(firstEle.publishedOn));
    }).map(function(ele){
      return new Post(ele);
    });
  };

  Post.fetchAll = function(url, name, nextFunction) {
    if (!localStorage[name]) {
      console.log('nothing in local storage');
      $.get(url, function(data, message, xhr) {
        // console.log('data from get', data);
        localStorage.setItem(name,JSON.stringify(data));
        console.log(xhr.getResponseHeader('eTag'));
        localStorage['eTag'+name] = xhr.getResponseHeader('eTag');
        Post.fetchAll(url, name, nextFunction); // recursive call
      });
    }
    else{
      $.ajax({
        type: 'HEAD',
        url: url,
        success: function(data, message, xhr){
          var newTag=xhr.getResponseHeader('eTag');
          if (newTag !== localStorage['eTag'+name]){
            localStorage[name] ='';
            console.log('getting new  blog data');
            Post.fetchAll(url, name, nextFunction); // recursive call
          } //end of if
          console.log('got your blog right here');
          var retreivedData =  JSON.parse(localStorage.getItem(name, data));
          console.log(retreivedData);
          Post.loadIntoObjectArray(retreivedData);
          nextFunction();
        } //end of success
      });  //end of ajax
    };
  };

  Post.poststopublish.forEach(function(article){
    this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
    this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
    blogView.createFilter();
    $('#blog-posts').append(article.toHtml('#article-template'));
  });

  module.Post = Post;
})(window);
