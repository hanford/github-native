angular.module('state', [])

.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider
	.state('search', {
		url: "/search",
		controller: 'searchCtrl',
		templateUrl: "templates/search.html"
	})
	.state('profile', {
		url: "/profile",
		templateUrl: "templates/profile.html",
		controller: 'profileCtrl'
	})
	.state('repos', {
		url: "/repos",
		templateUrl: "templates/repos.html",
		controller: 'repoCtrl'
	})
	.state('PublicRep', {
		url: "/PublicRepo",
		templateUrl: "templates/PublicRepo.html",
		controller: 'repoViewCtrl'
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
	.state('searchview', {
		url: "/searchview",
		templateUrl: "templates/searchview.html",
		controller: 'searchviewCtrl'
	})

	$urlRouterProvider.otherwise("/search");
})