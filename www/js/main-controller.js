angular.module('mainCtrl', [])

.controller('mainCtrl', function($ionicNavBarDelegate, $scope, $rootScope, $ionicLoading, githubservice, $state) {
  $ionicNavBarDelegate.showBackButton(true);
  $scope.open = false;

 $scope.$on('infoCtrlLoaded', function() {
  console.log('infoCtrlLoaded');
  $scope.hideNavBttns = true;
 });

$scope.$on('showNavBttns', function() {
  console.log('showNavBttns');
  $scope.hideNavBttns = false;
 })

  $scope.openOverlay = function() {
    $scope.open = !$scope.open;

    var inClassBig = 'fadeInUpBig';
    var outClassBig = 'fadeOutDownBig';

    var inClass = 'bounceIn';
    var outClass = 'bounceOut';

    if ($scope.open) {
      $('.scroll').addClass('blurred');
      $('.search').addClass(inClass).removeClass(outClass);
      $('.profile').addClass(inClass).removeClass(outClass);
    } else {
      console.log(inClass, outClass)
      $('.search').removeClass(inClass).addClass(outClass);
      $('.profile').removeClass(inClass).addClass(outClass);
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

})
