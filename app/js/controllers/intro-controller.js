angular.module('MobileGit')

.controller('introCtrl', ['$scope', '$rootScope', '$state', '$ionicNavBarDelegate', 'store', '$cordovaOauth', '$http', '$timeout', '$window',
  function ($scope, $rootScope, $state, $ionicNavBarDelegate, store, $cordovaOauth, $http, $timeout, $window) {

  $scope.$emit('infoCtrlLoaded');

  $scope.hideNavBttns = true;

  $timeout(function(){
    $ionicNavBarDelegate.title('Welcome!');
    $ionicNavBarDelegate.showBackButton(false);
  }, 500);

  if (store.get('access_token') && store.get('user')) {
    $scope.$parent.flags.user = store.get('user');
    $scope.$parent.flags.access_token = store.get('access_token');

    $scope.name = $scope.$parent.flags.user.name

    $scope.authenticated = true;
    $scope.authlogin = true;
    $scope.showBck = true;

    $scope.$emit('showNavBttns');
    $state.go('search');
  }

  $scope.authMe = function () {
    $cordovaOauth.github('5ceeb35418106a4caf27', '737851deaa4c8bf6148c1776958c905f05e80a3d', ['user', 'repo']).then(function (result) {
      $scope.$parent.flags.access_token = result.access_token;
      store.set('access_token', $scope.$parent.flags.access_token)

      var userURL = 'https://api.github.com/user?access_token=' + result.access_token;

      $http.get(userURL).success(function (data) {
          $scope.$parent.flags.user = {
            login: data.login,
            name: data.name,
            id: data.id,
            followers: data.followers,
            following: data.following,
            email: data.email,
            public_repos: data.public_repos,
            PublicGists: data.public_gists,
            company: data.company,
            created: data.created_at,
            avatar: data.avatar_url,
            blog: data.blog || "",
            location: data.location || "",
            repo: data.repos_url
          }

          store.set('user', $scope.$parent.flags.user)
          
          $state.go('search');

      }).error(function (err) {
        console.log(err)
      })
    }, function (error) {
      console.log('Error! ' + error);
    })
  };

}])
