var gulp = require("gulp");
// var jshint = require("gulp-jshint");
//
// gulp.task("zadanie", function(){
//   return gulp.src("js/*.js")
//   .pipe(jshint())
//   .pipe(jshint.reporter("default"))
// });

var sass = require("gulp-sass");
gulp.task("sass", function(){
  return gulp.src("sass/**/*.scss")
  .pipe(sass({errLogToConsole: true, outputStyle: "expanded"}))
  .pipe(gulp.dest("css"))
});

gulp.task("watch", function(){
  gulp.watch('sass/**/*.scss', ["sass"]);
});
