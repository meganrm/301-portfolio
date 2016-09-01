(function(module){
  var githubRepo = {};
  githubRepo.allRepos = [];

  githubRepo.fetchRepos = function(callback) {
    $.get('/github/users/meganrm/repos' +
            '?sort=updated')
            .done(function(data){
              githubRepo.allRepos = data;
              callback();
            });
  };


  githubRepo.hasAttribute = function(myAttr) {
    return githubRepo.allRepos.filter(function(aRepo) {
      return aRepo[myAttr];
    });
  };

  module.githubRepo = githubRepo;
})(window);
