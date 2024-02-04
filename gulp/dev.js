const gulp = require('gulp'); // собственно Gulp
const fileInclude = require('gulp-file-include'); // Подключение файлов друг в друга. HTML include
const sass = require('gulp-sass')(require('sass')); // Сборка SASS / SCSS ("SASS")Необходим для сборки SASS / SCSS)
const sassGlob = require('gulp-sass-glob'); // ????
const server = require('gulp-server-livereload'); // Сервер с автообновлением страницы
const clean = require('gulp-clean'); // Удаление файлов (если ранее файлы были собраны)
const fs = require('fs'); // работа с файлами
const sourceMaps = require('gulp-sourcemaps'); // Исходные карты для CSS (показывает к девтулс где именно лежит код)
const plumber = require('gulp-plumber'); // Фикс ошибок при сборке (в случае ошибки возращает дерекцию, где была ошибка, например HTML)
const notify = require('gulp-notify'); // Нотификации (будет информировать нас о найденных ошибках)
const webpack = require('webpack-stream'); // 
const babel = require('gulp-babel'); // 
const imagemin = require('gulp-imagemin'); // Сжимает img файлы
const changed = require('gulp-changed'); // Отправить только измененённые файлы

gulp.task('clean:dev', function (done) {
	if (fs.existsSync('./build/')) {
		return gulp
			.src('./build/', { read: false })
			.pipe(clean({ force: true }));
	}
	done();
});

const fileIncludeSetting = {
	prefix: '@@',
	basepath: '@file',
};

const plumberNotify = (title) => {
	return {
		errorHandler: notify.onError({
			title: title,
			message: 'Error <%= error.message %>',
			sound: false,
		}),
	};
};

gulp.task('html:dev', function () {
	return (
		gulp
			.src(['./src/html/**/*.html', '!./src/html/blocks/*.html']) // находим все файлы html, кроме папки blocks
			.pipe(changed('./build/', { hasChanged: changed.compareContents })) // hasChanged_Обнаружьте изменение в данных // compareContents_сравнить содержимое // 
			.pipe(plumber(plumberNotify('HTML'))) // Если есть ошибка, то в дерекции выдаст 'HTML'
			.pipe(fileInclude(fileIncludeSetting)) // fileInclude_Подключение файлов с настройками указанными в fileIncludeSetting
			.pipe(gulp.dest('./build/')) // Сохраняем итог всех задач в папку './build/'
	);
});

gulp.task('sass:dev', function () {
	return (
		gulp
			.src('./src/scss/*.scss') // находим все файлы .scss
			.pipe(changed('./build/css/')) // Отправляем только измененённые файлы
			.pipe(plumber(plumberNotify('SCSS'))) // Если есть ошибка, то в дерекции выдаст 'SCSS'
			.pipe(sourceMaps.init()) // инициализируем создание Source Maps
			.pipe(sassGlob()) // импортируем папки со стилями целиком
			.pipe(sass()) // скомпилировать Sass в CSS
			.pipe(sourceMaps.write()) // пути для записи SourceMaps созданы
			.pipe(gulp.dest('./build/css/')) // Сохраняем итог всех задач в папку './build/css/'
	);
});

gulp.task('images:dev', function () {
	return gulp
		.src('./src/img/**/*')
		.pipe(changed('./build/img/'))
		.pipe(imagemin({ verbose: true }))
		.pipe(gulp.dest('./build/img/'));
});

gulp.task('fonts:dev', function () {
	return gulp
		.src('./src/fonts/**/*')
		.pipe(changed('./build/fonts/'))
		.pipe(gulp.dest('./build/fonts/'));
});

gulp.task('files:dev', function () {
	return gulp
		.src('./src/files/**/*')
		.pipe(changed('./build/files/'))
		.pipe(gulp.dest('./build/files/'));
});

gulp.task('js:dev', function () {
	return gulp
		.src('./src/js/*.js')
		.pipe(changed('./build/js/'))
		.pipe(plumber(plumberNotify('JS')))
		.pipe(babel())
		.pipe(webpack(require('./../webpack.config.js')))
		.pipe(gulp.dest('./build/js/'));
});

const serverOptions = {
	livereload: true,
	open: true,
};

gulp.task('server:dev', function () {
	return gulp.src('./build/').pipe(server(serverOptions));
});

gulp.task('watch:dev', function () {
	gulp.watch('./src/scss/**/*.scss', gulp.parallel('sass:dev'));
	gulp.watch('./src/html/**/*.html', gulp.parallel('html:dev'));
	gulp.watch('./src/img/**/*', gulp.parallel('images:dev'));
	gulp.watch('./src/fonts/**/*', gulp.parallel('fonts:dev'));
	gulp.watch('./src/files/**/*', gulp.parallel('files:dev'));
	gulp.watch('./src/js/**/*.js', gulp.parallel('js:dev'));
});
