angular.module('factory', ['ionic'])

.factory('githubservice', function ($http, $rootScope, $ionicPopup, $state) {
  var baseurl = 'https://api.github.com/';

  var $ajax = {
    get: function (route) {
      var query = '';
      var args = Array.prototype.slice.call(arguments);

      if (args.length > 1) {
        query = '&' + args[1];
      }

      showAlert = function (err) {
        var alertPopup = $ionicPopup.alert({
          title: 'Hmm..',
          template: 'It looks like something went wrong' + err
        });
        alertPopup.then(function (res) {
          $state.go('info');
        });
      }

      return $http.get(route + '?access_token=' + $rootScope.access_token + query, {
        timeout: 5000
      }).then(function (response) {
        console.log(response.data);
        return response.data;
      }).catch(function (err) {
        showAlert();
      });
    }
  };

  return {
    getPerson: function (uname) {
      var promise = $ajax.get(baseurl + 'users/' + uname);
      return promise;
    },
    getProjects: function (uname) {
      var promise = $ajax.get(baseurl + 'search/repositories', 'q=' + uname);
      return promise;
    },
    getEvents: function (login) {
      var promise = $ajax.get(baseurl + 'users/' + login + '/events');
      return promise;
    },
    userRepo: function (username) {
      var promise = $ajax.get(baseurl + 'users/' + username + '/repos');
      return promise;
    },
    getFollowers: function (username) {
      var promise = $ajax.get(baseurl + 'users/' + username + '/followers');
      return promise;
    },
    getFollowing: function (username) {
      var promise = $ajax.get(baseurl + 'users/' + username + '/following');
      return promise;
    },
    getCommits: function (fullname) {
      var promise = $ajax.get(baseurl + 'repos/' + fullname + '/commits');
      return promise
    },
    getTree: function (fullname) {
      var promise = $ajax.get(baseurl + 'repos/' + fullname + '/contents')
      return promise
    },
    getStats: function (fullname) {
      var promise = $ajax.get(baseurl + 'repos/' + fullname + '/stats/contributors');
      return promise
    },
    getContents: function (fullname, path) {
      var promise = $ajax.get(baseurl + 'repos/' + fullname + '/contents/' + path);
      return promise
    },
    getRate: function () {
      var promise = $ajax.get(baseurl + 'rate_limit');
      return promise
    }
  }
});
