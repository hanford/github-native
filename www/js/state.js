angular.module('state', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('search', {
      url: "/search",
      controller: 'searchCtrl',
      templateUrl: "js/search/search.html"
    })
    .state('searchpage', {
      url: "/list",
      templateUrl: "js/searchpage/searchpage.html",
      controller: 'searchviewCtrl'
    })
    .state('profile', {
      url: "/profile",
      templateUrl: "js/profile/profile.html",
      controller: 'profileCtrl'
    })
    .state('followers', {
      url: "/followers",
      templateUrl: "js/follow/followers.html",
      controller: 'followerCtrl'
    })
    .state('following', {
      url: "/following",
      templateUrl: "js/follow/following.html",
      controller: 'followingCtrl'
    })
    .state('commits', {
      url: "/commits",
      templateUrl: "js/commits/commits.html",
      controller: 'commitsCtrl'
    })
    .state('project', {
      url: "/project",
      templateUrl: "js/project/project.html",
      controller: 'projectCtrl'
    })
    .state('info', {
      url: "/info",
      templateUrl: "js/info/info.html",
      controller: 'infoCtrl'
    })
    .state('codeView', {
      url: "/codeview",
      templateUrl: "js/code-view/code-view.html",
      controller: 'codeViewCtrl'
    })
    .state('intro', {
      url: "/intro",
      templateUrl: "js/intro/intro.html",
      controller: 'introCtrl'
    })
    
  $urlRouterProvider.otherwise("/intro");
})
