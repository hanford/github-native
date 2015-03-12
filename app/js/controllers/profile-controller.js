angular.module('MobileGit')

.controller('profileCtrl', ['$scope', '$rootScope', '$state', '$ionicModal', 'githubservice', '$ionicScrollDelegate', '$ionicNavBarDelegate', 'store',
  function($scope, $rootScope, $state, $ionicModal, githubservice, $ionicScrollDelegate, $ionicNavBarDelegate, store) {

    var user;
    var current;

    if ($scope.$parent.flags.FromSearch) { 
      notCurrent = true;
      user = $scope.$parent.otherUser; 
    } else {
      notCurrent = false;
      user = githubservice.me().me;
    }

    $ionicNavBarDelegate.showBackButton(true);

    if (user.public_repos) {
      $scope.public_repos = parseInt(user.public_repos);
    } else {
      $scope.public_repos = 0;
    }

    $scope.update = function() {
      githubservice.getPerson($scope.login).then(function(response) {
        $scope.$broadcast('scroll.refreshComplete');
        user = response;
        $scope.followers = user.followers;
        $scope.company = user.company;
        $scope.following = user.following;
      });
    }

    $scope.followers = user.followers;
    $scope.company = user.company;
    $scope.following = user.following;
    $scope.avatar = user.avatar_url;

    if (user.blog) {
      $scope.hideLink = false;
      $scope.blog = user.blog;
    } else {
      $scope.hideLink = true;
    }

    $scope.blogClick = function(blog) {
      var ref = window.open(blog, '_system');
    }

    if (user.location) {
      $scope.hideLocation = false;
      $scope.location = user.location;
    } else {
      $scope.hideLocation = true;
    }

    $scope.name = user.name;
    $scope.id = user.id;
    $scope.login = user.login;


    $scope.togglefollow = function(login) {
      if ($scope.unfollow == true) {
        $scope.$emit('loading');
        githubservice.follow(login).then(function(response) {
          $scope.$emit('done-loading');
          $scope.unfollow = false;
          $scope.half = true;
          $scope.followers--;
          $scope.FollowStatus = 'Follow';
          $scope.notCurrent = true;
        });
        return;
      }
      $scope.$emit('loading');
      githubservice.unfollow(login).then(function(response) {
        $scope.$emit('done-loading');
        $scope.unfollow = true;
        $scope.followers++;
        $scope.FollowStatus = 'Unfollow';
        $scope.notCurrent = false;
        $scope.half = true;
      })
    };

    // Determines if the current user profile is the authenticated user
    function followStatus() {
      if (notCurrent) {
        githubservice.amifollowing($scope.login).then(function(response) {
          $scope.half = true;
          $scope.notCurrent = false;
          $scope.unfollow = true;
          $scope.FollowStatus = 'Unfollow';
        }).catch(function(err) {
          $scope.half = true;
          $scope.unfollow = false;
          $scope.notCurrent = true;
          $scope.FollowStatus = 'Follow';
        })
      }
    };

    followStatus();

    if ($scope.name == null) {
      $scope.name = user.login;
    }

    githubservice.getEvents($scope.login).then(function(response) {
      $scope.recentEvents = response;
    });

    $ionicModal.fromTemplateUrl('./dist/js/templates/modals/recent-activity.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;

      $scope.activity = function() {
        $scope.modal.show();
      };

      $scope.closeModal = function() {
        $scope.modal.hide();
      }
    });

    githubservice.userRepo(user.login).then(function(repo) {
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

    $scope.gotoTree = function(repo) {
      $scope.$parent.getRepo(repo);
    };

    $scope.bottom = function() {
      $ionicScrollDelegate.scrollBottom(true)
    }

    $scope.toFollowerState = function() {
      $scope.$emit('loading');
      githubservice.getFollowers(user.login).then(function(response) {
        $scope.$emit('done-loading');
        $rootScope.followers = response;
        $state.go('followers');
      })
    }

    $scope.toFollowingState = function() {
      $scope.$emit('loading');
      githubservice.getFollowing(user.login).then(function(response) {
        $scope.$emit('done-loading');
        $rootScope.following = response;
        $state.go('following');
      })
    }
}])
