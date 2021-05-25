import {
	S as s,
	i as t,
	s as e,
	D as n,
	E as o,
	v as c,
	r as l
} from '../chunks/vendor-783391f4.js';
/* empty css                    */ function r(s) {
	let t;
	const e = s[1].default,
		r = n(e, s, s[0], null);
	return {
		c() {
			r && r.c();
		},
		l(s) {
			r && r.l(s);
		},
		m(s, e) {
			r && r.m(s, e), (t = !0);
		},
		p(s, [n]) {
			r && r.p && (!t || 1 & n) && o(r, e, s, s[0], n, null, null);
		},
		i(s) {
			t || (c(r, s), (t = !0));
		},
		o(s) {
			l(r, s), (t = !1);
		},
		d(s) {
			r && r.d(s);
		}
	};
}
function u(s, t, e) {
	let { $$slots: n = {}, $$scope: o } = t;
	return (
		(s.$$set = (s) => {
			'$$scope' in s && e(0, (o = s.$$scope));
		}),
		[o, n]
	);
}
export default class extends s {
	constructor(s) {
		super(), t(this, s, u, r, e, {});
	}
}
