angular.module('GithubService', ['ionic',  'angular-storage'])

.factory('githubservice', ['$http', '$ionicPopup', '$state', 'store',
  function ($http, $ionicPopup, $state, store) {
    var baseurl = 'https://api.github.com/';
    var access_token = store.get('access_token');
    var user = store.get('user');

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
            template: 'It looks like something went wrong'
          });
        };

        if (query) {
          var url = route + '?access_token='+ access_token + '/' + query;
        } else {
          var url = route + '?access_token='+ access_token
        }

        return $http.get(url, {
          timeout: 5000
        }).then(function (response) {
          return response.data;
        }).catch(function (err) {
          showAlert();
        });
      }
    };

    return {
      getPerson: function (username) { 
        var promise = $ajax.get(baseurl + 'users/' + username);
        return promise;
      },
      getProjects: function (project) {
        var promise = $http.get(baseurl + 'search/repositories?q=' + project);
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
      getCodeView: function (fullname, path) {
        var promise = $ajax.get(baseurl + 'repos/' + fullname + '/contents/' + path);
        return promise
      },
      getRate: function () {
        var promise = $ajax.get(baseurl + 'rate_limit');
        return promise
      },
      amifollowing: function (login) {
        var promise = $http.get(baseurl + 'user/following/' + login + '?access_token='+ access_token);
        return promise
      },
      getRecievedEvents: function() {
        var promise = $http.get(baseurl + 'users/' + user.login + '/received_events?access_token='+ access_token);
        return promise
      }
    }
}]);
