
(function(module){

  var GetData = {};

  GetData.fetchAll = function(url, name, nextFunction) {
    if (!localStorage[name]) {
      console.log('nothing in local storage');
      $.get(url, function(data, message, xhr) {
        // console.log('data from get', data);
        localStorage.setItem(name,JSON.stringify(data));
        console.log(xhr.getResponseHeader('eTag'));
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
            console.log(newTag, localStorage['eTag' + name]);
            console.log(name, 'getting new  blog data');
            GetData.fetchAll(url, name, nextFunction); // recursive call
          } //end of if
          else{
            console.log('eTags the same', newTag, localStorage['eTag' + name]);
            console.log('got your blog right here');
            var retreivedData =    JSON.parse(localStorage.getItem(name));
            console.log(retreivedData);
            GetData.loadIntoObjectArray(retreivedData);
            nextFunction();
          }
        } //end of success
      });  //end of ajax
    };
  };

  module.GetData = GetData;
})(window);
