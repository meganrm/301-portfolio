(function(module){
  var GetData = {};

  GetData.fetchAll = function(url, name, loadDataintoArray, renderDatatoDOM) {
    $.get(url, function(data, message, xhr) {
      localStorage.setItem(name, data);
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


  // $.ajax({
  //    url:'https://api.github.com/repos/meganrm/301-portfolio/contents/scripts/test.js',
  //    method: 'PUT',
  //    data: '{"message": "trying to add a new file via api", "content": "aGVsbG8=","branch": "master"}',
  //    headers: {Authorization: 'token ' + ''},
  //    success: function(data, message, xhr){
  //       console.log(data)
  //     }
  //   })
  //
  //   $.ajax({
  //   url:'https://api.github.com/repos/meganrm/301-portfolio/contents/scripts/test.js',
  //   method: 'PUT',
  //   data: '{"message": "trying to add a new file via api", "content": "aGVsbG8=","branch": "master"}',
  //   headers: {Authorization: 'token ' + ''},
  //   success: function(data, message, xhr){
  //      console.log(data)
  //    }
  //  })

  module.GetData = GetData;
})(window);
