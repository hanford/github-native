angular.module('commits', [])

.controller('commitsCtrl', function($scope, $rootScope, $state, $ionicNavBarDelegate) {
  $scope.commits = $rootScope.commits;
  $ionicNavBarDelegate.title('Commits')

  if ($scope.commits == undefined) {
    $state.go('search')
  }
})