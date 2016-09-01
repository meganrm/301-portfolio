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

  GetData.updateData('../scripts/rikenpublications.json', 'rikenpublications', rikenView.autocompleteAuthors);
  module.rikenView = rikenView;

})(window);
