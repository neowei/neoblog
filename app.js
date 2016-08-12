import Bootstrap from './framework/core/bootstrap.js';

export default class App {
    constructor() {
        require('babel-register')({
            plugins: ['transform-async-to-generator']
          });
        this.bootstrap = new Bootstrap(__dirname);
        this.bootstrap.init();
    }
}
new App();