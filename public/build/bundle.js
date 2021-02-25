
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
    function afterUpdate(fn) {
        get_current_component().$$.after_update.push(fn);
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
    	let svg0;
    	let polygon0;
    	let t4;
    	let svg1;
    	let polygon1;
    	let t5;
    	let svg2;
    	let polygon2;
    	let t6;
    	let svg3;
    	let polygon3;
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
    			svg0 = svg_element("svg");
    			polygon0 = svg_element("polygon");
    			t4 = space();
    			svg1 = svg_element("svg");
    			polygon1 = svg_element("polygon");
    			t5 = space();
    			svg2 = svg_element("svg");
    			polygon2 = svg_element("polygon");
    			t6 = space();
    			svg3 = svg_element("svg");
    			polygon3 = svg_element("polygon");
    			attr_dev(div0, "class", "top svelte-p2czm8");
    			add_location(div0, file, 22, 0, 598);
    			attr_dev(div1, "class", "bottom svelte-p2czm8");
    			add_location(div1, file, 29, 0, 729);
    			attr_dev(div2, "class", "left svelte-p2czm8");
    			add_location(div2, file, 36, 0, 862);
    			attr_dev(div3, "class", "right svelte-p2czm8");
    			add_location(div3, file, 43, 0, 994);
    			attr_dev(polygon0, "points", "0,0 0,100 100,0");
    			attr_dev(polygon0, "class", "svelte-p2czm8");
    			add_location(polygon0, file, 57, 4, 1255);
    			attr_dev(svg0, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg0, "viewBox", "0 0 100 100");
    			attr_dev(svg0, "preserveAspectRatio", "none");
    			attr_dev(svg0, "class", "top-left svelte-p2czm8");
    			add_location(svg0, file, 51, 0, 1127);
    			attr_dev(polygon1, "points", "100,100 0,0 100,0");
    			attr_dev(polygon1, "class", "svelte-p2czm8");
    			add_location(polygon1, file, 72, 4, 1565);
    			attr_dev(svg1, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg1, "viewBox", "0 0 100 100");
    			attr_dev(svg1, "preserveAspectRatio", "none");
    			attr_dev(svg1, "class", "top-right svelte-p2czm8");
    			add_location(svg1, file, 66, 0, 1436);
    			attr_dev(polygon2, "points", "100,100 0,0 0,100");
    			attr_dev(polygon2, "class", "svelte-p2czm8");
    			add_location(polygon2, file, 87, 4, 1878);
    			attr_dev(svg2, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg2, "viewBox", "0 0 100 100");
    			attr_dev(svg2, "preserveAspectRatio", "none");
    			attr_dev(svg2, "class", "bottom-left svelte-p2czm8");
    			add_location(svg2, file, 81, 0, 1747);
    			attr_dev(polygon3, "points", "0,100 100,0 100,100");
    			attr_dev(polygon3, "class", "svelte-p2czm8");
    			add_location(polygon3, file, 102, 4, 2236);
    			attr_dev(svg3, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg3, "viewBox", "0 0 100 100");
    			attr_dev(svg3, "preserveAspectRatio", "none");
    			attr_dev(svg3, "class", "bottom-right svelte-p2czm8");
    			add_location(svg3, file, 96, 0, 2104);
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
    			insert_dev(target, svg0, anchor);
    			append_dev(svg0, polygon0);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, svg1, anchor);
    			append_dev(svg1, polygon1);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, svg2, anchor);
    			append_dev(svg2, polygon2);
    			insert_dev(target, t6, anchor);
    			insert_dev(target, svg3, anchor);
    			append_dev(svg3, polygon3);

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
    					listen_dev(polygon0, "mouseenter", /*mouseenter_handler_4*/ ctx[6], false, false, false),
    					listen_dev(polygon0, "mouseleave", /*terminateScrolling*/ ctx[1], false, false, false),
    					listen_dev(polygon1, "mouseenter", /*mouseenter_handler_5*/ ctx[7], false, false, false),
    					listen_dev(polygon1, "mouseleave", /*terminateScrolling*/ ctx[1], false, false, false),
    					listen_dev(polygon2, "mouseenter", /*mouseenter_handler_6*/ ctx[8], false, false, false),
    					listen_dev(polygon2, "mouseleave", /*terminateScrolling*/ ctx[1], false, false, false),
    					listen_dev(polygon3, "mouseenter", /*mouseenter_handler_7*/ ctx[9], false, false, false),
    					listen_dev(polygon3, "mouseleave", /*terminateScrolling*/ ctx[1], false, false, false)
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
    			if (detaching) detach_dev(svg0);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(svg1);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(svg2);
    			if (detaching) detach_dev(t6);
    			if (detaching) detach_dev(svg3);
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
    	let img;
    	let img_src_value;
    	let t0;
    	let h10;
    	let t2;
    	let h11;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			section = element("section");
    			div = element("div");
    			img = element("img");
    			t0 = space();
    			h10 = element("h1");
    			h10.textContent = "CREATIVE SERVICES & DIGITAL DEVELOPMENT";
    			t2 = space();
    			h11 = element("h1");
    			h11.textContent = "c/o MORITZ MORTIMER MÜLLER (DE), THEODOR BALTUS STEINER (JP)";
    			if (img.src !== (img_src_value = "images/MortimerBaltus_Logo.svg")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "Mortimer/Baltus");
    			attr_dev(img, "class", "svelte-10gmsqe");
    			add_location(img, file$1, 15, 8, 413);
    			attr_dev(h10, "class", "svelte-10gmsqe");
    			add_location(h10, file$1, 16, 8, 488);
    			attr_dev(h11, "class", "svelte-10gmsqe");
    			add_location(h11, file$1, 17, 8, 545);
    			attr_dev(div, "class", "hero-view svelte-10gmsqe");
    			add_location(div, file$1, 14, 4, 368);
    			attr_dev(section, "class", "svelte-10gmsqe");
    			add_location(section, file$1, 13, 0, 354);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, div);
    			append_dev(div, img);
    			append_dev(div, t0);
    			append_dev(div, h10);
    			append_dev(div, t2);
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

    	$$self.$capture_state = () => ({ afterUpdate, heroView });
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
    			attr_dev(h1, "class", "svelte-tjbzfj");
    			add_location(h1, file$2, 98, 12, 3184);
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
    			t = text(/*title*/ ctx[6]);
    			attr_dev(h1, "class", "svelte-tjbzfj");
    			add_location(h1, file$2, 96, 12, 3139);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    			append_dev(h1, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*title*/ 64) set_data_dev(t, /*title*/ ctx[6]);
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

    // (155:8) {:else}
    function create_else_block(ctx) {
    	let button;

    	const block = {
    		c: function create() {
    			button = element("button");
    			attr_dev(button, "class", "disabled svelte-tjbzfj");
    			add_location(button, file$2, 155, 12, 5770);
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
    		source: "(155:8) {:else}",
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
    			t1 = text(/*title*/ ctx[6]);
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
    			attr_dev(span, "class", "svelte-tjbzfj");
    			add_location(span, file$2, 102, 16, 3292);
    			add_location(title_1, file$2, 110, 20, 3593);
    			attr_dev(rect0, "x", ".5");
    			attr_dev(rect0, "y", ".5");
    			attr_dev(rect0, "width", "53");
    			attr_dev(rect0, "height", "14");
    			attr_dev(rect0, "rx", "3");
    			attr_dev(rect0, "fill", "#151515");
    			attr_dev(rect0, "stroke", "#FEFEFE");
    			add_location(rect0, file$2, 115, 36, 3900);
    			attr_dev(rect1, "x", "17");
    			attr_dev(rect1, "y", "6");
    			attr_dev(rect1, "width", "20");
    			attr_dev(rect1, "height", "1");
    			attr_dev(rect1, "fill", "#FEFEFE");
    			add_location(rect1, file$2, 124, 36, 4337);
    			attr_dev(polygon0, "points", "47 7 37 4 37 7");
    			attr_dev(polygon0, "fill", "#FEFEFE");
    			add_location(polygon0, file$2, 131, 36, 4668);
    			attr_dev(rect2, "transform", "translate(27 8.5) rotate(180) translate(-27 -8.5)");
    			attr_dev(rect2, "x", "17");
    			attr_dev(rect2, "y", "8");
    			attr_dev(rect2, "width", "20");
    			attr_dev(rect2, "height", "1");
    			attr_dev(rect2, "fill", "#FEFEFE");
    			add_location(rect2, file$2, 135, 36, 4871);
    			attr_dev(polygon1, "transform", "translate(12 9.5) rotate(180) translate(-12 -9.5)");
    			attr_dev(polygon1, "points", "17 11 7 8 7 11");
    			attr_dev(polygon1, "fill", "#FEFEFE");
    			add_location(polygon1, file$2, 143, 36, 5304);
    			attr_dev(g0, "transform", "translate(436 9)");
    			add_location(g0, file$2, 114, 32, 3831);
    			attr_dev(g1, "transform", "translate(606 1483)");
    			add_location(g1, file$2, 113, 28, 3763);
    			attr_dev(g2, "transform", "translate(-1042 -1492)");
    			add_location(g2, file$2, 112, 24, 3696);
    			attr_dev(g3, "fill", "none");
    			attr_dev(g3, "fill-rule", "evenodd");
    			add_location(g3, file$2, 111, 20, 3636);
    			attr_dev(svg, "version", "1.1");
    			attr_dev(svg, "viewBox", "0 0 54 15");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "aria-hidden", "true");
    			attr_dev(svg, "tabindex", "0");
    			attr_dev(svg, "class", "svelte-tjbzfj");
    			add_location(svg, file$2, 103, 16, 3349);
    			attr_dev(button, "class", "enlarge svelte-tjbzfj");
    			add_location(button, file$2, 101, 12, 3251);
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
    			if (dirty & /*title*/ 64) set_data_dev(t1, /*title*/ ctx[6]);
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

    // (160:14) <p>
    function fallback_block(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "Content goes here";
    			add_location(p, file$2, 159, 14, 5888);
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
    		source: "(160:14) <p>",
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
    		if (/*title*/ ctx[6]) return create_if_block_1;
    		return create_else_block_1;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block0 = current_block_type(ctx);

    	function select_block_type_1(ctx, dirty) {
    		if (/*enlargeable*/ ctx[7]) return create_if_block;
    		return create_else_block;
    	}

    	let current_block_type_1 = select_block_type_1(ctx);
    	let if_block1 = current_block_type_1(ctx);
    	const default_slot_template = /*#slots*/ ctx[15].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[14], null);
    	const default_slot_or_fallback = default_slot || fallback_block(ctx);

    	const block = {
    		c: function create() {
    			section = element("section");
    			header = element("header");
    			button = element("button");
    			span = element("span");
    			t0 = text("Shrink this ");
    			t1 = text(/*title*/ ctx[6]);
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
    			attr_dev(span, "class", "svelte-tjbzfj");
    			add_location(span, file$2, 60, 12, 1738);
    			add_location(title_1, file$2, 68, 16, 2006);
    			attr_dev(rect0, "x", ".5");
    			attr_dev(rect0, "y", ".5");
    			attr_dev(rect0, "width", "53");
    			attr_dev(rect0, "height", "14");
    			attr_dev(rect0, "rx", "3");
    			attr_dev(rect0, "fill", "#151515");
    			attr_dev(rect0, "stroke", "#FEFEFE");
    			add_location(rect0, file$2, 73, 32, 2290);
    			attr_dev(rect1, "x", "17");
    			attr_dev(rect1, "y", "7");
    			attr_dev(rect1, "width", "20");
    			attr_dev(rect1, "height", "1");
    			attr_dev(rect1, "fill", "#FEFEFE");
    			add_location(rect1, file$2, 82, 32, 2691);
    			attr_dev(g0, "transform", "translate(9 9)");
    			add_location(g0, file$2, 72, 28, 2227);
    			attr_dev(g1, "transform", "translate(606 1483)");
    			add_location(g1, file$2, 71, 24, 2163);
    			attr_dev(g2, "transform", "translate(-615 -1492)");
    			add_location(g2, file$2, 70, 20, 2101);
    			attr_dev(g3, "fill", "none");
    			attr_dev(g3, "fill-rule", "evenodd");
    			add_location(g3, file$2, 69, 16, 2045);
    			attr_dev(svg, "version", "1.1");
    			attr_dev(svg, "viewBox", "0 0 54 15");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "aria-hidden", "true");
    			attr_dev(svg, "tabindex", "0");
    			attr_dev(svg, "class", "svelte-tjbzfj");
    			add_location(svg, file$2, 61, 12, 1790);
    			attr_dev(button, "class", "shrink svelte-tjbzfj");
    			add_location(button, file$2, 59, 8, 1702);
    			attr_dev(header, "class", "svelte-tjbzfj");
    			add_location(header, file$2, 58, 4, 1685);
    			attr_dev(article, "class", "svelte-tjbzfj");
    			toggle_class(article, "no-events", !/*isInForeground*/ ctx[0]);
    			add_location(article, file$2, 158, 4, 5830);
    			add_location(footer, file$2, 161, 4, 5939);
    			set_style(section, "position", "relative");
    			set_style(section, "z-index", /*zIndex*/ ctx[10]);
    			set_style(section, "grid-column", /*gridColumnStart*/ ctx[1] + " / " + /*gridColumnEnd*/ ctx[2]);
    			set_style(section, "grid-row", /*gridRowStart*/ ctx[3] + " / " + /*gridRowEnd*/ ctx[4]);
    			set_style(section, "background-color", /*backgroundColor*/ ctx[5]);
    			attr_dev(section, "class", "svelte-tjbzfj");
    			toggle_class(section, "trigger-shuffle-right", !/*isInForeground*/ ctx[0] && /*intersectingSide*/ ctx[8] === "right" && /*touched*/ ctx[9]);
    			toggle_class(section, "trigger-shuffle-left", !/*isInForeground*/ ctx[0] && /*intersectingSide*/ ctx[8] === "left" && /*touched*/ ctx[9]);
    			add_location(section, file$2, 48, 0, 1242);
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
    				dispose = listen_dev(section, "click", /*handleWindowClick*/ ctx[11], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*title*/ 64) set_data_dev(t1, /*title*/ ctx[6]);

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
    				if (default_slot.p && dirty & /*$$scope*/ 16384) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[14], dirty, null, null);
    				}
    			}

    			if (dirty & /*isInForeground*/ 1) {
    				toggle_class(article, "no-events", !/*isInForeground*/ ctx[0]);
    			}

    			if (!current || dirty & /*zIndex*/ 1024) {
    				set_style(section, "z-index", /*zIndex*/ ctx[10]);
    			}

    			if (!current || dirty & /*gridColumnStart, gridColumnEnd*/ 6) {
    				set_style(section, "grid-column", /*gridColumnStart*/ ctx[1] + " / " + /*gridColumnEnd*/ ctx[2]);
    			}

    			if (!current || dirty & /*gridRowStart, gridRowEnd*/ 24) {
    				set_style(section, "grid-row", /*gridRowStart*/ ctx[3] + " / " + /*gridRowEnd*/ ctx[4]);
    			}

    			if (!current || dirty & /*backgroundColor*/ 32) {
    				set_style(section, "background-color", /*backgroundColor*/ ctx[5]);
    			}

    			if (dirty & /*isInForeground, intersectingSide, touched*/ 769) {
    				toggle_class(section, "trigger-shuffle-right", !/*isInForeground*/ ctx[0] && /*intersectingSide*/ ctx[8] === "right" && /*touched*/ ctx[9]);
    			}

    			if (dirty & /*isInForeground, intersectingSide, touched*/ 769) {
    				toggle_class(section, "trigger-shuffle-left", !/*isInForeground*/ ctx[0] && /*intersectingSide*/ ctx[8] === "left" && /*touched*/ ctx[9]);
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
    	let touched = false;
    	let zIndex = 0;
    	let thisWindowObject;

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
    		$$invalidate(10, zIndex = thisWindowObject.zIndex);
    		$$invalidate(9, touched = thisWindowObject.touched);
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
    		"intersectingSide"
    	];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<WindowElement> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("gridColumnStart" in $$props) $$invalidate(1, gridColumnStart = $$props.gridColumnStart);
    		if ("gridColumnEnd" in $$props) $$invalidate(2, gridColumnEnd = $$props.gridColumnEnd);
    		if ("gridRowStart" in $$props) $$invalidate(3, gridRowStart = $$props.gridRowStart);
    		if ("gridRowEnd" in $$props) $$invalidate(4, gridRowEnd = $$props.gridRowEnd);
    		if ("backgroundColor" in $$props) $$invalidate(5, backgroundColor = $$props.backgroundColor);
    		if ("title" in $$props) $$invalidate(6, title = $$props.title);
    		if ("enlargeable" in $$props) $$invalidate(7, enlargeable = $$props.enlargeable);
    		if ("id" in $$props) $$invalidate(12, id = $$props.id);
    		if ("isInForeground" in $$props) $$invalidate(0, isInForeground = $$props.isInForeground);
    		if ("intersections" in $$props) $$invalidate(13, intersections = $$props.intersections);
    		if ("intersectingSide" in $$props) $$invalidate(8, intersectingSide = $$props.intersectingSide);
    		if ("$$scope" in $$props) $$invalidate(14, $$scope = $$props.$$scope);
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
    		touched,
    		zIndex,
    		thisWindowObject,
    		unsubscribe,
    		handleWindowClick
    	});

    	$$self.$inject_state = $$props => {
    		if ("gridColumnStart" in $$props) $$invalidate(1, gridColumnStart = $$props.gridColumnStart);
    		if ("gridColumnEnd" in $$props) $$invalidate(2, gridColumnEnd = $$props.gridColumnEnd);
    		if ("gridRowStart" in $$props) $$invalidate(3, gridRowStart = $$props.gridRowStart);
    		if ("gridRowEnd" in $$props) $$invalidate(4, gridRowEnd = $$props.gridRowEnd);
    		if ("backgroundColor" in $$props) $$invalidate(5, backgroundColor = $$props.backgroundColor);
    		if ("title" in $$props) $$invalidate(6, title = $$props.title);
    		if ("enlargeable" in $$props) $$invalidate(7, enlargeable = $$props.enlargeable);
    		if ("id" in $$props) $$invalidate(12, id = $$props.id);
    		if ("isInForeground" in $$props) $$invalidate(0, isInForeground = $$props.isInForeground);
    		if ("intersections" in $$props) $$invalidate(13, intersections = $$props.intersections);
    		if ("intersectingSide" in $$props) $$invalidate(8, intersectingSide = $$props.intersectingSide);
    		if ("touched" in $$props) $$invalidate(9, touched = $$props.touched);
    		if ("zIndex" in $$props) $$invalidate(10, zIndex = $$props.zIndex);
    		if ("thisWindowObject" in $$props) thisWindowObject = $$props.thisWindowObject;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		isInForeground,
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
    			gridColumnStart: 1,
    			gridColumnEnd: 2,
    			gridRowStart: 3,
    			gridRowEnd: 4,
    			backgroundColor: 5,
    			title: 6,
    			enlargeable: 7,
    			id: 12,
    			isInForeground: 0,
    			intersections: 13,
    			intersectingSide: 8
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "WindowElement",
    			options,
    			id: create_fragment$3.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*gridColumnStart*/ ctx[1] === undefined && !("gridColumnStart" in props)) {
    			console.warn("<WindowElement> was created without expected prop 'gridColumnStart'");
    		}

    		if (/*gridColumnEnd*/ ctx[2] === undefined && !("gridColumnEnd" in props)) {
    			console.warn("<WindowElement> was created without expected prop 'gridColumnEnd'");
    		}

    		if (/*gridRowStart*/ ctx[3] === undefined && !("gridRowStart" in props)) {
    			console.warn("<WindowElement> was created without expected prop 'gridRowStart'");
    		}

    		if (/*gridRowEnd*/ ctx[4] === undefined && !("gridRowEnd" in props)) {
    			console.warn("<WindowElement> was created without expected prop 'gridRowEnd'");
    		}

    		if (/*title*/ ctx[6] === undefined && !("title" in props)) {
    			console.warn("<WindowElement> was created without expected prop 'title'");
    		}

    		if (/*id*/ ctx[12] === undefined && !("id" in props)) {
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
    }

    /* src/Windows/AboutWindow.svelte generated by Svelte v3.32.1 */
    const file$3 = "src/Windows/AboutWindow.svelte";

    // (5:0) <WindowElement     gridColumnStart={135}     gridColumnEnd={165}     gridRowStart={120}     gridRowEnd={160}     backgroundColor="#A25C24"     title="ABOUT"     id={0}     isInForeground={true}     intersections={[1]}     intersectingSide="left" >
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
    			add_location(br0, file$3, 16, 12, 340);
    			add_location(br1, file$3, 16, 21, 349);
    			add_location(br2, file$3, 16, 32, 360);
    			attr_dev(p, "class", "svelte-7j3tzn");
    			add_location(p, file$3, 16, 4, 332);
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
    		source: "(5:0) <WindowElement     gridColumnStart={135}     gridColumnEnd={165}     gridRowStart={120}     gridRowEnd={160}     backgroundColor=\\\"#A25C24\\\"     title=\\\"ABOUT\\\"     id={0}     isInForeground={true}     intersections={[1]}     intersectingSide=\\\"left\\\" >",
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
    				gridRowStart: 120,
    				gridRowEnd: 160,
    				backgroundColor: "#A25C24",
    				title: "ABOUT",
    				id: 0,
    				isInForeground: true,
    				intersections: [1],
    				intersectingSide: "left",
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

    // (5:0) <WindowElement     gridColumnStart={110}     gridColumnEnd={148}     gridRowStart={130}     gridRowEnd={180}     title="PROJECT_01"     id={1}     isInForeground={false}     intersections={[0]}     intersectingSide="right" >
    function create_default_slot$1(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			if (img.src !== (img_src_value = "images/ConCorazon.jpg")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "Con Corazón is embracing artisans from countries at war");
    			attr_dev(img, "class", "svelte-wwxt9");
    			add_location(img, file$4, 15, 4, 309);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$1.name,
    		type: "slot",
    		source: "(5:0) <WindowElement     gridColumnStart={110}     gridColumnEnd={148}     gridRowStart={130}     gridRowEnd={180}     title=\\\"PROJECT_01\\\"     id={1}     isInForeground={false}     intersections={[0]}     intersectingSide=\\\"right\\\" >",
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
    				gridColumnEnd: 148,
    				gridRowStart: 130,
    				gridRowEnd: 180,
    				title: "PROJECT_01",
    				id: 1,
    				isInForeground: false,
    				intersections: [0],
    				intersectingSide: "right",
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
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("ProjectCorazon", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ProjectCorazon> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ WindowElement });
    	return [];
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

    // (5:0) <WindowElement     gridColumnStart={40}     gridColumnEnd={90}     gridRowStart={128}     gridRowEnd={163}     title="PROJECT_02"     id={2}     isInForeground={false}     intersections={[7]}     intersectingSide="left" >
    function create_default_slot$2(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			if (img.src !== (img_src_value = "images/Raceworx.webp")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "Raceworx");
    			attr_dev(img, "class", "svelte-wwxt9");
    			add_location(img, file$5, 15, 4, 306);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$2.name,
    		type: "slot",
    		source: "(5:0) <WindowElement     gridColumnStart={40}     gridColumnEnd={90}     gridRowStart={128}     gridRowEnd={163}     title=\\\"PROJECT_02\\\"     id={2}     isInForeground={false}     intersections={[7]}     intersectingSide=\\\"left\\\" >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
    	let windowelement;
    	let current;

    	windowelement = new WindowElement({
    			props: {
    				gridColumnStart: 40,
    				gridColumnEnd: 90,
    				gridRowStart: 128,
    				gridRowEnd: 163,
    				title: "PROJECT_02",
    				id: 2,
    				isInForeground: false,
    				intersections: [7],
    				intersectingSide: "left",
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
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("ProjectRaceworx", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ProjectRaceworx> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ WindowElement });
    	return [];
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

    // (5:0) <WindowElement     gridColumnStart={50}     gridColumnEnd={88}     gridRowStart={15}     gridRowEnd={55}     title="PROJECT_03"     id={3}     isInForeground={true}     intersections={[10]}     intersectingSide="left" >
    function create_default_slot$3(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			if (img.src !== (img_src_value = "images/EberhardMueller.jpg")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "Eberhard Müller develops sophisticated textile interiors at the highest level");
    			attr_dev(img, "class", "svelte-1no4cbu");
    			add_location(img, file$6, 15, 4, 304);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$3.name,
    		type: "slot",
    		source: "(5:0) <WindowElement     gridColumnStart={50}     gridColumnEnd={88}     gridRowStart={15}     gridRowEnd={55}     title=\\\"PROJECT_03\\\"     id={3}     isInForeground={true}     intersections={[10]}     intersectingSide=\\\"left\\\" >",
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
    				gridColumnEnd: 88,
    				gridRowStart: 15,
    				gridRowEnd: 55,
    				title: "PROJECT_03",
    				id: 3,
    				isInForeground: true,
    				intersections: [10],
    				intersectingSide: "left",
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
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("ProjectMueller", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ProjectMueller> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ WindowElement });
    	return [];
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

    // (5:0) <WindowElement     gridColumnStart={40}     gridColumnEnd={70}     gridRowStart={100}     gridRowEnd={120}     backgroundColor="#5E4B1B"     title="COOKIES"     enlargeable={false}     id={9}     isInForeground={true}     intersections={[8]}     intersectingSide="left" >
    function create_default_slot$4(ctx) {
    	let p;
    	let t0;
    	let br0;
    	let t1;
    	let br1;
    	let t2;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t0 = text("As with real cookies, not all browser cookies are created equal. Some\n        websites feed your browser cookies to track your behavior online. We\n        value your privacy, therefore we only use cookies to ensure you can use\n        our page as intended! ");
    			br0 = element("br");
    			t1 = space();
    			br1 = element("br");
    			t2 = text(" Please read our Privacy Policy for more\n        informations on this subject.");
    			add_location(br0, file$7, 21, 30, 625);
    			add_location(br1, file$7, 21, 37, 632);
    			attr_dev(p, "class", "svelte-r38rvi");
    			add_location(p, file$7, 17, 4, 356);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t0);
    			append_dev(p, br0);
    			append_dev(p, t1);
    			append_dev(p, br1);
    			append_dev(p, t2);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$4.name,
    		type: "slot",
    		source: "(5:0) <WindowElement     gridColumnStart={40}     gridColumnEnd={70}     gridRowStart={100}     gridRowEnd={120}     backgroundColor=\\\"#5E4B1B\\\"     title=\\\"COOKIES\\\"     enlargeable={false}     id={9}     isInForeground={true}     intersections={[8]}     intersectingSide=\\\"left\\\" >",
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
    				gridRowStart: 100,
    				gridRowEnd: 120,
    				backgroundColor: "#5E4B1B",
    				title: "COOKIES",
    				enlargeable: false,
    				id: 9,
    				isInForeground: true,
    				intersections: [8],
    				intersectingSide: "left",
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

    // (5:0) <WindowElement     gridColumnStart={15}     gridColumnEnd={55}     gridRowStart={160}     gridRowEnd={180}     backgroundColor="#1C6370"     title="LEGAL NOTICE"     id={7}     isInForeground={true}     intersections={[2]}     intersectingSide="right" >
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
    			add_location(br0, file$8, 17, 53, 395);
    			add_location(br1, file$8, 17, 59, 401);
    			attr_dev(p, "class", "svelte-11owopy");
    			add_location(p, file$8, 16, 4, 338);
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
    		source: "(5:0) <WindowElement     gridColumnStart={15}     gridColumnEnd={55}     gridRowStart={160}     gridRowEnd={180}     backgroundColor=\\\"#1C6370\\\"     title=\\\"LEGAL NOTICE\\\"     id={7}     isInForeground={true}     intersections={[2]}     intersectingSide=\\\"right\\\" >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$9(ctx) {
    	let windowelement;
    	let current;

    	windowelement = new WindowElement({
    			props: {
    				gridColumnStart: 15,
    				gridColumnEnd: 55,
    				gridRowStart: 160,
    				gridRowEnd: 180,
    				backgroundColor: "#1C6370",
    				title: "LEGAL NOTICE",
    				id: 7,
    				isInForeground: true,
    				intersections: [2],
    				intersectingSide: "right",
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

    // (5:0) <WindowElement     gridColumnStart={158}     gridColumnEnd={198}     gridRowStart={170}     gridRowEnd={195}     backgroundColor="#FEC7A3"     title="PRIVACY POLICY"     id={5}     isInForeground={true} >
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
    		source: "(5:0) <WindowElement     gridColumnStart={158}     gridColumnEnd={198}     gridRowStart={170}     gridRowEnd={195}     backgroundColor=\\\"#FEC7A3\\\"     title=\\\"PRIVACY POLICY\\\"     id={5}     isInForeground={true} >",
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
    				gridRowStart: 170,
    				gridRowEnd: 195,
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

    // (5:0) <WindowElement     gridColumnStart={159}     gridColumnEnd={199}     gridRowStart={30}     gridRowEnd={80}     backgroundColor="#5F583D"     title="References"     enlargeable={false}     id={4}     isInForeground={true}     intersections={[11]}     intersectingSide="left" >
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
    			add_location(a0, file$a, 18, 12, 377);
    			attr_dev(li0, "class", "svelte-56pd5y");
    			add_location(li0, file$a, 18, 8, 373);
    			attr_dev(a1, "href", "www.reference.com");
    			attr_dev(a1, "class", "svelte-56pd5y");
    			add_location(a1, file$a, 19, 12, 448);
    			attr_dev(li1, "class", "svelte-56pd5y");
    			add_location(li1, file$a, 19, 8, 444);
    			attr_dev(a2, "href", "www.reference.com");
    			attr_dev(a2, "class", "svelte-56pd5y");
    			add_location(a2, file$a, 20, 12, 506);
    			attr_dev(li2, "class", "svelte-56pd5y");
    			add_location(li2, file$a, 20, 8, 502);
    			attr_dev(a3, "href", "www.reference.com");
    			attr_dev(a3, "class", "svelte-56pd5y");
    			add_location(a3, file$a, 22, 12, 580);
    			attr_dev(li3, "class", "svelte-56pd5y");
    			add_location(li3, file$a, 21, 8, 563);
    			attr_dev(a4, "href", "www.reference.com");
    			attr_dev(a4, "class", "svelte-56pd5y");
    			add_location(a4, file$a, 24, 12, 666);
    			attr_dev(li4, "class", "svelte-56pd5y");
    			add_location(li4, file$a, 24, 8, 662);
    			attr_dev(a5, "href", "www.reference.com");
    			attr_dev(a5, "class", "svelte-56pd5y");
    			add_location(a5, file$a, 25, 12, 742);
    			attr_dev(li5, "class", "svelte-56pd5y");
    			add_location(li5, file$a, 25, 8, 738);
    			attr_dev(a6, "href", "www.reference.com");
    			attr_dev(a6, "class", "svelte-56pd5y");
    			add_location(a6, file$a, 26, 12, 797);
    			attr_dev(li6, "class", "svelte-56pd5y");
    			add_location(li6, file$a, 26, 8, 793);
    			attr_dev(a7, "href", "www.reference.com");
    			attr_dev(a7, "class", "svelte-56pd5y");
    			add_location(a7, file$a, 27, 12, 861);
    			attr_dev(li7, "class", "svelte-56pd5y");
    			add_location(li7, file$a, 27, 8, 857);
    			attr_dev(a8, "href", "www.reference.com");
    			attr_dev(a8, "class", "svelte-56pd5y");
    			add_location(a8, file$a, 28, 12, 923);
    			attr_dev(li8, "class", "svelte-56pd5y");
    			add_location(li8, file$a, 28, 8, 919);
    			attr_dev(a9, "href", "www.reference.com");
    			attr_dev(a9, "class", "svelte-56pd5y");
    			add_location(a9, file$a, 30, 12, 996);
    			attr_dev(li9, "class", "svelte-56pd5y");
    			add_location(li9, file$a, 29, 8, 979);
    			attr_dev(a10, "href", "www.reference.com");
    			attr_dev(a10, "class", "svelte-56pd5y");
    			add_location(a10, file$a, 32, 12, 1083);
    			attr_dev(li10, "class", "svelte-56pd5y");
    			add_location(li10, file$a, 32, 8, 1079);
    			attr_dev(a11, "href", "www.reference.com");
    			attr_dev(a11, "class", "svelte-56pd5y");
    			add_location(a11, file$a, 33, 12, 1149);
    			attr_dev(li11, "class", "svelte-56pd5y");
    			add_location(li11, file$a, 33, 8, 1145);
    			attr_dev(a12, "href", "www.reference.com");
    			attr_dev(a12, "class", "svelte-56pd5y");
    			add_location(a12, file$a, 34, 12, 1207);
    			attr_dev(li12, "class", "svelte-56pd5y");
    			add_location(li12, file$a, 34, 8, 1203);
    			attr_dev(ul, "class", "svelte-56pd5y");
    			add_location(ul, file$a, 17, 4, 360);
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
    		source: "(5:0) <WindowElement     gridColumnStart={159}     gridColumnEnd={199}     gridRowStart={30}     gridRowEnd={80}     backgroundColor=\\\"#5F583D\\\"     title=\\\"References\\\"     enlargeable={false}     id={4}     isInForeground={true}     intersections={[11]}     intersectingSide=\\\"left\\\" >",
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
    				gridRowStart: 30,
    				gridRowEnd: 80,
    				backgroundColor: "#5F583D",
    				title: "References",
    				enlargeable: false,
    				id: 4,
    				isInForeground: true,
    				intersections: [11],
    				intersectingSide: "left",
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

    // (13:0) <WindowElement     gridColumnStart={130}     gridColumnEnd={195}     gridRowStart={5}     gridRowEnd={43}     title={deGallery[randomIndex].name}     id={11}     isInForeground={false}     intersections={[4]}     intersectingSide="right" >
    function create_default_slot$8(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			if (img.src !== (img_src_value = /*deGallery*/ ctx[0][/*randomIndex*/ ctx[1]].src)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", /*deGallery*/ ctx[0][/*randomIndex*/ ctx[1]].alt);
    			attr_dev(img, "class", "svelte-wwxt9");
    			add_location(img, file$b, 23, 4, 564);
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
    		source: "(13:0) <WindowElement     gridColumnStart={130}     gridColumnEnd={195}     gridRowStart={5}     gridRowEnd={43}     title={deGallery[randomIndex].name}     id={11}     isInForeground={false}     intersections={[4]}     intersectingSide=\\\"right\\\" >",
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
    				gridColumnEnd: 195,
    				gridRowStart: 5,
    				gridRowEnd: 43,
    				title: /*deGallery*/ ctx[0][/*randomIndex*/ ctx[1]].name,
    				id: 11,
    				isInForeground: false,
    				intersections: [4],
    				intersectingSide: "right",
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

    	const deGallery = [
    		{
    			name: "OBERHAFEN.JPG",
    			src: "images/Oberhafen.jpg",
    			alt: "Oberhafen, Hamburg (DE)"
    		}
    	];

    	var randomIndex = Math.floor(Math.random() * deGallery.length);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<GermanyJPG> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ WindowElement, deGallery, randomIndex });

    	$$self.$inject_state = $$props => {
    		if ("randomIndex" in $$props) $$invalidate(1, randomIndex = $$props.randomIndex);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [deGallery, randomIndex];
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

    // (18:0) <WindowElement     gridColumnStart={5}     gridColumnEnd={64}     gridRowStart={65}     gridRowEnd={103}     title={jpGallery[randomIndex].name}     id={8}     isInForeground={false}     intersections={[9]}     intersectingSide="right" >
    function create_default_slot$9(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			if (img.src !== (img_src_value = /*jpGallery*/ ctx[0][/*randomIndex*/ ctx[1]].src)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", /*jpGallery*/ ctx[0][/*randomIndex*/ ctx[1]].alt);
    			attr_dev(img, "class", "svelte-wwxt9");
    			add_location(img, file$c, 28, 4, 689);
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
    		source: "(18:0) <WindowElement     gridColumnStart={5}     gridColumnEnd={64}     gridRowStart={65}     gridRowEnd={103}     title={jpGallery[randomIndex].name}     id={8}     isInForeground={false}     intersections={[9]}     intersectingSide=\\\"right\\\" >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$d(ctx) {
    	let windowelement;
    	let current;

    	windowelement = new WindowElement({
    			props: {
    				gridColumnStart: 5,
    				gridColumnEnd: 64,
    				gridRowStart: 65,
    				gridRowEnd: 103,
    				title: /*jpGallery*/ ctx[0][/*randomIndex*/ ctx[1]].name,
    				id: 8,
    				isInForeground: false,
    				intersections: [9],
    				intersectingSide: "right",
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

    	const jpGallery = [
    		{
    			name: "SHINJUKU.JPG",
    			src: "images/Shinjuku.jpg",
    			alt: "Shinjuku, Tokyo (JP)"
    		},
    		{
    			name: "TAXI.JPG",
    			src: "images/TokyoTaxi.jpg",
    			alt: "A cab in Tokyo (JP)"
    		}
    	];

    	var randomIndex = Math.floor(Math.random() * jpGallery.length);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<JapanJPG> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ WindowElement, jpGallery, randomIndex });

    	$$self.$inject_state = $$props => {
    		if ("randomIndex" in $$props) $$invalidate(1, randomIndex = $$props.randomIndex);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [jpGallery, randomIndex];
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

    // (5:0) <WindowElement     gridColumnStart={20}     gridColumnEnd={60}     gridRowStart={2}     gridRowEnd={32}     backgroundColor="#7d7d7d"     title="CLEAN.CODE"     id={10}     isInForeground={false}     intersections={[3]}     intersectingSide="right" >
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
    			add_location(br0, file$d, 17, 34, 373);
    			attr_dev(p0, "class", "svelte-cql7tc");
    			add_location(p0, file$d, 16, 4, 335);
    			add_location(br1, file$d, 20, 43, 521);
    			add_location(br2, file$d, 20, 49, 527);
    			attr_dev(p1, "class", "text-right svelte-cql7tc");
    			add_location(p1, file$d, 20, 4, 482);
    			add_location(br3, file$d, 22, 55, 601);
    			attr_dev(p2, "class", "svelte-cql7tc");
    			add_location(p2, file$d, 21, 4, 542);
    			attr_dev(p3, "class", "text-right svelte-cql7tc");
    			add_location(p3, file$d, 24, 4, 621);
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
    		source: "(5:0) <WindowElement     gridColumnStart={20}     gridColumnEnd={60}     gridRowStart={2}     gridRowEnd={32}     backgroundColor=\\\"#7d7d7d\\\"     title=\\\"CLEAN.CODE\\\"     id={10}     isInForeground={false}     intersections={[3]}     intersectingSide=\\\"right\\\" >",
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
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			div = element("div");
    			img = element("img");
    			if (img.src !== (img_src_value = "images/Logopedia.svg")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "Logo Portfolio");
    			attr_dev(img, "class", "svelte-1lv5bc9");
    			add_location(img, file$e, 16, 8, 324);
    			attr_dev(div, "class", "svelte-1lv5bc9");
    			add_location(div, file$e, 15, 4, 310);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, img);
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
    			attr_dev(main, "class", "svelte-pb3yo0");
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
