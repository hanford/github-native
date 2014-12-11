angular.module('intro', [])

.controller('introCtrl', function ($scope, $rootScope, $state, $ionicNavBarDelegate, store, $cordovaOauth, $http) {

  if ($rootScope.access_token) {
    $state.go('search')
  }

  $ionicNavBarDelegate.setTitle('Welcome!');

  if (store.get('access_token')) {
    // $scope.name = store.get('name');

    $scope.previousUser = function () {
      mixpanel.track('Returning User');
      $rootScope.access_token = store.get('access_token');
      $rootScope.authname = store.get('name');
      $rootScope.authlogin = store.get('login');
      $scope.authenticated = true;
      $scope.authlogin = true;
      $state.go('search')
    }
  }

  $scope.authMe = function () {
    $cordovaOauth.github('5ceeb35418106a4caf27', '737851deaa4c8bf6148c1776958c905f05e80a3d', ['user', 'repo']).then(function (result) {
      $rootScope.access_token = result.access_token;
      store.set('access_token', result.access_token);
      var userURL = 'https://api.github.com/user?access_token=' + result.access_token;
      console.log(userURL)
      $http.get(userURL).success(function(data) {

        if (data.name) {
          $rootScope.authname = data.name;
        } else {
          $rootScope.authname = data.login;
        }

        $rootScope.authlogin = data.login;

        store.set('name', $rootScope.authname);
        store.set('login', $rootScope.authlogin);

        $scope.authlogin = true;

        $state.go('search');
      }).error(function(data, status){
        console.log(data)

      })
    }, function (error) {
      console.log(error);
    })
  }

  $scope.authme = function () {
    mixpanel.track('New Authorization');
    OAuth.popup('github')
      .done(function (result) {
        $rootScope.access_token = result.access_token;
        store.set('access_token', result.access_token);
        result.me().done(function (user_info) {
          if (user_info.name) {
            $rootScope.authname = user_info.name;
            $rootScope.authlogin = user_info.alias;

            store.set('name', $rootScope.authname);
            store.set('login', $rootScope.authlogin);

            $state.go('search');

          } else {

            store.set('name', user_info.alias);
            store.set('login', user_info.alias);

            $rootScope.authname = user_info.alias;
            $rootScope.authlogin = user_info.alias;

          }
        }).fail(function (error) {
          // alert(error)
        })
      }).fail(function (error) {
        // alert(error)
      })
  }
})
