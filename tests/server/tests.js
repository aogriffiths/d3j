var d3j           = require('../..');
var package_json  = require('../../package.json');

exports.testVersion = function(test){
    vPakage = package_json.version;
    vModule = d3j.version;
    test.equal(vPakage, vModule, "package version must match the module version");
    test.done();
};