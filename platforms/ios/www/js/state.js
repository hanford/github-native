angular.module('state', [])

.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider
	.state('login', {
		url: "/login",
		controller: 'loginCtrl',
		templateUrl: "../index.html"
	})
	.state('profile', {
		url: "/profile",
		templateUrl: "templates/profile.tpl.html",
		controller: 'profileCtrl'
	})
	.state('publicRepos', {
		url: "/publicRepos",
		templateUrl: "templates/publicRepos.tpl.html",
		controller: 'publicRepos'
	})
	.state('fullscreen', {
		url: "/fullscreen",
		templateUrl: "templates/fullscreen.tpl.html",
		controller: 'fullscreenCtrl'
	})
	.state('followers', {
		url: "/followers",
		templateUrl: "templates/followers.tpl.html",
		controller: 'followerCtrl'
	})
	.state('following', {
		url: "/following",
		templateUrl: "templates/following.tpl.html",
		controller: 'followingCtrl'
	})

	$urlRouterProvider.otherwise("/login");
})