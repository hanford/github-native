angular.module('controller', [])

.controller('searchCtrl', function($scope, $http, $rootScope, $state, $ionicPopup) {
	$rootScope.ginfo;
	$scope.loading = false;

	$scope.searchProject	= function(uname) {
		var url = 'https://api.github.com/search/repositories?q=' + uname;
		$scope.loading = true;

		$http.get(url)
		.success(function(data, headers, status, config){
			$scope.loading = false;
			$rootScope.searchProject = data;
			$state.go('searchview')
		})
		.error(function(data) {
			console.log(data)
			$scope.loading = false;
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



	$scope.searchUser	= function(uname) {
		$rootScope.uname = uname;
		$scope.loading = true;

		var url = 'https://api.github.com/users/' + uname;

		$http.get(url)
		.success(function(data, headers, status, config){
			$rootScope.ginfo = data;
			$scope.loading = false;
			$state.go('profile')
		})

		.error(function(data) {
			console.log(data)
			$scope.loading = false;
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

.controller('profileCtrl', function($scope, $http, $rootScope, $state) {

	$scope.loading = false;

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
		$scope.login = $rootScope.ginfo.login;

		if ($scope.name == null ) {
			$scope.name = $rootScope.ginfo.login;
		}
	}

	$scope.repo = function () {
		var url = 'https://api.github.com/users/' + $rootScope.uname + '/repos'
		$scope.loading = true;

		$http.get(url)
		.success(function(data, headers, status, config){
			$rootScope.publicReps = data;
			$scope.loading = false;
			if ($rootScope.publicReps.length > 0) {
				$state.go('repos')
			}
		})

		.error(function(data, headers, status, config){
			$scope.loading = false;
			console.log(data, headers, status, config)
		})
	}

	$scope.toFollowerState = function () {
		var url = 'https://api.github.com/users/' + $rootScope.uname + '/followers'
		$scope.loading = true;

		$http.get(url)
		.success(function(data, headers, status, config){
			$rootScope.followers = data;
			$scope.loading = false;
			if ($rootScope.followers.length > 0) {
				$state.go('followers')
			}
		})

		.error(function(data, headers, status, config){
			console.log(data, headers, status, config)
			$scope.loading = false;
		})
	}

	$scope.toFollowingState = function () {
		var url = 'https://api.github.com/users/' + $rootScope.uname + '/following'
		$scope.loading = true;

		$http.get(url)
		.success(function(data, headers, status, config){
			$rootScope.following = data;
			$scope.loading = false;
			if ($rootScope.following.length > 0) {
				$state.go('following')
			}
		})

		.error(function(data, headers, status, config){
			$scope.loading = false;
			console.log(data, headers, status, config)
		})
	}
})


.controller('repoCtrl', function($scope, $http, $rootScope, $state) {
	$scope.reps = $rootScope.publicReps;

	$scope.select = function(rep) {
		console.log('click')
		// https://api.github.com/repos/jackhanford/BackgroundChanger
		var url = "https://api.github.com/repos/" + $rootScope.uname + '/' + rep.name; 
		$http.get(url)
		.success(function(data, headers, status, config){
			$rootScope.repo = data;
			$state.go('PublicRep')
			})
		.error(function(data, headers, status, config){
			$scope.loading = false;
			console.log(data, headers, status, config)
		})
	}
		// $state.go('PublicRep')

})

.controller('repoViewCtrl', function($scope, $http, $rootScope, $state) {
	console.log($rootScope.repo)
	$scope.repo = $rootScope.repo;
	
})


.controller('followerCtrl', function($scope, $http, $rootScope, $state) {
	$scope.followers = $rootScope.followers;
	$scope.loading = false;

	$scope.tofollower = function(fName) {
		$rootScope.uname = fName;
		var url = 'https://api.github.com/users/' + fName;

		$scope.loading = true;
		$http.get(url)

		.success(function(data, headers, status, config){
			$rootScope.ginfo = data;
			$scope.loading = false;
			$state.go('profile')
		})
	}
})

.controller('followingCtrl', function($scope, $http, $rootScope, $state) {
	$scope.followings = $rootScope.following;
	$scope.loading = false;

	$scope.tofollower = function(fName) {
		$rootScope.uname = fName;
		var url = 'https://api.github.com/users/' + fName;
		$scope.loading = true;

		$http.get(url)
		.success(function(data, headers, status, config){
			$rootScope.ginfo = data;
			$scope.loading = false;
			$state.go('profile')
		})
	}
})

.controller('searchviewCtrl', function($scope, $http, $rootScope, $state) {
	console.log($rootScope.searchProject)
	var items = $rootScope.searchProject.items;
	$scope.items = items;
	debugger
})