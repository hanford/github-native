angular.module('MobileGit')

.controller('searchviewCtrl', ['$scope', '$rootScope', '$state', '$ionicLoading', 'githubservice',
  function ($scope, $rootScope, $state, $ionicLoading, githubservice) {
    $scope.items = $scope.$parent.items;
    $scope.search = "";

    console.log($scope.items);

    $scope.gotoTree = function(item) {
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

}])
