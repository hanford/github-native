angular.module('controller', [])

.controller('searchCtrl', function($scope, $http, $rootScope, $state, $ionicLoading, githubservice) {
	$rootScope.count;
	if ($rootScope.count < 0) {
		if (navigator.splashscreen) {
			navigator.splashscreen.show();
			setTimeout(function() {
				navigator.splashscreen.hide();
			}, 5000)
			$rootScope.count++
		}
	}

	$rootScope.ginfo;

	$scope.uname = "jackhanford";

	$scope.searchProject	= function(uname) {
		$ionicLoading.show({
			template: 'Loading...'
		});
		githubservice.getProjects(uname).then(function(response) {
			console.log(response)
			$ionicLoading.hide();
			$rootScope.sItems = response.items;
			$state.go('searchlist')
		})
	}

	$scope.searchUser	= function(uname) {
		$rootScope.uname = uname;
		$ionicLoading.show({
			template: 'Loading...'
		});
		githubservice.getPerson(uname).then(function(response) {
			$ionicLoading.hide();
			$rootScope.ginfo = response;
			console.log(response)
			$state.go('profile')
		})
	}

	$scope.info = function() {
		$state.go('info')
	}
})

.controller('profileCtrl', function($scope, $http, $rootScope, $state, $ionicLoading, $ionicModal, githubservice) {
	if (!$rootScope.ginfo) {
		$state.go('search')
	}
	$scope.pub_count = $rootScope.ginfo.public_repos;
	$scope.gists = $rootScope.ginfo.public_gists;
	$scope.followers = $rootScope.ginfo.followers;
	$scope.company = $rootScope.ginfo.company;
	$scope.hireable = $rootScope.ginfo.hireable;

	var created = $rootScope.ginfo.created_at;
	$scope.created_at = created.substring(0, 10);

	$scope.following = $rootScope.ginfo.following;
	$scope.ava = $rootScope.ginfo.avatar_url;

	if ($rootScope.ginfo.blog) {
		$scope.hideLink = false;
		$scope.blog = $rootScope.ginfo.blog;
	} else {
		$scope.hideLink = true;
	}

	if ($rootScope.ginfo.location) {
		$scope.hideLocation = false;
		$scope.location = $rootScope.ginfo.location;
	} else {
		$scope.hideLocation = true;
	}

	$scope.name = $rootScope.ginfo.name;
	$scope.id = $rootScope.ginfo.id;
	$scope.login = $rootScope.ginfo.login;

	if ($scope.name == null ) {
		$scope.name = $rootScope.ginfo.login;
	}

	githubservice.getEvents($scope.login).then(function(response) {
		$scope.recentEvents = response;
	});

	$ionicModal.fromTemplateUrl('activity.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modal = modal;

		$scope.acitivty = function() {
			$scope.modal.show();
		};
		$scope.closeModal = function() {
			$scope.modal.hide();
		}
	});

	githubservice.userRepo($rootScope.uname).then(function(response) {
		$scope.popularRepos = response;
	})

	$scope.repoinfo = function(popularRepo) {
		$ionicLoading.show({
			template: 'Loading...'
		});

		githubservice.getTree(popularRepo.full_name).then(function(response){
			$ionicLoading.hide();
			$state.go('codeview')
			$rootScope.tree = response;
		})
	}

	$scope.toFollowerState = function () {
		$ionicLoading.show({
			template: 'Loading...'
		});
		githubservice.getFollowers($rootScope.uname).then(function(response){
			$ionicLoading.hide();
			$state.go('followers')
			debugger
			$rootScope.followers = response;
		})
	}

	$scope.toFollowingState = function () {
		$ionicLoading.show({
			template: 'Loading...'
		});
		githubservice.getFollowing($rootScope.uname).then(function(response){
			$ionicLoading.hide();
			$state.go('following')
			$rootScope.following = response;
		})
	}
})


.controller('repoCtrl', function($scope, $http, $rootScope, $state, $ionicLoading) {
	$scope.reps = $rootScope.publicReps;

	if ($scope.reps == null) {
		$state.go('search')
	}

	$scope.select = function(rep) {
		$ionicLoading.show({
			template: 'Loading...'
		});

		var url = "https://api.github.com/repos/" + $rootScope.uname + '/' + rep.name; 
		$http.get(url)
		.success(function(data, headers, status, config){
			$rootScope.repo = data;
			$ionicLoading.hide();
			$state.go('PublicRep')
		}).error(function(data, headers, status, config){
			$ionicLoading.hide();
			console.log(data, headers, status, config)
		})
	}
		// $state.go('PublicRep')

	})

