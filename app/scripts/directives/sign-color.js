'use strict';

/**
 * @ngdoc directive
 * @name stockDogApp.directive:signColor
 * @description
 * # signColor
 */
angular.module('stockDogApp')
  .directive('signColor', function () {
    return {
      restrict: 'A',
      scope: {
        signColor: '@'
      },
      link: function ($scope, $element) {
        $scope.$watch('signColor', function (newVal) {
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
