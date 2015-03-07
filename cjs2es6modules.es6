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
  //console.log('Found node type',node.type,node);
  //console.log(escodegen.generate(node));

  if (node.type === 'VariableDeclarator') {
    if (node.id.type !== 'Identifier') {
      //console.log('Ignoring non-identifier variable identifier: ',node);
      return;
    }

    var varName = node.id.name;

    if (isRequire(node.init)) {
      if (node.init.arguments.length) {
        if (node.init.arguments[0].type === 'Literal') {
          var moduleName = node.init.arguments[0].value;

          //console.log('Found require:', varName, moduleName);
          //console.log('Old node=',node);

          delete node.id;
          delete node.init;
          node.type = 'ImportDeclaration';
          node.source = {type: 'Literal', value: moduleName};

          node.specifiers = [
            {
              type: 'ImportSpecifier',
              name: null, //{type: 'Identifier', name: varName}, // no 'as', same name as id
              id: {type: 'Identifier', name: varName}
            }
          ];

          //console.log('New node=',node);
        } else {
          //console.log('Ignored non-string require:',node.init.arguments[0]);
        }
      }
    }
  }
}), walkall.traversers);

console.log(escodegen.generate(ast));

