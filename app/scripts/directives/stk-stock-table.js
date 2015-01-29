'use strict';

angular.module('stockDogApp')
  .directive('stkStockTable', function () {
    return {
      templateUrl: 'views/templates/stock-table.html',
      restrict: 'E',
      scope: {
        watchlist: '='
      },
      controller: function ($scope) {
        var rows = [];

        $scope.$watch('showPercent', function (showPercent) {
          if (showPercent) {
            _.each(rows, function (row) {
              row.showPercent = showPercent;
            });
          }
        });

        this.addRow = function (row) {
          rows.push(row);
        };

        this.removeRow = function (row) {
          _.remove(rows, row);
        };
      },
      link: function ($scope) {
        $scope.showPercent = false;
        $scope.removeStock = function (stock) {
          $scope.watchlist.removeStock(stock);
        };
      }
    };
  });
