function t() {}
const n = (t) => t;
function e(t, n) {
	for (const e in n) t[e] = n[e];
	return t;
}
function o(t) {
	return t();
}
function r() {
	return Object.create(null);
}
function s(t) {
	t.forEach(o);
}
function i(t) {
	return 'function' == typeof t;
}
function u(t, n) {
	return t != t ? n == n : t !== n || (t && 'object' == typeof t) || 'function' == typeof t;
}
function c(n, e, o) {
	n.$$.on_destroy.push(
		(function (n, ...e) {
			if (null == n) return t;
			const o = n.subscribe(...e);
			return o.unsubscribe ? () => o.unsubscribe() : o;
		})(e, o)
	);
}
function a(t, n, e, o) {
	if (t) {
		const r = l(t, n, e, o);
		return t[0](r);
	}
}
function l(t, n, o, r) {
	return t[1] && r ? e(o.ctx.slice(), t[1](r(n))) : o.ctx;
}
function f(t, n, e, o, r, s, i) {
	const u = (function (t, n, e, o) {
		if (t[2] && o) {
			const r = t[2](o(e));
			if (void 0 === n.dirty) return r;
			if ('object' == typeof r) {
				const t = [],
					e = Math.max(n.dirty.length, r.length);
				for (let o = 0; o < e; o += 1) t[o] = n.dirty[o] | r[o];
				return t;
			}
			return n.dirty | r;
		}
		return n.dirty;
	})(n, o, r, s);
	if (u) {
		const r = l(n, e, o, i);
		t.p(r, u);
	}
}
function d(t) {
	return null == t ? '' : t;
}
function p(n) {
	return n && i(n.destroy) ? n.destroy : t;
}
const h = 'undefined' != typeof window;
let $ = h ? () => window.performance.now() : () => Date.now(),
	g = h ? (t) => requestAnimationFrame(t) : t;
const m = new Set();
function b(t) {
	m.forEach((n) => {
		n.c(t) || (m.delete(n), n.f());
	}),
		0 !== m.size && g(b);
}
function y(t, n) {
	t.appendChild(n);
}
function _(t, n, e) {
	t.insertBefore(n, e || null);
}
function x(t) {
	t.parentNode.removeChild(t);
}
function v(t) {
	return document.createElement(t);
}
function w(t) {
	return document.createElementNS('http://www.w3.org/2000/svg', t);
}
function E(t) {
	return document.createTextNode(t);
}
function k() {
	return E(' ');
}
function A() {
	return E('');
}
function F(t, n, e, o) {
	return t.addEventListener(n, e, o), () => t.removeEventListener(n, e, o);
}
function T(t) {
	return function (n) {
		return n.preventDefault(), t.call(this, n);
	};
}
function C(t) {
	return function (n) {
		return n.stopPropagation(), t.call(this, n);
	};
}
function S(t, n, e) {
	null == e ? t.removeAttribute(n) : t.getAttribute(n) !== e && t.setAttribute(n, e);
}
function j(t) {
	return Array.from(t.childNodes);
}
function O(t, n, e, o) {
	for (let r = 0; r < t.length; r += 1) {
		const o = t[r];
		if (o.nodeName === n) {
			let n = 0;
			const s = [];
			for (; n < o.attributes.length; ) {
				const t = o.attributes[n++];
				e[t.name] || s.push(t.name);
			}
			for (let t = 0; t < s.length; t++) o.removeAttribute(s[t]);
			return t.splice(r, 1)[0];
		}
	}
	return o ? w(n) : v(n);
}
function N(t, n) {
	for (let e = 0; e < t.length; e += 1) {
		const o = t[e];
		if (3 === o.nodeType) return (o.data = '' + n), t.splice(e, 1)[0];
	}
	return E(n);
}
function P(t) {
	return N(t, ' ');
}
function B(t, n) {
	(n = '' + n), t.wholeText !== n && (t.data = n);
}
function M(t, n) {
	t.value = null == n ? '' : n;
}
function R(t, n, e, o) {
	t.style.setProperty(n, e, o ? 'important' : '');
}
function q(t, n, e) {
	t.classList[e ? 'add' : 'remove'](n);
}
function z(t, n) {
	const e = document.createEvent('CustomEvent');
	return e.initCustomEvent(t, !1, !1, n), e;
}
function D(t, n = document.body) {
	return Array.from(n.querySelectorAll(t));
}
const L = new Set();
let W,
	G = 0;
