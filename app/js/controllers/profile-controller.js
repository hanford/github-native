angular.module('MobileGit')

.controller('profileCtrl', ['$scope', '$rootScope', '$state', '$ionicModal', 'githubservice', '$ionicScrollDelegate', '$ionicNavBarDelegate', 'userservice',
  function($scope, $rootScope, $state, $ionicModal, githubservice, $ionicScrollDelegate, $ionicNavBarDelegate, userservice) {

    var user;
    var notCurrent;

    if ($scope.$parent.flags.FromSearch) { 
      notCurrent = true;
      user = $scope.$parent.otherUser; 
      setUpProfile(user);
    } else {
      notCurrent = false;
      userservice.update();
      userservice.me().then(function(response) {
        user = response.me;
        setUpProfile(user);
      });
    }

    $ionicNavBarDelegate.showBackButton(true);

    function setUpProfile(user) {
      if (user && user.public_repos) {
        $scope.public_repos = parseInt(user.public_repos);
      } else {
        $scope.public_repos = 0;
      }

      $scope.followers = user.followers;
      $scope.company = user.company;
      $scope.followingNumber = user.following;
      $scope.avatar = user.avatar_url;

      if (user && user.blog) {
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

      if ($scope.name == null) {
        $scope.name = user.login;
      }
      getRepos(user);
      events(user);
    }


    $scope.togglefollow = function(login) {
      if ($scope.following === false) {
        $scope.$emit('loading');
        githubservice.follow(login).then(function(response) {
          userservice.update().then(function(response) {
            console.log(response);
            $scope.$emit('done-loading');
            $scope.following = true;
            $scope.half = true;
            $scope.followers++;
            $scope.FollowStatus = 'Unfollow';
          });
        });
        return;
      }

      $scope.$emit('loading');
      githubservice.unfollow(login).then(function(response) {
        userservice.update().then(function(response) {
          console.log(response);
          $scope.$emit('done-loading');
          $scope.following = false;
          $scope.followers--;
          $scope.FollowStatus = 'Follow';
          $scope.half = true;
        });
      })
    };

    // Determines if the current user profile is the authenticated user
    function followStatus() {
      if (notCurrent) {
        githubservice.amifollowing($scope.login).then(function(response) {
          $scope.half = true;
          $scope.following = true;
          $scope.FollowStatus = 'Unfollow';
        }).catch(function(err) {
          $scope.half = true;
          $scope.following = false;
          $scope.FollowStatus = 'Follow';
        })
      }
    };

    followStatus();

    function events(user) {
      githubservice.getEvents($scope.login).then(function(response) {
        $scope.recentEvents = response;
      });
    }

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

    function getRepos(user) {
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
    }

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
