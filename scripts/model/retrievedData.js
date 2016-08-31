
//Not being used yet.
//TODO: refactor so this is called by both data models.

(function(module){

  var GetData = {};

  GetData.fetchAll = function(url, name, firstcallBack, secondcallback) {
    if (!localStorage[name]) {
      $.get(url, function(data, message, xhr) {
        localStorage.setItem(name, data);
        console.log('got data', data);
        localStorage['eTag' + name] = xhr.getResponseHeader('eTag');
        RikenP.readData(name, nextFunction); // recursive call
      });
    }
    else{
      $.ajax({
        type: 'HEAD',
        url: url,
        success: function(data, message, xhr){
          var newTag = xhr.getResponseHeader('eTag');
          if (newTag !== localStorage['eTag' + name]){
            localStorage.rikenpublications ='';
            RikenP.readData(name, nextFunction); // recursive call
          } //end of if
        } //end of success
      });  //end of ajax
    };
  };

  console.log('removed recursive');
  module.GetData = GetData;
})(window);
