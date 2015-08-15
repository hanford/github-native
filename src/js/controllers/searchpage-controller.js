angular.module('MobileGit')

.controller('searchviewCtrl', ['$scope', 'githubservice', '$stateParams', '$state',
  function ($scope, githubservice, $stateParams, $state) {
    $scope.search = "";

    githubservice.getProjects($stateParams.query).then(function(response) {
      $scope.$emit('done-loading');
      $scope.repos = response.data.items;
    })

    $scope.gotoTree = function(repo) {
      $scope.$emit('loading');
      $state.go('repo', {name: repo.full_name});
    };

}])
