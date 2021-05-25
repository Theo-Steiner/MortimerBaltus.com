import {
	X as e,
	S as s,
	i as a,
	s as l,
	l as t,
	f as r,
	G as i,
	d as o,
	Y as n,
	e as c,
	c as h,
	a as d,
	b as m,
	Z as g,
	t as v,
	k as u,
	W as f,
	g as p,
	n as E,
	F as y,
	I as b,
	H as w,
	h as j,
	B as x,
	r as z,
	u as k,
	v as M,
	_ as F,
	$ as T,
	a0 as I,
	Q as q,
	R as B,
	J as $,
	a1 as D,
	L as S,
	P as V,
	D as A,
	E as P,
	T as G,
	z as N
} from './vendor-783391f4.js';
const O = () => {
		const s = e('__svelte__');
		return {
			page: { subscribe: s.page.subscribe },
			navigating: { subscribe: s.navigating.subscribe },
			get preloading() {
				return (
					console.error('stores.preloading is deprecated; use stores.navigating instead'),
					{ subscribe: s.navigating.subscribe }
				);
			},
			session: s.session
		};
	},
	U = { subscribe: (e) => O().page.subscribe(e) },
	H = { subscribe: (e) => O().navigating.subscribe(e) };
function R(e) {
	let s, a;
	return {
		c() {
			(s = c('button')), this.h();
		},
		l(e) {
			(s = h(e, 'BUTTON', { class: !0 })), d(s).forEach(o), this.h();
		},
		h() {
			m(s, 'class', (a = g(e[0]) + ' svelte-1hr8jmg'));
		},
		m(e, a) {
			r(e, s, a);
		},
		p(e, l) {
			1 & l && a !== (a = g(e[0]) + ' svelte-1hr8jmg') && m(s, 'class', a);
		},
		d(e) {
			e && o(s);
		}
	};
}
function C(e) {
	let s, a, l, t, i, n, b, w, j, x;
	return {
		c() {
			(s = c('a')),
				(a = c('span')),
				(l = v('Go home, or to the previous subpage!')),
				(t = u()),
				(i = f('svg')),
				(n = f('rect')),
				(b = f('g')),
				(w = f('rect')),
				(j = f('polygon')),
				this.h();
		},
		l(e) {
			s = h(e, 'A', { class: !0, href: !0 });
			var r = d(s);
			a = h(r, 'SPAN', { class: !0 });
			var c = d(a);
			(l = p(c, 'Go home, or to the previous subpage!')),
				c.forEach(o),
				(t = E(r)),
				(i = h(
					r,
					'svg',
					{ width: !0, height: !0, viewBox: !0, fill: !0, xmlns: !0, class: !0 },
					1
				));
			var m = d(i);
			(n = h(
				m,
				'rect',
				{ id: !0, x: !0, y: !0, width: !0, height: !0, rx: !0, fill: !0, stroke: !0, class: !0 },
				1
			)),
				d(n).forEach(o),
				(b = h(m, 'g', { id: !0 }, 1));
			var g = d(b);
			(w = h(g, 'rect', { x: !0, y: !0, width: !0, height: !0, fill: !0, class: !0 }, 1)),
				d(w).forEach(o),
				(j = h(g, 'polygon', { points: !0, fill: !0, class: !0 }, 1)),
				d(j).forEach(o),
				g.forEach(o),
				m.forEach(o),
				r.forEach(o),
				this.h();
		},
		h() {
			m(a, 'class', 'svelte-1hr8jmg'),
				m(n, 'id', 'box'),
				m(n, 'x', '0.5'),
				m(n, 'y', '0.5'),
				m(n, 'width', '53'),
				m(n, 'height', '14'),
				m(n, 'rx', '2.5'),
				m(n, 'fill', '#151515'),
				m(n, 'stroke', '#FEFEFE'),
				m(n, 'class', 'svelte-1hr8jmg'),
				m(w, 'x', '22'),
				m(w, 'y', '7'),
				m(w, 'width', '20'),
				m(w, 'height', '1'),
				m(w, 'fill', '#FEFEFE'),
				m(w, 'class', 'svelte-1hr8jmg'),
				m(j, 'points', '12 7 22 7 22 10'),
				m(j, 'fill', '#FEFEFE'),
				m(j, 'class', 'svelte-1hr8jmg'),
				m(b, 'id', 'arrow'),
				m(i, 'width', '54'),
				m(i, 'height', '15'),
				m(i, 'viewBox', '0 0 54 15'),
				m(i, 'fill', 'none'),
				m(i, 'xmlns', 'http://www.w3.org/2000/svg'),
				m(i, 'class', 'svelte-1hr8jmg'),
				m(s, 'class', (x = g(e[0]) + ' svelte-1hr8jmg')),
				m(s, 'href', e[1]);
		},
		m(e, o) {
			r(e, s, o), y(s, a), y(a, l), y(s, t), y(s, i), y(i, n), y(i, b), y(b, w), y(b, j);
		},
		p(e, a) {
			1 & a && x !== (x = g(e[0]) + ' svelte-1hr8jmg') && m(s, 'class', x),
				2 & a && m(s, 'href', e[1]);
		},
		d(e) {
			e && o(s);
		}
	};
}
function _(e) {
	let s, a, l, t, i, n, b, w, j, x, z;
	return {
		c() {
			(s = c('a')),
				(a = c('span')),
				(l = v('Go to the next subpage!')),
				(t = u()),
				(i = f('svg')),
				(n = f('g')),
				(b = f('rect')),
				(w = f('g')),
				(j = f('rect')),
				(x = f('polygon')),
				this.h();
		},
		l(e) {
			s = h(e, 'A', { class: !0, href: !0 });
			var r = d(s);
			a = h(r, 'SPAN', { class: !0 });
			var c = d(a);
			(l = p(c, 'Go to the next subpage!')),
				c.forEach(o),
				(t = E(r)),
				(i = h(r, 'svg', { version: !0, viewBox: !0, xmlns: !0, class: !0 }, 1));
			var m = d(i);
			n = h(m, 'g', { fill: !0, 'fill-rule': !0 }, 1);
			var g = d(n);
			(b = h(
				g,
				'rect',
				{ id: !0, x: !0, y: !0, width: !0, height: !0, rx: !0, fill: !0, stroke: !0, class: !0 },
				1
			)),
				d(b).forEach(o),
				(w = h(g, 'g', { id: !0 }, 1));
			var v = d(w);
			(j = h(v, 'rect', { x: !0, y: !0, width: !0, height: !0, fill: !0, class: !0 }, 1)),
				d(j).forEach(o),
				(x = h(v, 'polygon', { points: !0, fill: !0, class: !0 }, 1)),
				d(x).forEach(o),
				v.forEach(o),
				g.forEach(o),
				m.forEach(o),
				r.forEach(o),
				this.h();
		},
		h() {
			m(a, 'class', 'svelte-1hr8jmg'),
				m(b, 'id', 'box'),
				m(b, 'x', '.5'),
				m(b, 'y', '.5'),
				m(b, 'width', '53'),
				m(b, 'height', '14'),
				m(b, 'rx', '3'),
				m(b, 'fill', '#151515'),
				m(b, 'stroke', '#FEFEFE'),
				m(b, 'class', 'svelte-1hr8jmg'),
				m(j, 'x', '12'),
				m(j, 'y', '7'),
				m(j, 'width', '20'),
				m(j, 'height', '1'),
				m(j, 'fill', '#FEFEFE'),
				m(j, 'class', 'svelte-1hr8jmg'),
				m(x, 'points', '42 8 32 5 32 8'),
				m(x, 'fill', '#FEFEFE'),
				m(x, 'class', 'svelte-1hr8jmg'),
				m(w, 'id', 'arrow'),
				m(n, 'fill', 'none'),
				m(n, 'fill-rule', 'evenodd'),
				m(i, 'version', '1.1'),
				m(i, 'viewBox', '0 0 54 15'),
				m(i, 'xmlns', 'http://www.w3.org/2000/svg'),
				m(i, 'class', 'svelte-1hr8jmg'),
				m(s, 'class', (z = g(e[0]) + ' svelte-1hr8jmg')),
				m(s, 'href', e[1]);
		},
		m(e, o) {
			r(e, s, o), y(s, a), y(a, l), y(s, t), y(s, i), y(i, n), y(n, b), y(n, w), y(w, j), y(w, x);
		},
		p(e, a) {
			1 & a && z !== (z = g(e[0]) + ' svelte-1hr8jmg') && m(s, 'class', z),
				2 & a && m(s, 'href', e[1]);
		},
		d(e) {
			e && o(s);
		}
	};
}
function X(e) {
	let s, a, l, t, i, n, w, j, x, z, k, M;
	return {
		c() {
			(s = c('button')),
				(a = c('span')),
				(l = v('Shrink this window')),
				(t = u()),
				(i = f('svg')),
				(n = f('g')),
				(w = f('rect')),
				(j = f('rect')),
				(x = f('rect')),
				this.h();
		},
		l(e) {
			s = h(e, 'BUTTON', { class: !0 });
			var r = d(s);
			a = h(r, 'SPAN', { class: !0 });
			var c = d(a);
			(l = p(c, 'Shrink this window')),
				c.forEach(o),
				(t = E(r)),
				(i = h(r, 'svg', { version: !0, viewBox: !0, xmlns: !0, class: !0 }, 1));
			var m = d(i);
			n = h(m, 'g', { fill: !0, 'fill-rule': !0 }, 1);
			var g = d(n);
			(w = h(
				g,
				'rect',
				{ id: !0, x: !0, y: !0, width: !0, height: !0, rx: !0, fill: !0, stroke: !0, class: !0 },
				1
			)),
				d(w).forEach(o),
				(j = h(g, 'rect', { id: !0, x: !0, y: !0, width: !0, height: !0, fill: !0, class: !0 }, 1)),
				d(j).forEach(o),
				(x = h(g, 'rect', { id: !0, x: !0, y: !0, width: !0, height: !0, fill: !0, class: !0 }, 1)),
				d(x).forEach(o),
				g.forEach(o),
				m.forEach(o),
				r.forEach(o),
				this.h();
		},
		h() {
			m(a, 'class', 'svelte-1hr8jmg'),
				m(w, 'id', 'box'),
				m(w, 'x', '.5'),
				m(w, 'y', '.5'),
				m(w, 'width', '53'),
				m(w, 'height', '14'),
				m(w, 'rx', '3'),
				m(w, 'fill', '#151515'),
				m(w, 'stroke', '#FEFEFE'),
				m(w, 'class', 'svelte-1hr8jmg'),
				m(j, 'id', 'upper'),
				m(j, 'x', '17'),
				m(j, 'y', '5'),
				m(j, 'width', '20'),
				m(j, 'height', '1'),
				m(j, 'fill', '#FEFEFE'),
				m(j, 'class', 'svelte-1hr8jmg'),
				m(x, 'id', 'lower'),
				m(x, 'x', '17'),
				m(x, 'y', '9'),
				m(x, 'width', '20'),
				m(x, 'height', '1'),
				m(x, 'fill', '#FEFEFE'),
				m(x, 'class', 'svelte-1hr8jmg'),
				m(n, 'fill', 'none'),
				m(n, 'fill-rule', 'evenodd'),
				m(i, 'version', '1.1'),
				m(i, 'viewBox', '0 0 54 15'),
				m(i, 'xmlns', 'http://www.w3.org/2000/svg'),
				m(i, 'class', 'svelte-1hr8jmg'),
				m(s, 'class', (z = g(e[0]) + ' svelte-1hr8jmg'));
		},
		m(o, c) {
			r(o, s, c),
				y(s, a),
				y(a, l),
				y(s, t),
				y(s, i),
				y(i, n),
				y(n, w),
				y(n, j),
				y(n, x),
				k || ((M = b(s, 'click', e[3])), (k = !0));
		},
		p(e, a) {
			1 & a && z !== (z = g(e[0]) + ' svelte-1hr8jmg') && m(s, 'class', z);
		},
		d(e) {
			e && o(s), (k = !1), M();
		}
	};
}
function Y(e) {
	let s, a, l, t, i, n, b, w, j, x, z, k, M, F;
	return {
		c() {
			(s = c('a')),
				(a = c('span')),
				(l = v('Go to the subpage for this window')),
				(t = u()),
				(i = f('svg')),
				(n = f('g')),
				(b = f('rect')),
				(w = f('g')),
				(j = f('rect')),
				(x = f('polygon')),
				(z = f('g')),
				(k = f('rect')),
				(M = f('polygon')),
				this.h();
		},
		l(e) {
			s = h(e, 'A', { class: !0, href: !0 });
			var r = d(s);
			a = h(r, 'SPAN', { class: !0 });
			var c = d(a);
			(l = p(c, 'Go to the subpage for this window')),
				c.forEach(o),
				(t = E(r)),
				(i = h(r, 'svg', { version: !0, viewBox: !0, xmlns: !0, class: !0 }, 1));
			var m = d(i);
			n = h(m, 'g', { fill: !0, 'fill-rule': !0 }, 1);
			var g = d(n);
			(b = h(
				g,
				'rect',
				{ id: !0, x: !0, y: !0, width: !0, height: !0, rx: !0, fill: !0, stroke: !0, class: !0 },
				1
			)),
				d(b).forEach(o),
				(w = h(g, 'g', { id: !0, class: !0 }, 1));
			var v = d(w);
			(j = h(v, 'rect', { x: !0, y: !0, width: !0, height: !0, fill: !0, class: !0 }, 1)),
				d(j).forEach(o),
				(x = h(v, 'polygon', { points: !0, fill: !0, class: !0 }, 1)),
				d(x).forEach(o),
				v.forEach(o),
				(z = h(g, 'g', { id: !0, class: !0 }, 1));
			var u = d(z);
			(k = h(u, 'rect', { x: !0, y: !0, width: !0, height: !0, fill: !0, class: !0 }, 1)),
				d(k).forEach(o),
				(M = h(u, 'polygon', { points: !0, fill: !0, class: !0 }, 1)),
				d(M).forEach(o),
				u.forEach(o),
				g.forEach(o),
				m.forEach(o),
				r.forEach(o),
				this.h();
		},
		h() {
			m(a, 'class', 'svelte-1hr8jmg'),
				m(b, 'id', 'box'),
				m(b, 'x', '.5'),
				m(b, 'y', '.5'),
				m(b, 'width', '53'),
				m(b, 'height', '14'),
				m(b, 'rx', '3'),
				m(b, 'fill', '#151515'),
				m(b, 'stroke', '#FEFEFE'),
				m(b, 'class', 'svelte-1hr8jmg'),
				m(j, 'x', '12'),
				m(j, 'y', '6'),
				m(j, 'width', '20'),
				m(j, 'height', '1'),
				m(j, 'fill', '#FEFEFE'),
				m(j, 'class', 'svelte-1hr8jmg'),
				m(x, 'points', '42 7 32 4 32 7'),
				m(x, 'fill', '#FEFEFE'),
				m(x, 'class', 'svelte-1hr8jmg'),
				m(w, 'id', 'upper'),
				m(w, 'class', 'svelte-1hr8jmg'),
				m(k, 'x', '22'),
				m(k, 'y', '8'),
				m(k, 'width', '20'),
				m(k, 'height', '1'),
				m(k, 'fill', '#FEFEFE'),
				m(k, 'class', 'svelte-1hr8jmg'),
				m(M, 'points', '12 8 22 8 22 11'),
				m(M, 'fill', '#FEFEFE'),
				m(M, 'class', 'svelte-1hr8jmg'),
				m(z, 'id', 'lower'),
				m(z, 'class', 'svelte-1hr8jmg'),
				m(n, 'fill', 'none'),
				m(n, 'fill-rule', 'evenodd'),
				m(i, 'version', '1.1'),
				m(i, 'viewBox', '0 0 54 15'),
				m(i, 'xmlns', 'http://www.w3.org/2000/svg'),
				m(i, 'class', 'svelte-1hr8jmg'),
				m(s, 'class', (F = g(e[0]) + ' svelte-1hr8jmg')),
				m(s, 'href', e[1]);
		},
		m(e, o) {
			r(e, s, o),
				y(s, a),
				y(a, l),
				y(s, t),
				y(s, i),
				y(i, n),
				y(n, b),
				y(n, w),
				y(w, j),
				y(w, x),
				y(n, z),
				y(z, k),
				y(z, M);
		},
		p(e, a) {
			1 & a && F !== (F = g(e[0]) + ' svelte-1hr8jmg') && m(s, 'class', F),
				2 & a && m(s, 'href', e[1]);
		},
		d(e) {
			e && o(s);
		}
	};
}
function L(e) {
	let s;
	function a(e, s) {
		return 'subpage' === e[0]
			? Y
			: 'minimize' === e[0]
			? X
			: 'next' === e[0]
			? _
			: 'previous' === e[0]
			? C
			: R;
	}
	let l = a(e),
		n = l(e);
	return {
		c() {
			n.c(), (s = t());
		},
		l(e) {
			n.l(e), (s = t());
		},
		m(e, a) {
			n.m(e, a), r(e, s, a);
		},
		p(e, [t]) {
			l === (l = a(e)) && n ? n.p(e, t) : (n.d(1), (n = l(e)), n && (n.c(), n.m(s.parentNode, s)));
		},
		i: i,
		o: i,
		d(e) {
			n.d(e), e && o(s);
		}
	};
}
function J(e, s, a) {
	let { buttonType: l } = s,
		{ href: t = null } = s;
	const r = n();
	return (
		(e.$$set = (e) => {
			'buttonType' in e && a(0, (l = e.buttonType)), 'href' in e && a(1, (t = e.href));
		}),
		[
			l,
			t,
			r,
			() => {
				r('toggleMinimize');
			}
		]
	);
}
class W extends s {
	constructor(e) {
		super(), a(this, e, J, L, l, { buttonType: 0, href: 1 });
	}
}
function Q(e) {
	let s,
		a,
		l,
		t,
		n,
		g,
		f,
		x,
		z,
		k,
		M,
		F,
		T,
		I,
		q,
		B,
		$,
		D,
		S,
		V,
		A,
		P = 'japanese' === e[0] ? 'あ' : 'A',
		G = 'japanese' === e[0] ? 'A' : 'あ',
		N = 'japanese' === e[0] ? 'あ' : 'A',
		O = 'japanese' === e[0] ? 'A' : 'あ',
		U = 'japanese' === e[0] ? 'あ' : 'A',
		H = 'japanese' === e[0] ? 'A' : 'あ';
	return {
		c() {
			(s = c('div')),
				(a = c('div')),
				(l = c('div')),
				(t = v(P)),
				(n = u()),
				(g = c('div')),
				(f = v(G)),
				(x = u()),
				(z = c('div')),
				(k = v(N)),
				(M = u()),
				(F = c('div')),
				(T = v(O)),
				(I = u()),
				(q = c('div')),
				(B = v(U)),
				($ = u()),
				(D = c('div')),
				(S = v(H)),
				this.h();
		},
		l(e) {
			s = h(e, 'DIV', { class: !0 });
			var r = d(s);
			a = h(r, 'DIV', { class: !0 });
			var i = d(a);
			l = h(i, 'DIV', { class: !0 });
			var c = d(l);
			(t = p(c, P)), c.forEach(o), (n = E(i)), (g = h(i, 'DIV', { class: !0 }));
			var m = d(g);
			(f = p(m, G)), m.forEach(o), (x = E(i)), (z = h(i, 'DIV', { class: !0 }));
			var v = d(z);
			(k = p(v, N)), v.forEach(o), (M = E(i)), (F = h(i, 'DIV', { class: !0 }));
			var u = d(F);
			(T = p(u, O)), u.forEach(o), (I = E(i)), (q = h(i, 'DIV', { class: !0 }));
			var y = d(q);
			(B = p(y, U)), y.forEach(o), ($ = E(i)), (D = h(i, 'DIV', { class: !0 }));
			var b = d(D);
			(S = p(b, H)), b.forEach(o), i.forEach(o), r.forEach(o), this.h();
		},
		h() {
			m(l, 'class', 'animate svelte-a4ujr5'),
				w(l, 'layer1-japanese', 'japanese' === e[0]),
				w(l, 'layer1-english', 'english' === e[0]),
				m(g, 'class', 'animate svelte-a4ujr5'),
				w(g, 'layer2-japanese', 'japanese' === e[0]),
				w(g, 'layer2-english', 'english' === e[0]),
				m(z, 'class', 'animate svelte-a4ujr5'),
				w(z, 'layer3-japanese', 'japanese' === e[0]),
				w(z, 'layer3-english', 'english' === e[0]),
				m(F, 'class', 'animate svelte-a4ujr5'),
				w(F, 'layerX-japanese', 'japanese' === e[0]),
				w(F, 'layerX-english', 'english' === e[0]),
				m(q, 'class', 'animate svelte-a4ujr5'),
				w(q, 'layer4-japanese', 'japanese' === e[0]),
				w(q, 'layer4-english', 'english' === e[0]),
				m(D, 'class', 'animate svelte-a4ujr5'),
				w(D, 'layer5-japanese', 'japanese' === e[0]),
				w(D, 'layer5-english', 'english' === e[0]),
				m(a, 'class', 'animation-wrap svelte-a4ujr5'),
				m(s, 'class', 'container svelte-a4ujr5');
		},
		m(i, o) {
			r(i, s, o),
				y(s, a),
				y(a, l),
				y(l, t),
				y(a, n),
				y(a, g),
				y(g, f),
				y(a, x),
				y(a, z),
				y(z, k),
				y(a, M),
				y(a, F),
				y(F, T),
				y(a, I),
				y(a, q),
				y(q, B),
				y(a, $),
				y(a, D),
				y(D, S),
				V || ((A = b(s, 'click', e[1])), (V = !0));
		},
		p(e, [s]) {
			1 & s && P !== (P = 'japanese' === e[0] ? 'あ' : 'A') && j(t, P),
				1 & s && w(l, 'layer1-japanese', 'japanese' === e[0]),
				1 & s && w(l, 'layer1-english', 'english' === e[0]),
				1 & s && G !== (G = 'japanese' === e[0] ? 'A' : 'あ') && j(f, G),
				1 & s && w(g, 'layer2-japanese', 'japanese' === e[0]),
				1 & s && w(g, 'layer2-english', 'english' === e[0]),
				1 & s && N !== (N = 'japanese' === e[0] ? 'あ' : 'A') && j(k, N),
				1 & s && w(z, 'layer3-japanese', 'japanese' === e[0]),
				1 & s && w(z, 'layer3-english', 'english' === e[0]),
				1 & s && O !== (O = 'japanese' === e[0] ? 'A' : 'あ') && j(T, O),
				1 & s && w(F, 'layerX-japanese', 'japanese' === e[0]),
				1 & s && w(F, 'layerX-english', 'english' === e[0]),
				1 & s && U !== (U = 'japanese' === e[0] ? 'あ' : 'A') && j(B, U),
				1 & s && w(q, 'layer4-japanese', 'japanese' === e[0]),
				1 & s && w(q, 'layer4-english', 'english' === e[0]),
				1 & s && H !== (H = 'japanese' === e[0] ? 'A' : 'あ') && j(S, H),
				1 & s && w(D, 'layer5-japanese', 'japanese' === e[0]),
				1 & s && w(D, 'layer5-english', 'english' === e[0]);
		},
		i: i,
		o: i,
		d(e) {
			e && o(s), (V = !1), A();
		}
	};
}
function Z(e, s, a) {
	let l = 'english';
	return [
		l,
		function () {
			a(0, (l = 'english' === l ? 'japanese' : 'english'));
		}
	];
}
class K extends s {
	constructor(e) {
		super(), a(this, e, Z, Q, l, {});
	}
}
function ee(e) {
	let s,
		a,
		l,
		t,
		i,
		n,
		g,
		f,
		w,
		x,
		z,
		k,
		M,
		F = e[7]
			? "Thank's! I'll get back to you as soon as possible."
			: 'Oops, something went terribly wrong... Please try again or use your own e-mail client';
	return {
		c() {
			(s = c('div')),
				(a = c('div')),
				(l = c('div')),
				(t = c('img')),
				(g = u()),
				(f = c('p')),
				(w = v(F)),
				this.h();
		},
		l(e) {
			s = h(e, 'DIV', { class: !0 });
			var r = d(s);
			a = h(r, 'DIV', { class: !0 });
			var i = d(a);
			l = h(i, 'DIV', { class: !0 });
			var n = d(l);
			(t = h(n, 'IMG', { src: !0, alt: !0, class: !0, draggable: !0 })),
				(g = E(n)),
				(f = h(n, 'P', { class: !0 }));
			var c = d(f);
			(w = p(c, F)), c.forEach(o), n.forEach(o), i.forEach(o), r.forEach(o), this.h();
		},
		h() {
			t.src !== (i = 'moritz@mortimerbaltus.com' === e[4] ? oe : ne) && m(t, 'src', i),
				m(
					t,
					'alt',
					(n =
						'moritz@mortimerbaltus.com' === e[4]
							? 'Moritz Mortimer Müller as a Memoji'
							: 'Theodor Baltus Steiner as a Memoji')
				),
				m(t, 'class', 'message-img svelte-id9qzk'),
				m(t, 'draggable', 'false'),
				m(f, 'class', 'message-bubble svelte-id9qzk'),
				m(l, 'class', 'message svelte-id9qzk'),
				m(a, 'class', 'fixed svelte-id9qzk'),
				m(s, 'class', 'message-container svelte-id9qzk');
		},
		m(i, o) {
			r(i, s, o),
				y(s, a),
				y(a, l),
				y(l, t),
				y(l, g),
				y(l, f),
				y(f, w),
				(z = !0),
				k || ((M = [b(t, 'click', e[30]), I(e[12].call(null, s))]), (k = !0));
		},
		p(e, s) {
			(!z || (16 & s[0] && t.src !== (i = 'moritz@mortimerbaltus.com' === e[4] ? oe : ne))) &&
				m(t, 'src', i),
				(!z ||
					(16 & s[0] &&
						n !==
							(n =
								'moritz@mortimerbaltus.com' === e[4]
									? 'Moritz Mortimer Müller as a Memoji'
									: 'Theodor Baltus Steiner as a Memoji'))) &&
					m(t, 'alt', n),
				(!z || 128 & s[0]) &&
					F !==
						(F = e[7]
							? "Thank's! I'll get back to you as soon as possible."
							: 'Oops, something went terribly wrong... Please try again or use your own e-mail client') &&
					j(w, F);
		},
		i(a) {
			z ||
				(q(() => {
					x || (x = B(s, e[11], {}, !0)), x.run(1);
				}),
				(z = !0));
		},
		o(a) {
			x || (x = B(s, e[11], {}, !1)), x.run(0), (z = !1);
		},
		d(e) {
			e && o(s), e && x && x.end(), (k = !1), $(M);
		}
	};
}
function se(e) {
	let s,
		a,
		l,
		t,
		i,
		n,
		g,
		x,
		z,
		k,
		M,
		F,
		T,
		I,
		V,
		A,
		P,
		G,
		N,
		O,
		U,
		H,
		R,
		C = e[8] ? 'Sending...' : 'Send Email';
	return {
		c() {
			(s = c('div')),
				(a = c('form')),
				(l = c('input')),
				(i = u()),
				(n = c('textarea')),
				(g = u()),
				(x = c('div')),
				(z = c('button')),
				(k = f('svg')),
				(M = f('title')),
				(F = v('Group 2')),
				(T = f('g')),
				(I = f('g')),
				(V = f('line')),
				(A = f('line')),
				(P = u()),
				(G = c('button')),
				(N = v(C)),
				this.h();
		},
		l(e) {
			s = h(e, 'DIV', { class: !0 });
			var t = d(s);
			a = h(t, 'FORM', { method: !0, class: !0 });
			var r = d(a);
			(l = h(r, 'INPUT', { type: !0, name: !0, class: !0, placeholder: !0 })),
				(i = E(r)),
				(n = h(r, 'TEXTAREA', { cols: !0, rows: !0, class: !0, name: !0, placeholder: !0 })),
				d(n).forEach(o),
				(g = E(r)),
				(x = h(r, 'DIV', { class: !0 }));
			var c = d(x);
			z = h(c, 'BUTTON', { ontouchstart: !0, class: !0 });
			var m = d(z);
			k = h(m, 'svg', { version: !0, viewBox: !0, xmlns: !0, class: !0 }, 1);
			var v = d(k);
			M = h(v, 'title', {}, 1);
			var u = d(M);
			(F = p(u, 'Group 2')), u.forEach(o), (T = h(v, 'g', { fill: !0, 'fill-rule': !0 }, 1));
			var f = d(T);
			I = h(f, 'g', { transform: !0, stroke: !0 }, 1);
			var y = d(I);
			(V = h(y, 'line', { x2: !0, y2: !0, class: !0 }, 1)),
				d(V).forEach(o),
				(A = h(y, 'line', { transform: !0, x2: !0, y2: !0, class: !0 }, 1)),
				d(A).forEach(o),
				y.forEach(o),
				f.forEach(o),
				v.forEach(o),
				m.forEach(o),
				(P = E(c)),
				(G = h(c, 'BUTTON', { class: !0, type: !0, ontouchstart: !0, disabled: !0 }));
			var b = d(G);
			(N = p(b, C)), b.forEach(o), c.forEach(o), r.forEach(o), t.forEach(o), this.h();
		},
		h() {
			m(l, 'type', 'text'),
				m(l, 'name', 'email'),
				m(l, 'class', 'user-email svelte-id9qzk'),
				m(
					l,
					'placeholder',
					(t = e[6] && !e[2] ? 'Please enter a valid Email address' : 'Your Email')
				),
				w(l, 'invalid-email', e[6] && !e[2]),
				m(n, 'cols', '30'),
				m(n, 'rows', '10'),
				m(n, 'class', 'user-body svelte-id9qzk'),
				m(n, 'name', 'message'),
				m(n, 'placeholder', 'Your Message'),
				m(V, 'x2', '22'),
				m(V, 'y2', '22'),
				m(V, 'class', 'svelte-id9qzk'),
				m(A, 'transform', 'translate(11 11) scale(-1 1) translate(-11 -11)'),
				m(A, 'x2', '22'),
				m(A, 'y2', '22'),
				m(A, 'class', 'svelte-id9qzk'),
				m(I, 'transform', 'translate(1 1)'),
				m(I, 'stroke', '#fff'),
				m(T, 'fill', 'none'),
				m(T, 'fill-rule', 'evenodd'),
				m(k, 'version', '1.1'),
				m(k, 'viewBox', '0 0 24 24'),
				m(k, 'xmlns', 'http://www.w3.org/2000/svg'),
				m(k, 'class', 'svelte-id9qzk'),
				m(z, 'ontouchstart', ''),
				m(z, 'class', 'cancel-button svelte-id9qzk'),
				m(G, 'class', 'action-button svelte-id9qzk'),
				m(G, 'type', 'submit'),
				m(G, 'ontouchstart', ''),
				(G.disabled = e[9]),
				w(G, 'disabled', !e[3]),
				m(x, 'class', 'button-container svelte-id9qzk'),
				m(a, 'method', 'POST'),
				m(a, 'class', 'fixed svelte-id9qzk'),
				m(s, 'class', 'email-container svelte-id9qzk');
		},
		m(t, o) {
			r(t, s, o),
				y(s, a),
				y(a, l),
				D(l, e[0]),
				y(a, i),
				y(a, n),
				D(n, e[1]),
				y(a, g),
				y(a, x),
				y(x, z),
				y(z, k),
				y(k, M),
				y(M, F),
				y(k, T),
				y(T, I),
				y(I, V),
				y(I, A),
				y(x, P),
				y(x, G),
				y(G, N),
				(U = !0),
				H ||
					((R = [
						b(l, 'input', e[25]),
						b(l, 'blur', e[26]),
						b(l, 'focus', e[27]),
						b(n, 'input', e[28]),
						b(z, 'click', e[29]),
						b(G, 'click', e[15]),
						b(a, 'submit', S(e[17]))
					]),
					(H = !0));
		},
		p(e, s) {
			(!U ||
				(68 & s[0] &&
					t !== (t = e[6] && !e[2] ? 'Please enter a valid Email address' : 'Your Email'))) &&
				m(l, 'placeholder', t),
				1 & s[0] && l.value !== e[0] && D(l, e[0]),
				68 & s[0] && w(l, 'invalid-email', e[6] && !e[2]),
				2 & s[0] && D(n, e[1]),
				(!U || 256 & s[0]) && C !== (C = e[8] ? 'Sending...' : 'Send Email') && j(N, C),
				(!U || 512 & s[0]) && (G.disabled = e[9]),
				8 & s[0] && w(G, 'disabled', !e[3]);
		},
		i(a) {
			U ||
				(q(() => {
					O || (O = B(s, e[11], {}, !0)), O.run(1);
				}),
				(U = !0));
		},
		o(a) {
			O || (O = B(s, e[11], {}, !1)), O.run(0), (U = !1);
		},
		d(e) {
			e && o(s), e && O && O.end(), (H = !1), $(R);
		}
	};
}
function ae(e) {
	let s,
		a,
		l,
		t,
		i,
		n,
		g,
		x,
		z,
		k,
		M,
		F,
		T,
		D,
		S,
		A,
		P,
		G,
		N,
		O,
		U,
		H,
		R,
		C,
		_,
		X,
		Y,
		L,
		J,
		W,
		Q = 'moritz' === e[4] ? 'Hi, nice to meet you!' : "Hey, I'm Theo!",
		Z = e[5] > 0 && te(e),
		K = e[5] > 1 && re(e);
	return {
		c() {
			(s = c('div')),
				(a = c('div')),
				(l = c('div')),
				(t = c('img')),
				(g = u()),
				(x = c('p')),
				(z = v(Q)),
				(k = u()),
				(M = c('div')),
				Z && Z.c(),
				(F = u()),
				(T = c('div')),
				K && K.c(),
				(D = u()),
				(S = c('div')),
				(A = c('button')),
				(P = f('svg')),
				(G = f('title')),
				(N = v('Group 2')),
				(O = f('g')),
				(U = f('g')),
				(H = f('line')),
				(R = f('line')),
				(C = u()),
				(_ = c('button')),
				(X = v('Compose Email')),
				this.h();
		},
		l(e) {
			s = h(e, 'DIV', { class: !0 });
			var r = d(s);
			a = h(r, 'DIV', { class: !0 });
			var i = d(a);
			l = h(i, 'DIV', { class: !0, style: !0 });
			var n = d(l);
			(t = h(n, 'IMG', { src: !0, alt: !0, class: !0, draggable: !0 })),
				(g = E(n)),
				(x = h(n, 'P', { style: !0, class: !0 }));
			var c = d(x);
			(z = p(c, Q)),
				c.forEach(o),
				n.forEach(o),
				(k = E(i)),
				(M = h(i, 'DIV', { class: !0, style: !0 }));
			var m = d(M);
			Z && Z.l(m), m.forEach(o), (F = E(i)), (T = h(i, 'DIV', { class: !0, style: !0 }));
			var v = d(T);
			K && K.l(v), v.forEach(o), (D = E(i)), (S = h(i, 'DIV', { class: !0 }));
			var u = d(S);
			A = h(u, 'BUTTON', { ontouchstart: !0, class: !0 });
			var f = d(A);
			P = h(f, 'svg', { version: !0, viewBox: !0, xmlns: !0, class: !0 }, 1);
			var y = d(P);
			G = h(y, 'title', {}, 1);
			var b = d(G);
			(N = p(b, 'Group 2')), b.forEach(o), (O = h(y, 'g', { fill: !0, 'fill-rule': !0 }, 1));
			var w = d(O);
			U = h(w, 'g', { transform: !0, stroke: !0 }, 1);
			var j = d(U);
			(H = h(j, 'line', { x2: !0, y2: !0, class: !0 }, 1)),
				d(H).forEach(o),
				(R = h(j, 'line', { transform: !0, x2: !0, y2: !0, class: !0 }, 1)),
				d(R).forEach(o),
				j.forEach(o),
				w.forEach(o),
				y.forEach(o),
				f.forEach(o),
				(C = E(u)),
				(_ = h(u, 'BUTTON', { class: !0, ontouchstart: !0 }));
			var I = d(_);
			(X = p(I, 'Compose Email')), I.forEach(o), u.forEach(o), i.forEach(o), r.forEach(o), this.h();
		},
		h() {
			t.src !== (i = 'moritz' === e[4] ? oe : ne) && m(t, 'src', i),
				m(
					t,
					'alt',
					(n =
						'moritz' === e[4]
							? 'Moritz Mortimer Müller as a Memoji'
							: 'Theodor Baltus Steiner as a Memoji')
				),
				m(t, 'class', 'message-img svelte-id9qzk'),
				m(t, 'draggable', 'false'),
				w(t, 'hidden', 0 != e[5]),
				V(x, 'height', '38px'),
				m(x, 'class', 'message-bubble svelte-id9qzk'),
				m(l, 'class', 'message svelte-id9qzk'),
				V(l, 'height', '54px'),
				m(M, 'class', 'message long-message svelte-id9qzk'),
				V(M, 'height', '95px'),
				m(T, 'class', 'message svelte-id9qzk'),
				V(T, 'height', '54px'),
				m(H, 'x2', '22'),
				m(H, 'y2', '22'),
				m(H, 'class', 'svelte-id9qzk'),
				m(R, 'transform', 'translate(11 11) scale(-1 1) translate(-11 -11)'),
				m(R, 'x2', '22'),
				m(R, 'y2', '22'),
				m(R, 'class', 'svelte-id9qzk'),
				m(U, 'transform', 'translate(1 1)'),
				m(U, 'stroke', '#fff'),
				m(O, 'fill', 'none'),
				m(O, 'fill-rule', 'evenodd'),
				m(P, 'version', '1.1'),
				m(P, 'viewBox', '0 0 24 24'),
				m(P, 'xmlns', 'http://www.w3.org/2000/svg'),
				m(P, 'class', 'svelte-id9qzk'),
				m(A, 'ontouchstart', ''),
				m(A, 'class', 'cancel-button svelte-id9qzk'),
				m(_, 'class', 'action-button svelte-id9qzk'),
				m(_, 'ontouchstart', ''),
				m(S, 'class', 'button-container svelte-id9qzk'),
				m(a, 'class', 'fixed svelte-id9qzk'),
				m(s, 'class', 'message-container svelte-id9qzk');
		},
		m(i, o) {
			r(i, s, o),
				y(s, a),
				y(a, l),
				y(l, t),
				y(l, g),
				y(l, x),
				y(x, z),
				y(a, k),
				y(a, M),
				Z && Z.m(M, null),
				y(a, F),
				y(a, T),
				K && K.m(T, null),
				y(a, D),
				y(a, S),
				y(S, A),
				y(A, P),
				y(P, G),
				y(G, N),
				y(P, O),
				y(O, U),
				y(U, H),
				y(U, R),
				y(S, C),
				y(S, _),
				y(_, X),
				(L = !0),
				J ||
					((W = [
						b(t, 'click', e[20]),
						I(e[13].call(null, x)),
						b(A, 'click', e[23]),
						b(_, 'click', e[24])
					]),
					(J = !0));
		},
		p(e, s) {
			(!L || (16 & s[0] && t.src !== (i = 'moritz' === e[4] ? oe : ne))) && m(t, 'src', i),
				(!L ||
					(16 & s[0] &&
						n !==
							(n =
								'moritz' === e[4]
									? 'Moritz Mortimer Müller as a Memoji'
									: 'Theodor Baltus Steiner as a Memoji'))) &&
					m(t, 'alt', n),
				32 & s[0] && w(t, 'hidden', 0 != e[5]),
				(!L || 16 & s[0]) &&
					Q !== (Q = 'moritz' === e[4] ? 'Hi, nice to meet you!' : "Hey, I'm Theo!") &&
					j(z, Q),
				e[5] > 0 ? (Z ? Z.p(e, s) : ((Z = te(e)), Z.c(), Z.m(M, null))) : Z && (Z.d(1), (Z = null)),
				e[5] > 1 ? (K ? K.p(e, s) : ((K = re(e)), K.c(), K.m(T, null))) : K && (K.d(1), (K = null));
		},
		i(a) {
			L ||
				(q(() => {
					Y || (Y = B(s, e[11], {}, !0)), Y.run(1);
				}),
				(L = !0));
		},
		o(a) {
			Y || (Y = B(s, e[11], {}, !1)), Y.run(0), (L = !1);
		},
		d(e) {
			e && o(s), Z && Z.d(), K && K.d(), e && Y && Y.end(), (J = !1), $(W);
		}
	};
}
function le(e) {
	let s, a, l, t, n, g, f, w, j, x, z, k, M, F, T, I, D, S, V, A, P, G, N, O, U, H, R, C;
	return {
		c() {
			(s = c('div')),
				(a = c('div')),
				(l = c('h1')),
				(t = v('GET IN ')),
				(n = c('br')),
				(g = v('TOUCH')),
				(f = u()),
				(w = c('hr')),
				(j = u()),
				(x = c('button')),
				(z = c('img')),
				(M = u()),
				(F = c('p')),
				(T = v('Moritz Mortimer (DE)')),
				(I = u()),
				(D = c('hr')),
				(S = u()),
				(V = c('button')),
				(A = c('img')),
				(G = u()),
				(N = c('p')),
				(O = v('Theodor Baltus (JP)')),
				this.h();
		},
		l(e) {
			s = h(e, 'DIV', { class: !0 });
			var r = d(s);
			a = h(r, 'DIV', { class: !0 });
			var i = d(a);
			l = h(i, 'H1', { class: !0 });
			var c = d(l);
			(t = p(c, 'GET IN ')),
				(n = h(c, 'BR', {})),
				(g = p(c, 'TOUCH')),
				c.forEach(o),
				(f = E(i)),
				(w = h(i, 'HR', {})),
				(j = E(i)),
				(x = h(i, 'BUTTON', { class: !0 }));
			var m = d(x);
			(z = h(m, 'IMG', { src: !0, alt: !0, draggable: !0, class: !0 })),
				(M = E(m)),
				(F = h(m, 'P', { class: !0 }));
			var v = d(F);
			(T = p(v, 'Moritz Mortimer (DE)')),
				v.forEach(o),
				m.forEach(o),
				(I = E(i)),
				(D = h(i, 'HR', {})),
				(S = E(i)),
				(V = h(i, 'BUTTON', { class: !0 }));
			var u = d(V);
			(A = h(u, 'IMG', { src: !0, alt: !0, draggable: !0, class: !0 })),
				(G = E(u)),
				(N = h(u, 'P', { class: !0 }));
			var y = d(N);
			(O = p(y, 'Theodor Baltus (JP)')),
				y.forEach(o),
				u.forEach(o),
				i.forEach(o),
				r.forEach(o),
				this.h();
		},
		h() {
			m(l, 'class', 'svelte-id9qzk'),
				z.src !== (k = oe) && m(z, 'src', k),
				m(z, 'alt', 'Moritz Mortimer Müller as a Memoji'),
				m(z, 'draggable', 'false'),
				m(z, 'class', 'svelte-id9qzk'),
				m(F, 'class', 'svelte-id9qzk'),
				m(x, 'class', 'contact svelte-id9qzk'),
				A.src !== (P = ne) && m(A, 'src', P),
				m(A, 'alt', 'Theodor Baltus Steiner as a Memoji'),
				m(A, 'draggable', 'false'),
				m(A, 'class', 'svelte-id9qzk'),
				m(N, 'class', 'svelte-id9qzk'),
				m(V, 'class', 'contact svelte-id9qzk'),
				m(a, 'class', 'fixed svelte-id9qzk'),
				m(s, 'class', 'contact-container svelte-id9qzk');
		},
		m(i, o) {
			r(i, s, o),
				y(s, a),
				y(a, l),
				y(l, t),
				y(l, n),
				y(l, g),
				y(a, f),
				y(a, w),
				y(a, j),
				y(a, x),
				y(x, z),
				y(x, M),
				y(x, F),
				y(F, T),
				y(a, I),
				y(a, D),
				y(a, S),
				y(a, V),
				y(V, A),
				y(V, G),
				y(V, N),
				y(N, O),
				(H = !0),
				R || ((C = [b(x, 'click', e[18]), b(V, 'click', e[19])]), (R = !0));
		},
		p: i,
		i(a) {
			H ||
				(q(() => {
					U || (U = B(s, e[11], {}, !0)), U.run(1);
				}),
				(H = !0));
		},
		o(a) {
			U || (U = B(s, e[11], {}, !1)), U.run(0), (H = !1);
		},
		d(e) {
			e && o(s), e && U && U.end(), (R = !1), $(C);
		}
	};
}
function te(e) {
	let s,
		a,
		l,
		t,
		i,
		n,
		g,
		f,
		x =
			'moritz' === e[4]
				? 'You can send me a message right from this window or shoot me an email the old fashioned way at moritz@mortimerbaltus.de'
				: 'If you wanna talk tech, ask me anything or just need someone to share memes with... hit me up at theo@mortimerbaltus.de';
	return {
		c() {
			(s = c('img')), (t = u()), (i = c('p')), (n = v(x)), this.h();
		},
		l(e) {
			(s = h(e, 'IMG', { src: !0, alt: !0, class: !0, draggable: !0 })),
				(t = E(e)),
				(i = h(e, 'P', { style: !0, class: !0 }));
			var a = d(i);
			(n = p(a, x)), a.forEach(o), this.h();
		},
		h() {
			s.src !== (a = 'moritz' === e[4] ? oe : ne) && m(s, 'src', a),
				m(
					s,
					'alt',
					(l =
						'moritz' === e[4]
							? 'Moritz Mortimer Müller as a Memoji'
							: 'Theodor Baltus Steiner as a Memoji')
				),
				m(s, 'class', 'message-img svelte-id9qzk'),
				m(s, 'draggable', 'false'),
				w(s, 'hidden', 1 != e[5]),
				V(i, 'height', '95px'),
				m(i, 'class', 'message-bubble svelte-id9qzk');
		},
		m(a, l) {
			r(a, s, l),
				r(a, t, l),
				r(a, i, l),
				y(i, n),
				g || ((f = [b(s, 'click', e[21]), I(e[13].call(null, i))]), (g = !0));
		},
		p(e, t) {
			16 & t[0] && s.src !== (a = 'moritz' === e[4] ? oe : ne) && m(s, 'src', a),
				16 & t[0] &&
					l !==
						(l =
							'moritz' === e[4]
								? 'Moritz Mortimer Müller as a Memoji'
								: 'Theodor Baltus Steiner as a Memoji') &&
					m(s, 'alt', l),
				32 & t[0] && w(s, 'hidden', 1 != e[5]),
				16 & t[0] &&
					x !==
						(x =
							'moritz' === e[4]
								? 'You can send me a message right from this window or shoot me an email the old fashioned way at moritz@mortimerbaltus.de'
								: 'If you wanna talk tech, ask me anything or just need someone to share memes with... hit me up at theo@mortimerbaltus.de') &&
					j(n, x);
		},
		d(e) {
			e && o(s), e && o(t), e && o(i), (g = !1), $(f);
		}
	};
}
function re(e) {
	let s,
		a,
		l,
		t,
		i,
		n,
		g,
		f,
		w = 'moritz' === e[4] ? "I can't wait to hear from you!" : "I'm excited to hear from you!";
	return {
		c() {
			(s = c('img')), (t = u()), (i = c('p')), (n = v(w)), this.h();
		},
		l(e) {
			(s = h(e, 'IMG', { src: !0, alt: !0, class: !0, draggable: !0 })),
				(t = E(e)),
				(i = h(e, 'P', { style: !0, class: !0 }));
			var a = d(i);
			(n = p(a, w)), a.forEach(o), this.h();
		},
		h() {
			s.src !== (a = 'moritz' === e[4] ? oe : ne) && m(s, 'src', a),
				m(
					s,
					'alt',
					(l =
						'moritz' === e[4]
							? 'Moritz Mortimer Müller as a Memoji'
							: 'Theodor Baltus Steiner as a Memoji')
				),
				m(s, 'class', 'message-img svelte-id9qzk'),
				m(s, 'draggable', 'false'),
				V(i, 'height', '38px'),
				m(i, 'class', 'message-bubble svelte-id9qzk');
		},
		m(a, l) {
			r(a, s, l), r(a, t, l), r(a, i, l), y(i, n), g || ((f = b(s, 'click', e[22])), (g = !0));
		},
		p(e, t) {
			16 & t[0] && s.src !== (a = 'moritz' === e[4] ? oe : ne) && m(s, 'src', a),
				16 & t[0] &&
					l !==
						(l =
							'moritz' === e[4]
								? 'Moritz Mortimer Müller as a Memoji'
								: 'Theodor Baltus Steiner as a Memoji') &&
					m(s, 'alt', l),
				16 & t[0] &&
					w !==
						(w =
							'moritz' === e[4]
								? "I can't wait to hear from you!"
								: "I'm excited to hear from you!") &&
					j(n, w);
		},
		d(e) {
			e && o(s), e && o(t), e && o(i), (g = !1), f();
		}
	};
}
function ie(e) {
	let s, a, l, t, i;
	const n = [le, ae, se, ee],
		g = [];
	function v(e, s) {
		return 'overview' === e[4]
			? 0
			: 'theo' === e[4] || 'moritz' === e[4]
			? 1
			: (16 & s[0] && (a = !!e[4].includes('mailto:')), a ? 2 : 3);
	}
	return (
		(l = v(e, [-1])),
		(t = g[l] = n[l](e)),
		{
			c() {
				(s = c('div')), t.c(), this.h();
			},
			l(e) {
				s = h(e, 'DIV', { class: !0 });
				var a = d(s);
				t.l(a), a.forEach(o), this.h();
			},
			h() {
				m(s, 'class', 'container svelte-id9qzk'), w(s, 'inverse-slide', 'overview' === e[4]);
			},
			m(e, a) {
				r(e, s, a), g[l].m(s, null), (i = !0);
			},
			p(e, a) {
				let r = l;
				(l = v(e, a)),
					l === r
						? g[l].p(e, a)
						: (x(),
						  z(g[r], 1, 1, () => {
								g[r] = null;
						  }),
						  k(),
						  (t = g[l]),
						  t ? t.p(e, a) : ((t = g[l] = n[l](e)), t.c()),
						  M(t, 1),
						  t.m(s, null)),
					16 & a[0] && w(s, 'inverse-slide', 'overview' === e[4]);
			},
			i(e) {
				i || (M(t), (i = !0));
			},
			o(e) {
				z(t), (i = !1);
			},
			d(e) {
				e && o(s), g[l].d();
			}
		}
	);
}
const oe = '/Images/moritzmemoji.jpg',
	ne = '/Images/theomemoji.png';
