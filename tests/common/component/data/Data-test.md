# Data

To gather the data to be used in the template we currently go
through 3 phases in order:

- Collect
- Prepare
- Enrich

## Collect

Collect does the initial data collection, based on the incoming `props` (from user prompts or CLI arguments/options)

## Prepare

Prepare takes the props and collected data and does further preparation, such as creating most of the code inserts for the templates.

## Enrich

Finally, enrich takes the results of all previous steps and further enriches data model as necessary.

## TODO

In order to not limit ourselves to a specific number of linear phases, we should
instead use a publish/subscribe model, where data enrichers can subscribe to when specific data is made available. Loose coupling for better composability

## Status

```bash
  94 passed
  8 failed
  2 exceptions
```

sections

```bash
  50 passed
  5 failed
```

- `prop-tests.test`
- `properties.test`
