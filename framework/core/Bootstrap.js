import path from 'path';
import Koa from 'koa';
import KoaLogger from 'koa-logger';

// import _ from 'underscore';
// import KoaConvert from 'koa-convert';
// import mongoose from 'mongoose';
// var _ = require('underscore');
// var session = require('koa-generic-session');
// var redisStore = require('koa-redis');
// var staticCache = require('koa-static-cache');
// var favicon = require('koa-favicon');
// var mount = require('koa-mount');
// var co = require('co');
// var koaConvert = require('koa-convert');
// this.use(favicon(path.join(this.opts.rootpath,
// "resource/img/favicon.ico")));
// this.use(staticCache(path.join(this.opts.rootpath, ''), {
// maxAge : 365 * 24 * 60 * 60
// }));
// this.keys = [ this.opts.secret ] || "secret";

export default class Bootstrap {
    constructor(rootpath) {
        this.koa = new Koa();
        this.opts = {};
        this.opts.rootpath = rootpath;
    }
    
    init() {
        this.initConfig();
        this.initLog();
        this.initView();
        this.initRouter();
        this.initServer();
    }
    
    initConfig() {
        var Define = require(path.join(this.opts.rootpath, 'config/Define.js')).default;
        this.opts = new Define(this.opts.rootpath);
        global.config = this.opts;
    }
    
    initLog() {
        var Log = require(path.join(this.opts.corepath, 'Log.js')).default;
        global.logger = new Log();
        this.koa.use(KoaLogger());
        logger.use(this.koa);
        logger.trace("initlizing log");
    }
    
    initView() {
        var View = require(path.join(this.opts.corepath, 'View.js')).default;
        global.view = new View(this.koa);
        logger.trace("initlizing view");
    }
    
    initRouter() {
        var Router = require(path.join(this.opts.corepath, 'Router.js')).default;
        var router = new Router();
        this.koa.use(router.getRoutes()).use(router.getAllowedMethods());
        logger.trace("initlizing router");
    }
    
    initServer() {
        this.port = this.opts.port || 8000;
        this.koa.listen(this.port);
        logger.trace("initlizing server listening on " + this.port); 
    }
    
    errHandle(callback){
        logger(callback);
        process.on('uncaughtException', callback);
    }
}
// var routes = require(path.join(config.configpath, 'routes.js'));
// _.each(routes, function(route) {
// console.log(route);
// var handle = controller[route.controller][route.handle];
// _router[route.method](route.url, koaConvert(handle));
// });
// this.koa.use(_router.middleware());
// this.koa.use(koaRouter.routes()).use(koaRouter.allowedMethods());
// logger.trace('initlizing routes');
// }
// connectDb() {
// mongoose.connect(this.opts.mongodb, {
// server : {
// poolSize : 12,
// socketOptions : {
// keepAlive : 1
// }
// }
// });
// }
