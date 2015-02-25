angular.module('MobileGit', ['ionic', 'ngMaterial', 'GithubService', 'profile', 'search', 'info', 'commits', 'codeView', 'follow', 'intro', 'searchlist', 'project', 'rotator', 'mainCtrl', 'angular-storage', 'ngCordovaOauth'])

.run(function ($ionicPlatform, $rootScope, $state, $timeout, $ionicPopup) {
  $ionicPlatform.ready(function () {
    window.addEventListener('load', function () {
      FastClick.attach(document.body);
    }, false);

    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  })
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('search', {
      url: "/search",
      controller: 'searchCtrl',
      templateUrl: "./dist/js/templates/search.html"
    })
    .state('searchpage', {
      url: "/list",
      templateUrl: "./dist/js/templates/searchpage.html",
      controller: 'searchviewCtrl'
    })
    .state('profile', {
      url: "/profile",
      templateUrl: "./dist/js/templates/profile.html",
      controller: 'profileCtrl'
    })
    .state('followers', {
      url: "/followers",
      templateUrl: "./dist/js/templates/followers.html",
      controller: 'followerCtrl'
    })
    .state('following', {
      url: "/following",
      templateUrl: "./dist/js/templates/following.html",
      controller: 'followingCtrl'
    })
    .state('commits', {
      url: "/commits",
      templateUrl: "./dist/js/templates/commits.html",
      controller: 'commitsCtrl'
    })
    .state('project', {
      url: "/project",
      templateUrl: "./dist/js/templates/project.html",
      controller: 'projectCtrl'
    })
    .state('info', {
      url: "/info",
      templateUrl: "./dist/js/templates/info.html",
      controller: 'infoCtrl'
    })
    .state('codeView', {
      url: "/codeview",
      templateUrl: "./dist/js/templates/code-view.html",
      controller: 'codeViewCtrl'
    })
    .state('intro', {
      url: "/intro",
      templateUrl: "./dist/js/templates/intro.html",
      controller: 'introCtrl'
    })
    
  $urlRouterProvider.otherwise("/intro");
})

angular.module('mainCtrl', [])

.controller('mainCtrl', ['$ionicNavBarDelegate', '$scope', '$rootScope', '$ionicLoading', 'githubservice', '$state',
  function ($ionicNavBarDelegate, $scope, $rootScope, $ionicLoading, githubservice, $state) {
    $ionicNavBarDelegate.showBackButton(true);
    $scope.open = false;

   $scope.$on('infoCtrlLoaded', function() {
    $scope.hideNavBttns = true;
   });

  $scope.$on('showNavBttns', function() {
    $scope.hideNavBttns = false;
   })

    $scope.openOverlay = function() {
      $scope.openNav = !$scope.openNav;

      var inClass = 'bounceIn';
      var outClass = 'bounceOut';

      if ($scope.openNav) {
        $('.scroll').addClass('blurred');
        $('.searchNav').addClass(inClass).removeClass(outClass);
        $('.profileNav').addClass(inClass).removeClass(outClass);
      } else {
        $('.searchNav').removeClass(inClass).addClass(outClass);
        $('.profileNav').removeClass(inClass).addClass(outClass);
        $('.fading-btn').css({
          opacity: 1
        });
        $('.scroll').removeClass('blurred');
      }
    };

    $scope.search = function() {
      $scope.openOverlay();
      $state.go('search');
    }

    $scope.myProfie = function() {
      mixpanel.track('Search User', {
        "User": $rootScope.authlogin
      });
      console.log('tracked ' + $rootScope.authlogin);
      $rootScope.uname = $rootScope.authlogin;
      $ionicLoading.show({
        template: '<i class="ion-loading-c"></i>'
      });
      // console.log('jaquéré');
      githubservice.getPerson($rootScope.authlogin).then(function(response) {
        $ionicLoading.hide();
        $rootScope.showBack = true;
        $rootScope.ginfo = response;
        $scope.openOverlay();
        $state.go('profile');
      });
    };

    if ($rootScope.access_token == undefined) {
      $state.go('intro')
    }

}])

