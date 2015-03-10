angular.module('MobileGit')

.controller('FeedCtrl', ['$scope', 'githubservice', '$ionicNavBarDelegate',
  function ($scope, githubservice, $ionicNavBarDelegate) {

    $ionicNavBarDelegate.showBackButton(true);

    $scope.user = function(name) {
      $scope.$parent.OtherProfile(name);
    };

    $scope.repo = function(e, repo) {
      e.preventDefault();
      e.stopPropagation();
      $scope.$parent.getRepo(repo);
    };

    $scope.$emit('loading');
    githubservice.getRecievedEvents().then(function(response) {
      $scope.$emit('done-loading');
      $scope.events = $scope.$parent.formatEvents(response.data);
    });

}])