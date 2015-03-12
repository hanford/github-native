angular.module('MobileGit')

.controller('searchCtrl', ['$scope', '$state', 'githubservice', '$ionicNavBarDelegate', '$http', '$ionicHistory', '$ionicModal',
  function ($scope, $state, githubservice, $ionicNavBarDelegate, $http, $ionicHistory, $ionicModal) {

    $ionicHistory.clearHistory();
    $ionicNavBarDelegate.showBackButton(false);

    this.myAccount = function() {
      $scope.$parent.flags.FromSearch = false;
      $ionicHistory.clearCache();
      $state.go('profile');
    }

    this.searchProject = function(query) {
      if (!query) return;
      $scope.$parent.searchRepos(query);
    };

    this.searchUser = function(query) {
      if (!query) return;
      $scope.$parent.OtherProfile(query);
    };

    this.myFeed = function() {
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
