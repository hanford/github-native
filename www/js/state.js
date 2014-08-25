angular.module('state', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider
	.state('search', {
		url: "/search",
		controller: 'searchCtrl',
		templateUrl: "templates/search.html"
	})
	.state('searchlist', {
		url: "/list",
		templateUrl: "templates/searchlist.html",
		controller: 'searchviewCtrl'
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
	.state('commits', {
		url: "/commits",
		templateUrl: "templates/commits.html",
		controller: 'commitsCtrl'
	})

	$urlRouterProvider.otherwise("/search");
})