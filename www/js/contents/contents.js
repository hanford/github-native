angular.module('contents', [])

.controller('contentCtrl', function($scope, $http, $rootScope, $state, $ionicLoading, githubservice, $timeout, $ionicNavBarDelegate) {
  $scope.code = $rootScope.code;
  console.log($scope.code)
  hljs.initHighlightingOnLoad();
  $ionicNavBarDelegate.setTitle('Code');

  if (!$rootScope.code) {
    $state.go('search')
  }
})
