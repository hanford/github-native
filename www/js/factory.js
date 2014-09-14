angular.module('factory', ['ionic'])

.factory('githubservice', function($http, $rootScope, $ionicPopup) {
  var baseurl = 'https://api.github.com/';

  var $ajax = {
    get: function(route) {
      var query = '';
      var args = Array.prototype.slice.call(arguments);

      if (args.length > 1) {
        query = '&' + args[1];
      }


      if (window.OAuth) {
        return $http.get(route + '?access_token=' + $rootScope.access_token + query).then(function(response) {
          return response.data;
        }).catch(function(err) {
          console.log(err)
          showAlert = function() {
            var alertPopup = $ionicPopup.alert({
              title: 'Hmmm..',
              template: 'It Looks like something went wrong'
            });
            alertPopup.then(function(res) {

            });
          }
          showAlert()
        })
      } else if ($rootScope.access_token == undefined) {
        return $http.get(route).then(function(response) {
          return response.data;
        }).catch(function(error) {
          alert(error)
        })
      }
    }
  };

  return {
    getPerson: function(uname) {
      var promise = $ajax.get(baseurl + 'users/' + uname)
      return promise;
    },
    getProjects: function(uname) {
      var promise = $ajax.get(baseurl + 'search/repositories', 'q=' + uname)
      return promise;
    },
    getEvents: function(login) {
      var promise = $ajax.get(baseurl + 'users/' + login + '/events');
      return promise;
    },
    userRepo: function(username) {
      var promise = $ajax.get(baseurl + 'users/' + username + '/repos')
      return promise;
    },
    getFollowers: function(username) {
      var promise = $ajax.get(baseurl + 'users/' + username + '/followers')
      return promise;
    },
    getFollowing: function(username) {
      var promise = $ajax.get(baseurl + 'users/' + username + '/following')
      return promise;
    },
    getCommits: function(fullname) {
      var promise = $ajax.get(baseurl + 'repos/' + fullname + '/commits')
      return promise
    },
    getTree: function(fullname) {
      var promise = $ajax.get(baseurl + 'repos/' + fullname + '/contents')
      return promise
    },
    getStats: function(fullname) {
      var promise = $ajax.get(baseurl + 'repos/' + fullname + '/stats/contributors')
      return promise
    },
    getContents: function(fullname, path) {
      var promise = $ajax.get(baseurl + 'repos/' + fullname + '/contents/' + path)
      return promise
    },
    getDir: function(url) {
      var promise = $ajax.get(url)
      return promise
    },
    getRate: function() {
      var promise = $ajax.get(baseurl + 'rate_limit')
      return promise
    }
  }
});