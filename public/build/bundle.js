
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
    function empty() {
        return text('');
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
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
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
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
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

    /* src/UX/ScrollHandler.svelte generated by Svelte v3.32.1 */

    const { window: window_1 } = globals;
    const file = "src/UX/ScrollHandler.svelte";

    function create_fragment(ctx) {
    	let div;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "grabbable svelte-broixr");
    			toggle_class(div, "mousedown", /*isMousedown*/ ctx[0]);
    			add_location(div, file, 43, 0, 1437);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			/*div_binding*/ ctx[4](div);

    			if (!mounted) {
    				dispose = [
    					listen_dev(window_1, "wheel", stop_propagation(prevent_default(wheelHandler)), { passive: false }, true, true),
    					listen_dev(div, "mousedown", /*handleMousedown*/ ctx[2], false, false, false),
    					listen_dev(div, "mouseup", /*handleMouseup*/ ctx[3], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*isMousedown*/ 1) {
    				toggle_class(div, "mousedown", /*isMousedown*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			/*div_binding*/ ctx[4](null);
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

    function wheelHandler(event) {
    	let reducedDeltaY = Math.round(event.deltaY / 2);
    	let reducedDeltaX = Math.round(event.deltaX / 2);
    	window.scrollBy(reducedDeltaX, reducedDeltaY);
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("ScrollHandler", slots, []);
    	let isMousedown = false;
    	let initialM = { x: 0, y: 0 };
    	let currentM = { x: 0, y: 0 };
    	let background;

    	// The following functions take care of the grab handling
    	function handleMousedown(event) {
    		$$invalidate(0, isMousedown = true);
    		initialM.x = event.clientX;
    		initialM.y = event.clientY;
    		background.addEventListener("mousemove", handleMousemove);
    		background.addEventListener("mouseout", handleMouseup);
    		let selection = window.getSelection();
    		selection.removeAllRanges();
    	}

    	function handleMouseup() {
    		$$invalidate(0, isMousedown = false);
    		background.removeEventListener("mousemove", handleMousemove);
    		background.removeEventListener("mouseout", handleMouseup);
    	}

    	function handleMousemove(event) {
    		currentM.x = event.clientX;
    		currentM.y = event.clientY;
    		const deltaX = initialM.x - currentM.x;
    		const deltaY = initialM.y - currentM.y;
    		window.scrollBy(deltaX, deltaY);
    		initialM.x = event.clientX;
    		initialM.y = event.clientY;
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ScrollHandler> was created with unknown prop '${key}'`);
    	});

    	function div_binding($$value) {
    		binding_callbacks[$$value ? "unshift" : "push"](() => {
    			background = $$value;
    			$$invalidate(1, background);
    		});
    	}

    	$$self.$capture_state = () => ({
    		isMousedown,
    		initialM,
    		currentM,
    		background,
    		wheelHandler,
    		handleMousedown,
    		handleMouseup,
    		handleMousemove
    	});

    	$$self.$inject_state = $$props => {
    		if ("isMousedown" in $$props) $$invalidate(0, isMousedown = $$props.isMousedown);
    		if ("initialM" in $$props) initialM = $$props.initialM;
    		if ("currentM" in $$props) currentM = $$props.currentM;
    		if ("background" in $$props) $$invalidate(1, background = $$props.background);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [isMousedown, background, handleMousedown, handleMouseup, div_binding];
    }

    class ScrollHandler extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ScrollHandler",
    			options,
    			id: create_fragment.name
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
                    window.zIndex = 10;
                    window.isInForeground = true;
                    let updatedWindowObjects = windowObjects.filter(wndw => true);
                    updatedWindowObjects[windowIndex] = window;
                    window.intersections.forEach(intersectingID => {
                        let intersectingWindow = windowObjects.find(wndw => wndw.id === intersectingID);
                        const intersectingWindowIndex = windowObjects.indexOf(intersectingWindow);
                        intersectingWindow.zIndex = 5;
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
    const file$1 = "src/UI/WindowElement.svelte";

    // (107:8) {:else}
    function create_else_block_1(ctx) {
    	let h1;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "Title";
    			attr_dev(h1, "class", "svelte-5cwxig");
    			add_location(h1, file$1, 107, 12, 3843);
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
    		source: "(107:8) {:else}",
    		ctx
    	});

    	return block;
    }

    // (105:8) {#if title}
    function create_if_block_1(ctx) {
    	let h1;
    	let t;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			t = text(/*title*/ ctx[12]);
    			attr_dev(h1, "class", "svelte-5cwxig");
    			add_location(h1, file$1, 105, 12, 3798);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    			append_dev(h1, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*title*/ 4096) set_data_dev(t, /*title*/ ctx[12]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(105:8) {#if title}",
    		ctx
    	});

    	return block;
    }

    // (163:8) {:else}
    function create_else_block(ctx) {
    	let button;

    	const block = {
    		c: function create() {
    			button = element("button");
    			attr_dev(button, "class", "disabled svelte-5cwxig");
    			add_location(button, file$1, 163, 12, 6397);
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
    		source: "(163:8) {:else}",
    		ctx
    	});

    	return block;
    }

    // (110:8) {#if enlargeable}
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
    			t1 = text(/*title*/ ctx[12]);
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
    			attr_dev(span, "class", "svelte-5cwxig");
    			add_location(span, file$1, 111, 16, 3951);
    			add_location(title_1, file$1, 118, 20, 4220);
    			attr_dev(rect0, "x", ".5");
    			attr_dev(rect0, "y", ".5");
    			attr_dev(rect0, "width", "53");
    			attr_dev(rect0, "height", "14");
    			attr_dev(rect0, "rx", "3");
    			attr_dev(rect0, "fill", "#151515");
    			attr_dev(rect0, "stroke", "#FEFEFE");
    			add_location(rect0, file$1, 123, 36, 4527);
    			attr_dev(rect1, "x", "17");
    			attr_dev(rect1, "y", "6");
    			attr_dev(rect1, "width", "20");
    			attr_dev(rect1, "height", "1");
    			attr_dev(rect1, "fill", "#FEFEFE");
    			add_location(rect1, file$1, 132, 36, 4964);
    			attr_dev(polygon0, "points", "47 7 37 4 37 7");
    			attr_dev(polygon0, "fill", "#FEFEFE");
    			add_location(polygon0, file$1, 139, 36, 5295);
    			attr_dev(rect2, "transform", "translate(27 8.5) rotate(180) translate(-27 -8.5)");
    			attr_dev(rect2, "x", "17");
    			attr_dev(rect2, "y", "8");
    			attr_dev(rect2, "width", "20");
    			attr_dev(rect2, "height", "1");
    			attr_dev(rect2, "fill", "#FEFEFE");
    			add_location(rect2, file$1, 143, 36, 5498);
    			attr_dev(polygon1, "transform", "translate(12 9.5) rotate(180) translate(-12 -9.5)");
    			attr_dev(polygon1, "points", "17 11 7 8 7 11");
    			attr_dev(polygon1, "fill", "#FEFEFE");
    			add_location(polygon1, file$1, 151, 36, 5931);
    			attr_dev(g0, "transform", "translate(436 9)");
    			add_location(g0, file$1, 122, 32, 4458);
    			attr_dev(g1, "transform", "translate(606 1483)");
    			add_location(g1, file$1, 121, 28, 4390);
    			attr_dev(g2, "transform", "translate(-1042 -1492)");
    			add_location(g2, file$1, 120, 24, 4323);
    			attr_dev(g3, "fill", "none");
    			attr_dev(g3, "fill-rule", "evenodd");
    			add_location(g3, file$1, 119, 20, 4263);
    			attr_dev(svg, "version", "1.1");
    			attr_dev(svg, "viewBox", "0 0 54 15");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "role", "presentation");
    			attr_dev(svg, "class", "svelte-5cwxig");
    			add_location(svg, file$1, 112, 16, 4008);
    			attr_dev(button, "class", "enlarge svelte-5cwxig");
    			add_location(button, file$1, 110, 12, 3910);
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
    			if (dirty & /*title*/ 4096) set_data_dev(t1, /*title*/ ctx[12]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(110:8) {#if enlargeable}",
    		ctx
    	});

    	return block;
    }

    // (171:14) <p>
    function fallback_block(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "Content goes here";
    			add_location(p, file$1, 170, 14, 6581);
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
    		source: "(171:14) <p>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
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
    		if (/*title*/ ctx[12]) return create_if_block_1;
    		return create_else_block_1;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block0 = current_block_type(ctx);

    	function select_block_type_1(ctx, dirty) {
    		if (/*enlargeable*/ ctx[13]) return create_if_block;
    		return create_else_block;
    	}

    	let current_block_type_1 = select_block_type_1(ctx);
    	let if_block1 = current_block_type_1(ctx);
    	const default_slot_template = /*#slots*/ ctx[21].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[20], null);
    	const default_slot_or_fallback = default_slot || fallback_block(ctx);

    	const block = {
    		c: function create() {
    			section = element("section");
    			header = element("header");
    			button = element("button");
    			span = element("span");
    			t0 = text("Shrink this ");
    			t1 = text(/*title*/ ctx[12]);
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
    			attr_dev(span, "class", "svelte-5cwxig");
    			add_location(span, file$1, 70, 12, 2425);
    			add_location(title_1, file$1, 77, 16, 2665);
    			attr_dev(rect0, "x", ".5");
    			attr_dev(rect0, "y", ".5");
    			attr_dev(rect0, "width", "53");
    			attr_dev(rect0, "height", "14");
    			attr_dev(rect0, "rx", "3");
    			attr_dev(rect0, "fill", "#151515");
    			attr_dev(rect0, "stroke", "#FEFEFE");
    			add_location(rect0, file$1, 82, 32, 2949);
    			attr_dev(rect1, "x", "17");
    			attr_dev(rect1, "y", "7");
    			attr_dev(rect1, "width", "20");
    			attr_dev(rect1, "height", "1");
    			attr_dev(rect1, "fill", "#FEFEFE");
    			add_location(rect1, file$1, 91, 32, 3350);
    			attr_dev(g0, "transform", "translate(9 9)");
    			add_location(g0, file$1, 81, 28, 2886);
    			attr_dev(g1, "transform", "translate(606 1483)");
    			add_location(g1, file$1, 80, 24, 2822);
    			attr_dev(g2, "transform", "translate(-615 -1492)");
    			add_location(g2, file$1, 79, 20, 2760);
    			attr_dev(g3, "fill", "none");
    			attr_dev(g3, "fill-rule", "evenodd");
    			add_location(g3, file$1, 78, 16, 2704);
    			attr_dev(svg, "version", "1.1");
    			attr_dev(svg, "viewBox", "0 0 54 15");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "role", "presentation");
    			attr_dev(svg, "class", "svelte-5cwxig");
    			add_location(svg, file$1, 71, 12, 2477);
    			attr_dev(button, "class", "shrink svelte-5cwxig");
    			add_location(button, file$1, 69, 8, 2389);
    			attr_dev(header, "class", "svelte-5cwxig");
    			add_location(header, file$1, 68, 4, 2372);
    			set_style(article, "background-color", /*backgroundColor*/ ctx[11]);
    			attr_dev(article, "class", "svelte-5cwxig");
    			toggle_class(article, "no-events", !/*isInForeground*/ ctx[0]);
    			add_location(article, file$1, 166, 4, 6457);
    			add_location(footer, file$1, 172, 4, 6632);
    			set_style(section, "--gridColumnStart", /*gridColumnStart*/ ctx[3]);
    			set_style(section, "--gridColumnEnd", /*gridColumnEnd*/ ctx[4]);
    			set_style(section, "--gridRowStart", /*gridRowStart*/ ctx[5]);
    			set_style(section, "--gridRowEnd", /*gridRowEnd*/ ctx[6]);
    			set_style(section, "--largeGridColumnStart", /*largeGridColumnStart*/ ctx[7]);
    			set_style(section, "--largeGridColumnEnd", /*largeGridColumnEnd*/ ctx[8]);
    			set_style(section, "--largeGridRowStart", /*largeGridRowStart*/ ctx[9]);
    			set_style(section, "--largeGridRowEnd", /*largeGridRowEnd*/ ctx[10]);
    			set_style(section, "--shuffledistance", /*distanceFromIntersection*/ ctx[1] + "vmax");
    			set_style(section, "--largeshuffledistance", /*largeDistanceFromIntersection*/ ctx[2] + "vmax");
    			set_style(section, "position", "relative");
    			set_style(section, "z-index", /*zIndex*/ ctx[16]);
    			attr_dev(section, "class", "svelte-5cwxig");
    			toggle_class(section, "trigger-shuffle-right", !/*isInForeground*/ ctx[0] && /*intersectingSide*/ ctx[14] === "right" && /*touched*/ ctx[15]);
    			toggle_class(section, "trigger-shuffle-left", !/*isInForeground*/ ctx[0] && /*intersectingSide*/ ctx[14] === "left" && /*touched*/ ctx[15]);
    			add_location(section, file$1, 56, 0, 1631);
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
    				dispose = listen_dev(section, "click", /*handleWindowClick*/ ctx[17], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*title*/ 4096) set_data_dev(t1, /*title*/ ctx[12]);

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
    				if (default_slot.p && dirty & /*$$scope*/ 1048576) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[20], dirty, null, null);
    				}
    			}

    			if (!current || dirty & /*backgroundColor*/ 2048) {
    				set_style(article, "background-color", /*backgroundColor*/ ctx[11]);
    			}

    			if (dirty & /*isInForeground*/ 1) {
    				toggle_class(article, "no-events", !/*isInForeground*/ ctx[0]);
    			}

    			if (!current || dirty & /*gridColumnStart*/ 8) {
    				set_style(section, "--gridColumnStart", /*gridColumnStart*/ ctx[3]);
    			}

    			if (!current || dirty & /*gridColumnEnd*/ 16) {
    				set_style(section, "--gridColumnEnd", /*gridColumnEnd*/ ctx[4]);
    			}

    			if (!current || dirty & /*gridRowStart*/ 32) {
    				set_style(section, "--gridRowStart", /*gridRowStart*/ ctx[5]);
    			}

    			if (!current || dirty & /*gridRowEnd*/ 64) {
    				set_style(section, "--gridRowEnd", /*gridRowEnd*/ ctx[6]);
    			}

    			if (!current || dirty & /*largeGridColumnStart*/ 128) {
    				set_style(section, "--largeGridColumnStart", /*largeGridColumnStart*/ ctx[7]);
    			}

    			if (!current || dirty & /*largeGridColumnEnd*/ 256) {
    				set_style(section, "--largeGridColumnEnd", /*largeGridColumnEnd*/ ctx[8]);
    			}

    			if (!current || dirty & /*largeGridRowStart*/ 512) {
    				set_style(section, "--largeGridRowStart", /*largeGridRowStart*/ ctx[9]);
    			}

    			if (!current || dirty & /*largeGridRowEnd*/ 1024) {
    				set_style(section, "--largeGridRowEnd", /*largeGridRowEnd*/ ctx[10]);
    			}

    			if (!current || dirty & /*distanceFromIntersection*/ 2) {
    				set_style(section, "--shuffledistance", /*distanceFromIntersection*/ ctx[1] + "vmax");
    			}

    			if (!current || dirty & /*largeDistanceFromIntersection*/ 4) {
    				set_style(section, "--largeshuffledistance", /*largeDistanceFromIntersection*/ ctx[2] + "vmax");
    			}

    			if (!current || dirty & /*zIndex*/ 65536) {
    				set_style(section, "z-index", /*zIndex*/ ctx[16]);
    			}

    			if (dirty & /*isInForeground, intersectingSide, touched*/ 49153) {
    				toggle_class(section, "trigger-shuffle-right", !/*isInForeground*/ ctx[0] && /*intersectingSide*/ ctx[14] === "right" && /*touched*/ ctx[15]);
    			}

    			if (dirty & /*isInForeground, intersectingSide, touched*/ 49153) {
    				toggle_class(section, "trigger-shuffle-left", !/*isInForeground*/ ctx[0] && /*intersectingSide*/ ctx[14] === "left" && /*touched*/ ctx[15]);
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
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("WindowElement", slots, ['default']);
    	let { gridColumnStart } = $$props;
    	let { gridColumnEnd } = $$props;
    	let { gridRowStart } = $$props;
    	let { gridRowEnd } = $$props;
    	let { largeGridColumnStart = 0 } = $$props;
    	let { largeGridColumnEnd = 0 } = $$props;
    	let { largeGridRowStart = 0 } = $$props;
    	let { largeGridRowEnd = 0 } = $$props;
    	let { backgroundColor = "" } = $$props;
    	let { title } = $$props;
    	let { enlargeable = true } = $$props;
    	let { id } = $$props;
    	let { isInForeground = true } = $$props;
    	let { intersections = [] } = $$props;
    	let { intersectingSide = null } = $$props;
    	let { distanceFromIntersection = 20 } = $$props;
    	let { largeDistanceFromIntersection = 10 } = $$props;
    	distanceFromIntersection = distanceFromIntersection * 1.25;
    	largeDistanceFromIntersection = largeDistanceFromIntersection * 1.25;
    	let touched = false;
    	let zIndex = 5;
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
    		$$invalidate(16, zIndex = thisWindowObject.zIndex);
    		$$invalidate(15, touched = thisWindowObject.touched);
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
    		"largeGridColumnStart",
    		"largeGridColumnEnd",
    		"largeGridRowStart",
    		"largeGridRowEnd",
    		"backgroundColor",
    		"title",
    		"enlargeable",
    		"id",
    		"isInForeground",
    		"intersections",
    		"intersectingSide",
    		"distanceFromIntersection",
    		"largeDistanceFromIntersection"
    	];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<WindowElement> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("gridColumnStart" in $$props) $$invalidate(3, gridColumnStart = $$props.gridColumnStart);
    		if ("gridColumnEnd" in $$props) $$invalidate(4, gridColumnEnd = $$props.gridColumnEnd);
    		if ("gridRowStart" in $$props) $$invalidate(5, gridRowStart = $$props.gridRowStart);
    		if ("gridRowEnd" in $$props) $$invalidate(6, gridRowEnd = $$props.gridRowEnd);
    		if ("largeGridColumnStart" in $$props) $$invalidate(7, largeGridColumnStart = $$props.largeGridColumnStart);
    		if ("largeGridColumnEnd" in $$props) $$invalidate(8, largeGridColumnEnd = $$props.largeGridColumnEnd);
    		if ("largeGridRowStart" in $$props) $$invalidate(9, largeGridRowStart = $$props.largeGridRowStart);
    		if ("largeGridRowEnd" in $$props) $$invalidate(10, largeGridRowEnd = $$props.largeGridRowEnd);
    		if ("backgroundColor" in $$props) $$invalidate(11, backgroundColor = $$props.backgroundColor);
    		if ("title" in $$props) $$invalidate(12, title = $$props.title);
    		if ("enlargeable" in $$props) $$invalidate(13, enlargeable = $$props.enlargeable);
    		if ("id" in $$props) $$invalidate(18, id = $$props.id);
    		if ("isInForeground" in $$props) $$invalidate(0, isInForeground = $$props.isInForeground);
    		if ("intersections" in $$props) $$invalidate(19, intersections = $$props.intersections);
    		if ("intersectingSide" in $$props) $$invalidate(14, intersectingSide = $$props.intersectingSide);
    		if ("distanceFromIntersection" in $$props) $$invalidate(1, distanceFromIntersection = $$props.distanceFromIntersection);
    		if ("largeDistanceFromIntersection" in $$props) $$invalidate(2, largeDistanceFromIntersection = $$props.largeDistanceFromIntersection);
    		if ("$$scope" in $$props) $$invalidate(20, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		onDestroy,
    		windowHandler: windowHandler$1,
    		gridColumnStart,
    		gridColumnEnd,
    		gridRowStart,
    		gridRowEnd,
    		largeGridColumnStart,
    		largeGridColumnEnd,
    		largeGridRowStart,
    		largeGridRowEnd,
    		backgroundColor,
    		title,
    		enlargeable,
    		id,
    		isInForeground,
    		intersections,
    		intersectingSide,
    		distanceFromIntersection,
    		largeDistanceFromIntersection,
    		touched,
    		zIndex,
    		thisWindowObject,
    		unsubscribe,
    		handleWindowClick
    	});

    	$$self.$inject_state = $$props => {
    		if ("gridColumnStart" in $$props) $$invalidate(3, gridColumnStart = $$props.gridColumnStart);
    		if ("gridColumnEnd" in $$props) $$invalidate(4, gridColumnEnd = $$props.gridColumnEnd);
    		if ("gridRowStart" in $$props) $$invalidate(5, gridRowStart = $$props.gridRowStart);
    		if ("gridRowEnd" in $$props) $$invalidate(6, gridRowEnd = $$props.gridRowEnd);
    		if ("largeGridColumnStart" in $$props) $$invalidate(7, largeGridColumnStart = $$props.largeGridColumnStart);
    		if ("largeGridColumnEnd" in $$props) $$invalidate(8, largeGridColumnEnd = $$props.largeGridColumnEnd);
    		if ("largeGridRowStart" in $$props) $$invalidate(9, largeGridRowStart = $$props.largeGridRowStart);
    		if ("largeGridRowEnd" in $$props) $$invalidate(10, largeGridRowEnd = $$props.largeGridRowEnd);
    		if ("backgroundColor" in $$props) $$invalidate(11, backgroundColor = $$props.backgroundColor);
    		if ("title" in $$props) $$invalidate(12, title = $$props.title);
    		if ("enlargeable" in $$props) $$invalidate(13, enlargeable = $$props.enlargeable);
    		if ("id" in $$props) $$invalidate(18, id = $$props.id);
    		if ("isInForeground" in $$props) $$invalidate(0, isInForeground = $$props.isInForeground);
    		if ("intersections" in $$props) $$invalidate(19, intersections = $$props.intersections);
    		if ("intersectingSide" in $$props) $$invalidate(14, intersectingSide = $$props.intersectingSide);
    		if ("distanceFromIntersection" in $$props) $$invalidate(1, distanceFromIntersection = $$props.distanceFromIntersection);
    		if ("largeDistanceFromIntersection" in $$props) $$invalidate(2, largeDistanceFromIntersection = $$props.largeDistanceFromIntersection);
    		if ("touched" in $$props) $$invalidate(15, touched = $$props.touched);
    		if ("zIndex" in $$props) $$invalidate(16, zIndex = $$props.zIndex);
    		if ("thisWindowObject" in $$props) thisWindowObject = $$props.thisWindowObject;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		isInForeground,
    		distanceFromIntersection,
    		largeDistanceFromIntersection,
    		gridColumnStart,
    		gridColumnEnd,
    		gridRowStart,
    		gridRowEnd,
    		largeGridColumnStart,
    		largeGridColumnEnd,
    		largeGridRowStart,
    		largeGridRowEnd,
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

    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {
    			gridColumnStart: 3,
    			gridColumnEnd: 4,
    			gridRowStart: 5,
    			gridRowEnd: 6,
    			largeGridColumnStart: 7,
    			largeGridColumnEnd: 8,
    			largeGridRowStart: 9,
    			largeGridRowEnd: 10,
    			backgroundColor: 11,
    			title: 12,
    			enlargeable: 13,
    			id: 18,
    			isInForeground: 0,
    			intersections: 19,
    			intersectingSide: 14,
    			distanceFromIntersection: 1,
    			largeDistanceFromIntersection: 2
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "WindowElement",
    			options,
    			id: create_fragment$1.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*gridColumnStart*/ ctx[3] === undefined && !("gridColumnStart" in props)) {
    			console.warn("<WindowElement> was created without expected prop 'gridColumnStart'");
    		}

    		if (/*gridColumnEnd*/ ctx[4] === undefined && !("gridColumnEnd" in props)) {
    			console.warn("<WindowElement> was created without expected prop 'gridColumnEnd'");
    		}

    		if (/*gridRowStart*/ ctx[5] === undefined && !("gridRowStart" in props)) {
    			console.warn("<WindowElement> was created without expected prop 'gridRowStart'");
    		}

    		if (/*gridRowEnd*/ ctx[6] === undefined && !("gridRowEnd" in props)) {
    			console.warn("<WindowElement> was created without expected prop 'gridRowEnd'");
    		}

    		if (/*title*/ ctx[12] === undefined && !("title" in props)) {
    			console.warn("<WindowElement> was created without expected prop 'title'");
    		}

    		if (/*id*/ ctx[18] === undefined && !("id" in props)) {
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

    	get largeGridColumnStart() {
    		throw new Error("<WindowElement>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set largeGridColumnStart(value) {
    		throw new Error("<WindowElement>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get largeGridColumnEnd() {
    		throw new Error("<WindowElement>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set largeGridColumnEnd(value) {
    		throw new Error("<WindowElement>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get largeGridRowStart() {
    		throw new Error("<WindowElement>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set largeGridRowStart(value) {
    		throw new Error("<WindowElement>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get largeGridRowEnd() {
    		throw new Error("<WindowElement>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set largeGridRowEnd(value) {
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

    	get largeDistanceFromIntersection() {
    		throw new Error("<WindowElement>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set largeDistanceFromIntersection(value) {
    		throw new Error("<WindowElement>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Windows/AboutWindow.svelte generated by Svelte v3.32.1 */
    const file$2 = "src/Windows/AboutWindow.svelte";

    // (5:0) <WindowElement     gridColumnStart={105}     gridColumnEnd={135}     gridRowStart={115}     gridRowEnd={155}     largeGridColumnStart={125}     largeGridColumnEnd={145}     largeGridRowStart={112}     largeGridRowEnd={138}     backgroundColor="#A25C24"     title="ABOUT"     id={0}     isInForeground={true}     intersections={[1]}     intersectingSide="left"     distanceFromIntersection={15}     largeDistanceFromIntersection={6} >
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
    			add_location(br0, file$2, 22, 12, 526);
    			add_location(br1, file$2, 22, 21, 535);
    			add_location(br2, file$2, 22, 32, 546);
    			attr_dev(p, "class", "svelte-16wbfzu");
    			add_location(p, file$2, 22, 4, 518);
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
    		source: "(5:0) <WindowElement     gridColumnStart={105}     gridColumnEnd={135}     gridRowStart={115}     gridRowEnd={155}     largeGridColumnStart={125}     largeGridColumnEnd={145}     largeGridRowStart={112}     largeGridRowEnd={138}     backgroundColor=\\\"#A25C24\\\"     title=\\\"ABOUT\\\"     id={0}     isInForeground={true}     intersections={[1]}     intersectingSide=\\\"left\\\"     distanceFromIntersection={15}     largeDistanceFromIntersection={6} >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let windowelement;
    	let current;

    	windowelement = new WindowElement({
    			props: {
    				gridColumnStart: 105,
    				gridColumnEnd: 135,
    				gridRowStart: 115,
    				gridRowEnd: 155,
    				largeGridColumnStart: 125,
    				largeGridColumnEnd: 145,
    				largeGridRowStart: 112,
    				largeGridRowEnd: 138,
    				backgroundColor: "#A25C24",
    				title: "ABOUT",
    				id: 0,
    				isInForeground: true,
    				intersections: [1],
    				intersectingSide: "left",
    				distanceFromIntersection: 15,
    				largeDistanceFromIntersection: 6,
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
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "AboutWindow",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src/UX/IntersectionObserver.svelte generated by Svelte v3.32.1 */
    const file$3 = "src/UX/IntersectionObserver.svelte";
    const get_default_slot_changes = dirty => ({ intersecting: dirty & /*intersecting*/ 1 });
    const get_default_slot_context = ctx => ({ intersecting: /*intersecting*/ ctx[0] });

    function create_fragment$3(ctx) {
    	let div;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[8].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[7], get_default_slot_context);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div, "class", "svelte-1hzn8rv");
    			add_location(div, file$3, 42, 0, 1436);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			/*div_binding*/ ctx[9](div);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope, intersecting*/ 129) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[7], dirty, get_default_slot_changes, get_default_slot_context);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    			/*div_binding*/ ctx[9](null);
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
    	validate_slots("IntersectionObserver", slots, ['default']);
    	let { once = false } = $$props;
    	let { top = 0 } = $$props;
    	let { bottom = 0 } = $$props;
    	let { left = 0 } = $$props;
    	let { right = 0 } = $$props;
    	let intersecting = false;
    	let container;

    	onMount(() => {
    		if (typeof IntersectionObserver !== "undefined") {
    			const rootMargin = `${bottom}px ${left}px ${top}px ${right}px`;

    			const observer = new IntersectionObserver(entries => {
    					$$invalidate(0, intersecting = entries[0].isIntersecting);

    					if (intersecting && once) {
    						observer.unobserve(container);
    					}
    				},
    			{ rootMargin });

    			observer.observe(container);
    			return () => observer.unobserve(container);
    		}

    		function handler() {
    			const bcr = container.getBoundingClientRect();
    			$$invalidate(0, intersecting = bcr.bottom + bottom > 0 && bcr.right + right > 0 && bcr.top - top < window.innerHeight && bcr.left - left < window.innerWidth);

    			if (intersecting && once) {
    				window.removeEventListener("scroll", handler);
    			}
    		}

    		window.addEventListener("scroll", handler);
    		return () => window.removeEventListener("scroll", handler);
    	});

    	const writable_props = ["once", "top", "bottom", "left", "right"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<IntersectionObserver> was created with unknown prop '${key}'`);
    	});

    	function div_binding($$value) {
    		binding_callbacks[$$value ? "unshift" : "push"](() => {
    			container = $$value;
    			$$invalidate(1, container);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ("once" in $$props) $$invalidate(2, once = $$props.once);
    		if ("top" in $$props) $$invalidate(3, top = $$props.top);
    		if ("bottom" in $$props) $$invalidate(4, bottom = $$props.bottom);
    		if ("left" in $$props) $$invalidate(5, left = $$props.left);
    		if ("right" in $$props) $$invalidate(6, right = $$props.right);
    		if ("$$scope" in $$props) $$invalidate(7, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		once,
    		top,
    		bottom,
    		left,
    		right,
    		intersecting,
    		container
    	});

    	$$self.$inject_state = $$props => {
    		if ("once" in $$props) $$invalidate(2, once = $$props.once);
    		if ("top" in $$props) $$invalidate(3, top = $$props.top);
    		if ("bottom" in $$props) $$invalidate(4, bottom = $$props.bottom);
    		if ("left" in $$props) $$invalidate(5, left = $$props.left);
    		if ("right" in $$props) $$invalidate(6, right = $$props.right);
    		if ("intersecting" in $$props) $$invalidate(0, intersecting = $$props.intersecting);
    		if ("container" in $$props) $$invalidate(1, container = $$props.container);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		intersecting,
    		container,
    		once,
    		top,
    		bottom,
    		left,
    		right,
    		$$scope,
    		slots,
    		div_binding
    	];
    }

    class IntersectionObserver_1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {
    			once: 2,
    			top: 3,
    			bottom: 4,
    			left: 5,
    			right: 6
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "IntersectionObserver_1",
    			options,
    			id: create_fragment$3.name
    		});
    	}

    	get once() {
    		throw new Error("<IntersectionObserver>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set once(value) {
    		throw new Error("<IntersectionObserver>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get top() {
    		throw new Error("<IntersectionObserver>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set top(value) {
    		throw new Error("<IntersectionObserver>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get bottom() {
    		throw new Error("<IntersectionObserver>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set bottom(value) {
    		throw new Error("<IntersectionObserver>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get left() {
    		throw new Error("<IntersectionObserver>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set left(value) {
    		throw new Error("<IntersectionObserver>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get right() {
    		throw new Error("<IntersectionObserver>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set right(value) {
    		throw new Error("<IntersectionObserver>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/UI/Image.svelte generated by Svelte v3.32.1 */
    const file$4 = "src/UI/Image.svelte";

    function create_fragment$4(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			attr_dev(img, "sizes", /*sizes*/ ctx[3]);
    			attr_dev(img, "srcset", /*srcset*/ ctx[0]);
    			attr_dev(img, "alt", /*alt*/ ctx[2]);
    			if (img.src !== (img_src_value = /*src*/ ctx[1])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "class", "svelte-l4ev2d");
    			toggle_class(img, "loaded", /*loaded*/ ctx[4]);
    			add_location(img, file$4, 18, 0, 290);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    			/*img_binding*/ ctx[6](img);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*sizes*/ 8) {
    				attr_dev(img, "sizes", /*sizes*/ ctx[3]);
    			}

    			if (dirty & /*srcset*/ 1) {
    				attr_dev(img, "srcset", /*srcset*/ ctx[0]);
    			}

    			if (dirty & /*alt*/ 4) {
    				attr_dev(img, "alt", /*alt*/ ctx[2]);
    			}

    			if (dirty & /*src*/ 2 && img.src !== (img_src_value = /*src*/ ctx[1])) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty & /*loaded*/ 16) {
    				toggle_class(img, "loaded", /*loaded*/ ctx[4]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    			/*img_binding*/ ctx[6](null);
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
    	validate_slots("Image", slots, []);
    	let { srcset } = $$props;
    	let { src } = $$props;
    	let { alt } = $$props;
    	let { sizes } = $$props;
    	let loaded = false;
    	let thisImage;

    	onMount(() => {
    		$$invalidate(
    			5,
    			thisImage.onload = () => {
    				$$invalidate(4, loaded = true);
    			},
    			thisImage
    		);
    	});

    	const writable_props = ["srcset", "src", "alt", "sizes"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Image> was created with unknown prop '${key}'`);
    	});

    	function img_binding($$value) {
    		binding_callbacks[$$value ? "unshift" : "push"](() => {
    			thisImage = $$value;
    			$$invalidate(5, thisImage);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ("srcset" in $$props) $$invalidate(0, srcset = $$props.srcset);
    		if ("src" in $$props) $$invalidate(1, src = $$props.src);
    		if ("alt" in $$props) $$invalidate(2, alt = $$props.alt);
    		if ("sizes" in $$props) $$invalidate(3, sizes = $$props.sizes);
    	};

    	$$self.$capture_state = () => ({
    		srcset,
    		src,
    		alt,
    		sizes,
    		onMount,
    		loaded,
    		thisImage
    	});

    	$$self.$inject_state = $$props => {
    		if ("srcset" in $$props) $$invalidate(0, srcset = $$props.srcset);
    		if ("src" in $$props) $$invalidate(1, src = $$props.src);
    		if ("alt" in $$props) $$invalidate(2, alt = $$props.alt);
    		if ("sizes" in $$props) $$invalidate(3, sizes = $$props.sizes);
    		if ("loaded" in $$props) $$invalidate(4, loaded = $$props.loaded);
    		if ("thisImage" in $$props) $$invalidate(5, thisImage = $$props.thisImage);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [srcset, src, alt, sizes, loaded, thisImage, img_binding];
    }

    class Image extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, { srcset: 0, src: 1, alt: 2, sizes: 3 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Image",
    			options,
    			id: create_fragment$4.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*srcset*/ ctx[0] === undefined && !("srcset" in props)) {
    			console.warn("<Image> was created without expected prop 'srcset'");
    		}

    		if (/*src*/ ctx[1] === undefined && !("src" in props)) {
    			console.warn("<Image> was created without expected prop 'src'");
    		}

    		if (/*alt*/ ctx[2] === undefined && !("alt" in props)) {
    			console.warn("<Image> was created without expected prop 'alt'");
    		}

    		if (/*sizes*/ ctx[3] === undefined && !("sizes" in props)) {
    			console.warn("<Image> was created without expected prop 'sizes'");
    		}
    	}

    	get srcset() {
    		throw new Error("<Image>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set srcset(value) {
    		throw new Error("<Image>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get src() {
    		throw new Error("<Image>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set src(value) {
    		throw new Error("<Image>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get alt() {
    		throw new Error("<Image>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set alt(value) {
    		throw new Error("<Image>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get sizes() {
    		throw new Error("<Image>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set sizes(value) {
    		throw new Error("<Image>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/UX/ImageLoader.svelte generated by Svelte v3.32.1 */

    // (11:4) {#if intersecting}
    function create_if_block$1(ctx) {
    	let image;
    	let current;

    	image = new Image({
    			props: {
    				srcset: /*srcset*/ ctx[3],
    				sizes: /*sizes*/ ctx[2],
    				alt: /*alt*/ ctx[1],
    				src: /*src*/ ctx[0]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(image.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(image, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const image_changes = {};
    			if (dirty & /*srcset*/ 8) image_changes.srcset = /*srcset*/ ctx[3];
    			if (dirty & /*sizes*/ 4) image_changes.sizes = /*sizes*/ ctx[2];
    			if (dirty & /*alt*/ 2) image_changes.alt = /*alt*/ ctx[1];
    			if (dirty & /*src*/ 1) image_changes.src = /*src*/ ctx[0];
    			image.$set(image_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(image.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(image.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(image, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(11:4) {#if intersecting}",
    		ctx
    	});

    	return block;
    }

    // (10:0) <IntersectionObserver once={true} let:intersecting>
    function create_default_slot$1(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*intersecting*/ ctx[4] && create_if_block$1(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (/*intersecting*/ ctx[4]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*intersecting*/ 16) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$1(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$1.name,
    		type: "slot",
    		source: "(10:0) <IntersectionObserver once={true} let:intersecting>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let intersectionobserver;
    	let current;

    	intersectionobserver = new IntersectionObserver_1({
    			props: {
    				once: true,
    				$$slots: {
    					default: [
    						create_default_slot$1,
    						({ intersecting }) => ({ 4: intersecting }),
    						({ intersecting }) => intersecting ? 16 : 0
    					]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(intersectionobserver.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(intersectionobserver, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const intersectionobserver_changes = {};

    			if (dirty & /*$$scope, srcset, sizes, alt, src, intersecting*/ 63) {
    				intersectionobserver_changes.$$scope = { dirty, ctx };
    			}

    			intersectionobserver.$set(intersectionobserver_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(intersectionobserver.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(intersectionobserver.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(intersectionobserver, detaching);
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
    	validate_slots("ImageLoader", slots, []);
    	let { src } = $$props;
    	let { alt } = $$props;
    	let { sizes } = $$props;
    	let { srcset } = $$props;
    	const writable_props = ["src", "alt", "sizes", "srcset"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ImageLoader> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("src" in $$props) $$invalidate(0, src = $$props.src);
    		if ("alt" in $$props) $$invalidate(1, alt = $$props.alt);
    		if ("sizes" in $$props) $$invalidate(2, sizes = $$props.sizes);
    		if ("srcset" in $$props) $$invalidate(3, srcset = $$props.srcset);
    	};

    	$$self.$capture_state = () => ({
    		src,
    		alt,
    		sizes,
    		srcset,
    		IntersectionObserver: IntersectionObserver_1,
    		Image
    	});

    	$$self.$inject_state = $$props => {
    		if ("src" in $$props) $$invalidate(0, src = $$props.src);
    		if ("alt" in $$props) $$invalidate(1, alt = $$props.alt);
    		if ("sizes" in $$props) $$invalidate(2, sizes = $$props.sizes);
    		if ("srcset" in $$props) $$invalidate(3, srcset = $$props.srcset);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [src, alt, sizes, srcset];
    }

    class ImageLoader extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, { src: 0, alt: 1, sizes: 2, srcset: 3 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ImageLoader",
    			options,
    			id: create_fragment$5.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*src*/ ctx[0] === undefined && !("src" in props)) {
    			console.warn("<ImageLoader> was created without expected prop 'src'");
    		}

    		if (/*alt*/ ctx[1] === undefined && !("alt" in props)) {
    			console.warn("<ImageLoader> was created without expected prop 'alt'");
    		}

    		if (/*sizes*/ ctx[2] === undefined && !("sizes" in props)) {
    			console.warn("<ImageLoader> was created without expected prop 'sizes'");
    		}

    		if (/*srcset*/ ctx[3] === undefined && !("srcset" in props)) {
    			console.warn("<ImageLoader> was created without expected prop 'srcset'");
    		}
    	}

    	get src() {
    		throw new Error("<ImageLoader>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set src(value) {
    		throw new Error("<ImageLoader>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get alt() {
    		throw new Error("<ImageLoader>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set alt(value) {
    		throw new Error("<ImageLoader>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get sizes() {
    		throw new Error("<ImageLoader>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set sizes(value) {
    		throw new Error("<ImageLoader>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get srcset() {
    		throw new Error("<ImageLoader>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set srcset(value) {
    		throw new Error("<ImageLoader>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Windows/ProjectCorazon.svelte generated by Svelte v3.32.1 */
    const file$5 = "src/Windows/ProjectCorazon.svelte";

    // (8:0) <WindowElement     gridColumnStart={80}     gridColumnEnd={120}     gridRowStart={125}     gridRowEnd={175}     largeGridColumnStart={105}     largeGridColumnEnd={131}     largeGridRowStart={120}     largeGridRowEnd={153}     title="PROJECT_01"     id={1}     isInForeground={false}     intersections={[0]}     intersectingSide="right"     distanceFromIntersection={15}     largeDistanceFromIntersection={6} >
    function create_default_slot$2(ctx) {
    	let div;
    	let imageloader;
    	let current;

    	imageloader = new ImageLoader({
    			props: {
    				sizes: "39.6vmax, (min-width: 1024px) 25.8vmax",
    				srcset: "https://res.cloudinary.com/thdrstnr/image/upload/w_960,f_auto/" + slug + " 960w,\n    https://res.cloudinary.com/thdrstnr/image/upload/w_840,f_auto/" + slug + " 840w,\n    https://res.cloudinary.com/thdrstnr/image/upload/w_720,f_auto/" + slug + " 720w,\n    https://res.cloudinary.com/thdrstnr/image/upload/w_600,f_auto/" + slug + " 600w,\n    https://res.cloudinary.com/thdrstnr/image/upload/w_480,f_auto/" + slug + " 480w,\n    https://res.cloudinary.com/thdrstnr/image/upload/w_360,f_auto/" + slug + " 360w,\n    https://res.cloudinary.com/thdrstnr/image/upload/w_240,f_auto/" + slug + " 240w,\n    https://res.cloudinary.com/thdrstnr/image/upload/w_120,f_auto/" + slug + " 120w,",
    				src: "https://res.cloudinary.com/thdrstnr/image/upload/w_960,f_auto/" + slug,
    				alt: "Con Corazón is embracing artisans from countries at war"
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(imageloader.$$.fragment);
    			attr_dev(div, "class", "svelte-1n9ckqy");
    			add_location(div, file$5, 24, 4, 613);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(imageloader, div, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(imageloader.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(imageloader.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(imageloader);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$2.name,
    		type: "slot",
    		source: "(8:0) <WindowElement     gridColumnStart={80}     gridColumnEnd={120}     gridRowStart={125}     gridRowEnd={175}     largeGridColumnStart={105}     largeGridColumnEnd={131}     largeGridRowStart={120}     largeGridRowEnd={153}     title=\\\"PROJECT_01\\\"     id={1}     isInForeground={false}     intersections={[0]}     intersectingSide=\\\"right\\\"     distanceFromIntersection={15}     largeDistanceFromIntersection={6} >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
    	let windowelement;
    	let current;

    	windowelement = new WindowElement({
    			props: {
    				gridColumnStart: 80,
    				gridColumnEnd: 120,
    				gridRowStart: 125,
    				gridRowEnd: 175,
    				largeGridColumnStart: 105,
    				largeGridColumnEnd: 131,
    				largeGridRowStart: 120,
    				largeGridRowEnd: 153,
    				title: "PROJECT_01",
    				id: 1,
    				isInForeground: false,
    				intersections: [0],
    				intersectingSide: "right",
    				distanceFromIntersection: 15,
    				largeDistanceFromIntersection: 6,
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

    const slug = "MortimerBaltus/Projects/ConCorazon_mksjj0";

    function instance$6($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("ProjectCorazon", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ProjectCorazon> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ WindowElement, ImageLoader, slug });
    	return [];
    }

    class ProjectCorazon extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ProjectCorazon",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    /* src/Windows/ProjectRaceworx.svelte generated by Svelte v3.32.1 */
    const file$6 = "src/Windows/ProjectRaceworx.svelte";

    // (8:0) <WindowElement     gridColumnStart={20}     gridColumnEnd={70}     gridRowStart={140}     gridRowEnd={175}     largeGridColumnStart={30}     largeGridColumnEnd={66}     largeGridRowStart={150}     largeGridRowEnd={173}     title="PROJECT_02"     id={2}     isInForeground={false}     intersections={[7]}     intersectingSide="left"     distanceFromIntersection={15}     largeDistanceFromIntersection={0} >
    function create_default_slot$3(ctx) {
    	let div;
    	let imageloader;
    	let current;

    	imageloader = new ImageLoader({
    			props: {
    				sizes: "49.6vmax, (min-width: 1024px) 32.8vmax",
    				srcset: "https://res.cloudinary.com/thdrstnr/image/upload/w_1280,f_auto/" + slug$1 + " 1280w,\n        https://res.cloudinary.com/thdrstnr/image/upload/w_960,f_auto/" + slug$1 + " 960w,\n        https://res.cloudinary.com/thdrstnr/image/upload/w_800,f_auto/" + slug$1 + " 800w,\n        https://res.cloudinary.com/thdrstnr/image/upload/w_640,f_auto/" + slug$1 + " 640w,\n        https://res.cloudinary.com/thdrstnr/image/upload/w_480,f_auto/" + slug$1 + " 480w,\n        https://res.cloudinary.com/thdrstnr/image/upload/w_320,f_auto/" + slug$1 + " 320w,\n        https://res.cloudinary.com/thdrstnr/image/upload/w_160,f_auto/" + slug$1 + " 160w,",
    				alt: "Raceworx",
    				src: "https://res.cloudinary.com/thdrstnr/image/upload/w_1280,f_auto/" + slug$1
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(imageloader.$$.fragment);
    			attr_dev(div, "class", "svelte-51g49l");
    			add_location(div, file$6, 24, 4, 607);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(imageloader, div, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(imageloader.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(imageloader.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(imageloader);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$3.name,
    		type: "slot",
    		source: "(8:0) <WindowElement     gridColumnStart={20}     gridColumnEnd={70}     gridRowStart={140}     gridRowEnd={175}     largeGridColumnStart={30}     largeGridColumnEnd={66}     largeGridRowStart={150}     largeGridRowEnd={173}     title=\\\"PROJECT_02\\\"     id={2}     isInForeground={false}     intersections={[7]}     intersectingSide=\\\"left\\\"     distanceFromIntersection={15}     largeDistanceFromIntersection={0} >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$7(ctx) {
    	let windowelement;
    	let current;

    	windowelement = new WindowElement({
    			props: {
    				gridColumnStart: 20,
    				gridColumnEnd: 70,
    				gridRowStart: 140,
    				gridRowEnd: 175,
    				largeGridColumnStart: 30,
    				largeGridColumnEnd: 66,
    				largeGridRowStart: 150,
    				largeGridRowEnd: 173,
    				title: "PROJECT_02",
    				id: 2,
    				isInForeground: false,
    				intersections: [7],
    				intersectingSide: "left",
    				distanceFromIntersection: 15,
    				largeDistanceFromIntersection: 0,
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

    const slug$1 = "MortimerBaltus/Projects/Raceworx_wfjyou";

    function instance$7($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("ProjectRaceworx", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ProjectRaceworx> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ WindowElement, ImageLoader, slug: slug$1 });
    	return [];
    }

    class ProjectRaceworx extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ProjectRaceworx",
    			options,
    			id: create_fragment$7.name
    		});
    	}
    }

    /* src/Windows/ProjectMueller.svelte generated by Svelte v3.32.1 */
    const file$7 = "src/Windows/ProjectMueller.svelte";

    // (8:0) <WindowElement     gridColumnStart={50}     gridColumnEnd={90}     gridRowStart={10}     gridRowEnd={50}     largeGridColumnStart={65}     largeGridColumnEnd={91}     largeGridRowStart={51}     largeGridRowEnd={77}     title="PROJECT_03"     id={3}     isInForeground={true}     intersections={[10]}     intersectingSide="left"     distanceFromIntersection={10}     largeDistanceFromIntersection={5} >
    function create_default_slot$4(ctx) {
    	let div;
    	let imageloader;
    	let current;

    	imageloader = new ImageLoader({
    			props: {
    				sizes: "39.6vmax, (min-width: 1024px) 25.8vmax",
    				srcset: "https://res.cloudinary.com/thdrstnr/image/upload/w_960,f_auto/" + slug$2 + " 960w,\n            https://res.cloudinary.com/thdrstnr/image/upload/w_840,f_auto/" + slug$2 + " 840w,\n            https://res.cloudinary.com/thdrstnr/image/upload/w_720,f_auto/" + slug$2 + " 720w,\n            https://res.cloudinary.com/thdrstnr/image/upload/w_600,f_auto/" + slug$2 + " 600w,\n            https://res.cloudinary.com/thdrstnr/image/upload/w_480,f_auto/" + slug$2 + " 480w,\n            https://res.cloudinary.com/thdrstnr/image/upload/w_360,f_auto/" + slug$2 + " 360w,\n            https://res.cloudinary.com/thdrstnr/image/upload/w_240,f_auto/" + slug$2 + " 240w,\n            https://res.cloudinary.com/thdrstnr/image/upload/w_120,f_auto/" + slug$2 + " 120w,",
    				src: "https://res.cloudinary.com/thdrstnr/image/upload/w_960,f_auto/" + slug$2,
    				alt: "Eberhard Müller develops sophisticated textile interiors at the highest level"
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(imageloader.$$.fragment);
    			attr_dev(div, "class", "svelte-pa8g7g");
    			add_location(div, file$7, 24, 4, 610);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(imageloader, div, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(imageloader.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(imageloader.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(imageloader);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$4.name,
    		type: "slot",
    		source: "(8:0) <WindowElement     gridColumnStart={50}     gridColumnEnd={90}     gridRowStart={10}     gridRowEnd={50}     largeGridColumnStart={65}     largeGridColumnEnd={91}     largeGridRowStart={51}     largeGridRowEnd={77}     title=\\\"PROJECT_03\\\"     id={3}     isInForeground={true}     intersections={[10]}     intersectingSide=\\\"left\\\"     distanceFromIntersection={10}     largeDistanceFromIntersection={5} >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$8(ctx) {
    	let windowelement;
    	let current;

    	windowelement = new WindowElement({
    			props: {
    				gridColumnStart: 50,
    				gridColumnEnd: 90,
    				gridRowStart: 10,
    				gridRowEnd: 50,
    				largeGridColumnStart: 65,
    				largeGridColumnEnd: 91,
    				largeGridRowStart: 51,
    				largeGridRowEnd: 77,
    				title: "PROJECT_03",
    				id: 3,
    				isInForeground: true,
    				intersections: [10],
    				intersectingSide: "left",
    				distanceFromIntersection: 10,
    				largeDistanceFromIntersection: 5,
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

    const slug$2 = "MortimerBaltus/Projects/EberhardMueller_v2tpxi";

    function instance$8($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("ProjectMueller", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ProjectMueller> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ WindowElement, ImageLoader, slug: slug$2 });
    	return [];
    }

    class ProjectMueller extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ProjectMueller",
    			options,
    			id: create_fragment$8.name
    		});
    	}
    }

    /* src/Windows/CookieWindow.svelte generated by Svelte v3.32.1 */
    const file$8 = "src/Windows/CookieWindow.svelte";

    // (5:0) <WindowElement     gridColumnStart={50}     gridColumnEnd={80}     gridRowStart={65}     gridRowEnd={90}     largeGridColumnStart={40}     largeGridColumnEnd={60}     largeGridRowStart={95}     largeGridRowEnd={112}     backgroundColor="#5E4B1B"     title="COOKIES"     enlargeable={false}     id={9}     isInForeground={true}     intersections={[8]}     intersectingSide="left"     distanceFromIntersection={11}     largeDistanceFromIntersection={6} >
    function create_default_slot$5(ctx) {
    	let p;
    	let t0;
    	let br;
    	let t1;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t0 = text("We use necessary cookies to ensure visitors have the best possible\n        experience on our site. Your privacy is important to us, therefore we\n        don’t use any tracking services by third-parties. ");
    			br = element("br");
    			t1 = text(" Please read our\n        Privacy Policy for more info on this!");
    			add_location(br, file$8, 26, 58, 752);
    			attr_dev(p, "class", "svelte-1rxx2zk");
    			add_location(p, file$8, 23, 4, 537);
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
    		id: create_default_slot$5.name,
    		type: "slot",
    		source: "(5:0) <WindowElement     gridColumnStart={50}     gridColumnEnd={80}     gridRowStart={65}     gridRowEnd={90}     largeGridColumnStart={40}     largeGridColumnEnd={60}     largeGridRowStart={95}     largeGridRowEnd={112}     backgroundColor=\\\"#5E4B1B\\\"     title=\\\"COOKIES\\\"     enlargeable={false}     id={9}     isInForeground={true}     intersections={[8]}     intersectingSide=\\\"left\\\"     distanceFromIntersection={11}     largeDistanceFromIntersection={6} >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$9(ctx) {
    	let windowelement;
    	let current;

    	windowelement = new WindowElement({
    			props: {
    				gridColumnStart: 50,
    				gridColumnEnd: 80,
    				gridRowStart: 65,
    				gridRowEnd: 90,
    				largeGridColumnStart: 40,
    				largeGridColumnEnd: 60,
    				largeGridRowStart: 95,
    				largeGridRowEnd: 112,
    				backgroundColor: "#5E4B1B",
    				title: "COOKIES",
    				enlargeable: false,
    				id: 9,
    				isInForeground: true,
    				intersections: [8],
    				intersectingSide: "left",
    				distanceFromIntersection: 11,
    				largeDistanceFromIntersection: 6,
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
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CookieWindow",
    			options,
    			id: create_fragment$9.name
    		});
    	}
    }

    /* src/windows/LegalWindow.svelte generated by Svelte v3.32.1 */
    const file$9 = "src/windows/LegalWindow.svelte";

    // (5:0) <WindowElement     gridColumnStart={5}     gridColumnEnd={45}     gridRowStart={165}     gridRowEnd={185}     largeGridColumnStart={8}     largeGridColumnEnd={34}     largeGridRowStart={185}     largeGridRowEnd={198}     backgroundColor="#1C6370"     title="LEGAL NOTICE"     id={7}     isInForeground={true}     intersections={[2]}     intersectingSide="right"     distanceFromIntersection={15}     largeDistanceFromIntersection={0} >
    function create_default_slot$6(ctx) {
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
    			add_location(br0, file$9, 23, 53, 577);
    			add_location(br1, file$9, 23, 59, 583);
    			attr_dev(p, "class", "svelte-140mtsd");
    			add_location(p, file$9, 22, 4, 520);
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
    		source: "(5:0) <WindowElement     gridColumnStart={5}     gridColumnEnd={45}     gridRowStart={165}     gridRowEnd={185}     largeGridColumnStart={8}     largeGridColumnEnd={34}     largeGridRowStart={185}     largeGridRowEnd={198}     backgroundColor=\\\"#1C6370\\\"     title=\\\"LEGAL NOTICE\\\"     id={7}     isInForeground={true}     intersections={[2]}     intersectingSide=\\\"right\\\"     distanceFromIntersection={15}     largeDistanceFromIntersection={0} >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$a(ctx) {
    	let windowelement;
    	let current;

    	windowelement = new WindowElement({
    			props: {
    				gridColumnStart: 5,
    				gridColumnEnd: 45,
    				gridRowStart: 165,
    				gridRowEnd: 185,
    				largeGridColumnStart: 8,
    				largeGridColumnEnd: 34,
    				largeGridRowStart: 185,
    				largeGridRowEnd: 198,
    				backgroundColor: "#1C6370",
    				title: "LEGAL NOTICE",
    				id: 7,
    				isInForeground: true,
    				intersections: [2],
    				intersectingSide: "right",
    				distanceFromIntersection: 15,
    				largeDistanceFromIntersection: 0,
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
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "LegalWindow",
    			options,
    			id: create_fragment$a.name
    		});
    	}
    }

    /* src/Windows/PrivacyWindow.svelte generated by Svelte v3.32.1 */
    const file$a = "src/Windows/PrivacyWindow.svelte";

    // (5:0) <WindowElement     gridColumnStart={158}     gridColumnEnd={198}     gridRowStart={173}     gridRowEnd={198}     largeGridColumnStart={172}     largeGridColumnEnd={198}     largeGridRowStart={182}     largeGridRowEnd={198}     backgroundColor="#FEC7A3"     title="PRIVACY POLICY"     id={5}     isInForeground={true} >
    function create_default_slot$7(ctx) {
    	let p;
    	let t0;
    	let br0;
    	let t1;
    	let br1;
    	let t2;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t0 = text("Eager to find out how browser-data is handled on our Website? ");
    			br0 = element("br");
    			t1 = space();
    			br1 = element("br");
    			t2 = text(" Surely this is just your cup of tea...");
    			add_location(br0, file$a, 19, 70, 477);
    			add_location(br1, file$a, 20, 8, 492);
    			attr_dev(p, "class", "svelte-140mtsd");
    			add_location(p, file$a, 18, 4, 403);
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
    		id: create_default_slot$7.name,
    		type: "slot",
    		source: "(5:0) <WindowElement     gridColumnStart={158}     gridColumnEnd={198}     gridRowStart={173}     gridRowEnd={198}     largeGridColumnStart={172}     largeGridColumnEnd={198}     largeGridRowStart={182}     largeGridRowEnd={198}     backgroundColor=\\\"#FEC7A3\\\"     title=\\\"PRIVACY POLICY\\\"     id={5}     isInForeground={true} >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$b(ctx) {
    	let windowelement;
    	let current;

    	windowelement = new WindowElement({
    			props: {
    				gridColumnStart: 158,
    				gridColumnEnd: 198,
    				gridRowStart: 173,
    				gridRowEnd: 198,
    				largeGridColumnStart: 172,
    				largeGridColumnEnd: 198,
    				largeGridRowStart: 182,
    				largeGridRowEnd: 198,
    				backgroundColor: "#FEC7A3",
    				title: "PRIVACY POLICY",
    				id: 5,
    				isInForeground: true,
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
    		init(this, options, instance$b, create_fragment$b, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "PrivacyWindow",
    			options,
    			id: create_fragment$b.name
    		});
    	}
    }

    /* src/Windows/ReferencesWindow.svelte generated by Svelte v3.32.1 */
    const file$b = "src/Windows/ReferencesWindow.svelte";

    // (5:0) <WindowElement     gridColumnStart={159}     gridColumnEnd={199}     gridRowStart={25}     gridRowEnd={75}     largeGridColumnStart={173}     largeGridColumnEnd={199}     largeGridRowStart={20}     largeGridRowEnd={53}     backgroundColor="#5F583D"     title="References"     enlargeable={false}     id={4}     isInForeground={true}     intersections={[11]}     intersectingSide="left"     distanceFromIntersection={31}     largeDistanceFromIntersection={7} >
    function create_default_slot$8(ctx) {
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
    			attr_dev(a0, "class", "svelte-wr62k6");
    			add_location(a0, file$b, 24, 12, 561);
    			attr_dev(li0, "class", "svelte-wr62k6");
    			add_location(li0, file$b, 24, 8, 557);
    			attr_dev(a1, "href", "www.reference.com");
    			attr_dev(a1, "class", "svelte-wr62k6");
    			add_location(a1, file$b, 25, 12, 632);
    			attr_dev(li1, "class", "svelte-wr62k6");
    			add_location(li1, file$b, 25, 8, 628);
    			attr_dev(a2, "href", "www.reference.com");
    			attr_dev(a2, "class", "svelte-wr62k6");
    			add_location(a2, file$b, 26, 12, 690);
    			attr_dev(li2, "class", "svelte-wr62k6");
    			add_location(li2, file$b, 26, 8, 686);
    			attr_dev(a3, "href", "www.reference.com");
    			attr_dev(a3, "class", "svelte-wr62k6");
    			add_location(a3, file$b, 28, 12, 764);
    			attr_dev(li3, "class", "svelte-wr62k6");
    			add_location(li3, file$b, 27, 8, 747);
    			attr_dev(a4, "href", "www.reference.com");
    			attr_dev(a4, "class", "svelte-wr62k6");
    			add_location(a4, file$b, 30, 12, 850);
    			attr_dev(li4, "class", "svelte-wr62k6");
    			add_location(li4, file$b, 30, 8, 846);
    			attr_dev(a5, "href", "www.reference.com");
    			attr_dev(a5, "class", "svelte-wr62k6");
    			add_location(a5, file$b, 31, 12, 926);
    			attr_dev(li5, "class", "svelte-wr62k6");
    			add_location(li5, file$b, 31, 8, 922);
    			attr_dev(a6, "href", "www.reference.com");
    			attr_dev(a6, "class", "svelte-wr62k6");
    			add_location(a6, file$b, 32, 12, 981);
    			attr_dev(li6, "class", "svelte-wr62k6");
    			add_location(li6, file$b, 32, 8, 977);
    			attr_dev(a7, "href", "www.reference.com");
    			attr_dev(a7, "class", "svelte-wr62k6");
    			add_location(a7, file$b, 33, 12, 1045);
    			attr_dev(li7, "class", "svelte-wr62k6");
    			add_location(li7, file$b, 33, 8, 1041);
    			attr_dev(a8, "href", "www.reference.com");
    			attr_dev(a8, "class", "svelte-wr62k6");
    			add_location(a8, file$b, 34, 12, 1107);
    			attr_dev(li8, "class", "svelte-wr62k6");
    			add_location(li8, file$b, 34, 8, 1103);
    			attr_dev(a9, "href", "www.reference.com");
    			attr_dev(a9, "class", "svelte-wr62k6");
    			add_location(a9, file$b, 36, 12, 1180);
    			attr_dev(li9, "class", "svelte-wr62k6");
    			add_location(li9, file$b, 35, 8, 1163);
    			attr_dev(a10, "href", "www.reference.com");
    			attr_dev(a10, "class", "svelte-wr62k6");
    			add_location(a10, file$b, 38, 12, 1267);
    			attr_dev(li10, "class", "svelte-wr62k6");
    			add_location(li10, file$b, 38, 8, 1263);
    			attr_dev(a11, "href", "www.reference.com");
    			attr_dev(a11, "class", "svelte-wr62k6");
    			add_location(a11, file$b, 39, 12, 1333);
    			attr_dev(li11, "class", "svelte-wr62k6");
    			add_location(li11, file$b, 39, 8, 1329);
    			attr_dev(a12, "href", "www.reference.com");
    			attr_dev(a12, "class", "svelte-wr62k6");
    			add_location(a12, file$b, 40, 12, 1391);
    			attr_dev(li12, "class", "svelte-wr62k6");
    			add_location(li12, file$b, 40, 8, 1387);
    			attr_dev(ul, "class", "svelte-wr62k6");
    			add_location(ul, file$b, 23, 4, 544);
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
    		id: create_default_slot$8.name,
    		type: "slot",
    		source: "(5:0) <WindowElement     gridColumnStart={159}     gridColumnEnd={199}     gridRowStart={25}     gridRowEnd={75}     largeGridColumnStart={173}     largeGridColumnEnd={199}     largeGridRowStart={20}     largeGridRowEnd={53}     backgroundColor=\\\"#5F583D\\\"     title=\\\"References\\\"     enlargeable={false}     id={4}     isInForeground={true}     intersections={[11]}     intersectingSide=\\\"left\\\"     distanceFromIntersection={31}     largeDistanceFromIntersection={7} >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$c(ctx) {
    	let windowelement;
    	let current;

    	windowelement = new WindowElement({
    			props: {
    				gridColumnStart: 159,
    				gridColumnEnd: 199,
    				gridRowStart: 25,
    				gridRowEnd: 75,
    				largeGridColumnStart: 173,
    				largeGridColumnEnd: 199,
    				largeGridRowStart: 20,
    				largeGridRowEnd: 53,
    				backgroundColor: "#5F583D",
    				title: "References",
    				enlargeable: false,
    				id: 4,
    				isInForeground: true,
    				intersections: [11],
    				intersectingSide: "left",
    				distanceFromIntersection: 31,
    				largeDistanceFromIntersection: 7,
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
    		id: create_fragment$c.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$c($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$c, create_fragment$c, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ReferencesWindow",
    			options,
    			id: create_fragment$c.name
    		});
    	}
    }

    /* src/Windows/GermanyJPG.svelte generated by Svelte v3.32.1 */
    const file$c = "src/Windows/GermanyJPG.svelte";

    // (17:0) <WindowElement     gridColumnStart={130}     gridColumnEnd={190}     gridRowStart={1}     gridRowEnd={41}     largeGridColumnStart={140}     largeGridColumnEnd={180}     largeGridRowStart={1}     largeGridRowEnd={27}     title={deGallery[randomIndex].name}     id={11}     isInForeground={false}     intersections={[4]}     intersectingSide="right"     distanceFromIntersection={31}     largeDistanceFromIntersection={7} >
    function create_default_slot$9(ctx) {
    	let div;
    	let imageloader;
    	let current;

    	imageloader = new ImageLoader({
    			props: {
    				srcset: "https://res.cloudinary.com/thdrstnr/image/upload/w_1280,f_auto/" + /*slug*/ ctx[2] + " 1280w,\n    https://res.cloudinary.com/thdrstnr/image/upload/w_960,f_auto/" + /*slug*/ ctx[2] + " 960w,\n    https://res.cloudinary.com/thdrstnr/image/upload/w_800,f_auto/" + /*slug*/ ctx[2] + " 800w,\n    https://res.cloudinary.com/thdrstnr/image/upload/w_640,f_auto/" + /*slug*/ ctx[2] + " 640w,\n    https://res.cloudinary.com/thdrstnr/image/upload/w_480,f_auto/" + /*slug*/ ctx[2] + " 480w,\n    https://res.cloudinary.com/thdrstnr/image/upload/w_320,f_auto/" + /*slug*/ ctx[2] + " 320w,\n    https://res.cloudinary.com/thdrstnr/image/upload/w_160,f_auto/" + /*slug*/ ctx[2] + " 160w,",
    				src: "https://res.cloudinary.com/thdrstnr/image/upload/w_1280,f_auto/" + /*slug*/ ctx[2],
    				sizes: "60vmax, (min-width: 1024px) 39.8vmax",
    				alt: /*deGallery*/ ctx[0][/*randomIndex*/ ctx[1]].alt
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(imageloader.$$.fragment);
    			set_style(div, "background-image", "url(data:image/svg+xml;base64," + /*deGallery*/ ctx[0][/*randomIndex*/ ctx[1]].svg + ")");
    			attr_dev(div, "class", "svelte-dki62i");
    			add_location(div, file$c, 33, 4, 3943);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(imageloader, div, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(imageloader.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(imageloader.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(imageloader);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$9.name,
    		type: "slot",
    		source: "(17:0) <WindowElement     gridColumnStart={130}     gridColumnEnd={190}     gridRowStart={1}     gridRowEnd={41}     largeGridColumnStart={140}     largeGridColumnEnd={180}     largeGridRowStart={1}     largeGridRowEnd={27}     title={deGallery[randomIndex].name}     id={11}     isInForeground={false}     intersections={[4]}     intersectingSide=\\\"right\\\"     distanceFromIntersection={31}     largeDistanceFromIntersection={7} >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$d(ctx) {
    	let windowelement;
    	let current;

    	windowelement = new WindowElement({
    			props: {
    				gridColumnStart: 130,
    				gridColumnEnd: 190,
    				gridRowStart: 1,
    				gridRowEnd: 41,
    				largeGridColumnStart: 140,
    				largeGridColumnEnd: 180,
    				largeGridRowStart: 1,
    				largeGridRowEnd: 27,
    				title: /*deGallery*/ ctx[0][/*randomIndex*/ ctx[1]].name,
    				id: 11,
    				isInForeground: false,
    				intersections: [4],
    				intersectingSide: "right",
    				distanceFromIntersection: 31,
    				largeDistanceFromIntersection: 7,
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

    			if (dirty & /*$$scope*/ 8) {
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
    	validate_slots("GermanyJPG", slots, []);

    	const deGallery = [
    		{
    			name: "OBERHAFEN.JPG",
    			src: "/MortimerBaltus/deGallery/Oberhafen_c5hvmx",
    			alt: "Oberhafen, Hamburg (DE)",
    			svg: "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjgwIDg1MyI+PHBhdGggZmlsbD0iIzFkMjYyOSIgZD0iTTAgMGgxMjgwdjg1MEgweiIvPjxnIGZpbGwtb3BhY2l0eT0iLjUiPjxwYXRoIGZpbGw9IiM1ODY4NmUiIGQ9Ik00MjkuNyA1MDAuMUwxNS42IDkyNy41bC05My4xLTYyNS4xIDE0MzUgMTczLjV6Ii8+PHBhdGggZD0iTTg5NC4yIDM0Ni44bDQ2My4zLTM0MUwtNzcuNS0xNGw0NjcuMyA0NTguOHoiLz48cGF0aCBmaWxsPSIjNTI2MzZiIiBkPSJNMTAzMC4yIDQ5OS4zbDMyMiA0MjguMi01Ni4zLTc0Mi4xLTU4NyAyNDIuNHoiLz48cGF0aCBmaWxsPSIjYzNjY2UwIiBkPSJNMzcuNyAyNTEuOWw2LjItMzggNjUuOCAxNDguNkwxMjYuOSA1MzV6Ii8+PHBhdGggZmlsbD0iI2UzZTdmYSIgZD0iTS03Ny41IDY3OC4xdi01Ni42bDIwMS4zLTkuMiAzMi40IDE5LjR6Ii8+PHBhdGggZD0iTTEzNDcuNiA1MjYuNmwtMzI5LjgtNDMuOC0yNjMtNDEuNyA2MDIuNyAxNjcuN3oiLz48cGF0aCBmaWxsPSIjYmJjN2Q3IiBkPSJNMTM1Ny41IDY4NS4zbC0yMTEtNTMuMy0yOC0xOCAxODUuNy03LjV6Ii8+PHBhdGggZD0iTTMwOC45LTc3LjVsLTEzNCA1NjktODcuNS0xNzYuM0wxMzU3LjUgMTA1eiIvPjxwYXRoIGZpbGw9IiNhZWFhYTkiIGQ9Ik0yNjUuNiA0ODRsNDQzLTcxLjdMMjM0LjggNDgxIDI1MiAyMzIuNXoiLz48cGF0aCBmaWxsPSIjYjVhZmIzIiBkPSJNMTEzOS40IDQ2OC4zbDg5LTI5Ni02OS43IDMzMi43LTcyLjItMjEuMnoiLz48cGF0aCBmaWxsPSIjMDAwMDAxIiBkPSJNMTE0MC4yIDQzNi4zbDcyLjQtMTg0LjMtMTkuOC0zMjkuNS04OC44IDQ5OC4yeiIvPjxwYXRoIGZpbGw9IiNlOWUzZjYiIGQ9Ik0xMjE2IDQ2MS4zbC0zLjItMzA4LjcgMTAuNCAxMTguMi00LjcgMTc2LjJ6Ii8+PHBhdGggZmlsbD0iIzg3OTc5YiIgZD0iTTEwMzguNCAzNDcuNWwtOS40IDEyMS4zLTkwLjctMi4zIDY3LjMtMTc0LjV6Ii8+PHBhdGggZmlsbD0iIzAyMDYwMCIgZD0iTTU3OS44IDQzNi45bC0xMTYuOSAyOS01NDAuNCAxMjguNCA4Ny40LTcxeiIvPjxwYXRoIGZpbGw9IiNmNGYzZmYiIGQ9Ik01NSAzNjQuN2wuMi0xMDIuOC0xMi40LTM0IC43IDEzNy4zeiIvPjxwYXRoIGZpbGw9IiM1YzY4NmYiIGQ9Ik0xMzIuMiAyOUwxNTkgMzcwbC0yMi40LTEyMkw4MS41LTR6Ii8+PHBhdGggZmlsbD0iIzBkMTUxOCIgZD0iTTk2Mi42IDkyNy41SDM5Ni44TDI4Ni42IDU1MC43bDY2Ni43LTIyeiIvPjxwYXRoIGZpbGw9IiNhMzlmOWQiIGQ9Ik0xMDkuMyA0OTMuMmwtMTg1LjYgNDBMMTk0IDQ5Ni44IDcyLjIgMzg5LjJ6Ii8+PHBhdGggZmlsbD0iIzczODg5NSIgZD0iTTEyNDcuNiA1MDUuNGwxLjktMjgwLjcgMjEuMy01OS4xIDcyLjQgMzY4LjV6Ii8+PHBhdGggZmlsbD0iIzUwNWY2NCIgZD0iTTExMzgtMzZsNjQtMzktNzggMzQwLTEtMjguOHoiLz48cGF0aCBmaWxsPSIjYjRjMmQwIiBkPSJNMTAwNC4xIDYzOC45bC0xMS4zLTIyIDItNCA3MS45LTEuM3oiLz48cGF0aCBmaWxsPSIjMDAwMTA2IiBkPSJNLTc3LjUtNTYuNmwxMjggMjcyLjJMNjIgMzM5LjRsNzUuMy0yODEuN3oiLz48cGF0aCBmaWxsPSIjNjU2ZTc1IiBkPSJNLTcyLjIgNTk0LjZMNzQwIDQwNS43IDI1MC40IDU2NiAzMC43IDYyOXoiLz48cGF0aCBmaWxsPSIjMDAwMjA2IiBkPSJNMTI2Mi45IDQ4Mi40bC0xMC4xLTEwLTE0LjYtMzkyLTIxLjIgNDI2LjJ6Ii8+PHBhdGggZmlsbD0iIzAxMDEwMCIgZD0iTTU4OC44IDQyNy43TDEwMzcuNyAyNDcgMTAyOSAuMyA5NC0xNC40eiIvPjxwYXRoIGZpbGw9IiM0ODUyNTYiIGQ9Ik0yMDggMTg4LjNsOS43LTExMi44IDMxLjYgNTEuNS01MS42IDE5OXoiLz48cGF0aCBmaWxsPSIjMWUzMjNiIiBkPSJNLTYxLjEgNzc2TDc4LjMgNjUxLjIgNDkzIDYyOS44IDc5IDkyNy41eiIvPjxwYXRoIGZpbGw9IiMwZDE1MTUiIGQ9Ik04MzcgNDg3LjhsLTE4OS00OC41LTE3NC44IDE4OSA0OTAuNyAxMy4xeiIvPjxwYXRoIGZpbGw9IiMwMDA4MTYiIGQ9Ik0xOC44IDQ3NC4zbDkuNi01MDkgMTcgNDcwLjYgNi43IDY2LjJ6Ii8+PHBhdGggZmlsbD0iI2U5ZTZmOSIgZD0iTTc0LjIgMzY1LjZsMjUuOCAxM0w3Mi4zIDI0OGw1LjggMTI0LjZ6Ii8+PHBhdGggZmlsbD0iIzAwMDIwNSIgZD0iTTExNjMgODMuNGw5Ni42IDcwLjQtNTMuOSAyLjhMMTIwOSA0NDF6Ii8+PHBhdGggZmlsbD0iIzc5N2I3OCIgZD0iTTY2NS43IDQxMWwtNTQ5LjMgNTYuNiA4NTYuMi0yOS40IDIyLjcgMzkuNnoiLz48L2c+PC9zdmc+"
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
    		ImageLoader,
    		deGallery,
    		randomIndex,
    		slug
    	});

    	$$self.$inject_state = $$props => {
    		if ("randomIndex" in $$props) $$invalidate(1, randomIndex = $$props.randomIndex);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [deGallery, randomIndex, slug];
    }

    class GermanyJPG extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$d, create_fragment$d, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "GermanyJPG",
    			options,
    			id: create_fragment$d.name
    		});
    	}
    }

    /* src/Windows/JapanJPG.svelte generated by Svelte v3.32.1 */
    const file$d = "src/Windows/JapanJPG.svelte";

    // (31:0) <WindowElement     gridColumnStart={1}     gridColumnEnd={61}     gridRowStart={75}     gridRowEnd={115}     largeGridColumnStart={5}     largeGridColumnEnd={46}     largeGridRowStart={80}     largeGridRowEnd={106}     title={jpGallery[randomIndex].name}     id={8}     isInForeground={false}     intersections={[9]}     intersectingSide="right"     distanceFromIntersection={21}     largeDistanceFromIntersection={6} >
    function create_default_slot$a(ctx) {
    	let div;
    	let imageloader;
    	let current;

    	imageloader = new ImageLoader({
    			props: {
    				sizes: "59.6vmax, (min-width: 1024px) 40.8vmax",
    				srcset: "https://res.cloudinary.com/thdrstnr/image/upload/w_1280,f_auto/" + /*slug*/ ctx[2] + " 1280w,\n        https://res.cloudinary.com/thdrstnr/image/upload/w_960,f_auto/" + /*slug*/ ctx[2] + " 960w,\n        https://res.cloudinary.com/thdrstnr/image/upload/w_800,f_auto/" + /*slug*/ ctx[2] + " 800w,\n        https://res.cloudinary.com/thdrstnr/image/upload/w_640,f_auto/" + /*slug*/ ctx[2] + " 640w,\n        https://res.cloudinary.com/thdrstnr/image/upload/w_480,f_auto/" + /*slug*/ ctx[2] + " 480w,\n        https://res.cloudinary.com/thdrstnr/image/upload/w_320,f_auto/" + /*slug*/ ctx[2] + " 320w,\n        https://res.cloudinary.com/thdrstnr/image/upload/w_160,f_auto/" + /*slug*/ ctx[2] + " 160w,",
    				src: "https://res.cloudinary.com/thdrstnr/image/upload/w_1280,f_auto/" + /*slug*/ ctx[2],
    				alt: /*jpGallery*/ ctx[0][/*randomIndex*/ ctx[1]].alt
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(imageloader.$$.fragment);
    			set_style(div, "background-image", "url(data:image/svg+xml;base64," + /*jpGallery*/ ctx[0][/*randomIndex*/ ctx[1]].svg + ")");
    			attr_dev(div, "class", "svelte-1ctar2d");
    			add_location(div, file$d, 47, 4, 10511);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(imageloader, div, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(imageloader.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(imageloader.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(imageloader);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$a.name,
    		type: "slot",
    		source: "(31:0) <WindowElement     gridColumnStart={1}     gridColumnEnd={61}     gridRowStart={75}     gridRowEnd={115}     largeGridColumnStart={5}     largeGridColumnEnd={46}     largeGridRowStart={80}     largeGridRowEnd={106}     title={jpGallery[randomIndex].name}     id={8}     isInForeground={false}     intersections={[9]}     intersectingSide=\\\"right\\\"     distanceFromIntersection={21}     largeDistanceFromIntersection={6} >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$e(ctx) {
    	let windowelement;
    	let current;

    	windowelement = new WindowElement({
    			props: {
    				gridColumnStart: 1,
    				gridColumnEnd: 61,
    				gridRowStart: 75,
    				gridRowEnd: 115,
    				largeGridColumnStart: 5,
    				largeGridColumnEnd: 46,
    				largeGridRowStart: 80,
    				largeGridRowEnd: 106,
    				title: /*jpGallery*/ ctx[0][/*randomIndex*/ ctx[1]].name,
    				id: 8,
    				isInForeground: false,
    				intersections: [9],
    				intersectingSide: "right",
    				distanceFromIntersection: 21,
    				largeDistanceFromIntersection: 6,
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

    			if (dirty & /*$$scope*/ 8) {
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
    	validate_slots("JapanJPG", slots, []);

    	const jpGallery = [
    		{
    			name: "SHINJUKU.JPG",
    			src: "/MortimerBaltus/jpGallery/TokyoTaxi_zbokhg",
    			alt: "Shinjuku, Tokyo (JP)",
    			svg: "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjgwIDg1MyI+PHBhdGggZmlsbD0iIzg4ODY4YSIgZD0iTTAgMGgxMjgwdjg1MEgweiIvPjxnIGZpbGwtb3BhY2l0eT0iLjUiPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0xMzU3LjUgMTAuM0w1NDIgMzk0LjlsLTI4IDE1Ny43TDI3MS41LTc3LjV6Ii8+PHBhdGggZD0iTTMgNDAyLjhMLTIzIDYwMmwxMzgwLjUtMTkuNy02Ny42LTIzOHoiLz48cGF0aCBmaWxsPSIjMDAxOTI0IiBkPSJNLTc3LjUgNzQyLjNsNDUxLTE0LjMgMTcuMS02MDAuNi0zNzctMjA0Ljl6Ii8+PHBhdGggZmlsbD0iI2Y1ZGRlMiIgZD0iTTkwOS41IDkyNy41bC05ODctOTIuNSA4MDgtMjYzLjEgNTg3LjggNTV6Ii8+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTQ1MSA1MTUuM0wzNDguOC03Ny41aDc3NC41bC00NzYgNTQ2eiIvPjxwYXRoIGZpbGw9IiMwNDA5MDYiIGQ9Ik0xMTYyLjQgMTQ1LjhsLTE0NS44IDI5MS41LTM3OSA0Mi40IDcxOS45IDE1Ni44eiIvPjxwYXRoIGZpbGw9IiM3MzZlNmQiIGQ9Ik01NjIuMiA1MDRsLTMyLjMtMTIzLjQgNzg3LjMtMTc1LjgtMjE3LjMgMjA2eiIvPjxwYXRoIGZpbGw9IiM0ZTY5NzQiIGQ9Ik01MjMuMSA2NzAuNUwzMjguNyA1NzAuMy03Ny41IDY5Ny45IDQ4Ny4zIDc1MHoiLz48cGF0aCBmaWxsPSIjZWFkNWRiIiBkPSJNNDI3IDU4MC44bDQyMy42IDguNi0xNTQgMjIyLTI0MS0xODguNHoiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNNzU4IDM4OC4zTDMzNi4yIDEwNiAyODMuNC0zNS40IDkyMi03Ny41eiIvPjxwYXRoIGQ9Ik04NTcuMSAyMDguMmwxNy4xIDU2LjctNjIuOCAxNS4zIDkuMS01OS42eiIvPjxwYXRoIGZpbGw9IiM2YjY2NjciIGQ9Ik0xMDY1LjIgNDUuM2wyMDIuNiAxMDIuNSA4OS43IDMyMy40LTMyNS4xLTMzMC40eiIvPjxwYXRoIGZpbGw9IiMwMDEwMWQiIGQ9Ik03ODAgMzkzLjJsLTExMCAyNi4yLTEzOS43LTEyIDEzNi4zLTQ3Ljl6Ii8+PHBhdGggZmlsbD0iI2ZmZmVmZiIgZD0iTTY4OC4yIDU0N2wxNC42LTM5LjUgNjMuNSA5MS44IDMyLjYtNTR6Ii8+PHBhdGggZmlsbD0iI2IwYjViOSIgZD0iTTUwLjQgNDI1TC0xNyA0NDcuNWwtNjAuNS0xNzguMiAxMjgtMTIuNXoiLz48cGF0aCBmaWxsPSIjMGUxMzE4IiBkPSJNNzkuMyA2MjguN2w1My41LTMwNy40LTUuNC0yNzMuNyAyNjUuOCA1MjQuN3oiLz48cGF0aCBmaWxsPSIjYTg5Yjk4IiBkPSJNOTMxLjUgMTkyLjdMNzYzLjMgMzk5bC0xODIuMSA4NSAzMjEuMy01MnoiLz48cGF0aCBmaWxsPSIjNzc3NTc5IiBkPSJNMjgxLjYgMzAzLjdMNTIzIDU4NmwtNzcuMy0yNjAtMjUxLTM1Ni45eiIvPjxwYXRoIGZpbGw9IiNlMWNiY2YiIGQ9Ik0tNzcuNSA5MDIuOGw2NDItMTYwLTIzMiAxLjEtNDEwLTZ6Ii8+PHBhdGggZmlsbD0iIzAwMDAwNCIgZD0iTTYxLjcgMTE3LjJsLTgwLjggMTA0LjUgNjMuNCA1MSA2Mi42IDI2Ny43eiIvPjxwYXRoIGZpbGw9IiNmZmYyZjkiIGQ9Ik02MTIuMSAyODcuOWwtMjgzLjYgNDYuOUw2ODcuOC03Ny41aDY2OS43eiIvPjxwYXRoIGZpbGw9IiMwODBjMGMiIGQ9Ik0xMjUyIDI3NUw5MzcuMSA1NzlsMjU3LjUgMjUuOCA3MC40LTU0LjN6Ii8+PHBhdGggZmlsbD0iIzA4MGEwYyIgZD0iTTMzMS41IDM3MGwxMDUuMSAxOTguOC0xNjUuNC02MC4yTDQ1OCAzMTkuNHoiLz48cGF0aCBmaWxsPSIjZmFlZGY0IiBkPSJNMTM1Ny41IDEzMC43TDc0Mi42LTc3LjVsMTM2LjYgMzExTDExMzcuNC0zOXoiLz48cGF0aCBmaWxsPSIjYTc5Y2EyIiBkPSJNMTM1Ny41IDU3Mi40bC0xNjQgMzMxLjEtNTA2LjEgMy40IDQ2Mi40LTI4Ni4zeiIvPjxwYXRoIGZpbGw9IiM0NTQzNDIiIGQ9Ik0xMDgyLjcgMjg2LjVsMjUwLjQgMi40LTQ2NC4yIDEwNC44IDkuNy02NS45eiIvPjxwYXRoIGZpbGw9IiNmZmY5ZmUiIGQ9Ik0xMjM1LjkgMzU3LjNsMTIxLjYgNTR2NTUuOGwtMzcuNC0xNzEuNnoiLz48cGF0aCBmaWxsPSIjNTg2YTc0IiBkPSJNLTc3LjUgNjQybDM2Ny44LTQ1LjYgMjgxLjEgMTU3LjQtMzM2LjMtMzd6Ii8+PHBhdGggZmlsbD0iI2FhYWRiNCIgZD0iTTI3Ny41IDE2Ni4xTDI0NC40LTMxLjYgMjM0IDIyMi4zbDE1LjggMTAuM3oiLz48cGF0aCBmaWxsPSIjYTA5OTlmIiBkPSJNMTM1LjUgMjA2LjJsLTU4LjgtOCA4Ny4xIDE3Mi4yLTc0LjYtNTZ6Ii8+PHBhdGggZmlsbD0iIzA5MWMyOSIgZD0iTTExMC43IDMwMC44bDYwLjQtMzc4LjMgNjIuMyAyMzMtNC4yLTE2MHoiLz48cGF0aCBmaWxsPSIjZjFlMmU3IiBkPSJNNjY3LjcgNTgxLjFMNjU2LjMgNTM3bC0xNy44IDYuNEw2NDMgNTg3eiIvPjwvZz48L3N2Zz4="
    		},
    		{
    			name: "TAXI.JPG",
    			src: "/MortimerBaltus/jpGallery/ShinjukuSakura_dgdj2h",
    			alt: "A cab in Tokyo (JP)",
    			svg: "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjgwIDg1MCI+PHBhdGggZmlsbD0iIzZlNjY2MyIgZD0iTTAgMGgxMjgwdjg1MEgweiIvPjxnIGZpbGwtb3BhY2l0eT0iLjUiPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0tNzcuNSA4OTMuOFY3NTUuNmwxNDE1LjktMzA5LjgtMTg2LjggNDgxLjd6Ii8+PHBhdGggZD0iTTEzNTcuNS0zMnYzOTlsLTE0MzUtMTQ1LjNMLTI1LTc3LjV6Ii8+PHBhdGggZmlsbD0iIzAyMDAwMCIgZD0iTTk0NS44IDQ2NUw3MzUuNCA2NDUgMTAuMiA1OTkuMWw0NjkuNi0xMjcuN3oiLz48cGF0aCBmaWxsPSIjZjNlMWNiIiBkPSJNMTM1Ny41IDcyNy4yTC03Ny41IDYwMSAzMS42IDQzMmw5NC44IDQ5NS42eiIvPjxwYXRoIGZpbGw9IiNjM2MwYmQiIGQ9Ik01NzkuNiA0MTBsLTQ2LTE5MiAyOTItNDEtODIuMyAyNDkuMXoiLz48cGF0aCBmaWxsPSIjMDAwMDA2IiBkPSJNNzc5LTE3LjdsNTc4LjUgNDk1LTM4MS0xOS41IDM4MS00NTkuNHoiLz48cGF0aCBmaWxsPSIjZjFlMmQwIiBkPSJNNTYwLjIgODU1LjNsNjI3LjggNzIuMi0yNi42LTQ2NC40TDk1MSA0OTQuNnoiLz48cGF0aCBmaWxsPSIjMDAwNDA4IiBkPSJNMjIwLjEgMjU0LjVsMTA0Mi0yMDguM0wtNzcuNSA1OGwyNDIuMSAzNjh6Ii8+PHBhdGggZD0iTTExNzYuNCA4NjQuMmwxODEuMS04NC4zLTE5NS40LTEyMy40IDE3OC02MC4zeiIvPjxwYXRoIGZpbGw9IiNmZTVkMzgiIGQ9Ik0yNjIuMyA0MDcuNWwxMzggMTAyLjcgNTQwLjEtNzMuOC04Ny43LTQ4Ljd6Ii8+PHBhdGggZmlsbD0iI2MwZDRlOCIgZD0iTTEwMTIgMjQ2LjJsLTQxMy43LTM2LjYgMjg5LjMtMjEuNCAxNzkuMiAyNy4zeiIvPjxwYXRoIGZpbGw9IiMyNjA5MDkiIGQ9Ik01MTUuMiA2NDYuN2wyODYuNy0zMi0zMTQuNC0xNjUtMzQyLjItMjQuNnoiLz48cGF0aCBmaWxsPSIjMDAwNDA2IiBkPSJNMTE3NC4yIDI1NS40bC0zNTIuMy0yNy43LTMxOC40IDQuMyA2MDQuOCA5OC40eiIvPjxwYXRoIGZpbGw9IiNmMGRmYmYiIGQ9Ik02MTMuNiA0MTguN2wyODcuOC0yLjRMNTI0IDI3Ny41bDM4LjctNDV6Ii8+PHBhdGggZmlsbD0iI2JlY2VkZiIgZD0iTTEwNDYgMzQwLjRsNDEuNSA1MjUuNC0zNy4yLTQ3NS42LTM2OS42LTk3LjF6Ii8+PHBhdGggZmlsbD0iI2NlYzdjNyIgZD0iTS03Ny41IDI4My40bDI5MS40IDQ2NS0yOTEuNC0zMTUuMUwxMTEgMzIwLjh6Ii8+PHBhdGggZmlsbD0iIzAwMDQxNCIgZD0iTTkwOS42IDM5NC43bDQwMC43IDkuMi0yOS40LTg3LjUtMzQxLjcgMTYwLjl6Ii8+PHBhdGggZmlsbD0iI2Y4ZWZlNCIgZD0iTTk0MS4zIDQ4My41TDkwOCA1NTBsNDA4LjQtNTUtLjMtMjh6Ii8+PHBhdGggZmlsbD0iIzI5MmUzMyIgZD0iTTM2My45IDEyMi4ybDcuNiAxOTcuNy00MTkgODUuNEw1MzYgMzc5LjF6Ii8+PHBhdGggZmlsbD0iI2E1Y2JlZiIgZD0iTTU0MC40IDE0MC42bDYuNC0yNS44IDU0LjkgMTAuMy00MS42IDUzLjR6Ii8+PHBhdGggZmlsbD0iIzA3MGQxZCIgZD0iTTEyMTkuNSA1MzAuNmwxMzggNjMuMi01LjctOTUuNC0xNTguNyAxNy40eiIvPjxwYXRoIGQ9Ik0xMjYxLjUgNzE0LjdsNjkuMi00MiAyNi44IDIxNi43LTIzMS45IDM4LjF6Ii8+PHBhdGggZmlsbD0iI2U0MTAwMCIgZD0iTTU2NS45IDQwNGwtMTkuNC0xMDcuNy00NiAxMzQuOEw3MzQgNDU2LjJ6Ii8+PHBhdGggZmlsbD0iI2U4ZTFjYSIgZD0iTTc2MS43IDU4M2wtMzcuNC0yOC43LTg2LjcgMTFMNzE0IDU3OHoiLz48cGF0aCBmaWxsPSIjMGEwZTE1IiBkPSJNNzE2IDMwNy4zbC0xMzMuNy0xNEw4MzIuOCAxMjkgNjQ1LjItNzcuNXoiLz48cGF0aCBmaWxsPSIjZDhjY2JmIiBkPSJNNTc5LjEgNjMyLjFMODg4IDkyMC4ybDQyMS40LTM4NS44TDkzMiA2MjMuN3oiLz48cGF0aCBmaWxsPSIjY2RjNmJlIiBkPSJNNTMwIDYyM2wtMjE5LjUtMTJMMjYuMiA5MjcuNSA4OC44IDYzM3oiLz48cGF0aCBmaWxsPSIjYTVjMGQ0IiBkPSJNMTIwLjYgNDAwLjZsMzc1LjcgMjYuNiAxODYgMzkuMi0yMTYuMS0xOS42eiIvPjxwYXRoIGZpbGw9IiMzODQ3NjMiIGQ9Ik0zMjguNyA2MjIuNGwtMzk5LjItMjI4TDMwNSA0MzEuOCA0LjggNjA0LjV6Ii8+PHBhdGggZmlsbD0iIzExMTIxMyIgZD0iTTYwOS40IDEwbC01MzkgMjkyLTg3LjMtLjMgNDEtMjAxLjZ6Ii8+PHBhdGggZmlsbD0iI2MwMjEwZSIgZD0iTTQ0OS42IDUzNy40TDI3OSA0MzIuOCA0OTkgNDU1bC0xNi4yIDc1Ljd6Ii8+PHBhdGggZmlsbD0iIzczOWNiOSIgZD0iTTExNzguMyAyNzYuM2wxMS41LTY4IDU1LjcgMTM5LjYgNDIuMS01OHoiLz48L2c+PC9zdmc+"
    		},
    		{
    			name: "TRAINSTATION.JPG",
    			src: "/MortimerBaltus/jpGallery/TokyoTrainstation_sovh7s",
    			alt: "A Trainstation in Tokyo",
    			svg: "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjgwIDg1MyI+PHBhdGggZmlsbD0iIzg4OCIgZD0iTTAgMGgxMjgwdjg1MEgweiIvPjxnIGZpbGwtb3BhY2l0eT0iLjUiPjxwYXRoIGQ9Ik01NTEuOCA1NjUuNEwtMjMuOSAyNzEuMmwzNy43IDYwOEwxMjc5IDkyNy40eiIvPjxwYXRoIGZpbGw9IiNlMGUwZTAiIGQ9Ik00ODAuNSA1MjkuOGwtNTU3LjItMzI3IDE0MzQuMi01NS45TDEyMjYgODc5eiIvPjxwYXRoIGZpbGw9IiMyYjJiMmIiIGQ9Ik0xMDAyLjYgMzI4LjdsLTYwLTMxMi4zLTM0NS44IDcgNC45IDI4OS40eiIvPjxwYXRoIGZpbGw9IiNlY2VjZWMiIGQ9Ik01OTAuNCAxODguN2w4LTE5OS4xLTY3NS45LTY3LjF2MjczLjJ6Ii8+PHBhdGggZD0iTS01Mi4yIDM0Ni4xbDEwNzcgNTgxLjRINTc0LjNMLjIgNTg3Ljd6Ii8+PHBhdGggZmlsbD0iI2RmZGZkZiIgZD0iTTk1NC03Ny41bDUwLjggOTIuNCAzMDYuNCAxMTlMOTY4LjEgNDIzeiIvPjxwYXRoIGQ9Ik0xMzU3LjUgMTUzLjVMMTI3Mi44IDkgOTU5LTM5LjRsLTUzLjggNC42eiIvPjxwYXRoIGZpbGw9IiNkYWRhZGEiIGQ9Ik03NTUuNSAxNzEuNWwxNDMuMS0xLjctNi4zIDkzLjEtMzE1LjgtODQuNXoiLz48cGF0aCBmaWxsPSIjMDIwMjAyIiBkPSJNODYxIDk3LjVsNTcuNyAyMjEgNTAuMy02Mi4zLTM3LjctMTUzLjZ6Ii8+PHBhdGggZmlsbD0iIzg3ODc4NyIgZD0iTTI0LjMgOTI3LjVMMjcgNjgyLjNsMTYwLjUgMjcuNSA1OC4zIDc2LjZ6Ii8+PHBhdGggZmlsbD0iI2ZiZmJmYiIgZD0iTTc4Mi44IDIxLjNsMjQwLjcuOC0zNDguOC05OS42LTEwMS45IDk1Ljd6Ii8+PHBhdGggZmlsbD0iI2NhY2FjYSIgZD0iTTEyNzAuMyA4ODEuNGwtMTM4LjktNTc0LjgtOTYyLjUgMjggNDExLjIgMjExLjh6Ii8+PHBhdGggZmlsbD0iIzE1MTUxNSIgZD0iTTcxMS4xIDIxN2wtNzUgMTQuNkw2MDUuOS0xNWwtMTEuNyAzNTAuN3oiLz48cGF0aCBmaWxsPSIjOWU5ZTllIiBkPSJNNjY4LjEgMTA0LjdsLTU4LjQtNTYuMUw4MjcgNTguOWwzNi41IDQyLjZ6Ii8+PHBhdGggZmlsbD0iIzFjMWMxYyIgZD0iTTc1MS42IDgwNy44TDM1OS40IDQ2NGwyMTIuOCAxMTAuMyAyMzMuNSAxMTcuNXoiLz48cGF0aCBmaWxsPSIjMTIxMjEyIiBkPSJNOTYwLjggMjYuM2wtNDU2LjggMyA0MzguNyAzMS4yIDExLjYgMzYuOHoiLz48cGF0aCBmaWxsPSIjM2UzZTNlIiBkPSJNNzYxIDMzNWwtLjktMjIzLjMgMjEuMi00NyAxMSAxOTd6Ii8+PHBhdGggZmlsbD0iI2M3YzdjNyIgZD0iTTU5NS44LTI5LjRsLTUzOCAzNDUgMzYyLjUgMTU0LjggMTc5LjItMjU5LjJ6Ii8+PHBhdGggZmlsbD0iI2M2YzZjNiIgZD0iTTk5NyAuMmwtNDEuMyAyOTEuOSAyODAuNyAzMDMtMjYtNDk2LjV6Ii8+PHBhdGggZmlsbD0iIzdkN2Q3ZCIgZD0iTTk0NiA4MjlsMzMuMi0yMi4yLTEwMC4zLTcwLjZMNzU4IDc0OXoiLz48cGF0aCBmaWxsPSIjZDdkN2Q3IiBkPSJNNzA3LjcgMTY2LjVsLTc3LjUgMTguMyAxMjkgNzUuNy0yMy4zLTgwLjh6Ii8+PHBhdGggZmlsbD0iIzFhMWExYSIgZD0iTTgyOC42IDMwNC40TDg5MyAyODBsMTEtMTAyLjNMOTc1LjQgMzE3eiIvPjxwYXRoIGZpbGw9IiM5Njk2OTYiIGQ9Ik0xMjQwLjEgNjM2LjdsLTE1LjktNTE5LjQgMTMzLjMgMTY2LjUtMTEwIDY0My43eiIvPjxwYXRoIGZpbGw9IiM4YzhjOGMiIGQ9Ik0xMDUuNCAzMzkuM2wxNS44LTQxMUw3NC0xOS42bC0uNSAzMzF6Ii8+PHBhdGggZmlsbD0iIzBkMGQwZCIgZD0iTTUzNiA1NjIuNWwtNjA0LjItMzEwLTkuMyAzNTkuMUw3NC42IDM0OC44eiIvPjxwYXRoIGZpbGw9IiNjM2MzYzMiIGQ9Ik04OTkuMiAxNzRsLTI2IDgxLjQtOTQuNiAxOUw4MDAgMTc1eiIvPjxwYXRoIGZpbGw9IiMyNDI0MjQiIGQ9Ik02ODQuOCAyMDJsLTMxLjIgNSAyMi45IDExNy44IDI5LjgtNjB6Ii8+PHBhdGggZmlsbD0iIzZiNmI2YiIgZD0iTTYyLjEgMzg1LjFsMzguMy0yOS44IDEyMy43IDE1NCAxMTYtMTl6Ii8+PHBhdGggZmlsbD0iIzJjMmMyYyIgZD0iTTYzNS4yIDMyNC41bDQtMTkyLjcgNDI0LjggMzguNy00NjEuOS02LjV6Ii8+PHBhdGggZmlsbD0iIzQ3NDc0NyIgZD0iTTM5OS40IDg3OWwtMS4yIDQ0LjctNDQtMTcyLjhMNzIuNiA2MTF6Ii8+PHBhdGggZmlsbD0iIzE1MTUxNSIgZD0iTTQyNi4xIDczNi40bDQzMS4xIDE5MS4xTDM4MCA4NjguOGwtNjgtNDQ5eiIvPjxwYXRoIGZpbGw9IiNhNmE2YTYiIGQ9Ik0xMDA5LjYgMzg1LjlsLTE5IDMzMy42LTI5LTM5Ni41LTUuMy0yMTYuOXoiLz48L2c+PC9zdmc+"
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
    		ImageLoader,
    		jpGallery,
    		randomIndex,
    		slug
    	});

    	$$self.$inject_state = $$props => {
    		if ("randomIndex" in $$props) $$invalidate(1, randomIndex = $$props.randomIndex);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [jpGallery, randomIndex, slug];
    }

    class JapanJPG extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$e, create_fragment$e, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "JapanJPG",
    			options,
    			id: create_fragment$e.name
    		});
    	}
    }

    /* src/Windows/CleanCode.svelte generated by Svelte v3.32.1 */
    const file$e = "src/Windows/CleanCode.svelte";

    // (5:0) <WindowElement     gridColumnStart={20}     gridColumnEnd={60}     gridRowStart={2}     gridRowEnd={32}     largeGridColumnStart={44}     largeGridColumnEnd={70}     largeGridRowStart={47}     largeGridRowEnd={67}     backgroundColor="#7d7d7d"     title="CLEAN.CODE"     id={10}     isInForeground={false}     intersections={[3]}     intersectingSide="right"     distanceFromIntersection={10}     largeDistanceFromIntersection={5} >
    function create_default_slot$b(ctx) {
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
    			add_location(br0, file$e, 23, 34, 555);
    			attr_dev(p0, "class", "svelte-t1tyb8");
    			add_location(p0, file$e, 22, 4, 517);
    			add_location(br1, file$e, 26, 43, 703);
    			add_location(br2, file$e, 26, 49, 709);
    			attr_dev(p1, "class", "text-right svelte-t1tyb8");
    			add_location(p1, file$e, 26, 4, 664);
    			add_location(br3, file$e, 28, 55, 783);
    			attr_dev(p2, "class", "svelte-t1tyb8");
    			add_location(p2, file$e, 27, 4, 724);
    			attr_dev(p3, "class", "text-right svelte-t1tyb8");
    			add_location(p3, file$e, 30, 4, 803);
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
    		id: create_default_slot$b.name,
    		type: "slot",
    		source: "(5:0) <WindowElement     gridColumnStart={20}     gridColumnEnd={60}     gridRowStart={2}     gridRowEnd={32}     largeGridColumnStart={44}     largeGridColumnEnd={70}     largeGridRowStart={47}     largeGridRowEnd={67}     backgroundColor=\\\"#7d7d7d\\\"     title=\\\"CLEAN.CODE\\\"     id={10}     isInForeground={false}     intersections={[3]}     intersectingSide=\\\"right\\\"     distanceFromIntersection={10}     largeDistanceFromIntersection={5} >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$f(ctx) {
    	let windowelement;
    	let current;

    	windowelement = new WindowElement({
    			props: {
    				gridColumnStart: 20,
    				gridColumnEnd: 60,
    				gridRowStart: 2,
    				gridRowEnd: 32,
    				largeGridColumnStart: 44,
    				largeGridColumnEnd: 70,
    				largeGridRowStart: 47,
    				largeGridRowEnd: 67,
    				backgroundColor: "#7d7d7d",
    				title: "CLEAN.CODE",
    				id: 10,
    				isInForeground: false,
    				intersections: [3],
    				intersectingSide: "right",
    				distanceFromIntersection: 10,
    				largeDistanceFromIntersection: 5,
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
    		init(this, options, instance$f, create_fragment$f, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CleanCode",
    			options,
    			id: create_fragment$f.name
    		});
    	}
    }

    /* src/Windows/Logopedia.svelte generated by Svelte v3.32.1 */
    const file$f = "src/Windows/Logopedia.svelte";

    // (5:0) <WindowElement     gridColumnStart={105}     gridColumnEnd={145}     gridRowStart={38}     gridRowEnd={68}     largeGridColumnStart={129}     largeGridColumnEnd={155}     largeGridRowStart={63}     largeGridRowEnd={83}     title="LOGOPEDIA.MP4"     enlargeable={false}     backgroundColor="#C4BDBD"     id={6}     isInForeground={true} >
    function create_default_slot$c(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			set_style(div, "background-image", "url('images/Logopedia.svg')");
    			attr_dev(div, "title", "Logo Portfolio");
    			attr_dev(div, "class", "svelte-ra2uz8");
    			add_location(div, file$f, 19, 4, 422);
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
    		id: create_default_slot$c.name,
    		type: "slot",
    		source: "(5:0) <WindowElement     gridColumnStart={105}     gridColumnEnd={145}     gridRowStart={38}     gridRowEnd={68}     largeGridColumnStart={129}     largeGridColumnEnd={155}     largeGridRowStart={63}     largeGridRowEnd={83}     title=\\\"LOGOPEDIA.MP4\\\"     enlargeable={false}     backgroundColor=\\\"#C4BDBD\\\"     id={6}     isInForeground={true} >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$g(ctx) {
    	let windowelement;
    	let current;

    	windowelement = new WindowElement({
    			props: {
    				gridColumnStart: 105,
    				gridColumnEnd: 145,
    				gridRowStart: 38,
    				gridRowEnd: 68,
    				largeGridColumnStart: 129,
    				largeGridColumnEnd: 155,
    				largeGridRowStart: 63,
    				largeGridRowEnd: 83,
    				title: "LOGOPEDIA.MP4",
    				enlargeable: false,
    				backgroundColor: "#C4BDBD",
    				id: 6,
    				isInForeground: true,
    				$$slots: { default: [create_default_slot$c] },
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
    		id: create_fragment$g.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$g($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$g, create_fragment$g, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Logopedia",
    			options,
    			id: create_fragment$g.name
    		});
    	}
    }

    /* src/App.svelte generated by Svelte v3.32.1 */

    function create_fragment$h(ctx) {
    	let scrollhandler;
    	let t0;
    	let projectcorazon;
    	let t1;
    	let aboutwindow;
    	let t2;
    	let japanjpg;
    	let t3;
    	let cookiewindow;
    	let t4;
    	let projectraceworx;
    	let t5;
    	let legalwindow;
    	let t6;
    	let privacywindow;
    	let t7;
    	let cleancode;
    	let t8;
    	let projectmueller;
    	let t9;
    	let germanyjpg;
    	let t10;
    	let referenceswindow;
    	let t11;
    	let logopedia;
    	let current;
    	scrollhandler = new ScrollHandler({ $$inline: true });
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
    			create_component(scrollhandler.$$.fragment);
    			t0 = space();
    			create_component(projectcorazon.$$.fragment);
    			t1 = space();
    			create_component(aboutwindow.$$.fragment);
    			t2 = space();
    			create_component(japanjpg.$$.fragment);
    			t3 = space();
    			create_component(cookiewindow.$$.fragment);
    			t4 = space();
    			create_component(projectraceworx.$$.fragment);
    			t5 = space();
    			create_component(legalwindow.$$.fragment);
    			t6 = space();
    			create_component(privacywindow.$$.fragment);
    			t7 = space();
    			create_component(cleancode.$$.fragment);
    			t8 = space();
    			create_component(projectmueller.$$.fragment);
    			t9 = space();
    			create_component(germanyjpg.$$.fragment);
    			t10 = space();
    			create_component(referenceswindow.$$.fragment);
    			t11 = space();
    			create_component(logopedia.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(scrollhandler, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(projectcorazon, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(aboutwindow, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(japanjpg, target, anchor);
    			insert_dev(target, t3, anchor);
    			mount_component(cookiewindow, target, anchor);
    			insert_dev(target, t4, anchor);
    			mount_component(projectraceworx, target, anchor);
    			insert_dev(target, t5, anchor);
    			mount_component(legalwindow, target, anchor);
    			insert_dev(target, t6, anchor);
    			mount_component(privacywindow, target, anchor);
    			insert_dev(target, t7, anchor);
    			mount_component(cleancode, target, anchor);
    			insert_dev(target, t8, anchor);
    			mount_component(projectmueller, target, anchor);
    			insert_dev(target, t9, anchor);
    			mount_component(germanyjpg, target, anchor);
    			insert_dev(target, t10, anchor);
    			mount_component(referenceswindow, target, anchor);
    			insert_dev(target, t11, anchor);
    			mount_component(logopedia, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(scrollhandler.$$.fragment, local);
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
    			transition_out(scrollhandler.$$.fragment, local);
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
    			destroy_component(scrollhandler, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(projectcorazon, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(aboutwindow, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(japanjpg, detaching);
    			if (detaching) detach_dev(t3);
    			destroy_component(cookiewindow, detaching);
    			if (detaching) detach_dev(t4);
    			destroy_component(projectraceworx, detaching);
    			if (detaching) detach_dev(t5);
    			destroy_component(legalwindow, detaching);
    			if (detaching) detach_dev(t6);
    			destroy_component(privacywindow, detaching);
    			if (detaching) detach_dev(t7);
    			destroy_component(cleancode, detaching);
    			if (detaching) detach_dev(t8);
    			destroy_component(projectmueller, detaching);
    			if (detaching) detach_dev(t9);
    			destroy_component(germanyjpg, detaching);
    			if (detaching) detach_dev(t10);
    			destroy_component(referenceswindow, detaching);
    			if (detaching) detach_dev(t11);
    			destroy_component(logopedia, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$h.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$h($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("App", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		ScrollHandler,
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
    		init(this, options, instance$h, create_fragment$h, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment$h.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
