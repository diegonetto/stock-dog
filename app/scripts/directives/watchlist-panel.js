'use strict';

/**
 * @ngdoc directive
 * @name stockDogApp.directive:WatchlistPanel
 * @description
 * # WatchlistPanel
 */
angular.module('stockDogApp')
  .directive('watchlistPanel', function ($location, $routeParams, $modal, WatchlistService) {
    return {
      templateUrl: 'views/templates/watchlist-panel.html',
      restrict: 'E',
      scope: {}, // isolate scope
      link: function ($scope) {
        // Initializations
        $scope.watchlist = {};
        $scope.currentList = $routeParams.listId;
        var addListModal = $modal({
          scope: $scope,
          template: 'views/templates/addlist-modal.html',
          show: false
        });

        $scope.watchlists = WatchlistService.query();

        $scope.showModal = function () {
          addListModal.$promise.then(addListModal.show);
        };

        $scope.createList = function () {
          WatchlistService.save($scope.watchlist);
          addListModal.hide();
          $scope.watchlist = {};
        };

        $scope.deleteList = function (list) {
          WatchlistService.remove(list);
          $location.path('/');
        };

        $scope.gotoList = function (listId) {
          $location.path('watchlist/' + listId);
        };
      }
    };
  });