angular.module('codeView', [])

.controller('codeViewCtrl', ['$scope', '$rootScope', '$state', '$timeout', '$ionicNavBarDelegate', 
  function ($scope, $rootScope, $state, $timeout, $ionicNavBarDelegate) {
    $scope.code = $rootScope.code;
    $scope.path = $rootScope.path;
    $ionicNavBarDelegate.title($rootScope.path);
    console.log($scope.code);

    var ext = $scope.path.split('.').pop();
    var extName = 'shell';

    if (ext === 'js') {
      extName = 'javascript';
    } else if (ext === 'html') {
      extName = 'htmlmixed';
    }

    // var code = $scope.code.replace(/\s{2}/g, '\t');

    $timeout(function() {
      var doc = CodeMirror.Doc($scope.code, extName);

      var editor = CodeMirror.fromTextArea(document.querySelector('.code-merr'), {
        readOnly: 'nocursor',
        lineNumbers: true,
        mode: extName,
        theme: 'monokai',
        fixedGutter: false,
        indentWithTabs: true,
        indentSize: 2,
        flattenSpans: false,
        smartIndent: false,
        styleActiveLine: true,
        extraKeys: {
          "Tab": function(cm) {
            cm.replaceSelection("   ", "end");
          }
        }
      });

      editor.swapDoc(doc);
    }, 0);

    if (!$rootScope.code) {
      $state.go('search')
    }
}])

angular.module('commits', [])

.controller('commitsCtrl', ['$scope', '$rootScope', '$state', '$ionicNavBarDelegate',
  function ($scope, $rootScope, $state, $ionicNavBarDelegate) {
    $scope.commits = $rootScope.commits;
    $ionicNavBarDelegate.title('Commits')

    if ($scope.commits == undefined) {
      $state.go('search')
    }
}])
angular.module('follow', [])

.controller('followerCtrl', ['$scope', '$http', '$rootScope', '$state', '$ionicLoading', '$ionicNavBarDelegate', '$ionicHistory',
  function ($scope, $http, $rootScope, $state, $ionicLoading, $ionicNavBarDelegate, $ionicHistory) {
    console.log('enter follower ctrl', $rootScope.followers);
    $scope.followers = $rootScope.followers;
    $scope.search = '';
    
    $scope.toFollower = function(fName) {
      $rootScope.uname = fName;

      var url = 'https://api.github.com/users/' + fName + '?access_token=' + $rootScope.access_token;;

      $ionicLoading.show({
        template: '<i class="ion-loading-c"></i>'
      });

      $http.get(url).success(function(data, headers, status, config) {
        $rootScope.ginfo = data;
        $ionicLoading.hide();
        $ionicHistory.clearCache();
        console.log('leave  to ', data);
        $state.go('profile');
      }).error(function(data, headers, status, config) {
        console.log(data, headers, status)
      });
    };
}])

.controller('followingCtrl', ['$scope', '$http', '$rootScope', '$state', '$ionicLoading', '$ionicNavBarDelegate', '$ionicHistory',
  function ($scope, $http, $rootScope, $state, $ionicLoading, $ionicNavBarDelegate, $ionicHistory) {
    $scope.followings = $rootScope.following;
    $scope.search = '';
    
    $scope.toFollower = function(fName) {
      $rootScope.uname = fName;

      $ionicLoading.show({
        template: '<i class="ion-loading-c"></i>'
      });

      var url = 'https://api.github.com/users/' + fName + '?access_token=' + $rootScope.access_token;

      $http.get(url).success(function(data, headers, status, config) {
        $rootScope.ginfo = data;
        $ionicLoading.hide();
        $ionicHistory.clearCache();
        console.log('leave  to ', data);
        $state.go('profile')
      })
    };
}])

angular.module('info', [])

