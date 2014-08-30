// angular.module('tests', ['ionic', 'state', 'controller', 'service', 'ngMockE2E'])
// .run(function ($rootScope, $state, $location, $stateParams, $httpBackend) {
//     $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {

//     });

//     var person = { 
// 	    login: "jackhanford",
// 	    id: 2148168,
// 	    avatar_url: "https://avatars.githubusercontent.com/u/2148168?v=2",
// 	    gravatar_id: "194e8d62c38b487ec0744d2ccc0931fc",
// 	    url: "https://api.github.com/users/jackhanford",
// 	    avatar_url: "https://avatars.githubusercontent.com/u/2148168?v=2",
// 	    bio: null,
// 	    blog: "http://jackhanford.com/",
// 	    company: "",
// 	    created_at: "2012-08-14T02:52:28Z",
// 	    email: "jackhanford@gmail.com",
// 	    events_url: "https://api.github.com/users/jackhanford/events{/privacy}",
// 	    followers: 5,
// 	    followers_url: "https://api.github.com/users/jackhanford/followers",
// 	    following: 3,
// 	    following_url: "https://api.github.com/users/jackhanford/following{/other_user}",
// 	    gists_url: "https://api.github.com/users/jackhanford/gists{/gist_id}",
// 	    gravatar_id: "194e8d62c38b487ec0744d2ccc0931fc",
// 	    hireable: false,
// 	    html_url: "https://github.com/jackhanford",
// 	    id: 2148168,
// 	    location: "Palo Alto, CA",
// 	    login: "jackhanford",
// 	    name: "Jack Hanford",
// 	    organizations_url: "https://api.github.com/users/jackhanford/orgs",
// 	    public_gists: 2,
// 	    public_repos: 20,
// 	    received_events_url: "https://api.github.com/users/jackhanford/received_events",
// 	    repos_url: "https://api.github.com/users/jackhanford/repos",
// 	    site_admin: false,
// 	    starred_url: "https://api.github.com/users/jackhanford/starred{/owner}{/repo}",
// 	    subscriptions_url: "https://api.github.com/users/jackhanford/subscriptions",
// 	    type: "User",
// 	    updated_at: "2014-08-29T19:32:41Z",
// 	    url: "https://api.github.com/users/jackhanford"
//   	}


//     var baseURL = "https://api.github.com/"
//     debugger
//  		$httpBackend.whenGET(baseURL + 'user/').respond(person);
//     // $httpBackend.whenGET(/app/).passThrough();
// });