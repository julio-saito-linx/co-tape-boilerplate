'use strict'

var test = require('tape')

// ---------------
test('testing-tape-syntax: main test', function (t) {
  t.pass('1. main test')
  t.end()

  // ---------------
  t.test('testing-tape-syntax: sub inside main', function (t) {
    t.pass('2. sub inside main')
    t.end()

    // ---------------
    t.test('testing-tape-syntax: sub inside sub', function (t) {
      t.pass('3. sub inside sub')
      t.end()
    })

  })

})

