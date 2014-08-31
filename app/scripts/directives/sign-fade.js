'use strict';

/**
 * @ngdoc directive
 * @name stockDogApp.directive:signFade
 * @description
 * # signFade
 */
angular.module('stockDogApp')
  .directive('signFade', function ($animate) {
    return {
      restrict: 'A',
      scope: {
        signFade: '@'
      },
      link: function ($scope, $element) {
        $scope.$watch('signFade', function (newVal, oldVal) {
          if (newVal === oldVal) { return; } // skip initialization execution
          var oldPrice = parseFloat(oldVal);
          var newPrice = parseFloat(newVal);
          if (oldPrice && newPrice) {
            var direction = newPrice - oldPrice >= 0 ? 'up' : 'down';
            $animate.addClass($element, 'change-' + direction, function() {
              $animate.removeClass($element, 'change-' + direction);
            });
          }
        });
      }
    };
  });
