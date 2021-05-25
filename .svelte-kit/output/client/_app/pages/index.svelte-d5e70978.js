import {
	C as t,
	S as i,
	i as e,
	s,
	e as a,
	c as r,
	a as M,
	d as I,
	b as n,
	H as c,
	f as o,
	I as g,
	J as l,
	l as N,
	K as u,
	L as j,
	G as T,
	M as h,
	z as D,
	N as d,
	O as m,
	P as L,
	E as w,
	v as z,
	Q as y,
	R as x,
	T as f,
	r as $,
	j as p,
	k as E,
	m as A,
	n as G,
	F as v,
	o as S,
	B as C,
	u as b,
	w as Z,
	U as O,
	D as k,
	t as P,
	g as Y,
	h as B,
	V as Q,
	W as U
} from '../chunks/vendor-783391f4.js';
import { n as H, B as F, L as R, C as W, P as J } from '../chunks/PageTransition-919305e0.js';
var V = (function () {
	const i = t(!1);
	return {
		subscribe: i.subscribe,
		reportNavigation: (t, e) => {
			i.set([t, e]);
		}
	};
})();
const { window: X } = d;
function _(t) {
	let i, e, s;
	return {
		c() {
			(i = a('div')), this.h();
		},
		l(t) {
			(i = r(t, 'DIV', { class: !0 })), M(i).forEach(I), this.h();
		},
		h() {
			n(i, 'class', 'grabbable svelte-19uisgs'), c(i, 'mousedown', t[1]);
		},
		m(a, r) {
			o(a, i, r), t[8](i), e || ((s = [g(i, 'mousedown', t[4]), g(i, 'mouseup', t[5])]), (e = !0));
		},
		p(t, e) {
			2 & e && c(i, 'mousedown', t[1]);
		},
		d(a) {
			a && I(i), t[8](null), (e = !1), l(s);
		}
	};
}
function q(t) {
	let i,
		e,
		s,
		a = !t[0] && _(t);
	return {
		c() {
			a && a.c(), (i = N());
		},
		l(t) {
			a && a.l(t), (i = N());
		},
		m(r, M) {
			a && a.m(r, M), o(r, i, M), e || ((s = g(X, 'wheel', u(j(t[3])), { passive: !1 })), (e = !0));
		},
		p(t, [e]) {
			t[0] ? a && (a.d(1), (a = null)) : a ? a.p(t, e) : ((a = _(t)), a.c(), a.m(i.parentNode, i));
		},
		i: T,
		o: T,
		d(t) {
			a && a.d(t), t && I(i), (e = !1), s();
		}
	};
}
function K(t) {
	return (t * Math.max(document.documentElement.clientHeight, window.innerHeight || 0)) / 100;
}
function tt(t) {
	return (t * Math.max(document.documentElement.clientWidth, window.innerWidth || 0)) / 100;
}
function it(t) {
	return Math.max(K(t), tt(t));
}
function et(t) {
	let i;
	return (
		window.matchMedia('(max-width: 1439px)').matches
			? (i = Math.max(2550, it(250)))
			: window.matchMedia('(min-width: 1439px)').matches && (i = Math.max(2550, it(170))),
		i > t ? (i - t) / 2 : 0
	);
}
function st(t, i, e) {
	let s, a;
	h(t, H, (t) => e(7, (s = t))), h(t, V, (t) => e(15, (a = t)));
	let r,
		M = !1;
	D(() => {
		if (
			(e(6, (r = document.querySelector('.scroller'))),
			a
				? (e(6, (r.scrollTop = a[1]), r), e(6, (r.scrollLeft = a[0]), r))
				: (history.scrollRestoration && (window.history.scrollRestoration = 'manual'),
				  e(6, (r.scrollTop = et(K(100))), r),
				  e(6, (r.scrollLeft = et(tt(100))), r)),
			'maxTouchPoints' in navigator)
		)
			e(0, (M = navigator.maxTouchPoints > 0));
		else if ('msMaxTouchPoints' in navigator) e(0, (M = navigator.msMaxTouchPoints > 0));
		else {
			var t = window.matchMedia && matchMedia('(pointer:coarse)');
			if (t && '(pointer:coarse)' === t.media) e(0, (M = !!t.matches));
			else if ('orientation' in window) e(0, (M = !0));
			else {
				var i = navigator.userAgent;
				e(
					0,
					(M =
						/\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(i) ||
						/\b(Android|Windows Phone|iPad|iPod)\b/i.test(i))
				);
			}
		}
	});
	let I,
		n,
		c = !1,
		o = { x: 0, y: 0 },
		g = { x: 0, y: 0 },
		l = 0,
		N = 0,
		u = 1;
	function j() {
		cancelAnimationFrame(n), (u = 1);
	}
	function T() {
		(l *= u),
			(N *= u),
			d(l, N),
			(u -= 0.01),
			(Math.abs(l) > 0.5 || Math.abs(N) > 0.5) && (n = requestAnimationFrame(T));
	}
	function d(t, i) {
		(l = Math.min(70, t)),
			(N = Math.min(70, i)),
			e(6, (r.scrollLeft = r.scrollLeft + l), r),
			e(6, (r.scrollTop = r.scrollTop + N), r);
	}
	function L() {
		e(1, (c = !1)),
			j(),
			(n = requestAnimationFrame(T)),
			I.removeEventListener('mousemove', w),
			I.removeEventListener('mouseout', L);
	}
	function w(t) {
		(g.x = t.clientX), (g.y = t.clientY);
		d(o.x - g.x, o.y - g.y), (o.x = t.clientX), (o.y = t.clientY);
	}
	return (
		(t.$$.update = () => {
			192 & t.$$.dirty && s && V.reportNavigation(r.scrollLeft, r.scrollTop);
		}),
		[
			M,
			c,
			I,
			function (t) {
				j();
				let i = Math.round(t.deltaY / 2),
					s = Math.round(t.deltaX / 2);
				e(6, (r.scrollLeft = r.scrollLeft + s), r), e(6, (r.scrollTop = r.scrollTop + i), r);
			},
			function (t) {
				e(1, (c = !0)),
					j(),
					(o.x = t.clientX),
					(o.y = t.clientY),
					I.addEventListener('mousemove', w),
					I.addEventListener('mouseout', L),
					window.getSelection().removeAllRanges();
			},
			L,
			r,
			s,
			function (t) {
				m[t ? 'unshift' : 'push'](() => {
					(I = t), e(2, I);
				});
			}
		]
	);
}
class at extends i {
	constructor(t) {
		super(), e(this, t, st, q, s, {});
	}
}
var rt = (function () {
	const i = t([]);
	return {
		subscribe: i.subscribe,
		registerWindow: (t) => {
			i.update((i) => [...i, t]);
		},
		unregisterWindow: (t) => {
			i.update((i) => i.filter((i) => wdnw.id != t));
		},
		bringToForeground: (t) => {
			i.update((i) => {
				let e = i.find((i) => i.id === t);
				const s = i.indexOf(e),
					a = e.parallax;
				let r = i.find((t) => t.id === e.intersections[0]);
				const M = i.indexOf(r),
					I = r.parallax;
				(e.parallax = I),
					(e.isInForeground = !0),
					(r.parallax = a),
					(r.isInForeground = !1),
					(r.touched = !0);
				let n = [...i];
				return (n[s] = e), (n[M] = r), n;
			});
		},
		updateIsMinimized: (t) => {
			i.update((i) => {
				let e = i.find((i) => i.id === t),
					s = i.find((t) => t.id === e.intersections[0]);
				const a = i.indexOf(s);
				s.intersectionIsMinimized = !s.intersectionIsMinimized;
				let r = [...i];
				return (r[a] = s), r;
			});
		}
	};
})();
function Mt(t) {
	let i, e;
	return {
		c() {
			(i = a('h1')), (e = P('Title')), this.h();
		},
		l(t) {
			i = r(t, 'H1', { class: !0 });
			var s = M(i);
			(e = Y(s, 'Title')), s.forEach(I), this.h();
		},
		h() {
			n(i, 'class', 'svelte-n9tyd0');
		},
		m(t, s) {
			o(t, i, s), v(i, e);
		},
		p: T,
		d(t) {
			t && I(i);
		}
	};
}
function It(t) {
	let i, e;
	return {
		c() {
			(i = a('h1')), (e = P(t[5])), this.h();
		},
		l(s) {
			i = r(s, 'H1', { class: !0 });
			var a = M(i);
			(e = Y(a, t[5])), a.forEach(I), this.h();
		},
		h() {
			n(i, 'class', 'svelte-n9tyd0');
		},
		m(t, s) {
			o(t, i, s), v(i, e);
		},
		p(t, i) {
			32 & i && B(e, t[5]);
		},
		d(t) {
			t && I(i);
		}
	};
}
function nt(t) {
	let i, e;
	return (
		(i = new F({ props: { buttonType: 'hidden' } })),
		{
			c() {
				p(i.$$.fragment);
			},
			l(t) {
				A(i.$$.fragment, t);
			},
			m(t, s) {
				S(i, t, s), (e = !0);
			},
			p: T,
			i(t) {
				e || (z(i.$$.fragment, t), (e = !0));
			},
			o(t) {
				$(i.$$.fragment, t), (e = !1);
			},
			d(t) {
				Z(i, t);
			}
		}
	);
}
function ct(t) {
	let i, e;
	return (
		(i = new F({ props: { buttonType: 'subpage', href: t[9] } })),
		{
			c() {
				p(i.$$.fragment);
			},
			l(t) {
				A(i.$$.fragment, t);
			},
			m(t, s) {
				S(i, t, s), (e = !0);
			},
			p(t, e) {
				const s = {};
				512 & e && (s.href = t[9]), i.$set(s);
			},
			i(t) {
				e || (z(i.$$.fragment, t), (e = !0));
			},
			o(t) {
				$(i.$$.fragment, t), (e = !1);
			},
			d(t) {
				Z(i, t);
			}
		}
	);
}
function ot(t) {
	let i, e, s;
	const g = t[18].default,
		l = k(g, t, t[17], null),
		N =
			l ||
			(function (t) {
				let i, e;
				return {
					c() {
						(i = a('p')), (e = P('Content goes here'));
					},
					l(t) {
						i = r(t, 'P', {});
						var s = M(i);
						(e = Y(s, 'Content goes here')), s.forEach(I);
					},
					m(t, s) {
						o(t, i, s), v(i, e);
					},
					d(t) {
						t && I(i);
					}
				};
			})();
	return {
		c() {
			(i = a('div')), N && N.c(), this.h();
		},
		l(t) {
			i = r(t, 'DIV', { class: !0, style: !0 });
			var e = M(i);
			N && N.l(e), e.forEach(I), this.h();
		},
		h() {
			n(i, 'class', 'content-wrapper svelte-n9tyd0'),
				L(i, 'height', t[2] - 36 + 'px'),
				L(i, 'background', t[4]),
				L(i, 'background-size', 'cover'),
				c(i, 'no-events', !t[1]);
		},
		m(t, e) {
			o(t, i, e), N && N.m(i, null), (s = !0);
		},
		p(t, e) {
			l && l.p && (!s || 131072 & e) && w(l, g, t, t[17], e, null, null),
				(!s || 4 & e) && L(i, 'height', t[2] - 36 + 'px'),
				(!s || 16 & e) && L(i, 'background', t[4]),
				2 & e && c(i, 'no-events', !t[1]);
		},
		i(t) {
			s ||
				(z(N, t),
				y(() => {
					e || (e = x(i, f, {}, !0)), e.run(1);
				}),
				(s = !0));
		},
		o(t) {
			$(N, t), e || (e = x(i, f, {}, !1)), e.run(0), (s = !1);
		},
		d(t) {
			t && I(i), N && N.d(t), t && e && e.end();
		}
	};
}
function gt(t) {
	let i, e, s, l, N, u, j, T, h, D, d, m, w;
	function y(t, i) {
		return t[5] ? It : Mt;
	}
	(l = new F({ props: { buttonType: 'minimize' } })), l.$on('toggleMinimize', t[15]);
	let x = y(t),
		f = x(t);
	const O = [ct, nt],
		k = [];
	function P(t, i) {
		return t[6] ? 0 : 1;
	}
	(j = P(t)), (T = k[j] = O[j](t));
	let Y = !t[10] && ot(t);
	return {
		c() {
			(i = a('div')),
				(e = a('section')),
				(s = a('header')),
				p(l.$$.fragment),
				(N = E()),
				f.c(),
				(u = E()),
				T.c(),
				(h = E()),
				Y && Y.c(),
				this.h();
		},
		l(t) {
			i = r(t, 'DIV', { style: !0, class: !0 });
			var a = M(i);
			e = r(a, 'SECTION', { style: !0, class: !0 });
			var n = M(e);
			s = r(n, 'HEADER', { class: !0 });
			var c = M(s);
			A(l.$$.fragment, c),
				(N = G(c)),
				f.l(c),
				(u = G(c)),
				T.l(c),
				c.forEach(I),
				(h = G(n)),
				Y && Y.l(n),
				n.forEach(I),
				a.forEach(I),
				this.h();
		},
		h() {
			n(s, 'class', 'svelte-n9tyd0'),
				L(e, '--windowWidth', t[3]),
				L(e, '--windowHeight', t[2]),
				L(e, '--order', t[7] / 10),
				n(e, 'class', 'svelte-n9tyd0'),
				c(e, 'blur-intro', t[13]),
				L(i, 'width', t[3] + 'px'),
				L(i, 'height', t[2] + 'px'),
				L(i, '--baseShuffleDistance', t[10] | t[11] ? 0 : t[8].base),
				L(i, '--largeShuffleDistance', t[10] | t[11] ? 0 : t[8].large),
				n(i, 'class', (D = 'parallax-wrapper ' + t[0] + ' svelte-n9tyd0')),
				c(i, 'trigger-forward-shuffle', !t[1] && t[12]),
				c(i, 'minimized-notransition', t[10] | t[11]);
		},
		m(a, r) {
			o(a, i, r),
				v(i, e),
				v(e, s),
				S(l, s, null),
				v(s, N),
				f.m(s, null),
				v(s, u),
				k[j].m(s, null),
				v(e, h),
				Y && Y.m(e, null),
				(d = !0),
				m || ((w = g(e, 'click', t[14])), (m = !0));
		},
		p(t, [a]) {
			x === (x = y(t)) && f ? f.p(t, a) : (f.d(1), (f = x(t)), f && (f.c(), f.m(s, u)));
			let r = j;
			(j = P(t)),
				j === r
					? k[j].p(t, a)
					: (C(),
					  $(k[r], 1, 1, () => {
							k[r] = null;
					  }),
					  b(),
					  (T = k[j]),
					  T ? T.p(t, a) : ((T = k[j] = O[j](t)), T.c()),
					  z(T, 1),
					  T.m(s, null)),
				t[10]
					? Y &&
					  (C(),
					  $(Y, 1, 1, () => {
							Y = null;
					  }),
					  b())
					: Y
					? (Y.p(t, a), 1024 & a && z(Y, 1))
					: ((Y = ot(t)), Y.c(), z(Y, 1), Y.m(e, null)),
				(!d || 8 & a) && L(e, '--windowWidth', t[3]),
				(!d || 4 & a) && L(e, '--windowHeight', t[2]),
				(!d || 128 & a) && L(e, '--order', t[7] / 10),
				8192 & a && c(e, 'blur-intro', t[13]),
				(!d || 8 & a) && L(i, 'width', t[3] + 'px'),
				(!d || 4 & a) && L(i, 'height', t[2] + 'px'),
				(!d || 3328 & a) && L(i, '--baseShuffleDistance', t[10] | t[11] ? 0 : t[8].base),
				(!d || 3328 & a) && L(i, '--largeShuffleDistance', t[10] | t[11] ? 0 : t[8].large),
				(!d || (1 & a && D !== (D = 'parallax-wrapper ' + t[0] + ' svelte-n9tyd0'))) &&
					n(i, 'class', D),
				4099 & a && c(i, 'trigger-forward-shuffle', !t[1] && t[12]),
				3073 & a && c(i, 'minimized-notransition', t[10] | t[11]);
		},
		i(t) {
			d || (z(l.$$.fragment, t), z(T), z(Y), (d = !0));
		},
		o(t) {
			$(l.$$.fragment, t), $(T), $(Y), (d = !1);
		},
		d(t) {
			t && I(i), Z(l), f.d(), k[j].d(), Y && Y.d(), (m = !1), w();
		}
	};
}
function lt(t, i, e) {
	let s,
		{ $$slots: a = {}, $$scope: r } = i,
		{ height: M } = i,
		{ width: I } = i,
		{ parallax: n } = i,
		{ background: c = '' } = i,
		{ title: o } = i,
		{ enlargeable: g = !0 } = i,
		{ id: l } = i,
		{ isInForeground: N = !0 } = i,
		{ intersections: u = [] } = i,
		{ distanceFromIntersection: j = 20 } = i,
		{ href: T = '/pages/about' } = i,
		h = !1,
		d = !1,
		m = !1,
		L = !1;
	rt.registerWindow({
		id: l,
		parallax: n,
		isInForeground: N,
		intersections: u,
		intersectionIsMinimized: !1,
		touched: m
	});
	const w = rt.subscribe((t) => {
		(s = t.find((t) => t.id === l)),
			e(1, (N = s.isInForeground)),
			e(0, (n = s.parallax)),
			e(12, (m = s.touched)),
			e(11, (d = s.intersectionIsMinimized));
	});
	return (
		D(() => {
			e(12, (m = !1)), e(13, (L = !0));
		}),
		O(() => {
			w && w();
		}),
		(t.$$set = (t) => {
			'height' in t && e(2, (M = t.height)),
				'width' in t && e(3, (I = t.width)),
				'parallax' in t && e(0, (n = t.parallax)),
				'background' in t && e(4, (c = t.background)),
				'title' in t && e(5, (o = t.title)),
				'enlargeable' in t && e(6, (g = t.enlargeable)),
				'id' in t && e(7, (l = t.id)),
				'isInForeground' in t && e(1, (N = t.isInForeground)),
				'intersections' in t && e(16, (u = t.intersections)),
				'distanceFromIntersection' in t && e(8, (j = t.distanceFromIntersection)),
				'href' in t && e(9, (T = t.href)),
				'$$scope' in t && e(17, (r = t.$$scope));
		}),
		[
			n,
			N,
			M,
			I,
			c,
			o,
			g,
			l,
			j,
			T,
			h,
			d,
			m,
			L,
			function () {
				N || h || rt.bringToForeground(l);
			},
			function () {
				e(10, (h = !h)), 0 != u.length && rt.updateIsMinimized(l);
			},
			u,
			r,
			a
		]
	);
}
class Nt extends i {
	constructor(t) {
		super(),
			e(this, t, lt, gt, s, {
				height: 2,
				width: 3,
				parallax: 0,
				background: 4,
				title: 5,
				enlargeable: 6,
				id: 7,
				isInForeground: 1,
				intersections: 16,
				distanceFromIntersection: 8,
				href: 9
			});
	}
}
function ut(t) {
	let i, e, s, c, g, l, N, u, j, T, h, D;
	return {
		c() {
			(i = a('div')),
				(e = a('p')),
				(s = P('NICE')),
				(c = E()),
				(g = a('p')),
				(l = P('TO')),
				(N = E()),
				(u = a('p')),
				(j = P('MEET')),
				(T = E()),
				(h = a('p')),
				(D = P('YOU')),
				this.h();
		},
		l(t) {
			i = r(t, 'DIV', { class: !0 });
			var a = M(i);
			e = r(a, 'P', { style: !0, class: !0 });
			var n = M(e);
			(s = Y(n, 'NICE')), n.forEach(I), (c = G(a)), (g = r(a, 'P', { style: !0, class: !0 }));
			var o = M(g);
			(l = Y(o, 'TO')), o.forEach(I), (N = G(a)), (u = r(a, 'P', { style: !0, class: !0 }));
			var d = M(u);
			(j = Y(d, 'MEET')), d.forEach(I), (T = G(a)), (h = r(a, 'P', { style: !0, class: !0 }));
			var m = M(h);
			(D = Y(m, 'YOU')), m.forEach(I), a.forEach(I), this.h();
		},
		h() {
			L(e, '--animation-order', '0'),
				L(e, '--left-offset', '110'),
				n(e, 'class', 'svelte-1qqs9xw'),
				L(g, '--animation-order', '1'),
				L(g, '--left-offset', '208'),
				n(g, 'class', 'svelte-1qqs9xw'),
				L(u, '--animation-order', '2'),
				L(u, '--left-offset', '62'),
				n(u, 'class', 'svelte-1qqs9xw'),
				L(h, '--animation-order', '3'),
				L(h, '--left-offset', '136'),
				n(h, 'class', 'svelte-1qqs9xw'),
				n(i, 'class', 'container svelte-1qqs9xw');
		},
		m(t, a) {
			o(t, i, a),
				v(i, e),
				v(e, s),
				v(i, c),
				v(i, g),
				v(g, l),
				v(i, N),
				v(i, u),
				v(u, j),
				v(i, T),
				v(i, h),
				v(h, D);
		},
		d(t) {
			t && I(i);
		}
	};
}
function jt(t) {
	let i, e, s;
	return (
		(e = new Nt({
			props: {
				width: 378,
				height: 392,
				parallax: 'very-slow',
				background: '#A25C24',
				title: 'ABOUT',
				href: 'pages/about',
				id: 0,
				isInForeground: !0,
				intersections: [1],
				distanceFromIntersection: { base: -13, large: -12 },
				$$slots: { default: [ut] },
				$$scope: { ctx: t }
			}
		})),
		{
			c() {
				(i = a('div')), p(e.$$.fragment), this.h();
			},
			l(t) {
				i = r(t, 'DIV', { class: !0 });
				var s = M(i);
				A(e.$$.fragment, s), s.forEach(I), this.h();
			},
			h() {
				n(i, 'class', 'wrapper grid-area svelte-1qqs9xw');
			},
			m(t, a) {
				o(t, i, a), S(e, i, null), (s = !0);
			},
			p(t, [i]) {
				const s = {};
				1 & i && (s.$$scope = { dirty: i, ctx: t }), e.$set(s);
			},
			i(t) {
				s || (z(e.$$.fragment, t), (s = !0));
			},
			o(t) {
				$(e.$$.fragment, t), (s = !1);
			},
			d(t) {
				t && I(i), Z(e);
			}
		}
	);
}
class Tt extends i {
	constructor(t) {
		super(), e(this, t, null, jt, s, {});
	}
}
const ht = (t) => ({ intersecting: 1 & t }),
	Dt = (t) => ({ intersecting: t[0] });
