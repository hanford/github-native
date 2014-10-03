angular.module('info', [])

.controller('infoCtrl', function($scope, $http, $rootScope, $state, $ionicLoading, githubservice, $ionicNavBarDelegate, store) {
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
    store.remove('access_token');
    store.remove('name');
    store.remove('login');
    console.log('removed storage');
  	$scope.authenticated = false;
  	window.OAuth.clearCache();
  }

  $scope.newAuth = function() {
    OAuth.initialize('DhJ5nGr1cd7KBlGv47FUpYq5goo');
    OAuth.popup('github', {
      cache: true
    }).done(function(result) {
      $scope.authenticated = true;
      result.me()
      .done(function(user_info) {
        if (user_info.name) {
          $state.go('search');
          $rootScope.authname = user_info.name;
          $rootScope.authlogin = user_info.alias;

          store.set('name', $rootScope.authname);
          store.set('login', $rootScope.authlogin);

        } else {

          store.set('name', $rootScope.authlogin);
          store.set('login', $rootScope.authlogin);

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
