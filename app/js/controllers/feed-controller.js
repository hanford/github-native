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

    $ionicLoading.show({
      template: '<md-progress-circular md-mode="indeterminate"></md-progress-circular>'
    });
    githubservice.getRecievedEvents().then(function(response) {
      $ionicLoading.hide();
      $scope.events = $scope.$parent.formatEvents(response.data);
    });

}])
