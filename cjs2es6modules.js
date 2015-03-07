'use strict';

var acorn = require('acorn');
var walk = require('acorn/util/walk');
var walkall = require('walkall');

var escodegen = require('escodegen');
var fs = require('fs');

var src = fs.readFileSync(__dirname + '/demo/require-test.js');

var parseOpts = {ecmaVersion: 6};
var ast = acorn.parse(src, parseOpts);

var isRequire = function(node) {
  var c = node.callee;
  return c
    && node.type === 'CallExpression'
    && c.type === 'Identifier'
    && c.name === 'require';
};

walk.simple(ast, walkall.makeVisitors(function(node) {
  //console.log('Found node type',node.type);
  if (isRequire(node)) {
    if (node.arguments.length) {
      if (node.arguments[0].type === 'Literal') {
        console.log('Found require:',node.arguments[0].value);
      } else {
        console.log('Ignored non-string require:',node.arguments[0]);
      }
    }
  }
}), walkall.traversers);

//console.log(escodegen.generate(requires.nodes[0]));

