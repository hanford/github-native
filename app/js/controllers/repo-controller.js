angular.module('MobileGit')

.controller('RepoCtrl', ['$scope', '$http', '$state', '$ionicModal', 'githubservice', '$ionicScrollDelegate', '$timeout',
  function ($scope, $http, $state, $ionicModal, githubservice, $ionicScrollDelegate, $timeout) {

    $scope.search = "";
    $scope.fullname = $scope.$parent.flags.repo.fullname;
    var fullname = $scope.$parent.flags.repo.fullname;

    $scope.files = $scope.$parent.flags.repo.files;

    githubservice.getCommits(fullname).then(function(response) {
      if (response.length) {
        $scope.commits = response.length;
      }
    });

    githubservice.getStats(fullname).then(function(response) {
      if (response.length) {
        $scope.contributors = response.length + ' Contributors';
      }
    });

    githubservice.starred(fullname).then(function(response) {
      if (response.status == 204) {
        $scope.starred = true;
      } else {
        $scope.starred = false;
      }
    });

    $scope.starme = function(fullname) {
      if ($scope.starred) {
        githubservice.removeStar($scope.$parent.flags.repo.fullname);
        $scope.starred = false;
        return;
      } else {
        githubservice.addStar($scope.$parent.flags.repo.fullname);
        $scope.starred = true;
      }
    };

    $scope.openFile = function(file) {
      // $scope.hasReadMe = false;
      $scope.$emit('loading');
      githubservice.getCodeView(fullname, file.path).then(function(response) {
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
      var ref = window.open('https://github.com/' + fullname + '?files=1', '_blank', 'location=no');
    };

    // Called twice because Githubs API sometimes requires it to...
    githubservice.getStats(fullname);
    githubservice.getStats(fullname);

    $ionicModal.fromTemplateUrl('./dist/js/templates/modals/contributors.html', {
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
        $scope.$parent.OtherProfile(login);
        $scope.modal.hide();
      }
    });

}])
