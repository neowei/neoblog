import path from 'path';
import KoaRouter from 'koa-router';
import fs from 'fs';

export default class Router{
    constructor() {
        this.koaRouter = new KoaRouter();
        this.iteratorController();
    }
    
    iteratorController() {
        var koaRouter = this.koaRouter;
        fs.readdirSync(config.controllerpath).forEach(function(file) {
            if (file.indexOf('Controller.js') > -1) {
                var controller = require(path.join(config.controllerpath, file)).default;
                koaRouter.use(new controller());
            }
        });
    }
    
    getRoutes() {
        return this.koaRouter.routes();
    }
    
    getAllowedMethods() {
        return this.koaRouter.allowedMethods();
    }
}