function H(t, n, e, o, r, s, i, u = 0) {
	const c = 16.666 / o;
	let a = '{\n';
	for (let g = 0; g <= 1; g += c) {
		const t = n + (e - n) * s(g);
		a += 100 * g + `%{${i(t, 1 - t)}}\n`;
	}
	const l = a + `100% {${i(e, 1 - e)}}\n}`,
		f = `__svelte_${(function (t) {
			let n = 5381,
				e = t.length;
			for (; e--; ) n = ((n << 5) - n) ^ t.charCodeAt(e);
			return n >>> 0;
		})(l)}_${u}`,
		d = t.ownerDocument;
	L.add(d);
	const p = d.__svelte_stylesheet || (d.__svelte_stylesheet = d.head.appendChild(v('style')).sheet),
		h = d.__svelte_rules || (d.__svelte_rules = {});
	h[f] || ((h[f] = !0), p.insertRule(`@keyframes ${f} ${l}`, p.cssRules.length));
	const $ = t.style.animation || '';
	return (t.style.animation = `${$ ? `${$}, ` : ''}${f} ${o}ms linear ${r}ms 1 both`), (G += 1), f;
}
function I(t, n) {
	const e = (t.style.animation || '').split(', '),
		o = e.filter(n ? (t) => t.indexOf(n) < 0 : (t) => -1 === t.indexOf('__svelte')),
		r = e.length - o.length;
	r &&
		((t.style.animation = o.join(', ')),
		(G -= r),
		G ||
			g(() => {
				G ||
					(L.forEach((t) => {
						const n = t.__svelte_stylesheet;
						let e = n.cssRules.length;
						for (; e--; ) n.deleteRule(e);
						t.__svelte_rules = {};
					}),
					L.clear());
			}));
}
function J(t) {
	W = t;
}
function K() {
	if (!W) throw new Error('Function called outside component initialization');
	return W;
}
function Q(t) {
	K().$$.on_mount.push(t);
}
function U(t) {
	K().$$.after_update.push(t);
}
function V(t) {
	K().$$.on_destroy.push(t);
}
function X() {
	const t = K();
	return (n, e) => {
		const o = t.$$.callbacks[n];
		if (o) {
			const r = z(n, e);
			o.slice().forEach((n) => {
				n.call(t, r);
			});
		}
	};
}
function Y(t, n) {
	K().$$.context.set(t, n);
}
function Z(t) {
	return K().$$.context.get(t);
}
function tt(t, n) {
	const e = t.$$.callbacks[n.type];
	e && e.slice().forEach((t) => t(n));
}
const nt = [],
	et = [],
	ot = [],
	rt = [],
	st = Promise.resolve();
