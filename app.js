var path = require('path');
var Bootstrap = require(path.join(__dirname, 'framework/core/bootstrap.js'));
var config = require(path.join(__dirname, 'config/define.js'))(__dirname);
var bootstrap = new Bootstrap(config);

bootstrap.initGlobal();

bootstrap.start();

// bootstrap.connectDb();

bootstrap.errHandle(function(err) {
    logger(err);
});