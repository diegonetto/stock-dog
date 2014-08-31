var fs = require('fs');
var parse = require('csv-parse');
var Orchestrator = require('orchestrator');
var _ = require('lodash');

var orchestrator = new Orchestrator();
var exchanges = ['nasdaq', 'nyse', 'amex'];
var output = [];

function parseCSV (file, done) {
  parse(file, {columns: true}, function (err, companies) {
    var array = _.map(companies, function (company) {
      return {
        label: company.Symbol + ' - ' + company.Name,
        name: company.Name,
        symbol: company.Symbol,
        sector: company.Sector,
        industry: company.industry
      }
    });
    output = output.concat(array);
    done();
  });
}

_.each(exchanges, function (exchange) {
  var file = fs.readFileSync(exchange + '.csv');
  orchestrator.add(exchange, function (done) {
    parseCSV(file, done);
  });
});

orchestrator.start('nasdaq', 'nyse', 'amex', function (err) {
  if (err) { console.log(err); }
  console.log(JSON.stringify(output, null, '  '));
});

