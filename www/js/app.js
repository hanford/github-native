angular.module('MobileGit', ['ionic', 'ngMaterial', 'GithubService', 'profile', 'search', 'info', 'commits', 'codeView', 'follow', 'intro', 'searchlist', 'project', 'rotator', 'mainCtrl', 'angular-storage', 'ngCordovaOauth'])

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

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('search', {
      url: "/search",
      controller: 'searchCtrl',
      templateUrl: "./js/templates/search.html"
    })
    .state('searchpage', {
      url: "/list",
      templateUrl: "./js/templates/searchpage.html",
      controller: 'searchviewCtrl'
    })
    .state('profile', {
      url: "/profile",
      templateUrl: "./js/templates/profile.html",
      controller: 'profileCtrl'
    })
    .state('followers', {
      url: "/followers",
      templateUrl: "./js/templates/followers.html",
      controller: 'followerCtrl'
    })
    .state('following', {
      url: "/following",
      templateUrl: "./js/templates/following.html",
      controller: 'followingCtrl'
    })
    .state('commits', {
      url: "/commits",
      templateUrl: "./js/templates/commits.html",
      controller: 'commitsCtrl'
    })
    .state('project', {
      url: "/project",
      templateUrl: "./js/templates/project.html",
      controller: 'projectCtrl'
    })
    .state('info', {
      url: "/info",
      templateUrl: "./js/templates/info.html",
      controller: 'infoCtrl'
    })
    .state('codeView', {
      url: "/codeview",
      templateUrl: "./js/templates/code-view.html",
      controller: 'codeViewCtrl'
    })
    .state('intro', {
      url: "/intro",
      templateUrl: "./js/templates/intro.html",
      controller: 'introCtrl'
    })
    
  $urlRouterProvider.otherwise("/intro");
})