.controller('infoCtrl', ['$scope', '$http', '$rootScope', '$state',' githubservice', '$ionicNavBarDelegate', 'store', '$cordovaOauth',
  function ($scope, $http, $rootScope, $state, githubservice, $ionicNavBarDelegate, store, $cordovaOauth) {

    $ionicNavBarDelegate.showBackButton(true);

    $scope.personalwebsite = function () {
      var ref = window.open('http://jackhanford.com', '_system');
    };

    $scope.mit = function () {
      var ref = window.open('http://opensource.org/licenses/MIT', '_system');
    };

    $http.get('https://status.github.com/api/status.json').then(function (response) {
      $scope.api = response.data.status;
    });

    $scope.alias = $rootScope.authlogin;

    if ($rootScope.access_token) {
      $scope.authenticated = true;
    } else {
      $scope.authenticated = false;
    }

    $scope.removeAuth = function (OAuth) {
      mixpanel.track('Removed Authentication');
      $rootScope.access_token = '';
      store.remove('access_token');
      store.remove('name');
      store.remove('login');
      console.log('removed storage');
      $scope.authenticated = false;
    };

    $scope.authMe = function () {
      $cordovaOauth.github('5ceeb35418106a4caf27', '737851deaa4c8bf6148c1776958c905f05e80a3d', ['user', 'repo']).then(function (result) {
        $rootScope.access_token = result.access_token;
        store.set('access_token', result.access_token);
        var userURL = 'https://api.github.com/user?access_token=' + result.access_token;
        console.log(userURL)
        $http.get(userURL).success(function (data) {

          if (data.name) {
            $rootScope.authname = data.name;
          } else {
            $rootScope.authname = data.login;
          }

          $rootScope.authlogin = data.login;

          store.set('name', $rootScope.authname);
          store.set('login', $rootScope.authlogin);

          $scope.authlogin = true;

          $state.go('search');
        }).error(function (data, status) {
          console.log(data)

        })
      }, function (error) {
        console.log(error);
      })
    };

    $scope.privacy = function () {
      var ref = window.open('http://jackhanford.com/MobileGit/privacy-policy/', '_blank', 'location=no');
    };

    githubservice.getRate().then(function (response) {
      $scope.ratelimit = response.rate.remaining;
    });

}])

angular.module('intro', [])

.controller('introCtrl', ['$scope', '$rootScope', '$state', '$ionicNavBarDelegate', 'store', '$cordovaOauth', '$http', '$timeout',
  function ($scope, $rootScope, $state, $ionicNavBarDelegate, store, $cordovaOauth, $http, $timeout) {

  if ($rootScope.access_token) {
    $state.go('search');
  }

  $scope.$emit('infoCtrlLoaded');

  $scope.hideNavBttns = true;

  $timeout(function(){
    $ionicNavBarDelegate.title('Welcome!');
    $ionicNavBarDelegate.showBackButton(false);
  }, 500);

  if (store.get('access_token') && store.get('name')) {
    $scope.name = store.get('name');
    $scope.previousUser = function () {
      mixpanel.track('Returning User');
      $rootScope.access_token = store.get('access_token');
      $rootScope.authname = store.get('name');
      $rootScope.authlogin = store.get('login');
      $scope.authenticated = true;
      $scope.authlogin = true;
      $scope.showBck = true;
      $scope.$emit('showNavBttns');
      $state.go('search');
    }
  }

  $scope.authMe = function () {
    $cordovaOauth.github('5ceeb35418106a4caf27', '737851deaa4c8bf6148c1776958c905f05e80a3d', ['user', 'repo']).then(function (result) {
      $rootScope.access_token = result.access_token;
      store.set('access_token', result.access_token);
      var userURL = 'https://api.github.com/user?access_token=' + result.access_token;
      console.log(userURL);

      $http.get(userURL).success(function (data) {
        if (data.name) {
          $rootScope.authname = data.name;
          store.set('name', $rootScope.authname);
        } else {
          $rootScope.authname = data.login;
        }
        $rootScope.authlogin = data.login;
        store.set('login', $rootScope.authlogin);
        $scope.authlogin = true;
        $scope.$emit('showNavBttns');
        $state.go('search');

      }).error(function (err) {
        console.log(err)
      })
    }, function (error) {
      console.log('Error! ' + error);
    })
  };

}])

