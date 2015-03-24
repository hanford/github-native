angular.module('MobileGit')

.controller('searchCtrl', ['$scope', '$state', 'githubservice', '$ionicNavBarDelegate', '$ionicHistory', '$ionicModal', 'userservice',
  function ($scope, $state, githubservice, $ionicNavBarDelegate, $ionicHistory, $ionicModal, userservice) {

    // $ionicHistory.clearHistory();
    $ionicNavBarDelegate.showBackButton(false);

    this.searchProject = function(query) {
      if (!query) return;
      $scope.$emit('loading');
      $ionicNavBarDelegate.showBackButton(true);
      $state.go('searchpage', {query: query});
    };

    this.searchUser = function(query) {
      if (!query) return;
      $scope.$emit('loading');
      $state.go('profile', {login: query})
    };

    this.myAccount = function() {
      $scope.$emit('loading');
      userservice.me().then(function(response) {
        $state.go('profile', {login: response.me.login})
      });
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
