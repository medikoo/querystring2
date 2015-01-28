# querystring2
## Modular and environment agnostic version of [Node's querystring](http://nodejs.org/api/querystring.html) package

Provides two modules `parse` and `stringify`, which work exactly same as Node's `querystring`.

### Installation
#### NPM

In your project path:

	$ npm install querystring2

To port it to Browser or any other (non CJS) environment, use your favorite CJS bundler. No favorite yet? Try: [Browserify](http://browserify.org/), [Webmake](https://github.com/medikoo/modules-webmake) or [Webpack](http://webpack.github.io/)

## Tests [![Build Status](https://travis-ci.org/medikoo/querystring2.png)](https://travis-ci.org/medikoo/querystring2)

	$ npm test
