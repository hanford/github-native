angular.module('MobileGit')

.controller('searchCtrl', ['$scope', '$rootScope', '$state', '$ionicLoading', 'githubservice', '$timeout', '$ionicNavBarDelegate', '$http', '$ionicHistory',
  function ($scope, $rootScope, $state, $ionicLoading, githubservice, $timeout, $ionicNavBarDelegate, $http, $ionicHistory) {

    $ionicHistory.clearHistory();
    $ionicNavBarDelegate.showBackButton(false);

    $scope.myAccount = function() {
      $rootScope.uname = $scope.$parent.flags.user.login;
      $ionicLoading.show({
        template: '<i class="ion-loading-c"></i>'
      });

      githubservice.getPerson($scope.$parent.flags.user.login).then(function(response) {
        $ionicLoading.hide();
        $rootScope.showBack = true;
        $state.go('profile');
        $ionicHistory.clearCache();
      });
    }

    $scope.searchProject = function(query) {
      mixpanel.track('Search Project', {
        "Project": query
      });
      $rootScope.uname = query;
      $ionicLoading.show({
        template: '<i class="ion-loading-c"></i>'
      });
      githubservice.getProjects(query).then(function(response) {
        $ionicLoading.hide();
        $rootScope.sItems = response.items;
        $state.go('searchpage');
        $ionicHistory.clearCache();
      })
    }

    $scope.searchUser = function(query) {
      mixpanel.track('Search User', {
        "User": query
      });
      console.log('tracked ' + query);
      $rootScope.uname = query;
      $ionicLoading.show({
        template: '<i class="ion-loading-c"></i>'
      });
      // console.log('jaquéré');
      githubservice.getPerson(query).then(function(response) {
        $ionicLoading.hide();
        $rootScope.showBack = true;
        $rootScope.ginfo = response;
        $state.go('profile');
        $ionicHistory.clearCache();
      });
    };

    $scope.info = function() {
      mixpanel.track('Info State');
      $rootScope.showBack = true;
      $state.go('info')
    };

}])
