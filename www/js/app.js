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
      templateUrl: "templates/search.html"
    })
    .state('searchpage', {
      url: "/list",
      templateUrl: "templates/searchpage.html",
      controller: 'searchviewCtrl'
    })
    .state('profile', {
      url: "/profile",
      templateUrl: "templates/profile.html",
      controller: 'profileCtrl'
    })
    .state('followers', {
      url: "/followers",
      templateUrl: "templates/followers.html",
      controller: 'followerCtrl'
    })
    .state('following', {
      url: "/following",
      templateUrl: "templates/following.html",
      controller: 'followingCtrl'
    })
    .state('commits', {
      url: "/commits",
      templateUrl: "templates/commits.html",
      controller: 'commitsCtrl'
    })
    .state('project', {
      url: "/project",
      templateUrl: "templates/project.html",
      controller: 'projectCtrl'
    })
    .state('info', {
      url: "/info",
      templateUrl: "templates/info.html",
      controller: 'infoCtrl'
    })
    .state('codeView', {
      url: "/codeview",
      templateUrl: "templates/code-view.html",
      controller: 'codeViewCtrl'
    })
    .state('intro', {
      url: "/intro",
      templateUrl: "templates/intro.html",
      controller: 'introCtrl'
    })
    
  $urlRouterProvider.otherwise("/intro");
})
