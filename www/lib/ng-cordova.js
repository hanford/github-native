angular.module('ngCordova', [
  'ngCordova.plugins'
]);
angular.module('ngCordova.plugins.network', [])

.factory('$cordovaNetwork', [function () {

  return {

    getNetwork: function () {
      return navigator.connection.type;
    },

    isOnline: function () {
      var networkState = navigator.connection.type;
      return networkState !== Connection.UNKNOWN && networkState !== Connection.NONE;
    },

    isOffline: function () {
      var networkState = navigator.connection.type;
      return networkState === Connection.UNKNOWN || networkState === Connection.NONE;
    }
  }
}]);
angular.module('ngCordova.plugins.splashscreen', [])

.factory('$cordovaSplashscreen', [ function () {

  return {
    hide: function () {
      return navigator.splashscreen.hide();
    },

    show: function () {
      return navigator.splashscreen.show();
    }
  };

}]);
