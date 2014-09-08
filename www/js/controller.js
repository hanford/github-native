angular.module('controller', [])

.controller('searchCtrl', function($scope, $http, $rootScope, $state, $ionicLoading, githubservice, $timeout) {
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

	$timeout(function(){
		if ($rootScope.authname) {
			$scope.authname
		} else {
			$scope.authname = $rootScope.authalias;
		}
	}, 750)

	$rootScope.ginfo;

	$scope.uname = '';

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
		$rootScope.repo = popularRepo;
		$ionicLoading.show({
			template: 'Loading...'
		});

		githubservice.getTree(popularRepo.full_name).then(function(response){
			$ionicLoading.hide();
			$state.go('treeview')
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
			$state.go('treeview')
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

	$ionicModal.fromTemplateUrl('search-modal.html', {
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

		$scope.code = function(fullname) {
			githubservice.getTree(fullname).then(function(response){
				$rootScope.repo = { default_branch: "master" }
				$state.go('treeview')
				$rootScope.tree = response;
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

.controller('treeCtrl', function($scope, $http, $rootScope, $state, $ionicLoading, $ionicModal, githubservice) {
	$scope.repo = $rootScope.repo;
	$scope.branch = $scope.repo.default_branch;

	if ($rootScope.tree.tree) {
		$scope.items = $rootScope.tree.tree;
	} else {
		$scope.items = $rootScope.tree
	}

	if($scope.branch == undefined) {
		$state.go('search')
	} else if ($rootScope.repo == undefined) {
		$state.go('search')
	} else if ($rootScope.tree == undefined) {
		$state.go('search')
	}

	githubservice.getCommits($scope.repo.full_name).then(function(response) {
		$scope.commits = response.length;
	})

	githubservice.getStats($scope.repo.full_name).then(function(response) {
		console.log('first call for for contribs')
	})

	$scope.file = function(item) {
		if (item.type == "file") {
			githubservice.getCode($scope.repo.full_name, item.path).then(function(response) {
				console.log(response.content)
				$rootScope.code = atob(response.content.replace(/\s/g, ''))
				$state.go('code')
			})
		} else if (item.type == "dir") {
			var url = item.git_url;
			console.log(url)
			githubservice.getDir(url).then(function(response) {
				console.log(response)
				$rootScope.nesteddir = response.tree;
				$state.go('nestedview')
			})
		}
	}


	$ionicModal.fromTemplateUrl('contribs.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modal = modal;

		$scope.contribs = function() {
			$scope.modal.show();
			githubservice.getStats($scope.repo.full_name).then(function(response) {
				$scope.contributors = response;
			})
		};
		$scope.closeModal = function() {
			$scope.modal.hide();
		}
	});


	console.log($scope.items, $scope.repo)

	if (!$scope.items) {
		$state.go('search')
	}
})

.controller('infoCtrl', function($scope, $http, $rootScope, $state, $ionicLoading, githubservice) {
	$scope.search = function() {
		$state.go('search')
	}

	$scope.alias = $rootScope.authlogin;


	if ($rootScope.access_token) {
		$scope.authenticated = 'Yes'
	} else {
		$scope.authenticated = 'No'
	}

	// $scope.removeAuth = function(OAuth) {
	// 	$rootScope.access_token = '';
	// 	$scope.authenticated = 'No'	
	// 	$rootScope.meFun();
	// }

	$scope.newAuth = function() {
		OAuth.initialize('DhJ5nGr1cd7KBlGv47FUpYq5goo');
		OAuth.popup('github', {
			cache: true
		}).done(function (result) {
			$rootScope.access_token = result.access_token;
		}).fail(function (error) {
			alert('Error authenticating!')
		})
	}

	$scope.rate = false;

	githubservice.getRate().then(function(response) {
		$scope.rate = true;
		$scope.ratelimit = response.rate.remaining;
	})
})

.controller('codeCtrl', function($scope, $http, $rootScope, $state, $ionicLoading, githubservice, $timeout) {
	$scope.code = $rootScope.code;
	hljs.initHighlightingOnLoad();

	if (!$rootScope.code) {
		$state.go('search')
	}
})
.controller('nestedviewCtrl', function($scope, $http, $rootScope, $state, $ionicLoading, githubservice, $timeout) {
	$scope.items = $rootScope.nesteddir;

	if (!$scope.items) {
		$state.go('search')
	}

	$scope.file = function(item) {
		console.log(item)
		if (item.type == "tree") {
			var url = item.url;
			githubservice.getDir(url).then(function(response) {
				console.log(response)
				$rootScope.tree = response;
				$state.go('treeview')
			})
		} else if (item.type == "blob") {
			githubservice.getCode($rootScope.repo.full_name, item.path).then(function(response) {
				console.log(response.content)
				debugger
				$rootScope.code = atob(response.content.replace(/\s/g, ''))
				$state.go('code')
			})
		}
	}
})