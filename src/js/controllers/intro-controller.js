angular.module('MobileGit')

.controller('introCtrl', ['$scope', '$state', '$ionicNavBarDelegate', 'githubservice', 'userservice',
  function ($scope, $state, $ionicNavBarDelegate, githubservice, userservice) {

    $ionicNavBarDelegate.title('Welcome!')

    $scope.login = function () {
      $scope.$emit('loading')
      userservice.login().then(function(res) {
        $scope.$emit('done-loading')
        $state.go('search')
      })
    }

}])
