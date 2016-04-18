var path = require('path');
var _ = require('underscore');
var koa = require('koa');
var session = require('koa-generic-session');
var redisStore = require('koa-redis');
var koaLogger = require('koa-logger');
var staticCache = require('koa-static-cache');
var favicon = require('koa-favicon');
var mount = require('koa-mount');
var Router = require('koa-router');
var mongoose = require('mongoose');

function Bootstrap(option) {
    this.opts = option || {};
}

Bootstrap.prototype = koa();

Bootstrap.prototype.start = function() {
    var port = this.opts.port || 8000;
    this.keys = [ this.opts.secret ] || "secret";
    // this.use(favicon(path.join(this.opts.rootpath,
    // "resource/img/favicon.ico")));
    // this.use(staticCache(path.join(this.opts.rootpath, ''), {
    // maxAge : 365 * 24 * 60 * 60
    // }));
    logger.use(this);
    this.use(koaLogger());
    logger.trace("initlizing koa logger");
    this.use(session({
        store : redisStore({
            'host' : config.redishost,
            'port' : 6379
        })
    }));
    logger.trace("initlizing redis session");
    this.initRoutes();
    this.listen(port);
    logger.trace("Server listening on " + port);
};

Bootstrap.prototype.initGlobal = function() {
    global.config = this.opts;
    var log = require(path.join(this.opts.corepath, 'log.js'));
    global.logger = new log();
    global.Database = require(path.join(this.opts.databasepath, 'mongodb.js'));
    var view = require(path.join(this.opts.corepath, 'view.js'));
    global.view = new view();
    logger.trace("initlizing global");
};

Bootstrap.prototype.initRoutes = function() {
    var controller = require(path.join(this.opts.corepath, 'controller.js'));
    var _router = new Router();
    var routes = require(path.join(config.configpath, 'routes.js'));
    _.each(routes, function(route) {
        var handle = controller[route.controller][route.handle];
        _router[route.method](route.url, handle);
    });
    this.use(_router.middleware());
    logger.trace('initlizing routes');
};

Bootstrap.prototype.connectDb = function() {
    mongoose.connect(this.opts.mongodb, {
        server : {
            poolSize : 12,
            socketOptions : {
                keepAlive : 1
            }
        }
    });
};

Bootstrap.prototype.errHandle = function(callback) {
    process.on('uncaughtException', callback);
};
exports = module.exports = Bootstrap;