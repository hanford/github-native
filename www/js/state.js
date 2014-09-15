angular.module('state', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('search', {
      url: "/search",
      controller: 'searchCtrl',
      templateUrl: "js/search/search.html"
    })
    .state('searchlist', {
      url: "/list",
      templateUrl: "js/searchResults/searchlist.html",
      controller: 'searchviewCtrl'
    })
    .state('profile', {
      url: "/profile",
      templateUrl: "js/profile/profile.html",
      controller: 'profileCtrl'
    })
    .state('PublicRep', {
      url: "/PublicRepo",
      templateUrl: "js/treeview/PublicRepo.html",
      controller: 'repoViewCtrl'
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
    .state('treeview', {
      url: "/treeview",
      templateUrl: "js/treeview/treeview.html",
      controller: 'treeCtrl'
    })
    .state('info', {
      url: "/info",
      templateUrl: "js/info/info.html",
      controller: 'infoCtrl'
    })
    .state('content', {
      url: "/content",
      templateUrl: "js/contents/contents.html",
      controller: 'contentCtrl'
    })
    .state('intro', {
      url: "/intro",
      templateUrl: "js/intro/intro.html",
      controller: 'introCtrl'
    })

  $urlRouterProvider.otherwise("/search");
})
