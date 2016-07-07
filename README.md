# helloworld

> A scaffold for vue developers. Based on vue-cli

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm test
```
#usage
each html file should bind with one entry, config with build/entry.conf.js.

vue components styles will be extracted as components.css, while scss/sass files required will be extracted into separated css files named with according entry name.

css/js bundles will be auto injected into html files according to entry name while common css/js bundles will be injected into all html files.