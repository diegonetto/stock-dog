'use strict';

angular.module('stockDogApp')
  .service('CompanyService', function CompanyService($resource) {
    return $resource('companies.json');
  });
