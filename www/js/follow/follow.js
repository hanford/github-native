angular.module('follow', [])

.controller('followerCtrl', function($scope, $http, $rootScope, $state, $ionicLoading) {
  $scope.followers = $rootScope.followers;

  $scope.toFollower = function(fName) {
    $rootScope.uname = fName;

    var url = 'https://api.github.com/users/' + fName;

    console.log(url)

    $ionicLoading.show({
      template: '<i class="ion-loading-c"></i>'
    });

    $http.get(url)
    .success(function(data, headers, status, config) {
      $rootScope.ginfo = data;
      $ionicLoading.hide()
      $state.go('profile')
    }).error(function(data, headers, status, config) {
      console.log(data, headers, status)
    });
  }
})

.controller('followingCtrl', function($scope, $http, $rootScope, $state, $ionicLoading) {
  $scope.followings = $rootScope.following;

  $scope.toFollower = function(fName) {
    $rootScope.uname = fName;

    $ionicLoading.show({
      template: '<i class="ion-loading-c"></i>'
    });

    var url = 'https://api.github.com/users/' + fName;

    $http.get(url)
    .success(function(data, headers, status, config) {
      $rootScope.ginfo = data;
      $ionicLoading.hide()
      $state.go('profile')
    })
  }
})