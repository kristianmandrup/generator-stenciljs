# Component

The `/component` folder provides the `BaseComponentGenerator` that can be used to quickly and efficiently design a `ComponentGenerator` which consists of one or more files.

## mock

The `/_mock` folder contains mock data. Mock data is useful to try out and test a part of a generator under construction, without being dependent on a fully working "engine" to provide all that data.

You can then continually check with your mock data whether you are on track and are providing data in the same format/structure as expected/required in the next pipeline steps.

You should have one mock folder per pipeline step as outlined below

- data
- options
- prompts
- props
- collected
- prepared

## args

The `/args` folder configures the available `arguments` and `options` on the generator.

## prompts

The `/prompts` folder is used to build the prompts to be used to ask the user for data.

`buildPrompts(options, defaults = {})`

The `options` argument consists of all the `argument` and `options` received by the generator from the command line (or from composition via another generator).

## data

The `/data` folder prepares the data to be used in the templates.
The data should be structured in an object, with one entry per template file:

```js
{
  component: {
    entityName: 'myComponent',
    className: 'MyComponent',
    fileName: 'my-component',
    tag: {
      name: 'my-component'
    }
  },
  interface: {
    className: 'MyComponent'
  },
  // ...
}
```

Don't worry about duplication. Much easier and safer to follow this approach.

The `DataModel` will first "collect" the data received from the prompts and do some initial data formatting and structuring. This is the job of the `DataCollector`.

## collect

The collect phase should build the intitial data structure `model` as outlined above.

The `DataModel` will then use the `props` and initial data `model` to "prepare" the data for the templates. This includes ready made code to be inserted in various places.

The collect phase itself can consists of multiple parts or phases.

## prepare

The `prepare` phase will return a new data structure which is used to decorate the model to complete it.

At this point the data model should look like the mock data model and be ready to be used in the templates.

## write

The `/write` folder contains the logic to write the files to the target location.

## template

A `Templator` is used to write each template with the data entry object for that template.

So for a template `component` it will feed `data['component]` to the template:

```js
{
  entityName: 'myComponent',
  className: 'MyComponent',
  fileName: 'my-component',
  containerDir: 'components',
  tag: {
    name: 'my-component'
  }
}
```

The `containerDir` and `fileName` are used to calculate the `templatePath` and `destinationPath` for the template generation.

## registrator

The `Registrator` is used to register the componet. For stencil, this means updating a `stencil.config.js` file.
