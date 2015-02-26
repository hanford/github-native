angular.module('MobileGit')

.controller('infoCtrl', ['$scope', '$http', '$rootScope', '$state', 'githubservice', '$ionicNavBarDelegate', 'store', '$cordovaOauth',
  function ($scope, $http, $rootScope, $state, githubservice, $ionicNavBarDelegate, store, $cordovaOauth) {

    $ionicNavBarDelegate.showBackButton(true);

    $scope.personalwebsite = function () {
      var ref = window.open('http://jackhanford.com', '_system');
    };

    $scope.mit = function () {
      var ref = window.open('http://opensource.org/licenses/MIT', '_system');
    };

    $http.get('https://status.github.com/api/status.json').then(function (response) {
      $scope.api = response.data.status;
    });

    $scope.alias = $scope.$parent.flags.user.login;

    if ($scope.$parent.flags.access_token) {
      $scope.authenticated = true;
    } else {
      $scope.authenticated = false;
    }

    $scope.removeAuth = function (OAuth) {
      store.remove('access_token');
      store.remove('user');
      $scope.authenticated = false;
      $state.go('intro');
    };

    $scope.privacy = function () {
      var ref = window.open('http://jackhanford.com/MobileGit/privacy-policy/', '_blank', 'location=no');
    };

    githubservice.getRate().then(function (response) {
      $scope.ratelimit = response.rate.remaining;
    });

}])
