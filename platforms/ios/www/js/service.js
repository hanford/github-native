angular.module('service', [])

.factory('githubservice', function($http, $rootScope) {
	var baseurl = 'https://api.github.com/'
	return {
		getPerson: function(uname) {
			var promise = $http.get(baseurl + 'users/' + uname).then(function(response) {
				return response.data;
			})
			return promise;
		},
		getProjects: function(uname) {
			var promise = $http.get(baseurl + 'search/repositories?q=' + uname).then(function(response) {
				return response.data;
			})
			return promise;
		},
		getEvents: function(login) {
			var promise = $http.get(baseurl + 'users/' + login + '/events').then(function(response) {
				return response.data;
			})
			return promise;
		},
		userRepo: function(username) {
			var promise = $http.get(baseurl + 'users/' + username + '/repos').then(function(response) {
				return response.data;
			})
			return promise;
		},
		getFollowers: function(username) {
			var promise = $http.get(baseurl + 'users/' + username + '/followers').then(function(response) {
				return response.data;
			})
			return promise;
		},
		getFollowing: function(username) {
			var promise = $http.get(baseurl + 'users/' + username + '/following').then(function(response) {
				return response.data;
			})
			return promise;
		},
		getCommits: function(fullname) {
			var promise = $http.get(baseurl + 'repos/' + fullname + '/commits').then(function(response) {
				return response.data
			})
			return promise
		},
		getTree: function(fullname) {
			var promise = $http.get(baseurl + 'repos/' + fullname + '/contents').then(function(response) {
				return response.data
			})
			return promise
		}
	}
});