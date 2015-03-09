angular.module('MobileGit')

.controller('searchviewCtrl', ['$scope', '$rootScope', '$state', '$ionicLoading', 'githubservice',
  function ($scope, $rootScope, $state, $ionicLoading, githubservice) {
    $scope.search = "";
    $scope.repos = $scope.$parent.repos;
    console.log($scope.repos);

    $scope.gotoTree = function(repo) {
      $scope.$parent.getRepo(repo.full_name);
    };

}])
