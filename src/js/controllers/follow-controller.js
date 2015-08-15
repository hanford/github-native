angular.module('MobileGit')

.controller('followerCtrl', ['$scope', '$state', 'githubservice', '$stateParams',
  function ($scope, $state, githubservice, $stateParams) {
    $scope.search = '';
    var user = $stateParams.login;

    githubservice.getFollowers(user).then(function(response) {
      $scope.$emit('done-loading');
      $scope.followers = response;
    })
    
    $scope.toFollower = function(followName) {
      $state.go('profile', {login: followName})
    };
}])

.controller('followingCtrl', ['$scope', '$state', '$ionicNavBarDelegate', '$ionicHistory', '$stateParams', 'githubservice',
  function ($scope, $state, $ionicNavBarDelegate, $ionicHistory, $stateParams, githubservice) {
    $scope.search = '';
    var user = $stateParams.login;

    githubservice.getFollowing(user).then(function(response) {
      $scope.$emit('done-loading');
      console.log(response);
      $scope.following = response;
    })
    
    $scope.toFollower = function(followName) {
      $state.go('profile', {login: followName})
    };
}])
