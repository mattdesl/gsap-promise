var TweenMax = require('gsap')

module.exports = function(Promise) {
	function animateFunc(func, element, duration, opts) {
		opts = opts||{}
		return new Promise(function(resolve, reject) {
			opts.onComplete = resolve
			func(element, duration, opts)
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
		return new Promise(function(resolve, reject) {
			to.onComplete = resolve
			TweenMax.fromTo(element, duration, from, to)
		})
	}
	return util	
}