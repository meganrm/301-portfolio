(function(module) {
  var githubView = {};

  var repoCompiler = function(aRepo){
    var templateRender = Handlebars.compile($('#repo-template').text());
    return templateRender(aRepo);
  };

  githubView.renderRepos = function() {
    $('#projects ul').append(githubRepo.hasAttribute('name')
      .map(repoCompiler)
    );
  };

  githubRepo.fetchRepos(githubView.renderRepos);
})(window);
