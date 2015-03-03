angular.module('MobileGit')

.controller('introCtrl', ['$scope', '$rootScope', '$state', '$ionicNavBarDelegate', 'store', '$cordovaOauth', '$http', '$timeout', '$window',
  function ($scope, $rootScope, $state, $ionicNavBarDelegate, store, $cordovaOauth, $http, $timeout, $window) {

    $ionicNavBarDelegate.title('Welcome!');

    if (store.get('access_token') && store.get('user')) {
      $scope.$parent.flags.user = store.get('user');
      $scope.$parent.flags.access_token = store.get('access_token');

      $scope.name = $scope.$parent.flags.user.name

      $scope.authenticated = true;
      $scope.authlogin = true;
      $scope.$parent.flags.showNavBttns = true;
      $state.go('search');
    }

    $scope.authMe = function () {
      $cordovaOauth.github('5ceeb35418106a4caf27', '737851deaa4c8bf6148c1776958c905f05e80a3d', ['user', 'repo']).then(function (result) {
        $scope.$parent.flags.access_token = result.access_token;
        store.set('access_token', $scope.$parent.flags.access_token)

        console.log($scope.$parent.flags.access_token);

        var userURL = 'https://api.github.com/user?access_token=' + result.access_token;

        $http.get(userURL).success(function (data) {
          console.log(data);
          $scope.$parent.flags.user = data;

          store.set('user', $scope.$parent.flags.user)
          $scope.$parent.flags.showNavBttns = true;          
          $state.go('search');

        }).error(function (err) {
          console.log(err)
        })
      }, function (error) {
        console.log('Error! ' + error);
      })
};

}])
