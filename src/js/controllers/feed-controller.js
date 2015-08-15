angular.module('MobileGit')

.controller('FeedCtrl', ['$scope', 'githubservice', '$ionicNavBarDelegate', '$state',
  function ($scope, githubservice, $ionicNavBarDelegate, $state) {

    $ionicNavBarDelegate.showBackButton(true);

    $scope.user = function(name) {
      $state.go('profile', {login: name})
    };

    $scope.repo = function(e, repo) {
      e.preventDefault();
      e.stopPropagation();
      $state.go('repo', {name: repo})
    };

    $scope.$emit('loading');
    githubservice.getRecievedEvents().then(function(response) {
      $scope.$emit('done-loading');
      $scope.events = $scope.$parent.formatEvents(response.data);
    });

}])
