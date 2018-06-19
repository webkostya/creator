const minify = require( 'gulp-minify-css' );
const concat = require( 'gulp-concat' );
const merge = require( 'merge-stream' );
const less = require( 'gulp-less' );
const sass = require( 'gulp-sass' );
const gulp = require( 'gulp' );
const path = require( 'path' );

const entry = path.join(__dirname, 'vendors', 'index');
const output = path.join(__dirname, 'assets', 'css');

// CSS
gulp.task('css', function () {
  return gulp.src(entry + '.css')
		.pipe(minify())
    .pipe(gulp.dest( output ));
});

// LESS
gulp.task('less', function () {
  return gulp.src(entry + '.less')
		.pipe(less())
		.pipe(minify())
    .pipe(gulp.dest( output ));
});

// SASS
gulp.task('sass', function () {
  return gulp.src(entry + '.sass')
		.pipe(sass())
		.pipe(minify())
    .pipe(gulp.dest( output ));
});

// WATCHING
gulp.task('watch:css', function () {
  gulp.watch('vendors/*.css', ['css']);
});

gulp.task('watch:less', function () {
  gulp.watch('vendors/*.less', ['less']);
});

gulp.task('watch:sass', function () {
  gulp.watch('vendors/*.sass', ['sass']);
});

// MERGE ALL FILES
gulp.task('merge', function() {
	const lessStream = gulp.src(entry + '.less')
		.pipe(less())
		.pipe(concat(entry + '.less'));

	const sassStream = gulp.src(entry + '.sass')
		.pipe(sass())
		.pipe(concat(entry + '.sass'));

	const cssStream = gulp.src(entry + '.css')
		.pipe(concat(entry + '.css'));

	return merge(lessStream, sassStream, cssStream)
		.pipe(concat( 'index.css' ))
		.pipe(minify())
		.pipe(gulp.dest( output ));
});

gulp.task('default', ['merge']);