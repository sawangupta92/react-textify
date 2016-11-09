# React Textify

`react-textify` enables you to add multiple capabilities to your text field. Currently we only offer twitter-like(API based) mention feature, but more intresting features will be added soon.

## Demo & Examples

To build the examples locally, run:

```
npm install
npm start
```

Then open [`localhost:8000`](http://localhost:8000) in a browser.


## Installation

The easiest way to use react-textify is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), [Webpack](http://webpack.github.io/), etc).

You can also use the standalone build by including `dist/react-textify.js` in your page. If you use this, make sure you have already included React, and it is available as a global variable.

```
npm install react-textify --save
```


## Usage

__EXPLAIN USAGE HERE__

```
var ReactTextify = require('react-textify');

<ReactTextify>Example</ReactTextify>
```

### Properties

There are a number of properties you can define with react-textify.

* url - Specify the URL, where to send the request. Required field.
* param - specify the parameter on which search to be made on server side. Required field.
* method - HTTP method to be used to request the server default is GET.
* headers - HTTP headers to be used in case authentication is needed to fetch results from server.
* mentionPrimaryKey - primary key to be used in react listing.
* mentionKeyword - Keyword that will be used to trigger the search, default is '#'
* minimumLength - Minimum length after which search will be triggered.
* mentionDisplayField - Which field to be displayed from search results.
* mentionResultManipulation - In case you need to further manipulation on search results you can define this method on your own file, and just pass it to the ReactMentionTextify component as a prop.
* inputClasses - In case you want any class to be added on the input field you can use this prop.

```
< ReactMentionTextify url='http://localhost:3000/api/v1/customers/' param='name' mentionKeyword='#' minimumLength='3' mentionPrimaryKey='id' mentionDisplayField='first_name' mentionResultManipulation={this.mentionResultManipulation} inputClasses='col-md-6' />
```

## Development (`src`, `lib` and the build process)

**NOTE:** The source code for the component is in `src`. A transpiled CommonJS version (generated with Babel) is available in `lib` for use with node.js, browserify and webpack. A UMD bundle is also built to `dist`, which can be included without the need for any build system.

To build, watch and serve the examples (which will also watch the component source), run `npm start`. If you just want to watch changes to `src` and rebuild `lib`, run `npm run watch` (this is useful if you are working with `npm link`).

## License

__PUT LICENSE HERE__

Copyright (c) 2016 Sawan Gupta.
