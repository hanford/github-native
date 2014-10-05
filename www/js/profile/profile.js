angular.module('profile', [])
  .controller('profileCtrl', function($scope, $http, $rootScope, $state, $ionicLoading, $ionicModal, githubservice, $ionicScrollDelegate, $ionicNavBarDelegate) {

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
    console.log('LOGIN BULLSHIT', $rootScope.authlogin, $scope.login);

    $scope.followuser = function(login) {
      $http.put('https://api.github.com/user/following/' + login + '?access_token=' + $rootScope.access_token).then(function(response) {
        $scope.unfollow = true;
        $scope.followers++;
        $scope.notCurrent = false;
      })
    }

    $scope.unfollowUser = function(login) {
      $http.delete('https://api.github.com/user/following/' + login + '?access_token=' + $rootScope.access_token).then(function(response) {
        $scope.unfollow = false;
        $scope.followers--;
        $scope.notCurrent = true;
      })
    }

    if ($rootScope.authlogin != $scope.login) {
      $http.get('https://api.github.com/user/following/' + $scope.login + '?access_token=' + $rootScope.access_token).then(function(response) {
        console.log('following')
        $scope.notCurrent = false;
        $scope.unfollow = true;
      }).catch(function(err) {
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

      $scope.recent = function(recentEvent) {
        console.log(JSON.stringify(recentEvent))
          // $ionicLoading.show({
          //   template: '<i class="ion-loading-c"></i>'
          // });
          // githubservice.getTree(full_name).then(function(response) {
          //   $ionicLoading.hide();
          //   $state.go('treeview')
          //   $rootScope.tree = response;
          // });
      }

      $scope.closeModal = function() {
        $scope.modal.hide();
      }
    });

    githubservice.userRepo($rootScope.uname).then(function(response) {
      $scope.popularRepos = response;
    })

    $scope.repoinfo = function(popularRepo) {
      mixpanel.track('Repo Click');
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
