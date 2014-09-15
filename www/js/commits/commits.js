angular.module('commits', [])

.controller('commitsCtrl', function($scope, $http, $rootScope, $state, $ionicLoading) {
  $scope.commits = $rootScope.commits;

  if ($scope.commits == undefined) {
    $state.go('search')
  }
})