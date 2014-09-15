'use strict';

/**
 * @ngdoc function
 * @name stockDogApp.controller:DashboardCtrl
 * @description
 * # OverviewCtrl
 * Controller of the stockDogApp
 */
angular.module('stockDogApp')
  .controller('DashboardCtrl', function ($scope, WatchlistService, QuoteService) {
    var unregisterHandlers = [];
    $scope.watchlists = WatchlistService.query();
    $scope.cssStyle = 'height:300px;';
    var formatters = {
      number: [
        {
          columnNum: 1,
          prefix: '$'
        }
      ]
    };

    // Helper: Update chart objects
    var updateCharts = function () {
      // Donut chart
      var donutChart = {
        type: 'PieChart',
        displayed: true,
        data: [['Watchlist', 'Market Value']],
        options: {
          title: 'Market Value by Watchlist',
          legend: 'none',
          pieHole: 0.4
        },
        formatters: formatters
      };
      // Column chart
      var columnChart = {
        type: 'ColumnChart',
        displayed: true,
        data: [['Watchlist', 'Change', { role: 'style' }]],
        options: {
          title: 'Day Change by Watchlist',
          legend: 'none',
          animation: {
            duration: 1500,
            easing: 'linear'
          }
        },
        formatters: formatters
      };
      _.each($scope.watchlists, function (watchlist) {
        donutChart.data.push([watchlist.name, watchlist.marketValue]);
        columnChart.data.push([watchlist.name, watchlist.dayChange, watchlist.dayChange < 0 ? 'Red' : 'Green']);
      });
      $scope.donutChart = donutChart;
      $scope.columnChart = columnChart;
    };

    // Helper function for reseting controller state
    var reset = function () {
      // TODO
      QuoteService.clear();
      _.each($scope.watchlists, function (watchlist) {
        _.each(watchlist.stocks, function (stock) {
          QuoteService.register(stock);
        });
      });

      // Register watches
      _.each(unregisterHandlers, function(unregister) {
        unregister();
      });
      _.each($scope.watchlists, function (watchlist) {
        var unregister = $scope.$watch(function () {
          return watchlist.marketValue;
        }, function () {
          recalculate();
        });
        unregisterHandlers.push(unregister);
      });
    };

    var recalculate = function () {
      $scope.marketValue = 0;
      $scope.dayChange = 0;
      _.each($scope.watchlists, function (watchlist) {
        $scope.marketValue += watchlist.marketValue ? watchlist.marketValue : 0;
        $scope.dayChange += watchlist.dayChange ? watchlist.dayChange : 0;
      });
      updateCharts();
    };

    // Watch for changes to watchlists. Notice that
    // we are NOT deep-watching the entire object (bad)
    // but merely the length, which is enough to decide
    // we need to reset this controller;
    $scope.$watch('watchlists.length', function () {
      reset();
    });
  });
