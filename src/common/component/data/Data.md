# Data

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

### createDataCollector

`createDataCollector(ctx, opts)`

Currently only the `props` is used (and required) from the `ctx`

### createDataPreparer

`createDataPreparer(ctx, opts)`

Currently the `props` and `model` is used (and required) from the `ctx`
The `model` is the data previously collected/assembled via the `DataCollector`

```js
this.props = ctx.props
this.model = ctx.model
```

The "prepare" phase builds and decorates the full model to be ready for the template writer.

## collect

The collect phase should build the intitial data structure `model` as outlined above.
The collect phase itself can consists of multiple parts or phases.

## prepare

The `prepare` phase will return a new data structure which is used to decorate the model to complete it.

The `DataPreparer` will use the `props` and initial data `model` collected, in order to "prepare" the data for template writing. This includes ready-made "code blocks" to be inserted in the template placeholders.

At this point the data model should look like the mock data model and be ready to be used in the templates.

## enrich

Extra data enrichment at the end.
