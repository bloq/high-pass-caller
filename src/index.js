'use strict'

/**
 * Wrap a function that is called only if the wrapper is called fast enough.
 *
 * @param {number} times The number of calls.
 * @param {number} time The time window to count the calls in ms.
 * @param {(...args: any[]) => any} fn The function to be called.
 * @returns {(...args: any[]) => any} The wrapped function.
 */
function highPassCaller(times, time, fn) {
  let count = 0

  const wrapped = function(...args) {
    count += 1

    setTimeout(function() {
      count -= 1
    }, time)

    if (count >= times) {
      return fn(...args)
    }
  }

  return wrapped
}

module.exports = highPassCaller
