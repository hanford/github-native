angular.module('MobileGit')

.controller('followerCtrl', ['$scope', '$http', '$rootScope', '$state', '$ionicNavBarDelegate', '$ionicHistory',
  function ($scope, $http, $rootScope, $state, $ionicNavBarDelegate, $ionicHistory) {
    $scope.followers = $rootScope.followers;
    $scope.search = '';
    
    $scope.toFollower = function(followName) {
      $rootScope.uname = followName;
      $scope.$parent.OtherProfile(followName);
    };
}])

.controller('followingCtrl', ['$scope', '$http', '$rootScope', '$state', '$ionicNavBarDelegate', '$ionicHistory',
  function ($scope, $http, $rootScope, $state, $ionicNavBarDelegate, $ionicHistory) {
    $scope.followings = $rootScope.following;
    $scope.search = '';
    
    $scope.toFollower = function(followName) {
      $rootScope.uname = followName;
      $scope.$parent.OtherProfile(followName);
    };
}])