.controller('repoViewCtrl', function($scope, $http, $rootScope, $state, githubservice) {
	console.log($rootScope.repo)
	var updated = $rootScope.repo.updated_at;
	$scope.updated = updated.substring(0, 10);
	$scope.repo = $rootScope.repo;

	$scope.recentActivity = function (repo) {
		$scope.repo = repo;
		githubservice.getCommits(repo).then(function(response){
			$state.go('commits')
			$rootScope.commits = response;
		})
	}

	$scope.seeTree = function(fullname) {
		githubservice.getTree(fullname).then(function(response){
			$state.go('codeview')
			$rootScope.tree = response;
		})
	}
	
})


.controller('followerCtrl', function($scope, $http, $rootScope, $state, $ionicLoading) {
	$scope.followers = $rootScope.followers;

	$scope.toFollower = function(fName) {
		$rootScope.uname = fName;

		var url = 'https://api.github.com/users/' + fName;

		console.log(url)

		$ionicLoading.show({
			template: 'Loading...'
		});

		$http.get(url)
		.success(function(data, headers, status, config){
			$rootScope.ginfo = data;
			$ionicLoading.hide()
			$state.go('profile')
		}).error(function(data, headers, status, config) {
			console.log(data, headers, status)
		});
	}
})

.controller('followingCtrl', function($scope, $http, $rootScope, $state, $ionicLoading) {
	$scope.followings = $rootScope.following;

	$scope.toFollower = function(fName) {
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

.controller('searchviewCtrl', function($scope, $http, $rootScope, $state, $ionicLoading, $ionicModal, githubservice) {
	$scope.items = $rootScope.sItems;

	console.log($scope.items)

	$ionicModal.fromTemplateUrl('my-modal.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modal = modal;

		$scope.commits = function(fullname) {
			githubservice.getCommits(fullname).then(function(response){
				$rootScope.commits = response;
				$scope.modal.hide();
				$state.go('commits')
			})
		}

		$scope.owner = function(login) {
			$rootScope.uname = login
			githubservice.getPerson(login).then(function(response) {
				$scope.modal.hide();
				$rootScope.ginfo = response;
				$state.go('profile')
			})
		}
	});

	$scope.openModal = function(item) {
		$scope.name = item.name;
		$scope.starcount = item.stargazers_count;
		$scope.login = item.owner.login;
		$scope.description = item.description;
		$scope.fullname = item.full_name;
		$scope.language = item.language;
		$scope.forks = item.forks;
		$scope.modal.show();
	};
	$scope.closeModal = function() {
		$scope.modal.hide();
	};

	if ($scope.items == undefined) {
		$state.go('search')
	}
})

.controller('commitsCtrl', function($scope, $http, $rootScope, $state, $ionicLoading) {
	$scope.commits = $rootScope.commits;

	if ($scope.commits == undefined) {
		$state.go('search')
	}
})

.controller('treeCtrl', function($scope, $http, $rootScope, $state, $ionicLoading, githubservice) {
	$scope.repo = $rootScope.repo;
	$scope.items = $rootScope.tree;

	// githubservice.getCommits($scope.repo.full_name).then(function(response) {
		// $scope.commits = response.length;
	// })

console.log($scope.items, $scope.repo)

if (!$scope.items) {
	$state.go('search')
}
})

.controller('infoCtrl', function($scope, $http, $rootScope, $state, $ionicLoading, githubservice) {
	$scope.search = function() {
		$state.go('search')
	}


	if ($rootScope.access_token) {
		$scope.authenticated = 'Yes'
	} else {
		$scope.authenticated = 'No'
	}

	$scope.removeAuth = function(OAuth) {
		window.OAuth == false;
		debugger
		// $http.get('http://api.github.com/authorizations').success(function(data){
		// });
}

$scope.newAuth = function() {
	OAuth.initialize('DhJ5nGr1cd7KBlGv47FUpYq5goo');
	debugger
	OAuth.popup('github', {
		cache: true
	})
	.done(function (result) {
		console.log('accesstoken' + result.access_token)
		$rootScope.access_token = result.access_token;
	})
	.fail(function (error) {
		$state.go('info')
	})
		// $http.get('http://api.github.com/authorizations').success(function(data){
		// });
}

githubservice.getRate().then(function(response) {
	$scope.hiderate = false
	$scope.ratelimit = response.rate.remaining;
})
})

