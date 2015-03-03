angular.module('MobileGit', ['ionic', 'ngMaterial', 'ngCordovaOauth', 'GithubService', 'angular-storage'])

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
      templateUrl: "./dist/js/templates/search.html"
    })
    .state('searchpage', {
      url: "/list",
      templateUrl: "./dist/js/templates/searchpage.html",
      controller: 'searchviewCtrl'
    })
    .state('profile', {
      url: "/profile",
      templateUrl: "./dist/js/templates/profile.html",
      controller: 'profileCtrl'
    })
    .state('followers', {
      url: "/followers",
      templateUrl: "./dist/js/templates/followers.html",
      controller: 'followerCtrl'
    })
    .state('following', {
      url: "/following",
      templateUrl: "./dist/js/templates/following.html",
      controller: 'followingCtrl'
    })
    .state('commits', {
      url: "/commits",
      templateUrl: "./dist/js/templates/commits.html",
      controller: 'commitsCtrl'
    })
    .state('project', {
      url: "/project",
      templateUrl: "./dist/js/templates/project.html",
      controller: 'projectCtrl'
    })
    .state('CodeView', {
      url: "/codeview",
      templateUrl: "./dist/js/templates/code-view.html",
      controller: 'CodeViewCtrl'
    })
    .state('intro', {
      url: "/intro",
      templateUrl: "./dist/js/templates/intro.html",
      controller: 'introCtrl'
    })
    
  $urlRouterProvider.otherwise("/intro");
})
