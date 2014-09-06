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
	.state('treeview', {
		url: "/treeview",
		templateUrl: "templates/treeview.html",
		controller: 'treeCtrl'
	})
	.state('info', {
		url: "/info",
		templateUrl: "templates/info.html",
		controller: 'infoCtrl'
	})
	.state('code', {
		url: "/code",
		templateUrl: "templates/code.html",
		controller: 'codeCtrl'
	})
	.state('nestedview', {
		url: "/nestedview",
		templateUrl: "templates/nestedview.html",
		controller: 'nestedviewCtrl'
	})

	$urlRouterProvider.otherwise("/search");
})