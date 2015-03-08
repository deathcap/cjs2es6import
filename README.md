# cjs2es6import

Convert a subset of CommonJS/NodeJS module [require()](https://nodejs.org/api/modules.html#modules_modules) expressions to
[ECMAScript 6 module import](http://www.2ality.com/2014/09/es6-modules-final.html) statements.

Example:

    var cjs2es6import = require('cjs2es6import');

    var src = "var foo = require('bar');";
    var newSrc = cjs2es6import(src); // "import foo from 'bar';"

More examples in `demo/demo.js` (run `npm start`)

## License

MIT

