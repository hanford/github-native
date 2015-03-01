angular.module('MobileGit')

.controller('MainCtrl', ['$ionicNavBarDelegate', '$scope', '$rootScope', '$ionicLoading', 'githubservice', '$state', 'store',
  function ($ionicNavBarDelegate, $scope, $rootScope, $ionicLoading, githubservice, $state, store) {
    $scope.flags = {
      user: {},
      access_token: ''
    };

    window.showFlags = function() {
      console.log('flags', $scope.flags)
    }

    if (store.get('access_token') == undefined) {
      $state.go('intro');
    } else {
      $scope.flags.access_token = store.get('access_token');
      $scope.flags.user = store.get('user');
    }

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
      $scope.openOverlay();
      $state.go('profile');
    };

}])
