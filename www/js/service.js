angular.module('service', [])

.factory('githubservice', function($http, $rootScope) {
	var baseurl = 'https://api.github.com/'
	return {
		getPerson: function(uname) {
			var promise = $http.get(baseurl + 'users/' + uname).then(function(response) {
				if (response.status == 403) {
					alert('Rate Limit')
				}
				return response.data;
			})
			return promise;
		},
		getProjects: function(uname) {
			var promise = $http.get(baseurl + 'search/repositories?q=' + uname).then(function(response) {
				if (response.status == 403) {
					alert('Rate Limit')
				}
				return response.data;
			})
			return promise;
		},
		getEvents: function(login) {
			var promise = $http.get(baseurl + 'users/' + login + '/events').then(function(response) {
				if (response.status == 403) {
					alert('Rate Limit')
				}
				return response.data;
			})
			return promise;
		},
		userRepo: function(username) {
			var promise = $http.get(baseurl + 'users/' + username + '/repos').then(function(response) {
				if (response.status == 403) {
					alert('Rate Limit')
				}
				return response.data;
			})
			return promise;
		},
		getFollowers: function(username) {
			var promise = $http.get(baseurl + 'users/' + username + '/followers').then(function(response) {
				if (response.status == 403) {
					alert('Rate Limit')
				}
				return response.data;
			})
			return promise;
		},
		getFollowing: function(username) {
			var promise = $http.get(baseurl + 'users/' + username + '/following').then(function(response) {
				if (response.status == 403) {
					alert('Rate Limit')
				}
				return response.data;
			})
			return promise;
		},
		getCommits: function(fullname) {
			debugger
			var promise = $http.get(baseurl + 'repos/' + fullname + '/commits').then(function(response) {
				if (response.status == 403) {
					alert('Rate Limit')
				}
				return response.data
			})
			return promise
		}
	}
});