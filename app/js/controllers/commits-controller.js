angular.module('commits', [])

.controller('commitsCtrl', ['$scope', '$rootScope', '$state', '$ionicNavBarDelegate',
  function ($scope, $rootScope, $state, $ionicNavBarDelegate) {
    $scope.commits = $rootScope.commits;
    $ionicNavBarDelegate.title('Commits')

    if ($scope.commits == undefined) {
      $state.go('search')
    }
}])