angular.module('mainCtrl', [])

.controller('mainCtrl', function($ionicNavBarDelegate, $scope, $rootScope, $ionicLoading, githubservice, $state) {
  $ionicNavBarDelegate.showBackButton(true);
  $scope.open = false;

 $scope.$on('infoCtrlLoaded', function() {
  $scope.hideNavBttns = true;
 });

$scope.$on('showNavBttns', function() {
  $scope.hideNavBttns = false;
 })

  $scope.openOverlay = function() {
    $scope.openNav = !$scope.openNav;

    var inClass = 'bounceIn';
    var outClass = 'bounceOut';

    if ($scope.openNav) {
      $('.scroll').addClass('blurred');
      $('.searchNav').addClass(inClass).removeClass(outClass);
      $('.profileNav').addClass(inClass).removeClass(outClass);
    } else {
      $('.searchNav').removeClass(inClass).addClass(outClass);
      $('.profileNav').removeClass(inClass).addClass(outClass);
      $('.fading-btn').css({
        opacity: 1
      });
      $('.scroll').removeClass('blurred');
    }
  };

  $scope.search = function() {
    $scope.openOverlay();
    $state.go('search');
  }

  $scope.myProfie = function() {
    mixpanel.track('Search User', {
      "User": $rootScope.authlogin
    });
    console.log('tracked ' + $rootScope.authlogin);
    $rootScope.uname = $rootScope.authlogin;
    $ionicLoading.show({
      template: '<i class="ion-loading-c"></i>'
    });
    // console.log('jaquéré');
    githubservice.getPerson($rootScope.authlogin).then(function(response) {
      $ionicLoading.hide();
      $rootScope.showBack = true;
      $rootScope.ginfo = response;
      $scope.openOverlay();
      $state.go('profile');
    });
  };

  if (!$rootScope.access_token) {
    $state.go('intro')
  }

})
