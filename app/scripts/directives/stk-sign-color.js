'use strict';

angular.module('stockDogApp')
  .directive('stkSignColor', function () {
    return {
      restrict: 'A',
      link: function ($scope, $element, $attrs) {
        $scope.$watch($attrs.stkSignColor, function (newVal) {
          var newSign = parseFloat(newVal);
          if (newSign > 0) {
            $element[0].style.color = 'Green';
          } else {
            $element[0].style.color = 'Red';
          }
        });
      }
    };
  });
