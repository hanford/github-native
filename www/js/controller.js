angular.module('controller', [])

.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider
	.state('login', {
		url: "/login",
		controller: 'loginCtrl',
		templateUrl: "../index.html"
	})
	.state('verify', {
		url: "/verify",
		templateUrl: "../views/verify.tpl.html",
		controller: 'verifyCtrl'
	})
	.state('publicRepos', {
		url: "/publicRepos",
		templateUrl: "../views/publicRepos.tpl.html",
		controller: 'publicRepos'
	})
	.state('fullscreen', {
		url: "/fullscreen",
		templateUrl: "../views/fullscreen.tpl.html",
		controller: 'fullscreenCtrl'
	})

	$urlRouterProvider.otherwise("/login");
})

.config(function($sceDelegateProvider) {
	$sceDelegateProvider.resourceUrlWhitelist(['https://github.com/**']);
})

.controller('loginCtrl', function($scope, $http, $rootScope, $state) {
	// $http.get('https://api.github.com/authorizations')
	$rootScope.ginfo;

	$scope.login	= function(uname) {
		$rootScope.uname = uname;
		$.cookie('username', uname)

		// var github = new Github({
		// 	username:  uname,
		// 	password: pword,
		// 	auth: "basic"
		// });

		var github = new Github({
			token: '09ce798b46fac389b6056e1350490135bd9b80d0',
			auth: "oauth"
		});

		var url = 'https://api.github.com/users/' + uname;

		$http.get(url)

		.success(function(data, headers, status, config){
			$rootScope.ginfo = data;
			$state.go('verify')
		})

		.error(function(data, headers, status, config){
			console.log(data, headers, status, config)
		})
	}
})

.controller('verifyCtrl', function($scope, $http, $rootScope, $state, $ionicPopup) {
	if ($.cookie() == undefined) {
		$state.go('login')
	} else {
		var url = 'https://api.github.com/users/' + $.cookie('username')
		$http.get(url)
	}

		$scope.reset = function () {
		if ($.cookie() != undefined) {
			$.removeCookie('username');
		}
		
		$state.go('login');
	}

	if ($rootScope.ginfo != undefined) {
		$scope.name = $rootScope.ginfo.name;
		$scope.pub_count = $rootScope.ginfo.public_repos;
		$scope.gists = $rootScope.ginfo.public_gists;
		$scope.followers = $rootScope.ginfo.followers;
		$scope.blog = $rootScope.ginfo.blog;
		$scope.company = $rootScope.ginfo.company;
		$scope.following = $rootScope.ginfo.following;
		$scope.ava = $rootScope.ginfo.avatar_url;
	}

	$scope.repo = function () {
		var url = 'https://api.github.com/users/' + $rootScope.uname + '/repos'

		$http.get(url)

		.success(function(data, headers, status, config){
			// var confirmPopup = $ionicPopup.confirm({
			// 	title: 'Public Repos',
			// 	template: 'Are sure you want to view public repos?'
			// });
			// confirmPopup.then(function(res) {
			// 	if(res) {
					$rootScope.publicReps = data;
					if ($rootScope.publicReps.length > 0) {
						$state.go('publicRepos')
					}
				// } else {
				// 	console.log('cancel');
				// }
		})

		.error(function(data, headers, status, config){
			console.log(data, headers, status, config)
		})
	}
})

.controller('publicRepos', function($scope, $http, $rootScope, $state) {
if ($.cookie() == undefined) {
		$state.go('login')
	} else {
		var url = 'https://api.github.com/users/' + $rootScope.uname
		$http.get(url)
	}


	$scope.reps = $rootScope.publicReps;

	$scope.back = function () {
		$state.go('verify')
	}

	$scope.select = function(html_url) {
		console.log('click')

		$rootScope.web = html_url;
		$state.go('fullscreen')
	}
})

.controller('fullscreenCtrl', function($scope, $http, $rootScope, $state) {
	if ($.cookie() == undefined) {
		$state.go('login')
	} else {
		var url = 'https://api.github.com/users/' + $rootScope.uname
		$http.get(url)
	}

	$scope.back = function () {
		$state.go('publicRepos')
	}

	$scope.web = $rootScope.web;
})