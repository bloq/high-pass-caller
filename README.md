# high-pass-caller

[![Build Status](https://travis-ci.com/bloq/high-pass-caller.svg?branch=master)](https://travis-ci.com/bloq/high-pass-caller)

Wrap a function that is called only if the wrapper is called fast enough.

## Motivation

This package was created to monitor the synchronization status between two processes. Those processes could be out of sync for very short periods while the synchronization logic is catching up. But several checks finding sync issues should trigger an alarm.

## Installation

```shell
npm install high-pass-caller
```

## Usage

```js
const highPassCaller = require('high-pass-caller')

const wrapped = highPassCaller(2, 100, console.log)

setTimeout(() => wrapped('not logged'), 0)
setTimeout(() => wrapped('not logged either'), 200)
setTimeout(() => wrapped('two calls within 100ms!'), 250)
setTimeout(() => wrapped('not logged, warming down'), 400)
```

## API

### highPassCaller(times, time, fn) ⇒ `function`

Wrap a function that is called only if the wrapper is called fast enough.

**Returns**: `function` - The wrapped function.

| Param | Type       | Description                               |
| ----- | ---------- | ----------------------------------------- |
| times | `number`   | The number of calls.                      |
| time  | `number`   | The time window to count the calls in ms. |
| fn    | `function` | The function to be called.                |

## License

MIT
