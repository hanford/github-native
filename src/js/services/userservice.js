angular.module('MobileGit')

.factory('userservice', ['$http', 'store', '$cordovaOauth', 'githubservice', '$q',
  function ($http, store, $cordovaOauth, githubservice, $q) {

    var access_token = store.get('access_token');
    var user = store.get('user');

    return {
      login: function() {
        var deferred = $q.defer();
        var data = {};
        if (user) store.remove('user');
        if (access_token) store.remove('access_token');

        $cordovaOauth.github('5ceeb35418106a4caf27', '737851deaa4c8bf6148c1776958c905f05e80a3d', ['user', 'repo']).then(function (result) {
          data.access_token = result.access_token;
          store.set('access_token', data.access_token);
          $http.get('https://api.github.com/user?access_token=' + data.access_token).success(function (user) {
            data.me = user;
            store.set('user', data.me);
            deferred.resolve(data);
          }).error(function (err) {
            console.log(err);
          });
        }, function (err) {
          console.log(err);
        }); 
        return deferred.promise;
      },
      me: function() {
        var deferred = $q.defer();
        if (user && access_token) {
          var data = {};
          data.me = user;
          data.access_token = access_token;
          deferred.resolve(data);
        } else {
          deferred.reject(false);
        }
        return deferred.promise;
      },
      update: function() {
        var deferred = $q.defer();
        githubservice.getPerson(user.login).then(function(response) { 
          store.set('user', response);
          deferred.resolve(response);
        });
        return deferred.promise;
      },
      logout: function() {
        var deferred = $q.defer();
          store.remove('user');
          store.remove('access_token');
          deferred.resolve();
        return deferred.promise;
      }
    }
}])
