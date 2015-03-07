'use strict';

var detective = require('detective');
var fs = require('fs');

var src = fs.readFileSync(__dirname + '/demo/require-test.js');
var requires = detective(src);
console.log(requires);
