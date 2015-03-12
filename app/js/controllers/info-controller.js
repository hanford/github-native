angular.module('MobileGit')

.controller('InfoCtrl', ['$scope', '$state', 'githubservice', '$ionicNavBarDelegate', 'store', '$ionicPopup',
  function ($scope, $state, githubservice, $ionicNavBarDelegate, store, $ionicPopup) {

    $scope.personalwebsite = function () {
      var ref = window.open('http://jackhanford.com', '_system');
    };

    $scope.mit = function () {
      var ref = window.open('http://opensource.org/licenses/MIT', '_system');
    };


    // Hack to get bypass some CORS shit
    $.ajax({
      url:"https://www.kimonolabs.com/api/6na25jk0?apikey=t5bx5g73sfMRO5BRMVeABoZT4Ihtpx2F&authorization=8g56ihD7krjSHr2XKZe2dCxwApycO8CJ",
      crossDomain: true,
      dataType: "jsonp",
      beforeSend: function(xhr) { xhr.setRequestHeader('authorization', 'Bearer 8g56ihD7krjSHr2XKZe2dCxwApycO8CJ'); },
      success: function (response) {
        if (response.results && response.results.collection1) {
          $scope.api = response.results.collection1[0].status;
        }
      },
      error: function (xhr, status) {
        console.log(status)
      }
    });

    var user = githubservice.me();
    $scope.alias = user.me.login;

    $scope.version = '1.4';

    $scope.logout = function () {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Are you sure?',
        template: 'You must be signed in to a GitHub account to use this application.'
      });
      confirmPopup.then(function(res) {
        if (res) {
          store.remove('access_token');
          store.remove('user');
          $scope.$parent.close();
          $state.go('intro');
        } else {
          return;
        }
      });
    };

    $scope.privacy = function () {
      var ref = window.open('http://jackhanford.com/MobileGit/privacy-policy/', '_blank', 'location=no');
    };

    githubservice.getRate().then(function (response) {
      if (response && response.rate) {
        $scope.ratelimit = response.rate.remaining;
      }
    });

}])
