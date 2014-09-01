// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('MobGit', ['ionic', 'state', 'controller', 'service'])

.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {

		// OAuth.initialize('DhJ5nGr1cd7KBlGv47FUpYq5goo');
		// OAuth.popup('github')
		// .done(function (result) {
		// 		// https://github.com/login/oauth/
		// 		$rootScope.access_token = result.access_token;
  //     })
		// .fail(function (error) {
  //       alert(error)
  //     })

		if(window.StatusBar) {
			StatusBar.styleDefault();
		}
	})
})
