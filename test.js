var animate = require('./')
var test = require('tape').test

test('a Promise wrapper around gsap / twenelite', function(t) {
    t.plan(7)

	t.equal(animate, animate.to, 'animate equals animate.to')

	var a = { value: 0 }
	animate.to(a, 0.5, {
		value: 1.0
	}).then(function() {
		t.equal(a.value, 1, 'animate.to works')
	})

	var b = { value: 5 }
	animate.set(b, { delay: 0.5, value: 10 }).then(function() {
		t.equal(b.value, 10, 'animate.set with delay works')
	})

	var c = { value: 10 }
	animate.fromTo(c, 1.0, { value: 0 }, { value: 5 }).then(function() {
		t.equal(c.value, 5, 'animate.fromTo works')
	})

	var d = {value: 0};
	animate
		.fromTo(d, 0.5, { value: 0 }, { value: 100 })
		.delay(100)
		.cancel()
		.delay(500)
		.then(function () {
			t.assert(d.value < 100, 'fromTo cancelling works')
		})

	var e = [{value: 100}, {value: 100}, {value: 100}]
	animate
		.staggerFrom(e, 0.5, { value: 0 }, 0.1)
		.delay(100)
		.cancel()
		.delay(1000)
		.then(function () {
			t.assert(e.slice(-1)[0].value < 100, 'staggerFrom cancelling works')
		})

	animate
		.staggerFromTo(e, 0.5, { value: 0 }, { value: 100 }, 0.1)
		.delay(100)
		.cancel()
		.delay(1000)
		.then(function () {
			t.assert(e.slice(-1)[0].value < 100, 'staggerFromTo cancelling works')
		})

})