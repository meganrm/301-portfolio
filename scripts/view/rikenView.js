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

  RikenP.fetchAll('https://raw.githubusercontent.com/meganrm/301-portfolio/master/scripts/blogposts.json', 'rikenpublications', rikenView.autocompleteAuthors);
  module.rikenView = rikenView;

})(window);
