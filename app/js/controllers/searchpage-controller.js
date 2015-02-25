angular.module('searchlist', [])

.controller('searchviewCtrl', ['$scope', '$rootScope', '$state', '$ionicLoading', 'githubservice',
  function ($scope, $rootScope, $state, $ionicLoading, githubservice) {
    $scope.items = $rootScope.sItems;
    $scope.search = "";

    $scope.gotoTree = function(item) {
      mixpanel.track('Project Click', {
        "Project": item.full_name
      });
      $rootScope.repo = item;
      $ionicLoading.show({
        template: '<i class="ion-loading-c"></i>'
      });

      githubservice.getTree(item.full_name).then(function(response) {
        $rootScope.tree = response;
        $ionicLoading.hide();
        $state.go('project')
      })
    }

    if ($scope.items == undefined) {
      $state.go('search')
    }
}])
