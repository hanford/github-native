/*
 * Cordova AngularJS Oauth
 *
 * Created by Nic Raboy
 * http://www.nraboy.com
 */

(function () {

  angular.module("ngCordovaOauth", []).factory('$cordovaOauth', ['$q', '$http', function ($q, $http) {

    return {

      github: function (clientId, clientSecret, appScope) {
        var deferred = $q.defer();
        var browserRef = window.open('https://github.com/login/oauth/authorize?client_id=' + clientId + '&redirect_uri=http://localhost/callback&scope=' + appScope.join(","), '_blank', 'location=no,clearsessioncache=yes,clearcache=yes');
        browserRef.addEventListener('loadstart', function (event) {
          if ((event.url).indexOf("http://localhost/callback") === 0) {
            requestToken = (event.url).split("code=")[1];
            $http.defaults.headers.post['Content-Type'] = 'application/json'; //x-www-form-urlencoded';
            $http.defaults.headers.post.accept = 'application/json';
            // IP
            $http.post('http://pure-hollows-7935.herokuapp.com/github/auth_token', {
                data: { //'https://github.com/login/oauth/access_token', {
                  client_id: clientId,
                  client_secret: clientSecret,
                  redirect_uri: 'http://localhost/callback',
                  code: requestToken
                }
              }).success(function (data) {
                deferred.resolve(data);
              })
              .error(function (data, status) {
                deferred.reject(data);
              })
            browserRef.close();
          }
        });
        return deferred.promise;
      }
    };

    }]);

})();