angular.module('profile', [])
  .controller('profileCtrl', ['$scope', '$http', '$rootScope', '$state', '$ionicLoading', '$ionicModal', 'githubservice', '$ionicScrollDelegate', '$ionicNavBarDelegate', 'store', '$timeout',
    function($scope, $http, $rootScope, $state, $ionicLoading, $ionicModal, githubservice, $ionicScrollDelegate, $ionicNavBarDelegate, store, $timeout) {

      if (!$rootScope.ginfo) {
        $state.go('search')
      }

      $timeout(function() {
        $ionicNavBarDelegate.showBackButton(true);
      }, 0)

      if ($rootScope.ginfo.public_repos) {
        $scope.pub_count = parseInt($rootScope.ginfo.public_repos);
      } else {
        $scope.pub_count = 0;
      }

      $scope.gists = $rootScope.ginfo.public_gists;
      $scope.followers = $rootScope.ginfo.followers;
      $scope.company = $rootScope.ginfo.company;
      // $scope.hireable = $rootScope.ginfo.hireable;

      var created = $rootScope.ginfo.created_at;
      $scope.created_at = created.substring(0, 10);

      $scope.following = $rootScope.ginfo.following;
      $scope.ava = $rootScope.ginfo.avatar_url;

      if ($rootScope.ginfo.blog) {
        $scope.hideLink = false;
        $scope.blog = $rootScope.ginfo.blog;
      } else {
        $scope.hideLink = true;
      }

      $scope.blogClick = function(blog) {
        mixpanel.track('Personal Website Click')
        var ref = window.open(blog, '_system');
      }

      if ($rootScope.ginfo.location) {
        $scope.hideLocation = false;
        $scope.location = $rootScope.ginfo.location;
      } else {
        $scope.hideLocation = true;
      }

      $scope.name = $rootScope.ginfo.name;
      $scope.id = $rootScope.ginfo.id;
      $scope.login = $rootScope.ginfo.login;


      $scope.togglefollow = function(login) {
        console.log('clicked', login);
        // unfollow
        if ($scope.unfollow == false) {
          $scope.FollowStatus = 'Follow';
          $http.delete('https://api.github.com/user/following/' + login + '?access_token=' + $rootScope.access_token).then(function(response) {
            $scope.unfollow = false;
            $scope.half = true;
            console.log('follow');
            $scope.followers--;
            $scope.notCurrent = true;
          })
          return;
        }

        $http.put('https://api.github.com/user/following/' + login + '?access_token=' + $rootScope.access_token).then(function(response) {
          $scope.unfollow = true;
          console.log('unfollow');
          $scope.followers++;
          $scope.FollowStatus = 'Unfollow';
          $scope.notCurrent = false;
          $scope.half = true;
        })
      };

      var currentUser = store.get('login');
      console.log('LOGIN', currentUser, $scope.login);
      if (currentUser != $scope.login) {
        $http.get('https://api.github.com/user/following/' + $scope.login + '?access_token=' + $rootScope.access_token).then(function(response) {
          console.log('following');
          $scope.half = true;
          $scope.notCurrent = false;
          $scope.FollowStatus = 'Unfollow';
          $scope.unfollow = true;
        }).catch(function(err) {
          $scope.half = true;
          $scope.unfollow = false;
          $scope.FollowStatus = 'Follow';
          $scope.notCurrent = true;
          console.log('not following');
        })
      }

      $scope.unfollow = false;

      if ($scope.name == null) {
        $scope.name = $rootScope.ginfo.login;
      }

      githubservice.getEvents($scope.login).then(function(response) {
        $scope.recentEvents = response;
      });

      $ionicModal.fromTemplateUrl('js/templates/modals/recentActivity.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal = modal;

        $scope.acitivty = function() {
          mixpanel.track('Recent Activity Modal')
          $scope.modal.show();
        };

        $scope.closeModal = function() {
          $scope.modal.hide();
        }
      });

      githubservice.userRepo($rootScope.uname).then(function(repo) {
        var recents = [];
        for (var star in repo) {
          var popularRepo = { "stars":  repo[star].stargazers_count, "full_name": repo[star].full_name, "fork": repo[star].fork };
          recents.push(popularRepo)
        }

        function sortNumber(a, b) {
          return a.stars - b.stars;
        }


        recents.sort(sortNumber);
        $scope.popularRepos = recents.reverse();
      })

      $scope.repoinfo = function(fullname) {
        mixpanel.track('Repo Click', {
          "Repo": fullname
        });
        $rootScope.repo = fullname;
        $ionicLoading.show({
          template: '<i class="ion-loading-c"></i>'
        });

        console.log(fullname)
        githubservice.getTree(fullname).then(function(response) {
          $ionicLoading.hide();
          $state.go('project');
          $rootScope.tree = response;
        })
      }


      $scope.bottom = function() {
        $ionicScrollDelegate.scrollBottom(true)
      }

      $scope.toFollowerState = function() {
        mixpanel.track('Click Follower');
        $ionicLoading.show({
          template: '<i class="ion-loading-c"></i>'
        });
        githubservice.getFollowers($rootScope.uname).then(function(response) {
          $ionicLoading.hide();
          $rootScope.followers = response;
          $state.go('followers');
        })
      }

      $scope.toFollowingState = function() {
        mixpanel.track('Click Following');
        $ionicLoading.show({
          template: '<i class="ion-loading-c"></i>'
        });
        githubservice.getFollowing($rootScope.uname).then(function(response) {
          $ionicLoading.hide();
          $rootScope.following = response;
          $state.go('following');
        })
      }
}])

