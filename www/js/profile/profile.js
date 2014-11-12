angular.module('profile', [])
  .controller('profileCtrl', function($scope, $http, $rootScope, $state, $ionicLoading, $ionicModal, githubservice, $ionicScrollDelegate, $ionicNavBarDelegate, store) {

    if (!$rootScope.ginfo) {
      $state.go('search')
    }

    $ionicNavBarDelegate.setTitle('Profile');

    if ($rootScope.ginfo.public_repos) {
      $scope.pub_count = parseInt($rootScope.ginfo.public_repos);
    }
    $scope.gists = $rootScope.ginfo.public_gists;
    $scope.followers = $rootScope.ginfo.followers;
    $scope.company = $rootScope.ginfo.company;
    // $scope.hireable = $rootScope.ginfo.hireable;

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

    $scope.blogClick = function(blog) {
      mixpanel.track('Personal Website Click')
      var ref = window.open(blog, '_system');
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


    $scope.followUser = function(login) {
      $http.put('https://api.github.com/user/following/' + login + '?access_token=' + $rootScope.access_token).then(function(response) {
        mixpanel.track('Followed User', {
          "followed": login
        });
        $scope.unfollow = true;
        $scope.followers++;
        $scope.notCurrent = false;
        $scope.half = true;
      })
    }

    $scope.unfollowUser = function(login) {
      mixpanel.track('unFollowed User', {
        "unfollowed": login
      });
      $http.delete('https://api.github.com/user/following/' + login + '?access_token=' + $rootScope.access_token).then(function(response) {
        $scope.unfollow = false;
        $scope.half = true;
        $scope.followers--;
        $scope.notCurrent = true;
      })
    }

    var currentUser = store.get('login');
    console.log('LOGIN', currentUser, $scope.login);
    if (currentUser != $scope.login) {
      $http.get('https://api.github.com/user/following/' + $scope.login + '?access_token=' + $rootScope.access_token).then(function(response) {
        console.log('following');
        $scope.half = true;
        $scope.notCurrent = false;
        $scope.unfollow = true;
      }).catch(function(err) {
        $scope.half = true;
        $scope.unfollow = false;
        $scope.notCurrent = true;
        console.log('not following')
      })
    }

    $scope.unfollow = false;

    if ($scope.name == null) {
      $scope.name = $rootScope.ginfo.login;
    }

    githubservice.getEvents($scope.login).then(function(response) {
      $scope.recentEvents = response;
    });

    $ionicModal.fromTemplateUrl('js/modals/recentActivity.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;

      $scope.acitivty = function() {
        mixpanel.track('Recent Activity Modal')
        $scope.modal.show();
      };

      $scope.closeModal = function() {
        $scope.modal.hide();
      }
    });

    githubservice.userRepo($rootScope.uname).then(function(response) {
      var recents = [];
      function sortNumber(a, b) {
        return a.stars - b.stars;
      }
      for (var star in response) {
        var popularRepo = { "stars":  response[star].stargazers_count, "reponame": response[star].full_name, "fork": response[star].fork };
        recents.push(popularRepo)
      }
      recents.sort(sortNumber);
      $scope.pubRepos = recents.reverse();
    })

    $scope.repoinfo = function(popularRepo) {
      mixpanel.track('Repo Click');
      mixpanel.track('Repo Click', {
        "Repo": popularRepo.full_name
      });
      $rootScope.repo = popularRepo;
      $ionicLoading.show({
        template: '<i class="ion-loading-c"></i>'
      });

      githubservice.getTree(popularRepo.full_name).then(function(response) {
        $ionicLoading.hide();
        $state.go('treeview');
        $rootScope.tree = response;
      })
    }


    $scope.bottom = function() {
      $ionicScrollDelegate.scrollBottom(true)
    }

    $scope.toFollowerState = function() {
      mixpanel.track('Click Follower');
      $ionicLoading.show({
        template: '<i class="ion-loading-c"></i>'
      });
      githubservice.getFollowers($rootScope.uname).then(function(response) {
        $ionicLoading.hide();
        $state.go('followers')
        $rootScope.followers = response;
      })
    }

    $scope.toFollowingState = function() {
      mixpanel.track('Click Following');
      $ionicLoading.show({
        template: '<i class="ion-loading-c"></i>'
      });
      githubservice.getFollowing($rootScope.uname).then(function(response) {
        $ionicLoading.hide();
        $state.go('following')
        $rootScope.following = response;
      })
    }
  })
