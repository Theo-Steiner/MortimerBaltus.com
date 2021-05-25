import {
	S as t,
	i as e,
	s as a,
	e as n,
	j as s,
	k as l,
	t as r,
	c,
	a as o,
	m as i,
	n as h,
	g as f,
	d as $,
	b as u,
	f as d,
	o as g,
	F as p,
	h as m,
	v,
	r as E,
	w,
	D as V,
	P as M,
	E as T,
	$ as z,
	G as A,
	W as x,
	I as C,
	B as F,
	u as I,
	J as P,
	Q as H,
	R as b,
	T as k,
	M as N,
	z as L
} from '../../chunks/vendor-783391f4.js';
/* empty css                       */ import {
	B as O,
	C as y,
	L as G,
	P as U,
	p as R
} from '../../chunks/PageTransition-919305e0.js';
function B(t) {
	let e, a, V, M, T, z, A, x;
	return (
		(a = new O({ props: { buttonType: 'previous', href: '/' } })),
		(A = new O({ props: { buttonType: 'next' } })),
		{
			c() {
				(e = n('nav')),
					s(a.$$.fragment),
					(V = l()),
					(M = n('h1')),
					(T = r(t[0])),
					(z = l()),
					s(A.$$.fragment),
					this.h();
			},
			l(n) {
				e = c(n, 'NAV', { class: !0 });
				var s = o(e);
				i(a.$$.fragment, s), (V = h(s)), (M = c(s, 'H1', { class: !0 }));
				var l = o(M);
				(T = f(l, t[0])), l.forEach($), (z = h(s)), i(A.$$.fragment, s), s.forEach($), this.h();
			},
			h() {
				u(M, 'class', 'svelte-zcgqg1'), u(e, 'class', 'svelte-zcgqg1');
			},
			m(t, n) {
				d(t, e, n), g(a, e, null), p(e, V), p(e, M), p(M, T), p(e, z), g(A, e, null), (x = !0);
			},
			p(t, [e]) {
				(!x || 1 & e) && m(T, t[0]);
			},
			i(t) {
				x || (v(a.$$.fragment, t), v(A.$$.fragment, t), (x = !0));
			},
			o(t) {
				E(a.$$.fragment, t), E(A.$$.fragment, t), (x = !1);
			},
			d(t) {
				t && $(e), w(a), w(A);
			}
		}
	);
}
function D(t, e, a) {
	let { title: n = 'TITLE' } = e;
	return (
		(t.$$set = (t) => {
			'title' in t && a(0, (n = t.title));
		}),
		[n]
	);
}
class S extends t {
	constructor(t) {
		super(), e(this, t, D, B, a, { title: 0 });
	}
}
function Y(t) {
	let e, a;
	return {
		c() {
			(e = n('h1')), (a = r('Title')), this.h();
		},
		l(t) {
			e = c(t, 'H1', { class: !0 });
			var n = o(e);
			(a = f(n, 'Title')), n.forEach($), this.h();
		},
		h() {
			u(e, 'class', 'svelte-1oofa73');
		},
		m(t, n) {
			d(t, e, n), p(e, a);
		},
		p: A,
		d(t) {
			t && $(e);
		}
	};
}
function j(t) {
	let e, a;
	return {
		c() {
			(e = n('h1')), (a = r(t[3])), this.h();
		},
		l(n) {
			e = c(n, 'H1', { class: !0 });
			var s = o(e);
			(a = f(s, t[3])), s.forEach($), this.h();
		},
		h() {
			u(e, 'class', 'svelte-1oofa73');
		},
		m(t, n) {
			d(t, e, n), p(e, a);
		},
		p(t, e) {
			8 & e && m(a, t[3]);
		},
		d(t) {
			t && $(e);
		}
	};
}
function q(t) {
	let e, a, m, z, A, x, C, F, I;
	function P(t, e) {
		return t[3] ? j : Y;
	}
	(m = new O({ props: { buttonType: 'minimize' } })), m.$on('toggleMinimize', t[6]);
	let H = P(t),
		b = H(t);
	x = new O({ props: { buttonType: 'hidden' } });
	const k = t[5].default,
		N = V(k, t, t[4], null),
		L =
			N ||
			(function (t) {
				let e, a;
				return {
					c() {
						(e = n('p')), (a = r('Content goes here'));
					},
					l(t) {
						e = c(t, 'P', {});
						var n = o(e);
						(a = f(n, 'Content goes here')), n.forEach($);
					},
					m(t, n) {
						d(t, e, n), p(e, a);
					},
					d(t) {
						t && $(e);
					}
				};
			})();
	return {
		c() {
			(e = n('section')),
				(a = n('header')),
				s(m.$$.fragment),
				(z = l()),
				b.c(),
				(A = l()),
				s(x.$$.fragment),
				(C = l()),
				(F = n('div')),
				L && L.c(),
				this.h();
		},
		l(t) {
			e = c(t, 'SECTION', { style: !0, class: !0 });
			var n = o(e);
			a = c(n, 'HEADER', { class: !0 });
			var s = o(a);
			i(m.$$.fragment, s),
				(z = h(s)),
				b.l(s),
				(A = h(s)),
				i(x.$$.fragment, s),
				s.forEach($),
				(C = h(n)),
				(F = c(n, 'DIV', { class: !0, style: !0 }));
			var l = o(F);
			L && L.l(l), l.forEach($), n.forEach($), this.h();
		},
		h() {
			u(a, 'class', 'svelte-1oofa73'),
				u(F, 'class', 'content-wrapper svelte-1oofa73'),
				M(F, 'background', t[2]),
				M(F, 'background-size', 'cover'),
				M(e, 'width', t[1] + 'px'),
				M(e, 'height', t[0] + 'px'),
				u(e, 'class', 'svelte-1oofa73');
		},
		m(t, n) {
			d(t, e, n),
				p(e, a),
				g(m, a, null),
				p(a, z),
				b.m(a, null),
				p(a, A),
				g(x, a, null),
				p(e, C),
				p(e, F),
				L && L.m(F, null),
				(I = !0);
		},
		p(t, [n]) {
			H === (H = P(t)) && b ? b.p(t, n) : (b.d(1), (b = H(t)), b && (b.c(), b.m(a, A))),
				N && N.p && (!I || 16 & n) && T(N, k, t, t[4], n, null, null),
				(!I || 4 & n) && M(F, 'background', t[2]),
				(!I || 2 & n) && M(e, 'width', t[1] + 'px'),
				(!I || 1 & n) && M(e, 'height', t[0] + 'px');
		},
		i(t) {
			I || (v(m.$$.fragment, t), v(x.$$.fragment, t), v(L, t), (I = !0));
		},
		o(t) {
			E(m.$$.fragment, t), E(x.$$.fragment, t), E(L, t), (I = !1);
		},
		d(t) {
			t && $(e), w(m), b.d(), w(x), L && L.d(t);
		}
	};
}
function J(t, e, a) {
	let { $$slots: n = {}, $$scope: s } = e,
		{ height: l } = e,
		{ width: r } = e,
		{ background: c = '' } = e,
		{ title: o } = e;
	return (
		(t.$$set = (t) => {
			'height' in t && a(0, (l = t.height)),
				'width' in t && a(1, (r = t.width)),
				'background' in t && a(2, (c = t.background)),
				'title' in t && a(3, (o = t.title)),
				'$$scope' in t && a(4, (s = t.$$scope));
		}),
		[
			l,
			r,
			c,
			o,
			s,
			n,
			function (e) {
				z(t, e);
			}
		]
	);
}
class Q extends t {
	constructor(t) {
		super(), e(this, t, J, q, a, { height: 0, width: 1, background: 2, title: 3 });
	}
}
function W(t) {
	let e, a;
	return (
		(e = new y({})),
		{
			c() {
				s(e.$$.fragment);
			},
			l(t) {
				i(e.$$.fragment, t);
			},
			m(t, n) {
				g(e, t, n), (a = !0);
			},
			i(t) {
				a || (v(e.$$.fragment, t), (a = !0));
			},
			o(t) {
				E(e.$$.fragment, t), (a = !1);
			},
			d(t) {
				w(e, t);
			}
		}
	);
}
function Z(t) {
	let e, a;
	return (
		(e = new Q({
			props: {
				width: 378,
				height: 313,
				background: '#EFEFEF',
				title: 'CONTACT',
				$$slots: { default: [W] },
				$$scope: { ctx: t }
			}
		})),
		e.$on('toggleMinimize', t[0]),
		{
			c() {
				s(e.$$.fragment);
			},
			l(t) {
				i(e.$$.fragment, t);
			},
			m(t, n) {
				g(e, t, n), (a = !0);
			},
			p(t, [a]) {
				const n = {};
				2 & a && (n.$$scope = { dirty: a, ctx: t }), e.$set(n);
			},
			i(t) {
				a || (v(e.$$.fragment, t), (a = !0));
			},
			o(t) {
				E(e.$$.fragment, t), (a = !1);
			},
			d(t) {
				w(e, t);
			}
		}
	);
}
function K(t) {
	return [
		function (e) {
			z(t, e);
		}
	];
}
class X extends t {
	constructor(t) {
		super(), e(this, t, K, Z, a, {});
	}
}
function _(t) {
	let e, a;
	return (
		(e = new G({})),
		{
			c() {
				s(e.$$.fragment);
			},
			l(t) {
				i(e.$$.fragment, t);
			},
			m(t, n) {
				g(e, t, n), (a = !0);
			},
			i(t) {
				a || (v(e.$$.fragment, t), (a = !0));
			},
			o(t) {
				E(e.$$.fragment, t), (a = !1);
			},
			d(t) {
				w(e, t);
			}
		}
	);
}
function tt(t) {
	let e, a;
	return (
		(e = new Q({
			props: {
				width: 266,
				height: 273,
				background: 'C96161',
				title: 'LANGUAGE',
				$$slots: { default: [_] },
				$$scope: { ctx: t }
			}
		})),
		e.$on('toggleMinimize', t[0]),
		{
			c() {
				s(e.$$.fragment);
			},
			l(t) {
				i(e.$$.fragment, t);
			},
			m(t, n) {
				g(e, t, n), (a = !0);
			},
			p(t, [a]) {
				const n = {};
				2 & a && (n.$$scope = { dirty: a, ctx: t }), e.$set(n);
			},
			i(t) {
				a || (v(e.$$.fragment, t), (a = !0));
			},
			o(t) {
				E(e.$$.fragment, t), (a = !1);
			},
			d(t) {
				w(e, t);
			}
		}
	);
}
function et(t) {
	return [
		function (e) {
			z(t, e);
		}
	];
}
class at extends t {
	constructor(t) {
		super(), e(this, t, et, tt, a, {});
	}
}
function nt(t) {
	let e, a, l, r;
	return (
		(a = new at({})),
		a.$on('toggleMinimize', t[2]),
		{
			c() {
				(e = n('div')), s(a.$$.fragment), this.h();
			},
			l(t) {
				e = c(t, 'DIV', { style: !0, class: !0 });
				var n = o(e);
				i(a.$$.fragment, n), n.forEach($), this.h();
			},
			h() {
				M(e, 'transform', 'translateZ(0px) scale(1)'), u(e, 'class', 'overlay svelte-85n0t0');
			},
			m(t, n) {
				d(t, e, n), g(a, e, null), (r = !0);
			},
			p: A,
			i(t) {
				r ||
					(v(a.$$.fragment, t),
					H(() => {
						l || (l = b(e, k, {}, !0)), l.run(1);
					}),
					(r = !0));
			},
			o(t) {
				E(a.$$.fragment, t), l || (l = b(e, k, {}, !1)), l.run(0), (r = !1);
			},
			d(t) {
				t && $(e), w(a), t && l && l.end();
			}
		}
	);
}
function st(t) {
	let e, a, l, r;
	return (
		(a = new X({})),
		a.$on('toggleMinimize', t[1]),
		{
			c() {
				(e = n('div')), s(a.$$.fragment), this.h();
			},
			l(t) {
				e = c(t, 'DIV', { class: !0 });
				var n = o(e);
				i(a.$$.fragment, n), n.forEach($), this.h();
			},
			h() {
				u(e, 'class', 'overlay svelte-85n0t0');
			},
			m(t, n) {
				d(t, e, n), g(a, e, null), (r = !0);
			},
			p: A,
			i(t) {
				r ||
					(v(a.$$.fragment, t),
					H(() => {
						l || (l = b(e, k, {}, !0)), l.run(1);
					}),
					(r = !0));
			},
			o(t) {
				E(a.$$.fragment, t), l || (l = b(e, k, {}, !1)), l.run(0), (r = !1);
			},
			d(t) {
				t && $(e), w(a), t && l && l.end();
			}
		}
	);
}
function lt(t) {
	let e,
		a,
		s,
		i,
		g,
		m,
		w,
		V,
		M,
		T,
		z,
		A,
		H,
		b,
		k,
		N,
		L,
		O,
		y,
		G,
		U,
		R,
		B,
		D,
		S,
		Y,
		j,
		q,
		J,
		Q,
		W,
		Z,
		K,
		X,
		_,
		tt,
		et,
		at,
		lt,
		rt,
		ct;
	const ot = [st, nt],
		it = [];
	function ht(t, e) {
		return 'contact' === t[0] ? 0 : 'language' === t[0] ? 1 : -1;
	}
	return (
		~(a = ht(t)) && (s = it[a] = ot[a](t)),
		{
			c() {
				(e = n('footer')),
					s && s.c(),
					(i = l()),
					(g = n('nav')),
					(m = n('button')),
					(w = r('GET IN TOUCH')),
					(V = l()),
					(M = n('button')),
					(T = r('LANGUAGE')),
					(z = l()),
					(A = n('a')),
					(H = r('INSTAGRAM')),
					(b = l()),
					(k = n('a')),
					(N = r('PRIVACY POLICY')),
					(L = l()),
					(O = n('a')),
					(y = r('LEGAL NOTICE')),
					(G = l()),
					(U = n('a')),
					(R = r('SITEMAP')),
					(B = l()),
					(D = x('svg')),
					(S = x('g')),
					(Y = x('path')),
					(j = x('g')),
					(q = x('path')),
					(J = x('path')),
					(Q = x('path')),
					(W = x('path')),
					(Z = x('path')),
					(K = x('g')),
					(X = x('path')),
					(_ = x('path')),
					(tt = x('path')),
					(et = x('path')),
					(at = x('path')),
					this.h();
			},
			l(t) {
				e = c(t, 'FOOTER', { class: !0 });
				var a = o(e);
				s && s.l(a), (i = h(a)), (g = c(a, 'NAV', { class: !0 }));
				var n = o(g);
				m = c(n, 'BUTTON', { class: !0 });
				var l = o(m);
				(w = f(l, 'GET IN TOUCH')), l.forEach($), (V = h(n)), (M = c(n, 'BUTTON', { class: !0 }));
				var r = o(M);
				(T = f(r, 'LANGUAGE')), r.forEach($), (z = h(n)), (A = c(n, 'A', { href: !0, class: !0 }));
				var u = o(A);
				(H = f(u, 'INSTAGRAM')), u.forEach($), (b = h(n)), (k = c(n, 'A', { href: !0, class: !0 }));
				var d = o(k);
				(N = f(d, 'PRIVACY POLICY')),
					d.forEach($),
					(L = h(n)),
					(O = c(n, 'A', { href: !0, class: !0 }));
				var p = o(O);
				(y = f(p, 'LEGAL NOTICE')),
					p.forEach($),
					(G = h(n)),
					(U = c(n, 'A', { href: !0, class: !0 }));
				var v = o(U);
				(R = f(v, 'SITEMAP')),
					v.forEach($),
					n.forEach($),
					(B = h(a)),
					(D = c(a, 'svg', { width: !0, height: !0, viewBox: !0, xmlns: !0, class: !0 }, 1));
				var E = o(D);
				S = c(E, 'g', { id: !0, stroke: !0, 'stroke-width': !0, fill: !0, 'fill-rule': !0 }, 1);
				var x = o(S);
				(Y = c(x, 'path', { fill: !0, d: !0 }, 1)), o(Y).forEach($), (j = c(x, 'g', {}, 1));
				var C = o(j);
				(q = c(C, 'path', { id: !0, fill: !0, d: !0 }, 1)),
					o(q).forEach($),
					(J = c(C, 'path', { d: !0, id: !0, fill: !0 }, 1)),
					o(J).forEach($),
					(Q = c(C, 'path', { d: !0, id: !0, fill: !0 }, 1)),
					o(Q).forEach($),
					(W = c(C, 'path', { d: !0, id: !0, fill: !0 }, 1)),
					o(W).forEach($),
					(Z = c(C, 'path', { d: !0, id: !0, fill: !0 }, 1)),
					o(Z).forEach($),
					C.forEach($),
					(K = c(x, 'g', { transform: !0 }, 1));
				var F = o(K);
				(X = c(F, 'path', { d: !0, id: !0, fill: !0 }, 1)),
					o(X).forEach($),
					(_ = c(F, 'path', { d: !0, id: !0, fill: !0 }, 1)),
					o(_).forEach($),
					(tt = c(F, 'path', { d: !0, id: !0, fill: !0 }, 1)),
					o(tt).forEach($),
					(et = c(F, 'path', { d: !0, id: !0, fill: !0 }, 1)),
					o(et).forEach($),
					(at = c(F, 'path', { id: !0, fill: !0, d: !0 }, 1)),
					o(at).forEach($),
					F.forEach($),
					x.forEach($),
					E.forEach($),
					a.forEach($),
					this.h();
			},
			h() {
				u(m, 'class', 'svelte-85n0t0'),
					u(M, 'class', 'svelte-85n0t0'),
					u(A, 'href', '/'),
					u(A, 'class', 'svelte-85n0t0'),
					u(k, 'href', '/'),
					u(k, 'class', 'svelte-85n0t0'),
					u(O, 'href', '/'),
					u(O, 'class', 'svelte-85n0t0'),
					u(U, 'href', '/'),
					u(U, 'class', 'svelte-85n0t0'),
					u(g, 'class', 'svelte-85n0t0'),
					u(Y, 'fill', 'none'),
					u(Y, 'd', 'M0 0h768v300H0z'),
					u(q, 'id', 'Path'),
					u(q, 'fill', '#FEFEFE'),
					u(
						q,
						'd',
						'M47.85 48.545V4.23L33.63333 48.545H21.845L7.62833 4.23v44.315H0V0h14.21667L27.74 42.65 41.26333 0H55.48v48.545h-7.62833zM61.02167 32.11c0-9.91667 7.14333-17.13167 16.92166-17.13167C88 14.97833 94.865 22.33 94.865 32.11c0 9.91667-7.14333 17.12833-16.92167 17.12833-9.985 0-16.92166-7.42-16.92166-17.12833z'
					),
					u(
						J,
						'd',
						'M87.58333 32.11c0-5.75667-3.53666-10.54333-9.64-10.54333-6.03333 0-9.63833 4.78666-9.63833 10.54333 0 5.68667 3.675 10.54 9.63833 10.54 6.03334 0 9.64-4.785 9.64-10.54z'
					),
					u(J, 'id', 'Path'),
					u(J, 'fill', '#151515'),
					u(
						Q,
						'd',
						'M117.08833 15.67167H125.13V5.2h7.28333v10.47167h9.70834v6.24166h-9.70834V48.545H125.13V21.91333h-9.66333c-5.005 0-8.02 2.24334-8.02 5.48V48.545h-7.28V15.67167H107.45V21.15c1.31667-3.605 5.005-5.47833 9.64-5.47833M145.93167 2.08h7.975v7.975h-7.975zM153.56 15.67167V48.545h-7.28333V15.67167zM168.675 15.67167v4.64666c1.73333-3.745 4.64667-5.34 8.67-5.34 4.50833 0 7.49 2.56667 8.66667 6.86667 1.52666-4.23167 4.78666-6.86667 9.36333-6.86667 6.935 0 10.05667 4.855 10.05667 11.375V48.545h-7.28334V27.94833c0-3.53833-1.73333-6.45-5.54666-6.45-3.745 0-5.55 2.98334-5.55 6.45V48.545h-7.28V27.94833c0-3.53833-1.73334-6.45-5.55-6.45-4.16 0-5.54667 3.53667-5.54667 7.14334V48.545h-7.28167V15.67167h7.28334-.00167zM236.21667 36.06333l6.24166 2.42667c-2.42833 7.07333-7.7 10.74833-15.18833 10.74833-10.54167 0-17.06167-7.21166-17.06167-17.33666 0-9.57167 6.38-16.92334 16.02167-16.92334 8.94667 0 14.84167 5.68667 14.84167 14.49667 0 1.31667-.14 2.565-.34667 3.81333h-23.23333c0 5.825 4.02166 9.70834 9.84833 9.70834 4.57667 0 7.905-2.42667 8.87667-6.93334z'
					),
					u(Q, 'id', 'Path'),
					u(Q, 'fill', '#FEFEFE'),
					u(
						W,
						'd',
						'M217.49 28.435h16.3l.06667-.625c0-4.51-3.535-6.59-7.695-6.59-4.51 0-7.97667 2.705-8.67167 7.215z'
					),
					u(W, 'id', 'Path'),
					u(W, 'fill', '#151515'),
					u(
						Z,
						'd',
						'M254.52 15.67167v4.785c1.31667-3.605 4.16167-5.47834 7.975-5.47834 5.41 0 9.5 3.81667 9.5 9.29334 0 1.45666-.13833 2.845-.485 4.16333h-7.21167a12.545 12.545 0 00.27667-2.775c0-2.775-2.21833-4.44-4.85333-4.44-3.33 0-5.20167 2.28833-5.20167 5.48v21.845h-7.28333V15.67167H254.52z'
					),
					u(Z, 'id', 'Path'),
					u(Z, 'fill', '#FEFEFE'),
					u(
						X,
						'd',
						'M0 0h22.88667C30.515 0 38.49 4.43833 38.49 12.82833c0 5.20167-2.98333 8.73834-7.62833 10.75 5.895 1.45667 9.36166 5.68834 9.36166 11.79 0 8.6-8.25166 13.17667-15.95 13.17667H0V0z'
					),
					u(X, 'id', 'Path'),
					u(X, 'fill', '#FEFEFE'),
					u(
						_,
						'd',
						'M22.53833 20.11c4.44 0 8.32334-1.595 8.32334-6.58667 0-4.64666-4.36834-6.24166-8.32334-6.24166h-14.91V20.11h14.91zM23.92667 41.26333c4.23 0 8.32166-2.21833 8.32166-6.935 0-4.64666-4.02166-7.28333-8.32166-7.28333H7.62833v14.21667h16.29834v.00166z'
					),
					u(_, 'id', 'Path'),
					u(_, 'fill', '#151515'),
					u(
						tt,
						'd',
						'M45.21 39.18333c0-7.55833 5.68667-10.54166 12.55333-10.54166 2.01 0 3.95167.20833 5.825.69333l3.46667.83333V27.74c0-4.50833-3.32833-6.86667-7.62833-6.86667-4.16 0-7.28167 2.35834-7.975 6.52L44.86333 25.66C46.53 18.44667 52.285 14.97833 59.42667 14.97833c8.6 0 14.565 4.02334 14.565 13.10834V48.545H67.055v-5.55c-1.87167 4.58-6.38 6.24333-11.02667 6.24333-5.825 0-10.81833-4.09166-10.81833-10.055z'
					),
					u(tt, 'id', 'Path'),
					u(tt, 'fill', '#FEFEFE'),
					u(
						et,
						'd',
						'M67.055 36.06333v-.34666l-2.63333-.695c-2.36-.62334-4.16167-.90167-5.48-.90167-2.91334 0-6.10334.9-6.10334 4.37 0 1.31667.48667 2.35833 1.52667 3.19.97.9 2.49667 1.31667 4.57667 1.31667 4.36833 0 8.11333-2.21834 8.11333-6.93334z'
					),
					u(et, 'id', 'Path'),
					u(et, 'fill', '#151515'),
					u(at, 'id', 'Path'),
					u(at, 'fill', '#FEFEFE'),
					u(
						at,
						'd',
						'M80.99 0h7.28333v48.545H80.99zM99.64 21.91333h-6.58833v-6.24166H99.64V5.2h7.28333v10.47167h9.70834v6.24166h-9.70834V48.545H99.64zM149.43333 15.67167V48.545H142.15v-5.2c-2.35833 3.95-5.75667 5.89333-10.195 5.89333-7.83333 0-11.99667-4.785-11.99667-12.48333V15.67333h7.28334v19.35c0 4.3 1.80166 7.975 6.58666 7.975 5.755 0 8.32167-4.85333 8.32167-10.055V15.67167h7.28333zM154.005 40.22333l5.89333-3.12c1.80334 4.09167 4.64667 5.89334 9.155 5.89334 2.35834 0 6.17167-.76167 6.17167-3.81334 0-1.45666-.555-2.635-1.66333-3.4-1.11-.76166-3.26-1.385-6.45-1.87-5.47834-.90166-11.30334-3.12166-11.30334-9.64166 0-6.38 6.795-9.29334 12.27334-9.29334 5.48 0 9.71 2.01167 12.06666 7.14334l-5.54666 3.05166c-.97167-2.91333-3.12167-4.37-6.45-4.37-2.08 0-5.75667.90167-5.75667 3.60667 0 1.25.625 2.15 1.80333 2.70667 1.18.62333 3.4 1.11 6.52 1.595 6.10167.9 11.44334 3.05 11.44334 10.125 0 7.14333-7.145 10.40166-13.38667 10.40166-6.51667 0-12.27333-2.70333-14.77-9.01666v.00166z'
					),
					u(K, 'transform', 'translate(278.3)'),
					u(S, 'id', 'Page-1'),
					u(S, 'stroke', 'none'),
					u(S, 'stroke-width', '1'),
					u(S, 'fill', 'none'),
					u(S, 'fill-rule', 'evenodd'),
					u(D, 'width', '462'),
					u(D, 'height', '50'),
					u(D, 'viewBox', '0 0 462 50'),
					u(D, 'xmlns', 'http://www.w3.org/2000/svg'),
					u(D, 'class', 'svelte-85n0t0'),
					u(e, 'class', 'svelte-85n0t0');
			},
			m(n, s) {
				d(n, e, s),
					~a && it[a].m(e, null),
					p(e, i),
					p(e, g),
					p(g, m),
					p(m, w),
					p(g, V),
					p(g, M),
					p(M, T),
					p(g, z),
					p(g, A),
					p(A, H),
					p(g, b),
					p(g, k),
					p(k, N),
					p(g, L),
					p(g, O),
					p(O, y),
					p(g, G),
					p(g, U),
					p(U, R),
					p(e, B),
					p(e, D),
					p(D, S),
					p(S, Y),
					p(S, j),
					p(j, q),
					p(j, J),
					p(j, Q),
					p(j, W),
					p(j, Z),
					p(S, K),
					p(K, X),
					p(K, _),
					p(K, tt),
					p(K, et),
					p(K, at),
					(lt = !0),
					rt || ((ct = [C(m, 'click', t[1]), C(M, 'click', t[2])]), (rt = !0));
			},
			p(t, [n]) {
				let l = a;
				(a = ht(t)),
					a === l
						? ~a && it[a].p(t, n)
						: (s &&
								(F(),
								E(it[l], 1, 1, () => {
									it[l] = null;
								}),
								I()),
						  ~a
								? ((s = it[a]), s ? s.p(t, n) : ((s = it[a] = ot[a](t)), s.c()), v(s, 1), s.m(e, i))
								: (s = null));
			},
			i(t) {
				lt || (v(s), (lt = !0));
			},
			o(t) {
				E(s), (lt = !1);
			},
			d(t) {
				t && $(e), ~a && it[a].d(), (rt = !1), P(ct);
			}
		}
	);
}
function rt(t, e, a) {
	let n = 'overview';
	return [
		n,
		function () {
			a(0, (n = 'contact' === n ? 'overview' : 'contact'));
		},
		function () {
			a(0, (n = 'language' === n ? 'overview' : 'language'));
		}
	];
}
class ct extends t {
	constructor(t) {
		super(), e(this, t, rt, lt, a, {});
	}
}
function ot(t) {
	let e, a, r, f, m, M, z, A;
	r = new S({ props: { title: t[1] } });
	const x = t[2].default,
		C = V(x, t, t[3], null);
	return (
		(M = new ct({})),
		{
			c() {
				(e = n('main')),
					(a = n('div')),
					s(r.$$.fragment),
					(f = l()),
					C && C.c(),
					(m = l()),
					s(M.$$.fragment),
					this.h();
			},
			l(t) {
				e = c(t, 'MAIN', {});
				var n = o(e);
				a = c(n, 'DIV', { class: !0 });
				var s = o(a);
				i(r.$$.fragment, s),
					(f = h(s)),
					C && C.l(s),
					(m = h(s)),
					i(M.$$.fragment, s),
					s.forEach($),
					n.forEach($),
					this.h();
			},
			h() {
				u(a, 'class', (z = t[0] + '-subpage-color'));
			},
			m(t, n) {
				d(t, e, n),
					p(e, a),
					g(r, a, null),
					p(a, f),
					C && C.m(a, null),
					p(a, m),
					g(M, a, null),
					(A = !0);
			},
			p(t, e) {
				const n = {};
				2 & e && (n.title = t[1]),
					r.$set(n),
					C && C.p && (!A || 8 & e) && T(C, x, t, t[3], e, null, null),
					(!A || (1 & e && z !== (z = t[0] + '-subpage-color'))) && u(a, 'class', z);
			},
			i(t) {
				A || (v(r.$$.fragment, t), v(C, t), v(M.$$.fragment, t), (A = !0));
			},
			o(t) {
				E(r.$$.fragment, t), E(C, t), E(M.$$.fragment, t), (A = !1);
			},
			d(t) {
				t && $(e), w(r), C && C.d(t), w(M);
			}
		}
	);
}
function it(t) {
	let e, a;
	return (
		(e = new U({ props: { $$slots: { default: [ot] }, $$scope: { ctx: t } } })),
		{
			c() {
				s(e.$$.fragment);
			},
			l(t) {
				i(e.$$.fragment, t);
			},
			m(t, n) {
				g(e, t, n), (a = !0);
			},
			p(t, [a]) {
				const n = {};
				11 & a && (n.$$scope = { dirty: a, ctx: t }), e.$set(n);
			},
			i(t) {
				a || (v(e.$$.fragment, t), (a = !0));
			},
			o(t) {
				E(e.$$.fragment, t), (a = !1);
			},
			d(t) {
				w(e, t);
			}
		}
	);
}
function ht(t, e, a) {
	let n;
	N(t, R, (t) => a(4, (n = t)));
	let { $$slots: s = {}, $$scope: l } = e,
		r = 'Title',
		c = 'Title';
	return (
		L(() => {
			var t;
			a(0, (r = n.path.split('/')[2])),
				a(
					1,
					(c =
						'legal' === (t = r)
							? t.concat(' NOTICE').toUpperCase()
							: 'privacy' === t
							? t.concat(' POLICY').toUpperCase()
							: t.toUpperCase())
				);
		}),
		(t.$$set = (t) => {
			'$$scope' in t && a(3, (l = t.$$scope));
		}),
		[r, c, s, l]
	);
}
export default class extends t {
	constructor(t) {
		super(), e(this, t, ht, it, a, {});
	}
}
