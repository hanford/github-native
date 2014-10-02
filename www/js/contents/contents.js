angular.module('contents', [])

.controller('contentCtrl', function($scope, $http, $rootScope, $state, $ionicLoading, githubservice, $timeout, $ionicNavBarDelegate) {
  $scope.code = $rootScope.code;
  $ionicNavBarDelegate.setTitle('Code');

  console.log($scope.code)
  hljs.initHighlightingOnLoad();

  if (!$rootScope.code) {
    $state.go('search')
  }
})