angular.module('project', [])

.controller('projectCtrl', ['$scope', '$http', '$rootScope', '$state', '$ionicLoading', '$ionicModal', 'githubservice', '$ionicScrollDelegate', '$timeout',
  function ($scope, $http, $rootScope, $state, $ionicLoading, $ionicModal, githubservice, $ionicScrollDelegate, $timeout) {
    $scope.repo = $rootScope.repo;
    $scope.search = "";

    if ($rootScope.repo && !$rootScope.repo.full_name) {
      var fullname = $rootScope.repo;
      // Scope variable for navbar title
      $scope.fullname = $rootScope.repo;
    } else {
      var fullname = $rootScope.repo.full_name;
      // Scope variable for navbar title
      $scope.fullname = $rootScope.repo.full_name;
    }

    $scope.items = $rootScope.tree;
    console.log($scope.items);

    if ($rootScope.repo == undefined) {
      $state.go('search');
    } else if ($rootScope.tree == undefined) {
      $state.go('search');
    }

    githubservice.getCommits(fullname).then(function(response) {
      $scope.commits = response.length;
    });

    githubservice.getReadme(fullname).then(function(response) {
      if (response.content) {
        $scope.hasReadMe = true;
        $scope.name = response.name;
        // I don't understand why I have to atob a base64 string, but it's working .. 
        document.getElementById('mdown').innerHTML = marked(atob(response.content.replace(/\s/g, '')));
      } else {
        $scope.hasReadMe = false;
      }
    });

    $scope.collapse = function() {
      $timeout(function(){
        $('.readme-box').css('max-height', 'none');
        $scope.hideCol = true;
      }, 0)
    };


    githubservice.getStats(fullname);

    githubservice.getStats(fullname).then(function(response) {
      $scope.contributors = response.length + ' Contributors';
    });

    var starURL = 'https://api.github.com/user/starred/' + fullname + '?access_token=' + $rootScope.access_token;

    $http.get(starURL).success(function(data, status) {
      $scope.starred = true;
    }).error(function(data, status) {
      $scope.starred = false;
    })

    $scope.starme = function(fullname) {
      if ($scope.starred == true) {
        $http.delete(starURL).then(function(response) {
          $scope.starred = false;
        });
        return;
      };

      $http.put(starURL).then(function(response) {
        $scope.starred = true;
        console.log(response.status);
      })
    };

    $scope.openFile = function(file) {
      $scope.hasReadMe = false;
      $ionicLoading.show({
        template: '<i class="ion-loading-c"></i>'
      });
      githubservice.getCodeView(fullname, file.path).then(function(response) {
        if (file.type == 'file') {
          $ionicLoading.hide();
          $rootScope.path = file.path;
          $rootScope.code = atob(response.content.replace(/\s/g, ''))
          $state.go('codeView');
        } else {
          $ionicLoading.hide();
          $scope.items = response;
          $ionicScrollDelegate.scrollTop(true);
        }
      })
    };

    $scope.branch = function() {
      var ref = window.open('https://github.com/' + fullname + '?files=1', '_blank', 'location=no');
    };

    $ionicModal.fromTemplateUrl('js/templates/modals/contributors.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;

      $scope.contribs = function() {
        $scope.modal.show();
        githubservice.getStats(fullname).then(function(response) {
          console.log(response)
          $scope.contributors = response;
        })
      };

      $scope.closeModal = function() {
        $scope.modal.hide();
      };

      $scope.toContrib = function(login) {
        $rootScope.uname = login;
        var url = 'https://api.github.com/users/' + login;
        $ionicLoading.show({
          template: '<i class="ion-loading-c"></i>'
        });
        $http.get(url).success(function(data, headers, status, config) {
          $rootScope.ginfo = data;
          $ionicLoading.hide();
          $scope.modal.hide();
          $state.go('profile')
        }).error(function(data, headers, status, config) {
          console.log(data, headers, status)
        });
      }
    });

    if (!$scope.items) {
      $state.go('search');
    };

}])

