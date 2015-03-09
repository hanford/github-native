angular.module('MobileGit')

.controller('MainCtrl', ['$ionicNavBarDelegate', '$scope', '$ionicLoading', 'githubservice', '$state', 'store', '$ionicHistory', '$ionicLoading',
  function ($ionicNavBarDelegate, $scope, $ionicLoading, githubservice, $state, store, $ionicHistory, $ionicLoading) {

    // Base Object used in most controllers containing logged in users information along with a few other things
    $scope.flags = {
      user: {},
      access_token: '',
      FromSearch: false,
      repo: {}
    };

    if ($state.current.name == ("search" || "intro")) {
      $ionicNavBarDelegate.showBackButton(false);
    } else {
      $ionicNavBarDelegate.showBackButton(true);
    }

    // Utility function for debugging
    window.flags = function() {
      console.log('flags', $scope.flags)
    };

    if (store.get('access_token') == undefined) {
      $state.go('intro');
    } else {
      $scope.flags.access_token = store.get('access_token');
      $scope.flags.user = store.get('user');
    }

    $ionicNavBarDelegate.showBackButton(true);
    // $scope.open = false;

    // $scope.openOverlay = function() {
    //   $scope.openNav = !$scope.openNav;

    //   var inClass = 'bounceIn';
    //   var outClass = 'bounceOut';

    //   if ($scope.openNav) {
    //     $('.scroll').addClass('blurred');
    //     $('.searchNav').addClass(inClass).removeClass(outClass);
    //     $('.profileNav').addClass(inClass).removeClass(outClass);
    //   } else {
    //     $('.searchNav').removeClass(inClass).addClass(outClass);
    //     $('.profileNav').removeClass(inClass).addClass(outClass);
    //     $('.fading-btn').css({
    //       opacity: 1
    //     });
    //     $('.scroll').removeClass('blurred');
    //   }
    // };

    // $scope.search = function() {
    //   $scope.openOverlay();
    //   $state.go('search');
    // }

    // $scope.myProfie = function() {
    //   $scope.openOverlay();
    //   $state.go('profile');
    // };

    $scope.searchRepos = function(project) {
      $ionicLoading.show({
        template: '<md-progress-circular md-mode="indeterminate"></md-progress-circular>'
      });
      githubservice.getProjects(project).then(function(response) {
        $ionicLoading.hide();
        $scope.repos = response.data.items;
        $ionicNavBarDelegate.showBackButton(true);
        $state.go('searchpage');
      })
    }

    $scope.OtherProfile = function (user) {
      $scope.flags.FromSearch = true;
      $ionicLoading.show({
        template: '<md-progress-circular md-mode="indeterminate"></md-progress-circular>'
      });
      githubservice.getPerson(user).then(function(response) {
        $ionicLoading.hide();
        $scope.otherUser = response;
        $ionicHistory.clearCache();
        $state.go('profile');
      });
    };

    $scope.getRepo = function (repo) {
      $ionicLoading.show({
        template: '<md-progress-circular md-mode="indeterminate"></md-progress-circular>'
      });
      githubservice.getTree(repo).then(function(response) {
        $ionicLoading.hide();
        $scope.flags.repo.fullname = repo;
        $scope.flags.repo.files = response;
        $state.go('repo');
      });
    };

    $scope.formatEvents = function(data) {
      var events = [];
      for (var i = data.length - 1; i >= 0; i--) {
        var instance = {};
        var evt = data[i];
        if (evt.type.indexOf("Event") > -1) {
          var eType = evt.type.substring(0, evt.type.indexOf("Event"));
          instance.type = eType;
        }
        instance.date = evt.created_at;
        instance.repo = evt.repo.name;
        instance.name = evt.actor.login;
        instance.avatar = evt.actor.avatar_url;
        events.push(instance);
      };
      return events;
    }

    // $scope.UpdateUser = function() {
    //   githubservice.getPerson($scope.flags.user.login).then(function(response) {
    //     console.log('updated!')
    //     $ionicHistory.clearCache();
    //     $scope.flags.user = reponse;
    //     store.set('user', reponse)
    //   });
    // }

}])
