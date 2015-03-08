angular.module('MobileGit')

.controller('searchviewCtrl', ['$scope', '$rootScope', '$state', '$ionicLoading', 'githubservice',
  function ($scope, $rootScope, $state, $ionicLoading, githubservice) {
    $scope.items = $scope.$parent.items;
    $scope.search = "";

    console.log($scope.items);

    $scope.gotoTree = function(item) {
      $rootScope.repo = item;
      $ionicLoading.show({
        template: '<md-progress-circular md-mode="indeterminate"></md-progress-circular>'
      });
      githubservice.getTree(item.full_name).then(function(response) {
        $rootScope.tree = response;
        $ionicLoading.hide();
        $state.go('project')
      })
    }

}])
