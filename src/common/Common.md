# Common

The common folder aims to provide common functionality or base classes that can be used as foundation for designing generators.

## base

The `/base` folder contains a `BaseGenerator` to be used as a foundation. It includes log functionaility, for both the  Yeoman `Generator` (using colored `chalk`) and for simple `console` logging.

It also includes the ability to:

- pretty print an object as JSON
- retrieve `package.json` object
- ...

## boilerplate

The `/boilerplate` folder contains a `BaseBoilerplateGenerator` to be used as a baseline for writing boilerplate generators, ie. that fetch a ready made boilerplate project from some location and writes all the files to a target location.

You can extend a boilerplate project by composition with the `extend` generator, which can update the `package.json` file (and others) with project details to override those in the boilerplate.

## component

The `/component` folder provides the `BaseComponentGenerator` that can be used to quickly and efficiently design a `ComponentGenerator` which consists of one or more files.


