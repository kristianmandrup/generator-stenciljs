# Component

Currently the auto-registration is still broken so you will have to register manually.

We need some regex magic to replace each `xxx:` entry with `"xxx":` and for all values `'xxx'` to `"xxx"` and take care of escaping such as `\'`

Please help make this happen!

Ideally the config file should be a minimal wrapper js file loading bundles from a json file. We could do this when making the boilerplate, then detect if project is configured for auto-registration!
