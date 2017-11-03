# generator-stenciljs [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> StencilJS generators

## Status

WIP: untested

Please help make it better!

## Tricky Behavior

The generator changes project root if it find a `.yo-rc.json` file in a parent directory.

```bash
Just found a `.yo-rc.json` in a parent directory.
Setting the project root at: /Users/kristianmandrup/repos/tecla5
```

This causes `process.cwd()` to change.

## Installation

First, install [Yeoman](http://yeoman.io) and generator-stenciljs using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-stenciljs
```

Then generate your new project:

```bash
yo stenciljs
```

## Development

Simply create an npm link:

`generator-stenciljs $ npm link`

That will install your project dependencies and symlink a global module to your local file. After npm is done, you'll be able to call `yo stenciljs`

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

MIT © [Kristian Mandrup]()


[npm-image]: https://badge.fury.io/js/generator-stenciljs.svg
[npm-url]: https://npmjs.org/package/generator-stenciljs
[travis-image]: https://travis-ci.org/kristianmandrup/generator-stenciljs.svg?branch=master
[travis-url]: https://travis-ci.org/kristianmandrup/generator-stenciljs
[daviddm-image]: https://david-dm.org/kristianmandrup/generator-stenciljs.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/kristianmandrup/generator-stenciljs
[coveralls-image]: https://coveralls.io/repos/kristianmandrup/generator-stenciljs/badge.svg
[coveralls-url]: https://coveralls.io/r/kristianmandrup/generator-stenciljs
