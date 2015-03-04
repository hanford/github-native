angular.module('MobileGit')

.controller('InfoCtrl', ['$scope', '$http', '$state', 'githubservice', '$ionicNavBarDelegate', 'store', '$ionicPopup', '$timeout',
  function ($scope, $http, $state, githubservice, $ionicNavBarDelegate, store, $ionicPopup, $timeout) {

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

    $scope.version = '1.4';

    $scope.logout = function () {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Are you sure?',
        template: 'You must be signed in to a GitHub account to use this application.'
      });
      confirmPopup.then(function(res) {
        if(res) {
          store.remove('access_token');
          store.remove('user');
          $scope.$parent.CloseModal();
          $state.go('intro');
        } else {
          return
        }
      });
    };

    $scope.privacy = function () {
      var ref = window.open('http://jackhanford.com/MobileGit/privacy-policy/', '_blank', 'location=no');
    };

    githubservice.getRate().then(function (response) {
      $scope.ratelimit = response.rate.remaining;
    });

}])
