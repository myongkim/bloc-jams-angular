(function() {
    function seekBar($document) {

      var calculatePercent = function(seekBar, event) {
        var offsetX = event.pageX - seekBar.offset().left;
        var seekBarWidth = seekBar.width();
        var offsetXPercent = offsetX / seekBarWidth;
        offsetXPercent = Math.max(0, offsetXPercent);
        offsetXPercent = Math.min(1, offsetXPercent);
        return offsetXPercent;
      };
      return {
        templateUrl: '/templates/directives/seek_bar.html',
        replace: true,
        restrict: 'E',
        scope: {
            onChange: '&'
        },
        link: function(scope, element, attributes) {
          scope.seekBarValue = 0;
          scope.max = 100;

          var seekBar = $(element);

          attributes.$observe('seekBarValue', function(newValue) {
              scope.seekBarValue = newValue;
          });

          attributes.$observe('max', function(newValue) {
              scope.max = newValue;
          });

          var percentString = function () {
            var seekBarValue = scope.seekBarValue;
            var max = scope.max;
            var percent = seekBarValue / max * 100;
            return percent + "%";
          };

          scope.fillStyle = function() {
            return {width: percentString()};
          };

          scope.thumbStyle = function(){
              return {left: percentString()};

          };

          var notifyOnChange = function(newValue) {
               if (typeof scope.onChange === 'function') {
                   scope.onChange({seekBarValue: newValue});
               }
           };

          scope.onClickSeekBar = function(event) {
              var percent = calculatePercent(seekBar, event);
              scope.seekBarValue = percent * scope.max;
              notifyOnChange(scope.seekBarValue);
          };

          scope.trackThumb = function() {
            $document.bind('mousemove.thumb', function(event) {
                var percent = calculatePercent(seekBar, event);
                scope.$apply(function() {
                    scope.seekBarValue = percent * scope.max;
                    notifyOnChange(scope.seekBarValue);
                });
            });



            $document.bind('mouseup.thumb', function() {
                $document.unbind('mousemove.thumb');
                $document.unbind('mouseup.thumb');
            });
          };
        }
      };
    }

    angular
        .module('blocJams')
        .directive('seekBar', ['$document', seekBar]);
})();
