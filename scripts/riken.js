(function(module){


  function RikenP(opts){
    for (keys in opts) {
      this[keys] = opts[keys];
    };
  };

  RikenP.rikenObjects = [];
  // RikenP.listOfRikenAuthors = [];

  RikenP.allAuthors = function(){
    return RikenP.rikenObjects.map(function(currentRikenP){
      return currentRikenP['authors'].split(', ');
    }).reduce(function(acc, cur){
      return acc.concat(cur);
    },[]).map(function(currentAuthor){
      return currentAuthor.trim().replace(/\./g,'');
    },[]).filter(function(authorElement, index, array){
      return array.indexOf(authorElement) === index;
    });
  // for (var i = 0; i < authors.length; i++) {
  //   if ((gList.indexOf(authors[i].trim().replace(/\./g,''))) === -1) {
  //     gList.push(authors[i].trim().replace(/\./g,''));
  //     // console.log(authors[i]);
  //   }
  //   else{
  //     // console.log('already in list '+ authors[i]);
  //   }
  // }

  }

  console.log(RikenP.allAuthors())

  RikenP.prototype.toHtml= function(templateid){
    var source = $(templateid).html();
    var renderTemplate = Handlebars.compile(source);
    return renderTemplate(this);
  };

  RikenP.loadIntoObjectArray = function(inputdata){
    RikenP.rikenObjects = inputdata.sort(function(firstEle, secondEle){
      return (new Date(secondEle.publishedOn)) - (new Date(firstEle.publishedOn));
    }).map(function(ele){
      return new RikenP(ele)
    });
  };



//RIKEN publications
  RikenP.fetchAll = function(url, name) {
    if (!localStorage.rikenpublications) {
      $.get(url, function(data, message, xhr) {
        // console.log('data from get', data);
        localStorage.setItem(name,JSON.stringify(data));
        console.log(xhr.getResponseHeader('eTag'));
        localStorage['eTag'+name]=xhr.getResponseHeader('eTag');
        RikenP.fetchAll(); // recursive call
      });
    }
    else{
      $.ajax({
        type: 'HEAD',
        url: url,
        success: function(data, message, xhr){
          var newTag=xhr.getResponseHeader('eTag');
          if (newTag !== localStorage['eTag'+name]){
            localStorage.rikenpublications ='';
            console.log(xhr.getResponseHeader('eTag'));
            RikenP.fetchAll(); // recursive call
          } //end of if
        var retreivedData =  JSON.parse(localStorage.getItem(name, JSON.stringify(data)))
        RikenP.loadAll(eval(retreivedData));
        } //end of success

      });  //end of ajax

        // articleView.renderIndexPage();
    };
  };

    RikenP.loadAll = function(retreivedData){
      retreivedData.sort();
      retreivedData.forEach(function(element){
        var rikenArticle= new RikenP(element);
        RikenP.rikenObjects.push(rikenArticle);
        // RikenP.rikenArticle.makeCleanArray(RikenP.listOfRikenAuthors);
      });
    };

  // $('#current-authors').append(authorList.toHtml('#author-template'));

  $('.pub-authors').autocomplete({
    minLength: 3,
    source: RikenP.allAuthors()
  });

  $rikenauthors = $('#riken-authors');
  $('#add-author-button').on('click', function(){
    $('<input>').attr('type', 'text').addClass('pub-authors').appendTo($rikenauthors).autocomplete({
      minLength: 3,
      source: RikenP.allAuthors()
    });
  });


// var authorList = new RikenP();
// RikenP.listOfRikenAuthors.sort();
// console.log(listOfRikenAuthors);
// authorList.authors = RikenP.listOfRikenAuthors;
// authorList.authors = ['author', 'author2', 'john'];


// RikenP.RikenPstopublish.forEach(function(article){
//   this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
//   this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
//   blogView.createFilter();
//   $('#blog-RikenPs').append(article.toHtml('#article-template'));
// });

RikenP.fetchAll('../scripts/rikenpublications.js', 'rikenpublications');
module.RikenP = RikenP; //QUESTION: Whats this doing again?
})(window);
