# TODO

## Refactor

Refactor `component` generator to be more modular.

Use utilities for generators (such as logger instance)

## More fine grained sub-generators

Add options to component generator to include/exclude parts of prompts using categories checkbox dialog:

- `props`
- `state`
- `events`
- ...

Should perhaps compose sub-generator for each?
Is there a way we can upgrade an existing component?

Perhaps using [Atomist](https://www.atomist.com/) [rugs](http://docs.atomist.com/user-guide/rug/generators/)

Rug generators create new projects from an existing source project, where the source project itself is a working project in its own right. A Rug generator has two major components: the “model” project and the modifications needed to transform the model project into a new project. The model project can be any working project you want to use to create new projects. The transformations are encoded in the Rug generator script located under the project’s .atomist directory.
