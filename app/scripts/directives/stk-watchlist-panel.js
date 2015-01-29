'use strict';

angular.module('stockDogApp')
  // Register directive and inject dependencies
  .directive('stkWatchlistPanel',
    function ($location, $modal, $routeParams, WatchlistService) {
    return {
      templateUrl: 'views/templates/watchlist-panel.html',
      restrict: 'E',
      scope: {},
      link: function ($scope) {
        // Initialize variables
        $scope.watchlist = {};
        $scope.currentList = $routeParams.listId;
        var addListModal = $modal({
          scope: $scope,
          template: 'views/templates/addlist-modal.html',
          show: false
        });

        // Bind model from service to this scope
        $scope.watchlists = WatchlistService.query();

        // Display addlist modal
        $scope.showModal = function () {
          addListModal.$promise.then(addListModal.show);
        };

        // Create a new list from fields in modal
        $scope.createList = function () {
          WatchlistService.save($scope.watchlist);
          addListModal.hide();
          $scope.watchlist = {};
        };

        // Delete desired list and redirect to home
        $scope.deleteList = function (list) {
          WatchlistService.remove(list);
          $location.path('/');
        };

        // Send users to desired watchlist view
        $scope.gotoList = function (listId) {
          $location.path('watchlist/' + listId);
        };
      }
    };
  });
