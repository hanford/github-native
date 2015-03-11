angular.module('MobileGit')

.controller('introCtrl', ['$scope', '$state', '$ionicNavBarDelegate', 'store', '$cordovaOauth', '$http',
  function ($scope, $state, $ionicNavBarDelegate, store, $cordovaOauth, $http) {

    $ionicNavBarDelegate.title('Welcome!');

    if (store.get('access_token') && store.get('user')) {
      $scope.$parent.flags.user = store.get('user');
      $scope.$parent.flags.access_token = store.get('access_token');
      $scope.name = $scope.$parent.flags.user.name
      $scope.authlogin = true;
      $scope.$parent.flags.showNavBttns = true;
      $scope.returning = function () {
        $state.go('search');
      }
    }

    $scope.login = function () {
      $cordovaOauth.github('5ceeb35418106a4caf27', '737851deaa4c8bf6148c1776958c905f05e80a3d', ['user', 'repo']).then(function (result) {
      $scope.$emit('loading');

        $scope.$parent.flags.access_token = result.access_token;
        store.set('access_token', $scope.$parent.flags.access_token)

        console.log($scope.$parent.flags.access_token);

        var userURL = 'https://api.github.com/user?access_token=' + result.access_token;

        $http.get(userURL).success(function (data) {
          $scope.$emit('done-loading');

          console.log(data);
          $scope.$parent.flags.user = data;

          store.set('user', $scope.$parent.flags.user)
          $scope.$parent.flags.showNavBttns = true;          
          $state.go('search');

        }).error(function (err) {
          $ionicLoading.hide();
          console.log(err);
        })
      }, function (err) {
        console.log(err);
      })
    };

}])