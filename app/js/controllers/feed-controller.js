angular.module('MobileGit')

.controller('FeedCtrl', ['$scope', '$state', '$ionicLoading', 'githubservice', '$ionicNavBarDelegate',
  function ($scope, $state, $ionicLoading, githubservice, $ionicNavBarDelegate) {
    $ionicNavBarDelegate.showBackButton(true);

    githubservice.getRecievedEvents().then(function(response) {
      $scope.events = $scope.$parent.formatEvents(response.data);
    });

}])
