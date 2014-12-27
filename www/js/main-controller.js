angular.module('mainCtrl', [])

.controller('mainCtrl', function($ionicNavBarDelegate, $scope, $rootScope, $ionicLoading, githubservice, $state) {
  console.log('main controller loaded')
  $ionicNavBarDelegate.showBackButton(true);
  $scope.open = false;

  $scope.openOverlay = function() {
    var scroll = angular.element('.scroll');

    $scope.open = !$scope.open;

    if ($scope.open) {
      $('.scroll').addClass('blurred');
      $('.profile').show();
      $('.profile').addClass('animated slideInUp');
    } else {
      $('.profile').hide();
      $('.profile').addClass('slideOutDown');
      $('.scroll').removeClass('blurred');
    }
  };

  $scope.myProfie = function() {
    mixpanel.track('Search User', {
      "User": $rootScope.authlogin
    });
    console.log('tracked ' + $rootScope.authlogin)
    $rootScope.uname = $rootScope.authlogin;
    $ionicLoading.show({
      template: '<i class="ion-loading-c"></i>'
    });
    // console.log('jaquéré');
    githubservice.getPerson($rootScope.authlogin).then(function(response) {
      $ionicLoading.hide();
      $rootScope.showBack = true;
      $rootScope.ginfo = response;
      $state.go('profile')
    });
  };

})
