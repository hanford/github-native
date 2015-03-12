angular.module('MobileGit')

.controller('introCtrl', ['$scope', '$state', '$ionicNavBarDelegate', 'store', '$cordovaOauth', '$http', 'githubservice', 'userservice',
  function ($scope, $state, $ionicNavBarDelegate, store, $cordovaOauth, $http, githubservice, userservice) {

    $ionicNavBarDelegate.title('Welcome!');

    if (store.get('access_token') && store.get('user')) {
      userservice.me().then(function(response) {
        $scope.name = response.me.name;
        $scope.authlogin = true;
        $scope.returning = function () {
          $state.go('search');
        }
      });
    }

    $scope.login = function () {
      $scope.$emit('loading');
      userservice.login().then(function(res) {
        console.log(res);
        $scope.$emit('done-loading');
        $state.go('search');
      });
    };

}])