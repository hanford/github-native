angular.module('controller', [])

.controller('searchCtrl', function($scope, $http, $rootScope, $state, $ionicPopup, $ionicLoading) {
	$rootScope.ginfo;
	$scope.loading = false;

	$scope.searchProject	= function(uname) {
		var url = 'https://api.github.com/search/repositories?q=' + uname;
		$ionicLoading.show({
      template: 'Loading...'
    });

		$http.get(url)
			.success(function(data, headers, status, config){
				$ionicLoading.hide();
				$rootScope.sItems = data.items;
				$state.go('searchlist')
			}).error(function(data) {
				console.log(data)
				$ionicLoading.hide();
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
		$ionicLoading.show({
      template: 'Loading...'
    });

		var url = 'https://api.github.com/users/' + uname;

		$http.get(url)
		.success(function(data, headers, status, config){
			$ionicLoading.hide();
			$rootScope.ginfo = data;
			$state.go('profile')
		}).error(function(data) {
			$ionicLoading.hide();
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

.controller('profileCtrl', function($scope, $http, $rootScope, $state, $ionicLoading) {
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
	} else {
		$state.go('search')
	}

	$scope.repo = function () {
		$ionicLoading.show({
			template: 'Loading...'
		});

		var url = 'https://api.github.com/users/' + $rootScope.uname + '/repos'

		$http.get(url)
		.success(function(data, headers, status, config){
			$rootScope.publicReps = data;
			$ionicLoading.hide();
			$state.go('repos')
		}).error(function(data, headers, status, config){
			$ionicLoading.hide();
			console.log(data, headers, status, config)
		})
	}

	$scope.toFollowerState = function () {
		var url = 'https://api.github.com/users/' + $rootScope.uname + '/followers'
		$ionicLoading.show({
			template: 'Loading...'
		});

		$http.get(url)
		.success(function(data, headers, status, config){
			$rootScope.followers = data;
			$ionicLoading.hide();
			if ($rootScope.followers.length > 0) {
				$state.go('followers')
			}
		}).error(function(data, headers, status, config){
			console.log(data, headers, status, config)
			$ionicLoading.hide();
		})
	}

	$scope.toFollowingState = function () {
		var url = 'https://api.github.com/users/' + $rootScope.uname + '/following'
		$ionicLoading.show({
			template: 'Loading...'
		});
		$http.get(url)
		.success(function(data, headers, status, config){
			$rootScope.following = data;
			$ionicLoading.hide();
			if ($rootScope.following.length > 0) {
				$state.go('following')
			}
		}).error(function(data, headers, status, config){
			$ionicLoading.hide();
			console.log(data, headers, status, config)
		})
	}
})


.controller('repoCtrl', function($scope, $http, $rootScope, $state, $ionicLoading) {
	$scope.reps = $rootScope.publicReps;

	$scope.select = function(rep) {
		$ionicLoading.show({
			template: 'Loading...'
		});
		var url = "https://api.github.com/repos/" + $rootScope.uname + '/' + rep.name; 
		$http.get(url)
		.success(function(data, headers, status, config){
			$rootScope.repo = data;
			$ionicLoading.hide();
			if ($rootScope.repo.length > 0) {
				$state.go('PublicRep')
			}
		}).error(function(data, headers, status, config){
			$ionicLoading.hide();
			console.log(data, headers, status, config)
		})
	}
		// $state.go('PublicRep')

})

.controller('repoViewCtrl', function($scope, $http, $rootScope, $state) {
	console.log($rootScope.repo)
	$scope.repo = $rootScope.repo;
	
})


.controller('followerCtrl', function($scope, $http, $rootScope, $state, $ionicLoading) {
	$scope.followers = $rootScope.followers;

	$scope.tofollower = function(fName) {
		$rootScope.uname = fName;
		var url = 'https://api.github.com/users/' + fName;
		$ionicLoading.show({
			template: 'Loading...'
		});

		$http.get(url)
			.success(function(data, headers, status, config){
				$rootScope.ginfo = data;
				$ionicLoading.hide()
				$state.go('profile')
			})
	}
})

.controller('followingCtrl', function($scope, $http, $rootScope, $state) {
	$scope.followings = $rootScope.following;

	$scope.tofollower = function(fName) {
		$rootScope.uname = fName;

		$ionicLoading.show({
			template: 'Loading...'
		});

		var url = 'https://api.github.com/users/' + fName;

		$http.get(url)
		.success(function(data, headers, status, config){
			$rootScope.ginfo = data;
			$ionicLoading.hide()
			$state.go('profile')
		})
	}
})

.controller('searchviewCtrl', function($scope, $http, $rootScope, $state) {
	$scope.items = $rootScope.sItems;

	$scope.getItemHeight = function(item, index) {
    //Make evenly indexed items be 10px taller, for the sake of example
    return (index % 2) === 0 ? 50 : 60;
  };

  if ($scope.items == undefined) {
  	$state.go('search')
  }
})