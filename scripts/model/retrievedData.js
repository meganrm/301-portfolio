(function(module){
  var GetData = {};

  GetData.fetchAll = function(url, name, loadDataintoArray, renderDatatoDOM) {
    $.get(url, function(data, message, xhr) {
      localStorage.setItem(name, data);
      console.log('got data', data);
      localStorage['eTag' + name] = xhr.getResponseHeader('eTag');
      loadDataintoArray(name);
      renderDatatoDOM();
    });
  };

  GetData.updateData = function(url, name, loadDataintoArray, renderDatatoDOM) {
    if (!localStorage[name]) {
      GetData.fetchAll(url, name, loadDataintoArray, renderDatatoDOM);
    }
    else{
      $.ajax({
        type: 'HEAD',
        url: url,
        success: function(data, message, xhr){
          var newTag = xhr.getResponseHeader('eTag');
          if (newTag !== localStorage['eTag' + name]){
            GetData.fetchAll(url, name, loadDataintoArray, renderDatatoDOM);
          } //end of if
          else {
            loadDataintoArray(name);
            renderDatatoDOM();
          }
        } //end of success
      });  //end of ajax
    };
  };

  console.log('removed recursive');
  module.GetData = GetData;
})(window);
