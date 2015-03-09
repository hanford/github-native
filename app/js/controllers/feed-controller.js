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

    githubservice.getRecievedEvents().then(function(response) {
      $scope.events = $scope.$parent.formatEvents(response.data);
    });

}])