function dt(t) {
	let i, e;
	const s = t[8].default,
		c = k(s, t, t[7], Dt);
	return {
		c() {
			(i = a('div')), c && c.c(), this.h();
		},
		l(t) {
			i = r(t, 'DIV', { class: !0 });
			var e = M(i);
			c && c.l(e), e.forEach(I), this.h();
		},
		h() {
			n(i, 'class', 'svelte-1hzn8rv');
		},
		m(s, a) {
			o(s, i, a), c && c.m(i, null), t[9](i), (e = !0);
		},
		p(t, [i]) {
			c && c.p && (!e || 129 & i) && w(c, s, t, t[7], i, ht, Dt);
		},
		i(t) {
			e || (z(c, t), (e = !0));
		},
		o(t) {
			$(c, t), (e = !1);
		},
		d(e) {
			e && I(i), c && c.d(e), t[9](null);
		}
	};
}
function mt(t, i, e) {
	let s,
		{ $$slots: a = {}, $$scope: r } = i,
		{ once: M = !1 } = i,
		{ top: I = 0 } = i,
		{ bottom: n = 0 } = i,
		{ left: c = 0 } = i,
		{ right: o = 0 } = i,
		g = !1;
	return (
		D(() => {
			if ('undefined' != typeof IntersectionObserver) {
				const t = new IntersectionObserver(
					(i) => {
						e(0, (g = i[0].isIntersecting)), g && M && t.unobserve(s);
					},
					{ rootMargin: `${n}px ${c}px ${I}px ${o}px` }
				);
				return t.observe(s), () => t.unobserve(s);
			}
			function t() {
				const i = s.getBoundingClientRect();
				e(
					0,
					(g =
						i.bottom + n > 0 &&
						i.right + o > 0 &&
						i.top - I < window.innerHeight &&
						i.left - c < window.innerWidth)
				),
					g && M && window.removeEventListener('scroll', t);
			}
			return window.addEventListener('scroll', t), () => window.removeEventListener('scroll', t);
		}),
		(t.$$set = (t) => {
			'once' in t && e(2, (M = t.once)),
				'top' in t && e(3, (I = t.top)),
				'bottom' in t && e(4, (n = t.bottom)),
				'left' in t && e(5, (c = t.left)),
				'right' in t && e(6, (o = t.right)),
				'$$scope' in t && e(7, (r = t.$$scope));
		}),
		[
			g,
			s,
			M,
			I,
			n,
			c,
			o,
			r,
			a,
			function (t) {
				m[t ? 'unshift' : 'push'](() => {
					(s = t), e(1, s);
				});
			}
		]
	);
}
class Lt extends i {
	constructor(t) {
		super(), e(this, t, mt, dt, s, { once: 2, top: 3, bottom: 4, left: 5, right: 6 });
	}
}
function wt(t) {
	let i, e;
	return {
		c() {
			(i = a('img')), this.h();
		},
		l(t) {
			(i = r(t, 'IMG', {
				sizes: !0,
				srcset: !0,
				alt: !0,
				src: !0,
				draggable: !0,
				loading: !0,
				class: !0
			})),
				this.h();
		},
		h() {
			n(i, 'sizes', t[3]),
				n(i, 'srcset', t[0]),
				n(i, 'alt', t[2]),
				i.src !== (e = t[1]) && n(i, 'src', e),
				n(i, 'draggable', 'false'),
				n(i, 'loading', 'lazy'),
				n(i, 'class', 'svelte-i6xmyx'),
				c(i, 'loaded', t[4]);
		},
		m(e, s) {
			o(e, i, s), t[6](i);
		},
		p(t, [s]) {
			8 & s && n(i, 'sizes', t[3]),
				1 & s && n(i, 'srcset', t[0]),
				4 & s && n(i, 'alt', t[2]),
				2 & s && i.src !== (e = t[1]) && n(i, 'src', e),
				16 & s && c(i, 'loaded', t[4]);
		},
		i: T,
		o: T,
		d(e) {
			e && I(i), t[6](null);
		}
	};
}
function zt(t, i, e) {
	let s,
		{ srcset: a } = i,
		{ src: r } = i,
		{ alt: M } = i,
		{ sizes: I } = i,
		n = !1;
	return (
		D(() => {
			e(
				5,
				(s.onload = () => {
					e(4, (n = !0));
				}),
				s
			);
		}),
		(t.$$set = (t) => {
			'srcset' in t && e(0, (a = t.srcset)),
				'src' in t && e(1, (r = t.src)),
				'alt' in t && e(2, (M = t.alt)),
				'sizes' in t && e(3, (I = t.sizes));
		}),
		[
			a,
			r,
			M,
			I,
			n,
			s,
			function (t) {
				m[t ? 'unshift' : 'push'](() => {
					(s = t), e(5, s);
				});
			}
		]
	);
}
class yt extends i {
	constructor(t) {
		super(), e(this, t, zt, wt, s, { srcset: 0, src: 1, alt: 2, sizes: 3 });
	}
}
function xt(t) {
	let i, e;
	return (
		(i = new yt({ props: { srcset: t[3], sizes: t[2], alt: t[1], src: t[0] } })),
		{
			c() {
				p(i.$$.fragment);
			},
			l(t) {
				A(i.$$.fragment, t);
			},
			m(t, s) {
				S(i, t, s), (e = !0);
			},
			p(t, e) {
				const s = {};
				8 & e && (s.srcset = t[3]),
					4 & e && (s.sizes = t[2]),
					2 & e && (s.alt = t[1]),
					1 & e && (s.src = t[0]),
					i.$set(s);
			},
			i(t) {
				e || (z(i.$$.fragment, t), (e = !0));
			},
			o(t) {
				$(i.$$.fragment, t), (e = !1);
			},
			d(t) {
				Z(i, t);
			}
		}
	);
}
function ft(t) {
	let i,
		e,
		s = (t[5] || t[4]) && xt(t);
	return {
		c() {
			s && s.c(), (i = N());
		},
		l(t) {
			s && s.l(t), (i = N());
		},
		m(t, a) {
			s && s.m(t, a), o(t, i, a), (e = !0);
		},
		p(t, e) {
			t[5] || t[4]
				? s
					? (s.p(t, e), 48 & e && z(s, 1))
					: ((s = xt(t)), s.c(), z(s, 1), s.m(i.parentNode, i))
				: s &&
				  (C(),
				  $(s, 1, 1, () => {
						s = null;
				  }),
				  b());
		},
		i(t) {
			e || (z(s), (e = !0));
		},
		o(t) {
			$(s), (e = !1);
		},
		d(t) {
			s && s.d(t), t && I(i);
		}
	};
}
function $t(t) {
	let i, e;
	return (
		(i = new Lt({
			props: {
				once: !0,
				$$slots: {
					default: [ft, ({ intersecting: t }) => ({ 5: t }), ({ intersecting: t }) => (t ? 32 : 0)]
				},
				$$scope: { ctx: t }
			}
		})),
		{
			c() {
				p(i.$$.fragment);
			},
			l(t) {
				A(i.$$.fragment, t);
			},
			m(t, s) {
				S(i, t, s), (e = !0);
			},
			p(t, [e]) {
				const s = {};
				127 & e && (s.$$scope = { dirty: e, ctx: t }), i.$set(s);
			},
			i(t) {
				e || (z(i.$$.fragment, t), (e = !0));
			},
			o(t) {
				$(i.$$.fragment, t), (e = !1);
			},
			d(t) {
				Z(i, t);
			}
		}
	);
}
function pt(t, i, e) {
	let { src: s } = i,
		{ alt: a } = i,
		{ sizes: r } = i,
		{ srcset: M } = i,
		I = !1;
	return (
		D(() => {
			'loading' in HTMLImageElement.prototype && e(4, (I = !0));
		}),
		(t.$$set = (t) => {
			'src' in t && e(0, (s = t.src)),
				'alt' in t && e(1, (a = t.alt)),
				'sizes' in t && e(2, (r = t.sizes)),
				'srcset' in t && e(3, (M = t.srcset));
		}),
		[s, a, r, M, I]
	);
}
class Et extends i {
	constructor(t) {
		super(), e(this, t, pt, $t, s, { src: 0, alt: 1, sizes: 2, srcset: 3 });
	}
}
function At(t) {
	let i, e;
	return (
		(i = new Et({
			props: {
				sizes: '463px',
				srcset:
					'https://res.cloudinary.com/thdrstnr/image/upload/w_960,f_auto/' +
					vt +
					' 960w, \n            https://res.cloudinary.com/thdrstnr/image/upload/w_463,f_auto,q_auto:best/' +
					vt +
					' 463w,\n            https://res.cloudinary.com/thdrstnr/image/upload/w_291,f_auto,q_auto:best/' +
					vt +
					' 291w',
				src: 'https://res.cloudinary.com/thdrstnr/image/upload/w_960,f_auto/' + vt,
				alt: 'Con Corazón is embracing artisans from countries at war'
			}
		})),
		{
			c() {
				p(i.$$.fragment);
			},
			l(t) {
				A(i.$$.fragment, t);
			},
			m(t, s) {
				S(i, t, s), (e = !0);
			},
			p: T,
			i(t) {
				e || (z(i.$$.fragment, t), (e = !0));
			},
			o(t) {
				$(i.$$.fragment, t), (e = !1);
			},
			d(t) {
				Z(i, t);
			}
		}
	);
}
function Gt(t) {
	let i, e, s;
	return (
		(e = new Nt({
			props: {
				width: 465,
				height: 616,
				parallax: 'very-fast',
				background:
					'#6EA179 url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA5NjAgMTIwMCI+PHBhdGggZmlsbD0iIzgwNzI1ZiIgZD0iTTAgMGg5NTZ2MTIwMEgweiIvPjxnIGZpbGwtb3BhY2l0eT0iLjUiPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0tMzkuNSAxMjcyLjdsNDQ2LTEzMzEgNTMuOSA2NjMuOS0yMjcuNiA2Njd6Ii8+PHBhdGggZD0iTS03Mi43IDkyMlYtLjVsMzY4LjggMy4yTDE2Mi40IDgwN3oiLz48cGF0aCBmaWxsPSIjMWExZjEzIiBkPSJNOTU5IDU0MS41TDQyOC40IDcyOCAzMjMgMTA5Mi4xbDYzMC43IDE4MC42eiIvPjxwYXRoIGZpbGw9IiNmZWRjYmUiIGQ9Ik0xMzQuNiA4MjlsMTY1LjEtNDA3LjIgNjA0LjctNDM2LTIxLjEgNDgxLjh6Ii8+PHBhdGggZD0iTS03Mi43IDk5Mi43bDIzOC4yLTI5M0wyNjAuOC02MSAxLjgtNzIuN3oiLz48cGF0aCBmaWxsPSJpdm9yeSIgZD0iTTM2NSA4NDkuOUw0NDEgMzYybC01MTMuNyA3NDYuOCA3NSAxMjQuNXoiLz48cGF0aCBmaWxsPSIjNjgzYjFjIiBkPSJNODk0LTcyLjdMMzg2IDcwLjdsMjMxLjQgMTIwMi0xNS4yLTExMjJ6Ii8+PHBhdGggZmlsbD0iI2ZmY2ZiMyIgZD0iTTQ0OCA5MS4zbC03OC40IDM1MEwyNzYuNi0xbDI5MC4yLTcxLjZ6Ii8+PHBhdGggZmlsbD0iI2NmZThlOSIgZD0iTTQ1My44IDEwODkuOGwtMjcxIDg5LjQtMzAuNiA5My41TDU1MyAxMDg5Ljl6Ii8+PHBhdGggZmlsbD0iI2QzYjhhMCIgZD0iTTU0Ny42IDIwOC4yTDc0OC41IDcwOWwxOTItNTAxLjZMNjM0LjEgODkuMXoiLz48cGF0aCBmaWxsPSIjMTMyNzI5IiBkPSJNNzI4LjQgNzg3LjJsMjA2LjMgMzgzLjItNzMwLjYgMTAyLjMgMzQ3LjctMTQxLjR6Ii8+PHBhdGggZmlsbD0iIzE1MGIwMiIgZD0iTTU0Mi43LTcyLjdsMzI0LjcgMjIuMUw0MDQgMjYwLjNsMTU0LjItMTAuOXoiLz48cGF0aCBmaWxsPSIjNTM4MzkwIiBkPSJNMTAyOSAxMDk5LjhsLTI5Ny41LTI4MiAxMDcuNS05MCAxNzEuNyA0NC4yeiIvPjxwYXRoIGZpbGw9IiNhOTgzNGEiIGQ9Ik0zMDUuNCA5NzQuN2wtMjY2IDI0Ni45IDI3OS04NC41IDIwMi40LTcwNC40eiIvPjxwYXRoIGZpbGw9IiM5OTZjMzMiIGQ9Ik0xMDUgODA1bDIwMC4zLTU3NS40TDE0NCA4OTQuOS03Mi43IDk5Ny44eiIvPjxwYXRoIGZpbGw9IiNmZmZhZjAiIGQ9Ik0yMzAuNiAxMDIzbDI1Ny45LTY0Ni0xNDUuOC0xMS4yLTEzMCAyODkuM3oiLz48cGF0aCBmaWxsPSIjYzlhODg3IiBkPSJNNTE1LjkgMzkwLjFMMzg1LjMgMjEzLjZsNDAuMyAzMzEuN0w4NDIgNjIzLjV6Ii8+PHBhdGggZmlsbD0iIzAwMGEwNyIgZD0iTTMxOC4xIDI0Ny44bC0zOTAuOCA0MjYgMjExLTc0Ni41IDE1Ni4xIDQ5My44eiIvPjxwYXRoIGZpbGw9IiM2ZjUwMmEiIGQ9Ik0xMDI5IDcxMS43TDM4NyA4MTMuNmw1MzUuNi0zMjIuMUw5NDQtMzcuM3oiLz48cGF0aCBmaWxsPSIjZmZlMGJmIiBkPSJNLTcyLjcgOTg2bDM4LjggMjg2LjcgMzUwLjgtMzM1IDgwLTE3My42eiIvPjxwYXRoIGZpbGw9IiNkZjNhMDAiIGQ9Ik01MTkuMSA1Ni4ybC05Mi4zIDU0LjYtNjUuNCA4Mi41IDYwLjUtMTU0Ljd6Ii8+PHBhdGggZmlsbD0iIzQyMGQwMCIgZD0iTTQyMy45IDIzMC41TDU0NiAyOTEuN2wtNDMuMS0xMDcgODAuNy0yNTcuNHoiLz48cGF0aCBmaWxsPSIjNTY0MTI1IiBkPSJNNDg1LjEgNTY0LjVMNTQ0IDYwMGwyMTcgMTk5LjQtMzAzLjcgMzg3eiIvPjxwYXRoIGZpbGw9IiNkY2JhYTIiIGQ9Ik02MDguNyAzMTkuNEwzNjUgMzEzLjNsNDYwLjMtODIuOEw1NDkgMTY3Ljd6Ii8+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTUyMi4yLTcyLjdsLTU3LjQgMzEuNEwzNTQuNyA2Ny4zbC0xNC4zIDg0Ljl6Ii8+PHBhdGggZmlsbD0iIzE2MTkxMCIgZD0iTTcwNC40IDE0MS45bDY4LjQtMTE3LTMzNy05Ny42TDc2NiAxMjQuNXoiLz48cGF0aCBmaWxsPSIjOWE5MTdkIiBkPSJNMjQ3IDEwMC4ybDEwOCAxNzkuNEwyNTUuNyA1MjkgMzQ0LTUwLjV6Ii8+PHBhdGggZmlsbD0iIzlhNzM1MCIgZD0iTTU0Ni41IDE4OC43TDEwMTItNzIuNyA3NDguNCAxNTkuNSA1MDcuMiA0Ni44eiIvPjxwYXRoIGZpbGw9IiNhNTg3NjciIGQ9Ik05NjQuNSAyNTcuOEw4OTAuOC00MC4xbC0yNyAzMTRMNzgyIDcyNy4yeiIvPjxwYXRoIGZpbGw9IiNkZGVhZTgiIGQ9Ik0yNjYuNiAxMTM1LjdsLTE2LjUgMzUuOEw3NC42IDEyNDVsNDAzLjctMTM0eiIvPjxwYXRoIGZpbGw9IiMxYzE2MDAiIGQ9Ik0tNzIuNyA1NzAuNGwxMDYgMjk0LjIgOTYuMy01NiAzNS42LTEwNS40eiIvPjxwYXRoIGZpbGw9IiNhMTg5NWEiIGQ9Ik00NjUuMSA3ODcuNGwtNTUuOC05MyA3NC0yOTMuNCA1My45LTE0Ljd6Ii8+PC9nPjwvc3ZnPg==")',
				title: 'PROJECT_01',
				id: 1,
				isInForeground: !1,
				intersections: [0],
				distanceFromIntersection: { base: 13, large: 12 },
				$$slots: { default: [At] },
				$$scope: { ctx: t }
			}
		})),
		{
			c() {
				(i = a('div')), p(e.$$.fragment), this.h();
			},
			l(t) {
				i = r(t, 'DIV', { class: !0 });
				var s = M(i);
				A(e.$$.fragment, s), s.forEach(I), this.h();
			},
			h() {
				n(i, 'class', 'grid-area svelte-10yjo1h');
			},
			m(t, a) {
				o(t, i, a), S(e, i, null), (s = !0);
			},
			p(t, [i]) {
				const s = {};
				1 & i && (s.$$scope = { dirty: i, ctx: t }), e.$set(s);
			},
			i(t) {
				s || (z(e.$$.fragment, t), (s = !0));
			},
			o(t) {
				$(e.$$.fragment, t), (s = !1);
			},
			d(t) {
				t && I(i), Z(e);
			}
		}
	);
}
const vt = 'MortimerBaltus/Projects/ConCorazon_mksjj0';
class St extends i {
	constructor(t) {
		super(), e(this, t, null, Gt, s, {});
	}
}
function Ct(t) {
	let i, e;
	return (
		(i = new Et({
			props: {
				sizes: '497px',
				srcset:
					'https://res.cloudinary.com/thdrstnr/image/upload/w_1280,f_auto/' +
					Zt +
					' 1280w,\n            https://res.cloudinary.com/thdrstnr/image/upload/w_497,f_auto,q_auto:best/' +
					Zt +
					' 497w,\n            https://res.cloudinary.com/thdrstnr/image/upload/w_312,f_auto,q_auto:best/' +
					Zt +
					' 312w,',
				alt: 'Raceworx',
				src: 'https://res.cloudinary.com/thdrstnr/image/upload/w_1280,f_auto/' + Zt
			}
		})),
		{
			c() {
				p(i.$$.fragment);
			},
			l(t) {
				A(i.$$.fragment, t);
			},
			m(t, s) {
				S(i, t, s), (e = !0);
			},
			p: T,
			i(t) {
				e || (z(i.$$.fragment, t), (e = !0));
			},
			o(t) {
				$(i.$$.fragment, t), (e = !1);
			},
			d(t) {
				Z(i, t);
			}
		}
	);
}
function bt(t) {
	let i, e, s;
	return (
		(e = new Nt({
			props: {
				width: 499,
				height: 392,
				parallax: 'very-fast',
				background:
					'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjgwIDg5NiI+PHBhdGggZmlsbD0iIzdiNzY3NSIgZD0iTTAgMGgxMjgwdjg5NUgweiIvPjxnIGZpbGwtb3BhY2l0eT0iLjUiPjxwYXRoIGZpbGw9IiMwYjAwMDAiIGQ9Ik05NjYgODA5LjZsLS40LTYzMy44TDYyMCAxNTYuNGwtMjkuNSA1OTcuMnoiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMjAzLjItNzcuNUwxMzU3LjUgOC42bC0yOTQuNyA4MTMuNSAxNy42LTY0MC4zeiIvPjxwYXRoIGZpbGw9IiMwMDAzMGMiIGQ9Ik0xMzAuNCA4NC43bC0xNi42IDQ2NCAyMjcuNCA2IDExNi42LTM2My4xeiIvPjxwYXRoIGZpbGw9IiNmY2ZmZjciIGQ9Ik0tNDIuOSA1NjQuMWwyNTEuMyA0OS4xIDM5Mi45IDI0LjIgOC4xLTEwNC40eiIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik04NjQuOSAzNS40bDQ5Mi42IDI4Ni41Vi0xNS45TDk4OC03Ny41eiIvPjxwYXRoIGZpbGw9IiNkMWM5YmIiIGQ9Ik0xOS42IDQ5NC42bC05Ny4xIDM4MkwxMjI5LjMgODQyIDE1MyA3MjkuNXoiLz48cGF0aCBmaWxsPSIjYmFiOWIyIiBkPSJNMTM1Ny41IDc3Ny45bC0zMzEuMi02MS41TDk5Mi44IDU0NCAxMjc1IDM2N3oiLz48cGF0aCBmaWxsPSIjZDZlMmUzIiBkPSJNNTk5LjYgMzYxbDUuNCAxMzEuM0w0MjQuMiA1MTFsMTMuMy0xNDAuM3oiLz48cGF0aCBkPSJNNjIuMiA2MTQuNmw0ODEuOCAxOSA0MDkuOSA1NS03NDQuMi0zNi45eiIvPjxwYXRoIGZpbGw9IiM2MDYxNjUiIGQ9Ik03MjkuNS0yNC41bDMwNC45IDI4Mi4zIDQxLjIgNzkuNSAyODEuOSA2eiIvPjxwYXRoIGZpbGw9IiM0MTE4MTkiIGQ9Ik01NDIuNyA5Ny41bDQzMS45IDYxNy4yTDEzNTcuNSA4MTZsLTY2OS44LTI5LjR6Ii8+PHBhdGggZD0iTTEzMy43IDIxNy42bDUxLjQgOTQuOEwxNTEuMyA3MzVsLTI0LjctNi4yeiIvPjxwYXRoIGZpbGw9IiNiN2I1YjgiIGQ9Ik00ODIuNyA2OC4zbDE0My43LTUyLjUgNDAyIDEyOS44TDY1NCAxNzh6Ii8+PHBhdGggZmlsbD0iIzQxNDc0ZSIgZD0iTTEyMzMuOCA1NDYuMmwxMC42LTQ5LjEtMzkyLTQ4LjQgMjU3LjUgMTA3LjJ6Ii8+PHBhdGggZmlsbD0iIzUzNTI1OCIgZD0iTTE3My4zIDM3LjdsLTI1MC44IDI2MiAxOTEuMiAzTDkwMyAyMjIuMnoiLz48cGF0aCBmaWxsPSIjZDlkZWQwIiBkPSJNNTg2LjEgNzExLjZsLTMzNS05LjJMMTUxIDY1MC4ybDQ3MCAzMHoiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMTE5MS4xIDQ4NGwtMTI1LTkuOCAxNi44LTEyMy4zIDEzMCA0eiIvPjxwYXRoIGZpbGw9IiNmOGY5ZWIiIGQ9Ik0xMzU3LjUgOTcyLjVWODQ0LjdMMzUxLjIgNzY5LjNsOTQ2LjQgMTA0eiIvPjxwYXRoIGZpbGw9IiM4MDE3MTciIGQ9Ik04OTIuNiA2MDEuNmwtMi40LTI1NC40LTE1Ny0xMi43LTU3LjYgMzUxeiIvPjxwYXRoIGZpbGw9IiMyODIzMmEiIGQ9Ik03NSA1MDNMNDAuNyAyNTguNCAzNi44IDU0NyA3NTUgMzg1LjR6Ii8+PHBhdGggZmlsbD0iIzA1MDQwYiIgZD0iTTUzNS45IDIyOC45TDc4NS4xIDE4OGwtMTE1LTEwLjQtNDgwLjcgNDAuMnoiLz48cGF0aCBmaWxsPSIjZGFkNWNmIiBkPSJNMTI5LjMgNTU4LjZsLTIwNi44LTMzLjVMLTQ4IDc4OS44bDE3MC0xMjF6Ii8+PHBhdGggZmlsbD0iI2U3ZjNlYyIgZD0iTTk2NSA0MTguN2wyNS42LTI3Ny4zLS4yIDI4Ni4yLTEzLjUgOTAuN3oiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMTM1Ny41LTQxLjRMODk1LjMtNzcuNWwtOS41IDEzOC42TDEzMjguNiAyNTF6Ii8+PHBhdGggZmlsbD0iIzg5OGQ4ZCIgZD0iTTM5OS4yIDUzNy41bDYuNi0yNzAgMzg0LjYtNTItNDU5IDI1LjN6Ii8+PHBhdGggZmlsbD0iIzAxMDAwOCIgZD0iTTIzOS42IDI0OS42TDI1NSA2MC43bC02Ni4zLTQuMyA2LjUgMTc5LjJ6Ii8+PHBhdGggZmlsbD0iIzE0MTQxOCIgZD0iTTgxMC40IDc1Ny44bDM1MC4zIDEzLjgtMTg1IDMwLjktNDkuMS01NzguOHoiLz48cGF0aCBmaWxsPSIjMTgyMTI3IiBkPSJNMjEzIDI2MC45bDIxNy4yIDI3MC44LTIyMi42IDI3LjZMMjI2LjQgNzczeiIvPjxwYXRoIGZpbGw9IiM4Zjg2N2QiIGQ9Ik0xNS40IDk3Mi41bDEzNDIuMS05NC42LTczMi42LTcyLjdMLTIwIDc0Mi42eiIvPjxwYXRoIGZpbGw9IiMxYzI0MmEiIGQ9Ik01MzUuOSA1NDEuMmw5OS42IDE0LjYtMzYtNjQuOC02OS41LTUuNnoiLz48cGF0aCBmaWxsPSIjYjNiMmFjIiBkPSJNOTk1LjUgMTkwbDEwMi4xIDM0MiAyNTkuOSAxNDkuMi0zMzkuNCAxMnoiLz48cGF0aCBmaWxsPSIjYmFiZGMzIiBkPSJNMjUgMTA5TDkuMyAxNzkuNSAyMTEtNzcuNWw3OCA4NC40eiIvPjwvZz48L3N2Zz4=")',
				title: 'PROJECT_02',
				id: 2,
				isInForeground: !0,
				$$slots: { default: [Ct] },
				$$scope: { ctx: t }
			}
		})),
		{
			c() {
				(i = a('div')), p(e.$$.fragment), this.h();
			},
			l(t) {
				i = r(t, 'DIV', { class: !0 });
				var s = M(i);
				A(e.$$.fragment, s), s.forEach(I), this.h();
			},
			h() {
				n(i, 'class', 'grid-area svelte-12ry46m');
			},
			m(t, a) {
				o(t, i, a), S(e, i, null), (s = !0);
			},
			p(t, [i]) {
				const s = {};
				1 & i && (s.$$scope = { dirty: i, ctx: t }), e.$set(s);
			},
			i(t) {
				s || (z(e.$$.fragment, t), (s = !0));
			},
			o(t) {
				$(e.$$.fragment, t), (s = !1);
			},
			d(t) {
				t && I(i), Z(e);
			}
		}
	);
}
const Zt = 'MortimerBaltus/Projects/Raceworx_wfjyou';
class Ot extends i {
	constructor(t) {
		super(), e(this, t, null, bt, s, {});
	}
}
function kt(t) {
	let i, e;
	return (
		(i = new Et({
			props: {
				sizes: '463px',
				srcset:
					'https://res.cloudinary.com/thdrstnr/image/upload/w_960,f_auto/' +
					Yt +
					' 960w,\n            https://res.cloudinary.com/thdrstnr/image/upload/w_463,f_auto,q_auto:best/' +
					Yt +
					' 463w,\n            https://res.cloudinary.com/thdrstnr/image/upload/w_291,f_auto,q_auto:best/' +
					Yt +
					' 291w,',
				src: 'https://res.cloudinary.com/thdrstnr/image/upload/w_960,f_auto/' + Yt,
				alt: 'Eberhard Müller develops sophisticated textile interiors at the highest level'
			}
		})),
		{
			c() {
				p(i.$$.fragment);
			},
			l(t) {
				A(i.$$.fragment, t);
			},
			m(t, s) {
				S(i, t, s), (e = !0);
			},
			p: T,
			i(t) {
				e || (z(i.$$.fragment, t), (e = !0));
			},
			o(t) {
				$(i.$$.fragment, t), (e = !1);
			},
			d(t) {
				Z(i, t);
			}
		}
	);
}
function Pt(t) {
	let i, e, s;
	return (
		(e = new Nt({
			props: {
				width: 465,
				height: 497,
				parallax: 'very-fast',
				background:
					'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA5NjAgOTYwIj48cGF0aCBmaWxsPSIjMTcxNjE2IiBkPSJNMCAwaDk2MHY5NjBIMHoiLz48ZyBmaWxsLW9wYWNpdHk9Ii41Ij48cGF0aCBmaWxsPSIjNTM1MTRmIiBkPSJNMy4yIDMzNy41bDQyNy43IDIxNi44IDQzMS4zLTc3LjQgNjcuMy04NnoiLz48cGF0aCBmaWxsPSIjNWY1YzVhIiBkPSJNOTg3LjUgODMuM0w2MDIgMTg5LjJsLTY4LjMtMTI4IDM4MS0xMDguNnoiLz48cGF0aCBmaWxsPSIjNjQ2MTVmIiBkPSJNMjIxLjgtNTguMWwyODEuNSAyMjIuNS00OC45IDEwMi40TDE1Mi4zIDYxLjJ6Ii8+PHBhdGggZD0iTS01OC4xIDQ1Mi4zbDU3OS42IDQxMC4xIDI4MS44IDcuNC0xOTYuNy0yODR6TTc3OCA0MDBMLTU4IDI4OSAxMS4yLTU4IDI1NCAxMzcuNHoiLz48cGF0aCBmaWxsPSIjNGM0YzQ5IiBkPSJNNTk3LjYgODUzLjZsLTkxLjggMTY0LjVMODQxIDkzNGwxMi4zLTQxLjV6Ii8+PHBhdGggZD0iTTUyMC45IDE2Mi42TDEwMTggMTM1IDU4NC42IDM0MiAzNzUgMzU0LjV6TTE0NC40IDczMS43bDk2LjYgNDIuOEw2IDEwMTguMWwtMzMuMi03MzkuNXoiLz48L2c+PC9zdmc+")',
				title: 'PROJECT_03',
				id: 3,
				isInForeground: !1,
				intersections: [10],
				distanceFromIntersection: { base: -13, large: -8 },
				$$slots: { default: [kt] },
				$$scope: { ctx: t }
			}
		})),
		{
			c() {
				(i = a('div')), p(e.$$.fragment), this.h();
			},
			l(t) {
				i = r(t, 'DIV', { class: !0 });
				var s = M(i);
				A(e.$$.fragment, s), s.forEach(I), this.h();
			},
			h() {
				n(i, 'class', 'grid-area svelte-1nzwgc7');
			},
			m(t, a) {
				o(t, i, a), S(e, i, null), (s = !0);
			},
			p(t, [i]) {
				const s = {};
				1 & i && (s.$$scope = { dirty: i, ctx: t }), e.$set(s);
			},
			i(t) {
				s || (z(e.$$.fragment, t), (s = !0));
			},
			o(t) {
				$(e.$$.fragment, t), (s = !1);
			},
			d(t) {
				t && I(i), Z(e);
			}
		}
	);
}
const Yt = 'MortimerBaltus/Projects/EberhardMueller_v2tpxi';
class Bt extends i {
	constructor(t) {
		super(), e(this, t, null, Pt, s, {});
	}
}
function Qt(t) {
	let i, e, s, c, g;
	return {
		c() {
			(i = a('p')),
				(e = P(
					'Your privacy is important to us, therefore we don’t use any tracking\n            services by third-parties. '
				)),
				(s = a('br')),
				(c = a('br')),
				(g = P(' Please read our Privacy Policy\n            for more info on this subject!')),
				this.h();
		},
		l(t) {
			i = r(t, 'P', { class: !0 });
			var a = M(i);
			(e = Y(
				a,
				'Your privacy is important to us, therefore we don’t use any tracking\n            services by third-parties. '
			)),
				(s = r(a, 'BR', {})),
				(c = r(a, 'BR', {})),
				(g = Y(a, ' Please read our Privacy Policy\n            for more info on this subject!')),
				a.forEach(I),
				this.h();
		},
		h() {
			n(i, 'class', 'svelte-17ckszq');
		},
		m(t, a) {
			o(t, i, a), v(i, e), v(i, s), v(i, c), v(i, g);
		},
		d(t) {
			t && I(i);
		}
	};
}
function Ut(t) {
	let i, e, s;
	return (
		(e = new Nt({
			props: {
				width: 300,
				height: 164,
				parallax: 'very-slow',
				background: '#5E4B1B',
				title: 'COOKIES',
				enlargeable: !1,
				id: 9,
				isInForeground: !0,
				$$slots: { default: [Qt] },
				$$scope: { ctx: t }
			}
		})),
		{
			c() {
				(i = a('div')), p(e.$$.fragment), this.h();
			},
			l(t) {
				i = r(t, 'DIV', { class: !0 });
				var s = M(i);
				A(e.$$.fragment, s), s.forEach(I), this.h();
			},
			h() {
				n(i, 'class', 'grid-area svelte-17ckszq');
			},
			m(t, a) {
				o(t, i, a), S(e, i, null), (s = !0);
			},
			p(t, [i]) {
				const s = {};
				1 & i && (s.$$scope = { dirty: i, ctx: t }), e.$set(s);
			},
			i(t) {
				s || (z(e.$$.fragment, t), (s = !0));
			},
			o(t) {
				$(e.$$.fragment, t), (s = !1);
			},
			d(t) {
				t && I(i), Z(e);
			}
		}
	);
}
class Ht extends i {
	constructor(t) {
		super(), e(this, t, null, Ut, s, {});
	}
}
function Ft(t) {
	let i, e, s, c, g;
	return {
		c() {
			(i = a('p')),
				(e = P('You like boring legal texts and bureaucracy? ')),
				(s = a('br')),
				(c = a('br')),
				(g = P(" We've got you covered!")),
				this.h();
		},
		l(t) {
			i = r(t, 'P', { class: !0 });
			var a = M(i);
			(e = Y(a, 'You like boring legal texts and bureaucracy? ')),
				(s = r(a, 'BR', {})),
				(c = r(a, 'BR', {})),
				(g = Y(a, " We've got you covered!")),
				a.forEach(I),
				this.h();
		},
		h() {
			n(i, 'class', 'svelte-ke65c0');
		},
		m(t, a) {
			o(t, i, a), v(i, e), v(i, s), v(i, c), v(i, g);
		},
		d(t) {
			t && I(i);
		}
	};
}
function Rt(t) {
	let i, e, s;
	return (
		(e = new Nt({
			props: {
				width: 268,
				height: 158,
				parallax: 'very-slow',
				background: '#1C6370',
				title: 'LEGAL NOTICE',
				href: 'pages/legal',
				id: 7,
				isInForeground: !0,
				$$slots: { default: [Ft] },
				$$scope: { ctx: t }
			}
		})),
		{
			c() {
				(i = a('div')), p(e.$$.fragment), this.h();
			},
			l(t) {
				i = r(t, 'DIV', { class: !0 });
				var s = M(i);
				A(e.$$.fragment, s), s.forEach(I), this.h();
			},
			h() {
				n(i, 'class', 'grid-area svelte-ke65c0');
			},
			m(t, a) {
				o(t, i, a), S(e, i, null), (s = !0);
			},
			p(t, [i]) {
				const s = {};
				1 & i && (s.$$scope = { dirty: i, ctx: t }), e.$set(s);
			},
			i(t) {
				s || (z(e.$$.fragment, t), (s = !0));
			},
			o(t) {
				$(e.$$.fragment, t), (s = !1);
			},
			d(t) {
				t && I(i), Z(e);
			}
		}
	);
}
class Wt extends i {
	constructor(t) {
		super(), e(this, t, null, Rt, s, {});
	}
}
function Jt(t) {
	let i, e, s, c, g, l;
	return {
		c() {
			(i = a('p')),
				(e = P('Eager to find out how browser-data is handled on our Website? ')),
				(s = a('br')),
				(c = E()),
				(g = a('br')),
				(l = P(' Surely this is just your cup of tea...')),
				this.h();
		},
		l(t) {
			i = r(t, 'P', { class: !0 });
			var a = M(i);
			(e = Y(a, 'Eager to find out how browser-data is handled on our Website? ')),
				(s = r(a, 'BR', {})),
				(c = G(a)),
				(g = r(a, 'BR', {})),
				(l = Y(a, ' Surely this is just your cup of tea...')),
				a.forEach(I),
				this.h();
		},
		h() {
			n(i, 'class', 'svelte-1shzky7');
		},
		m(t, a) {
			o(t, i, a), v(i, e), v(i, s), v(i, c), v(i, g), v(i, l);
		},
		d(t) {
			t && I(i);
		}
	};
}
function Vt(t) {
	let i, e, s;
	return (
		(e = new Nt({
			props: {
				width: 288,
				height: 207,
				parallax: 'very-slow',
				background: '#FEC7A3',
				href: '/pages/privacy',
				title: 'PRIVACY POLICY',
				id: 5,
				isInForeground: !0,
				$$slots: { default: [Jt] },
				$$scope: { ctx: t }
			}
		})),
		{
			c() {
				(i = a('div')), p(e.$$.fragment), this.h();
			},
			l(t) {
				i = r(t, 'DIV', { class: !0 });
				var s = M(i);
				A(e.$$.fragment, s), s.forEach(I), this.h();
			},
			h() {
				n(i, 'class', 'grid-area svelte-1shzky7');
			},
			m(t, a) {
				o(t, i, a), S(e, i, null), (s = !0);
			},
			p(t, [i]) {
				const s = {};
				1 & i && (s.$$scope = { dirty: i, ctx: t }), e.$set(s);
			},
			i(t) {
				s || (z(e.$$.fragment, t), (s = !0));
			},
			o(t) {
				$(e.$$.fragment, t), (s = !1);
			},
			d(t) {
				t && I(i), Z(e);
			}
		}
	);
}
class Xt extends i {
	constructor(t) {
		super(), e(this, t, null, Vt, s, {});
	}
}
function _t(t) {
	let i,
		e,
		s,
		c,
		g,
		l,
		N,
		u,
		j,
		T,
		h,
		D,
		d,
		m,
		L,
		w,
		z,
		y,
		x,
		f,
		$,
		p,
		A,
		S,
		C,
		b,
		Z,
		O,
		k,
		B,
		Q,
		U,
		H,
		F,
		R,
		W,
		J,
		V,
		X,
		_,
		q,
		K,
		tt,
		it,
		et,
		st,
		at,
		rt,
		Mt,
		It,
		nt,
		ct;
	return {
		c() {
			(i = a('ul')),
				(e = a('li')),
				(s = a('a')),
				(c = P('Bureau Johannes Erler')),
				(g = E()),
				(l = a('li')),
				(N = a('a')),
				(u = P('CarlNann')),
				(j = E()),
				(T = a('li')),
				(h = a('a')),
				(D = P('Con Corazón')),
				(d = E()),
				(m = a('li')),
				(L = a('a')),
				(w = P('Düsseldorfer Schauspielhaus')),
				(z = E()),
				(y = a('li')),
				(x = a('a')),
				(f = P('Eberhard Müller Consulting')),
				($ = E()),
				(p = a('li')),
				(A = a('a')),
				(S = P('Fargo')),
				(C = E()),
				(b = a('li')),
				(Z = a('a')),
				(O = P('Konica Minolta')),
				(k = E()),
				(B = a('li')),
				(Q = a('a')),
				(U = P('Morgenbladet')),
				(H = E()),
				(F = a('li')),
				(R = a('a')),
				(W = P('Otto Group')),
				(J = E()),
				(V = a('li')),
				(X = a('a')),
				(_ = P('Staatsschauspielhaus Dresden')),
				(q = E()),
				(K = a('li')),
				(tt = a('a')),
				(it = P('Steiner Am Fluss')),
				(et = E()),
				(st = a('li')),
				(at = a('a')),
				(rt = P('Suhrkamp')),
				(Mt = E()),
				(It = a('li')),
				(nt = a('a')),
				(ct = P('Zoeva')),
				this.h();
		},
		l(t) {
			i = r(t, 'UL', { class: !0 });
			var a = M(i);
			e = r(a, 'LI', { class: !0 });
			var n = M(e);
			s = r(n, 'A', { href: !0, class: !0 });
			var o = M(s);
			(c = Y(o, 'Bureau Johannes Erler')),
				o.forEach(I),
				n.forEach(I),
				(g = G(a)),
				(l = r(a, 'LI', { class: !0 }));
			var E = M(l);
			N = r(E, 'A', { href: !0, class: !0 });
			var v = M(N);
			(u = Y(v, 'CarlNann')),
				v.forEach(I),
				E.forEach(I),
				(j = G(a)),
				(T = r(a, 'LI', { class: !0 }));
			var P = M(T);
			h = r(P, 'A', { href: !0, class: !0 });
			var ot = M(h);
			(D = Y(ot, 'Con Corazón')),
				ot.forEach(I),
				P.forEach(I),
				(d = G(a)),
				(m = r(a, 'LI', { class: !0 }));
			var gt = M(m);
			L = r(gt, 'A', { href: !0, class: !0 });
			var lt = M(L);
			(w = Y(lt, 'Düsseldorfer Schauspielhaus')),
				lt.forEach(I),
				gt.forEach(I),
				(z = G(a)),
				(y = r(a, 'LI', { class: !0 }));
			var Nt = M(y);
			x = r(Nt, 'A', { href: !0, class: !0 });
			var ut = M(x);
			(f = Y(ut, 'Eberhard Müller Consulting')),
				ut.forEach(I),
				Nt.forEach(I),
				($ = G(a)),
				(p = r(a, 'LI', { class: !0 }));
			var jt = M(p);
			A = r(jt, 'A', { href: !0, class: !0 });
			var Tt = M(A);
			(S = Y(Tt, 'Fargo')),
				Tt.forEach(I),
				jt.forEach(I),
				(C = G(a)),
				(b = r(a, 'LI', { class: !0 }));
			var ht = M(b);
			Z = r(ht, 'A', { href: !0, class: !0 });
			var Dt = M(Z);
			(O = Y(Dt, 'Konica Minolta')),
				Dt.forEach(I),
				ht.forEach(I),
				(k = G(a)),
				(B = r(a, 'LI', { class: !0 }));
			var dt = M(B);
			Q = r(dt, 'A', { href: !0, class: !0 });
			var mt = M(Q);
			(U = Y(mt, 'Morgenbladet')),
				mt.forEach(I),
				dt.forEach(I),
				(H = G(a)),
				(F = r(a, 'LI', { class: !0 }));
			var Lt = M(F);
			R = r(Lt, 'A', { href: !0, class: !0 });
			var wt = M(R);
			(W = Y(wt, 'Otto Group')),
				wt.forEach(I),
				Lt.forEach(I),
				(J = G(a)),
				(V = r(a, 'LI', { class: !0 }));
			var zt = M(V);
			X = r(zt, 'A', { href: !0, class: !0 });
			var yt = M(X);
			(_ = Y(yt, 'Staatsschauspielhaus Dresden')),
				yt.forEach(I),
				zt.forEach(I),
				(q = G(a)),
				(K = r(a, 'LI', { class: !0 }));
			var xt = M(K);
			tt = r(xt, 'A', { href: !0, class: !0 });
			var ft = M(tt);
			(it = Y(ft, 'Steiner Am Fluss')),
				ft.forEach(I),
				xt.forEach(I),
				(et = G(a)),
				(st = r(a, 'LI', { class: !0 }));
			var $t = M(st);
			at = r($t, 'A', { href: !0, class: !0 });
			var pt = M(at);
			(rt = Y(pt, 'Suhrkamp')),
				pt.forEach(I),
				$t.forEach(I),
				(Mt = G(a)),
				(It = r(a, 'LI', { class: !0 }));
			var Et = M(It);
			nt = r(Et, 'A', { href: !0, class: !0 });
			var At = M(nt);
			(ct = Y(At, 'Zoeva')), At.forEach(I), Et.forEach(I), a.forEach(I), this.h();
		},
		h() {
			n(s, 'href', '/'),
				n(s, 'class', 'svelte-t5h109'),
				n(e, 'class', 'svelte-t5h109'),
				n(N, 'href', '/'),
				n(N, 'class', 'svelte-t5h109'),
				n(l, 'class', 'svelte-t5h109'),
				n(h, 'href', '/'),
				n(h, 'class', 'svelte-t5h109'),
				n(T, 'class', 'svelte-t5h109'),
				n(L, 'href', '/'),
				n(L, 'class', 'svelte-t5h109'),
				n(m, 'class', 'svelte-t5h109'),
				n(x, 'href', '/'),
				n(x, 'class', 'svelte-t5h109'),
				n(y, 'class', 'svelte-t5h109'),
				n(A, 'href', '/'),
				n(A, 'class', 'svelte-t5h109'),
				n(p, 'class', 'svelte-t5h109'),
				n(Z, 'href', '/'),
				n(Z, 'class', 'svelte-t5h109'),
				n(b, 'class', 'svelte-t5h109'),
				n(Q, 'href', '/'),
				n(Q, 'class', 'svelte-t5h109'),
				n(B, 'class', 'svelte-t5h109'),
				n(R, 'href', '/'),
				n(R, 'class', 'svelte-t5h109'),
				n(F, 'class', 'svelte-t5h109'),
				n(X, 'href', '/'),
				n(X, 'class', 'svelte-t5h109'),
				n(V, 'class', 'svelte-t5h109'),
				n(tt, 'href', '/'),
				n(tt, 'class', 'svelte-t5h109'),
				n(K, 'class', 'svelte-t5h109'),
				n(at, 'href', '/'),
				n(at, 'class', 'svelte-t5h109'),
				n(st, 'class', 'svelte-t5h109'),
				n(nt, 'href', '/'),
				n(nt, 'class', 'svelte-t5h109'),
				n(It, 'class', 'svelte-t5h109'),
				n(i, 'class', 'svelte-t5h109');
		},
		m(t, a) {
			o(t, i, a),
				v(i, e),
				v(e, s),
				v(s, c),
				v(i, g),
				v(i, l),
				v(l, N),
				v(N, u),
				v(i, j),
				v(i, T),
				v(T, h),
				v(h, D),
				v(i, d),
				v(i, m),
				v(m, L),
				v(L, w),
				v(i, z),
				v(i, y),
				v(y, x),
				v(x, f),
				v(i, $),
				v(i, p),
				v(p, A),
				v(A, S),
				v(i, C),
				v(i, b),
				v(b, Z),
				v(Z, O),
				v(i, k),
				v(i, B),
				v(B, Q),
				v(Q, U),
				v(i, H),
				v(i, F),
				v(F, R),
				v(R, W),
				v(i, J),
				v(i, V),
				v(V, X),
				v(X, _),
				v(i, q),
				v(i, K),
				v(K, tt),
				v(tt, it),
				v(i, et),
				v(i, st),
				v(st, at),
				v(at, rt),
				v(i, Mt),
				v(i, It),
				v(It, nt),
				v(nt, ct);
		},
		d(t) {
			t && I(i);
		}
	};
}
function qt(t) {
	let i, e, s;
	return (
		(e = new Nt({
			props: {
				width: 347,
				height: 314,
				parallax: 'medium',
				background: '#5F583D',
				title: 'References',
				enlargeable: !1,
				id: 4,
				isInForeground: !0,
				$$slots: { default: [_t] },
				$$scope: { ctx: t }
			}
		})),
		{
			c() {
				(i = a('div')), p(e.$$.fragment), this.h();
			},
			l(t) {
				i = r(t, 'DIV', { class: !0 });
				var s = M(i);
				A(e.$$.fragment, s), s.forEach(I), this.h();
			},
			h() {
				n(i, 'class', 'grid-area svelte-t5h109');
			},
			m(t, a) {
				o(t, i, a), S(e, i, null), (s = !0);
			},
			p(t, [i]) {
				const s = {};
				1 & i && (s.$$scope = { dirty: i, ctx: t }), e.$set(s);
			},
			i(t) {
				s || (z(e.$$.fragment, t), (s = !0));
			},
			o(t) {
				$(e.$$.fragment, t), (s = !1);
			},
			d(t) {
				t && I(i), Z(e);
			}
		}
	);
}
class Kt extends i {
	constructor(t) {
		super(), e(this, t, null, qt, s, {});
	}
}
function ti(t) {
	let i, e;
	return (
		(i = new Et({
			props: {
				srcset:
					'https://res.cloudinary.com/thdrstnr/image/upload/w_1280,f_auto/' +
					t[2] +
					' 1280w,\n            https://res.cloudinary.com/thdrstnr/image/upload/w_1280,f_auto,q_auto:best/' +
					t[2] +
					' 598w,\n            https://res.cloudinary.com/thdrstnr/image/upload/w_376,f_auto,q_auto:best/' +
					t[2] +
					' 376w,',
				src: 'https://res.cloudinary.com/thdrstnr/image/upload/w_1280,f_auto/' + t[2],
				sizes: '598px',
				alt: t[0][t[1]].alt
			}
		})),
		{
			c() {
				p(i.$$.fragment);
			},
			l(t) {
				A(i.$$.fragment, t);
			},
			m(t, s) {
				S(i, t, s), (e = !0);
			},
			p: T,
			i(t) {
				e || (z(i.$$.fragment, t), (e = !0));
			},
			o(t) {
				$(i.$$.fragment, t), (e = !1);
			},
			d(t) {
				Z(i, t);
			}
		}
	);
}
function ii(t) {
	let i, e, s;
	return (
		(e = new Nt({
			props: {
				width: 600,
				height: 436,
				parallax: 'very-fast',
				background: t[0][t[1]].svg,
				title: t[0][t[1]].name,
				id: 11,
				isInForeground: !0,
				$$slots: { default: [ti] },
				$$scope: { ctx: t }
			}
		})),
		{
			c() {
				(i = a('div')), p(e.$$.fragment), this.h();
			},
			l(t) {
				i = r(t, 'DIV', { class: !0 });
				var s = M(i);
				A(e.$$.fragment, s), s.forEach(I), this.h();
			},
			h() {
				n(i, 'class', 'grid-area svelte-lgv888');
			},
			m(t, a) {
				o(t, i, a), S(e, i, null), (s = !0);
			},
			p(t, [i]) {
				const s = {};
				8 & i && (s.$$scope = { dirty: i, ctx: t }), e.$set(s);
			},
			i(t) {
				s || (z(e.$$.fragment, t), (s = !0));
			},
			o(t) {
				$(e.$$.fragment, t), (s = !1);
			},
			d(t) {
				t && I(i), Z(e);
			}
		}
	);
}
function ei(t) {
	const i = [
		{
			name: 'OBERHAFEN.JPG',
			src: '/MortimerBaltus/deGallery/Oberhafen_c5hvmx',
			alt: 'Oberhafen, Hamburg (DE)',
			svg:
				'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjgwIDg1MyI+PHBhdGggZmlsbD0iIzFkMjYyOSIgZD0iTTAgMGgxMjgwdjg1MEgweiIvPjxnIGZpbGwtb3BhY2l0eT0iLjUiPjxwYXRoIGZpbGw9IiM1ODY4NmUiIGQ9Ik00MjkuNyA1MDAuMUwxNS42IDkyNy41bC05My4xLTYyNS4xIDE0MzUgMTczLjV6Ii8+PHBhdGggZD0iTTg5NC4yIDM0Ni44bDQ2My4zLTM0MUwtNzcuNS0xNGw0NjcuMyA0NTguOHoiLz48cGF0aCBmaWxsPSIjNTI2MzZiIiBkPSJNMTAzMC4yIDQ5OS4zbDMyMiA0MjguMi01Ni4zLTc0Mi4xLTU4NyAyNDIuNHoiLz48cGF0aCBmaWxsPSIjYzNjY2UwIiBkPSJNMzcuNyAyNTEuOWw2LjItMzggNjUuOCAxNDguNkwxMjYuOSA1MzV6Ii8+PHBhdGggZmlsbD0iI2UzZTdmYSIgZD0iTS03Ny41IDY3OC4xdi01Ni42bDIwMS4zLTkuMiAzMi40IDE5LjR6Ii8+PHBhdGggZD0iTTEzNDcuNiA1MjYuNmwtMzI5LjgtNDMuOC0yNjMtNDEuNyA2MDIuNyAxNjcuN3oiLz48cGF0aCBmaWxsPSIjYmJjN2Q3IiBkPSJNMTM1Ny41IDY4NS4zbC0yMTEtNTMuMy0yOC0xOCAxODUuNy03LjV6Ii8+PHBhdGggZD0iTTMwOC45LTc3LjVsLTEzNCA1NjktODcuNS0xNzYuM0wxMzU3LjUgMTA1eiIvPjxwYXRoIGZpbGw9IiNhZWFhYTkiIGQ9Ik0yNjUuNiA0ODRsNDQzLTcxLjdMMjM0LjggNDgxIDI1MiAyMzIuNXoiLz48cGF0aCBmaWxsPSIjYjVhZmIzIiBkPSJNMTEzOS40IDQ2OC4zbDg5LTI5Ni02OS43IDMzMi43LTcyLjItMjEuMnoiLz48cGF0aCBmaWxsPSIjMDAwMDAxIiBkPSJNMTE0MC4yIDQzNi4zbDcyLjQtMTg0LjMtMTkuOC0zMjkuNS04OC44IDQ5OC4yeiIvPjxwYXRoIGZpbGw9IiNlOWUzZjYiIGQ9Ik0xMjE2IDQ2MS4zbC0zLjItMzA4LjcgMTAuNCAxMTguMi00LjcgMTc2LjJ6Ii8+PHBhdGggZmlsbD0iIzg3OTc5YiIgZD0iTTEwMzguNCAzNDcuNWwtOS40IDEyMS4zLTkwLjctMi4zIDY3LjMtMTc0LjV6Ii8+PHBhdGggZmlsbD0iIzAyMDYwMCIgZD0iTTU3OS44IDQzNi45bC0xMTYuOSAyOS01NDAuNCAxMjguNCA4Ny40LTcxeiIvPjxwYXRoIGZpbGw9IiNmNGYzZmYiIGQ9Ik01NSAzNjQuN2wuMi0xMDIuOC0xMi40LTM0IC43IDEzNy4zeiIvPjxwYXRoIGZpbGw9IiM1YzY4NmYiIGQ9Ik0xMzIuMiAyOUwxNTkgMzcwbC0yMi40LTEyMkw4MS41LTR6Ii8+PHBhdGggZmlsbD0iIzBkMTUxOCIgZD0iTTk2Mi42IDkyNy41SDM5Ni44TDI4Ni42IDU1MC43bDY2Ni43LTIyeiIvPjxwYXRoIGZpbGw9IiNhMzlmOWQiIGQ9Ik0xMDkuMyA0OTMuMmwtMTg1LjYgNDBMMTk0IDQ5Ni44IDcyLjIgMzg5LjJ6Ii8+PHBhdGggZmlsbD0iIzczODg5NSIgZD0iTTEyNDcuNiA1MDUuNGwxLjktMjgwLjcgMjEuMy01OS4xIDcyLjQgMzY4LjV6Ii8+PHBhdGggZmlsbD0iIzUwNWY2NCIgZD0iTTExMzgtMzZsNjQtMzktNzggMzQwLTEtMjguOHoiLz48cGF0aCBmaWxsPSIjYjRjMmQwIiBkPSJNMTAwNC4xIDYzOC45bC0xMS4zLTIyIDItNCA3MS45LTEuM3oiLz48cGF0aCBmaWxsPSIjMDAwMTA2IiBkPSJNLTc3LjUtNTYuNmwxMjggMjcyLjJMNjIgMzM5LjRsNzUuMy0yODEuN3oiLz48cGF0aCBmaWxsPSIjNjU2ZTc1IiBkPSJNLTcyLjIgNTk0LjZMNzQwIDQwNS43IDI1MC40IDU2NiAzMC43IDYyOXoiLz48cGF0aCBmaWxsPSIjMDAwMjA2IiBkPSJNMTI2Mi45IDQ4Mi40bC0xMC4xLTEwLTE0LjYtMzkyLTIxLjIgNDI2LjJ6Ii8+PHBhdGggZmlsbD0iIzAxMDEwMCIgZD0iTTU4OC44IDQyNy43TDEwMzcuNyAyNDcgMTAyOSAuMyA5NC0xNC40eiIvPjxwYXRoIGZpbGw9IiM0ODUyNTYiIGQ9Ik0yMDggMTg4LjNsOS43LTExMi44IDMxLjYgNTEuNS01MS42IDE5OXoiLz48cGF0aCBmaWxsPSIjMWUzMjNiIiBkPSJNLTYxLjEgNzc2TDc4LjMgNjUxLjIgNDkzIDYyOS44IDc5IDkyNy41eiIvPjxwYXRoIGZpbGw9IiMwZDE1MTUiIGQ9Ik04MzcgNDg3LjhsLTE4OS00OC41LTE3NC44IDE4OSA0OTAuNyAxMy4xeiIvPjxwYXRoIGZpbGw9IiMwMDA4MTYiIGQ9Ik0xOC44IDQ3NC4zbDkuNi01MDkgMTcgNDcwLjYgNi43IDY2LjJ6Ii8+PHBhdGggZmlsbD0iI2U5ZTZmOSIgZD0iTTc0LjIgMzY1LjZsMjUuOCAxM0w3Mi4zIDI0OGw1LjggMTI0LjZ6Ii8+PHBhdGggZmlsbD0iIzAwMDIwNSIgZD0iTTExNjMgODMuNGw5Ni42IDcwLjQtNTMuOSAyLjhMMTIwOSA0NDF6Ii8+PHBhdGggZmlsbD0iIzc5N2I3OCIgZD0iTTY2NS43IDQxMWwtNTQ5LjMgNTYuNiA4NTYuMi0yOS40IDIyLjcgMzkuNnoiLz48L2c+PC9zdmc+")'
		}
	];
	var e = Math.floor(Math.random() * i.length);
	return [i, e, i[e].src];
}
class si extends i {
	constructor(t) {
		super(), e(this, t, ei, ii, s, {});
	}
}
function ai(t) {
	let i, e;
	return (
		(i = new Et({
			props: {
				sizes: '598px',
				srcset:
					'https://res.cloudinary.com/thdrstnr/image/upload/w_1280,f_auto/' +
					t[2] +
					' 1280w,\n            https://res.cloudinary.com/thdrstnr/image/upload/w_598,f_auto,q_auto:best/' +
					t[2] +
					' 598w,\n            https://res.cloudinary.com/thdrstnr/image/upload/w_376,f_auto,q_auto:best/' +
					t[2] +
					' 376w,',
				src: 'https://res.cloudinary.com/thdrstnr/image/upload/w_1280,f_auto/' + t[2],
				alt: t[0][t[1]].alt
			}
		})),
		{
			c() {
				p(i.$$.fragment);
			},
			l(t) {
				A(i.$$.fragment, t);
			},
			m(t, s) {
				S(i, t, s), (e = !0);
			},
			p: T,
			i(t) {
				e || (z(i.$$.fragment, t), (e = !0));
			},
			o(t) {
				$(i.$$.fragment, t), (e = !1);
			},
			d(t) {
				Z(i, t);
			}
		}
	);
}
function ri(t) {
	let i, e, s;
	return (
		(e = new Nt({
			props: {
				width: 600,
				height: 436,
				parallax: 'very-fast',
				background: t[0][t[1]].svg,
				title: t[0][t[1]].name,
				id: 8,
				isInForeground: !0,
				$$slots: { default: [ai] },
				$$scope: { ctx: t }
			}
		})),
		{
			c() {
				(i = a('div')), p(e.$$.fragment), this.h();
			},
			l(t) {
				i = r(t, 'DIV', { class: !0 });
				var s = M(i);
				A(e.$$.fragment, s), s.forEach(I), this.h();
			},
			h() {
				n(i, 'class', 'grid-area svelte-9kfdj4');
			},
			m(t, a) {
				o(t, i, a), S(e, i, null), (s = !0);
			},
			p(t, [i]) {
				const s = {};
				8 & i && (s.$$scope = { dirty: i, ctx: t }), e.$set(s);
			},
			i(t) {
				s || (z(e.$$.fragment, t), (s = !0));
			},
			o(t) {
				$(e.$$.fragment, t), (s = !1);
			},
			d(t) {
				t && I(i), Z(e);
			}
		}
	);
}
function Mi(t) {
	const i = [
		{
			name: 'SHINJUKU.JPG',
			src: '/MortimerBaltus/jpGallery/ShinjukuSakura_dgdj2h',
			alt: 'Shinjuku, Tokyo (JP)',
			svg:
				'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjgwIDg1MyI+PHBhdGggZmlsbD0iIzg4ODY4YSIgZD0iTTAgMGgxMjgwdjg1MEgweiIvPjxnIGZpbGwtb3BhY2l0eT0iLjUiPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0xMzU3LjUgMTAuM0w1NDIgMzk0LjlsLTI4IDE1Ny43TDI3MS41LTc3LjV6Ii8+PHBhdGggZD0iTTMgNDAyLjhMLTIzIDYwMmwxMzgwLjUtMTkuNy02Ny42LTIzOHoiLz48cGF0aCBmaWxsPSIjMDAxOTI0IiBkPSJNLTc3LjUgNzQyLjNsNDUxLTE0LjMgMTcuMS02MDAuNi0zNzctMjA0Ljl6Ii8+PHBhdGggZmlsbD0iI2Y1ZGRlMiIgZD0iTTkwOS41IDkyNy41bC05ODctOTIuNSA4MDgtMjYzLjEgNTg3LjggNTV6Ii8+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTQ1MSA1MTUuM0wzNDguOC03Ny41aDc3NC41bC00NzYgNTQ2eiIvPjxwYXRoIGZpbGw9IiMwNDA5MDYiIGQ9Ik0xMTYyLjQgMTQ1LjhsLTE0NS44IDI5MS41LTM3OSA0Mi40IDcxOS45IDE1Ni44eiIvPjxwYXRoIGZpbGw9IiM3MzZlNmQiIGQ9Ik01NjIuMiA1MDRsLTMyLjMtMTIzLjQgNzg3LjMtMTc1LjgtMjE3LjMgMjA2eiIvPjxwYXRoIGZpbGw9IiM0ZTY5NzQiIGQ9Ik01MjMuMSA2NzAuNUwzMjguNyA1NzAuMy03Ny41IDY5Ny45IDQ4Ny4zIDc1MHoiLz48cGF0aCBmaWxsPSIjZWFkNWRiIiBkPSJNNDI3IDU4MC44bDQyMy42IDguNi0xNTQgMjIyLTI0MS0xODguNHoiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNNzU4IDM4OC4zTDMzNi4yIDEwNiAyODMuNC0zNS40IDkyMi03Ny41eiIvPjxwYXRoIGQ9Ik04NTcuMSAyMDguMmwxNy4xIDU2LjctNjIuOCAxNS4zIDkuMS01OS42eiIvPjxwYXRoIGZpbGw9IiM2YjY2NjciIGQ9Ik0xMDY1LjIgNDUuM2wyMDIuNiAxMDIuNSA4OS43IDMyMy40LTMyNS4xLTMzMC40eiIvPjxwYXRoIGZpbGw9IiMwMDEwMWQiIGQ9Ik03ODAgMzkzLjJsLTExMCAyNi4yLTEzOS43LTEyIDEzNi4zLTQ3Ljl6Ii8+PHBhdGggZmlsbD0iI2ZmZmVmZiIgZD0iTTY4OC4yIDU0N2wxNC42LTM5LjUgNjMuNSA5MS44IDMyLjYtNTR6Ii8+PHBhdGggZmlsbD0iI2IwYjViOSIgZD0iTTUwLjQgNDI1TC0xNyA0NDcuNWwtNjAuNS0xNzguMiAxMjgtMTIuNXoiLz48cGF0aCBmaWxsPSIjMGUxMzE4IiBkPSJNNzkuMyA2MjguN2w1My41LTMwNy40LTUuNC0yNzMuNyAyNjUuOCA1MjQuN3oiLz48cGF0aCBmaWxsPSIjYTg5Yjk4IiBkPSJNOTMxLjUgMTkyLjdMNzYzLjMgMzk5bC0xODIuMSA4NSAzMjEuMy01MnoiLz48cGF0aCBmaWxsPSIjNzc3NTc5IiBkPSJNMjgxLjYgMzAzLjdMNTIzIDU4NmwtNzcuMy0yNjAtMjUxLTM1Ni45eiIvPjxwYXRoIGZpbGw9IiNlMWNiY2YiIGQ9Ik0tNzcuNSA5MDIuOGw2NDItMTYwLTIzMiAxLjEtNDEwLTZ6Ii8+PHBhdGggZmlsbD0iIzAwMDAwNCIgZD0iTTYxLjcgMTE3LjJsLTgwLjggMTA0LjUgNjMuNCA1MSA2Mi42IDI2Ny43eiIvPjxwYXRoIGZpbGw9IiNmZmYyZjkiIGQ9Ik02MTIuMSAyODcuOWwtMjgzLjYgNDYuOUw2ODcuOC03Ny41aDY2OS43eiIvPjxwYXRoIGZpbGw9IiMwODBjMGMiIGQ9Ik0xMjUyIDI3NUw5MzcuMSA1NzlsMjU3LjUgMjUuOCA3MC40LTU0LjN6Ii8+PHBhdGggZmlsbD0iIzA4MGEwYyIgZD0iTTMzMS41IDM3MGwxMDUuMSAxOTguOC0xNjUuNC02MC4yTDQ1OCAzMTkuNHoiLz48cGF0aCBmaWxsPSIjZmFlZGY0IiBkPSJNMTM1Ny41IDEzMC43TDc0Mi42LTc3LjVsMTM2LjYgMzExTDExMzcuNC0zOXoiLz48cGF0aCBmaWxsPSIjYTc5Y2EyIiBkPSJNMTM1Ny41IDU3Mi40bC0xNjQgMzMxLjEtNTA2LjEgMy40IDQ2Mi40LTI4Ni4zeiIvPjxwYXRoIGZpbGw9IiM0NTQzNDIiIGQ9Ik0xMDgyLjcgMjg2LjVsMjUwLjQgMi40LTQ2NC4yIDEwNC44IDkuNy02NS45eiIvPjxwYXRoIGZpbGw9IiNmZmY5ZmUiIGQ9Ik0xMjM1LjkgMzU3LjNsMTIxLjYgNTR2NTUuOGwtMzcuNC0xNzEuNnoiLz48cGF0aCBmaWxsPSIjNTg2YTc0IiBkPSJNLTc3LjUgNjQybDM2Ny44LTQ1LjYgMjgxLjEgMTU3LjQtMzM2LjMtMzd6Ii8+PHBhdGggZmlsbD0iI2FhYWRiNCIgZD0iTTI3Ny41IDE2Ni4xTDI0NC40LTMxLjYgMjM0IDIyMi4zbDE1LjggMTAuM3oiLz48cGF0aCBmaWxsPSIjYTA5OTlmIiBkPSJNMTM1LjUgMjA2LjJsLTU4LjgtOCA4Ny4xIDE3Mi4yLTc0LjYtNTZ6Ii8+PHBhdGggZmlsbD0iIzA5MWMyOSIgZD0iTTExMC43IDMwMC44bDYwLjQtMzc4LjMgNjIuMyAyMzMtNC4yLTE2MHoiLz48cGF0aCBmaWxsPSIjZjFlMmU3IiBkPSJNNjY3LjcgNTgxLjFMNjU2LjMgNTM3bC0xNy44IDYuNEw2NDMgNTg3eiIvPjwvZz48L3N2Zz4=")'
		},
		{
			name: 'TAXI.JPG',
			src: '/MortimerBaltus/jpGallery/TokyoTaxi_zbokhg',
			alt: 'A cab in Tokyo (JP)',
			svg:
				'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjgwIDg1MCI+PHBhdGggZmlsbD0iIzZlNjY2MyIgZD0iTTAgMGgxMjgwdjg1MEgweiIvPjxnIGZpbGwtb3BhY2l0eT0iLjUiPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0tNzcuNSA4OTMuOFY3NTUuNmwxNDE1LjktMzA5LjgtMTg2LjggNDgxLjd6Ii8+PHBhdGggZD0iTTEzNTcuNS0zMnYzOTlsLTE0MzUtMTQ1LjNMLTI1LTc3LjV6Ii8+PHBhdGggZmlsbD0iIzAyMDAwMCIgZD0iTTk0NS44IDQ2NUw3MzUuNCA2NDUgMTAuMiA1OTkuMWw0NjkuNi0xMjcuN3oiLz48cGF0aCBmaWxsPSIjZjNlMWNiIiBkPSJNMTM1Ny41IDcyNy4yTC03Ny41IDYwMSAzMS42IDQzMmw5NC44IDQ5NS42eiIvPjxwYXRoIGZpbGw9IiNjM2MwYmQiIGQ9Ik01NzkuNiA0MTBsLTQ2LTE5MiAyOTItNDEtODIuMyAyNDkuMXoiLz48cGF0aCBmaWxsPSIjMDAwMDA2IiBkPSJNNzc5LTE3LjdsNTc4LjUgNDk1LTM4MS0xOS41IDM4MS00NTkuNHoiLz48cGF0aCBmaWxsPSIjZjFlMmQwIiBkPSJNNTYwLjIgODU1LjNsNjI3LjggNzIuMi0yNi42LTQ2NC40TDk1MSA0OTQuNnoiLz48cGF0aCBmaWxsPSIjMDAwNDA4IiBkPSJNMjIwLjEgMjU0LjVsMTA0Mi0yMDguM0wtNzcuNSA1OGwyNDIuMSAzNjh6Ii8+PHBhdGggZD0iTTExNzYuNCA4NjQuMmwxODEuMS04NC4zLTE5NS40LTEyMy40IDE3OC02MC4zeiIvPjxwYXRoIGZpbGw9IiNmZTVkMzgiIGQ9Ik0yNjIuMyA0MDcuNWwxMzggMTAyLjcgNTQwLjEtNzMuOC04Ny43LTQ4Ljd6Ii8+PHBhdGggZmlsbD0iI2MwZDRlOCIgZD0iTTEwMTIgMjQ2LjJsLTQxMy43LTM2LjYgMjg5LjMtMjEuNCAxNzkuMiAyNy4zeiIvPjxwYXRoIGZpbGw9IiMyNjA5MDkiIGQ9Ik01MTUuMiA2NDYuN2wyODYuNy0zMi0zMTQuNC0xNjUtMzQyLjItMjQuNnoiLz48cGF0aCBmaWxsPSIjMDAwNDA2IiBkPSJNMTE3NC4yIDI1NS40bC0zNTIuMy0yNy43LTMxOC40IDQuMyA2MDQuOCA5OC40eiIvPjxwYXRoIGZpbGw9IiNmMGRmYmYiIGQ9Ik02MTMuNiA0MTguN2wyODcuOC0yLjRMNTI0IDI3Ny41bDM4LjctNDV6Ii8+PHBhdGggZmlsbD0iI2JlY2VkZiIgZD0iTTEwNDYgMzQwLjRsNDEuNSA1MjUuNC0zNy4yLTQ3NS42LTM2OS42LTk3LjF6Ii8+PHBhdGggZmlsbD0iI2NlYzdjNyIgZD0iTS03Ny41IDI4My40bDI5MS40IDQ2NS0yOTEuNC0zMTUuMUwxMTEgMzIwLjh6Ii8+PHBhdGggZmlsbD0iIzAwMDQxNCIgZD0iTTkwOS42IDM5NC43bDQwMC43IDkuMi0yOS40LTg3LjUtMzQxLjcgMTYwLjl6Ii8+PHBhdGggZmlsbD0iI2Y4ZWZlNCIgZD0iTTk0MS4zIDQ4My41TDkwOCA1NTBsNDA4LjQtNTUtLjMtMjh6Ii8+PHBhdGggZmlsbD0iIzI5MmUzMyIgZD0iTTM2My45IDEyMi4ybDcuNiAxOTcuNy00MTkgODUuNEw1MzYgMzc5LjF6Ii8+PHBhdGggZmlsbD0iI2E1Y2JlZiIgZD0iTTU0MC40IDE0MC42bDYuNC0yNS44IDU0LjkgMTAuMy00MS42IDUzLjR6Ii8+PHBhdGggZmlsbD0iIzA3MGQxZCIgZD0iTTEyMTkuNSA1MzAuNmwxMzggNjMuMi01LjctOTUuNC0xNTguNyAxNy40eiIvPjxwYXRoIGQ9Ik0xMjYxLjUgNzE0LjdsNjkuMi00MiAyNi44IDIxNi43LTIzMS45IDM4LjF6Ii8+PHBhdGggZmlsbD0iI2U0MTAwMCIgZD0iTTU2NS45IDQwNGwtMTkuNC0xMDcuNy00NiAxMzQuOEw3MzQgNDU2LjJ6Ii8+PHBhdGggZmlsbD0iI2U4ZTFjYSIgZD0iTTc2MS43IDU4M2wtMzcuNC0yOC43LTg2LjcgMTFMNzE0IDU3OHoiLz48cGF0aCBmaWxsPSIjMGEwZTE1IiBkPSJNNzE2IDMwNy4zbC0xMzMuNy0xNEw4MzIuOCAxMjkgNjQ1LjItNzcuNXoiLz48cGF0aCBmaWxsPSIjZDhjY2JmIiBkPSJNNTc5LjEgNjMyLjFMODg4IDkyMC4ybDQyMS40LTM4NS44TDkzMiA2MjMuN3oiLz48cGF0aCBmaWxsPSIjY2RjNmJlIiBkPSJNNTMwIDYyM2wtMjE5LjUtMTJMMjYuMiA5MjcuNSA4OC44IDYzM3oiLz48cGF0aCBmaWxsPSIjYTVjMGQ0IiBkPSJNMTIwLjYgNDAwLjZsMzc1LjcgMjYuNiAxODYgMzkuMi0yMTYuMS0xOS42eiIvPjxwYXRoIGZpbGw9IiMzODQ3NjMiIGQ9Ik0zMjguNyA2MjIuNGwtMzk5LjItMjI4TDMwNSA0MzEuOCA0LjggNjA0LjV6Ii8+PHBhdGggZmlsbD0iIzExMTIxMyIgZD0iTTYwOS40IDEwbC01MzkgMjkyLTg3LjMtLjMgNDEtMjAxLjZ6Ii8+PHBhdGggZmlsbD0iI2MwMjEwZSIgZD0iTTQ0OS42IDUzNy40TDI3OSA0MzIuOCA0OTkgNDU1bC0xNi4yIDc1Ljd6Ii8+PHBhdGggZmlsbD0iIzczOWNiOSIgZD0iTTExNzguMyAyNzYuM2wxMS41LTY4IDU1LjcgMTM5LjYgNDIuMS01OHoiLz48L2c+PC9zdmc+")'
		},
		{
			name: 'TRAINSTATION.JPG',
			src: '/MortimerBaltus/jpGallery/TokyoTrainstation_sovh7s',
			alt: 'A Trainstation in Tokyo',
			svg:
				'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjgwIDg1MyI+PHBhdGggZmlsbD0iIzg4OCIgZD0iTTAgMGgxMjgwdjg1MEgweiIvPjxnIGZpbGwtb3BhY2l0eT0iLjUiPjxwYXRoIGQ9Ik01NTEuOCA1NjUuNEwtMjMuOSAyNzEuMmwzNy43IDYwOEwxMjc5IDkyNy40eiIvPjxwYXRoIGZpbGw9IiNlMGUwZTAiIGQ9Ik00ODAuNSA1MjkuOGwtNTU3LjItMzI3IDE0MzQuMi01NS45TDEyMjYgODc5eiIvPjxwYXRoIGZpbGw9IiMyYjJiMmIiIGQ9Ik0xMDAyLjYgMzI4LjdsLTYwLTMxMi4zLTM0NS44IDcgNC45IDI4OS40eiIvPjxwYXRoIGZpbGw9IiNlY2VjZWMiIGQ9Ik01OTAuNCAxODguN2w4LTE5OS4xLTY3NS45LTY3LjF2MjczLjJ6Ii8+PHBhdGggZD0iTS01Mi4yIDM0Ni4xbDEwNzcgNTgxLjRINTc0LjNMLjIgNTg3Ljd6Ii8+PHBhdGggZmlsbD0iI2RmZGZkZiIgZD0iTTk1NC03Ny41bDUwLjggOTIuNCAzMDYuNCAxMTlMOTY4LjEgNDIzeiIvPjxwYXRoIGQ9Ik0xMzU3LjUgMTUzLjVMMTI3Mi44IDkgOTU5LTM5LjRsLTUzLjggNC42eiIvPjxwYXRoIGZpbGw9IiNkYWRhZGEiIGQ9Ik03NTUuNSAxNzEuNWwxNDMuMS0xLjctNi4zIDkzLjEtMzE1LjgtODQuNXoiLz48cGF0aCBmaWxsPSIjMDIwMjAyIiBkPSJNODYxIDk3LjVsNTcuNyAyMjEgNTAuMy02Mi4zLTM3LjctMTUzLjZ6Ii8+PHBhdGggZmlsbD0iIzg3ODc4NyIgZD0iTTI0LjMgOTI3LjVMMjcgNjgyLjNsMTYwLjUgMjcuNSA1OC4zIDc2LjZ6Ii8+PHBhdGggZmlsbD0iI2ZiZmJmYiIgZD0iTTc4Mi44IDIxLjNsMjQwLjcuOC0zNDguOC05OS42LTEwMS45IDk1Ljd6Ii8+PHBhdGggZmlsbD0iI2NhY2FjYSIgZD0iTTEyNzAuMyA4ODEuNGwtMTM4LjktNTc0LjgtOTYyLjUgMjggNDExLjIgMjExLjh6Ii8+PHBhdGggZmlsbD0iIzE1MTUxNSIgZD0iTTcxMS4xIDIxN2wtNzUgMTQuNkw2MDUuOS0xNWwtMTEuNyAzNTAuN3oiLz48cGF0aCBmaWxsPSIjOWU5ZTllIiBkPSJNNjY4LjEgMTA0LjdsLTU4LjQtNTYuMUw4MjcgNTguOWwzNi41IDQyLjZ6Ii8+PHBhdGggZmlsbD0iIzFjMWMxYyIgZD0iTTc1MS42IDgwNy44TDM1OS40IDQ2NGwyMTIuOCAxMTAuMyAyMzMuNSAxMTcuNXoiLz48cGF0aCBmaWxsPSIjMTIxMjEyIiBkPSJNOTYwLjggMjYuM2wtNDU2LjggMyA0MzguNyAzMS4yIDExLjYgMzYuOHoiLz48cGF0aCBmaWxsPSIjM2UzZTNlIiBkPSJNNzYxIDMzNWwtLjktMjIzLjMgMjEuMi00NyAxMSAxOTd6Ii8+PHBhdGggZmlsbD0iI2M3YzdjNyIgZD0iTTU5NS44LTI5LjRsLTUzOCAzNDUgMzYyLjUgMTU0LjggMTc5LjItMjU5LjJ6Ii8+PHBhdGggZmlsbD0iI2M2YzZjNiIgZD0iTTk5NyAuMmwtNDEuMyAyOTEuOSAyODAuNyAzMDMtMjYtNDk2LjV6Ii8+PHBhdGggZmlsbD0iIzdkN2Q3ZCIgZD0iTTk0NiA4MjlsMzMuMi0yMi4yLTEwMC4zLTcwLjZMNzU4IDc0OXoiLz48cGF0aCBmaWxsPSIjZDdkN2Q3IiBkPSJNNzA3LjcgMTY2LjVsLTc3LjUgMTguMyAxMjkgNzUuNy0yMy4zLTgwLjh6Ii8+PHBhdGggZmlsbD0iIzFhMWExYSIgZD0iTTgyOC42IDMwNC40TDg5MyAyODBsMTEtMTAyLjNMOTc1LjQgMzE3eiIvPjxwYXRoIGZpbGw9IiM5Njk2OTYiIGQ9Ik0xMjQwLjEgNjM2LjdsLTE1LjktNTE5LjQgMTMzLjMgMTY2LjUtMTEwIDY0My43eiIvPjxwYXRoIGZpbGw9IiM4YzhjOGMiIGQ9Ik0xMDUuNCAzMzkuM2wxNS44LTQxMUw3NC0xOS42bC0uNSAzMzF6Ii8+PHBhdGggZmlsbD0iIzBkMGQwZCIgZD0iTTUzNiA1NjIuNWwtNjA0LjItMzEwLTkuMyAzNTkuMUw3NC42IDM0OC44eiIvPjxwYXRoIGZpbGw9IiNjM2MzYzMiIGQ9Ik04OTkuMiAxNzRsLTI2IDgxLjQtOTQuNiAxOUw4MDAgMTc1eiIvPjxwYXRoIGZpbGw9IiMyNDI0MjQiIGQ9Ik02ODQuOCAyMDJsLTMxLjIgNSAyMi45IDExNy44IDI5LjgtNjB6Ii8+PHBhdGggZmlsbD0iIzZiNmI2YiIgZD0iTTYyLjEgMzg1LjFsMzguMy0yOS44IDEyMy43IDE1NCAxMTYtMTl6Ii8+PHBhdGggZmlsbD0iIzJjMmMyYyIgZD0iTTYzNS4yIDMyNC41bDQtMTkyLjcgNDI0LjggMzguNy00NjEuOS02LjV6Ii8+PHBhdGggZmlsbD0iIzQ3NDc0NyIgZD0iTTM5OS40IDg3OWwtMS4yIDQ0LjctNDQtMTcyLjhMNzIuNiA2MTF6Ii8+PHBhdGggZmlsbD0iIzE1MTUxNSIgZD0iTTQyNi4xIDczNi40bDQzMS4xIDE5MS4xTDM4MCA4NjguOGwtNjgtNDQ5eiIvPjxwYXRoIGZpbGw9IiNhNmE2YTYiIGQ9Ik0xMDA5LjYgMzg1LjlsLTE5IDMzMy42LTI5LTM5Ni41LTUuMy0yMTYuOXoiLz48L2c+PC9zdmc+")'
		}
	];
	var e = Math.floor(Math.random() * i.length);
	return [i, e, i[e].src];
}
class Ii extends i {
	constructor(t) {
		super(), e(this, t, Mi, ri, s, {});
	}
}
function ni(t) {
	let i, e, s, c, g, l, N, u, j, T, h, D, d, m, L, w, z, y;
	return {
		c() {
			(i = a('p')),
				(e = P('I suppose it is tempting, ')),
				(s = a('br')),
				(c = P(' if the only tool you have is a\n            hammer,')),
				(g = a('br')),
				(l = P('\n            to treat everything as if it were a nail.')),
				(N = E()),
				(u = a('p')),
				(j = P('- Abraham Maslow ')),
				(T = a('br')),
				(h = a('br')),
				(D = E()),
				(d = a('p')),
				(m = P("You wouldn't change a lightbulb with a hammer. ")),
				(L = a('br')),
				(w = E()),
				(z = a('p')),
				(y = P("We won't either.")),
				this.h();
		},
		l(t) {
			i = r(t, 'P', { class: !0 });
			var a = M(i);
			(e = Y(a, 'I suppose it is tempting, ')),
				(s = r(a, 'BR', {})),
				(c = Y(a, ' if the only tool you have is a\n            hammer,')),
				(g = r(a, 'BR', {})),
				(l = Y(a, '\n            to treat everything as if it were a nail.')),
				a.forEach(I),
				(N = G(t)),
				(u = r(t, 'P', { class: !0 }));
			var n = M(u);
			(j = Y(n, '- Abraham Maslow ')),
				(T = r(n, 'BR', {})),
				(h = r(n, 'BR', {})),
				n.forEach(I),
				(D = G(t)),
				(d = r(t, 'P', { class: !0 }));
			var o = M(d);
			(m = Y(o, "You wouldn't change a lightbulb with a hammer. ")),
				(L = r(o, 'BR', {})),
				o.forEach(I),
				(w = G(t)),
				(z = r(t, 'P', { class: !0 }));
			var x = M(z);
			(y = Y(x, "We won't either.")), x.forEach(I), this.h();
		},
		h() {
			n(i, 'class', 'svelte-nlgqqt'),
				n(u, 'class', 'text-right svelte-nlgqqt'),
				n(d, 'class', 'svelte-nlgqqt'),
				n(z, 'class', 'text-right svelte-nlgqqt');
		},
		m(t, a) {
			o(t, i, a),
				v(i, e),
				v(i, s),
				v(i, c),
				v(i, g),
				v(i, l),
				o(t, N, a),
				o(t, u, a),
				v(u, j),
				v(u, T),
				v(u, h),
				o(t, D, a),
				o(t, d, a),
				v(d, m),
				v(d, L),
				o(t, w, a),
				o(t, z, a),
				v(z, y);
		},
		d(t) {
			t && I(i), t && I(N), t && I(u), t && I(D), t && I(d), t && I(w), t && I(z);
		}
	};
}
function ci(t) {
	let i, e, s;
	return (
		(e = new Nt({
			props: {
				width: 378,
				height: 273,
				parallax: 'very-slow',
				background: '#7d7d7d',
				title: 'CLEAN.CODE',
				id: 10,
				isInForeground: !0,
				intersections: [3],
				distanceFromIntersection: { base: 13, large: 8 },
				$$slots: { default: [ni] },
				$$scope: { ctx: t }
			}
		})),
		{
			c() {
				(i = a('div')), p(e.$$.fragment), this.h();
			},
			l(t) {
				i = r(t, 'DIV', { class: !0 });
				var s = M(i);
				A(e.$$.fragment, s), s.forEach(I), this.h();
			},
			h() {
				n(i, 'class', 'grid-area svelte-nlgqqt');
			},
			m(t, a) {
				o(t, i, a), S(e, i, null), (s = !0);
			},
			p(t, [i]) {
				const s = {};
				1 & i && (s.$$scope = { dirty: i, ctx: t }), e.$set(s);
			},
			i(t) {
				s || (z(e.$$.fragment, t), (s = !0));
			},
			o(t) {
				$(e.$$.fragment, t), (s = !1);
			},
			d(t) {
				t && I(i), Z(e);
			}
		}
	);
}
class oi extends i {
	constructor(t) {
		super(), e(this, t, null, ci, s, {});
	}
}
function gi(t) {
	let i, e;
	return {
		c() {
			(i = a('img')), this.h();
		},
		l(t) {
			(i = r(t, 'IMG', { src: !0, alt: !0, class: !0 })), this.h();
		},
		h() {
			i.src !== (e = 'Images/Logopedia.svg') && n(i, 'src', 'Images/Logopedia.svg'),
				n(i, 'alt', 'Logo Portfolio'),
				n(i, 'class', 'svelte-jwlkkk');
		},
		m(t, e) {
			o(t, i, e);
		},
		d(t) {
			t && I(i);
		}
	};
}
function li(t) {
	let i, e, s;
	return (
		(e = new Nt({
			props: {
				width: 472,
				height: 344,
				parallax: 'slowish',
				title: 'LOGOPEDIA.MP4',
				enlargeable: !1,
				background: '#C4BDBD',
				id: 6,
				isInForeground: !0,
				$$slots: { default: [gi] },
				$$scope: { ctx: t }
			}
		})),
		{
			c() {
				(i = a('div')), p(e.$$.fragment), this.h();
			},
			l(t) {
				i = r(t, 'DIV', { class: !0 });
				var s = M(i);
				A(e.$$.fragment, s), s.forEach(I), this.h();
			},
			h() {
				n(i, 'class', 'grid-area svelte-jwlkkk');
			},
			m(t, a) {
				o(t, i, a), S(e, i, null), (s = !0);
			},
			p(t, [i]) {
				const s = {};
				1 & i && (s.$$scope = { dirty: i, ctx: t }), e.$set(s);
			},
			i(t) {
				s || (z(e.$$.fragment, t), (s = !0));
			},
			o(t) {
				$(e.$$.fragment, t), (s = !1);
			},
			d(t) {
				t && I(i), Z(e);
			}
		}
	);
}
class Ni extends i {
	constructor(t) {
		super(), e(this, t, null, li, s, {});
	}
}
function ui(t) {
	let i, e;
	return (
		(i = new R({})),
		{
			c() {
				p(i.$$.fragment);
			},
			l(t) {
				A(i.$$.fragment, t);
			},
			m(t, s) {
				S(i, t, s), (e = !0);
			},
			i(t) {
				e || (z(i.$$.fragment, t), (e = !0));
			},
			o(t) {
				$(i.$$.fragment, t), (e = !1);
			},
			d(t) {
				Z(i, t);
			}
		}
	);
}
function ji(t) {
	let i, e, s;
	return (
		(e = new Nt({
			props: {
				width: 266,
				height: 273,
				parallax: 'very-slow',
				background: 'C96161',
				title: 'LANGUAGE',
				id: 13,
				enlargeable: !1,
				$$slots: { default: [ui] },
				$$scope: { ctx: t }
			}
		})),
		{
			c() {
				(i = a('div')), p(e.$$.fragment), this.h();
			},
			l(t) {
				i = r(t, 'DIV', { class: !0 });
				var s = M(i);
				A(e.$$.fragment, s), s.forEach(I), this.h();
			},
			h() {
				n(i, 'class', 'wrapper grid-area svelte-1b0p45e');
			},
			m(t, a) {
				o(t, i, a), S(e, i, null), (s = !0);
			},
			p(t, [i]) {
				const s = {};
				1 & i && (s.$$scope = { dirty: i, ctx: t }), e.$set(s);
			},
			i(t) {
				s || (z(e.$$.fragment, t), (s = !0));
			},
			o(t) {
				$(e.$$.fragment, t), (s = !1);
			},
			d(t) {
				t && I(i), Z(e);
			}
		}
	);
}
class Ti extends i {
	constructor(t) {
		super(), e(this, t, null, ji, s, {});
	}
}
function hi(t) {
	let i, e;
	return (
		(i = new W({})),
		{
			c() {
				p(i.$$.fragment);
			},
			l(t) {
				A(i.$$.fragment, t);
			},
			m(t, s) {
				S(i, t, s), (e = !0);
			},
			i(t) {
				e || (z(i.$$.fragment, t), (e = !0));
			},
			o(t) {
				$(i.$$.fragment, t), (e = !1);
			},
			d(t) {
				Z(i, t);
			}
		}
	);
}
function Di(t) {
	let i, e, s;
	return (
		(e = new Nt({
			props: {
				width: 378,
				height: 313,
				parallax: 'very-slow',
				background: '#EFEFEF',
				title: 'CONTACT',
				id: 14,
				enlargeable: !1,
				$$slots: { default: [hi] },
				$$scope: { ctx: t }
			}
		})),
		{
			c() {
				(i = a('div')), p(e.$$.fragment), this.h();
			},
			l(t) {
				i = r(t, 'DIV', { class: !0 });
				var s = M(i);
				A(e.$$.fragment, s), s.forEach(I), this.h();
			},
			h() {
				n(i, 'class', 'wrapper grid-area svelte-7318ic');
			},
			m(t, a) {
				o(t, i, a), S(e, i, null), (s = !0);
			},
			p(t, [i]) {
				const s = {};
				1 & i && (s.$$scope = { dirty: i, ctx: t }), e.$set(s);
			},
			i(t) {
				s || (z(e.$$.fragment, t), (s = !0));
			},
			o(t) {
				$(e.$$.fragment, t), (s = !1);
			},
			d(t) {
				t && I(i), Z(e);
			}
		}
	);
}
class di extends i {
	constructor(t) {
		super(), e(this, t, null, Di, s, {});
	}
}
function mi(t) {
	let i, e, s, a, r, M, n, c, g, l, N, u, j, h, D, d, m, L, w, y, x, f, v, C, b, O, k, P, Y, B;
	return (
		(i = new at({})),
		(s = new St({})),
		(r = new Tt({})),
		(n = new Ii({})),
		(g = new Ot({})),
		(N = new Ht({})),
		(j = new Wt({})),
		(D = new Xt({})),
		(m = new Bt({})),
		(w = new oi({})),
		(x = new si({})),
		(v = new Kt({})),
		(b = new Ni({})),
		(k = new Ti({})),
		(Y = new di({})),
		{
			c() {
				p(i.$$.fragment),
					(e = E()),
					p(s.$$.fragment),
					(a = E()),
					p(r.$$.fragment),
					(M = E()),
					p(n.$$.fragment),
					(c = E()),
					p(g.$$.fragment),
					(l = E()),
					p(N.$$.fragment),
					(u = E()),
					p(j.$$.fragment),
					(h = E()),
					p(D.$$.fragment),
					(d = E()),
					p(m.$$.fragment),
					(L = E()),
					p(w.$$.fragment),
					(y = E()),
					p(x.$$.fragment),
					(f = E()),
					p(v.$$.fragment),
					(C = E()),
					p(b.$$.fragment),
					(O = E()),
					p(k.$$.fragment),
					(P = E()),
					p(Y.$$.fragment);
			},
			l(t) {
				A(i.$$.fragment, t),
					(e = G(t)),
					A(s.$$.fragment, t),
					(a = G(t)),
					A(r.$$.fragment, t),
					(M = G(t)),
					A(n.$$.fragment, t),
					(c = G(t)),
					A(g.$$.fragment, t),
					(l = G(t)),
					A(N.$$.fragment, t),
					(u = G(t)),
					A(j.$$.fragment, t),
					(h = G(t)),
					A(D.$$.fragment, t),
					(d = G(t)),
					A(m.$$.fragment, t),
					(L = G(t)),
					A(w.$$.fragment, t),
					(y = G(t)),
					A(x.$$.fragment, t),
					(f = G(t)),
					A(v.$$.fragment, t),
					(C = G(t)),
					A(b.$$.fragment, t),
					(O = G(t)),
					A(k.$$.fragment, t),
					(P = G(t)),
					A(Y.$$.fragment, t);
			},
			m(t, I) {
				S(i, t, I),
					o(t, e, I),
					S(s, t, I),
					o(t, a, I),
					S(r, t, I),
					o(t, M, I),
					S(n, t, I),
					o(t, c, I),
					S(g, t, I),
					o(t, l, I),
					S(N, t, I),
					o(t, u, I),
					S(j, t, I),
					o(t, h, I),
					S(D, t, I),
					o(t, d, I),
					S(m, t, I),
					o(t, L, I),
					S(w, t, I),
					o(t, y, I),
					S(x, t, I),
					o(t, f, I),
					S(v, t, I),
					o(t, C, I),
					S(b, t, I),
					o(t, O, I),
					S(k, t, I),
					o(t, P, I),
					S(Y, t, I),
					(B = !0);
			},
			p: T,
			i(t) {
				B ||
					(z(i.$$.fragment, t),
					z(s.$$.fragment, t),
					z(r.$$.fragment, t),
					z(n.$$.fragment, t),
					z(g.$$.fragment, t),
					z(N.$$.fragment, t),
					z(j.$$.fragment, t),
					z(D.$$.fragment, t),
					z(m.$$.fragment, t),
					z(w.$$.fragment, t),
					z(x.$$.fragment, t),
					z(v.$$.fragment, t),
					z(b.$$.fragment, t),
					z(k.$$.fragment, t),
					z(Y.$$.fragment, t),
					(B = !0));
			},
			o(t) {
				$(i.$$.fragment, t),
					$(s.$$.fragment, t),
					$(r.$$.fragment, t),
					$(n.$$.fragment, t),
					$(g.$$.fragment, t),
					$(N.$$.fragment, t),
					$(j.$$.fragment, t),
					$(D.$$.fragment, t),
					$(m.$$.fragment, t),
					$(w.$$.fragment, t),
					$(x.$$.fragment, t),
					$(v.$$.fragment, t),
					$(b.$$.fragment, t),
					$(k.$$.fragment, t),
					$(Y.$$.fragment, t),
					(B = !1);
			},
			d(t) {
				Z(i, t),
					t && I(e),
					Z(s, t),
					t && I(a),
					Z(r, t),
					t && I(M),
					Z(n, t),
					t && I(c),
					Z(g, t),
					t && I(l),
					Z(N, t),
					t && I(u),
					Z(j, t),
					t && I(h),
					Z(D, t),
					t && I(d),
					Z(m, t),
					t && I(L),
					Z(w, t),
					t && I(y),
					Z(x, t),
					t && I(f),
					Z(v, t),
					t && I(C),
					Z(b, t),
					t && I(O),
					Z(k, t),
					t && I(P),
					Z(Y, t);
			}
		}
	);
}
class Li extends i {
	constructor(t) {
		super(), e(this, t, null, mi, s, {});
	}
}
function wi(t) {
	let i,
		e,
		s,
		g,
		l,
		N,
		u,
		j,
		T,
		h,
		D,
		d,
		m,
		w,
		y,
		x,
		f,
		C,
		b,
		O,
		k,
		B,
		Q,
		H,
		F,
		R,
		W,
		J,
		V,
		X,
		_,
		q,
		K,
		tt,
		it,
		et,
		st,
		at,
		rt,
		Mt,
		It,
		nt;
	return (
		(It = new Li({})),
		{
			c() {
				(i = a('main')),
					(e = a('div')),
					(s = a('div')),
					(g = U('svg')),
					(l = U('g')),
					(N = U('path')),
					(u = U('g')),
					(j = U('path')),
					(T = U('path')),
					(h = U('path')),
					(D = U('path')),
					(d = U('path')),
					(m = U('g')),
					(w = U('g')),
					(y = U('path')),
					(x = U('path')),
					(f = U('path')),
					(C = U('path')),
					(b = U('path')),
					(O = E()),
					(k = E()),
					(B = a('div')),
					(Q = a('h1')),
					(H = P('CREATIVE SERVICES & DIGITAL DEVELOPMENT\n\t\t\t\t\t\t')),
					(F = a('span')),
					(R = E()),
					(W = a('div')),
					(J = a('h1')),
					(V = a('span')),
					(X = P('©2021')),
					(_ = P('c/o MORITZ MORTIMER MÜLLER (DE),\n\t\t\t\t\t\t')),
					(q = a('span')),
					(K = P('THEODOR BALTUS STEINER (JP)')),
					(tt = E()),
					(it = a('div')),
					(et = a('h1')),
					(st = P('THEODOR BALTUS STEINER (JP)')),
					(at = E()),
					(rt = a('div')),
					(Mt = a('div')),
					p(It.$$.fragment),
					this.h();
			},
			l(t) {
				i = r(t, 'MAIN', { class: !0 });
				var a = M(i);
				e = r(a, 'DIV', { class: !0 });
				var n = M(e);
				s = r(n, 'DIV', { class: !0 });
				var c = M(s);
				g = r(c, 'svg', { width: !0, height: !0, viewBox: !0, xmlns: !0, class: !0 }, 1);
				var o = M(g);
				l = r(o, 'g', { id: !0, stroke: !0, 'stroke-width': !0, fill: !0, 'fill-rule': !0 }, 1);
				var L = M(l);
				(N = r(L, 'path', { fill: !0, d: !0 }, 1)),
					M(N).forEach(I),
					(u = r(L, 'g', { id: !0, style: !0, class: !0 }, 1));
				var z = M(u);
				(j = r(z, 'path', { id: !0, fill: !0, d: !0 }, 1)),
					M(j).forEach(I),
					(T = r(z, 'path', { d: !0, id: !0, fill: !0 }, 1)),
					M(T).forEach(I),
					(h = r(z, 'path', { d: !0, id: !0, fill: !0 }, 1)),
					M(h).forEach(I),
					(D = r(z, 'path', { d: !0, id: !0, fill: !0 }, 1)),
					M(D).forEach(I),
					(d = r(z, 'path', { d: !0, id: !0, fill: !0 }, 1)),
					M(d).forEach(I),
					z.forEach(I),
					(m = r(L, 'g', { id: !0, style: !0, class: !0 }, 1));
				var $ = M(m);
				w = r($, 'g', { transform: !0 }, 1);
				var p = M(w);
				(y = r(p, 'path', { d: !0, id: !0, fill: !0 }, 1)),
					M(y).forEach(I),
					(x = r(p, 'path', { d: !0, id: !0, fill: !0 }, 1)),
					M(x).forEach(I),
					(f = r(p, 'path', { d: !0, id: !0, fill: !0 }, 1)),
					M(f).forEach(I),
					(C = r(p, 'path', { d: !0, id: !0, fill: !0 }, 1)),
					M(C).forEach(I),
					(b = r(p, 'path', { id: !0, fill: !0, d: !0 }, 1)),
					M(b).forEach(I),
					p.forEach(I),
					$.forEach(I),
					L.forEach(I),
					o.forEach(I),
					(O = G(c)),
					(k = G(c)),
					(B = r(c, 'DIV', { class: !0 }));
				var E = M(B);
				Q = r(E, 'H1', { class: !0, style: !0 });
				var v = M(Q);
				(H = Y(v, 'CREATIVE SERVICES & DIGITAL DEVELOPMENT\n\t\t\t\t\t\t')),
					(F = r(v, 'SPAN', { class: !0 })),
					M(F).forEach(I),
					v.forEach(I),
					E.forEach(I),
					(R = G(c)),
					(W = r(c, 'DIV', { class: !0 }));
				var S = M(W);
				J = r(S, 'H1', { class: !0, style: !0 });
				var Z = M(J);
				V = r(Z, 'SPAN', { class: !0 });
				var P = M(V);
				(X = Y(P, '©2021')),
					P.forEach(I),
					(_ = Y(Z, 'c/o MORITZ MORTIMER MÜLLER (DE),\n\t\t\t\t\t\t')),
					(q = r(Z, 'SPAN', { class: !0 }));
				var U = M(q);
				(K = Y(U, 'THEODOR BALTUS STEINER (JP)')),
					U.forEach(I),
					Z.forEach(I),
					S.forEach(I),
					(tt = G(c)),
					(it = r(c, 'DIV', { class: !0 }));
				var nt = M(it);
				et = r(nt, 'H1', { class: !0, style: !0 });
				var ct = M(et);
				(st = Y(ct, 'THEODOR BALTUS STEINER (JP)')),
					ct.forEach(I),
					nt.forEach(I),
					c.forEach(I),
					(at = G(n)),
					(rt = r(n, 'DIV', { class: !0 }));
				var ot = M(rt);
				Mt = r(ot, 'DIV', { class: !0 });
				var gt = M(Mt);
				A(It.$$.fragment, gt), gt.forEach(I), ot.forEach(I), n.forEach(I), a.forEach(I), this.h();
			},
			h() {
				n(N, 'fill', 'none'),
					n(N, 'd', 'M0 0h768v300H0z'),
					n(j, 'id', 'Path'),
					n(j, 'fill', '#FEFEFE'),
					n(
						j,
						'd',
						'M47.85 48.545V4.23L33.63333 48.545H21.845L7.62833 4.23v44.315H0V0h14.21667L27.74 42.65 41.26333 0H55.48v48.545h-7.62833zM61.02167 32.11c0-9.91667 7.14333-17.13167 16.92166-17.13167C88 14.97833 94.865 22.33 94.865 32.11c0 9.91667-7.14333 17.12833-16.92167 17.12833-9.985 0-16.92166-7.42-16.92166-17.12833z'
					),
					n(
						T,
						'd',
						'M87.58333 32.11c0-5.75667-3.53666-10.54333-9.64-10.54333-6.03333 0-9.63833 4.78666-9.63833 10.54333 0 5.68667 3.675 10.54 9.63833 10.54 6.03334 0 9.64-4.785 9.64-10.54z'
					),
					n(T, 'id', 'Path'),
					n(T, 'fill', '#151515'),
					n(
						h,
						'd',
						'M117.08833 15.67167H125.13V5.2h7.28333v10.47167h9.70834v6.24166h-9.70834V48.545H125.13V21.91333h-9.66333c-5.005 0-8.02 2.24334-8.02 5.48V48.545h-7.28V15.67167H107.45V21.15c1.31667-3.605 5.005-5.47833 9.64-5.47833M145.93167 2.08h7.975v7.975h-7.975zM153.56 15.67167V48.545h-7.28333V15.67167zM168.675 15.67167v4.64666c1.73333-3.745 4.64667-5.34 8.67-5.34 4.50833 0 7.49 2.56667 8.66667 6.86667 1.52666-4.23167 4.78666-6.86667 9.36333-6.86667 6.935 0 10.05667 4.855 10.05667 11.375V48.545h-7.28334V27.94833c0-3.53833-1.73333-6.45-5.54666-6.45-3.745 0-5.55 2.98334-5.55 6.45V48.545h-7.28V27.94833c0-3.53833-1.73334-6.45-5.55-6.45-4.16 0-5.54667 3.53667-5.54667 7.14334V48.545h-7.28167V15.67167h7.28334-.00167zM236.21667 36.06333l6.24166 2.42667c-2.42833 7.07333-7.7 10.74833-15.18833 10.74833-10.54167 0-17.06167-7.21166-17.06167-17.33666 0-9.57167 6.38-16.92334 16.02167-16.92334 8.94667 0 14.84167 5.68667 14.84167 14.49667 0 1.31667-.14 2.565-.34667 3.81333h-23.23333c0 5.825 4.02166 9.70834 9.84833 9.70834 4.57667 0 7.905-2.42667 8.87667-6.93334z'
					),
					n(h, 'id', 'Path'),
					n(h, 'fill', '#FEFEFE'),
					n(
						D,
						'd',
						'M217.49 28.435h16.3l.06667-.625c0-4.51-3.535-6.59-7.695-6.59-4.51 0-7.97667 2.705-8.67167 7.215z'
					),
					n(D, 'id', 'Path'),
					n(D, 'fill', '#151515'),
					n(
						d,
						'd',
						'M254.52 15.67167v4.785c1.31667-3.605 4.16167-5.47834 7.975-5.47834 5.41 0 9.5 3.81667 9.5 9.29334 0 1.45666-.13833 2.845-.485 4.16333h-7.21167a12.545 12.545 0 00.27667-2.775c0-2.775-2.21833-4.44-4.85333-4.44-3.33 0-5.20167 2.28833-5.20167 5.48v21.845h-7.28333V15.67167H254.52z'
					),
					n(d, 'id', 'Path'),
					n(d, 'fill', '#FEFEFE'),
					n(u, 'id', 'Mortimer'),
					L(u, '--animation-order', '0'),
					n(u, 'class', 'mask svelte-1ngfnp0'),
					c(u, 'intro-animation', t[0]),
					n(
						y,
						'd',
						'M0 0h22.88667C30.515 0 38.49 4.43833 38.49 12.82833c0 5.20167-2.98333 8.73834-7.62833 10.75 5.895 1.45667 9.36166 5.68834 9.36166 11.79 0 8.6-8.25166 13.17667-15.95 13.17667H0V0z'
					),
					n(y, 'id', 'Path'),
					n(y, 'fill', '#FEFEFE'),
					n(
						x,
						'd',
						'M22.53833 20.11c4.44 0 8.32334-1.595 8.32334-6.58667 0-4.64666-4.36834-6.24166-8.32334-6.24166h-14.91V20.11h14.91zM23.92667 41.26333c4.23 0 8.32166-2.21833 8.32166-6.935 0-4.64666-4.02166-7.28333-8.32166-7.28333H7.62833v14.21667h16.29834v.00166z'
					),
					n(x, 'id', 'Path'),
					n(x, 'fill', '#151515'),
					n(
						f,
						'd',
						'M45.21 39.18333c0-7.55833 5.68667-10.54166 12.55333-10.54166 2.01 0 3.95167.20833 5.825.69333l3.46667.83333V27.74c0-4.50833-3.32833-6.86667-7.62833-6.86667-4.16 0-7.28167 2.35834-7.975 6.52L44.86333 25.66C46.53 18.44667 52.285 14.97833 59.42667 14.97833c8.6 0 14.565 4.02334 14.565 13.10834V48.545H67.055v-5.55c-1.87167 4.58-6.38 6.24333-11.02667 6.24333-5.825 0-10.81833-4.09166-10.81833-10.055z'
					),
					n(f, 'id', 'Path'),
					n(f, 'fill', '#FEFEFE'),
					n(
						C,
						'd',
						'M67.055 36.06333v-.34666l-2.63333-.695c-2.36-.62334-4.16167-.90167-5.48-.90167-2.91334 0-6.10334.9-6.10334 4.37 0 1.31667.48667 2.35833 1.52667 3.19.97.9 2.49667 1.31667 4.57667 1.31667 4.36833 0 8.11333-2.21834 8.11333-6.93334z'
					),
					n(C, 'id', 'Path'),
					n(C, 'fill', '#151515'),
					n(b, 'id', 'Path'),
					n(b, 'fill', '#FEFEFE'),
					n(
						b,
						'd',
						'M80.99 0h7.28333v48.545H80.99zM99.64 21.91333h-6.58833v-6.24166H99.64V5.2h7.28333v10.47167h9.70834v6.24166h-9.70834V48.545H99.64zM149.43333 15.67167V48.545H142.15v-5.2c-2.35833 3.95-5.75667 5.89333-10.195 5.89333-7.83333 0-11.99667-4.785-11.99667-12.48333V15.67333h7.28334v19.35c0 4.3 1.80166 7.975 6.58666 7.975 5.755 0 8.32167-4.85333 8.32167-10.055V15.67167h7.28333zM154.005 40.22333l5.89333-3.12c1.80334 4.09167 4.64667 5.89334 9.155 5.89334 2.35834 0 6.17167-.76167 6.17167-3.81334 0-1.45666-.555-2.635-1.66333-3.4-1.11-.76166-3.26-1.385-6.45-1.87-5.47834-.90166-11.30334-3.12166-11.30334-9.64166 0-6.38 6.795-9.29334 12.27334-9.29334 5.48 0 9.71 2.01167 12.06666 7.14334l-5.54666 3.05166c-.97167-2.91333-3.12167-4.37-6.45-4.37-2.08 0-5.75667.90167-5.75667 3.60667 0 1.25.625 2.15 1.80333 2.70667 1.18.62333 3.4 1.11 6.52 1.595 6.10167.9 11.44334 3.05 11.44334 10.125 0 7.14333-7.145 10.40166-13.38667 10.40166-6.51667 0-12.27333-2.70333-14.77-9.01666v.00166z'
					),
					n(w, 'transform', 'translate(278.3)'),
					n(m, 'id', 'Baltus'),
					L(m, '--animation-order', '1'),
					n(m, 'class', 'mask svelte-1ngfnp0'),
					c(m, 'intro-animation', t[0]),
					n(l, 'id', 'Page-1'),
					n(l, 'stroke', 'none'),
					n(l, 'stroke-width', '1'),
					n(l, 'fill', 'none'),
					n(l, 'fill-rule', 'evenodd'),
					n(g, 'width', '462'),
					n(g, 'height', '50'),
					n(g, 'viewBox', '0 0 462 50'),
					n(g, 'xmlns', 'http://www.w3.org/2000/svg'),
					n(g, 'class', 'svelte-1ngfnp0'),
					n(F, 'class', 'desktop svelte-1ngfnp0'),
					n(Q, 'class', 'mask svelte-1ngfnp0'),
					L(Q, '--animation-order', '2'),
					c(Q, 'intro-animation', t[0]),
					n(B, 'class', 'masking svelte-1ngfnp0'),
					n(V, 'class', 'mobile svelte-1ngfnp0'),
					n(q, 'class', 'desktop svelte-1ngfnp0'),
					n(J, 'class', 'mask svelte-1ngfnp0'),
					L(J, '--animation-order', '2'),
					c(J, 'intro-animation', t[0]),
					n(W, 'class', 'masking svelte-1ngfnp0'),
					n(et, 'class', 'mobile mask svelte-1ngfnp0'),
					L(et, '--animation-order', '2'),
					c(et, 'intro-animation', t[0]),
					n(it, 'class', 'masking mobile svelte-1ngfnp0'),
					n(s, 'class', 'mortimer-baltus svelte-1ngfnp0'),
					n(Mt, 'class', 'grid-box svelte-1ngfnp0'),
					n(rt, 'class', 'scroller svelte-1ngfnp0'),
					n(e, 'class', 'container svelte-1ngfnp0'),
					n(i, 'class', 'svelte-1ngfnp0');
			},
			m(t, a) {
				o(t, i, a),
					v(i, e),
					v(e, s),
					v(s, g),
					v(g, l),
					v(l, N),
					v(l, u),
					v(u, j),
					v(u, T),
					v(u, h),
					v(u, D),
					v(u, d),
					v(l, m),
					v(m, w),
					v(w, y),
					v(w, x),
					v(w, f),
					v(w, C),
					v(w, b),
					v(s, O),
					v(s, k),
					v(s, B),
					v(B, Q),
					v(Q, H),
					v(Q, F),
					v(s, R),
					v(s, W),
					v(W, J),
					v(J, V),
					v(V, X),
					v(J, _),
					v(J, q),
					v(q, K),
					v(s, tt),
					v(s, it),
					v(it, et),
					v(et, st),
					v(e, at),
					v(e, rt),
					v(rt, Mt),
					S(It, Mt, null),
					(nt = !0);
			},
			p(t, i) {
				1 & i && c(u, 'intro-animation', t[0]),
					1 & i && c(m, 'intro-animation', t[0]),
					1 & i && c(Q, 'intro-animation', t[0]),
					1 & i && c(J, 'intro-animation', t[0]),
					1 & i && c(et, 'intro-animation', t[0]);
			},
			i(t) {
				nt || (z(It.$$.fragment, t), (nt = !0));
			},
			o(t) {
				$(It.$$.fragment, t), (nt = !1);
			},
			d(t) {
				t && I(i), Z(It);
			}
		}
	);
}
function zi(t) {
	let i, e, s, M;
	return (
		(s = new J({ props: { reverse: !0, $$slots: { default: [wi] }, $$scope: { ctx: t } } })),
		{
			c() {
				(i = a('meta')), (e = E()), p(s.$$.fragment), this.h();
			},
			l(t) {
				const a = Q('[data-svelte="svelte-jm8anw"]', document.head);
				(i = r(a, 'META', { name: !0, content: !0 })),
					a.forEach(I),
					(e = G(t)),
					A(s.$$.fragment, t),
					this.h();
			},
			h() {
				(document.title = 'MortimerBaltus'),
					n(i, 'name', 'description'),
					n(
						i,
						'content',
						'MortimerBaltus provides creative services & solutions for digital development. Founded in 2021, MortimerBaltus is based in Hamburg (DE) and Tokyo (JP).'
					);
			},
			m(t, a) {
				v(document.head, i), o(t, e, a), S(s, t, a), (M = !0);
			},
			p(t, [i]) {
				const e = {};
				3 & i && (e.$$scope = { dirty: i, ctx: t }), s.$set(e);
			},
			i(t) {
				M || (z(s.$$.fragment, t), (M = !0));
			},
			o(t) {
				$(s.$$.fragment, t), (M = !1);
			},
			d(t) {
				I(i), t && I(e), Z(s, t);
			}
		}
	);
}
function yi(t, i, e) {
	let s = !1;
	return (
		D(() => {
			e(0, (s = !0));
		}),
		[s]
	);
}
export default class extends i {
	constructor(t) {
		super(), e(this, t, yi, zi, s, {});
	}
}
