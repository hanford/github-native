angular.module('contents', [])

.controller('contentCtrl', function($scope, $http, $rootScope, $state, $ionicLoading, githubservice, $timeout, $ionicNavBarDelegate) {
  $scope.code = $rootScope.code;
  $scope.path = $rootScope.path;
  $ionicNavBarDelegate.setTitle($rootScope.path);
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
      theme: 'dope',
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
})
