angular.module('search', [])

.controller('searchCtrl', function($scope, $http, $rootScope, $state, $ionicLoading, githubservice, $timeout, $ionicModal) {
  $rootScope.count;

  $timeout(function() {
    if ($rootScope.authname) {
      $scope.authname = $rootScope.authname;
    } else {
      $scope.authname = $rootScope.authalias;
    }
  }, 2000)

  $rootScope.showBack = false;

  $scope.searchProject = function(uname) {
    mixpanel.track('Search Project');
    $ionicLoading.show({
      template: '<i class="ion-loading-c"></i>'
    });
    githubservice.getProjects(uname).then(function(response) {
      $rootScope.showBack = true;
      $ionicLoading.hide();
      $rootScope.sItems = response.items;
      $state.go('searchlist')
    })
  }

  $scope.searchUser = function(uname) {
    mixpanel.track('Search User');
    $rootScope.uname = uname;
    $ionicLoading.show({
      template: '<i class="ion-loading-c"></i>'
    });
    githubservice.getPerson(uname).then(function(response) {
      $ionicLoading.hide();
      $rootScope.showBack = true;
      $rootScope.ginfo = response;
      $state.go('profile')
    })
  }

  $scope.info = function() {
    $rootScope.showBack = true;
    $state.go('info')
  }

})
