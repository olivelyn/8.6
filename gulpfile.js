var gulp = require('gulp')
var server = require('gulp-webserver')
var fs = require('fs')
var path = require('path')
var url = require('url')
var scss = require('gulp-sass');
var mock = require('./mock')
var qu = require('querystring')
gulp.task('server', ['scss'], function() {
    gulp.src('src')
        .pipe(server({
            port: 9090,
            middleware: function(req, res) {
                var pathname = url.parse(req.url).pathname
                if (pathname === '/favicon.ico') {
                    return false;
                }
                if (/\/api/g.test(pathname)) {
                    res.end(JSON.stringify(mock(qu.unescape(req.url))))
                } else {
                    pathname = pathname === '/' ? '/index.html' : pathname
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                }
            }
        }))
})
gulp.task('scss', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(scss())
        .pipe(gulp.dest('./src/css'))
})
gulp.task('watch', function() {
    gulp.watch('./src/scss/*.scss', ['scss'])
})
gulp.task('dev', ['server', 'watch'])
var uglify = require('gulp-uglify');
// gulp.task('uglify', function() {
//     gulp.src('./src/js/public/*.js')
//         .pipe(uglify())
//         .pipe(gulp.dest('./zlib/'));
// });