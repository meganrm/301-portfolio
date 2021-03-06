(function(module){

  function RikenP(opts){
    for (var keys in opts) {
      this[keys] = opts[keys];
    };
  };

  RikenP.rikenObjects = [];

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

  RikenP.prototype.toHtml = function(templateid){
    var source = $(templateid).html();
    var renderTemplate = Handlebars.compile(source);
    return renderTemplate(this);
  };

  RikenP.createTable = function() {
    webDB.execute(
        'CREATE TABLE IF NOT EXISTS rikenPublications (' +
          'id INTEGER PRIMARY KEY, ' +
          'title VARCHAR(255) NOT NULL, ' +
          'authors VARCHAR(255) NOT NULL, ' +
          'date VARCHAR(20), ' +
          'PMID INTEGER, ' +
          'PMCID VARCHAR(255));',
        function() {
          console.log('Successfully set up the articles table.');
        }
      );
  };

  RikenP.loadIntoObjectArray = function(name){
    var retreivedData =  JSON.parse(localStorage.getItem(name));
    RikenP.rikenObjects = retreivedData.sort(function(firstEle, secondEle){
      return (new Date(secondEle.publishedOn)) - (new Date(firstEle.publishedOn));
    }).map(function(ele){
      return new RikenP(ele);
    });
  };


  RikenP.createTable();
  module.RikenP = RikenP;
})(window);
