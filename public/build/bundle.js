
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
        const slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function action_destroyer(action_result) {
        return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function prevent_default(fn) {
        return function (event) {
            event.preventDefault();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function stop_propagation(fn) {
        return function (event) {
            event.stopPropagation();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function onDestroy(fn) {
        get_current_component().$$.on_destroy.push(fn);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.32.1' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src/UX/CornerMouseScroller.svelte generated by Svelte v3.32.1 */

    const file = "src/UX/CornerMouseScroller.svelte";

    function create_fragment(ctx) {
    	let div0;
    	let t0;
    	let div1;
    	let t1;
    	let div2;
    	let t2;
    	let div3;
    	let t3;
    	let div6;
    	let div4;
    	let t4;
    	let div5;
    	let t5;
    	let div9;
    	let div7;
    	let t6;
    	let div8;
    	let t7;
    	let div12;
    	let div10;
    	let t8;
    	let div11;
    	let t9;
    	let div15;
    	let div13;
    	let t10;
    	let div14;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			t0 = space();
    			div1 = element("div");
    			t1 = space();
    			div2 = element("div");
    			t2 = space();
    			div3 = element("div");
    			t3 = space();
    			div6 = element("div");
    			div4 = element("div");
    			t4 = space();
    			div5 = element("div");
    			t5 = space();
    			div9 = element("div");
    			div7 = element("div");
    			t6 = space();
    			div8 = element("div");
    			t7 = space();
    			div12 = element("div");
    			div10 = element("div");
    			t8 = space();
    			div11 = element("div");
    			t9 = space();
    			div15 = element("div");
    			div13 = element("div");
    			t10 = space();
    			div14 = element("div");
    			attr_dev(div0, "class", "top svelte-1zy3cj");
    			add_location(div0, file, 22, 0, 598);
    			attr_dev(div1, "class", "bottom svelte-1zy3cj");
    			add_location(div1, file, 29, 0, 729);
    			attr_dev(div2, "class", "left svelte-1zy3cj");
    			add_location(div2, file, 36, 0, 862);
    			attr_dev(div3, "class", "right svelte-1zy3cj");
    			add_location(div3, file, 43, 0, 994);
    			attr_dev(div4, "class", "horizontal svelte-1zy3cj");
    			add_location(div4, file, 58, 4, 1267);
    			attr_dev(div5, "class", "vertical svelte-1zy3cj");
    			add_location(div5, file, 59, 4, 1298);
    			attr_dev(div6, "class", "top-left svelte-1zy3cj");
    			add_location(div6, file, 51, 0, 1127);
    			attr_dev(div7, "class", "horizontal svelte-1zy3cj");
    			add_location(div7, file, 69, 4, 1471);
    			attr_dev(div8, "class", "vertical svelte-1zy3cj");
    			add_location(div8, file, 70, 4, 1502);
    			attr_dev(div9, "class", "top-right svelte-1zy3cj");
    			add_location(div9, file, 62, 0, 1331);
    			attr_dev(div10, "class", "horizontal svelte-1zy3cj");
    			add_location(div10, file, 80, 4, 1677);
    			attr_dev(div11, "class", "vertical svelte-1zy3cj");
    			add_location(div11, file, 81, 4, 1708);
    			attr_dev(div12, "class", "bottom-left svelte-1zy3cj");
    			add_location(div12, file, 73, 0, 1535);
    			attr_dev(div13, "class", "horizontal svelte-1zy3cj");
    			add_location(div13, file, 91, 4, 1883);
    			attr_dev(div14, "class", "vertical svelte-1zy3cj");
    			add_location(div14, file, 92, 4, 1914);
    			attr_dev(div15, "class", "bottom-right svelte-1zy3cj");
    			add_location(div15, file, 84, 0, 1741);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div1, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div2, anchor);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, div3, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div6, anchor);
    			append_dev(div6, div4);
    			append_dev(div6, t4);
    			append_dev(div6, div5);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, div9, anchor);
    			append_dev(div9, div7);
    			append_dev(div9, t6);
    			append_dev(div9, div8);
    			insert_dev(target, t7, anchor);
    			insert_dev(target, div12, anchor);
    			append_dev(div12, div10);
    			append_dev(div12, t8);
    			append_dev(div12, div11);
    			insert_dev(target, t9, anchor);
    			insert_dev(target, div15, anchor);
    			append_dev(div15, div13);
    			append_dev(div15, t10);
    			append_dev(div15, div14);

    			if (!mounted) {
    				dispose = [
    					listen_dev(div0, "mouseenter", /*mouseenter_handler*/ ctx[2], false, false, false),
    					listen_dev(div0, "mouseleave", /*terminateScrolling*/ ctx[1], false, false, false),
    					listen_dev(div1, "mouseenter", /*mouseenter_handler_1*/ ctx[3], false, false, false),
    					listen_dev(div1, "mouseleave", /*terminateScrolling*/ ctx[1], false, false, false),
    					listen_dev(div2, "mouseenter", /*mouseenter_handler_2*/ ctx[4], false, false, false),
    					listen_dev(div2, "mouseleave", /*terminateScrolling*/ ctx[1], false, false, false),
    					listen_dev(div3, "mouseenter", /*mouseenter_handler_3*/ ctx[5], false, false, false),
    					listen_dev(div3, "mouseleave", /*terminateScrolling*/ ctx[1], false, false, false),
    					listen_dev(div6, "mouseenter", /*mouseenter_handler_4*/ ctx[6], false, false, false),
    					listen_dev(div6, "mouseleave", /*terminateScrolling*/ ctx[1], false, false, false),
    					listen_dev(div9, "mouseenter", /*mouseenter_handler_5*/ ctx[7], false, false, false),
    					listen_dev(div9, "mouseleave", /*terminateScrolling*/ ctx[1], false, false, false),
    					listen_dev(div12, "mouseenter", /*mouseenter_handler_6*/ ctx[8], false, false, false),
    					listen_dev(div12, "mouseleave", /*terminateScrolling*/ ctx[1], false, false, false),
    					listen_dev(div15, "mouseenter", /*mouseenter_handler_7*/ ctx[9], false, false, false),
    					listen_dev(div15, "mouseleave", /*terminateScrolling*/ ctx[1], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div2);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(div3);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div6);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(div9);
    			if (detaching) detach_dev(t7);
    			if (detaching) detach_dev(div12);
    			if (detaching) detach_dev(t9);
    			if (detaching) detach_dev(div15);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("CornerMouseScroller", slots, []);
    	let xMovement = 0;
    	let yMovement = 0;

    	function initiateScrolling(xSpeed, ySpeed) {
    		xMovement = xSpeed;
    		yMovement = ySpeed;

    		setTimeout(
    			() => {
    				const scrollInterval = setInterval(
    					() => {
    						if (xMovement === xSpeed && yMovement === ySpeed) {
    							window.scrollBy(xSpeed, ySpeed);
    						} else {
    							clearInterval(scrollInterval);
    						}
    					},
    					5
    				);
    			},
    			100
    		);
    	}

    	function terminateScrolling() {
    		xMovement = 0;
    		yMovement = 0;
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<CornerMouseScroller> was created with unknown prop '${key}'`);
    	});

    	const mouseenter_handler = () => {
    		initiateScrolling(0, -1);
    	};

    	const mouseenter_handler_1 = () => {
    		initiateScrolling(0, 1);
    	};

    	const mouseenter_handler_2 = () => {
    		initiateScrolling(-1, 0);
    	};

    	const mouseenter_handler_3 = () => {
    		initiateScrolling(1, 0);
    	};

    	const mouseenter_handler_4 = () => {
    		initiateScrolling(-1, -1);
    	};

    	const mouseenter_handler_5 = () => {
    		initiateScrolling(1, -1);
    	};

    	const mouseenter_handler_6 = () => {
    		initiateScrolling(-1, 1);
    	};

    	const mouseenter_handler_7 = () => {
    		initiateScrolling(1, 1);
    	};

    	$$self.$capture_state = () => ({
    		xMovement,
    		yMovement,
    		initiateScrolling,
    		terminateScrolling
    	});

    	$$self.$inject_state = $$props => {
    		if ("xMovement" in $$props) xMovement = $$props.xMovement;
    		if ("yMovement" in $$props) yMovement = $$props.yMovement;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		initiateScrolling,
    		terminateScrolling,
    		mouseenter_handler,
    		mouseenter_handler_1,
    		mouseenter_handler_2,
    		mouseenter_handler_3,
    		mouseenter_handler_4,
    		mouseenter_handler_5,
    		mouseenter_handler_6,
    		mouseenter_handler_7
    	];
    }

    class CornerMouseScroller extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CornerMouseScroller",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    /* src/UX/ScrollSlowDown.svelte generated by Svelte v3.32.1 */

    const { window: window_1 } = globals;

    function create_fragment$1(ctx) {
    	let mounted;
    	let dispose;

    	const block = {
    		c: noop,
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (!mounted) {
    				dispose = listen_dev(window_1, "wheel", stop_propagation(prevent_default(wheelHandler)), { passive: false }, true, true);
    				mounted = true;
    			}
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function wheelHandler(event) {
    	let reducedDeltaY = Math.round(event.deltaY / 2);
    	let reducedDeltaX = Math.round(event.deltaX / 2);
    	window.scrollBy(reducedDeltaX, reducedDeltaY);
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("ScrollSlowDown", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ScrollSlowDown> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ wheelHandler });
    	return [];
    }

    class ScrollSlowDown extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ScrollSlowDown",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src/UI/HeroView.svelte generated by Svelte v3.32.1 */

    const file$1 = "src/UI/HeroView.svelte";

    function create_fragment$2(ctx) {
    	let section;
    	let div;
    	let svg;
    	let style;
    	let t0;
    	let path;
    	let t1;
    	let h10;
    	let t3;
    	let h11;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			section = element("section");
    			div = element("div");
    			svg = svg_element("svg");
    			style = svg_element("style");
    			t0 = text(".st0 {\n                    fill: #fefefe;\n                }\n            ");
    			path = svg_element("path");
    			t1 = space();
    			h10 = element("h1");
    			h10.textContent = "CREATIVE SERVICES & DIGITAL DEVELOPMENT";
    			t3 = space();
    			h11 = element("h1");
    			h11.textContent = "c/o MORITZ MORTIMER MÜLLER (DE), THEODOR BALTUS STEINER (JP)";
    			add_location(style, file$1, 22, 13, 597);
    			attr_dev(path, "class", "st0");
    			attr_dev(path, "d", "M28.71 29.127V2.538l-8.53 26.589h-7.073L4.577 2.538v26.589H0V0h8.53l8.114 25.59L24.758 0h8.53v29.127h-4.577zM36.613 19.266c0-5.95 4.286-10.279 10.153-10.279 6.034 0 10.153 4.411 10.153 10.279 0 5.95-4.286 10.277-10.153 10.277-5.991 0-10.153-4.452-10.153-10.277zm15.937 0c0-3.454-2.122-6.326-5.784-6.326-3.62 0-5.783 2.872-5.783 6.326 0 3.412 2.205 6.324 5.783 6.324 3.62 0 5.784-2.871 5.784-6.324zM70.253 9.403h4.825V3.12h4.37v6.283h5.825v3.745h-5.825v15.979h-4.37V13.148H69.28c-3.003 0-4.812 1.346-4.812 3.288v12.691H60.1V9.403h4.37v3.287c.79-2.163 3.003-3.287 5.784-3.287M87.559 1.248h4.785v4.785h-4.785V1.248zm4.577 8.155v19.724h-4.37V9.403h4.37zM101.205 9.403v2.788c1.04-2.247 2.788-3.204 5.202-3.204 2.705 0 4.494 1.54 5.2 4.12.916-2.539 2.872-4.12 5.618-4.12 4.161 0 6.034 2.913 6.034 6.825v13.315h-4.37V16.769c0-2.123-1.04-3.87-3.328-3.87-2.247 0-3.33 1.79-3.33 3.87v12.358h-4.368V16.769c0-2.123-1.04-3.87-3.33-3.87-2.496 0-3.328 2.122-3.328 4.286v11.942h-4.369V9.403h4.37zM141.73 21.638l3.745 1.456c-1.457 4.244-4.62 6.449-9.113 6.449-6.325 0-10.237-4.327-10.237-10.402 0-5.743 3.828-10.154 9.613-10.154 5.368 0 8.905 3.412 8.905 8.698 0 .79-.084 1.539-.208 2.288h-13.94c0 3.495 2.413 5.825 5.909 5.825 2.746 0 4.743-1.456 5.326-4.16zm-11.236-4.577h9.78l.04-.375c0-2.706-2.121-3.954-4.617-3.954-2.706 0-4.786 1.623-5.203 4.329zM152.712 9.403v2.871c.79-2.163 2.497-3.287 4.785-3.287 3.246 0 5.7 2.29 5.7 5.576 0 .874-.083 1.707-.291 2.498h-4.327a7.527 7.527 0 0 0 .166-1.665c0-1.665-1.331-2.664-2.912-2.664-1.998 0-3.121 1.373-3.121 3.288v13.107h-4.37V9.403h4.37zM166.98 0h13.732c4.577 0 9.362 2.663 9.362 7.697 0 3.121-1.79 5.243-4.577 6.45 3.537.874 5.617 3.413 5.617 7.074 0 5.16-4.951 7.906-9.57 7.906H166.98V0zm13.523 12.066c2.664 0 4.994-.957 4.994-3.952 0-2.788-2.621-3.745-4.994-3.745h-8.946v7.697h8.946zm.833 12.692c2.538 0 4.993-1.331 4.993-4.161 0-2.788-2.413-4.37-4.993-4.37h-9.779v8.53h9.779zM194.106 23.51c0-4.535 3.412-6.325 7.532-6.325 1.206 0 2.371.125 3.495.416l2.08.5v-1.457c0-2.705-1.997-4.12-4.577-4.12-2.496 0-4.369 1.415-4.785 3.912l-3.953-1.04c1-4.328 4.453-6.409 8.738-6.409 5.16 0 8.739 2.414 8.739 7.865v12.275h-4.162v-3.33c-1.123 2.748-3.828 3.746-6.616 3.746-3.495 0-6.491-2.455-6.491-6.033zm13.107-1.872v-.208l-1.58-.417c-1.416-.374-2.497-.541-3.288-.541-1.748 0-3.662.54-3.662 2.622 0 .79.292 1.415.916 1.914.582.54 1.498.79 2.746.79 2.621 0 4.868-1.331 4.868-4.16zM215.574 0h4.37v29.127h-4.37V0zM226.764 13.148h-3.953V9.403h3.953V3.12h4.37v6.283h5.825v3.745h-5.825v15.979h-4.37V13.148zM256.64 9.403v19.724h-4.37v-3.12c-1.415 2.37-3.454 3.536-6.117 3.536-4.7 0-7.198-2.871-7.198-7.49V9.404h4.37v11.61c0 2.58 1.081 4.785 3.952 4.785 3.453 0 4.993-2.912 4.993-6.033V9.403h4.37zM259.383 24.134l3.536-1.872c1.082 2.455 2.788 3.536 5.493 3.536 1.415 0 3.703-.457 3.703-2.288 0-.874-.333-1.581-.998-2.04-.666-.457-1.956-.831-3.87-1.122-3.287-.541-6.782-1.873-6.782-5.785 0-3.828 4.077-5.576 7.364-5.576 3.288 0 5.826 1.207 7.24 4.286l-3.328 1.831c-.583-1.748-1.873-2.622-3.87-2.622-1.248 0-3.454.541-3.454 2.164 0 .75.375 1.29 1.082 1.624.708.374 2.04.666 3.912.957 3.661.54 6.866 1.83 6.866 6.075 0 4.286-4.287 6.241-8.032 6.241-3.91 0-7.364-1.622-8.862-5.41z");
    			add_location(path, file$1, 26, 20, 701);
    			attr_dev(svg, "version", "1.1");
    			attr_dev(svg, "id", "Ebene_1");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "x", "0");
    			attr_dev(svg, "y", "0");
    			attr_dev(svg, "viewBox", "0 0 276.277 29.543");
    			attr_dev(svg, "xml:space", "preserve");
    			attr_dev(svg, "class", "svelte-1w2vw9k");
    			add_location(svg, file$1, 14, 8, 371);
    			attr_dev(h10, "class", "svelte-1w2vw9k");
    			add_location(h10, file$1, 31, 8, 3986);
    			attr_dev(h11, "class", "svelte-1w2vw9k");
    			add_location(h11, file$1, 32, 8, 4043);
    			attr_dev(div, "class", "hero-view svelte-1w2vw9k");
    			add_location(div, file$1, 13, 4, 326);
    			attr_dev(section, "class", "svelte-1w2vw9k");
    			add_location(section, file$1, 12, 0, 312);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, div);
    			append_dev(div, svg);
    			append_dev(svg, style);
    			append_dev(style, t0);
    			append_dev(svg, path);
    			append_dev(div, t1);
    			append_dev(div, h10);
    			append_dev(div, t3);
    			append_dev(div, h11);

    			if (!mounted) {
    				dispose = action_destroyer(heroView.call(null, div));
    				mounted = true;
    			}
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function heroView(node) {
    	// node.scrollIntoView()
    	// node.classList.remove("hero-view");
    	window.requestAnimationFrame(() => node.scrollIntoView());
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("HeroView", slots, []);

    	if ("scrollRestoration" in window.history) {
    		window.history.scrollRestoration = "manual";
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<HeroView> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ heroView });
    	return [];
    }

    class HeroView extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "HeroView",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    const subscriber_queue = [];
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = [];
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (let i = 0; i < subscribers.length; i += 1) {
                        const s = subscribers[i];
                        s[1]();
                        subscriber_queue.push(s, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.push(subscriber);
            if (subscribers.length === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                const index = subscribers.indexOf(subscriber);
                if (index !== -1) {
                    subscribers.splice(index, 1);
                }
                if (subscribers.length === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    function windowHandler() {
        const windowStore = writable([]);

        return {
            subscribe: windowStore.subscribe,
            registerWindow: window => {
                windowStore.update(windowObjects => {
                    return [...windowObjects, window];
                });
            },
            unregisterWindow: windowID => {
                windowStore.update(windowObjects => {
                    return windowObjects.filter(wndw => wdnw.id != windowID)
                });
            },
            bringToForeground: windowID => {
                windowStore.update(windowObjects => {
                    let window = windowObjects.find(wndw => wndw.id === windowID);
                    const windowIndex = windowObjects.indexOf(window);
                    window.zIndex = 1;
                    window.isInForeground = true;
                    let updatedWindowObjects = windowObjects.filter(wndw => true);
                    updatedWindowObjects[windowIndex] = window;
                    window.intersections.forEach(intersectingID => {
                        let intersectingWindow = windowObjects.find(wndw => wndw.id === intersectingID);
                        const intersectingWindowIndex = windowObjects.indexOf(intersectingWindow);
                        intersectingWindow.zIndex = 0;
                        intersectingWindow.isInForeground = false;
                        intersectingWindow.touched = true;
                        updatedWindowObjects[intersectingWindowIndex] = intersectingWindow;
                    });
                    return updatedWindowObjects;
                });

            }
        }
    }

    var windowHandler$1 = windowHandler();

    /* src/UI/WindowElement.svelte generated by Svelte v3.32.1 */
    const file$2 = "src/UI/WindowElement.svelte";

    // (98:8) {:else}
    function create_else_block_1(ctx) {
    	let h1;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "Title";
    			attr_dev(h1, "class", "svelte-cvxpji");
    			add_location(h1, file$2, 98, 12, 3313);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_1.name,
    		type: "else",
    		source: "(98:8) {:else}",
    		ctx
    	});

    	return block;
    }

    // (96:8) {#if title}
    function create_if_block_1(ctx) {
    	let h1;
    	let t;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			t = text(/*title*/ ctx[7]);
    			attr_dev(h1, "class", "svelte-cvxpji");
    			add_location(h1, file$2, 96, 12, 3268);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    			append_dev(h1, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*title*/ 128) set_data_dev(t, /*title*/ ctx[7]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(96:8) {#if title}",
    		ctx
    	});

    	return block;
    }

    // (154:8) {:else}
    function create_else_block(ctx) {
    	let button;

    	const block = {
    		c: function create() {
    			button = element("button");
    			attr_dev(button, "class", "disabled svelte-cvxpji");
    			add_location(button, file$2, 154, 12, 5867);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(154:8) {:else}",
    		ctx
    	});

    	return block;
    }

    // (101:8) {#if enlargeable}
    function create_if_block(ctx) {
    	let button;
    	let span;
    	let t0;
    	let t1;
    	let t2;
    	let t3;
    	let svg;
    	let title_1;
    	let t4;
    	let g3;
    	let g2;
    	let g1;
    	let g0;
    	let rect0;
    	let rect1;
    	let polygon0;
    	let rect2;
    	let polygon1;

    	const block = {
    		c: function create() {
    			button = element("button");
    			span = element("span");
    			t0 = text("Enlarge this ");
    			t1 = text(/*title*/ ctx[7]);
    			t2 = text(" window");
    			t3 = space();
    			svg = svg_element("svg");
    			title_1 = svg_element("title");
    			t4 = text("Group 6");
    			g3 = svg_element("g");
    			g2 = svg_element("g");
    			g1 = svg_element("g");
    			g0 = svg_element("g");
    			rect0 = svg_element("rect");
    			rect1 = svg_element("rect");
    			polygon0 = svg_element("polygon");
    			rect2 = svg_element("rect");
    			polygon1 = svg_element("polygon");
    			attr_dev(span, "class", "svelte-cvxpji");
    			add_location(span, file$2, 102, 16, 3421);
    			add_location(title_1, file$2, 109, 20, 3690);
    			attr_dev(rect0, "x", ".5");
    			attr_dev(rect0, "y", ".5");
    			attr_dev(rect0, "width", "53");
    			attr_dev(rect0, "height", "14");
    			attr_dev(rect0, "rx", "3");
    			attr_dev(rect0, "fill", "#151515");
    			attr_dev(rect0, "stroke", "#FEFEFE");
    			add_location(rect0, file$2, 114, 36, 3997);
    			attr_dev(rect1, "x", "17");
    			attr_dev(rect1, "y", "6");
    			attr_dev(rect1, "width", "20");
    			attr_dev(rect1, "height", "1");
    			attr_dev(rect1, "fill", "#FEFEFE");
    			add_location(rect1, file$2, 123, 36, 4434);
    			attr_dev(polygon0, "points", "47 7 37 4 37 7");
    			attr_dev(polygon0, "fill", "#FEFEFE");
    			add_location(polygon0, file$2, 130, 36, 4765);
    			attr_dev(rect2, "transform", "translate(27 8.5) rotate(180) translate(-27 -8.5)");
    			attr_dev(rect2, "x", "17");
    			attr_dev(rect2, "y", "8");
    			attr_dev(rect2, "width", "20");
    			attr_dev(rect2, "height", "1");
    			attr_dev(rect2, "fill", "#FEFEFE");
    			add_location(rect2, file$2, 134, 36, 4968);
    			attr_dev(polygon1, "transform", "translate(12 9.5) rotate(180) translate(-12 -9.5)");
    			attr_dev(polygon1, "points", "17 11 7 8 7 11");
    			attr_dev(polygon1, "fill", "#FEFEFE");
    			add_location(polygon1, file$2, 142, 36, 5401);
    			attr_dev(g0, "transform", "translate(436 9)");
    			add_location(g0, file$2, 113, 32, 3928);
    			attr_dev(g1, "transform", "translate(606 1483)");
    			add_location(g1, file$2, 112, 28, 3860);
    			attr_dev(g2, "transform", "translate(-1042 -1492)");
    			add_location(g2, file$2, 111, 24, 3793);
    			attr_dev(g3, "fill", "none");
    			attr_dev(g3, "fill-rule", "evenodd");
    			add_location(g3, file$2, 110, 20, 3733);
    			attr_dev(svg, "version", "1.1");
    			attr_dev(svg, "viewBox", "0 0 54 15");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "role", "presentation");
    			attr_dev(svg, "class", "svelte-cvxpji");
    			add_location(svg, file$2, 103, 16, 3478);
    			attr_dev(button, "class", "enlarge svelte-cvxpji");
    			add_location(button, file$2, 101, 12, 3380);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			append_dev(button, span);
    			append_dev(span, t0);
    			append_dev(span, t1);
    			append_dev(span, t2);
    			append_dev(button, t3);
    			append_dev(button, svg);
    			append_dev(svg, title_1);
    			append_dev(title_1, t4);
    			append_dev(svg, g3);
    			append_dev(g3, g2);
    			append_dev(g2, g1);
    			append_dev(g1, g0);
    			append_dev(g0, rect0);
    			append_dev(g0, rect1);
    			append_dev(g0, polygon0);
    			append_dev(g0, rect2);
    			append_dev(g0, polygon1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*title*/ 128) set_data_dev(t1, /*title*/ ctx[7]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(101:8) {#if enlargeable}",
    		ctx
    	});

    	return block;
    }

    // (159:14) <p>
    function fallback_block(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "Content goes here";
    			add_location(p, file$2, 158, 14, 5985);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block.name,
    		type: "fallback",
    		source: "(159:14) <p>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let section;
    	let header;
    	let button;
    	let span;
    	let t0;
    	let t1;
    	let t2;
    	let t3;
    	let svg;
    	let title_1;
    	let t4;
    	let g3;
    	let g2;
    	let g1;
    	let g0;
    	let rect0;
    	let rect1;
    	let t5;
    	let t6;
    	let t7;
    	let article;
    	let t8;
    	let footer;
    	let current;
    	let mounted;
    	let dispose;

    	function select_block_type(ctx, dirty) {
    		if (/*title*/ ctx[7]) return create_if_block_1;
    		return create_else_block_1;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block0 = current_block_type(ctx);

    	function select_block_type_1(ctx, dirty) {
    		if (/*enlargeable*/ ctx[8]) return create_if_block;
    		return create_else_block;
    	}

    	let current_block_type_1 = select_block_type_1(ctx);
    	let if_block1 = current_block_type_1(ctx);
    	const default_slot_template = /*#slots*/ ctx[16].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[15], null);
    	const default_slot_or_fallback = default_slot || fallback_block(ctx);

    	const block = {
    		c: function create() {
    			section = element("section");
    			header = element("header");
    			button = element("button");
    			span = element("span");
    			t0 = text("Shrink this ");
    			t1 = text(/*title*/ ctx[7]);
    			t2 = text(" window");
    			t3 = space();
    			svg = svg_element("svg");
    			title_1 = svg_element("title");
    			t4 = text("Group 7");
    			g3 = svg_element("g");
    			g2 = svg_element("g");
    			g1 = svg_element("g");
    			g0 = svg_element("g");
    			rect0 = svg_element("rect");
    			rect1 = svg_element("rect");
    			t5 = space();
    			if_block0.c();
    			t6 = space();
    			if_block1.c();
    			t7 = space();
    			article = element("article");
    			if (default_slot_or_fallback) default_slot_or_fallback.c();
    			t8 = space();
    			footer = element("footer");
    			attr_dev(span, "class", "svelte-cvxpji");
    			add_location(span, file$2, 61, 12, 1895);
    			add_location(title_1, file$2, 68, 16, 2135);
    			attr_dev(rect0, "x", ".5");
    			attr_dev(rect0, "y", ".5");
    			attr_dev(rect0, "width", "53");
    			attr_dev(rect0, "height", "14");
    			attr_dev(rect0, "rx", "3");
    			attr_dev(rect0, "fill", "#151515");
    			attr_dev(rect0, "stroke", "#FEFEFE");
    			add_location(rect0, file$2, 73, 32, 2419);
    			attr_dev(rect1, "x", "17");
    			attr_dev(rect1, "y", "7");
    			attr_dev(rect1, "width", "20");
    			attr_dev(rect1, "height", "1");
    			attr_dev(rect1, "fill", "#FEFEFE");
    			add_location(rect1, file$2, 82, 32, 2820);
    			attr_dev(g0, "transform", "translate(9 9)");
    			add_location(g0, file$2, 72, 28, 2356);
    			attr_dev(g1, "transform", "translate(606 1483)");
    			add_location(g1, file$2, 71, 24, 2292);
    			attr_dev(g2, "transform", "translate(-615 -1492)");
    			add_location(g2, file$2, 70, 20, 2230);
    			attr_dev(g3, "fill", "none");
    			attr_dev(g3, "fill-rule", "evenodd");
    			add_location(g3, file$2, 69, 16, 2174);
    			attr_dev(svg, "version", "1.1");
    			attr_dev(svg, "viewBox", "0 0 54 15");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "role", "presentation");
    			attr_dev(svg, "class", "svelte-cvxpji");
    			add_location(svg, file$2, 62, 12, 1947);
    			attr_dev(button, "class", "shrink svelte-cvxpji");
    			add_location(button, file$2, 60, 8, 1859);
    			attr_dev(header, "class", "svelte-cvxpji");
    			add_location(header, file$2, 59, 4, 1842);
    			attr_dev(article, "class", "svelte-cvxpji");
    			toggle_class(article, "no-events", !/*isInForeground*/ ctx[0]);
    			add_location(article, file$2, 157, 4, 5927);
    			add_location(footer, file$2, 160, 4, 6036);
    			set_style(section, "--shuffledistance", /*distanceFromIntersection*/ ctx[1] + "vmax");
    			set_style(section, "position", "relative");
    			set_style(section, "z-index", /*zIndex*/ ctx[11]);
    			set_style(section, "grid-column", /*gridColumnStart*/ ctx[2] + " / " + /*gridColumnEnd*/ ctx[3]);
    			set_style(section, "grid-row", /*gridRowStart*/ ctx[4] + " / " + /*gridRowEnd*/ ctx[5]);
    			set_style(section, "background-color", /*backgroundColor*/ ctx[6]);
    			attr_dev(section, "class", "svelte-cvxpji");
    			toggle_class(section, "trigger-shuffle-right", !/*isInForeground*/ ctx[0] && /*intersectingSide*/ ctx[9] === "right" && /*touched*/ ctx[10]);
    			toggle_class(section, "trigger-shuffle-left", !/*isInForeground*/ ctx[0] && /*intersectingSide*/ ctx[9] === "left" && /*touched*/ ctx[10]);
    			add_location(section, file$2, 49, 0, 1348);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, header);
    			append_dev(header, button);
    			append_dev(button, span);
    			append_dev(span, t0);
    			append_dev(span, t1);
    			append_dev(span, t2);
    			append_dev(button, t3);
    			append_dev(button, svg);
    			append_dev(svg, title_1);
    			append_dev(title_1, t4);
    			append_dev(svg, g3);
    			append_dev(g3, g2);
    			append_dev(g2, g1);
    			append_dev(g1, g0);
    			append_dev(g0, rect0);
    			append_dev(g0, rect1);
    			append_dev(header, t5);
    			if_block0.m(header, null);
    			append_dev(header, t6);
    			if_block1.m(header, null);
    			append_dev(section, t7);
    			append_dev(section, article);

    			if (default_slot_or_fallback) {
    				default_slot_or_fallback.m(article, null);
    			}

    			append_dev(section, t8);
    			append_dev(section, footer);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(section, "click", /*handleWindowClick*/ ctx[12], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*title*/ 128) set_data_dev(t1, /*title*/ ctx[7]);

    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block0) {
    				if_block0.p(ctx, dirty);
    			} else {
    				if_block0.d(1);
    				if_block0 = current_block_type(ctx);

    				if (if_block0) {
    					if_block0.c();
    					if_block0.m(header, t6);
    				}
    			}

    			if (current_block_type_1 === (current_block_type_1 = select_block_type_1(ctx)) && if_block1) {
    				if_block1.p(ctx, dirty);
    			} else {
    				if_block1.d(1);
    				if_block1 = current_block_type_1(ctx);

    				if (if_block1) {
    					if_block1.c();
    					if_block1.m(header, null);
    				}
    			}

    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 32768) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[15], dirty, null, null);
    				}
    			}

    			if (dirty & /*isInForeground*/ 1) {
    				toggle_class(article, "no-events", !/*isInForeground*/ ctx[0]);
    			}

    			if (!current || dirty & /*distanceFromIntersection*/ 2) {
    				set_style(section, "--shuffledistance", /*distanceFromIntersection*/ ctx[1] + "vmax");
    			}

    			if (!current || dirty & /*zIndex*/ 2048) {
    				set_style(section, "z-index", /*zIndex*/ ctx[11]);
    			}

    			if (!current || dirty & /*gridColumnStart, gridColumnEnd*/ 12) {
    				set_style(section, "grid-column", /*gridColumnStart*/ ctx[2] + " / " + /*gridColumnEnd*/ ctx[3]);
    			}

    			if (!current || dirty & /*gridRowStart, gridRowEnd*/ 48) {
    				set_style(section, "grid-row", /*gridRowStart*/ ctx[4] + " / " + /*gridRowEnd*/ ctx[5]);
    			}

    			if (!current || dirty & /*backgroundColor*/ 64) {
    				set_style(section, "background-color", /*backgroundColor*/ ctx[6]);
    			}

    			if (dirty & /*isInForeground, intersectingSide, touched*/ 1537) {
    				toggle_class(section, "trigger-shuffle-right", !/*isInForeground*/ ctx[0] && /*intersectingSide*/ ctx[9] === "right" && /*touched*/ ctx[10]);
    			}

    			if (dirty & /*isInForeground, intersectingSide, touched*/ 1537) {
    				toggle_class(section, "trigger-shuffle-left", !/*isInForeground*/ ctx[0] && /*intersectingSide*/ ctx[9] === "left" && /*touched*/ ctx[10]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot_or_fallback, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot_or_fallback, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			if_block0.d();
    			if_block1.d();
    			if (default_slot_or_fallback) default_slot_or_fallback.d(detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("WindowElement", slots, ['default']);
    	let { gridColumnStart } = $$props;
    	let { gridColumnEnd } = $$props;
    	let { gridRowStart } = $$props;
    	let { gridRowEnd } = $$props;
    	let { backgroundColor = "" } = $$props;
    	let { title } = $$props;
    	let { enlargeable = true } = $$props;
    	let { id } = $$props;
    	let { isInForeground = true } = $$props;
    	let { intersections = [] } = $$props;
    	let { intersectingSide = null } = $$props;
    	let { distanceFromIntersection = 20 } = $$props;
    	let touched = false;
    	let zIndex = 0;
    	let thisWindowObject;
    	distanceFromIntersection = distanceFromIntersection + 5;

    	windowHandler$1.registerWindow({
    		id,
    		zIndex,
    		isInForeground,
    		intersections,
    		touched
    	});

    	const unsubscribe = windowHandler$1.subscribe(windows => {
    		thisWindowObject = windows.find(wdws => wdws.id === id);
    		$$invalidate(0, isInForeground = thisWindowObject.isInForeground);
    		$$invalidate(11, zIndex = thisWindowObject.zIndex);
    		$$invalidate(10, touched = thisWindowObject.touched);
    	});

    	function handleWindowClick() {
    		if (isInForeground) ; else {
    			windowHandler$1.bringToForeground(id);
    		}
    	}

    	onDestroy(() => {
    		if (unsubscribe) {
    			unsubscribe();
    		}
    	});

    	const writable_props = [
    		"gridColumnStart",
    		"gridColumnEnd",
    		"gridRowStart",
    		"gridRowEnd",
    		"backgroundColor",
    		"title",
    		"enlargeable",
    		"id",
    		"isInForeground",
    		"intersections",
    		"intersectingSide",
    		"distanceFromIntersection"
    	];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<WindowElement> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("gridColumnStart" in $$props) $$invalidate(2, gridColumnStart = $$props.gridColumnStart);
    		if ("gridColumnEnd" in $$props) $$invalidate(3, gridColumnEnd = $$props.gridColumnEnd);
    		if ("gridRowStart" in $$props) $$invalidate(4, gridRowStart = $$props.gridRowStart);
    		if ("gridRowEnd" in $$props) $$invalidate(5, gridRowEnd = $$props.gridRowEnd);
    		if ("backgroundColor" in $$props) $$invalidate(6, backgroundColor = $$props.backgroundColor);
    		if ("title" in $$props) $$invalidate(7, title = $$props.title);
    		if ("enlargeable" in $$props) $$invalidate(8, enlargeable = $$props.enlargeable);
    		if ("id" in $$props) $$invalidate(13, id = $$props.id);
    		if ("isInForeground" in $$props) $$invalidate(0, isInForeground = $$props.isInForeground);
    		if ("intersections" in $$props) $$invalidate(14, intersections = $$props.intersections);
    		if ("intersectingSide" in $$props) $$invalidate(9, intersectingSide = $$props.intersectingSide);
    		if ("distanceFromIntersection" in $$props) $$invalidate(1, distanceFromIntersection = $$props.distanceFromIntersection);
    		if ("$$scope" in $$props) $$invalidate(15, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		onDestroy,
    		windowHandler: windowHandler$1,
    		gridColumnStart,
    		gridColumnEnd,
    		gridRowStart,
    		gridRowEnd,
    		backgroundColor,
    		title,
    		enlargeable,
    		id,
    		isInForeground,
    		intersections,
    		intersectingSide,
    		distanceFromIntersection,
    		touched,
    		zIndex,
    		thisWindowObject,
    		unsubscribe,
    		handleWindowClick
    	});

    	$$self.$inject_state = $$props => {
    		if ("gridColumnStart" in $$props) $$invalidate(2, gridColumnStart = $$props.gridColumnStart);
    		if ("gridColumnEnd" in $$props) $$invalidate(3, gridColumnEnd = $$props.gridColumnEnd);
    		if ("gridRowStart" in $$props) $$invalidate(4, gridRowStart = $$props.gridRowStart);
    		if ("gridRowEnd" in $$props) $$invalidate(5, gridRowEnd = $$props.gridRowEnd);
    		if ("backgroundColor" in $$props) $$invalidate(6, backgroundColor = $$props.backgroundColor);
    		if ("title" in $$props) $$invalidate(7, title = $$props.title);
    		if ("enlargeable" in $$props) $$invalidate(8, enlargeable = $$props.enlargeable);
    		if ("id" in $$props) $$invalidate(13, id = $$props.id);
    		if ("isInForeground" in $$props) $$invalidate(0, isInForeground = $$props.isInForeground);
    		if ("intersections" in $$props) $$invalidate(14, intersections = $$props.intersections);
    		if ("intersectingSide" in $$props) $$invalidate(9, intersectingSide = $$props.intersectingSide);
    		if ("distanceFromIntersection" in $$props) $$invalidate(1, distanceFromIntersection = $$props.distanceFromIntersection);
    		if ("touched" in $$props) $$invalidate(10, touched = $$props.touched);
    		if ("zIndex" in $$props) $$invalidate(11, zIndex = $$props.zIndex);
    		if ("thisWindowObject" in $$props) thisWindowObject = $$props.thisWindowObject;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		isInForeground,
    		distanceFromIntersection,
    		gridColumnStart,
    		gridColumnEnd,
    		gridRowStart,
    		gridRowEnd,
    		backgroundColor,
    		title,
    		enlargeable,
    		intersectingSide,
    		touched,
    		zIndex,
    		handleWindowClick,
    		id,
    		intersections,
    		$$scope,
    		slots
    	];
    }

    class WindowElement extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {
    			gridColumnStart: 2,
    			gridColumnEnd: 3,
    			gridRowStart: 4,
    			gridRowEnd: 5,
    			backgroundColor: 6,
    			title: 7,
    			enlargeable: 8,
    			id: 13,
    			isInForeground: 0,
    			intersections: 14,
    			intersectingSide: 9,
    			distanceFromIntersection: 1
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "WindowElement",
    			options,
    			id: create_fragment$3.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*gridColumnStart*/ ctx[2] === undefined && !("gridColumnStart" in props)) {
    			console.warn("<WindowElement> was created without expected prop 'gridColumnStart'");
    		}

    		if (/*gridColumnEnd*/ ctx[3] === undefined && !("gridColumnEnd" in props)) {
    			console.warn("<WindowElement> was created without expected prop 'gridColumnEnd'");
    		}

    		if (/*gridRowStart*/ ctx[4] === undefined && !("gridRowStart" in props)) {
    			console.warn("<WindowElement> was created without expected prop 'gridRowStart'");
    		}

    		if (/*gridRowEnd*/ ctx[5] === undefined && !("gridRowEnd" in props)) {
    			console.warn("<WindowElement> was created without expected prop 'gridRowEnd'");
    		}

    		if (/*title*/ ctx[7] === undefined && !("title" in props)) {
    			console.warn("<WindowElement> was created without expected prop 'title'");
    		}

    		if (/*id*/ ctx[13] === undefined && !("id" in props)) {
    			console.warn("<WindowElement> was created without expected prop 'id'");
    		}
    	}

    	get gridColumnStart() {
    		throw new Error("<WindowElement>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set gridColumnStart(value) {
    		throw new Error("<WindowElement>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get gridColumnEnd() {
    		throw new Error("<WindowElement>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set gridColumnEnd(value) {
    		throw new Error("<WindowElement>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get gridRowStart() {
    		throw new Error("<WindowElement>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set gridRowStart(value) {
    		throw new Error("<WindowElement>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get gridRowEnd() {
    		throw new Error("<WindowElement>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set gridRowEnd(value) {
    		throw new Error("<WindowElement>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get backgroundColor() {
    		throw new Error("<WindowElement>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set backgroundColor(value) {
    		throw new Error("<WindowElement>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<WindowElement>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<WindowElement>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get enlargeable() {
    		throw new Error("<WindowElement>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set enlargeable(value) {
    		throw new Error("<WindowElement>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get id() {
    		throw new Error("<WindowElement>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<WindowElement>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isInForeground() {
    		throw new Error("<WindowElement>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isInForeground(value) {
    		throw new Error("<WindowElement>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get intersections() {
    		throw new Error("<WindowElement>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set intersections(value) {
    		throw new Error("<WindowElement>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get intersectingSide() {
    		throw new Error("<WindowElement>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set intersectingSide(value) {
    		throw new Error("<WindowElement>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get distanceFromIntersection() {
    		throw new Error("<WindowElement>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set distanceFromIntersection(value) {
    		throw new Error("<WindowElement>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Windows/AboutWindow.svelte generated by Svelte v3.32.1 */
    const file$3 = "src/Windows/AboutWindow.svelte";

    // (5:0) <WindowElement     gridColumnStart={135}     gridColumnEnd={165}     gridRowStart={125}     gridRowEnd={165}     backgroundColor="#A25C24"     title="ABOUT"     id={0}     isInForeground={true}     intersections={[1]}     intersectingSide="left"     distanceFromIntersection={15} >
    function create_default_slot(ctx) {
    	let p;
    	let t0;
    	let br0;
    	let t1;
    	let br1;
    	let t2;
    	let br2;
    	let t3;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t0 = text("NICE ");
    			br0 = element("br");
    			t1 = text(" TO");
    			br1 = element("br");
    			t2 = text(" MEET");
    			br2 = element("br");
    			t3 = text(" YOU");
    			add_location(br0, file$3, 17, 12, 374);
    			add_location(br1, file$3, 17, 21, 383);
    			add_location(br2, file$3, 17, 32, 394);
    			attr_dev(p, "class", "svelte-7j3tzn");
    			add_location(p, file$3, 17, 4, 366);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t0);
    			append_dev(p, br0);
    			append_dev(p, t1);
    			append_dev(p, br1);
    			append_dev(p, t2);
    			append_dev(p, br2);
    			append_dev(p, t3);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(5:0) <WindowElement     gridColumnStart={135}     gridColumnEnd={165}     gridRowStart={125}     gridRowEnd={165}     backgroundColor=\\\"#A25C24\\\"     title=\\\"ABOUT\\\"     id={0}     isInForeground={true}     intersections={[1]}     intersectingSide=\\\"left\\\"     distanceFromIntersection={15} >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let windowelement;
    	let current;

    	windowelement = new WindowElement({
    			props: {
    				gridColumnStart: 135,
    				gridColumnEnd: 165,
    				gridRowStart: 125,
    				gridRowEnd: 165,
    				backgroundColor: "#A25C24",
    				title: "ABOUT",
    				id: 0,
    				isInForeground: true,
    				intersections: [1],
    				intersectingSide: "left",
    				distanceFromIntersection: 15,
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(windowelement.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(windowelement, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const windowelement_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				windowelement_changes.$$scope = { dirty, ctx };
    			}

    			windowelement.$set(windowelement_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(windowelement.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(windowelement.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(windowelement, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("AboutWindow", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<AboutWindow> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ WindowElement });
    	return [];
    }

    class AboutWindow extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "AboutWindow",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src/Windows/ProjectCorazon.svelte generated by Svelte v3.32.1 */
    const file$4 = "src/Windows/ProjectCorazon.svelte";

    // (11:0) <WindowElement     gridColumnStart={110}     gridColumnEnd={150}     gridRowStart={135}     gridRowEnd={185}     title="PROJECT_01"     id={1}     isInForeground={false}     intersections={[0]}     intersectingSide="right"     distanceFromIntersection={15} >
    function create_default_slot$1(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			attr_dev(img, "sizes", "" + (/*pixelWidth*/ ctx[0] + "px"));
    			attr_dev(img, "srcset", "https://res.cloudinary.com/thdrstnr/image/upload/w_960,f_auto/" + slug + " 960w,\n    https://res.cloudinary.com/thdrstnr/image/upload/w_480,f_auto/" + slug + " 480w,\n    https://res.cloudinary.com/thdrstnr/image/upload/w_240,f_auto/" + slug + " 240w,");
    			if (img.src !== (img_src_value = "https://res.cloudinary.com/thdrstnr/image/upload/w_960,f_auto/" + slug)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "Con Corazón is embracing artisans from countries at war");
    			attr_dev(img, "class", "svelte-1f14wb7");
    			add_location(img, file$4, 22, 4, 591);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$1.name,
    		type: "slot",
    		source: "(11:0) <WindowElement     gridColumnStart={110}     gridColumnEnd={150}     gridRowStart={135}     gridRowEnd={185}     title=\\\"PROJECT_01\\\"     id={1}     isInForeground={false}     intersections={[0]}     intersectingSide=\\\"right\\\"     distanceFromIntersection={15} >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let windowelement;
    	let current;

    	windowelement = new WindowElement({
    			props: {
    				gridColumnStart: 110,
    				gridColumnEnd: 150,
    				gridRowStart: 135,
    				gridRowEnd: 185,
    				title: "PROJECT_01",
    				id: 1,
    				isInForeground: false,
    				intersections: [0],
    				intersectingSide: "right",
    				distanceFromIntersection: 15,
    				$$slots: { default: [create_default_slot$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(windowelement.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(windowelement, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const windowelement_changes = {};

    			if (dirty & /*$$scope*/ 4) {
    				windowelement_changes.$$scope = { dirty, ctx };
    			}

    			windowelement.$set(windowelement_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(windowelement.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(windowelement.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(windowelement, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const slug = "MortimerBaltus/Projects/ConCorazon_mksjj0";

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("ProjectCorazon", slots, []);

    	const maxPixels = window.innerWidth > window.innerHeight
    	? window.innerWidth
    	: window.innerHeight;

    	const pixelWidth = Math.ceil(maxPixels * 0.6);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ProjectCorazon> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		WindowElement,
    		maxPixels,
    		pixelWidth,
    		slug
    	});

    	return [pixelWidth];
    }

    class ProjectCorazon extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ProjectCorazon",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    /* src/Windows/ProjectRaceworx.svelte generated by Svelte v3.32.1 */
    const file$5 = "src/Windows/ProjectRaceworx.svelte";

    // (11:0) <WindowElement     gridColumnStart={30}     gridColumnEnd={80}     gridRowStart={140}     gridRowEnd={175}     title="PROJECT_02"     id={2}     isInForeground={false}     intersections={[7]}     intersectingSide="left"     distanceFromIntersection={15} >
    function create_default_slot$2(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			attr_dev(img, "sizes", "" + (/*pixelWidth*/ ctx[0] + "px"));
    			attr_dev(img, "srcset", "https://res.cloudinary.com/thdrstnr/image/upload/w_1280,f_auto/" + slug$1 + " 1280w,\n    https://res.cloudinary.com/thdrstnr/image/upload/w_640,f_auto/" + slug$1 + " 640w,\n    https://res.cloudinary.com/thdrstnr/image/upload/w_320,f_auto/" + slug$1 + " 320w,");
    			attr_dev(img, "alt", "Raceworx");
    			if (img.src !== (img_src_value = "https://res.cloudinary.com/thdrstnr/image/upload/w_1280,f_auto/" + slug$1)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "class", "svelte-1l4kmho");
    			add_location(img, file$5, 22, 4, 586);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$2.name,
    		type: "slot",
    		source: "(11:0) <WindowElement     gridColumnStart={30}     gridColumnEnd={80}     gridRowStart={140}     gridRowEnd={175}     title=\\\"PROJECT_02\\\"     id={2}     isInForeground={false}     intersections={[7]}     intersectingSide=\\\"left\\\"     distanceFromIntersection={15} >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
    	let windowelement;
    	let current;

    	windowelement = new WindowElement({
    			props: {
    				gridColumnStart: 30,
    				gridColumnEnd: 80,
    				gridRowStart: 140,
    				gridRowEnd: 175,
    				title: "PROJECT_02",
    				id: 2,
    				isInForeground: false,
    				intersections: [7],
    				intersectingSide: "left",
    				distanceFromIntersection: 15,
    				$$slots: { default: [create_default_slot$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(windowelement.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(windowelement, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const windowelement_changes = {};

    			if (dirty & /*$$scope*/ 4) {
    				windowelement_changes.$$scope = { dirty, ctx };
    			}

    			windowelement.$set(windowelement_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(windowelement.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(windowelement.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(windowelement, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const slug$1 = "MortimerBaltus/Projects/Raceworx_wfjyou";

    function instance$6($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("ProjectRaceworx", slots, []);

    	const maxPixels = window.innerWidth > window.innerHeight
    	? window.innerWidth
    	: window.innerHeight;

    	const pixelWidth = Math.ceil(maxPixels * 0.5);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ProjectRaceworx> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		WindowElement,
    		maxPixels,
    		pixelWidth,
    		slug: slug$1
    	});

    	return [pixelWidth];
    }

    class ProjectRaceworx extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ProjectRaceworx",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    /* src/Windows/ProjectMueller.svelte generated by Svelte v3.32.1 */
    const file$6 = "src/Windows/ProjectMueller.svelte";

    // (11:0) <WindowElement     gridColumnStart={50}     gridColumnEnd={90}     gridRowStart={15}     gridRowEnd={55}     title="PROJECT_03"     id={3}     isInForeground={true}     intersections={[10]}     intersectingSide="left"     distanceFromIntersection={10} >
    function create_default_slot$3(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			attr_dev(img, "sizes", "" + (/*pixelWidth*/ ctx[0] + "px"));
    			attr_dev(img, "srcset", "https://res.cloudinary.com/thdrstnr/image/upload/w_960,f_auto/" + slug$2 + " 960w,\n    https://res.cloudinary.com/thdrstnr/image/upload/w_480,f_auto/" + slug$2 + " 480w,\n    https://res.cloudinary.com/thdrstnr/image/upload/w_240,f_auto/" + slug$2 + " 240w,");
    			if (img.src !== (img_src_value = "https://res.cloudinary.com/thdrstnr/image/upload/w_960,f_auto/" + slug$2)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "Eberhard Müller develops sophisticated textile interiors at the highest level");
    			attr_dev(img, "class", "svelte-gsvp6s");
    			add_location(img, file$6, 22, 4, 591);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$3.name,
    		type: "slot",
    		source: "(11:0) <WindowElement     gridColumnStart={50}     gridColumnEnd={90}     gridRowStart={15}     gridRowEnd={55}     title=\\\"PROJECT_03\\\"     id={3}     isInForeground={true}     intersections={[10]}     intersectingSide=\\\"left\\\"     distanceFromIntersection={10} >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$7(ctx) {
    	let windowelement;
    	let current;

    	windowelement = new WindowElement({
    			props: {
    				gridColumnStart: 50,
    				gridColumnEnd: 90,
    				gridRowStart: 15,
    				gridRowEnd: 55,
    				title: "PROJECT_03",
    				id: 3,
    				isInForeground: true,
    				intersections: [10],
    				intersectingSide: "left",
    				distanceFromIntersection: 10,
    				$$slots: { default: [create_default_slot$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(windowelement.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(windowelement, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const windowelement_changes = {};

    			if (dirty & /*$$scope*/ 4) {
    				windowelement_changes.$$scope = { dirty, ctx };
    			}

    			windowelement.$set(windowelement_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(windowelement.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(windowelement.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(windowelement, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const slug$2 = "MortimerBaltus/Projects/EberhardMueller_v2tpxi";

    function instance$7($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("ProjectMueller", slots, []);

    	const maxPixels = window.innerWidth > window.innerHeight
    	? window.innerWidth
    	: window.innerHeight;

    	const pixelWidth = Math.ceil(maxPixels * 0.4);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ProjectMueller> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		WindowElement,
    		maxPixels,
    		pixelWidth,
    		slug: slug$2
    	});

    	return [pixelWidth];
    }

    class ProjectMueller extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ProjectMueller",
    			options,
    			id: create_fragment$7.name
    		});
    	}
    }

    /* src/Windows/CookieWindow.svelte generated by Svelte v3.32.1 */
    const file$7 = "src/Windows/CookieWindow.svelte";

    // (5:0) <WindowElement     gridColumnStart={40}     gridColumnEnd={70}     gridRowStart={65}     gridRowEnd={90}     backgroundColor="#5E4B1B"     title="COOKIES"     enlargeable={false}     id={9}     isInForeground={true}     intersections={[8]}     intersectingSide="left"     distanceFromIntersection={21} >
    function create_default_slot$4(ctx) {
    	let p;
    	let t0;
    	let br;
    	let t1;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t0 = text("We use necessary cookies to ensure visitors have the best possible\n        experience on our site. Your privacy is important to us, therefore we\n        don’t use any tracking services by third-parties. ");
    			br = element("br");
    			t1 = text(" Please read our\n        Privacy Policy for more info on this");
    			add_location(br, file$7, 21, 58, 603);
    			attr_dev(p, "class", "svelte-4hcv6a");
    			add_location(p, file$7, 18, 4, 388);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t0);
    			append_dev(p, br);
    			append_dev(p, t1);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$4.name,
    		type: "slot",
    		source: "(5:0) <WindowElement     gridColumnStart={40}     gridColumnEnd={70}     gridRowStart={65}     gridRowEnd={90}     backgroundColor=\\\"#5E4B1B\\\"     title=\\\"COOKIES\\\"     enlargeable={false}     id={9}     isInForeground={true}     intersections={[8]}     intersectingSide=\\\"left\\\"     distanceFromIntersection={21} >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$8(ctx) {
    	let windowelement;
    	let current;

    	windowelement = new WindowElement({
    			props: {
    				gridColumnStart: 40,
    				gridColumnEnd: 70,
    				gridRowStart: 65,
    				gridRowEnd: 90,
    				backgroundColor: "#5E4B1B",
    				title: "COOKIES",
    				enlargeable: false,
    				id: 9,
    				isInForeground: true,
    				intersections: [8],
    				intersectingSide: "left",
    				distanceFromIntersection: 21,
    				$$slots: { default: [create_default_slot$4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(windowelement.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(windowelement, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const windowelement_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				windowelement_changes.$$scope = { dirty, ctx };
    			}

    			windowelement.$set(windowelement_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(windowelement.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(windowelement.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(windowelement, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("CookieWindow", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<CookieWindow> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ WindowElement });
    	return [];
    }

    class CookieWindow extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CookieWindow",
    			options,
    			id: create_fragment$8.name
    		});
    	}
    }

    /* src/windows/LegalWindow.svelte generated by Svelte v3.32.1 */
    const file$8 = "src/windows/LegalWindow.svelte";

    // (5:0) <WindowElement     gridColumnStart={5}     gridColumnEnd={45}     gridRowStart={165}     gridRowEnd={185}     backgroundColor="#1C6370"     title="LEGAL NOTICE"     id={7}     isInForeground={true}     intersections={[2]}     intersectingSide="right"     distanceFromIntersection={15} >
    function create_default_slot$5(ctx) {
    	let p;
    	let t0;
    	let br0;
    	let br1;
    	let t1;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t0 = text("You like boring legal texts and bureaucracy? ");
    			br0 = element("br");
    			br1 = element("br");
    			t1 = text(" We've got you covered!");
    			add_location(br0, file$8, 18, 53, 428);
    			add_location(br1, file$8, 18, 59, 434);
    			attr_dev(p, "class", "svelte-11owopy");
    			add_location(p, file$8, 17, 4, 371);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t0);
    			append_dev(p, br0);
    			append_dev(p, br1);
    			append_dev(p, t1);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$5.name,
    		type: "slot",
    		source: "(5:0) <WindowElement     gridColumnStart={5}     gridColumnEnd={45}     gridRowStart={165}     gridRowEnd={185}     backgroundColor=\\\"#1C6370\\\"     title=\\\"LEGAL NOTICE\\\"     id={7}     isInForeground={true}     intersections={[2]}     intersectingSide=\\\"right\\\"     distanceFromIntersection={15} >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$9(ctx) {
    	let windowelement;
    	let current;

    	windowelement = new WindowElement({
    			props: {
    				gridColumnStart: 5,
    				gridColumnEnd: 45,
    				gridRowStart: 165,
    				gridRowEnd: 185,
    				backgroundColor: "#1C6370",
    				title: "LEGAL NOTICE",
    				id: 7,
    				isInForeground: true,
    				intersections: [2],
    				intersectingSide: "right",
    				distanceFromIntersection: 15,
    				$$slots: { default: [create_default_slot$5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(windowelement.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(windowelement, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const windowelement_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				windowelement_changes.$$scope = { dirty, ctx };
    			}

    			windowelement.$set(windowelement_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(windowelement.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(windowelement.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(windowelement, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("LegalWindow", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<LegalWindow> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ WindowElement });
    	return [];
    }

    class LegalWindow extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "LegalWindow",
    			options,
    			id: create_fragment$9.name
    		});
    	}
    }

    /* src/Windows/PrivacyWindow.svelte generated by Svelte v3.32.1 */
    const file$9 = "src/Windows/PrivacyWindow.svelte";

    // (5:0) <WindowElement     gridColumnStart={158}     gridColumnEnd={198}     gridRowStart={173}     gridRowEnd={198}     backgroundColor="#FEC7A3"     title="PRIVACY POLICY"     id={5}     isInForeground={true} >
    function create_default_slot$6(ctx) {
    	let p;
    	let t0;
    	let br0;
    	let br1;
    	let t1;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t0 = text("Eager to find out how browser-data is handled on our Website? ");
    			br0 = element("br");
    			br1 = element("br");
    			t1 = text(" Surely this is just your cup of tea...");
    			add_location(br0, file$9, 15, 70, 363);
    			add_location(br1, file$9, 15, 76, 369);
    			attr_dev(p, "class", "svelte-11owopy");
    			add_location(p, file$9, 14, 4, 289);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t0);
    			append_dev(p, br0);
    			append_dev(p, br1);
    			append_dev(p, t1);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$6.name,
    		type: "slot",
    		source: "(5:0) <WindowElement     gridColumnStart={158}     gridColumnEnd={198}     gridRowStart={173}     gridRowEnd={198}     backgroundColor=\\\"#FEC7A3\\\"     title=\\\"PRIVACY POLICY\\\"     id={5}     isInForeground={true} >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$a(ctx) {
    	let windowelement;
    	let current;

    	windowelement = new WindowElement({
    			props: {
    				gridColumnStart: 158,
    				gridColumnEnd: 198,
    				gridRowStart: 173,
    				gridRowEnd: 198,
    				backgroundColor: "#FEC7A3",
    				title: "PRIVACY POLICY",
    				id: 5,
    				isInForeground: true,
    				$$slots: { default: [create_default_slot$6] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(windowelement.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(windowelement, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const windowelement_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				windowelement_changes.$$scope = { dirty, ctx };
    			}

    			windowelement.$set(windowelement_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(windowelement.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(windowelement.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(windowelement, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("PrivacyWindow", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<PrivacyWindow> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ WindowElement });
    	return [];
    }

    class PrivacyWindow extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "PrivacyWindow",
    			options,
    			id: create_fragment$a.name
    		});
    	}
    }

    /* src/Windows/ReferencesWindow.svelte generated by Svelte v3.32.1 */
    const file$a = "src/Windows/ReferencesWindow.svelte";

    // (5:0) <WindowElement     gridColumnStart={159}     gridColumnEnd={199}     gridRowStart={25}     gridRowEnd={75}     backgroundColor="#5F583D"     title="References"     enlargeable={false}     id={4}     isInForeground={true}     intersections={[11]}     intersectingSide="left"     distanceFromIntersection={31} >
    function create_default_slot$7(ctx) {
    	let ul;
    	let li0;
    	let a0;
    	let t1;
    	let li1;
    	let a1;
    	let t3;
    	let li2;
    	let a2;
    	let t5;
    	let li3;
    	let a3;
    	let t7;
    	let li4;
    	let a4;
    	let t9;
    	let li5;
    	let a5;
    	let t11;
    	let li6;
    	let a6;
    	let t13;
    	let li7;
    	let a7;
    	let t15;
    	let li8;
    	let a8;
    	let t17;
    	let li9;
    	let a9;
    	let t19;
    	let li10;
    	let a10;
    	let t21;
    	let li11;
    	let a11;
    	let t23;
    	let li12;
    	let a12;

    	const block = {
    		c: function create() {
    			ul = element("ul");
    			li0 = element("li");
    			a0 = element("a");
    			a0.textContent = "Bureau Johannes Erler";
    			t1 = space();
    			li1 = element("li");
    			a1 = element("a");
    			a1.textContent = "CarlNann";
    			t3 = space();
    			li2 = element("li");
    			a2 = element("a");
    			a2.textContent = "Con Corazón";
    			t5 = space();
    			li3 = element("li");
    			a3 = element("a");
    			a3.textContent = "Düsseldorfer Schauspielhaus";
    			t7 = space();
    			li4 = element("li");
    			a4 = element("a");
    			a4.textContent = "Eberhard Müller Consulting";
    			t9 = space();
    			li5 = element("li");
    			a5 = element("a");
    			a5.textContent = "Fargo";
    			t11 = space();
    			li6 = element("li");
    			a6 = element("a");
    			a6.textContent = "Konica Minolta";
    			t13 = space();
    			li7 = element("li");
    			a7 = element("a");
    			a7.textContent = "Morgenbladet";
    			t15 = space();
    			li8 = element("li");
    			a8 = element("a");
    			a8.textContent = "Otto Group";
    			t17 = space();
    			li9 = element("li");
    			a9 = element("a");
    			a9.textContent = "Staatsschauspielhaus Dresden";
    			t19 = space();
    			li10 = element("li");
    			a10 = element("a");
    			a10.textContent = "Steiner Am Fluss";
    			t21 = space();
    			li11 = element("li");
    			a11 = element("a");
    			a11.textContent = "Suhrkamp";
    			t23 = space();
    			li12 = element("li");
    			a12 = element("a");
    			a12.textContent = "Zoeva";
    			attr_dev(a0, "href", "www.reference.com");
    			attr_dev(a0, "class", "svelte-56pd5y");
    			add_location(a0, file$a, 19, 12, 411);
    			attr_dev(li0, "class", "svelte-56pd5y");
    			add_location(li0, file$a, 19, 8, 407);
    			attr_dev(a1, "href", "www.reference.com");
    			attr_dev(a1, "class", "svelte-56pd5y");
    			add_location(a1, file$a, 20, 12, 482);
    			attr_dev(li1, "class", "svelte-56pd5y");
    			add_location(li1, file$a, 20, 8, 478);
    			attr_dev(a2, "href", "www.reference.com");
    			attr_dev(a2, "class", "svelte-56pd5y");
    			add_location(a2, file$a, 21, 12, 540);
    			attr_dev(li2, "class", "svelte-56pd5y");
    			add_location(li2, file$a, 21, 8, 536);
    			attr_dev(a3, "href", "www.reference.com");
    			attr_dev(a3, "class", "svelte-56pd5y");
    			add_location(a3, file$a, 23, 12, 614);
    			attr_dev(li3, "class", "svelte-56pd5y");
    			add_location(li3, file$a, 22, 8, 597);
    			attr_dev(a4, "href", "www.reference.com");
    			attr_dev(a4, "class", "svelte-56pd5y");
    			add_location(a4, file$a, 25, 12, 700);
    			attr_dev(li4, "class", "svelte-56pd5y");
    			add_location(li4, file$a, 25, 8, 696);
    			attr_dev(a5, "href", "www.reference.com");
    			attr_dev(a5, "class", "svelte-56pd5y");
    			add_location(a5, file$a, 26, 12, 776);
    			attr_dev(li5, "class", "svelte-56pd5y");
    			add_location(li5, file$a, 26, 8, 772);
    			attr_dev(a6, "href", "www.reference.com");
    			attr_dev(a6, "class", "svelte-56pd5y");
    			add_location(a6, file$a, 27, 12, 831);
    			attr_dev(li6, "class", "svelte-56pd5y");
    			add_location(li6, file$a, 27, 8, 827);
    			attr_dev(a7, "href", "www.reference.com");
    			attr_dev(a7, "class", "svelte-56pd5y");
    			add_location(a7, file$a, 28, 12, 895);
    			attr_dev(li7, "class", "svelte-56pd5y");
    			add_location(li7, file$a, 28, 8, 891);
    			attr_dev(a8, "href", "www.reference.com");
    			attr_dev(a8, "class", "svelte-56pd5y");
    			add_location(a8, file$a, 29, 12, 957);
    			attr_dev(li8, "class", "svelte-56pd5y");
    			add_location(li8, file$a, 29, 8, 953);
    			attr_dev(a9, "href", "www.reference.com");
    			attr_dev(a9, "class", "svelte-56pd5y");
    			add_location(a9, file$a, 31, 12, 1030);
    			attr_dev(li9, "class", "svelte-56pd5y");
    			add_location(li9, file$a, 30, 8, 1013);
    			attr_dev(a10, "href", "www.reference.com");
    			attr_dev(a10, "class", "svelte-56pd5y");
    			add_location(a10, file$a, 33, 12, 1117);
    			attr_dev(li10, "class", "svelte-56pd5y");
    			add_location(li10, file$a, 33, 8, 1113);
    			attr_dev(a11, "href", "www.reference.com");
    			attr_dev(a11, "class", "svelte-56pd5y");
    			add_location(a11, file$a, 34, 12, 1183);
    			attr_dev(li11, "class", "svelte-56pd5y");
    			add_location(li11, file$a, 34, 8, 1179);
    			attr_dev(a12, "href", "www.reference.com");
    			attr_dev(a12, "class", "svelte-56pd5y");
    			add_location(a12, file$a, 35, 12, 1241);
    			attr_dev(li12, "class", "svelte-56pd5y");
    			add_location(li12, file$a, 35, 8, 1237);
    			attr_dev(ul, "class", "svelte-56pd5y");
    			add_location(ul, file$a, 18, 4, 394);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, ul, anchor);
    			append_dev(ul, li0);
    			append_dev(li0, a0);
    			append_dev(ul, t1);
    			append_dev(ul, li1);
    			append_dev(li1, a1);
    			append_dev(ul, t3);
    			append_dev(ul, li2);
    			append_dev(li2, a2);
    			append_dev(ul, t5);
    			append_dev(ul, li3);
    			append_dev(li3, a3);
    			append_dev(ul, t7);
    			append_dev(ul, li4);
    			append_dev(li4, a4);
    			append_dev(ul, t9);
    			append_dev(ul, li5);
    			append_dev(li5, a5);
    			append_dev(ul, t11);
    			append_dev(ul, li6);
    			append_dev(li6, a6);
    			append_dev(ul, t13);
    			append_dev(ul, li7);
    			append_dev(li7, a7);
    			append_dev(ul, t15);
    			append_dev(ul, li8);
    			append_dev(li8, a8);
    			append_dev(ul, t17);
    			append_dev(ul, li9);
    			append_dev(li9, a9);
    			append_dev(ul, t19);
    			append_dev(ul, li10);
    			append_dev(li10, a10);
    			append_dev(ul, t21);
    			append_dev(ul, li11);
    			append_dev(li11, a11);
    			append_dev(ul, t23);
    			append_dev(ul, li12);
    			append_dev(li12, a12);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(ul);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$7.name,
    		type: "slot",
    		source: "(5:0) <WindowElement     gridColumnStart={159}     gridColumnEnd={199}     gridRowStart={25}     gridRowEnd={75}     backgroundColor=\\\"#5F583D\\\"     title=\\\"References\\\"     enlargeable={false}     id={4}     isInForeground={true}     intersections={[11]}     intersectingSide=\\\"left\\\"     distanceFromIntersection={31} >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$b(ctx) {
    	let windowelement;
    	let current;

    	windowelement = new WindowElement({
    			props: {
    				gridColumnStart: 159,
    				gridColumnEnd: 199,
    				gridRowStart: 25,
    				gridRowEnd: 75,
    				backgroundColor: "#5F583D",
    				title: "References",
    				enlargeable: false,
    				id: 4,
    				isInForeground: true,
    				intersections: [11],
    				intersectingSide: "left",
    				distanceFromIntersection: 31,
    				$$slots: { default: [create_default_slot$7] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(windowelement.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(windowelement, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const windowelement_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				windowelement_changes.$$scope = { dirty, ctx };
    			}

    			windowelement.$set(windowelement_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(windowelement.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(windowelement.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(windowelement, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$b($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("ReferencesWindow", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ReferencesWindow> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ WindowElement });
    	return [];
    }

    class ReferencesWindow extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$b, create_fragment$b, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ReferencesWindow",
    			options,
    			id: create_fragment$b.name
    		});
    	}
    }

    /* src/Windows/GermanyJPG.svelte generated by Svelte v3.32.1 */
    const file$b = "src/Windows/GermanyJPG.svelte";

    // (19:0) <WindowElement     gridColumnStart={130}     gridColumnEnd={190}     gridRowStart={1}     gridRowEnd={41}     title={deGallery[randomIndex].name}     id={11}     isInForeground={false}     intersections={[4]}     intersectingSide="right"     distanceFromIntersection={31} >
    function create_default_slot$8(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			attr_dev(img, "sizes", "" + (/*pixelWidth*/ ctx[0] + "px"));
    			attr_dev(img, "srcset", "https://res.cloudinary.com/thdrstnr/image/upload/w_1280,f_auto/" + /*slug*/ ctx[3] + " 1280w,\n    https://res.cloudinary.com/thdrstnr/image/upload/w_640,f_auto/" + /*slug*/ ctx[3] + " 640w,\n    https://res.cloudinary.com/thdrstnr/image/upload/w_320,f_auto/" + /*slug*/ ctx[3] + " 320w,");
    			if (img.src !== (img_src_value = "https://res.cloudinary.com/thdrstnr/image/upload/w_1280,f_auto/" + /*slug*/ ctx[3])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", /*deGallery*/ ctx[1][/*randomIndex*/ ctx[2]].alt);
    			attr_dev(img, "class", "svelte-1kqr49m");
    			add_location(img, file$b, 30, 4, 851);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$8.name,
    		type: "slot",
    		source: "(19:0) <WindowElement     gridColumnStart={130}     gridColumnEnd={190}     gridRowStart={1}     gridRowEnd={41}     title={deGallery[randomIndex].name}     id={11}     isInForeground={false}     intersections={[4]}     intersectingSide=\\\"right\\\"     distanceFromIntersection={31} >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$c(ctx) {
    	let windowelement;
    	let current;

    	windowelement = new WindowElement({
    			props: {
    				gridColumnStart: 130,
    				gridColumnEnd: 190,
    				gridRowStart: 1,
    				gridRowEnd: 41,
    				title: /*deGallery*/ ctx[1][/*randomIndex*/ ctx[2]].name,
    				id: 11,
    				isInForeground: false,
    				intersections: [4],
    				intersectingSide: "right",
    				distanceFromIntersection: 31,
    				$$slots: { default: [create_default_slot$8] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(windowelement.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(windowelement, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const windowelement_changes = {};

    			if (dirty & /*$$scope*/ 32) {
    				windowelement_changes.$$scope = { dirty, ctx };
    			}

    			windowelement.$set(windowelement_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(windowelement.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(windowelement.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(windowelement, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$c.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$c($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("GermanyJPG", slots, []);

    	const maxPixels = window.innerWidth > window.innerHeight
    	? window.innerWidth
    	: window.innerHeight;

    	const pixelWidth = Math.ceil(maxPixels * 0.6);

    	const deGallery = [
    		{
    			name: "OBERHAFEN.JPG",
    			src: "/MortimerBaltus/deGallery/Oberhafen_c5hvmx",
    			alt: "Oberhafen, Hamburg (DE)"
    		}
    	];

    	var randomIndex = Math.floor(Math.random() * deGallery.length);
    	const slug = deGallery[randomIndex].src;
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<GermanyJPG> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		WindowElement,
    		maxPixels,
    		pixelWidth,
    		deGallery,
    		randomIndex,
    		slug
    	});

    	$$self.$inject_state = $$props => {
    		if ("randomIndex" in $$props) $$invalidate(2, randomIndex = $$props.randomIndex);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [pixelWidth, deGallery, randomIndex, slug];
    }

    class GermanyJPG extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$c, create_fragment$c, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "GermanyJPG",
    			options,
    			id: create_fragment$c.name
    		});
    	}
    }

    /* src/Windows/JapanJPG.svelte generated by Svelte v3.32.1 */
    const file$c = "src/Windows/JapanJPG.svelte";

    // (29:0) <WindowElement     gridColumnStart={1}     gridColumnEnd={61}     gridRowStart={75}     gridRowEnd={115}     title={jpGallery[randomIndex].name}     id={8}     isInForeground={false}     intersections={[9]}     intersectingSide="right"     distanceFromIntersection={21} >
    function create_default_slot$9(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			attr_dev(img, "sizes", "" + (/*pixelWidth*/ ctx[0] + "px"));
    			attr_dev(img, "srcset", "https://res.cloudinary.com/thdrstnr/image/upload/w_1280,f_auto/" + /*slug*/ ctx[3] + " 1280w,\n    https://res.cloudinary.com/thdrstnr/image/upload/w_640,f_auto/" + /*slug*/ ctx[3] + " 640w,\n    https://res.cloudinary.com/thdrstnr/image/upload/w_320,f_auto/" + /*slug*/ ctx[3] + " 320w,");
    			if (img.src !== (img_src_value = "https://res.cloudinary.com/thdrstnr/image/upload/w_1280,f_auto/" + /*slug*/ ctx[3])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", /*jpGallery*/ ctx[1][/*randomIndex*/ ctx[2]].alt);
    			attr_dev(img, "class", "svelte-1ii9ruu");
    			add_location(img, file$c, 40, 4, 1178);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$9.name,
    		type: "slot",
    		source: "(29:0) <WindowElement     gridColumnStart={1}     gridColumnEnd={61}     gridRowStart={75}     gridRowEnd={115}     title={jpGallery[randomIndex].name}     id={8}     isInForeground={false}     intersections={[9]}     intersectingSide=\\\"right\\\"     distanceFromIntersection={21} >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$d(ctx) {
    	let windowelement;
    	let current;

    	windowelement = new WindowElement({
    			props: {
    				gridColumnStart: 1,
    				gridColumnEnd: 61,
    				gridRowStart: 75,
    				gridRowEnd: 115,
    				title: /*jpGallery*/ ctx[1][/*randomIndex*/ ctx[2]].name,
    				id: 8,
    				isInForeground: false,
    				intersections: [9],
    				intersectingSide: "right",
    				distanceFromIntersection: 21,
    				$$slots: { default: [create_default_slot$9] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(windowelement.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(windowelement, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const windowelement_changes = {};

    			if (dirty & /*$$scope*/ 32) {
    				windowelement_changes.$$scope = { dirty, ctx };
    			}

    			windowelement.$set(windowelement_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(windowelement.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(windowelement.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(windowelement, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$d.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$d($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("JapanJPG", slots, []);

    	const maxPixels = window.innerWidth > window.innerHeight
    	? window.innerWidth
    	: window.innerHeight;

    	const pixelWidth = Math.ceil(maxPixels * 0.6);

    	const jpGallery = [
    		{
    			name: "SHINJUKU.JPG",
    			src: "/MortimerBaltus/jpGallery/TokyoTaxi_zbokhg",
    			alt: "Shinjuku, Tokyo (JP)"
    		},
    		{
    			name: "TAXI.JPG",
    			src: "/MortimerBaltus/jpGallery/ShinjukuSakura_dgdj2h",
    			alt: "A cab in Tokyo (JP)"
    		},
    		{
    			name: "TRAINSTATION.JPG",
    			src: "/MortimerBaltus/jpGallery/TokyoTrainstation_sovh7s",
    			alt: "A Trainstation in Tokyo"
    		}
    	];

    	var randomIndex = Math.floor(Math.random() * jpGallery.length);
    	const slug = jpGallery[randomIndex].src;
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<JapanJPG> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		WindowElement,
    		maxPixels,
    		pixelWidth,
    		jpGallery,
    		randomIndex,
    		slug
    	});

    	$$self.$inject_state = $$props => {
    		if ("randomIndex" in $$props) $$invalidate(2, randomIndex = $$props.randomIndex);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [pixelWidth, jpGallery, randomIndex, slug];
    }

    class JapanJPG extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$d, create_fragment$d, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "JapanJPG",
    			options,
    			id: create_fragment$d.name
    		});
    	}
    }

    /* src/Windows/CleanCode.svelte generated by Svelte v3.32.1 */
    const file$d = "src/Windows/CleanCode.svelte";

    // (5:0) <WindowElement     gridColumnStart={20}     gridColumnEnd={60}     gridRowStart={2}     gridRowEnd={32}     backgroundColor="#7d7d7d"     title="CLEAN.CODE"     id={10}     isInForeground={false}     intersections={[3]}     intersectingSide="right"     distanceFromIntersection={10} >
    function create_default_slot$a(ctx) {
    	let p0;
    	let t0;
    	let br0;
    	let t1;
    	let t2;
    	let p1;
    	let t3;
    	let br1;
    	let br2;
    	let t4;
    	let p2;
    	let t5;
    	let br3;
    	let t6;
    	let p3;

    	const block = {
    		c: function create() {
    			p0 = element("p");
    			t0 = text("I suppose it is tempting, ");
    			br0 = element("br");
    			t1 = text(" if the only tool you have is a hammer, to\n        treat everything as if it were a nail.");
    			t2 = space();
    			p1 = element("p");
    			t3 = text("- Abraham Maslow ");
    			br1 = element("br");
    			br2 = element("br");
    			t4 = space();
    			p2 = element("p");
    			t5 = text("You wouldn't change a lightbulb with a hammer. ");
    			br3 = element("br");
    			t6 = space();
    			p3 = element("p");
    			p3.textContent = "We won't either.";
    			add_location(br0, file$d, 18, 34, 407);
    			attr_dev(p0, "class", "svelte-cql7tc");
    			add_location(p0, file$d, 17, 4, 369);
    			add_location(br1, file$d, 21, 43, 555);
    			add_location(br2, file$d, 21, 49, 561);
    			attr_dev(p1, "class", "text-right svelte-cql7tc");
    			add_location(p1, file$d, 21, 4, 516);
    			add_location(br3, file$d, 23, 55, 635);
    			attr_dev(p2, "class", "svelte-cql7tc");
    			add_location(p2, file$d, 22, 4, 576);
    			attr_dev(p3, "class", "text-right svelte-cql7tc");
    			add_location(p3, file$d, 25, 4, 655);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p0, anchor);
    			append_dev(p0, t0);
    			append_dev(p0, br0);
    			append_dev(p0, t1);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, p1, anchor);
    			append_dev(p1, t3);
    			append_dev(p1, br1);
    			append_dev(p1, br2);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, p2, anchor);
    			append_dev(p2, t5);
    			append_dev(p2, br3);
    			insert_dev(target, t6, anchor);
    			insert_dev(target, p3, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p0);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(p1);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(p2);
    			if (detaching) detach_dev(t6);
    			if (detaching) detach_dev(p3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$a.name,
    		type: "slot",
    		source: "(5:0) <WindowElement     gridColumnStart={20}     gridColumnEnd={60}     gridRowStart={2}     gridRowEnd={32}     backgroundColor=\\\"#7d7d7d\\\"     title=\\\"CLEAN.CODE\\\"     id={10}     isInForeground={false}     intersections={[3]}     intersectingSide=\\\"right\\\"     distanceFromIntersection={10} >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$e(ctx) {
    	let windowelement;
    	let current;

    	windowelement = new WindowElement({
    			props: {
    				gridColumnStart: 20,
    				gridColumnEnd: 60,
    				gridRowStart: 2,
    				gridRowEnd: 32,
    				backgroundColor: "#7d7d7d",
    				title: "CLEAN.CODE",
    				id: 10,
    				isInForeground: false,
    				intersections: [3],
    				intersectingSide: "right",
    				distanceFromIntersection: 10,
    				$$slots: { default: [create_default_slot$a] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(windowelement.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(windowelement, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const windowelement_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				windowelement_changes.$$scope = { dirty, ctx };
    			}

    			windowelement.$set(windowelement_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(windowelement.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(windowelement.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(windowelement, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$e.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$e($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("CleanCode", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<CleanCode> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ WindowElement });
    	return [];
    }

    class CleanCode extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$e, create_fragment$e, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CleanCode",
    			options,
    			id: create_fragment$e.name
    		});
    	}
    }

    /* src/Windows/Logopedia.svelte generated by Svelte v3.32.1 */
    const file$e = "src/Windows/Logopedia.svelte";

    // (5:0) <WindowElement     gridColumnStart={105}     gridColumnEnd={145}     gridRowStart={48}     gridRowEnd={78}     title="LOGOPEDIA.MP4"     enlargeable={false}     backgroundColor="#C4BDBD"     id={6}     isInForeground={true} >
    function create_default_slot$b(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			set_style(div, "background-image", "url('images/Logopedia.svg')");
    			attr_dev(div, "title", "Logo Portfolio");
    			attr_dev(div, "class", "svelte-1jc13f3");
    			add_location(div, file$e, 15, 4, 310);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$b.name,
    		type: "slot",
    		source: "(5:0) <WindowElement     gridColumnStart={105}     gridColumnEnd={145}     gridRowStart={48}     gridRowEnd={78}     title=\\\"LOGOPEDIA.MP4\\\"     enlargeable={false}     backgroundColor=\\\"#C4BDBD\\\"     id={6}     isInForeground={true} >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$f(ctx) {
    	let windowelement;
    	let current;

    	windowelement = new WindowElement({
    			props: {
    				gridColumnStart: 105,
    				gridColumnEnd: 145,
    				gridRowStart: 48,
    				gridRowEnd: 78,
    				title: "LOGOPEDIA.MP4",
    				enlargeable: false,
    				backgroundColor: "#C4BDBD",
    				id: 6,
    				isInForeground: true,
    				$$slots: { default: [create_default_slot$b] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(windowelement.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(windowelement, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const windowelement_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				windowelement_changes.$$scope = { dirty, ctx };
    			}

    			windowelement.$set(windowelement_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(windowelement.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(windowelement.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(windowelement, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$f.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$f($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Logopedia", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Logopedia> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ WindowElement });
    	return [];
    }

    class Logopedia extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$f, create_fragment$f, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Logopedia",
    			options,
    			id: create_fragment$f.name
    		});
    	}
    }

    /* src/App.svelte generated by Svelte v3.32.1 */
    const file$f = "src/App.svelte";

    function create_fragment$g(ctx) {
    	let cornermousescroller;
    	let t0;
    	let scrollslowdown;
    	let t1;
    	let main;
    	let heroview;
    	let t2;
    	let projectcorazon;
    	let t3;
    	let aboutwindow;
    	let t4;
    	let japanjpg;
    	let t5;
    	let cookiewindow;
    	let t6;
    	let projectraceworx;
    	let t7;
    	let legalwindow;
    	let t8;
    	let privacywindow;
    	let t9;
    	let cleancode;
    	let t10;
    	let projectmueller;
    	let t11;
    	let germanyjpg;
    	let t12;
    	let referenceswindow;
    	let t13;
    	let logopedia;
    	let current;
    	cornermousescroller = new CornerMouseScroller({ $$inline: true });
    	scrollslowdown = new ScrollSlowDown({ $$inline: true });
    	heroview = new HeroView({ $$inline: true });
    	projectcorazon = new ProjectCorazon({ $$inline: true });
    	aboutwindow = new AboutWindow({ $$inline: true });
    	japanjpg = new JapanJPG({ $$inline: true });
    	cookiewindow = new CookieWindow({ $$inline: true });
    	projectraceworx = new ProjectRaceworx({ $$inline: true });
    	legalwindow = new LegalWindow({ $$inline: true });
    	privacywindow = new PrivacyWindow({ $$inline: true });
    	cleancode = new CleanCode({ $$inline: true });
    	projectmueller = new ProjectMueller({ $$inline: true });
    	germanyjpg = new GermanyJPG({ $$inline: true });
    	referenceswindow = new ReferencesWindow({ $$inline: true });
    	logopedia = new Logopedia({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(cornermousescroller.$$.fragment);
    			t0 = space();
    			create_component(scrollslowdown.$$.fragment);
    			t1 = space();
    			main = element("main");
    			create_component(heroview.$$.fragment);
    			t2 = space();
    			create_component(projectcorazon.$$.fragment);
    			t3 = space();
    			create_component(aboutwindow.$$.fragment);
    			t4 = space();
    			create_component(japanjpg.$$.fragment);
    			t5 = space();
    			create_component(cookiewindow.$$.fragment);
    			t6 = space();
    			create_component(projectraceworx.$$.fragment);
    			t7 = space();
    			create_component(legalwindow.$$.fragment);
    			t8 = space();
    			create_component(privacywindow.$$.fragment);
    			t9 = space();
    			create_component(cleancode.$$.fragment);
    			t10 = space();
    			create_component(projectmueller.$$.fragment);
    			t11 = space();
    			create_component(germanyjpg.$$.fragment);
    			t12 = space();
    			create_component(referenceswindow.$$.fragment);
    			t13 = space();
    			create_component(logopedia.$$.fragment);
    			attr_dev(main, "class", "svelte-1cp1t04");
    			add_location(main, file$f, 21, 0, 940);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(cornermousescroller, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(scrollslowdown, target, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, main, anchor);
    			mount_component(heroview, main, null);
    			append_dev(main, t2);
    			mount_component(projectcorazon, main, null);
    			append_dev(main, t3);
    			mount_component(aboutwindow, main, null);
    			append_dev(main, t4);
    			mount_component(japanjpg, main, null);
    			append_dev(main, t5);
    			mount_component(cookiewindow, main, null);
    			append_dev(main, t6);
    			mount_component(projectraceworx, main, null);
    			append_dev(main, t7);
    			mount_component(legalwindow, main, null);
    			append_dev(main, t8);
    			mount_component(privacywindow, main, null);
    			append_dev(main, t9);
    			mount_component(cleancode, main, null);
    			append_dev(main, t10);
    			mount_component(projectmueller, main, null);
    			append_dev(main, t11);
    			mount_component(germanyjpg, main, null);
    			append_dev(main, t12);
    			mount_component(referenceswindow, main, null);
    			append_dev(main, t13);
    			mount_component(logopedia, main, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(cornermousescroller.$$.fragment, local);
    			transition_in(scrollslowdown.$$.fragment, local);
    			transition_in(heroview.$$.fragment, local);
    			transition_in(projectcorazon.$$.fragment, local);
    			transition_in(aboutwindow.$$.fragment, local);
    			transition_in(japanjpg.$$.fragment, local);
    			transition_in(cookiewindow.$$.fragment, local);
    			transition_in(projectraceworx.$$.fragment, local);
    			transition_in(legalwindow.$$.fragment, local);
    			transition_in(privacywindow.$$.fragment, local);
    			transition_in(cleancode.$$.fragment, local);
    			transition_in(projectmueller.$$.fragment, local);
    			transition_in(germanyjpg.$$.fragment, local);
    			transition_in(referenceswindow.$$.fragment, local);
    			transition_in(logopedia.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(cornermousescroller.$$.fragment, local);
    			transition_out(scrollslowdown.$$.fragment, local);
    			transition_out(heroview.$$.fragment, local);
    			transition_out(projectcorazon.$$.fragment, local);
    			transition_out(aboutwindow.$$.fragment, local);
    			transition_out(japanjpg.$$.fragment, local);
    			transition_out(cookiewindow.$$.fragment, local);
    			transition_out(projectraceworx.$$.fragment, local);
    			transition_out(legalwindow.$$.fragment, local);
    			transition_out(privacywindow.$$.fragment, local);
    			transition_out(cleancode.$$.fragment, local);
    			transition_out(projectmueller.$$.fragment, local);
    			transition_out(germanyjpg.$$.fragment, local);
    			transition_out(referenceswindow.$$.fragment, local);
    			transition_out(logopedia.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(cornermousescroller, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(scrollslowdown, detaching);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(main);
    			destroy_component(heroview);
    			destroy_component(projectcorazon);
    			destroy_component(aboutwindow);
    			destroy_component(japanjpg);
    			destroy_component(cookiewindow);
    			destroy_component(projectraceworx);
    			destroy_component(legalwindow);
    			destroy_component(privacywindow);
    			destroy_component(cleancode);
    			destroy_component(projectmueller);
    			destroy_component(germanyjpg);
    			destroy_component(referenceswindow);
    			destroy_component(logopedia);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$g.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$g($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("App", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		CornerMouseScroller,
    		ScrollSlowDown,
    		HeroView,
    		AboutWindow,
    		ProjectCorazon,
    		ProjectRaceworx,
    		ProjectMueller,
    		CookieWindow,
    		LegalWindow,
    		PrivacyWindow,
    		ReferencesWindow,
    		GermanyJPG,
    		JapanJPG,
    		CleanCode,
    		Logopedia
    	});

    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$g, create_fragment$g, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment$g.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
