/*
 This script will process the triggers and functions defined in the node app
 that uses parse-cloud-express middleware and builds webhooks.json
 */

var Webhooks = require('parse-cloud-express');
var jsonfile = require('jsonfile')

// Require the cloud code, to process all the triggers/functions
require('../cloud/main.js');

var serverHooks = {
    'beforeSave': [],
    'afterSave': [],
    'beforeDelete': [],
    'afterDelete': [],
    'function': []
};

// Records trigger webhooks defined in node app using parse-cloud-express middleware
function recordTriggers(triggerType) {
    var hooks = [];
    Webhooks.Routes[triggerType].forEach(function(item) {
        var url = '/webhooks/' + triggerType + '_' + item;
        hooks.push({"op": "post", "trigger": {"className": item, "triggerName": triggerType, "url": url}})
    });
    return hooks
}

// Records function webhooks defined in node app using parse-cloud-express middleware
function recordFunctions() {
    var hooks = [];
    Webhooks.Routes['function'].forEach(function(item) {
        var url = '/webhooks/function_' + item;
        hooks.push({"op": "post", "function": {"functionName": item, "url": url}})
    });
    return hooks
}

var hooks = recordFunctions();
hooks = hooks.concat(recordTriggers('beforeSave'));
hooks = hooks.concat(recordTriggers('afterSave'));
hooks = hooks.concat(recordTriggers('beforeDelete'));
hooks = hooks.concat(recordTriggers('afterDelete'));

jsonfile.writeFileSync("webhooks.json", {"hooks": hooks}, {spaces: 2})
