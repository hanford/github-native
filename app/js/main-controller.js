angular.module('MobileGit')

.controller('MainCtrl', ['$ionicNavBarDelegate', '$scope', '$rootScope', '$ionicLoading', 'githubservice', '$state', 'store', '$ionicHistory',
  function ($ionicNavBarDelegate, $scope, $rootScope, $ionicLoading, githubservice, $state, store, $ionicHistory) {

    // Base Object used in most controllers containing logged in users information
    $scope.flags = {
      user: {},
      access_token: '',
      FromSearch: false
    };

    // Utility function
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

    $scope.toggleOverlay = function() {
      $scope.overlay = !$scope.overlay;

      var inClass = 'bounceIn';
      var outClass = 'bounceOut';

      if ($scope.overlay) {
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
      $scope.toggleOverlay();
      $state.go('search');
    }

    $scope.myProfie = function() {
      $scope.toggleOverlay();
      $state.go('profile');
    };

    $scope.OtherProfile = function (user) {
      $scope.flags.FromSearch = true;
      console.log(githubservice.getPerson(user));
      githubservice.getPerson(user).then(function(response) {
        $scope.otherUser = response;
        $ionicHistory.clearCache();
        $state.go('profile');
      });
    };

}])