function ce(e) {
	return 0 === e.trim().length;
}
function he(e, s, a) {
	let l,
		t,
		r,
		i,
		o,
		n = 'overview',
		c = 0,
		h = '',
		d = '',
		m = !1,
		g = !1,
		v = !1;
	function u() {
		a(0, (h = '')), a(1, (d = '')), a(6, (m = !1));
	}
	function f() {
		clearTimeout(o), a(4, (n = 'moritz' === n || 'theo' === n ? 'overview' : n)), a(5, (c = 0));
	}
	return (
		(e.$$.update = () => {
			var s;
			1 & e.$$.dirty[0] &&
				a(
					2,
					((s = h),
					(l =
						new RegExp(
							"[a-z0-9!#$%&' * +/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
						).test(s) && !ce(h)))
				),
				2 & e.$$.dirty[0] && a(16, (t = !ce(d))),
				65540 & e.$$.dirty[0] && a(3, (r = l && t)),
				8 & e.$$.dirty[0] && a(9, (i = !r));
		}),
		[
			h,
			d,
			l,
			r,
			n,
			c,
			m,
			g,
			v,
			i,
			u,
			function (e, { delay: s = 0, duration: a = 400, easing: l = F, inverse: t = 1 }) {
				const r = getComputedStyle(e),
					i = +r.opacity,
					o = parseFloat(r.width),
					n = parseFloat(r.paddingLeft),
					c = parseFloat(r.paddingRight),
					h = parseFloat(r.marginLeft),
					d = parseFloat(r.marginRight),
					m = parseFloat(r.borderLeftWidth),
					g = parseFloat(r.borderRightWidth);
				return {
					delay: s,
					duration: a,
					easing: l,
					css: (e) =>
						`overflow: hidden;opacity: ${Math.min(20 * e, 1) * i};width: ${e * o}px;padding-left: ${
							e * n
						}px;padding-right: ${e * c}px;margin-left: ${e * h}px;margin-right: ${
							e * d
						}px;border-left-width: ${e * m}px;border-right-width: ${e * g}px;`
				};
			},
			function () {
				setTimeout(() => {
					a(4, (n = 'overview'));
				}, 5e3);
			},
			function () {
				clearTimeout(o),
					(o = setTimeout(() => {
						a(5, c++, c);
					}, 1500));
			},
			f,
			function () {
				a(8, (v = !0)),
					fetch('https://mail-handler.theosteiner.workers.dev', {
						method: 'POST',
						body: JSON.stringify({ userEmail: h, recipient: n.substring(7), message: d }),
						headers: { 'Content-Type': 'application/json' }
					})
						.then((e) => {
							if (!e.ok) throw new Error('Failed to send email');
							a(7, (g = !0)), a(8, (v = !1)), u(), a(4, (n = n.substring(7)));
						})
						.catch((e) => {
							console.log(e), a(7, (g = !1)), a(8, (v = !1)), a(4, (n = n.substring(7)));
						});
			},
			t,
			function (s) {
				T(e, s);
			},
			() => {
				a(4, (n = 'moritz'));
			},
			() => {
				a(4, (n = 'theo'));
			},
			() => {
				f();
			},
			() => {
				f();
			},
			() => {
				f();
			},
			() => {
				f();
			},
			() => {
				a(
					4,
					(n =
						'mailto:' + ('moritz' === n ? 'moritz@mortimerbaltus.com' : 'theo@mortimerbaltus.com'))
				),
					f();
			},
			function () {
				(h = this.value), a(0, h);
			},
			() => a(6, (m = !0)),
			() => a(6, (m = !1)),
			function () {
				(d = this.value), a(1, d);
			},
			() => {
				(ce(h) || ce(d) || confirm('Do you really want to discard your Message?')) &&
					(a(4, (n = 'overview')), u());
			},
			() => {
				a(4, (n = 'overview'));
			}
		]
	);
}
class de extends s {
	constructor(e) {
		super(), a(this, e, he, ie, l, {}, [-1, -1]);
	}
}
function me(e) {
	let s, a, l;
	const t = e[2].default,
		i = A(t, e, e[1], null);
	return {
		c() {
			(s = c('div')), i && i.c();
		},
		l(e) {
			s = h(e, 'DIV', {});
			var a = d(s);
			i && i.l(a), a.forEach(o);
		},
		m(e, a) {
			r(e, s, a), i && i.m(s, null), (l = !0);
		},
		p(e, [s]) {
			i && i.p && (!l || 2 & s) && P(i, t, e, e[1], s, null, null);
		},
		i(e) {
			l ||
				(M(i, e),
				q(() => {
					a || (a = B(s, G, {}, !0)), a.run(1);
				}),
				(l = !0));
		},
		o(e) {
			z(i, e), a || (a = B(s, G, {}, !1)), a.run(0), (l = !1);
		},
		d(e) {
			e && o(s), i && i.d(e), e && a && a.end();
		}
	};
}
function ge(e, s, a) {
	let { $$slots: l = {}, $$scope: t } = s,
		{ reverse: r = null } = s;
	return (
		N(() => {
			r
				? ((document.body.style.display = 'flex'),
				  (document.body.style.flexDirection = 'column-reverse'))
				: ((document.body.style.display = 'flex'), (document.body.style.flexDirection = 'column'));
		}),
		(e.$$set = (e) => {
			'reverse' in e && a(0, (r = e.reverse)), '$$scope' in e && a(1, (t = e.$$scope));
		}),
		[r, t, l]
	);
}
class ve extends s {
	constructor(e) {
		super(), a(this, e, ge, me, l, { reverse: 0 });
	}
}
export { W as B, de as C, K as L, ve as P, H as n, U as p };
