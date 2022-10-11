const config = require('./gulp-config')();
const { src } = require('gulp');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('clean', function(){
    return gulp.src(config.transpiledOutDir, {read:false})
    .pipe($.clean());
});
gulp.task('transpile', function(){
    return gulp.src(config.typescriptSrc)
    .pipe($.typescript({
        target: "es2016",
        module: "commonjs",
        outDir: config.transpiledOutDir,
        esModuleInterop: true,
        forceConsistentCasingInFileNames: true,
        strict: true,
        skipLibCheck: true
    }))
    .pipe(gulp.dest(config.transpiledOutDir));
});

gulp.task('watch', function(){
    return gulp.watch(config.typescriptSrc, gulp.series('transpile'));
});

gulp.task('nodemon', function(){
    return $.nodemon({
        script: config.serverPath,
        watch: config.transpiledOutDir,
        env: { 'NODE_ENV': 'development' }
    })
});

exports.default = gulp.series([
    'clean',
    'transpile',
    gulp.parallel(['watch', 'nodemon'])
]);