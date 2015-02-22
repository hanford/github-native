angular.module('project', [])

.controller('projectCtrl', function($scope, $http, $rootScope, $state, $ionicLoading, $ionicModal, githubservice, $ionicScrollDelegate, $timeout) {
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
    $http.put(starURL).then(function(response) {
      $scope.starred = true;
      console.log(response.status);
    })
  };

  $scope.unstar = function(fullname) {
    $http.delete(starURL).then(function(response) {
      $scope.starred = false;
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

  $ionicModal.fromTemplateUrl('./templates/modals/contributors.html', {
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

})
