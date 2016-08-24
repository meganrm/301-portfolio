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

  };

  RikenP.prototype.toHtml= function(templateid){
    var source = $(templateid).html();
    var renderTemplate = Handlebars.compile(source);
    return renderTemplate(this);
  };

  RikenP.loadIntoObjectArray = function(inputdata, nextFunction){
    RikenP.rikenObjects = inputdata.sort(function(firstEle, secondEle){
      return (new Date(secondEle.publishedOn)) - (new Date(firstEle.publishedOn));
    }).map(function(ele){
      return new RikenP(ele);
    });
    nextFunction();
  };

//RIKEN publications
  RikenP.fetchAll = function(url, name, nextFunction) {
    if (!localStorage.rikenpublications) {
      console.log('nothing in local storage');
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
            console.log('getting new data!');
            RikenP.fetchAll(); // recursive call
          } //end of if
          console.log('got your data right here');
          var retreivedData =  JSON.parse(localStorage.getItem(name, JSON.stringify(data)));
          RikenP.loadIntoObjectArray(eval(retreivedData), nextFunction);
        } //end of success
      });  //end of ajax
    };
  };

  module.RikenP = RikenP; //QUESTION: Whats this doing again?
})(window);
