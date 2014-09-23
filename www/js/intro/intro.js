angular.module('intro', [])

.controller('introCtrl', function($scope, $http, $rootScope, $state, $ionicLoading, $ionicNavBarDelegate) {

  if ($rootScope.access_token) {
    $state.go('search')
  }

  $ionicNavBarDelegate.setTitle('Welcome!');

  $scope.authme = function() {
    OAuth.popup('github', {
      cache: true
    }).done(function(result) {
      $rootScope.access_token = result.access_token;
      result.me().done(function(user_info) {
        console.log(user_info)
        if (user_info.name) {
          $state.go('search')
          $rootScope.authname = user_info.name;
          $rootScope.authlogin = user_info.alias;
        } else {
          $rootScope.authname = user_info.alias;
          $rootScope.authlogin = user_info.alias;
        }
      }).fail(function(error) {
        // alert(error)
      })
    }).fail(function(error) {
      // alert(error)
    })
  }

})
