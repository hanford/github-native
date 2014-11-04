angular.module('commits', [])

.controller('commitsCtrl', function($scope, $rootScope, $state, $ionicNavBarDelegate) {
  $scope.commits = $rootScope.commits;
  $ionicNavBarDelegate.setTitle('Commits')

  if ($scope.commits == undefined) {
    $state.go('search')
  }
})