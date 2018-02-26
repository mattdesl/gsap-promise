# gsap-lite-promise

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

A Promise wrapper around gsap, based on the npm package gsap-promise created by Matt DesLauriers that use TweenMax.

```js
require('gsap/src/minified/TweenLite.min.js');
const animate = require('gsap-lite-promise')(Promise, TweenLite);

Promise.all([animate(element, 1.0, { x: 10 }), animate(element, 1.0, { y: 10, delay: 0.5 })]).then(function() {
  console.log('all animations finished');
});
```

## Arguments

```
const litePromise = require('gsap-lite-promise');
const animate = litePromise(Promise, TweenModule);
```

### First Argument - Promise

Select your favorite Promise framework and send it as an argument.

### Second Argument - TweenModule

Send TweenMax or TweenLite. Instead of work with an internal version of `gsap`, maybe different than the one you are currently using in your project, just send your version and we will promisify that gsap module.

## Example

Customizing the GSAP implementation to use the built in minified sources and adding a `staggerTo` the implementation.

```
require('gsap/src/minified/plugins/CSSPlugin.min.js');
require('gsap/src/minified/plugins/ScrollToPlugin.min.js');
require('gsap/src/minified/TweenLite.min.js');
const animate = require('gsap-lite-promise')(Promise, window.TweenLite);
animate.staggerTo = function(els, duration, props, delay) {
  return Promise.all(
    els.map((el, i) =>
      animate.to(el, duration, {
        ...props,
        delay: props.delay + delay * i
      })
    )
  );
};
```

## Changelog

_2.0.0_
Was removed Bluebird like strict dependency so in order to use it you should pass your prefer Promise implementation to the lib.

## Usage

[![NPM](https://nodei.co/npm/gsap-lite-promise.png)](https://nodei.co/npm/gsap-lite-promise/)

This promisifies the `TweenLite` methods: `to`, `from`, `set` and `fromTo`.

#### `animate.to(element, duration, params)`

#### `animate.from(element, duration, from)`

#### `animate.set(element, params)`

#### `animate.fromTo(element, duration, from, to)`

Matches the TweenLite methods by the same name, but returns a Promise for the onComplete event.

#### `animate.all(element)`

An alias for `Promise.all`, which will trigger all tweens in parallel.

#### `animate(element, duration, params)`

The default export is the same as `animate.to`.

## Add extras

If you want to use the greensock easing for example or the CSSPlugin to animate CSS properties, you can add those separately, the goal of this is being the lightest posible.

```
require('gsap/src/uncompressed/easing/EasePack');
require('gsap/src/uncompressed/plugins/CSSPlugin');
```

## License

MIT, see [LICENSE.md](http://github.com/iranreyes/gsap-lite-promise/blob/master/LICENSE.md) for details.
