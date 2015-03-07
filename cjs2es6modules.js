'use strict';

var detective = require('./detective');
var escodegen = require('escodegen');
var fs = require('fs');

var src = fs.readFileSync(__dirname + '/demo/require-test.js');
var requires = detective.find(src, {nodes: true});
console.log(requires);

console.log(escodegen.generate(requires.nodes[0]));

