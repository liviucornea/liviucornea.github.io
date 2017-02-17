module.exports = function () {
  var client = './';

  var config = {
    /**
     * File paths
     */
    build: './dist/',
    css: client + '**/*.css',
    html: client + 'app/**/*.html',
    images: client + 'app/**/*.png',
    imagesRoot: 'img',
    scss: client + 'app/**/*.scss',
    src: client ,
    ts: client + 'app/**/*.ts',
    tsMaps: '.', // write map in same location as js
    js: client + 'Scripts/*.js',
    indexhtml: 'index.html',
    //rootts: client + '*.ts',
    //nodemodulescopy: client + 'node_modules/**/*.*',
    systemconfigjs: client + 'systemjs.config.js'
  };

  return config;
};
