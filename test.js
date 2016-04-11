var animate = require('./')
var test = require('tape').test

test('a Promise wrapper around gsap / twenelite', function(t) {
	t.test('Basic tests', function(st){
		st.plan(4)

		st.equal(animate, animate.to, 'animate equals animate.to')

		var a = { value: 0 }
		animate.to(a, 0.5, {
			value: 1.0
		}).then(function() {
			st.equal(a.value, 1, 'animate.to works')
		})

		var b = { value: 5 }
		animate.set(b, { delay: 0.5, value: 10 }).then(function() {
			st.equal(b.value, 10, 'animate.set with delay works')
		})

		var c = { value: 10 }
		animate.fromTo(c, 1.0, { value: 0 }, { value: 5 }).then(function() {
			st.equal(c.value, 5, 'animate.fromTo works')
		})
	});

	t.test('From to tests', function(st){
		st.plan(1);

		var d = {value: 0};
		var promise = animate
												.fromTo(d, 1, { value: 0 }, { value: 100 })
												.finally(function () {
													st.assert(d.value < 100, 'fromTo cancelling works')
												});

		setTimeout(function(){
			promise.cancel()
		}, 200);
	});

	t.test('StaggerFrom tests', function(st){
		st.plan(1);

		var e = [{value: 100}, {value: 100}, {value: 100}]
		var promise = animate
												.staggerFrom(e, 1, { value: 0 }, 0.1)
												.finally(function () {
													st.assert(e.slice(-1)[0].value < 100, 'staggerFrom cancelling works')
												});

		setTimeout(function(){
			promise.cancel()
		}, 200);
	});

	t.test('Stagger FromTo tests', function(st){
		st.plan(1);

		var e = [{value: 100}, {value: 100}, {value: 100}]
		var promise = animate
												.staggerFromTo(e, 1, { value: 0 }, { value: 100 }, 0.1)
												.finally(function () {
													st.assert(e.slice(-1)[0].value < 100, 'staggerFromTo cancelling works')
												});

		setTimeout(function(){
			promise.cancel()
		}, 200);
	});

	t.test('Promise all', function(st){
		st.plan(1);

		var f = [{value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}];
		var to = {value: 100};
		var timeout = setTimeout(function () {
			st.fail('not all promises resolved, are arguments being mutated?')
		}, 800)
		Promise.all([
			animate.set(f[0], to),
			animate.set(f[1], to),
			animate.to(f[2], 0.5, to),
			animate.to(f[3], 0.5, to),
			animate.fromTo(f[4], 0.5, {value: 0}, to),
			animate.fromTo(f[5], 0.5, {value: 0}, to)
		]).then(function () {
			clearTimeout(timeout)

			st.assert(f.every(function (item) {
				return item.value === to.value
			}), 'all promises resolved')
		})
	});
})