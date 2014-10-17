angular.module('searchlist', [])

.controller('searchviewCtrl', function($scope, $http, $rootScope, $state, $ionicLoading, $ionicModal, githubservice) {
  $scope.items = $rootScope.sItems;

  console.log($scope.items);

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
      $state.go('treeview')
    })
  }

  if ($scope.items == undefined) {
    $state.go('search')
  }
})
