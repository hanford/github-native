angular.module('controller', [])

.controller('loginCtrl', function($scope, $http, $rootScope, $state, $ionicPopup) {
	$rootScope.ginfo;

	$scope.login	= function(uname) {
		$rootScope.uname = uname;

		var github = new Github({
			token: '09ce798b46fac389b6056e1350490135bd9b80d0',
			auth: "oauth"
		});

		var url = 'https://api.github.com/users/' + uname;

		$http.get(url)

		.success(function(data, headers, status, config){
			$rootScope.ginfo = data;
			$state.go('profile')
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

			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		})
	}
})

.controller('profileCtrl', function($scope, $http, $rootScope, $state) {
	$scope.reset = function () {
		$state.go('login');
	}


	if ($rootScope.ginfo != undefined) {
		$scope.pub_count = $rootScope.ginfo.public_repos;
		$scope.gists = $rootScope.ginfo.public_gists;
		$scope.followers = $rootScope.ginfo.followers;
		$scope.blog = $rootScope.ginfo.blog;
		$scope.company = $rootScope.ginfo.company;

		var created = $rootScope.ginfo.created_at;
		$scope.created_at = created.substring(0, 10);

		$scope.following = $rootScope.ginfo.following;
		$scope.ava = $rootScope.ginfo.avatar_url;
		$scope.location = $rootScope.ginfo.location;

		$scope.name = $rootScope.ginfo.name;
		$scope.id = $rootScope.ginfo.id;

		if ($scope.name == null ) {
			$scope.name = $rootScope.ginfo.login;
		}
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

	$scope.toFollowingState = function () {
		var url = 'https://api.github.com/users/' + $rootScope.uname + '/following'

		$http.get(url)

		.success(function(data, headers, status, config){
			$rootScope.following = data;
			if ($rootScope.following.length > 0) {
				$state.go('following')
			}
		})

		.error(function(data, headers, status, config){
			console.log(data, headers, status, config)
		})
	}
})


.controller('publicRepos', function($scope, $http, $rootScope, $state) {
	$scope.reps = $rootScope.publicReps;

	$scope.back = function () {
		$state.go('profile')
	}

	$scope.select = function(html_url) {
		console.log('click')
		debugger;

		$rootScope.web = html_url;
		// $state.go('fullscreen')
	}

})

// Potential code view? (This controller is init after public repos)
.controller('fullscreenCtrl', function($scope, $http, $rootScope, $state) {
	$scope.back = function () {
		$state.go('publicRepos')
	}

	$scope.web = $rootScope.web;
})


.controller('followerCtrl', function($scope, $http, $rootScope, $state) {
	$scope.followers = $rootScope.followers;

	$scope.back = function () {
		$state.go('profile')
	}

	$scope.tofollower = function(fName) {
		var url = 'https://api.github.com/users/' + fName;

		$http.get(url)

		.success(function(data, headers, status, config){
			$rootScope.ginfo = data;
			$state.go('profile')
		})
	}
})

.controller('followingCtrl', function($scope, $http, $rootScope, $state) {
	$scope.followings = $rootScope.following;

	$scope.back = function () {
		$state.go('profile')
	}

	$scope.tofollower = function(fName) {
		var url = 'https://api.github.com/users/' + fName;

		$http.get(url)

		.success(function(data, headers, status, config){
			$rootScope.ginfo = data;
			$state.go('profile')
		})
	}
})