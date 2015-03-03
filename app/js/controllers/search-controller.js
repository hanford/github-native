angular.module('MobileGit')

.controller('searchCtrl', ['$scope', '$rootScope', '$state', '$ionicLoading', 'githubservice', '$timeout', '$ionicNavBarDelegate', '$http', '$ionicHistory',
  function ($scope, $rootScope, $state, $ionicLoading, githubservice, $timeout, $ionicNavBarDelegate, $http, $ionicHistory) {

    $ionicHistory.clearHistory();
    $ionicNavBarDelegate.showBackButton(false);

    $scope.myAccount = function() {
      $scope.$parent.flags.FromSearch = false;
      $ionicHistory.clearCache();
      $state.go('profile');
    }

    $scope.searchProject = function(query) {
      $scope.$parent.FindProject(query);
    };

    $scope.searchUser = function(query) {
      $scope.$parent.OtherProfile(query);
    };

    $scope.info = function() {
      $state.go('info')
    };

}])
