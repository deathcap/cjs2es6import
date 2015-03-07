'use strict';

const acorn = require('acorn');
const walk = require('acorn/util/walk');
const walkall = require('walkall');

const escodegen = require('escodegen');
const fs = require('fs');

const src = fs.readFileSync(`${__dirname}/demo/require-test.js`);

const parseOpts = {ecmaVersion: 6};
const ast = acorn.parse(src, parseOpts);

const isRequire = (node) => {
  const c = node.callee;
  return c &&
    node.type === 'CallExpression' &&
    c.type === 'Identifier' &&
    c.name === 'require';
};

walk.simple(ast, walkall.makeVisitors((node) => {
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

console.log(escodegen.generate(ast));

