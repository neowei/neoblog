import Bootstrap from './framework/core/bootstrap.js';

export default class App {
    constructor() {
        this.bootstrap = new Bootstrap(__dirname);
        this.bootstrap.init();
    }
}
new App();