'use strict'

const debug = require('debug')('high-pass-caller:test')

require('chai').should()

const highPassCaller = require('..')

function callMany(fn, times, cb) {
  times.reduce(function(acc, t, i) {
    setTimeout(function() {
      debug('Calling wrapper function', i + 1)
      fn(i + 1)
    }, acc + t)

    return acc + t
  }, 0)

  setTimeout(cb, times.reduce((acc, t) => acc + t) + 50)
}

describe('High-pass caller', function() {
  it('should call the wrapped function as expected', function(done) {
    const calls = []

    const wrapped = highPassCaller(2, 250, function(i) {
      debug('Wrapped function called', i)
      calls.push(i)
    })

    callMany(wrapped, [100, 400, 200, 300, 100, 400], function() {
      try {
        calls.should.deep.equals([3, 5])
        done()
      } catch (err) {
        done(err)
      }
    })
  })
})
