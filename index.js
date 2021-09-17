// lodash.isplainobject is not pure es module
import isPlainObject from 'lodash.isplainobject'

function deepIn1(rs, prefix, obj, sep) {
  for (const [key, value] of Object.entries(obj)) {
    const newKey = `${prefix}${sep}${key}`
    if (isPlainObject(value)) {
      deepIn1(rs, newKey, value)
    } else {
      rs[newKey] = value
    }
  }
}

// { aa: { bb: 1 } } => { 'aa.bb': 1 }
export function fromObjectTree(obj, sep = '.') {
  const rs = {}
  for (const [key, value] of Object.entries(obj)) {
    if (isPlainObject(value)) {
      deepIn1(rs, key, value, sep)
    } else {
      rs[key] = value
    }
  }
  return rs
}

function deepIn2(rs, key, value, sep) {
  let tmp = rs
  const paths = key.split(sep)
  const last = paths.pop()
  for (const path of paths) {
    if (!tmp[path]) tmp[path] = {}
    tmp = tmp[path]
  }
  tmp[last] = value
}

// { 'halo.cc': 1 } => { halo: { cc: 1 } }
export function toObjectTree(obj, sep = '.') {
  const rs = {}
  for (const [key, value] of Object.entries(obj)) {
    if (key.indexOf(sep) !== -1) {
      deepIn2(rs, key, value, sep)
    } else {
      rs[key] = value
    }
  }
  return rs
}
