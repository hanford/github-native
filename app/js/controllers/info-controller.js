angular.module('MobileGit')

.controller('infoCtrl', ['$scope', '$http', '$rootScope', '$state', 'githubservice', '$ionicNavBarDelegate', 'store', '$cordovaOauth',
  function ($scope, $http, $rootScope, $state, githubservice, $ionicNavBarDelegate, store, $cordovaOauth) {

    $ionicNavBarDelegate.showBackButton(true);

    $scope.personalwebsite = function () {
      var ref = window.open('http://jackhanford.com', '_system');
    };

    $scope.mit = function () {
      var ref = window.open('http://opensource.org/licenses/MIT', '_system');
    };

    $http.get('https://status.github.com/api/status.json').then(function (response) {
      $scope.api = response.data.status;
    });

    $scope.alias = $rootScope.authlogin;

    if ($rootScope.access_token) {
      $scope.authenticated = true;
    } else {
      $scope.authenticated = false;
    }

    $scope.removeAuth = function (OAuth) {
      mixpanel.track('Removed Authentication');
      $rootScope.access_token = '';
      store.remove('access_token');
      store.remove('name');
      store.remove('login');
      console.log('removed storage');
      $scope.authenticated = false;
    };

    $scope.authMe = function () {
      $cordovaOauth.github('5ceeb35418106a4caf27', '737851deaa4c8bf6148c1776958c905f05e80a3d', ['user', 'repo']).then(function (result) {
        $rootScope.access_token = result.access_token;
        store.set('access_token', result.access_token);
        var userURL = 'https://api.github.com/user?access_token=' + result.access_token;
        console.log(userURL)
        $http.get(userURL).success(function (data) {

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
        }).error(function (data, status) {
          console.log(data)

        })
      }, function (error) {
        console.log(error);
      })
    };

    $scope.privacy = function () {
      var ref = window.open('http://jackhanford.com/MobileGit/privacy-policy/', '_blank', 'location=no');
    };

    githubservice.getRate().then(function (response) {
      $scope.ratelimit = response.rate.remaining;
    });

}])
