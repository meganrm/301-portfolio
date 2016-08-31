(function(module){
  var githubRepo = {};
  githubRepo.allRepos = [];

  githubRepo.fetchRepos = function(callback) {
    $.ajax({
      url: 'https://api.github.com/users/meganrm/repos' +
            '?sort=updated',
      type: 'GET',
      headers: {'Authorization': 'token ' + githubToken},
      success: function(data) {
        githubRepo.allRepos = data;
        callback();
      }
    });
  };

  githubRepo.hasAttribute = function(myAttr) {
    return githubRepo.allRepos.filter(function(aRepo) {
      return aRepo[myAttr];
    });
  };

  module.githubRepo = githubRepo;
})(window);
