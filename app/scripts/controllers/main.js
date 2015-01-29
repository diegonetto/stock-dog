'use strict';

angular.module('stockDogApp')
  .controller('MainCtrl', function ($scope, $location, WatchlistService) {
    // Populate watchlists for dynamic nav links
    $scope.watchlists = WatchlistService.query();

    // Using the $location.path() function as a $watch expression
    $scope.$watch(function () {
      return $location.path();
    }, function (path) {
      if (_.contains(path, 'watchlist')) {
        $scope.activeView = 'watchlist';
      } else {
        $scope.activeView = 'dashboard';
      }
    });
  });
