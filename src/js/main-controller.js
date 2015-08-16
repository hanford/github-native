angular.module('MobileGit')

.controller('MainCtrl', ['$ionicNavBarDelegate', '$scope', '$ionicLoading', 'githubservice', '$state', 'store', '$ionicHistory', '$ionicLoading', '$timeout', 'userservice',
  function ($ionicNavBarDelegate, $scope, $ionicLoading, githubservice, $state, store, $ionicHistory, $ionicLoading, $timeout, userservice) {
    var user = userservice.me();

    // Base Object used in most controllers containing logged in users information along with a few other things
    $scope.flags = {
      access_token: '',
      repo: {},
      code: {}
    };

    if ($state.current.name == ("search" || "intro")) {
      $ionicNavBarDelegate.showBackButton(false);
    } else {
      $ionicNavBarDelegate.showBackButton(true);
    }

    $scope.$on('loading', function() {
      $ionicLoading.show({
        template: '<ion-spinner icon="ripple" class="spinner"></ion-spinner>'
      })
    });

    $scope.$on('done-loading', function() {
      $ionicLoading.hide();
    })

    // Utility function for debugging
    window.flags = function() {
      console.log('flags', $scope.flags)
    };

    $ionicNavBarDelegate.showBackButton(true);


    $scope.formatEvents = function(data) {
      var events = [];
      $scope.flags.loading = true;
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
    };

}])
