angular.module('follow', [])

.controller('followerCtrl', function($scope, $http, $rootScope, $state, $ionicLoading, $ionicNavBarDelegate) {
  $scope.followers = $rootScope.followers;

  $ionicNavBarDelegate.title('Followers');

  $scope.toFollower = function(fName) {
    $rootScope.uname = fName;

    var url = 'https://api.github.com/users/' + fName;

    console.log(url)

    $ionicLoading.show({
      template: '<i class="ion-loading-c"></i>'
    });

    $http.get(url).success(function(data, headers, status, config) {
      $rootScope.ginfo = data;
      $ionicLoading.hide()
      $state.go('profile')
    }).error(function(data, headers, status, config) {
      console.log(data, headers, status)
    });
  }
})

.controller('followingCtrl', function($scope, $http, $rootScope, $state, $ionicLoading, $ionicNavBarDelegate) {
  $scope.followings = $rootScope.following;

  $ionicNavBarDelegate.title('Following');

  $scope.toFollower = function(fName) {
    $rootScope.uname = fName;

    $ionicLoading.show({
      template: '<i class="ion-loading-c"></i>'
    });

    var url = 'https://api.github.com/users/' + fName + $rootScope.access_token;

    $http.get(url).success(function(data, headers, status, config) {
      $rootScope.ginfo = data;
      $ionicLoading.hide()
      $state.go('profile')
    })
  }
})
