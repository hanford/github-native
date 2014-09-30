angular.module('info', [])

.controller('infoCtrl', function($scope, $http, $rootScope, $state, $ionicLoading, githubservice, $ionicNavBarDelegate) {
  $scope.search = function() {
    $state.go('search')
  }

  $ionicNavBarDelegate.setTitle('Info');

  $scope.personalwebsite = function() {
    var ref = window.open('http://jackhanford.com', '_system');
  }

  $scope.mit = function() {
    var ref = window.open('http://opensource.org/licenses/MIT', '_system');
  }

  $http.get('https://status.github.com/api/status.json').then(function(response) {
    $scope.api = response.data.status;
  })

  $scope.alias = $rootScope.authlogin;

  if ($rootScope.access_token) {
    $scope.authenticated = true;
  } else {
    $scope.authenticated = false;
  }

  $scope.removeAuth = function(OAuth) {
  	$rootScope.access_token = '';
  	$scope.authenticated = false;
  	window.OAuth.clearCache();
  }

  $scope.newAuth = function() {
    OAuth.initialize('DhJ5nGr1cd7KBlGv47FUpYq5goo');
    OAuth.popup('github', {
      cache: true
    }).done(function(result) {
      result.me()
      $scope.authenticated = true
      .done(function(user_info) {
        if (user_info.name) {
          $rootScope.authname = user_info.name;
          $rootScope.authlogin = user_info.alias;
        } else {
          $rootScope.authname = user_info.alias;
          $rootScope.authlogin = user_info.alias;
        }
        $rootScope.access_token = result.access_token
      })
    }).fail(function(error) {
      // alert('Error authenticating!')
    })
  }

  $scope.privacy = function() {
    var ref = window.open('http://jackhanford.com/MobileGit/privacy-policy/', '_blank', 'location=no');
  }

  $scope.rate = false;

  githubservice.getRate().then(function(response) {
    $scope.ratelimit = response.rate.remaining;
  })
})
