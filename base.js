var TweenMax = require('gsap')

module.exports = function(Promise) {
	function animateFunc(func, element, duration, opts) {
		opts = opts||{}
		var tween
		return new Promise(function(resolve, reject) {
			opts.onComplete = resolve
			tween = func(element, duration, opts)
		}).cancellable().catch(Promise.CancellationError, function(e) {
				tween.kill()
		})
	}

	var animateTo = animateFunc.bind(null, TweenMax.to)

	var util = animateTo
	util.to = animateTo
	util.from = animateFunc.bind(null, TweenMax.from)
	
	util.set = function animateSet(element, params) {
		params = params||{}
		return new Promise(function(resolve, reject) {
			params.onComplete = resolve
			TweenMax.set(element, params)
		})
	}

	util.fromTo = function animateFromTo(element, duration, from, to) {
		to = to||{}
		var tween
		return new Promise(function(resolve, reject) {
			to.onComplete = resolve
			tween = TweenMax.fromTo(element, duration, from, to)
		}).cancellable().catch(Promise.CancellationError, function(e) {
				tween.kill()
		})
	}

	;['staggerTo', 'staggerFrom'].forEach(function(fn) {
		var tweenFunc = TweenMax[fn]
		var tweens
		util[fn] = function(element, duration, from, stagger) {
			return new Promise(function(resolve, reject) {
				tweens = tweenFunc(element, duration, from, stagger, resolve)
			}).cancellable().catch(Promise.CancellationError, function(e) {
				tweens.forEach( function (tween) { tween.kill() })
			})
		}
	})

	util.staggerFromTo = function staggerFromTo(element, duration, from, to, stagger, position) {
		var tweens
		return new Promise(function(resolve, reject) {
			tweens = TweenMax.staggerFromTo(element, duration, from, to, stagger, resolve)
		}).cancellable().catch(Promise.CancellationError, function(e) {
			tweens.forEach( function (tween) { tween.kill() })
		})
	}


	util.all = Promise.all
	return util
}