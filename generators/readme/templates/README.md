# <%= projectName %> [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]<%
if (includeCoveralls) { %> [![Coverage percentage][coveralls-image]][coveralls-url]<% } -%>

# Stencil App Starter

Stencil is a compiler for building fast web apps using Web Components.

Stencil combines the best concepts of the most popular frontend frameworks into a compile-time rather than run-time tool.  Stencil takes TypeScript, JSX, a tiny virtual DOM layer, efficient one-way data binding, an asynchronous rendering pipeline (similar to React Fiber), and lazy-loading out of the box, and generates 100% standards-based Web Components that run in any browser supporting the Custom Elements v1 spec.

Stencil components are just Web Components, so they work in any major framework or with no framework at all. In many cases, Stencil can be used as a drop in replacement for traditional frontend frameworks given the capabilities now available in the browser, though using it as such is certainly not required.

Stencil also enables a number of key capabilities on top of Web Components, in particular Server Side Rendering (SSR) without the need to run a headless browser, pre-rendering, and objects-as-properties (instead of just strings).

## Getting Started

To start a new project using Stencil, use the [generator-stenciljs](https://github.com/kristianmandrup/generator-stenciljs)

The generator will download the boilerplate from [ionic-team/stencil-app-starter](https://github.com/ionic-team/stencil-app-starter) to be used as a baseline.

```bash
npm i -g yo generator-stenciljs
yo stenciljs
```

Follow [Yeoman generator](http://yeoman.io/generator/) instructions...

Assuming you named the module `my-app`

```bash
cd my-app
```

Now run:

```bash
npm install
npm start
```

To view the build, start an HTTP server inside of the `/www` directory.

To watch for file changes during development, run:

```bash
npm run dev
```

To build the app for production, run:

```bash
npm run build
```

To run the unit tests once, run:

```bash
npm test
```

To run the unit tests and watch for file changes during development, run:

```bash
npm run test.watch
```

## Generate a component

To generate a new component, use the `component` sub-generator:

```bash
yo stenciljs:component
```

Follow the generator instructions.

In particular, select a naming convention that suits you (by `name` or `type`)

- By `name`, will generate all component files with the tag name of the component.
- By `type`, will generate component files with the type of file as the name.

For `Prop list`, you can type in multiple properties of the form:

`name:string,age:number`

The generator will then insert `@Prop()` decorated properties in the component and have skeleton tests etc. generated for them as well ;)

## Description

> <%= description %>

<% if (!content) { -%>
## Installation as module

```sh
$ npm install --save <%= projectName %>
```

## Usage

```js
import { <%= safeProjectName %> } from '<%= projectName %>';

```
<% } else { -%>
<%= content %>
<% } -%>
## License

<%= license %> © [<%= author.name %>](<%= author.url %>)


[npm-image]: https://badge.fury.io/js/<%= projectName %>.svg
[npm-url]: https://npmjs.org/package/<%= projectName %>
[travis-image]: https://travis-ci.org/<%= githubAccount %>/<%= projectName %>.svg?branch=master
[travis-url]: https://travis-ci.org/<%= githubAccount %>/<%= projectName %>
[daviddm-image]: https://david-dm.org/<%= githubAccount %>/<%= projectName %>.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/<%= githubAccount %>/<%= projectName %>
<% if (includeCoveralls) { -%>
[coveralls-image]: https://coveralls.io/repos/<%= githubAccount %>/<%= projectName %>/badge.svg
[coveralls-url]: https://coveralls.io/r/<%= githubAccount %>/<%= projectName %>
<% } -%>
