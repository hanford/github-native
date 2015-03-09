angular.module('MobileGit')

.controller('FeedCtrl', ['$scope', 'githubservice', '$ionicNavBarDelegate',
  function ($scope, githubservice, $ionicNavBarDelegate) {
    $ionicNavBarDelegate.showBackButton(true);

    $scope.user = function(name) {
      $scope.$parent.OtherProfile(name);
    }

    githubservice.getRecievedEvents().then(function(response) {
      $scope.events = $scope.$parent.formatEvents(response.data);
    });

}])
