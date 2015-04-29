angular.module('MobileGit', ['ionic', 'ngMaterial', 'ngCordovaOauth', 'angular-storage'])

.run(function ($ionicPlatform, $state) {
  $ionicPlatform.ready(function () {
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
      controller: 'searchCtrl as search',
      templateUrl: "./dist/js/templates/search.html"
    })
    .state('searchpage', {
      url: "/search/:query",
      templateUrl: "./dist/js/templates/searchpage.html",
      controller: 'searchviewCtrl'
    })
    .state('profile', {
      url: "/profile/:login",
      templateUrl: "./dist/js/templates/profile.html",
      controller: 'profileCtrl'
    })
    .state('followers', {
      url: "/followers/:login",
      templateUrl: "./dist/js/templates/followers.html",
      controller: 'followerCtrl'
    })
    .state('following', {
      url: "/following/:login",
      templateUrl: "./dist/js/templates/following.html",
      controller: 'followingCtrl'
    })
    .state('repo', {
      url: "/repo/:name",
      templateUrl: "./dist/js/templates/repo.html",
      controller: 'RepoCtrl'
    })
    .state('feed', {
      url: "/feed",
      templateUrl: "./dist/js/templates/feed.html",
      controller: 'FeedCtrl'
    })
    .state('editor', {
      url: "/editor",
      templateUrl: "./dist/js/templates/editor.html",
      controller: 'EditorCtrl'
    })
    .state('intro', {
      url: "/intro",
      templateUrl: "./dist/js/templates/intro.html",
      controller: 'introCtrl'
    })

  $urlRouterProvider.otherwise("/intro");
})
