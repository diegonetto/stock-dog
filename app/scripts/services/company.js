'use strict';

/**
 * @ngdoc service
 * @name stockDogApp.Symbol
 * @description
 * # Symbol
 * Service in the stockDogApp.
 */
angular.module('stockDogApp')
  .factory('CompanyService', function($resource) {
    return $resource('companies.json');
  });
