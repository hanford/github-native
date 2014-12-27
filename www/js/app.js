angular.module('MobileGit', ['ionic', 'ngMaterial', 'state', 'factory', 'profile', 'search', 'info', 'commits', 'contents', 'follow', 'intro', 'searchlist', 'treeview', 'rotator', 'mainCtrl', 'angular-storage', 'ngCordovaOauth'])

.run(function ($ionicPlatform, $rootScope, $state, $timeout, $ionicPopup) {
  $ionicPlatform.ready(function () {

    window.addEventListener('load', function () {
      FastClick.attach(document.body);
    }, false);

    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

    $timeout(function () {
      if (!$rootScope.access_token) {
        $state.go('intro');
      } else {
        $state.go('search');
      }
    }, 500);

    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  })
})
