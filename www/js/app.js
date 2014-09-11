angular.module('MobGit', ['ionic', 'state', 'controller', 'factory', 'hljs'])

.run(function($ionicPlatform, $rootScope, $state, $timeout, $ionicPopup) {
  $ionicPlatform.ready(function() {

    OAuth.initialize('DhJ5nGr1cd7KBlGv47FUpYq5goo')

    $timeout(function() {
      if (!$rootScope.access_token) {
        $rootScope.showBack = false
        $state.go('intro')
      } else {
        $rootScope.showBack = true
        $state.go('search')
      }
    }, 500)

    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  })
})