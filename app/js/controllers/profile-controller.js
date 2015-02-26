angular.module('MobileGit')

.controller('profileCtrl', ['$scope', '$http', '$rootScope', '$state', '$ionicLoading', '$ionicModal', 'githubservice', '$ionicScrollDelegate', '$ionicNavBarDelegate', 'store', '$timeout',
  function($scope, $http, $rootScope, $state, $ionicLoading, $ionicModal, githubservice, $ionicScrollDelegate, $ionicNavBarDelegate, store, $timeout) {

    if (!$rootScope.ginfo) {
      $state.go('search')
    }

    debugger

    $timeout(function() {
      $ionicNavBarDelegate.showBackButton(true);
    }, 0)

    if ($rootScope.ginfo.public_repos) {
      $scope.pub_count = parseInt($rootScope.ginfo.public_repos);
    } else {
      $scope.pub_count = 0;
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


    $scope.togglefollow = function(login) {

      if ($scope.unfollow == false) {
        $scope.FollowStatus = 'Follow';
        $http.delete('https://api.github.com/user/following/' + login + '?access_token=' + $rootScope.access_token).then(function(response) {
          $scope.unfollow = false;
          $scope.half = true;
          console.log('follow');
          $scope.followers--;
          $scope.notCurrent = true;
        })
        return
      }

      $http.put('https://api.github.com/user/following/' + login + '?access_token=' + $rootScope.access_token).then(function(response) {
        $scope.unfollow = true;
        console.log('unfollow');
        $scope.followers++;
        $scope.FollowStatus = 'Unfollow';
        $scope.notCurrent = false;
        $scope.half = true;
      })
    };

    var currentUser = store.get('login');
    console.log('LOGIN', currentUser, $scope.login);
    if (currentUser != $scope.login) {
      $http.get('https://api.github.com/user/following/' + $scope.login + '?access_token=' + $rootScope.access_token).then(function(response) {
        console.log('following');
        $scope.half = true;
        $scope.notCurrent = false;
        $scope.FollowStatus = 'Unfollow';
        $scope.unfollow = true;
      }).catch(function(err) {
        $scope.half = true;
        $scope.unfollow = false;
        $scope.notCurrent = true;
        $scope.FollowStatus = 'Follow';
        console.log('not following');
      })
    }

    $scope.unfollow = false;

    if ($scope.name == null) {
      $scope.name = $rootScope.ginfo.login;
    }

    githubservice.getEvents($scope.login).then(function(response) {
      $scope.recentEvents = response;
    });

    $ionicModal.fromTemplateUrl('./dist/js/templates/modals/recentActivity.html', {
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

    githubservice.userRepo($rootScope.uname).then(function(repo) {
      var recents = [];
      for (var star in repo) {
        var popularRepo = { "stars":  repo[star].stargazers_count, "full_name": repo[star].full_name, "fork": repo[star].fork };
        recents.push(popularRepo)
      }

      function sortNumber(a, b) {
        return a.stars - b.stars;
      }


      recents.sort(sortNumber);
      $scope.popularRepos = recents.reverse();
    })

    $scope.repoinfo = function(fullname) {
      mixpanel.track('Repo Click', {
        "Repo": fullname
      });
      $rootScope.repo = fullname;
      $ionicLoading.show({
        template: '<i class="ion-loading-c"></i>'
      });

      console.log(fullname)
      githubservice.getTree(fullname).then(function(response) {
        $ionicLoading.hide();
        $state.go('project');
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
        $rootScope.followers = response;
        $state.go('followers');
      })
    }

    $scope.toFollowingState = function() {
      mixpanel.track('Click Following');
      $ionicLoading.show({
        template: '<i class="ion-loading-c"></i>'
      });
      githubservice.getFollowing($rootScope.uname).then(function(response) {
        $ionicLoading.hide();
        $rootScope.following = response;
        $state.go('following');
      })
    }
}])
