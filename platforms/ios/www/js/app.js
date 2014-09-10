angular.module('MobGit', ['ionic', 'state', 'controller', 'factory', 'hljs', 'ngCordova.plugins.network'])

.run(function($ionicPlatform, $rootScope, $state, $timeout, $cordovaNetwork, $ionicPopup) {
	$ionicPlatform.ready(function() {

		console.log($cordovaNetwork.isOffline())

		// if ($cordovaNetwork.isOffline() == true) {
		// 	showAlert = function() {
		// 		var alertPopup = $ionicPopup.alert({
		// 			title: 'Network Required',
		// 			template: 'To use this Application you must first make sure you have access to the internet!'
		// 		});
		// 		alertPopup.then(function(res) {

		// 		});
		// 	}
		// 	showAlert()
		// 	alert('no internet!')
		// }

		OAuth.initialize('DhJ5nGr1cd7KBlGv47FUpYq5goo')

		$timeout(function(){
			if(!$rootScope.access_token) {
				$rootScope.showBack = false
				$state.go('intro')
			} else {
				$rootScope.showBack = true
				$state.go('search')
			}
		}, 500)

		if(window.StatusBar) {
			StatusBar.styleDefault();
		}
	})
})
