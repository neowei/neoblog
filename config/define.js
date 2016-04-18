var path = require('path');

module.exports = function(rootpath) {
    var config = {};
    config.loglevel = 'ALL';
    config.rootpath = rootpath;
    config.mongodb = 'mongodb://localhost:27017/neoblog';
    config.redishost = 'localhost';
    config.apidomain = 'dev.www.egobus.com';
    config.configpath = path.join(rootpath, 'config');
    config.corepath = path.join(rootpath, 'framework/core');
    config.databasepath = path.join(rootpath, 'framework/database');
    config.librariespath = path.join(rootpath, 'framework/libraries');
    config.modelpath = path.join(rootpath, 'model');
    config.viewpath = path.join(rootpath, 'view');
    config.controllerpath = path.join(rootpath, 'controller');
    config.secret = 'neowei';
    config.port = 8000;

    return config;
};