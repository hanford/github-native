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
	.state('followers', {
		url: "/followers",
		templateUrl: "../views/followers.tpl.html",
		controller: 'followerCtrl'
	})

	$urlRouterProvider.otherwise("/login");
})

.config(function($sceDelegateProvider) {
	$sceDelegateProvider.resourceUrlWhitelist(['https://github.com/**']);
})

.controller('loginCtrl', function($scope, $http, $rootScope, $state, $ionicPopup) {
	// $http.get('https://api.github.com/authorizations')
	$rootScope.ginfo;

	$scope.login	= function(uname) {
		$rootScope.uname = uname;
		$.cookie('username', uname)

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

		.error(function(data) {
			console.log(data)
			$scope.showAlert = function() {
				var alertPopup = $ionicPopup.alert({
					title: 'Sorry!',
					template: "We coudln't find any users named " + uname
				});
				alertPopup.then(function(res) {
					console.log('no users');
				});
			};
			$scope.showAlert()
		})
	}
})

.controller('verifyCtrl', function($scope, $http, $rootScope, $state) {
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
		var created = $rootScope.ginfo.created_at;
		$scope.created_at = created.substring(0, 10);
		$scope.following = $rootScope.ginfo.following;
		$scope.ava = $rootScope.ginfo.avatar_url;
	}

	$scope.repo = function () {
		var url = 'https://api.github.com/users/' + $rootScope.uname + '/repos'

		$http.get(url)

		.success(function(data, headers, status, config){
			$rootScope.publicReps = data;
			if ($rootScope.publicReps.length > 0) {
				$state.go('publicRepos')
			}
		})

		.error(function(data, headers, status, config){
			console.log(data, headers, status, config)
		})
	}

	$scope.toFollowerState = function () {
		var url = 'https://api.github.com/users/' + $rootScope.uname + '/followers'

		$http.get(url)

		.success(function(data, headers, status, config){
			$rootScope.followers = data;
			if ($rootScope.followers.length > 0) {
				$state.go('followers')
			}
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

.controller('followerCtrl', function($scope, $http, $rootScope, $state) {
	$scope.followers = $rootScope.followers;

	$scope.back = function () {
		$state.go('verify')
	}

	$scope.tofollower = function(fName) {

		var url = 'https://api.github.com/users/' + fName;

		$http.get(url)

		.success(function(data, headers, status, config){
			debugger
			$rootScope.ginfo = data;
			$state.go('verify')
		})
	}
})