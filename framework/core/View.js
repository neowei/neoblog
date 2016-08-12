import path from 'path';
import views from 'koa-views';
export default class View {
    constructor(app) {
        app.use(views(config.viewpath, {extension: 'pug'}));
    }
}
