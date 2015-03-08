angular.module('MobileGit')

.controller('searchCtrl', ['$scope', '$rootScope', '$state', 'githubservice', '$ionicNavBarDelegate', '$http', '$ionicHistory', '$ionicModal',
  function ($scope, $rootScope, $state, githubservice, $ionicNavBarDelegate, $http, $ionicHistory, $ionicModal) {

    $ionicHistory.clearHistory();
    $ionicNavBarDelegate.showBackButton(false);

    $scope.myAccount = function() {
      $scope.$parent.flags.FromSearch = false;
      $ionicHistory.clearCache();
      $state.go('profile');
    }

    $scope.searchProject = function(query) {
      $scope.$parent.searchRepos(query);
    };

    $scope.searchUser = function(query) {
      $scope.$parent.OtherProfile(query);
    };

    $scope.myFeed = function() {
      $state.go('feed');
    };

    $ionicModal.fromTemplateUrl('./dist/js/templates/modals/info-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;

      $scope.info = function() {
        setTimeout(function() {
          $scope.modal.show();
        }, 150);
      };

      $scope.close = function() {
        setTimeout(function() {
          $scope.modal.hide();
        }, 150);
      }
    });

}])
