angular.module('MobileGit')

.controller('introCtrl', ['$scope', '$state', '$ionicNavBarDelegate', 'store', '$cordovaOauth', '$http', 'githubservice',
  function ($scope, $state, $ionicNavBarDelegate, store, $cordovaOauth, $http, githubservice) {

    $ionicNavBarDelegate.title('Welcome!');

    if (store.get('access_token') && store.get('user')) {
      var user = githubservice.me();
      $scope.name = user.me.name;
      $scope.authlogin = true;
      $scope.returning = function () {
        $state.go('search');
      }
    }

    $scope.login = function () {
      $scope.$emit('loading');
      githubservice.login().then(function(res) {
        $scope.$emit('done-loading');
        $state.go('search');
      });
    };

}])