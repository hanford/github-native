angular.module('MobileGit')

.directive('rotator', ['$timeout', function($timeout) {
  return {
    restrict: 'A',
    templateUrl: './dist/js/templates/rotator.html',
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