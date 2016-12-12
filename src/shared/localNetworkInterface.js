"use strict";
var apollo_client_1 = require('apollo-client');
var graphql_1 = require('graphql');
var LocalNetworkInterface = (function () {
    function LocalNetworkInterface(schema, opts) {
        if (opts === void 0) { opts = {}; }
        this.schema = null;
        this.schema = schema;
    }
    LocalNetworkInterface.prototype.query = function (request) {
        var query = request.query, variables = request.variables;
        return graphql_1.graphql(this.schema, apollo_client_1.printAST(query), null, null, variables);
    };
    LocalNetworkInterface.prototype.getSchema = function () {
        return this.schema;
    };
    return LocalNetworkInterface;
}());
exports.LocalNetworkInterface = LocalNetworkInterface;
function createLocalNetworkInterface(interfaceOpts) {
    var _a = interfaceOpts || {}, _b = _a.opts, opts = _b === void 0 ? {} : _b, schema = _a.schema;
    if (!schema) {
        throw 'A schema is required for a network layer';
    }
    return new LocalNetworkInterface(schema, opts);
}
exports.createLocalNetworkInterface = createLocalNetworkInterface;
//# sourceMappingURL=LocalNetworkInterface.js.map