angular.module('MobileGit')

.controller('followerCtrl', ['$scope', '$http', '$rootScope', '$state', '$ionicLoading', '$ionicNavBarDelegate', '$ionicHistory',
  function ($scope, $http, $rootScope, $state, $ionicLoading, $ionicNavBarDelegate, $ionicHistory) {
    console.log('enter follower ctrl', $rootScope.followers);
    $scope.followers = $rootScope.followers;
    $scope.search = '';
    
    $scope.toFollower = function(followName) {
      $rootScope.uname = followName;
      $scope.$parent.OtherProfile(followName);
    };
}])

.controller('followingCtrl', ['$scope', '$http', '$rootScope', '$state', '$ionicLoading', '$ionicNavBarDelegate', '$ionicHistory',
  function ($scope, $http, $rootScope, $state, $ionicLoading, $ionicNavBarDelegate, $ionicHistory) {
    $scope.followings = $rootScope.following;
    $scope.search = '';
    
    $scope.toFollower = function(followName) {
      $rootScope.uname = followName;

      $scope.$parent.OtherProfile(followName);
    };
}])
