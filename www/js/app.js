angular.module('MobileGit', ['ionic', 'ngMaterial', 'state', 'GithubService', 'profile', 'search', 'info', 'commits', 'codeView', 'follow', 'intro', 'searchlist', 'project', 'rotator', 'mainCtrl', 'angular-storage', 'ngCordovaOauth'])

.run(function ($ionicPlatform, $rootScope, $state, $timeout, $ionicPopup) {
  $ionicPlatform.ready(function () {
    window.addEventListener('load', function () {
      FastClick.attach(document.body);
    }, false);

    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  })
})
