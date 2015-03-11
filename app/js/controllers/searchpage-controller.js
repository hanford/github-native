angular.module('MobileGit')

.controller('searchviewCtrl', ['$scope',
  function ($scope) {
    $scope.search = "";
    $scope.repos = $scope.$parent.repos;

    $scope.gotoTree = function(repo) {
      $scope.$parent.getRepo(repo.full_name);
    };
}])
