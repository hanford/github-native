angular.module('MobileGit')

.controller('followerCtrl', ['$scope', '$http', '$rootScope', '$state', '$ionicLoading', '$ionicNavBarDelegate', '$ionicHistory',
  function ($scope, $http, $rootScope, $state, $ionicLoading, $ionicNavBarDelegate, $ionicHistory) {
    console.log('enter follower ctrl', $rootScope.followers);
    $scope.followers = $rootScope.followers;
    $scope.search = '';
    
    $scope.toFollower = function(followNname) {
      $rootScope.uname = followNname;

      var url = 'https://api.github.com/users/' + followNname + '?access_token=' + $scope.$parent.flags.access_token;;

      $ionicLoading.show({
        template: '<i class="ion-loading-c"></i>'
      });

      $http.get(url).success(function(data, headers, status, config) {
        $ionicLoading.hide();
        $ionicHistory.clearCache();
        $state.go('profile');
      })
    };
}])

.controller('followingCtrl', ['$scope', '$http', '$rootScope', '$state', '$ionicLoading', '$ionicNavBarDelegate', '$ionicHistory',
  function ($scope, $http, $rootScope, $state, $ionicLoading, $ionicNavBarDelegate, $ionicHistory) {
    $scope.followings = $rootScope.following;
    $scope.search = '';
    
    $scope.toFollower = function(followNname) {
      $rootScope.uname = followNname;

      $ionicLoading.show({
        template: '<i class="ion-loading-c"></i>'
      });

      var url = 'https://api.github.com/users/' + followNname + '?access_token=' + $scope.$parent.flags.access_token;

      $http.get(url).success(function(data, headers, status, config) {
        $ionicLoading.hide();
        $ionicHistory.clearCache();
        $state.go('profile');
      })
    };
}])