let it = !1;
function ut(t) {
	ot.push(t);
}
let ct = !1;
const at = new Set();
function lt() {
	if (!ct) {
		ct = !0;
		do {
			for (let t = 0; t < nt.length; t += 1) {
				const n = nt[t];
				J(n), ft(n.$$);
			}
			for (J(null), nt.length = 0; et.length; ) et.pop()();
			for (let t = 0; t < ot.length; t += 1) {
				const n = ot[t];
				at.has(n) || (at.add(n), n());
			}
			ot.length = 0;
		} while (nt.length);
		for (; rt.length; ) rt.pop()();
		(it = !1), (ct = !1), at.clear();
	}
}
function ft(t) {
	if (null !== t.fragment) {
		t.update(), s(t.before_update);
		const n = t.dirty;
		(t.dirty = [-1]), t.fragment && t.fragment.p(t.ctx, n), t.after_update.forEach(ut);
	}
}
let dt;
function pt(t, n, e) {
	t.dispatchEvent(z(`${n ? 'intro' : 'outro'}${e}`));
}
const ht = new Set();
let $t;
function gt() {
	$t = { r: 0, c: [], p: $t };
}
function mt() {
	$t.r || s($t.c), ($t = $t.p);
}
function bt(t, n) {
	t && t.i && (ht.delete(t), t.i(n));
}
function yt(t, n, e, o) {
	if (t && t.o) {
		if (ht.has(t)) return;
		ht.add(t),
			$t.c.push(() => {
				ht.delete(t), o && (e && t.d(1), o());
			}),
			t.o(n);
	}
}
const _t = { duration: 0 };
function xt(e, o, r, u) {
	let c = o(e, r),
		a = u ? 0 : 1,
		l = null,
		f = null,
		d = null;
	function p() {
		d && I(e, d);
	}
	function h(t, n) {
		const e = t.b - a;
		return (
			(n *= Math.abs(e)),
			{ a: a, b: t.b, d: e, duration: n, start: t.start, end: t.start + n, group: t.group }
		);
	}
	function y(o) {
		const { delay: r = 0, duration: i = 300, easing: u = n, tick: y = t, css: _ } = c || _t,
			x = { start: $() + r, b: o };
		o || ((x.group = $t), ($t.r += 1)),
			l || f
				? (f = x)
				: (_ && (p(), (d = H(e, a, o, i, r, u, _))),
				  o && y(0, 1),
				  (l = h(x, i)),
				  ut(() => pt(e, o, 'start')),
				  (function (t) {
						let n;
						0 === m.size && g(b),
							new Promise((e) => {
								m.add((n = { c: t, f: e }));
							});
				  })((t) => {
						if (
							(f &&
								t > f.start &&
								((l = h(f, i)),
								(f = null),
								pt(e, l.b, 'start'),
								_ && (p(), (d = H(e, a, l.b, l.duration, 0, u, c.css)))),
							l)
						)
							if (t >= l.end)
								y((a = l.b), 1 - a),
									pt(e, l.b, 'end'),
									f || (l.b ? p() : --l.group.r || s(l.group.c)),
									(l = null);
							else if (t >= l.start) {
								const n = t - l.start;
								(a = l.a + l.d * u(n / l.duration)), y(a, 1 - a);
							}
						return !(!l && !f);
				  }));
	}
	return {
		run(t) {
			i(c)
				? (dt ||
						((dt = Promise.resolve()),
						dt.then(() => {
							dt = null;
						})),
				  dt).then(() => {
						(c = c()), y(t);
				  })
				: y(t);
		},
		end() {
			p(), (l = f = null);
		}
	};
}
const vt =
	'undefined' != typeof window ? window : 'undefined' != typeof globalThis ? globalThis : global;
