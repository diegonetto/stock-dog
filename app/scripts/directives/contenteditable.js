'use strict';

var NUMBER_REGEXP = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/;

angular.module('stockDogApp')
  .directive('contenteditable', function ($sce) {
    return {
      restrict: 'A',
      require: 'ngModel', // get a hold of NgModelController
      link: function($scope, $element, $attrs, ngModelCtrl) {
        if(!ngModelCtrl) { return; } // do nothing if no ng-model

        // Read HTML value, then write data to the model or reset the view
        var read = function () {
          var value = $element.html();
          if ($attrs.type === 'number' && !NUMBER_REGEXP.test(value)) {
            ngModelCtrl.$render();
          } else {
            ngModelCtrl.$setViewValue(value);
          }
        };

        // Specify how UI should be updated
        ngModelCtrl.$render = function() {
          $element.html($sce.getTrustedHtml(ngModelCtrl.$viewValue || ''));
        };

        // Add custom parser based input type (only `number` supported)
        // This will be applied to the $modelValue
        if ($attrs.type === 'number') {
          ngModelCtrl.$parsers.push(function (value) {
            return parseFloat(value);
          });
        }

        // Listen for change events to enable binding
        $element.on('blur keyup change', function() {
          $scope.$apply(read);
        });
      }
    };
  });
