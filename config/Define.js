import path from 'path';

export default class Define{
    constructor(rootpath) {
        this.rootpath = rootpath;
        this.mongodb = 'mongodb://localhost:27017/neoblog';
        this.redishost = 'localhost';
        this.apidomain = 'dev.www.egobus.com';
        this.configpath = path.join(rootpath, 'config');
        this.corepath = path.join(rootpath, 'framework/core');
        this.databasepath = path.join(rootpath, 'framework/database');
        this.librariespath = path.join(rootpath, 'framework/libraries');
        this.modelpath = path.join(rootpath, 'model');
        this.viewpath = path.join(rootpath, 'view');
        this.controllerpath = path.join(rootpath, 'controller');
        this.secret = 'neowei';
        this.environment = process.env.NODE_ENV;
        if (process.env.NODE_ENV === 'production') {
            this.env = 3;
            this.loglevel = 'logInfo';
        } else if (process.env.NODE_ENV === 'testing') {
            this.env = 2;
            this.loglevel = 'logDebug';
        } else {
            this.loglevel = 'ALL';
            this.env = 1;
        }
        this.port = 8000;
    }
}