angular.module('search', [])

.controller('searchCtrl', ['$scope', '$rootScope', '$state', '$ionicLoading', 'githubservice', '$timeout', '$ionicNavBarDelegate', '$http', '$ionicHistory',
  function ($scope, $rootScope, $state, $ionicLoading, githubservice, $timeout, $ionicNavBarDelegate, $http, $ionicHistory) {
    $timeout(function() {
      if ($rootScope.authname) {
        $scope.authname = $rootScope.authname;
      } else {
        $scope.authname = $rootScope.authalias;
      }
    }, 2000);

    $ionicHistory.clearHistory();
    $ionicNavBarDelegate.showBackButton(false);

    $scope.searchProject = function(uname) {
      mixpanel.track('Search Project', {
        "Project": uname
      });
      $rootScope.uname = uname;
      $ionicLoading.show({
        template: '<i class="ion-loading-c"></i>'
      });
      githubservice.getProjects(uname).then(function(response) {
        $ionicLoading.hide();
        $rootScope.sItems = response.items;
        $state.go('searchpage');
        $ionicHistory.clearCache();
      })
    }

    $scope.searchUser = function(uname) {
      mixpanel.track('Search User', {
        "User": uname
      });
      console.log('tracked ' + uname);
      $rootScope.uname = uname;
      $ionicLoading.show({
        template: '<i class="ion-loading-c"></i>'
      });
      // console.log('jaquéré');
      githubservice.getPerson(uname).then(function(response) {
        $ionicLoading.hide();
        $rootScope.showBack = true;
        $rootScope.ginfo = response;
        $state.go('profile');
        $ionicHistory.clearCache();
      });
    };

    $scope.info = function() {
      mixpanel.track('Info State');
      $rootScope.showBack = true;
      $state.go('info')
    };

}])

angular.module('searchlist', [])

.controller('searchviewCtrl', ['$scope', '$rootScope', '$state', '$ionicLoading', 'githubservice',
  function ($scope, $rootScope, $state, $ionicLoading, githubservice) {
    $scope.items = $rootScope.sItems;
    $scope.search = "";

    $scope.gotoTree = function(item) {
      mixpanel.track('Project Click', {
        "Project": item.full_name
      });
      $rootScope.repo = item;
      $ionicLoading.show({
        template: '<i class="ion-loading-c"></i>'
      });

      githubservice.getTree(item.full_name).then(function(response) {
        $rootScope.tree = response;
        $ionicLoading.hide();
        $state.go('project')
      })
    }

    if ($scope.items == undefined) {
      $state.go('search')
    }
}])

