var path = require("path");
String.prototype.replaceAll = function(str, replaceStr) {
    return this.replace(new RegExp(str, 'gm'), replaceStr);
};
module.exports = new Extend();
function Extend() {
    this.iswatch = process.argv[2] === 'development-watch' ? true : false;
    this.environment = process.argv[2] === 'development-watch' ? 'development' : process.argv[2];
    this.isdev = this.environment === 'development' ? true : false;
    this.istest = this.environment === 'testing' ? true : false;
    this.isprod = this.environment === 'production' ? true : false;

    this.rootpath = path.dirname(__dirname);
    this.csspath = this.rootpath + '/dist/' + this.environment + '/css/';
    this.jspath = this.rootpath + '/dist/' + this.environment + '/js/';
    this.imgpath = this.rootpath + '/dist/' + this.environment + '/img/';
    this.fontpath = this.rootpath + '/dist/' + this.environment + '/font/';
    this.audiopath = this.rootpath + '/dist/' + this.environment + '/audio/';
    // this.viewpath = path.dirname(this.rootpath) + '/egobus_view/**/*.phtml';

    this.buildcsslib = [ this.rootpath + '/bower_components/semantic/dist/css/semantic.css', this.rootpath + '/bower_components/art-dialog/css/ui-dialog.css'];
    this.buildjsframework = [ this.rootpath + '/bower_components/jquery/dist/jquery.js', this.rootpath + '/bower_components/semantic/dist/semantic.js' ];
//    this.buildjsframeworkmobile = [ this.rootpath + '/bower_components/zeptojs/dist/zeptojs.js', this.rootpath + '/bower_components/bootstrap/dist/js/bootstrap.js' ];
    this.buildjscommon = [ this.rootpath + '/bower_components/art-dialog/dist/dialog.js', this.rootpath + '/bower_components/jquery_lazyload/jquery.lazyload.js',
            './bower_components/Swiper/dist/js/swiper.jquery.js' ];

    this.buildjs = this.rootpath + '/src/js/**/*.js';
    this.buildscss = this.rootpath + '/src/scss/';
    this.buildimg = this.rootpath + '/src/images/**/*';
    this.buildfont = this.rootpath + '/src/fonts/**/*';
    this.buildaudio = this.rootpath + '/src/audio/**/*';
    this.buildhtml = this.rootpath + '/htmls/**/*.html';
    this.buildfontlib = this.rootpath + '/bower_components/bootstrap/fonts/**/*';

    this.watchscss = this.rootpath + '/src/scss/**/*.scss';
    this.watchjs = this.rootpath + '/src/js/**/*.js';
    this.watchimg = this.rootpath + '/src/images/**/*';
    this.watchaudio = this.rootpath + '/src/audio/**/*';
    this.watchfont = this.rootpath + '/src/fonts/**/*';
    // this.watchhtml = this.rootpath + '/htmls/**/*.html';

    this.getDestpath = function(dest, srcfile) {
        srcfile = srcfile.replaceAll('\\\\', '/');
        var replacepath = (this.rootpath + '/src/' + dest).replaceAll('\\\\', '/');
        switch (dest) {
        case 'js':
            return path.dirname(this.jspath + srcfile.replace(replacepath, ''));
        case 'audio':
            return path.dirname(this.audiopath + srcfile.replace(replacepath, ''));
        case 'font':
            return path.dirname(this.fontpath + srcfile.replace(replacepath, ''));
        case 'img':
            return path.dirname(this.imgpath + srcfile.replace(replacepath, ''));
        }
    };
}
