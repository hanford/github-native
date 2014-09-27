angular.module('commits', [])

.controller('commitsCtrl', function($scope, $http, $rootScope, $state, $ionicLoading, $ionicNavBarDelegate) {
  $scope.commits = $rootScope.commits;
  $ionicNavBarDelegate.setTitle('Commits')

  if ($scope.commits == undefined) {
    $state.go('search')
  }
})
