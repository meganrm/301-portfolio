var poststopublish = [];
var rikenObjects = [];
var listOfRikenAuthors = [];

function Post(opts){
  for (keys in opts) {
    this[keys] = opts[keys];
  };
};



Post.prototype.makeCleanArray = function(gList){
  authors = this['authors'].split(',');
  for (var i = 0; i < authors.length; i++) {
    if ((gList.indexOf(authors[i].trim().replace(/\./g,''))) === -1) {
      gList.push(authors[i].trim().replace(/\./g,''));
      // console.log(authors[i]);
    }
    else{
      // console.log('already in list '+ authors[i]);
    }
  }

};

Post.prototype.toHtml= function(templateid){
  var source = $(templateid).html();
  var renderTemplate = Handlebars.compile(source);
  return renderTemplate(this);
};




//blog handeling
postsObjList.sort(function(firstEle, secondEle){
  return (new Date(secondEle.publishedOn)) - (new Date(firstEle.publishedOn));
});

postsObjList.forEach(function(element){
  poststopublish.push(new Post(element));
});



//RIKEN publications
Post.fetchAll = function() {
  if (!localStorage.rikenpublications) {
    $.get('../scripts/rikenpublications.js', function(data, message, xhr) {
      localStorage.rikenpublications = JSON.stringify(data);
      console.log(xhr.getResponseHeader('eTag'));
      localStorage.rikeneTag=xhr.getResponseHeader('eTag');
      Post.fetchAll(); // recursive call
    });
  }
  else{
    $.ajax({
      type: 'HEAD',
      url: '../scripts/rikenpublications.js',
      success: function(data, message, xhr){
        var newTag=xhr.getResponseHeader('eTag');
        if (newTag !== localStorage.rikeneTag){
          localStorage.rikenpublications ='';
          console.log(xhr.getResponseHeader('eTag'));
          Post.fetchAll(); // recursive call
        } //end of if
      } //end of success
    });  //end of ajax
      var retreivedData = localStorage.rikenpublications.replace(/["]+/g, ''));
      Post.loadAll(JSON.parse(retreivedData));
      // articleView.renderIndexPage();
    };
};



Post.loadAll = function(retreivedData){
  retreivedData.sort(function(firstEle, secondEle){
    return (secondEle.date) - (firstEle.date);
  });
  retreivedData.forEach(function(element){
    var rikenArticle= new Post(element);
    rikenObjects.push(rikenArticle);
    rikenArticle.makeCleanArray(listOfRikenAuthors);
  });
}

// $('#current-authors').append(authorList.toHtml('#author-template'));
$('.pub-authors').autocomplete({
  minLength: 3,
  source: listOfRikenAuthors
});

$rikenauthors = $('#riken-authors');
$('#add-author-button').on('click', function(){
  $('<input>').attr('type', 'text').addClass('pub-authors').appendTo($rikenauthors).autocomplete({
    minLength: 3,
    source: listOfRikenAuthors
  });
});


var authorList = new Post();
listOfRikenAuthors.sort();
console.log(listOfRikenAuthors);
authorList.authors = listOfRikenAuthors;
// authorList.authors = ['author', 'author2', 'john'];


poststopublish.forEach(function(article){
  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
  blogView.createFilter();
  $('#blog-posts').append(article.toHtml('#article-template'));
});

Post.fetchAll();
