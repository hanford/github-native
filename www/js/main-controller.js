angular.module('mainCtrl', [])

.controller('mainCtrl', function($ionicNavBarDelegate, $scope) {
  console.log('main controller loaded')
  $ionicNavBarDelegate.showBackButton(true);
  // $scope.open = false;

  // $scope.openOverlay = function() {
  //   $scope.open = true;
  // };

})
