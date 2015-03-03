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
      $scope.$parent.FindProject(query);
    };

    $scope.searchUser = function(query) {
      $scope.$parent.OtherProfile(query);
    };

    $ionicModal.fromTemplateUrl('./dist/js/templates/modals/info-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;

      $scope.info = function() {
        setTimeout(function() {
          $scope.modal.show();
        }, 300);
      };

      $scope.CloseModal = function() {
        setTimeout(function() {
          $scope.modal.hide();
        }, 300);
      }
    });

}])
