angular.module('contents', [])

.controller('contentCtrl', function($scope, $http, $rootScope, $state, $ionicLoading, githubservice, $timeout) {
  $scope.code = $rootScope.code;
  hljs.initHighlightingOnLoad();

  if (!$rootScope.code) {
    $state.go('search')
  }
})