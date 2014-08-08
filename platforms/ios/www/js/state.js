angular.module('state', [])

.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider
	.state('login', {
		url: "/login",
		controller: 'loginCtrl',
		templateUrl: "index.html"
	})
	.state('profile', {
		url: "/profile",
		templateUrl: "templates/profile.html",
		controller: 'profileCtrl'
	})
	.state('publicRepos', {
		url: "/publicRepos",
		templateUrl: "templates/publicRepos.html",
		controller: 'publicRepos'
	})
	.state('fullscreen', {
		url: "/fullscreen",
		templateUrl: "templates/fullscreen.html",
		controller: 'fullscreenCtrl'
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

	$urlRouterProvider.otherwise("/login");
})