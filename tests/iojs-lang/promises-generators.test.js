'use strict'

var co = require('co')
var test = require('tape')

// promisse test
var funcAsync = function(willResolve, value) {
  return new Promise(function(resolve, reject) {
    if (willResolve) {
      resolve(value)
    } else {
      reject(value)
    }
  })
}

test('Promise exists', function (t) {
  t.plan(1)

  // Promise is available?
  t.equal(typeof Promise, 'function')
})

test('Promises test', function (t) {
  t.plan(2)

  funcAsync(true, 1)
  .then(function (result) {
    t.equal(result, 1)
  })

  funcAsync(false, 2)
  .then(function () {
    t.fail('must be rejected')
  })
  .catch(function (err) {
    t.equal(err, 2)
  })
})

/**
 * co
 * https://github.com/tj/co
 */

test('co', function (t) {
  t.plan(2)

  co(function *() {
    var result = yield Promise.resolve(true)
    return result
  }).then(function () {
    t.pass('was resolved')
  }, function () {
    t.fail('ERROR: must be resolved')
  })

  co(function *() {
    var result = yield Promise.reject(true)
    return result
  }).then(function () {
    t.fail('ERROR: must be rejected')
  }, function () {
    t.pass('was rejected')
  })
})

test('co + funcAsync', function (t) {
  t.plan(2)

  co(function *() {
    var result = yield funcAsync(true, 1)
    return result
  }).then(function () {
    t.pass('was resolved')
  }, function () {
    t.fail('ERROR: must be resolved')
  })

  co(function *() {
    var result = yield funcAsync(false, 2)
    return result
  }).then(function () {
    t.fail('ERROR: must be rejected')
  }, function () {
    t.pass('was rejected')
  })
})
