var gulp = require('gulp');
var util = require('gulp-util');
var runSequence = require('run-sequence');


function handleError(err) {
    console.log(err.toString());
    this.emit('end');
}

gulp.task('pack', ['pack-src']);

gulp.task('pack-src', function () {
});

gulp.task('default', function () {
    runSequence('pack');
});
