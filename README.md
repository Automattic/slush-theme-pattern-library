# slush-theme-patterns

> A Slush generator for the Theme Pattern Library.


## Getting Started

Slush is built on [Node.js](https://nodejs.org/) and [Gulp.js](http://gulpjs.com/). In order to get up and running, you will first need to make sure these are installed globally.

You can head over to the Node.js homepage and install the latest version from there (the green "INSTALL" button). That will give you both Node.js and NPM (Node Package Manager).

Once you have Node installed, you can install the global dependencies (Gulp and [Slush](https://github.com/slushjs/slush)) with the following command:

```bash
$ npm install -g gulp slush
```

Then you'll want to clone this repository (this is a temporary step and will not be needed once the generator is moved to a public [NPM](https://www.npmjs.com/) package).

```bash
$ git clone git@github.com:Automattic/slush-theme-pattern-library.git
```

Note that, performing Git operations over HTTPS may require you to [create a personal access token](https://help.github.com/articles/creating-an-access-token-for-command-line-use/).
I would recommend cloning via SSH (with the above `git@github.com:...` link).

Now, go into that directory, install your project NPM dependencies, and link it with NPM (this is _also_ a temporary step and will not be needed once the generator is moved to a public [NPM](https://www.npmjs.com/) package).

```bash
$ cd slush-theme-pattern-library && npm install --save && npm link
```

*If you are receiving a permissions error, you may need to run these installation commands as `sudo`. For example, `sudo npm install -g gulp`.

Now, you're ready to use the generator.

### Usage

Anywhere *outside* of the Slush generator folder, create a new folder for your project:

```bash
$ mkdir my-new-project
```

Run the generator from within the new folder:

```bash
$ cd my-new-project && slush theme-patterns
```

## Getting To Know Slush

Slush is a tool that uses Gulp for project scaffolding.

Slush does not contain anything "out of the box", except the ability to locate installed slush generators and to run them with liftoff.

To find out more about Slush, check out the [documentation](https://github.com/slushjs/slush).

## Contributing

See the [CONTRIBUTING Guidelines](https://github.com/Automattic/slush-theme-pattern-library/blob/master/CONTRIBUTING.md)

## Support
If you have any problem or suggestion please open an issue [here](https://github.com/Automattic/slush-theme-pattern-library/issues).
