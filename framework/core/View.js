import path from 'path';
import coViews from 'co-views';

export default class View {
    constructor() {
        this.render = coViews(config.viewpath, {
            default : 'jade'
        });
    }
}
