'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var isPlainObject = require('lodash.isplainobject');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var isPlainObject__default = /*#__PURE__*/_interopDefaultLegacy(isPlainObject);

// lodash.isplainobject is not pure es module

function deepIn1(rs, prefix, obj, sep) {
  for (const [key, value] of Object.entries(obj)) {
    const newKey = `${prefix}${sep}${key}`;
    if (isPlainObject__default['default'](value)) {
      deepIn1(rs, newKey, value);
    } else {
      rs[newKey] = value;
    }
  }
}

// { aa: { bb: 1 } } => { 'aa.bb': 1 }
function fromObjectTree(obj, sep = '.') {
  const rs = {};
  for (const [key, value] of Object.entries(obj)) {
    if (isPlainObject__default['default'](value)) {
      deepIn1(rs, key, value, sep);
    } else {
      rs[key] = value;
    }
  }
  return rs
}

function deepIn2(rs, key, value, sep) {
  let tmp = rs;
  const paths = key.split(sep);
  const last = paths.pop();
  for (const path of paths) {
    if (!tmp[path]) tmp[path] = {};
    tmp = tmp[path];
  }
  tmp[last] = value;
}

// { 'halo.cc': 1 } => { halo: { cc: 1 } }
function toObjectTree(obj, sep = '.') {
  const rs = {};
  for (const [key, value] of Object.entries(obj)) {
    if (key.indexOf(sep) !== -1) {
      deepIn2(rs, key, value, sep);
    } else {
      rs[key] = value;
    }
  }
  return rs
}

exports.fromObjectTree = fromObjectTree;
exports.toObjectTree = toObjectTree;
