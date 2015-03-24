angular.module('MobileGit')

.controller('RepoCtrl', ['$scope', '$state', '$ionicModal', 'githubservice', '$ionicScrollDelegate', '$stateParams',
  function ($scope, $state, $ionicModal, githubservice, $ionicScrollDelegate, $stateParams) {

    var name = $stateParams.name;

    githubservice.getTree(name).then(function(response) {
      $scope.$emit('done-loading');
      $scope.files = response;
    });

    $scope.search = "";
    $scope.fullname = name;

    githubservice.getCommits(name).then(function(response) {
      if (response.length) {
        $scope.commits = response.length;
      }
    });

    githubservice.getStats(name).then(function(response) {
      if (response.length) {
        $scope.contributors = response.length + ' Contributors';
      }
    });

    githubservice.starred(name).then(function(response) {
      if (response.status == 204) {
        $scope.starred = true;
      } else {
        $scope.starred = false;
      }
    });

    $scope.starme = function() {
      if ($scope.starred) {
        githubservice.removeStar(name);
        $scope.starred = false;
        return;
      } else {
        githubservice.addStar(name);
        $scope.starred = true;
      }
    };

    $scope.openFile = function(file) {
      // $scope.hasReadMe = false;
      $scope.$emit('loading');
      githubservice.getCodeView(name, file.path).then(function(response) {
        $scope.$emit('done-loading');
        if (file.type == 'file') {
          $scope.$parent.flags.code.path = file.path;
          $scope.$parent.flags.code.formattedCode = atob(response.content.replace(/\s/g, ''));
          $state.go('editor');
        } else {
          $scope.files = response;
          $ionicScrollDelegate.scrollTop(true);
        }
      })

    };

    $scope.branch = function() {
      var ref = window.open('https://github.com/' + name + '?files=1', '_blank', 'location=no');
    };

    // Called twice because Githubs API sometimes requires it to...
    githubservice.getStats(name);
    githubservice.getStats(name);

    $ionicModal.fromTemplateUrl('./dist/js/templates/modals/contributors.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;

      $scope.contribs = function() {
        $scope.modal.show();
        githubservice.getStats(name).then(function(response) {
          console.log(response)
          $scope.contributors = response;
        })
      };

      $scope.closeModal = function() {
        $scope.modal.hide();
      };

      $scope.toContrib = function(login) {
        $scope.$parent.OtherProfile(login);
        $scope.modal.hide();
      }
    });

}])
