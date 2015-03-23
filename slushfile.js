/*
 * slush-theme-patterns
 * https://github.com/Automattic/slush-theme-pattern-library
 *
 * Copyright (c) 2015, Automattic, Inc.
 * Licensed under the MIT license.
 */

'use strict';

var gulp = require('gulp'),
    install = require('gulp-install'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    include = require('gulp-file-include'),
    rename = require('gulp-rename'),
    _ = require('underscore.string'),
    inquirer = require('inquirer');

function format(string) {
    var username = string.toLowerCase();
    return username.replace(/\s/g, '');
}

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
        message: 'What is the name of your project?',
        default: defaults.appName
    }, {
        name: 'appDescription',
        message: 'What is the description?'
    }, {
        name: 'appVersion',
        message: 'What is the version of your project?',
        default: '0.1.0'
    }, {
        name: 'authorName',
        message: 'What is the author name?',
        default: defaults.authorName
    }, {
        name: 'authorEmail',
        message: 'What is the author email?',
        default: defaults.authorEmail
    }, {
        name: 'authorURI',
        message: 'What is the author URI?',
        default: 'http://underscores.me'
    }, {
        name: 'userName',
        message: 'What is the github username?',
        default: defaults.userName
    }, {
        type: 'list',
        name: 'genericons',
        message: 'Do you want to include Genericons?',
        choices: ['Yes', 'No'],
        default: 'Yes'
    }, {
        type: 'list',
        name: 'siteBranding',
        message: 'Do you want to include site branding?',
        choices: ['Yes', 'No'],
        default: 'Yes'
    }, {
        type: 'list',
        name: 'primaryNav',
        message: 'Do you want to include a primary navigation menu?',
        choices: ['Yes', 'No'],
        default: 'Yes'
    }, {
        type: 'list',
        name: 'customHeader',
        message: 'Do you want to include a Custom Header?',
        choices: ['Yes', 'No'],
        default: 'Yes'
    }, {
        type: 'confirm',
        name: 'moveon',
        message: 'Continue?'
    }];
    //Ask
    inquirer.prompt(prompts,
        function (answers) {
            if (!answers.moveon) {
                return done();
            }
            answers.appNameSlug = _.slugify(answers.appName);
            gulp.src(__dirname + '/templates/**')
                .pipe(template(answers))
                .pipe(include({
                    prefix: '@@',
                    basepath: __dirname + '/templates',
                    context: {
                        siteBranding: answers.siteBranding,
                        primaryNav: answers.primaryNav,
                        customHeader: answers.customHeader
                    }
                }))
                .pipe(rename(function (file) {
                    if (file.basename[0] === '_') {
                        file.basename = '.' + file.basename.slice(1);
                    }
                }))
                .pipe(conflict('./'))
                .pipe(gulp.dest('./'))
                .pipe(install())
                .on('end', function () {
                    done();
                });
        });
});
