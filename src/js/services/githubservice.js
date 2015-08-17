angular.module('MobileGit')

.factory('githubservice', ['$http', 'store', '$cordovaOauth', '$q',
  function ($http, store, $cordovaOauth, $q) {
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
          //TODO: fix
          alert(err)
        };

        if (query) {
          var url = route + '?access_token='+ access_token + '/' + query;
        } else {
          var url = route + '?access_token='+ access_token
        }

        return $http.get(url, {
          timeout: 10000
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
      searchUsers: function(username) {
        var promise = $http.get(baseurl + 'search/users?q=' + username + '&access_token='+ access_token);
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
        return promise;
      },
      getTree: function (fullname) {
        var promise = $ajax.get(baseurl + 'repos/' + fullname + '/contents')
        return promise;
      },
      getStats: function (fullname) {
        var promise = $ajax.get(baseurl + 'repos/' + fullname + '/stats/contributors');
        return promise;
      },
      getCodeView: function (fullname, path) {
        var promise = $ajax.get(baseurl + 'repos/' + fullname + '/contents/' + path);
        return promise;
      },
      getRate: function () {
        var promise = $ajax.get(baseurl + 'rate_limit');
        return promise;
      },
      follow: function(user) {
        var promise = $http.put(baseurl + 'user/following/' + user + '?access_token='+ access_token);
        return promise;
      },
      unfollow: function(user) {
        var promise = $http.delete(baseurl + 'user/following/' + user + '?access_token='+ access_token);
        return promise;
      },
      starred: function(fullname) {
        var promise = $http.get(baseurl + 'user/starred/' + fullname + '?access_token='+ access_token);
        return promise;
      },
      removeStar: function(fullname) {
        var promise = $http.delete(baseurl + 'user/starred/' + fullname + '?access_token='+ access_token);
        return promise;
      },
      addStar: function(fullname) {
        var promise = $http.put(baseurl + 'user/starred/' + fullname + '?access_token='+ access_token);
        return promise;
      },
      amifollowing: function (login) {
        var promise = $http.get(baseurl + 'user/following/' + login + '?access_token='+ access_token);
        return promise;
      },
      getRecievedEvents: function() {
        if (!user.login) return;
        var promise = $http.get(baseurl + 'users/' + user.login + '/received_events?access_token='+ access_token);
        return promise;
      }
    }
  }]);