angular.module('rotator', [])

.directive('rotator', ['$timeout', function($timeout) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      console.log('rot');
      element.toggled = false;
      var hammertime = new Hammer(element.parent()[0]);

      var pfx = ["webkit", "o", ""];
      function listenTo(element, type, callback) {
        for (var p = 0; p < pfx.length; p++) {
          if (!pfx[p]) type = type.toLowerCase();;
          element.addEventListener(pfx[p]+type, callback, false);
        }
      }

      function toggleRotation() {
        var toggled = element.toggled;
        var rot = 'rotate(' + (toggled ? '180deg' : '45deg') + ')';

        console.log(rot);

        element.css({
          transform: rot,
          '-webkit-transform': rot
        });

        if (toggled) {
          setTimeout(function() {
            console.log('anim end');
            element.css({
              transition: 'none',
              '-webkit-transition': 'none'
            });

            element[0].offsetWidth = element[0].offsetWidth;

            element.css({
              transform: 'rotate(0)',
              '-webkit-transform': 'rotate(0)'
            });

            $timeout(function() {
              element.css({
                transition: 'transform .25s ease-out',
                '-webkit-transition': '-webkit-transform .35s ease-out' 
              });
            }, 0);
          }, 350);
        }
        element.toggled = !toggled;
      }

      hammertime.on('tap', toggleRotation);
    }
  };
}]);
angular.module('GithubService', ['ionic'])

.factory('githubservice', ['$http', '$rootScope', '$ionicPopup', '$state',
  function ($http, $rootScope, $ionicPopup, $state) {
    var baseurl = 'https://api.github.com/';

    var $ajax = {
      get: function (route) {
        var query = '';
        var args = Array.prototype.slice.call(arguments);

        if (args.length > 1) {
          query = '&' + args[1];
        }

        // showAlert = function (err) {
        //   var alertPopup = $ionicPopup.alert({
        //     title: 'Hmm..',
        //     template: 'It looks like something went wrong'
        //   });
        // };

        return $http.get(route + '?access_token=' + $rootScope.access_token + query, {
          timeout: 5000
        }).then(function (response) {
          console.log(response.data);
          return response.data;
        }).catch(function (err) {
          // showAlert();
        });
      }
    };

    return {
      getPerson: function (uname) {
        var promise = $ajax.get(baseurl + 'users/' + uname);
        return promise;
      },
      getProjects: function (uname) {
        var promise = $ajax.get(baseurl + 'search/repositories', 'q=' + uname);
        return promise;
      },
      getEvents: function (login) {
        var promise = $ajax.get(baseurl + 'users/' + login + '/events');
        return promise;
      },
      userRepo: function (username) {
        var promise = $ajax.get(baseurl + 'users/' + username + '/repos');
        return promise;
      },
      getFollowers: function (username) {
        var promise = $ajax.get(baseurl + 'users/' + username + '/followers');
        return promise;
      },
      getFollowing: function (username) {
        var promise = $ajax.get(baseurl + 'users/' + username + '/following');
        return promise;
      },
      getCommits: function (fullname) {
        var promise = $ajax.get(baseurl + 'repos/' + fullname + '/commits');
        return promise
      },
      getTree: function (fullname) {
        var promise = $ajax.get(baseurl + 'repos/' + fullname + '/contents')
        return promise
      },
      getStats: function (fullname) {
        var promise = $ajax.get(baseurl + 'repos/' + fullname + '/stats/contributors');
        return promise
      },
      getReadme: function (fullname) {
        var promise = $ajax.get(baseurl + 'repos/' + fullname + '/readme');
        return promise
      },
      getCodeView: function (fullname, path) {
        var promise = $ajax.get(baseurl + 'repos/' + fullname + '/contents/' + path);
        return promise
      },
      getRate: function () {
        var promise = $ajax.get(baseurl + 'rate_limit');
        return promise
      }
    }
}]);
