angular.module('intro', [])

.controller('introCtrl', function ($scope, $rootScope, $state, $ionicNavBarDelegate, store, $cordovaOauth, $http, $timeout) {

  if ($rootScope.access_token) {
    $state.go('search');
  }

  $timeout(function(){
    $ionicNavBarDelegate.title('Welcome!');
    $ionicNavBarDelegate.showBackButton(false);
  }, 500);

  if (store.get('access_token') && store.get('name')) {
    $scope.name = store.get('name');
    $scope.previousUser = function () {
      mixpanel.track('Returning User');
      $rootScope.access_token = store.get('access_token');
      $rootScope.authname = store.get('name');
      $rootScope.authlogin = store.get('login');
      $scope.authenticated = true;
      $scope.authlogin = true;
      $scope.showBck = true;
      $state.go('search')
    }
  }

  $scope.authMe = function () {
    $cordovaOauth.github('5ceeb35418106a4caf27', '737851deaa4c8bf6148c1776958c905f05e80a3d', ['user', 'repo']).then(function (result) {
      $rootScope.access_token = result.access_token;
      store.set('access_token', result.access_token);
      var userURL = 'https://api.github.com/user?access_token=' + result.access_token;
      console.log(userURL);

      $http.get(userURL).success(function (data) {
        if (data.name) {
          $rootScope.authname = data.name;
          store.set('name', $rootScope.authname);
        } else {
          $rootScope.authname = data.login;
        }
        $rootScope.authlogin = data.login;
        store.set('login', $rootScope.authlogin);
        $scope.authlogin = true;

        $state.go('search');

      }).error(function (err) {
        console.log(err)
      })
    }, function (error) {
      console.log('Error! ' + error);
    })
  };

})
