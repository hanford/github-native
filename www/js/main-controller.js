angular.module('mainCtrl', [])

.controller('mainCtrl', function($ionicNavBarDelegate) {
  console.log('main controller loaded')
  $ionicNavBarDelegate.showBackButton(true);

})
