angular.module('test', ['ui.router', 'controller', 'state', 'ngMockE2E'])
.run(function ($rootScope, $state, $location, $stateParams, $httpBackend) {
	$rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
		
	});



	$httpBackend.whenGET('https://api.github.com/users/').respond(console.log('got'));
  });