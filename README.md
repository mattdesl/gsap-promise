# gsap-lite-promise

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

A Promise wrapper around gsap / tweenlite, based on the npm package gsap-promise created by Matt DesLauriers that use TweenMax

```js
var animate = require('gsap-promise')

Promise.all([
	animate(element, 1.0, { x: 10 }),
	animate(element, 1.0, { y: 10, delay: 0.5 })
]).then(function() {
	console.log("all animations finished")
})
```

## Usage

[![NPM](https://nodei.co/npm/gsap-lite-promise.png)](https://nodei.co/npm/gsap-lite-promise/)

This promisifies the `TweenLite` methods: `to`, `from`, `set` and `fromTo`. This uses Bluebird, and has basic support for cancellation.

#### ```animate.to(element, duration, params)```
#### ```animate.from(element, duration, from)```
#### ```animate.set(element, params)```
#### ```animate.fromTo(element, duration, from, to)```

Matches the TweenLite methods by the same name, but returns a Promise for the onComplete event.

#### ```animate.all(element)```

An alias for `Promise.all`, which will trigger all tweens in parallel.

#### ```animate(element, duration, params)```

The default export is the same as `animate.to`.

## License

MIT, see [LICENSE.md](http://github.com/iranreyes/gsap-lite-promise/blob/master/LICENSE.md) for details.
