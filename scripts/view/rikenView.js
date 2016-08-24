(function(module){

  rikenView = {};

  rikenView.autocompleteAuthors = function(){
    console.log('hey');
    $('.pub-authors').autocomplete({
      source: RikenP.allAuthors()
    });

    $rikenauthors = $('#riken-authors');
    $('#add-author-button').on('click', function(){
      $('<input>').attr(
        {'type'         : 'text',
        'placeholder '  : 'author'
      }).addClass('pub-authors').appendTo($rikenauthors).autocomplete({
        minLength: 2,
        source: RikenP.allAuthors()
      });
    });

  };
  RikenP.fetchAll('../scripts/rikenpublications.js', 'rikenpublications', rikenView.autocompleteAuthors); //HALP!!! 
  module.rikenView = rikenView;

})(window);
