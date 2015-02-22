angular.module('follow', [])

.controller('followerCtrl', function($scope, $http, $rootScope, $state, $ionicLoading, $ionicNavBarDelegate, $ionicHistory) {
  console.log('enter follower ctrl', $rootScope.followers);
  $scope.followers = $rootScope.followers;
  $scope.search = '';
  
  $scope.toFollower = function(fName) {
    $rootScope.uname = fName;

    var url = 'https://api.github.com/users/' + fName + '?access_token=' + $rootScope.access_token;;

    $ionicLoading.show({
      template: '<i class="ion-loading-c"></i>'
    });

    $http.get(url).success(function(data, headers, status, config) {
      $rootScope.ginfo = data;
      $ionicLoading.hide();
      $ionicHistory.clearCache();
      console.log('leave  to ', data);
      $state.go('profile');
    }).error(function(data, headers, status, config) {
      console.log(data, headers, status)
    });
  };
})

.controller('followingCtrl', function($scope, $http, $rootScope, $state, $ionicLoading, $ionicNavBarDelegate, $ionicHistory) {
  $scope.followings = $rootScope.following;
  $scope.search = '';
  
  $scope.toFollower = function(fName) {
    $rootScope.uname = fName;

    $ionicLoading.show({
      template: '<i class="ion-loading-c"></i>'
    });

    var url = 'https://api.github.com/users/' + fName + '?access_token=' + $rootScope.access_token;

    $http.get(url).success(function(data, headers, status, config) {
      $rootScope.ginfo = data;
      $ionicLoading.hide();
      $ionicHistory.clearCache();
      console.log('leave  to ', data);
      $state.go('profile')
    })
  };
})
