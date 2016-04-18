var _ = require('underscore');
var fs = require('fs');
var path = require('path');
var controller = {};

exports = module.exports = controller;

fs.readdirSync(config.controllerpath).forEach(function(file) {
    if (file.indexOf('.js') > -1) {
        var controllerName = file.split('.')[0];
        controller[controllerName] = require(path.join(config.controllerpath, file));
    }
});