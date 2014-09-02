angular.module('service', [])

.factory('githubservice', function($http, $rootScope) {
	var baseurl = 'https://api.github.com/';

  var $ajax = {
  	get: function(route) {
  		var query = '';
  		var args = Array.prototype.slice.call(arguments);

  		if (args.length > 1) {
  			console.log(args)
  			query = '&' + args[1];
  		}

  		console.log(args, $rootScope.access_token);

  		return $http.get(route + '?access_token=' + $rootScope.access_token + query).then(function(response) {
				return response.data;
			});
  	}
  };

	return {
		getPerson: function(uname) {
			var promise = $ajax.get(baseurl + 'users/' + uname)
			return promise;
		},
		getProjects: function(uname) {
			var promise = $ajax.get(baseurl + 'search/repositories', 'q=' + uname)
			return promise;
		},
		getEvents: function(login) {
			var promise = $ajax.get(baseurl + 'users/' + login + '/events');
			return promise;
		},
		userRepo: function(username) {
			var promise = $ajax.get(baseurl + 'users/' + username + '/repos')
			return promise;
		},
		getFollowers: function(username) {
			var promise = $ajax.get(baseurl + 'users/' + username + '/followers')
			return promise;
		},
		getFollowing: function(username) {
			var promise = $ajax.get(baseurl + 'users/' + username + '/following')
			return promise;
		},
		getCommits: function(fullname) {
			var promise = $ajax.get(baseurl + 'repos/' + fullname + '/commits')
			return promise
		},
		getTree: function(fullname) {
			var promise = $ajax.get(baseurl + 'repos/' + fullname + '/contents')
			return promise
		},
		getRate: function() {
			var promise = $ajax.get(baseurl + 'rate_limit')
			return promise
		}
	}
});