function wt(t, n) {
	const e = {},
		o = {},
		r = { $$scope: 1 };
	let s = t.length;
	for (; s--; ) {
		const i = t[s],
			u = n[s];
		if (u) {
			for (const t in i) t in u || (o[t] = 1);
			for (const t in u) r[t] || ((e[t] = u[t]), (r[t] = 1));
			t[s] = u;
		} else for (const t in i) r[t] = 1;
	}
	for (const i in o) i in e || (e[i] = void 0);
	return e;
}
function Et(t) {
	return 'object' == typeof t && null !== t ? t : {};
}
function kt(t) {
	t && t.c();
}
function At(t, n) {
	t && t.l(n);
}
function Ft(t, n, e, r) {
	const { fragment: u, on_mount: c, on_destroy: a, after_update: l } = t.$$;
	u && u.m(n, e),
		r ||
			ut(() => {
				const n = c.map(o).filter(i);
				a ? a.push(...n) : s(n), (t.$$.on_mount = []);
			}),
		l.forEach(ut);
}
function Tt(t, n) {
	const e = t.$$;
	null !== e.fragment &&
		(s(e.on_destroy),
		e.fragment && e.fragment.d(n),
		(e.on_destroy = e.fragment = null),
		(e.ctx = []));
}
function Ct(t, n) {
	-1 === t.$$.dirty[0] && (nt.push(t), it || ((it = !0), st.then(lt)), t.$$.dirty.fill(0)),
		(t.$$.dirty[(n / 31) | 0] |= 1 << n % 31);
}
function St(n, e, o, i, u, c, a = [-1]) {
	const l = W;
	J(n);
	const f = (n.$$ = {
		fragment: null,
		ctx: null,
		props: c,
		update: t,
		not_equal: u,
		bound: r(),
		on_mount: [],
		on_destroy: [],
		on_disconnect: [],
		before_update: [],
		after_update: [],
		context: new Map(l ? l.$$.context : e.context || []),
		callbacks: r(),
		dirty: a,
		skip_bound: !1
	});
	let d = !1;
	if (
		((f.ctx = o
			? o(n, e.props || {}, (t, e, ...o) => {
					const r = o.length ? o[0] : e;
					return (
						f.ctx &&
							u(f.ctx[t], (f.ctx[t] = r)) &&
							(!f.skip_bound && f.bound[t] && f.bound[t](r), d && Ct(n, t)),
						e
					);
			  })
			: []),
		f.update(),
		(d = !0),
		s(f.before_update),
		(f.fragment = !!i && i(f.ctx)),
		e.target)
	) {
		if (e.hydrate) {
			const t = j(e.target);
			f.fragment && f.fragment.l(t), t.forEach(x);
		} else f.fragment && f.fragment.c();
		e.intro && bt(n.$$.fragment), Ft(n, e.target, e.anchor, e.customElement), lt();
	}
	J(l);
}
class jt {
	$destroy() {
		Tt(this, 1), (this.$destroy = t);
	}
	$on(t, n) {
		const e = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
		return (
			e.push(n),
			() => {
				const t = e.indexOf(n);
				-1 !== t && e.splice(t, 1);
			}
		);
	}
	$set(t) {
		var n;
		this.$$set &&
			((n = t), 0 !== Object.keys(n).length) &&
			((this.$$.skip_bound = !0), this.$$set(t), (this.$$.skip_bound = !1));
	}
}
const Ot = [];
function Nt(n, e = t) {
	let o;
	const r = [];
	function s(t) {
		if (u(n, t) && ((n = t), o)) {
			const t = !Ot.length;
			for (let e = 0; e < r.length; e += 1) {
				const t = r[e];
				t[1](), Ot.push(t, n);
			}
			if (t) {
				for (let t = 0; t < Ot.length; t += 2) Ot[t][0](Ot[t + 1]);
				Ot.length = 0;
			}
		}
	}
	return {
		set: s,
		update: function (t) {
			s(t(n));
		},
		subscribe: function (i, u = t) {
			const c = [i, u];
			return (
				r.push(c),
				1 === r.length && (o = e(s) || t),
				i(n),
				() => {
					const t = r.indexOf(c);
					-1 !== t && r.splice(t, 1), 0 === r.length && (o(), (o = null));
				}
			);
		}
	};
}
function Pt(t) {
	const n = t - 1;
	return n * n * n + 1;
}
function Bt(t, { delay: n = 0, duration: e = 400, easing: o = Pt } = {}) {
	const r = getComputedStyle(t),
		s = +r.opacity,
		i = parseFloat(r.height),
		u = parseFloat(r.paddingTop),
		c = parseFloat(r.paddingBottom),
		a = parseFloat(r.marginTop),
		l = parseFloat(r.marginBottom),
		f = parseFloat(r.borderTopWidth),
		d = parseFloat(r.borderBottomWidth);
	return {
		delay: n,
		duration: e,
		easing: o,
		css: (t) =>
			`overflow: hidden;opacity: ${Math.min(20 * t, 1) * s};height: ${t * i}px;padding-top: ${
				t * u
			}px;padding-bottom: ${t * c}px;margin-top: ${t * a}px;margin-bottom: ${
				t * l
			}px;border-top-width: ${t * f}px;border-bottom-width: ${t * d}px;`
	};
}
export {
	tt as $,
	e as A,
	gt as B,
	Nt as C,
	a as D,
	f as E,
	y as F,
	t as G,
	q as H,
	F as I,
	s as J,
	C as K,
	T as L,
	c as M,
	vt as N,
	et as O,
	R as P,
	ut as Q,
	xt as R,
	jt as S,
	Bt as T,
	V as U,
	D as V,
	w as W,
	Z as X,
	X as Y,
	d as Z,
	Pt as _,
	j as a,
	p as a0,
	M as a1,
	i as a2,
	S as b,
	O as c,
	x as d,
	v as e,
	_ as f,
	N as g,
	B as h,
	St as i,
	kt as j,
	k,
	A as l,
	At as m,
	P as n,
	Ft as o,
	wt as p,
	Et as q,
	yt as r,
	u as s,
	E as t,
	mt as u,
	bt as v,
	Tt as w,
	Y as x,
	U as y,
	Q as z
};
