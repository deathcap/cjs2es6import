var a = require('a');
var b = require('b');
var c = require('c');
var d = require(__dirname + '/d');
var e = require('e');
require('non-assignment require ignored');
var foo = require('bar');
var g = require('g'),
    h = require('h'),
    j = require('j');

//import { hello } from 'test1';
