
//Not being used yet.
//TODO: refactor so this is called by both data models.

(function(module){

  var GetData = {};

  GetData.fetchAll = function(url, name, nextFunction) {
    if (!localStorage[name]) {
      // console.log('nothing in local storage');
      $.get(url, function(data, message, xhr) {
        localStorage.setItem(name, data);
        localStorage['eTag'+name] = xhr.getResponseHeader('eTag');
        GetData.fetchAll(url, name, nextFunction); // recursive call
      });
    }
    else{
      $.ajax({
        type: 'HEAD',
        url: url,
        success: function(data, message, xhr){
          var newTag=xhr.getResponseHeader('eTag');
          if (newTag !== localStorage['eTag' + name]){
            localStorage[name] = '';
            GetData.fetchAll(url, name, nextFunction); // recursive call
          } //end of if
          else{
            var retreivedData = JSON.parse(localStorage.getItem(name));
            GetData.loadIntoObjectArray(retreivedData);
            nextFunction();
          }
        } //end of success
      });  //end of ajax
    };
  };

  module.GetData = GetData;
})(window);
