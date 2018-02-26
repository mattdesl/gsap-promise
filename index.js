var assign = require('object-assign');

module.exports = function(Promise, TweenModule) {
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

  var animateTo = animateFunc.bind(null, TweenModule.to);

  var util = animateTo;
  util.to = animateTo;
  util.from = animateFunc.bind(null, TweenModule.from);

  util.set = function animateSet(element, params) {
    params = assign({}, params);
    return new Promise(function(resolve, reject) {
      params.onComplete = resolve;
      TweenModule.set(element, params);
    });
  };

  util.fromTo = function animateFromTo(element, duration, from, to) {
    to = assign({}, to);
    var tween;
    return new Promise(function(resolve, reject, onCancel) {
      to.onComplete = resolve;
      tween = TweenModule.fromTo(element, duration, from, to);
      onCancel &&
        onCancel(function() {
          tween.kill();
        });
    });
  };

  util.all = Promise.all;
  return util;
};
