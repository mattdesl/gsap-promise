require('gsap/src/uncompressed/plugins/CSSPlugin.js');
require('gsap/src/uncompressed/TweenLite.js');
var assign = require('object-assign');

module.exports = function(Promise) {
  function animateFunc(func, element, duration, opts) {
    opts = assign({}, opts);
    var tween;
    return new Promise(function(resolve, reject, onCancel) {
      opts.onComplete = resolve;
      tween = func(element, duration, opts);
      onCancel &&
        onCancel(function() {
          tween.kill();
        });
    });
  }

  var animateTo = animateFunc.bind(null, TweenLite.to);

  var util = animateTo;
  util.to = animateTo;
  util.from = animateFunc.bind(null, TweenLite.from);

  util.set = function animateSet(element, params) {
    params = assign({}, params);
    return new Promise(function(resolve, reject) {
      params.onComplete = resolve;
      TweenLite.set(element, params);
    });
  };

  util.fromTo = function animateFromTo(element, duration, from, to) {
    to = assign({}, to);
    var tween;
    return new Promise(function(resolve, reject, onCancel) {
      to.onComplete = resolve;
      tween = TweenLite.fromTo(element, duration, from, to);
      onCancel &&
        onCancel(function() {
          tween.kill();
        });
    });
  };

  util.killTweensOf = TweenLite.killTweensOf.bind(TweenLite);
  util.all = Promise.all;
  util.TweenLite = TweenLite;
  return util;
};
