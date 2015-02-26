angular.module('MobileGit')

.controller('searchCtrl', ['$scope', '$rootScope', '$state', '$ionicLoading', 'githubservice', '$timeout', '$ionicNavBarDelegate', '$http', '$ionicHistory',
  function ($scope, $rootScope, $state, $ionicLoading, githubservice, $timeout, $ionicNavBarDelegate, $http, $ionicHistory) {
    $timeout(function() {
      if ($rootScope.authname) {
        $scope.authname = $rootScope.authname;
      } else {
        $scope.authname = $rootScope.authalias;
      }
    }, 2000);

    $ionicHistory.clearHistory();
    $ionicNavBarDelegate.showBackButton(false);

    $scope.searchProject = function(uname) {
      mixpanel.track('Search Project', {
        "Project": uname
      });
      $rootScope.uname = uname;
      $ionicLoading.show({
        template: '<i class="ion-loading-c"></i>'
      });
      githubservice.getProjects(uname).then(function(response) {
        $ionicLoading.hide();
        $rootScope.sItems = response.items;
        $state.go('searchpage');
        $ionicHistory.clearCache();
      })
    }

    $scope.searchUser = function(uname) {
      mixpanel.track('Search User', {
        "User": uname
      });
      console.log('tracked ' + uname);
      $rootScope.uname = uname;
      $ionicLoading.show({
        template: '<i class="ion-loading-c"></i>'
      });
      // console.log('jaquéré');
      githubservice.getPerson(uname).then(function(response) {
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
