angular.module('MobileGit')

.controller('profileCtrl', ['$scope', '$state', '$ionicModal', 'githubservice', '$ionicScrollDelegate', '$ionicNavBarDelegate', 'userservice', '$stateParams',
  function($scope, $state, $ionicModal, githubservice, $ionicScrollDelegate, $ionicNavBarDelegate, userservice, $stateParams) {

    $ionicNavBarDelegate.showBackButton(true);

    var notCurrent, me, user;
    var userName = $stateParams.login;

    userservice.me().then(function(response) {
      me = response.me;
    })

    githubservice.getPerson(userName).then(function(response) {

      if (userName != me.login) {
        notCurrent = true;
        user = response;
        setUpProfile(user);
      } else {
        userservice.update().then(function(response) {
          user = response;
          notCurrent = false;
          setUpProfile(user);
        });
      }
    })

    function setUpProfile(user) {
      $scope.$emit('done-loading');
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
      followStatus();
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

    $scope.gotoTree = function(repoName) {
      $scope.$emit('loading');
      $state.go('repo', {name: repoName})
    };

    $scope.bottom = function() {
      $ionicScrollDelegate.scrollBottom(true)
    }

    $scope.toFollowerState = function() {
      $scope.$emit('loading');
      $state.go('followers', {login: user.login})
    }

    $scope.toFollowingState = function() {
      $scope.$emit('loading');
      $state.go('following', {login: user.login});
    }
}])
