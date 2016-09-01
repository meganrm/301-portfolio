(function(module){

  rikenView = {};

  rikenView.autocompleteAuthors = function(){
    $('.pub-authors').autocomplete({
      source: RikenP.allAuthors()
    });

    $rikenauthors = $('#riken-authors');
    $('#add-author-button').on('click', function(){
      $('<input>').attr(
        {'type'         : 'text',
        'placeholder'  : 'author'
      }).addClass('pub-authors').autocomplete({
        source: RikenP.allAuthors()
      }).appendTo($rikenauthors);
    });

  };

  GetData.updateData('https://raw.githubusercontent.com/meganrm/301-portfolio/master/scripts/rikenpublications.json', 'rikenpublications', RikenP.loadIntoObjectArray, rikenView.autocompleteAuthors);
  module.rikenView = rikenView;

})(window);
