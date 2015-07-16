/*
 * slush-theme-patterns
 * https://github.com/Automattic/slush-theme-pattern-library
 *
 * Copyright (c) 2015, Automattic, Inc.
 * Licensed under the MIT license.
 */

'use strict';

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    install = require('gulp-install'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    include = require('gulp-file-include'),
    rename = require('gulp-rename'),
    _ = require('underscore.string'),
    del = require('del'),
    vinylPaths = require('vinyl-paths'),
    inquirer = require('inquirer');

var format = function(string) {
    var username = string.toLowerCase();
    return username.replace(/\s/g, '');
};

var defaults = (function () {
    var homeDir = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE,
        workingDirName = process.cwd().split('/').pop().split('\\').pop(),
        osUserName = homeDir && homeDir.split('/').pop() || 'root',
        configFile = homeDir + '/.gitconfig',
        user = {};

    if (require('fs').existsSync(configFile)) {
        user = require('iniparser').parseSync(configFile).user;
    }

    return {
        appName: workingDirName,
        userName: osUserName || format(user.name || ''),
        authorName: user.name || '',
        authorEmail: user.email || ''
    };
})();

gulp.task('default', function (done) {
    var prompts = [{
        name: 'appName',
        message: 'What is the name of your theme?',
        default: defaults.appName
    }, {
        name: 'appURI',
        message: 'What is the theme URI?',
        default: 'http://underscores.me'
    }, {
        name: 'appDescription',
        message: 'What is the theme description?'
    }, {
        name: 'appVersion',
        message: 'What is the version of your theme?',
        default: '0.1.0'
    }, {
        name: 'authorName',
        message: 'What is the theme author name?',
        default: defaults.authorName
    }, {
        name: 'authorEmail',
        message: 'What is the theme author email?',
        default: defaults.authorEmail
    }, {
        name: 'authorURI',
        message: 'What is the theme author URI?',
        default: 'http://underscores.me'
    }, {
        type: 'checkbox',
        name: 'themeType',
        message: 'What type of theme do you want to start with? (Please select ONLY ONE - use arrow keys and spacebar to select/deselect)',
        choices: [{
			name: 'Base',
			value: 'typeBase',
			checked: true
		}, {
			name: 'Traditional Blog',
			value: 'typeBlogTraditional',
		}, {
			name: 'Modern Blog',
			value: 'typeBlogModern',
		}, {
			name: 'Business',
			value: 'typeBusiness',
		}, {
			name: 'Magazine',
			value: 'typeMag',
		}, {
			name: 'Portfolio',
			value: 'typePortfolio',
		}],
    }, {
        type: 'confirm',
        name: 'moveon',
        message: 'Continue?'
    }];
    //Ask
    inquirer.prompt(prompts,
        function (answers) {

			if (answers.themeType.length > 1) {
				gutil.log('Please select only ONE theme type to start with.');
				return done();
			} else if (answers.themeType.length === 0) {
				gutil.log('Please select a theme type to start with.');
				return done();
			}

            if (!answers.moveon) {
                return done();
            }

            answers.appNameSlug = _.slugify(answers.appName);
			answers.appNameVar = answers.appNameSlug.replace(/-/g, '_');

            gulp.src(__dirname + '/templates/**')
                .pipe(template(answers))
                .pipe(include({
                    prefix: '@@',
                    basepath: __dirname + '/templates',
                    context: {
						themeType: answers.themeType
                    }
                }))
                .pipe(rename(function (file) {
                    if (file.basename[0] === '_' && file.extname !== '.scss') {
                        file.basename = '.' + file.basename.slice(1);
                    }
                }))
                .pipe(conflict('./'))
                .pipe(gulp.dest('./'))
                .pipe(install())
                .on('finish', function () {
                    done();
                });

			process.on('exit', function() {
				gutil.log('Installation complete!');
			});
        }
	);
});

gulp.task('clean-gulp', function() {
	gulp.src(['./node_modules', './package.json', './gulpfile.js', 'npm-debug.log'])
		.pipe(vinylPaths(del));
});
