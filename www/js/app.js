angular.module('MobGit', ['ionic', 'state', 'factory', 'hljs', 'profile', 'search', 'info', 'commits', 'contents', 'follow', 'intro', 'searchlist', 'treeview'])

.run(function($ionicPlatform, $rootScope, $state, $timeout, $ionicPopup) {
  $ionicPlatform.ready(function() {

    if (window.OAuth) {
      OAuth.initialize('DhJ5nGr1cd7KBlGv47FUpYq5goo')
    }

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
