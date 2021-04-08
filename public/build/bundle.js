
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    const identity = x => x;
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
    function null_to_empty(value) {
        return value == null ? '' : value;
    }
    function action_destroyer(action_result) {
        return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
    }

    const is_client = typeof window !== 'undefined';
    let now = is_client
        ? () => window.performance.now()
        : () => Date.now();
    let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

    const tasks = new Set();
    function run_tasks(now) {
        tasks.forEach(task => {
            if (!task.c(now)) {
                tasks.delete(task);
                task.f();
            }
        });
        if (tasks.size !== 0)
            raf(run_tasks);
    }
    /**
     * Creates a new task that runs on each raf frame
     * until it returns a falsy value or is aborted
     */
    function loop(callback) {
        let task;
        if (tasks.size === 0)
            raf(run_tasks);
        return {
            promise: new Promise(fulfill => {
                tasks.add(task = { c: callback, f: fulfill });
            }),
            abort() {
                tasks.delete(task);
            }
        };
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
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
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

    const active_docs = new Set();
    let active = 0;
    // https://github.com/darkskyapp/string-hash/blob/master/index.js
    function hash(str) {
        let hash = 5381;
        let i = str.length;
        while (i--)
            hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
        return hash >>> 0;
    }
    function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
        const step = 16.666 / duration;
        let keyframes = '{\n';
        for (let p = 0; p <= 1; p += step) {
            const t = a + (b - a) * ease(p);
            keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
        }
        const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
        const name = `__svelte_${hash(rule)}_${uid}`;
        const doc = node.ownerDocument;
        active_docs.add(doc);
        const stylesheet = doc.__svelte_stylesheet || (doc.__svelte_stylesheet = doc.head.appendChild(element('style')).sheet);
        const current_rules = doc.__svelte_rules || (doc.__svelte_rules = {});
        if (!current_rules[name]) {
            current_rules[name] = true;
            stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
        }
        const animation = node.style.animation || '';
        node.style.animation = `${animation ? `${animation}, ` : ''}${name} ${duration}ms linear ${delay}ms 1 both`;
        active += 1;
        return name;
    }
    function delete_rule(node, name) {
        const previous = (node.style.animation || '').split(', ');
        const next = previous.filter(name
            ? anim => anim.indexOf(name) < 0 // remove specific animation
            : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
        );
        const deleted = previous.length - next.length;
        if (deleted) {
            node.style.animation = next.join(', ');
            active -= deleted;
            if (!active)
                clear_rules();
        }
    }
    function clear_rules() {
        raf(() => {
            if (active)
                return;
            active_docs.forEach(doc => {
                const stylesheet = doc.__svelte_stylesheet;
                let i = stylesheet.cssRules.length;
                while (i--)
                    stylesheet.deleteRule(i);
                doc.__svelte_rules = {};
            });
            active_docs.clear();
        });
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
    // TODO figure out if we still want to support
    // shorthand events, or if we want to implement
    // a real bubbling mechanism
    function bubble(component, event) {
        const callbacks = component.$$.callbacks[event.type];
        if (callbacks) {
            callbacks.slice().forEach(fn => fn(event));
        }
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

    let promise;
    function wait() {
        if (!promise) {
            promise = Promise.resolve();
            promise.then(() => {
                promise = null;
            });
        }
        return promise;
    }
    function dispatch(node, direction, kind) {
        node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
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
    const null_transition = { duration: 0 };
    function create_in_transition(node, fn, params) {
        let config = fn(node, params);
        let running = false;
        let animation_name;
        let task;
        let uid = 0;
        function cleanup() {
            if (animation_name)
                delete_rule(node, animation_name);
        }
        function go() {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            if (css)
                animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
            tick(0, 1);
            const start_time = now() + delay;
            const end_time = start_time + duration;
            if (task)
                task.abort();
            running = true;
            add_render_callback(() => dispatch(node, true, 'start'));
            task = loop(now => {
                if (running) {
                    if (now >= end_time) {
                        tick(1, 0);
                        dispatch(node, true, 'end');
                        cleanup();
                        return running = false;
                    }
                    if (now >= start_time) {
                        const t = easing((now - start_time) / duration);
                        tick(t, 1 - t);
                    }
                }
                return running;
            });
        }
        let started = false;
        return {
            start() {
                if (started)
                    return;
                delete_rule(node);
                if (is_function(config)) {
                    config = config();
                    wait().then(go);
                }
                else {
                    go();
                }
            },
            invalidate() {
                started = false;
            },
            end() {
                if (running) {
                    cleanup();
                    running = false;
                }
            }
        };
    }
    function create_bidirectional_transition(node, fn, params, intro) {
        let config = fn(node, params);
        let t = intro ? 0 : 1;
        let running_program = null;
        let pending_program = null;
        let animation_name = null;
        function clear_animation() {
            if (animation_name)
                delete_rule(node, animation_name);
        }
        function init(program, duration) {
            const d = program.b - t;
            duration *= Math.abs(d);
            return {
                a: t,
                b: program.b,
                d,
                duration,
                start: program.start,
                end: program.start + duration,
                group: program.group
            };
        }
        function go(b) {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            const program = {
                start: now() + delay,
                b
            };
            if (!b) {
                // @ts-ignore todo: improve typings
                program.group = outros;
                outros.r += 1;
            }
            if (running_program || pending_program) {
                pending_program = program;
            }
            else {
                // if this is an intro, and there's a delay, we need to do
                // an initial tick and/or apply CSS animation immediately
                if (css) {
                    clear_animation();
                    animation_name = create_rule(node, t, b, duration, delay, easing, css);
                }
                if (b)
                    tick(0, 1);
                running_program = init(program, duration);
                add_render_callback(() => dispatch(node, b, 'start'));
                loop(now => {
                    if (pending_program && now > pending_program.start) {
                        running_program = init(pending_program, duration);
                        pending_program = null;
                        dispatch(node, running_program.b, 'start');
                        if (css) {
                            clear_animation();
                            animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
                        }
                    }
                    if (running_program) {
                        if (now >= running_program.end) {
                            tick(t = running_program.b, 1 - t);
                            dispatch(node, running_program.b, 'end');
                            if (!pending_program) {
                                // we're done
                                if (running_program.b) {
                                    // intro — we can tidy up immediately
                                    clear_animation();
                                }
                                else {
                                    // outro — needs to be coordinated
                                    if (!--running_program.group.r)
                                        run_all(running_program.group.c);
                                }
                            }
                            running_program = null;
                        }
                        else if (now >= running_program.start) {
                            const p = now - running_program.start;
                            t = running_program.a + running_program.d * easing(p / running_program.duration);
                            tick(t, 1 - t);
                        }
                    }
                    return !!(running_program || pending_program);
                });
            }
        }
        return {
            run(b) {
                if (is_function(config)) {
                    wait().then(() => {
                        // @ts-ignore
                        config = config();
                        go(b);
                    });
                }
                else {
                    go(b);
                }
            },
            end() {
                clear_animation();
                running_program = pending_program = null;
            }
        };
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
    function prop_dev(node, property, value) {
        node[property] = value;
        dispatch_dev('SvelteDOMSetProperty', { node, property, value });
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

    // (102:0) {#if !hasTouchScreen}
    function create_if_block(ctx) {
    	let div;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "grabbable svelte-kj9z40");
    			toggle_class(div, "mousedown", /*isMousedown*/ ctx[0]);
    			add_location(div, file, 102, 4, 3538);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			/*div_binding*/ ctx[6](div);

    			if (!mounted) {
    				dispose = [
    					listen_dev(div, "mousedown", /*handleMousedown*/ ctx[4], false, false, false),
    					listen_dev(div, "mouseup", /*handleMouseup*/ ctx[5], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*isMousedown*/ 1) {
    				toggle_class(div, "mousedown", /*isMousedown*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			/*div_binding*/ ctx[6](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(102:0) {#if !hasTouchScreen}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let if_block_anchor;
    	let mounted;
    	let dispose;
    	let if_block = !/*hasTouchScreen*/ ctx[2] && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);

    			if (!mounted) {
    				dispose = listen_dev(window_1, "wheel", stop_propagation(prevent_default(/*wheelHandler*/ ctx[3])), { passive: false }, true, true);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (!/*hasTouchScreen*/ ctx[2]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    			mounted = false;
    			dispose();
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
    	validate_slots("ScrollHandler", slots, []);
    	let isMousedown = false;
    	let initialM = { x: 0, y: 0 };
    	let currentM = { x: 0, y: 0 };
    	let background;
    	let scrollVelocityX = 0;
    	let scrollVelocityY = 0;
    	let momentumID;
    	let scrollInertia = 1;

    	function beginMomentumTracking() {
    		cancelMomentumTracking();
    		momentumID = requestAnimationFrame(momentumLoop);
    	}

    	function cancelMomentumTracking() {
    		cancelAnimationFrame(momentumID);
    		scrollInertia = 1;
    	}

    	function momentumLoop() {
    		scrollVelocityX *= scrollInertia; // Slow the velocity slightly
    		scrollVelocityY *= scrollInertia; // Slow the velocity slightly
    		scroll(scrollVelocityX, scrollVelocityY);
    		scrollInertia = scrollInertia - 0.01;

    		if (Math.abs(scrollVelocityX) > 0.5 || Math.abs(scrollVelocityY) > 0.5) {
    			momentumID = requestAnimationFrame(momentumLoop); // Keep looping
    		}
    	}

    	function scroll(x, y) {
    		scrollVelocityX = Math.min(70, x);
    		scrollVelocityY = Math.min(70, y);
    		main.scrollLeft = main.scrollLeft + scrollVelocityX;
    		main.scrollTop = main.scrollTop + scrollVelocityY;
    	}

    	// Slow down scroll speed with mousewheel
    	function wheelHandler(event) {
    		cancelMomentumTracking();
    		let reducedDeltaY = Math.round(event.deltaY / 2);
    		let reducedDeltaX = Math.round(event.deltaX / 2);
    		main.scrollLeft = main.scrollLeft + reducedDeltaX;
    		main.scrollTop = main.scrollTop + reducedDeltaY;
    	}

    	// The following functions take care of the grab handling
    	function handleMousedown(event) {
    		$$invalidate(0, isMousedown = true);
    		cancelMomentumTracking();
    		initialM.x = event.clientX;
    		initialM.y = event.clientY;
    		background.addEventListener("mousemove", handleMousemove);
    		background.addEventListener("mouseout", handleMouseup);
    		let selection = window.getSelection();
    		selection.removeAllRanges();
    	}

    	function handleMouseup() {
    		$$invalidate(0, isMousedown = false);
    		beginMomentumTracking();
    		background.removeEventListener("mousemove", handleMousemove);
    		background.removeEventListener("mouseout", handleMouseup);
    	}

    	function handleMousemove(event) {
    		currentM.x = event.clientX;
    		currentM.y = event.clientY;
    		const deltaX = initialM.x - currentM.x;
    		const deltaY = initialM.y - currentM.y;
    		scroll(deltaX, deltaY);
    		initialM.x = event.clientX;
    		initialM.y = event.clientY;
    	}

    	var hasTouchScreen = false;

    	if ("maxTouchPoints" in navigator) {
    		hasTouchScreen = navigator.maxTouchPoints > 0;
    	} else if ("msMaxTouchPoints" in navigator) {
    		hasTouchScreen = navigator.msMaxTouchPoints > 0;
    	} else {
    		var mQ = window.matchMedia && matchMedia("(pointer:coarse)");

    		if (mQ && mQ.media === "(pointer:coarse)") {
    			hasTouchScreen = !!mQ.matches;
    		} else if ("orientation" in window) {
    			hasTouchScreen = true; // deprecated, but good fallback
    		} else {
    			// Only as a last resort, fall back to user agent sniffing
    			var UA = navigator.userAgent;

    			hasTouchScreen = (/\b(BlackBerry|webOS|iPhone|IEMobile)\b/i).test(UA) || (/\b(Android|Windows Phone|iPad|iPod)\b/i).test(UA);
    		}
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
    		scrollVelocityX,
    		scrollVelocityY,
    		momentumID,
    		scrollInertia,
    		beginMomentumTracking,
    		cancelMomentumTracking,
    		momentumLoop,
    		scroll,
    		wheelHandler,
    		handleMousedown,
    		handleMouseup,
    		handleMousemove,
    		hasTouchScreen,
    		mQ,
    		UA
    	});

    	$$self.$inject_state = $$props => {
    		if ("isMousedown" in $$props) $$invalidate(0, isMousedown = $$props.isMousedown);
    		if ("initialM" in $$props) initialM = $$props.initialM;
    		if ("currentM" in $$props) currentM = $$props.currentM;
    		if ("background" in $$props) $$invalidate(1, background = $$props.background);
    		if ("scrollVelocityX" in $$props) scrollVelocityX = $$props.scrollVelocityX;
    		if ("scrollVelocityY" in $$props) scrollVelocityY = $$props.scrollVelocityY;
    		if ("momentumID" in $$props) momentumID = $$props.momentumID;
    		if ("scrollInertia" in $$props) scrollInertia = $$props.scrollInertia;
    		if ("hasTouchScreen" in $$props) $$invalidate(2, hasTouchScreen = $$props.hasTouchScreen);
    		if ("mQ" in $$props) mQ = $$props.mQ;
    		if ("UA" in $$props) UA = $$props.UA;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		isMousedown,
    		background,
    		hasTouchScreen,
    		wheelHandler,
    		handleMousedown,
    		handleMouseup,
    		div_binding
    	];
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

    function cubicOut(t) {
        const f = t - 1.0;
        return f * f * f + 1.0;
    }

    function scale(node, { delay = 0, duration = 400, easing = cubicOut, start = 0, opacity = 0 } = {}) {
        const style = getComputedStyle(node);
        const target_opacity = +style.opacity;
        const transform = style.transform === 'none' ? '' : style.transform;
        const sd = 1 - start;
        const od = target_opacity * (1 - opacity);
        return {
            delay,
            duration,
            easing,
            css: (_t, u) => `
			transform: ${transform} scale(${1 - (sd * u)});
			opacity: ${target_opacity - (od * u)}
		`
        };
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
                    const toForegroundParallax = window.parallax;
                    let intersectingWindow = windowObjects.find(wndw => wndw.id === window.intersections[0]);
                    const intersectingWindowIndex = windowObjects.indexOf(intersectingWindow);
                    const toBackgroundParallax = intersectingWindow.parallax;
                    window.parallax = toBackgroundParallax;
                    window.isInForeground = true;
                    intersectingWindow.parallax = toForegroundParallax;
                    intersectingWindow.isInForeground = false;
                    intersectingWindow.touched = true;
                    console.log(`swapped parallaxA:"${toBackgroundParallax}" with parallaxB: "${toForegroundParallax}"`);
                    let updatedWindowObjects = [...windowObjects];
                    updatedWindowObjects[windowIndex] = window;
                    updatedWindowObjects[intersectingWindowIndex] = intersectingWindow;
                    return updatedWindowObjects;
                });

            }
        }
    }

    var windowHandler$1 = windowHandler();

    /* src/UI/Button.svelte generated by Svelte v3.32.1 */

    const file$1 = "src/UI/Button.svelte";

    // (70:36) 
    function create_if_block_2(ctx) {
    	let span;
    	let t1;
    	let svg;
    	let g1;
    	let rect0;
    	let g0;
    	let rect1;
    	let polygon;

    	const block = {
    		c: function create() {
    			span = element("span");
    			span.textContent = "Go to the next subpage!";
    			t1 = space();
    			svg = svg_element("svg");
    			g1 = svg_element("g");
    			rect0 = svg_element("rect");
    			g0 = svg_element("g");
    			rect1 = svg_element("rect");
    			polygon = svg_element("polygon");
    			attr_dev(span, "class", "svelte-zk5aqi");
    			add_location(span, file$1, 70, 8, 2128);
    			attr_dev(rect0, "id", "box");
    			attr_dev(rect0, "x", ".5");
    			attr_dev(rect0, "y", ".5");
    			attr_dev(rect0, "width", "53");
    			attr_dev(rect0, "height", "14");
    			attr_dev(rect0, "rx", "3");
    			attr_dev(rect0, "fill", "#151515");
    			attr_dev(rect0, "stroke", "#FEFEFE");
    			attr_dev(rect0, "class", "svelte-zk5aqi");
    			add_location(rect0, file$1, 77, 16, 2357);
    			attr_dev(rect1, "x", "12");
    			attr_dev(rect1, "y", "7");
    			attr_dev(rect1, "width", "20");
    			attr_dev(rect1, "height", "1");
    			attr_dev(rect1, "fill", "#FEFEFE");
    			attr_dev(rect1, "class", "svelte-zk5aqi");
    			add_location(rect1, file$1, 88, 20, 2678);
    			attr_dev(polygon, "points", "42 8 32 5 32 8");
    			attr_dev(polygon, "fill", "#FEFEFE");
    			attr_dev(polygon, "class", "svelte-zk5aqi");
    			add_location(polygon, file$1, 89, 20, 2757);
    			attr_dev(g0, "id", "arrow");
    			add_location(g0, file$1, 87, 16, 2643);
    			attr_dev(g1, "fill", "none");
    			attr_dev(g1, "fill-rule", "evenodd");
    			add_location(g1, file$1, 76, 12, 2305);
    			attr_dev(svg, "version", "1.1");
    			attr_dev(svg, "viewBox", "0 0 54 15");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "class", "svelte-zk5aqi");
    			add_location(svg, file$1, 71, 8, 2173);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, svg, anchor);
    			append_dev(svg, g1);
    			append_dev(g1, rect0);
    			append_dev(g1, g0);
    			append_dev(g0, rect1);
    			append_dev(g0, polygon);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(70:36) ",
    		ctx
    	});

    	return block;
    }

    // (34:40) 
    function create_if_block_1(ctx) {
    	let span;
    	let t1;
    	let svg;
    	let g;
    	let rect0;
    	let rect1;
    	let rect2;

    	const block = {
    		c: function create() {
    			span = element("span");
    			span.textContent = "Shrink this window";
    			t1 = space();
    			svg = svg_element("svg");
    			g = svg_element("g");
    			rect0 = svg_element("rect");
    			rect1 = svg_element("rect");
    			rect2 = svg_element("rect");
    			attr_dev(span, "class", "svelte-zk5aqi");
    			add_location(span, file$1, 34, 8, 1113);
    			attr_dev(rect0, "id", "box");
    			attr_dev(rect0, "x", ".5");
    			attr_dev(rect0, "y", ".5");
    			attr_dev(rect0, "width", "53");
    			attr_dev(rect0, "height", "14");
    			attr_dev(rect0, "rx", "3");
    			attr_dev(rect0, "fill", "#151515");
    			attr_dev(rect0, "stroke", "#FEFEFE");
    			attr_dev(rect0, "class", "svelte-zk5aqi");
    			add_location(rect0, file$1, 41, 16, 1337);
    			attr_dev(rect1, "id", "upper");
    			attr_dev(rect1, "x", "17");
    			attr_dev(rect1, "y", "5");
    			attr_dev(rect1, "width", "20");
    			attr_dev(rect1, "height", "1");
    			attr_dev(rect1, "fill", "#FEFEFE");
    			attr_dev(rect1, "class", "svelte-zk5aqi");
    			add_location(rect1, file$1, 51, 16, 1623);
    			attr_dev(rect2, "id", "lower");
    			attr_dev(rect2, "x", "17");
    			attr_dev(rect2, "y", "9");
    			attr_dev(rect2, "width", "20");
    			attr_dev(rect2, "height", "1");
    			attr_dev(rect2, "fill", "#FEFEFE");
    			attr_dev(rect2, "class", "svelte-zk5aqi");
    			add_location(rect2, file$1, 59, 16, 1845);
    			attr_dev(g, "fill", "none");
    			attr_dev(g, "fill-rule", "evenodd");
    			add_location(g, file$1, 40, 12, 1285);
    			attr_dev(svg, "version", "1.1");
    			attr_dev(svg, "viewBox", "0 0 54 15");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "class", "svelte-zk5aqi");
    			add_location(svg, file$1, 35, 8, 1153);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, svg, anchor);
    			append_dev(svg, g);
    			append_dev(g, rect0);
    			append_dev(g, rect1);
    			append_dev(g, rect2);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(34:40) ",
    		ctx
    	});

    	return block;
    }

    // (6:4) {#if buttonType === "subpage"}
    function create_if_block$1(ctx) {
    	let span;
    	let t1;
    	let svg;
    	let g2;
    	let rect0;
    	let g0;
    	let rect1;
    	let polygon0;
    	let g1;
    	let rect2;
    	let polygon1;

    	const block = {
    		c: function create() {
    			span = element("span");
    			span.textContent = "Go to the subpage for this window";
    			t1 = space();
    			svg = svg_element("svg");
    			g2 = svg_element("g");
    			rect0 = svg_element("rect");
    			g0 = svg_element("g");
    			rect1 = svg_element("rect");
    			polygon0 = svg_element("polygon");
    			g1 = svg_element("g");
    			rect2 = svg_element("rect");
    			polygon1 = svg_element("polygon");
    			attr_dev(span, "class", "svelte-zk5aqi");
    			add_location(span, file$1, 6, 8, 118);
    			attr_dev(rect0, "id", "box");
    			attr_dev(rect0, "x", ".5");
    			attr_dev(rect0, "y", ".5");
    			attr_dev(rect0, "width", "53");
    			attr_dev(rect0, "height", "14");
    			attr_dev(rect0, "rx", "3");
    			attr_dev(rect0, "fill", "#151515");
    			attr_dev(rect0, "stroke", "#FEFEFE");
    			attr_dev(rect0, "class", "svelte-zk5aqi");
    			add_location(rect0, file$1, 13, 16, 357);
    			attr_dev(rect1, "x", "12");
    			attr_dev(rect1, "y", "6");
    			attr_dev(rect1, "width", "20");
    			attr_dev(rect1, "height", "1");
    			attr_dev(rect1, "fill", "#FEFEFE");
    			attr_dev(rect1, "class", "svelte-zk5aqi");
    			add_location(rect1, file$1, 24, 20, 678);
    			attr_dev(polygon0, "points", "42 7 32 4 32 7");
    			attr_dev(polygon0, "fill", "#FEFEFE");
    			attr_dev(polygon0, "class", "svelte-zk5aqi");
    			add_location(polygon0, file$1, 25, 20, 757);
    			attr_dev(g0, "id", "upper");
    			attr_dev(g0, "class", "svelte-zk5aqi");
    			add_location(g0, file$1, 23, 16, 643);
    			attr_dev(rect2, "x", "22");
    			attr_dev(rect2, "y", "8");
    			attr_dev(rect2, "width", "20");
    			attr_dev(rect2, "height", "1");
    			attr_dev(rect2, "fill", "#FEFEFE");
    			attr_dev(rect2, "class", "svelte-zk5aqi");
    			add_location(rect2, file$1, 28, 20, 880);
    			attr_dev(polygon1, "points", "12 8 22 8 22 11");
    			attr_dev(polygon1, "fill", "#FEFEFE");
    			attr_dev(polygon1, "class", "svelte-zk5aqi");
    			add_location(polygon1, file$1, 29, 20, 959);
    			attr_dev(g1, "id", "lower");
    			attr_dev(g1, "class", "svelte-zk5aqi");
    			add_location(g1, file$1, 27, 16, 845);
    			attr_dev(g2, "fill", "none");
    			attr_dev(g2, "fill-rule", "evenodd");
    			add_location(g2, file$1, 12, 12, 305);
    			attr_dev(svg, "version", "1.1");
    			attr_dev(svg, "viewBox", "0 0 54 15");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "class", "svelte-zk5aqi");
    			add_location(svg, file$1, 7, 8, 173);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, svg, anchor);
    			append_dev(svg, g2);
    			append_dev(g2, rect0);
    			append_dev(g2, g0);
    			append_dev(g0, rect1);
    			append_dev(g0, polygon0);
    			append_dev(g2, g1);
    			append_dev(g1, rect2);
    			append_dev(g1, polygon1);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(6:4) {#if buttonType === \\\"subpage\\\"}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let button;
    	let button_class_value;

    	function select_block_type(ctx, dirty) {
    		if (/*buttonType*/ ctx[0] === "subpage") return create_if_block$1;
    		if (/*buttonType*/ ctx[0] === "minimize") return create_if_block_1;
    		if (/*buttonType*/ ctx[0] === "next") return create_if_block_2;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type && current_block_type(ctx);

    	const block = {
    		c: function create() {
    			button = element("button");
    			if (if_block) if_block.c();
    			attr_dev(button, "class", button_class_value = "" + (null_to_empty(/*buttonType*/ ctx[0]) + " svelte-zk5aqi"));
    			add_location(button, file$1, 4, 0, 47);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			if (if_block) if_block.m(button, null);
    		},
    		p: function update(ctx, [dirty]) {
    			if (current_block_type !== (current_block_type = select_block_type(ctx))) {
    				if (if_block) if_block.d(1);
    				if_block = current_block_type && current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(button, null);
    				}
    			}

    			if (dirty & /*buttonType*/ 1 && button_class_value !== (button_class_value = "" + (null_to_empty(/*buttonType*/ ctx[0]) + " svelte-zk5aqi"))) {
    				attr_dev(button, "class", button_class_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);

    			if (if_block) {
    				if_block.d();
    			}
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
    	validate_slots("Button", slots, []);
    	let { buttonType } = $$props;
    	const writable_props = ["buttonType"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Button> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("buttonType" in $$props) $$invalidate(0, buttonType = $$props.buttonType);
    	};

    	$$self.$capture_state = () => ({ buttonType });

    	$$self.$inject_state = $$props => {
    		if ("buttonType" in $$props) $$invalidate(0, buttonType = $$props.buttonType);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [buttonType];
    }

    class Button extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { buttonType: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Button",
    			options,
    			id: create_fragment$1.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*buttonType*/ ctx[0] === undefined && !("buttonType" in props)) {
    			console.warn("<Button> was created without expected prop 'buttonType'");
    		}
    	}

    	get buttonType() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set buttonType(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/UI/WindowElement.svelte generated by Svelte v3.32.1 */
    const file$2 = "src/UI/WindowElement.svelte";

    // (63:8) {:else}
    function create_else_block_1(ctx) {
    	let h1;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "Title";
    			attr_dev(h1, "class", "svelte-i8fy6r");
    			add_location(h1, file$2, 63, 12, 1750);
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
    		source: "(63:8) {:else}",
    		ctx
    	});

    	return block;
    }

    // (61:8) {#if title}
    function create_if_block_1$1(ctx) {
    	let h1;
    	let t;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			t = text(/*title*/ ctx[5]);
    			attr_dev(h1, "class", "svelte-i8fy6r");
    			add_location(h1, file$2, 61, 12, 1705);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    			append_dev(h1, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*title*/ 32) set_data_dev(t, /*title*/ ctx[5]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(61:8) {#if title}",
    		ctx
    	});

    	return block;
    }

    // (68:8) {:else}
    function create_else_block(ctx) {
    	let button;
    	let current;

    	button = new Button({
    			props: { buttonType: "hidden" },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(button.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(button, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(button, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(68:8) {:else}",
    		ctx
    	});

    	return block;
    }

    // (66:8) {#if enlargeable}
    function create_if_block$2(ctx) {
    	let button;
    	let current;

    	button = new Button({
    			props: { buttonType: "subpage" },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(button.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(button, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(button, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(66:8) {#if enlargeable}",
    		ctx
    	});

    	return block;
    }

    // (76:14) <p>
    function fallback_block(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "Content goes here";
    			add_location(p, file$2, 75, 14, 2073);
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
    		source: "(76:14) <p>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let section;
    	let header;
    	let button;
    	let t0;
    	let t1;
    	let current_block_type_index;
    	let if_block1;
    	let t2;
    	let div;
    	let t3;
    	let footer;
    	let section_class_value;
    	let section_intro;
    	let current;
    	let mounted;
    	let dispose;

    	button = new Button({
    			props: { buttonType: "minimize" },
    			$$inline: true
    		});

    	function select_block_type(ctx, dirty) {
    		if (/*title*/ ctx[5]) return create_if_block_1$1;
    		return create_else_block_1;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block0 = current_block_type(ctx);
    	const if_block_creators = [create_if_block$2, create_else_block];
    	const if_blocks = [];

    	function select_block_type_1(ctx, dirty) {
    		if (/*enlargeable*/ ctx[6]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type_1(ctx);
    	if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	const default_slot_template = /*#slots*/ ctx[13].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[12], null);
    	const default_slot_or_fallback = default_slot || fallback_block(ctx);

    	const block = {
    		c: function create() {
    			section = element("section");
    			header = element("header");
    			create_component(button.$$.fragment);
    			t0 = space();
    			if_block0.c();
    			t1 = space();
    			if_block1.c();
    			t2 = space();
    			div = element("div");
    			if (default_slot_or_fallback) default_slot_or_fallback.c();
    			t3 = space();
    			footer = element("footer");
    			attr_dev(header, "class", "svelte-i8fy6r");
    			add_location(header, file$2, 58, 4, 1623);
    			set_style(div, "background", /*background*/ ctx[4]);
    			set_style(div, "background-size", "cover");
    			attr_dev(div, "class", "svelte-i8fy6r");
    			toggle_class(div, "no-events", !/*isInForeground*/ ctx[1]);
    			add_location(div, file$2, 71, 4, 1940);
    			add_location(footer, file$2, 77, 4, 2120);
    			attr_dev(section, "class", section_class_value = "" + (null_to_empty(/*parallax*/ ctx[0]) + " svelte-i8fy6r"));
    			set_style(section, "--windowWidth", /*width*/ ctx[3]);
    			set_style(section, "--windowHeight", /*height*/ ctx[2]);
    			set_style(section, "--baseShuffleDistance", /*distanceFromIntersection*/ ctx[7].base);
    			set_style(section, "--largeShuffleDistance", /*distanceFromIntersection*/ ctx[7].large);
    			toggle_class(section, "trigger-shuffle", !/*isInForeground*/ ctx[1] && /*touched*/ ctx[8]);
    			add_location(section, file$2, 48, 0, 1272);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, header);
    			mount_component(button, header, null);
    			append_dev(header, t0);
    			if_block0.m(header, null);
    			append_dev(header, t1);
    			if_blocks[current_block_type_index].m(header, null);
    			append_dev(section, t2);
    			append_dev(section, div);

    			if (default_slot_or_fallback) {
    				default_slot_or_fallback.m(div, null);
    			}

    			append_dev(section, t3);
    			append_dev(section, footer);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(section, "click", /*handleWindowClick*/ ctx[9], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block0) {
    				if_block0.p(ctx, dirty);
    			} else {
    				if_block0.d(1);
    				if_block0 = current_block_type(ctx);

    				if (if_block0) {
    					if_block0.c();
    					if_block0.m(header, t1);
    				}
    			}

    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type_1(ctx);

    			if (current_block_type_index !== previous_block_index) {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block1 = if_blocks[current_block_type_index];

    				if (!if_block1) {
    					if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block1.c();
    				}

    				transition_in(if_block1, 1);
    				if_block1.m(header, null);
    			}

    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 4096) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[12], dirty, null, null);
    				}
    			}

    			if (!current || dirty & /*background*/ 16) {
    				set_style(div, "background", /*background*/ ctx[4]);
    			}

    			if (dirty & /*isInForeground*/ 2) {
    				toggle_class(div, "no-events", !/*isInForeground*/ ctx[1]);
    			}

    			if (!current || dirty & /*parallax*/ 1 && section_class_value !== (section_class_value = "" + (null_to_empty(/*parallax*/ ctx[0]) + " svelte-i8fy6r"))) {
    				attr_dev(section, "class", section_class_value);
    			}

    			if (!current || dirty & /*width*/ 8) {
    				set_style(section, "--windowWidth", /*width*/ ctx[3]);
    			}

    			if (!current || dirty & /*height*/ 4) {
    				set_style(section, "--windowHeight", /*height*/ ctx[2]);
    			}

    			if (!current || dirty & /*distanceFromIntersection*/ 128) {
    				set_style(section, "--baseShuffleDistance", /*distanceFromIntersection*/ ctx[7].base);
    			}

    			if (!current || dirty & /*distanceFromIntersection*/ 128) {
    				set_style(section, "--largeShuffleDistance", /*distanceFromIntersection*/ ctx[7].large);
    			}

    			if (dirty & /*parallax, isInForeground, touched*/ 259) {
    				toggle_class(section, "trigger-shuffle", !/*isInForeground*/ ctx[1] && /*touched*/ ctx[8]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			transition_in(if_block1);
    			transition_in(default_slot_or_fallback, local);

    			if (!section_intro) {
    				add_render_callback(() => {
    					section_intro = create_in_transition(section, scale, { duration: 2500 });
    					section_intro.start();
    				});
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button.$$.fragment, local);
    			transition_out(if_block1);
    			transition_out(default_slot_or_fallback, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			destroy_component(button);
    			if_block0.d();
    			if_blocks[current_block_type_index].d();
    			if (default_slot_or_fallback) default_slot_or_fallback.d(detaching);
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

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("WindowElement", slots, ['default']);
    	let { height } = $$props;
    	let { width } = $$props;
    	let { parallax } = $$props;
    	let { background = "" } = $$props;
    	let { title } = $$props;
    	let { enlargeable = true } = $$props;
    	let { id } = $$props;
    	let { isInForeground = true } = $$props;
    	let { intersections = [] } = $$props;
    	let { distanceFromIntersection = 20 } = $$props;
    	let touched = false;
    	let thisWindowObject;

    	windowHandler$1.registerWindow({
    		id,
    		parallax,
    		isInForeground,
    		intersections,
    		touched
    	});

    	const unsubscribe = windowHandler$1.subscribe(windows => {
    		thisWindowObject = windows.find(wdws => wdws.id === id);
    		$$invalidate(1, isInForeground = thisWindowObject.isInForeground);
    		$$invalidate(0, parallax = thisWindowObject.parallax);
    		$$invalidate(8, touched = thisWindowObject.touched);
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
    		"height",
    		"width",
    		"parallax",
    		"background",
    		"title",
    		"enlargeable",
    		"id",
    		"isInForeground",
    		"intersections",
    		"distanceFromIntersection"
    	];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<WindowElement> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("height" in $$props) $$invalidate(2, height = $$props.height);
    		if ("width" in $$props) $$invalidate(3, width = $$props.width);
    		if ("parallax" in $$props) $$invalidate(0, parallax = $$props.parallax);
    		if ("background" in $$props) $$invalidate(4, background = $$props.background);
    		if ("title" in $$props) $$invalidate(5, title = $$props.title);
    		if ("enlargeable" in $$props) $$invalidate(6, enlargeable = $$props.enlargeable);
    		if ("id" in $$props) $$invalidate(10, id = $$props.id);
    		if ("isInForeground" in $$props) $$invalidate(1, isInForeground = $$props.isInForeground);
    		if ("intersections" in $$props) $$invalidate(11, intersections = $$props.intersections);
    		if ("distanceFromIntersection" in $$props) $$invalidate(7, distanceFromIntersection = $$props.distanceFromIntersection);
    		if ("$$scope" in $$props) $$invalidate(12, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		onDestroy,
    		scale,
    		windowHandler: windowHandler$1,
    		Button,
    		height,
    		width,
    		parallax,
    		background,
    		title,
    		enlargeable,
    		id,
    		isInForeground,
    		intersections,
    		distanceFromIntersection,
    		touched,
    		thisWindowObject,
    		unsubscribe,
    		handleWindowClick
    	});

    	$$self.$inject_state = $$props => {
    		if ("height" in $$props) $$invalidate(2, height = $$props.height);
    		if ("width" in $$props) $$invalidate(3, width = $$props.width);
    		if ("parallax" in $$props) $$invalidate(0, parallax = $$props.parallax);
    		if ("background" in $$props) $$invalidate(4, background = $$props.background);
    		if ("title" in $$props) $$invalidate(5, title = $$props.title);
    		if ("enlargeable" in $$props) $$invalidate(6, enlargeable = $$props.enlargeable);
    		if ("id" in $$props) $$invalidate(10, id = $$props.id);
    		if ("isInForeground" in $$props) $$invalidate(1, isInForeground = $$props.isInForeground);
    		if ("intersections" in $$props) $$invalidate(11, intersections = $$props.intersections);
    		if ("distanceFromIntersection" in $$props) $$invalidate(7, distanceFromIntersection = $$props.distanceFromIntersection);
    		if ("touched" in $$props) $$invalidate(8, touched = $$props.touched);
    		if ("thisWindowObject" in $$props) thisWindowObject = $$props.thisWindowObject;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		parallax,
    		isInForeground,
    		height,
    		width,
    		background,
    		title,
    		enlargeable,
    		distanceFromIntersection,
    		touched,
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

    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {
    			height: 2,
    			width: 3,
    			parallax: 0,
    			background: 4,
    			title: 5,
    			enlargeable: 6,
    			id: 10,
    			isInForeground: 1,
    			intersections: 11,
    			distanceFromIntersection: 7
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "WindowElement",
    			options,
    			id: create_fragment$2.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*height*/ ctx[2] === undefined && !("height" in props)) {
    			console.warn("<WindowElement> was created without expected prop 'height'");
    		}

    		if (/*width*/ ctx[3] === undefined && !("width" in props)) {
    			console.warn("<WindowElement> was created without expected prop 'width'");
    		}

    		if (/*parallax*/ ctx[0] === undefined && !("parallax" in props)) {
    			console.warn("<WindowElement> was created without expected prop 'parallax'");
    		}

    		if (/*title*/ ctx[5] === undefined && !("title" in props)) {
    			console.warn("<WindowElement> was created without expected prop 'title'");
    		}

    		if (/*id*/ ctx[10] === undefined && !("id" in props)) {
    			console.warn("<WindowElement> was created without expected prop 'id'");
    		}
    	}

    	get height() {
    		throw new Error("<WindowElement>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set height(value) {
    		throw new Error("<WindowElement>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get width() {
    		throw new Error("<WindowElement>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set width(value) {
    		throw new Error("<WindowElement>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get parallax() {
    		throw new Error("<WindowElement>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set parallax(value) {
    		throw new Error("<WindowElement>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get background() {
    		throw new Error("<WindowElement>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set background(value) {
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

    	get distanceFromIntersection() {
    		throw new Error("<WindowElement>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set distanceFromIntersection(value) {
    		throw new Error("<WindowElement>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Windows/AboutWindow.svelte generated by Svelte v3.32.1 */
    const file$3 = "src/Windows/AboutWindow.svelte";

    // (6:4) <WindowElement         width={378}         height={392}         parallax="very-slow"         background="#A25C24"         title="ABOUT"         id={0}         isInForeground={true}         intersections={[1]}         distanceFromIntersection={{             base: -13,             large: -12,         }}     >
    function create_default_slot(ctx) {
    	let div;
    	let p0;
    	let t1;
    	let p1;
    	let t3;
    	let p2;
    	let t5;
    	let p3;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p0 = element("p");
    			p0.textContent = "NICE";
    			t1 = space();
    			p1 = element("p");
    			p1.textContent = "TO";
    			t3 = space();
    			p2 = element("p");
    			p2.textContent = "MEET";
    			t5 = space();
    			p3 = element("p");
    			p3.textContent = "YOU";
    			set_style(p0, "--animation-order", "0");
    			set_style(p0, "--left-offset", "120");
    			attr_dev(p0, "class", "svelte-1svwnnw");
    			add_location(p0, file$3, 20, 12, 469);
    			set_style(p1, "--animation-order", "1");
    			set_style(p1, "--left-offset", "218");
    			attr_dev(p1, "class", "svelte-1svwnnw");
    			add_location(p1, file$3, 21, 12, 542);
    			set_style(p2, "--animation-order", "2");
    			set_style(p2, "--left-offset", "72");
    			attr_dev(p2, "class", "svelte-1svwnnw");
    			add_location(p2, file$3, 22, 12, 613);
    			set_style(p3, "--animation-order", "3");
    			set_style(p3, "--left-offset", "146");
    			attr_dev(p3, "class", "svelte-1svwnnw");
    			add_location(p3, file$3, 23, 12, 685);
    			attr_dev(div, "class", "container svelte-1svwnnw");
    			add_location(div, file$3, 19, 8, 433);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p0);
    			append_dev(div, t1);
    			append_dev(div, p1);
    			append_dev(div, t3);
    			append_dev(div, p2);
    			append_dev(div, t5);
    			append_dev(div, p3);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(6:4) <WindowElement         width={378}         height={392}         parallax=\\\"very-slow\\\"         background=\\\"#A25C24\\\"         title=\\\"ABOUT\\\"         id={0}         isInForeground={true}         intersections={[1]}         distanceFromIntersection={{             base: -13,             large: -12,         }}     >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let div;
    	let windowelement;
    	let current;

    	windowelement = new WindowElement({
    			props: {
    				width: 378,
    				height: 392,
    				parallax: "very-slow",
    				background: "#A25C24",
    				title: "ABOUT",
    				id: 0,
    				isInForeground: true,
    				intersections: [1],
    				distanceFromIntersection: { base: -13, large: -12 },
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(windowelement.$$.fragment);
    			attr_dev(div, "class", "wrapper grid-area svelte-1svwnnw");
    			add_location(div, file$3, 4, 0, 80);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(windowelement, div, null);
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
    			if (detaching) detach_dev(div);
    			destroy_component(windowelement);
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
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "AboutWindow",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src/UX/IntersectionObserver.svelte generated by Svelte v3.32.1 */
    const file$4 = "src/UX/IntersectionObserver.svelte";
    const get_default_slot_changes = dirty => ({ intersecting: dirty & /*intersecting*/ 1 });
    const get_default_slot_context = ctx => ({ intersecting: /*intersecting*/ ctx[0] });

    function create_fragment$4(ctx) {
    	let div;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[8].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[7], get_default_slot_context);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div, "class", "svelte-1hzn8rv");
    			add_location(div, file$4, 42, 0, 1436);
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
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
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

    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {
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
    			id: create_fragment$4.name
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
    const file$5 = "src/UI/Image.svelte";

    function create_fragment$5(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			attr_dev(img, "sizes", /*sizes*/ ctx[3]);
    			attr_dev(img, "srcset", /*srcset*/ ctx[0]);
    			attr_dev(img, "alt", /*alt*/ ctx[2]);
    			if (img.src !== (img_src_value = /*src*/ ctx[1])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "draggable", "false");
    			attr_dev(img, "loading", "lazy");
    			attr_dev(img, "class", "svelte-vdxc3e");
    			toggle_class(img, "loaded", /*loaded*/ ctx[4]);
    			add_location(img, file$5, 18, 0, 290);
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
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, { srcset: 0, src: 1, alt: 2, sizes: 3 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Image",
    			options,
    			id: create_fragment$5.name
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

    // (18:4) {#if intersecting || nativeLoading}
    function create_if_block$3(ctx) {
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
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(18:4) {#if intersecting || nativeLoading}",
    		ctx
    	});

    	return block;
    }

    // (17:0) <IntersectionObserver once={true} let:intersecting>
    function create_default_slot$1(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = (/*intersecting*/ ctx[5] || /*nativeLoading*/ ctx[4]) && create_if_block$3(ctx);

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
    			if (/*intersecting*/ ctx[5] || /*nativeLoading*/ ctx[4]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*intersecting, nativeLoading*/ 48) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$3(ctx);
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
    		source: "(17:0) <IntersectionObserver once={true} let:intersecting>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
    	let intersectionobserver;
    	let current;

    	intersectionobserver = new IntersectionObserver_1({
    			props: {
    				once: true,
    				$$slots: {
    					default: [
    						create_default_slot$1,
    						({ intersecting }) => ({ 5: intersecting }),
    						({ intersecting }) => intersecting ? 32 : 0
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

    			if (dirty & /*$$scope, srcset, sizes, alt, src, intersecting, nativeLoading*/ 127) {
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
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("ImageLoader", slots, []);
    	let { src } = $$props;
    	let { alt } = $$props;
    	let { sizes } = $$props;
    	let { srcset } = $$props;
    	let nativeLoading = false; // Determine whether to bypass our intersecting check

    	onMount(() => {
    		if ("loading" in HTMLImageElement.prototype) {
    			$$invalidate(4, nativeLoading = true);
    		}
    	});

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
    		IntersectionObserver: IntersectionObserver_1,
    		Image,
    		onMount,
    		src,
    		alt,
    		sizes,
    		srcset,
    		nativeLoading
    	});

    	$$self.$inject_state = $$props => {
    		if ("src" in $$props) $$invalidate(0, src = $$props.src);
    		if ("alt" in $$props) $$invalidate(1, alt = $$props.alt);
    		if ("sizes" in $$props) $$invalidate(2, sizes = $$props.sizes);
    		if ("srcset" in $$props) $$invalidate(3, srcset = $$props.srcset);
    		if ("nativeLoading" in $$props) $$invalidate(4, nativeLoading = $$props.nativeLoading);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [src, alt, sizes, srcset, nativeLoading];
    }

    class ImageLoader extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, { src: 0, alt: 1, sizes: 2, srcset: 3 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ImageLoader",
    			options,
    			id: create_fragment$6.name
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
    const file$6 = "src/Windows/ProjectCorazon.svelte";

    // (9:4) <WindowElement         width={465}         height={616}         parallax="very-fast"         background={'#6EA179 url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA5NjAgMTIwMCI+PHBhdGggZmlsbD0iIzgwNzI1ZiIgZD0iTTAgMGg5NTZ2MTIwMEgweiIvPjxnIGZpbGwtb3BhY2l0eT0iLjUiPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0tMzkuNSAxMjcyLjdsNDQ2LTEzMzEgNTMuOSA2NjMuOS0yMjcuNiA2Njd6Ii8+PHBhdGggZD0iTS03Mi43IDkyMlYtLjVsMzY4LjggMy4yTDE2Mi40IDgwN3oiLz48cGF0aCBmaWxsPSIjMWExZjEzIiBkPSJNOTU5IDU0MS41TDQyOC40IDcyOCAzMjMgMTA5Mi4xbDYzMC43IDE4MC42eiIvPjxwYXRoIGZpbGw9IiNmZWRjYmUiIGQ9Ik0xMzQuNiA4MjlsMTY1LjEtNDA3LjIgNjA0LjctNDM2LTIxLjEgNDgxLjh6Ii8+PHBhdGggZD0iTS03Mi43IDk5Mi43bDIzOC4yLTI5M0wyNjAuOC02MSAxLjgtNzIuN3oiLz48cGF0aCBmaWxsPSJpdm9yeSIgZD0iTTM2NSA4NDkuOUw0NDEgMzYybC01MTMuNyA3NDYuOCA3NSAxMjQuNXoiLz48cGF0aCBmaWxsPSIjNjgzYjFjIiBkPSJNODk0LTcyLjdMMzg2IDcwLjdsMjMxLjQgMTIwMi0xNS4yLTExMjJ6Ii8+PHBhdGggZmlsbD0iI2ZmY2ZiMyIgZD0iTTQ0OCA5MS4zbC03OC40IDM1MEwyNzYuNi0xbDI5MC4yLTcxLjZ6Ii8+PHBhdGggZmlsbD0iI2NmZThlOSIgZD0iTTQ1My44IDEwODkuOGwtMjcxIDg5LjQtMzAuNiA5My41TDU1MyAxMDg5Ljl6Ii8+PHBhdGggZmlsbD0iI2QzYjhhMCIgZD0iTTU0Ny42IDIwOC4yTDc0OC41IDcwOWwxOTItNTAxLjZMNjM0LjEgODkuMXoiLz48cGF0aCBmaWxsPSIjMTMyNzI5IiBkPSJNNzI4LjQgNzg3LjJsMjA2LjMgMzgzLjItNzMwLjYgMTAyLjMgMzQ3LjctMTQxLjR6Ii8+PHBhdGggZmlsbD0iIzE1MGIwMiIgZD0iTTU0Mi43LTcyLjdsMzI0LjcgMjIuMUw0MDQgMjYwLjNsMTU0LjItMTAuOXoiLz48cGF0aCBmaWxsPSIjNTM4MzkwIiBkPSJNMTAyOSAxMDk5LjhsLTI5Ny41LTI4MiAxMDcuNS05MCAxNzEuNyA0NC4yeiIvPjxwYXRoIGZpbGw9IiNhOTgzNGEiIGQ9Ik0zMDUuNCA5NzQuN2wtMjY2IDI0Ni45IDI3OS04NC41IDIwMi40LTcwNC40eiIvPjxwYXRoIGZpbGw9IiM5OTZjMzMiIGQ9Ik0xMDUgODA1bDIwMC4zLTU3NS40TDE0NCA4OTQuOS03Mi43IDk5Ny44eiIvPjxwYXRoIGZpbGw9IiNmZmZhZjAiIGQ9Ik0yMzAuNiAxMDIzbDI1Ny45LTY0Ni0xNDUuOC0xMS4yLTEzMCAyODkuM3oiLz48cGF0aCBmaWxsPSIjYzlhODg3IiBkPSJNNTE1LjkgMzkwLjFMMzg1LjMgMjEzLjZsNDAuMyAzMzEuN0w4NDIgNjIzLjV6Ii8+PHBhdGggZmlsbD0iIzAwMGEwNyIgZD0iTTMxOC4xIDI0Ny44bC0zOTAuOCA0MjYgMjExLTc0Ni41IDE1Ni4xIDQ5My44eiIvPjxwYXRoIGZpbGw9IiM2ZjUwMmEiIGQ9Ik0xMDI5IDcxMS43TDM4NyA4MTMuNmw1MzUuNi0zMjIuMUw5NDQtMzcuM3oiLz48cGF0aCBmaWxsPSIjZmZlMGJmIiBkPSJNLTcyLjcgOTg2bDM4LjggMjg2LjcgMzUwLjgtMzM1IDgwLTE3My42eiIvPjxwYXRoIGZpbGw9IiNkZjNhMDAiIGQ9Ik01MTkuMSA1Ni4ybC05Mi4zIDU0LjYtNjUuNCA4Mi41IDYwLjUtMTU0Ljd6Ii8+PHBhdGggZmlsbD0iIzQyMGQwMCIgZD0iTTQyMy45IDIzMC41TDU0NiAyOTEuN2wtNDMuMS0xMDcgODAuNy0yNTcuNHoiLz48cGF0aCBmaWxsPSIjNTY0MTI1IiBkPSJNNDg1LjEgNTY0LjVMNTQ0IDYwMGwyMTcgMTk5LjQtMzAzLjcgMzg3eiIvPjxwYXRoIGZpbGw9IiNkY2JhYTIiIGQ9Ik02MDguNyAzMTkuNEwzNjUgMzEzLjNsNDYwLjMtODIuOEw1NDkgMTY3Ljd6Ii8+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTUyMi4yLTcyLjdsLTU3LjQgMzEuNEwzNTQuNyA2Ny4zbC0xNC4zIDg0Ljl6Ii8+PHBhdGggZmlsbD0iIzE2MTkxMCIgZD0iTTcwNC40IDE0MS45bDY4LjQtMTE3LTMzNy05Ny42TDc2NiAxMjQuNXoiLz48cGF0aCBmaWxsPSIjOWE5MTdkIiBkPSJNMjQ3IDEwMC4ybDEwOCAxNzkuNEwyNTUuNyA1MjkgMzQ0LTUwLjV6Ii8+PHBhdGggZmlsbD0iIzlhNzM1MCIgZD0iTTU0Ni41IDE4OC43TDEwMTItNzIuNyA3NDguNCAxNTkuNSA1MDcuMiA0Ni44eiIvPjxwYXRoIGZpbGw9IiNhNTg3NjciIGQ9Ik05NjQuNSAyNTcuOEw4OTAuOC00MC4xbC0yNyAzMTRMNzgyIDcyNy4yeiIvPjxwYXRoIGZpbGw9IiNkZGVhZTgiIGQ9Ik0yNjYuNiAxMTM1LjdsLTE2LjUgMzUuOEw3NC42IDEyNDVsNDAzLjctMTM0eiIvPjxwYXRoIGZpbGw9IiMxYzE2MDAiIGQ9Ik0tNzIuNyA1NzAuNGwxMDYgMjk0LjIgOTYuMy01NiAzNS42LTEwNS40eiIvPjxwYXRoIGZpbGw9IiNhMTg5NWEiIGQ9Ik00NjUuMSA3ODcuNGwtNTUuOC05MyA3NC0yOTMuNCA1My45LTE0Ljd6Ii8+PC9nPjwvc3ZnPg==")'}         title="PROJECT_01"         id={1}         isInForeground={false}         intersections={[0]}         distanceFromIntersection={{             base: 13,             large: 12,         }}     >
    function create_default_slot$2(ctx) {
    	let imageloader;
    	let current;

    	imageloader = new ImageLoader({
    			props: {
    				sizes: "463px",
    				srcset: "https://res.cloudinary.com/thdrstnr/image/upload/w_960,f_auto/" + slug + " 960w, \n            https://res.cloudinary.com/thdrstnr/image/upload/w_463,f_auto,q_auto:best/" + slug + " 463w,\n            https://res.cloudinary.com/thdrstnr/image/upload/w_291,f_auto,q_auto:best/" + slug + " 291w",
    				src: "https://res.cloudinary.com/thdrstnr/image/upload/w_960,f_auto/" + slug,
    				alt: "Con Corazón is embracing artisans from countries at war"
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(imageloader.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(imageloader, target, anchor);
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
    			destroy_component(imageloader, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$2.name,
    		type: "slot",
    		source: "(9:4) <WindowElement         width={465}         height={616}         parallax=\\\"very-fast\\\"         background={'#6EA179 url(\\\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA5NjAgMTIwMCI+PHBhdGggZmlsbD0iIzgwNzI1ZiIgZD0iTTAgMGg5NTZ2MTIwMEgweiIvPjxnIGZpbGwtb3BhY2l0eT0iLjUiPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0tMzkuNSAxMjcyLjdsNDQ2LTEzMzEgNTMuOSA2NjMuOS0yMjcuNiA2Njd6Ii8+PHBhdGggZD0iTS03Mi43IDkyMlYtLjVsMzY4LjggMy4yTDE2Mi40IDgwN3oiLz48cGF0aCBmaWxsPSIjMWExZjEzIiBkPSJNOTU5IDU0MS41TDQyOC40IDcyOCAzMjMgMTA5Mi4xbDYzMC43IDE4MC42eiIvPjxwYXRoIGZpbGw9IiNmZWRjYmUiIGQ9Ik0xMzQuNiA4MjlsMTY1LjEtNDA3LjIgNjA0LjctNDM2LTIxLjEgNDgxLjh6Ii8+PHBhdGggZD0iTS03Mi43IDk5Mi43bDIzOC4yLTI5M0wyNjAuOC02MSAxLjgtNzIuN3oiLz48cGF0aCBmaWxsPSJpdm9yeSIgZD0iTTM2NSA4NDkuOUw0NDEgMzYybC01MTMuNyA3NDYuOCA3NSAxMjQuNXoiLz48cGF0aCBmaWxsPSIjNjgzYjFjIiBkPSJNODk0LTcyLjdMMzg2IDcwLjdsMjMxLjQgMTIwMi0xNS4yLTExMjJ6Ii8+PHBhdGggZmlsbD0iI2ZmY2ZiMyIgZD0iTTQ0OCA5MS4zbC03OC40IDM1MEwyNzYuNi0xbDI5MC4yLTcxLjZ6Ii8+PHBhdGggZmlsbD0iI2NmZThlOSIgZD0iTTQ1My44IDEwODkuOGwtMjcxIDg5LjQtMzAuNiA5My41TDU1MyAxMDg5Ljl6Ii8+PHBhdGggZmlsbD0iI2QzYjhhMCIgZD0iTTU0Ny42IDIwOC4yTDc0OC41IDcwOWwxOTItNTAxLjZMNjM0LjEgODkuMXoiLz48cGF0aCBmaWxsPSIjMTMyNzI5IiBkPSJNNzI4LjQgNzg3LjJsMjA2LjMgMzgzLjItNzMwLjYgMTAyLjMgMzQ3LjctMTQxLjR6Ii8+PHBhdGggZmlsbD0iIzE1MGIwMiIgZD0iTTU0Mi43LTcyLjdsMzI0LjcgMjIuMUw0MDQgMjYwLjNsMTU0LjItMTAuOXoiLz48cGF0aCBmaWxsPSIjNTM4MzkwIiBkPSJNMTAyOSAxMDk5LjhsLTI5Ny41LTI4MiAxMDcuNS05MCAxNzEuNyA0NC4yeiIvPjxwYXRoIGZpbGw9IiNhOTgzNGEiIGQ9Ik0zMDUuNCA5NzQuN2wtMjY2IDI0Ni45IDI3OS04NC41IDIwMi40LTcwNC40eiIvPjxwYXRoIGZpbGw9IiM5OTZjMzMiIGQ9Ik0xMDUgODA1bDIwMC4zLTU3NS40TDE0NCA4OTQuOS03Mi43IDk5Ny44eiIvPjxwYXRoIGZpbGw9IiNmZmZhZjAiIGQ9Ik0yMzAuNiAxMDIzbDI1Ny45LTY0Ni0xNDUuOC0xMS4yLTEzMCAyODkuM3oiLz48cGF0aCBmaWxsPSIjYzlhODg3IiBkPSJNNTE1LjkgMzkwLjFMMzg1LjMgMjEzLjZsNDAuMyAzMzEuN0w4NDIgNjIzLjV6Ii8+PHBhdGggZmlsbD0iIzAwMGEwNyIgZD0iTTMxOC4xIDI0Ny44bC0zOTAuOCA0MjYgMjExLTc0Ni41IDE1Ni4xIDQ5My44eiIvPjxwYXRoIGZpbGw9IiM2ZjUwMmEiIGQ9Ik0xMDI5IDcxMS43TDM4NyA4MTMuNmw1MzUuNi0zMjIuMUw5NDQtMzcuM3oiLz48cGF0aCBmaWxsPSIjZmZlMGJmIiBkPSJNLTcyLjcgOTg2bDM4LjggMjg2LjcgMzUwLjgtMzM1IDgwLTE3My42eiIvPjxwYXRoIGZpbGw9IiNkZjNhMDAiIGQ9Ik01MTkuMSA1Ni4ybC05Mi4zIDU0LjYtNjUuNCA4Mi41IDYwLjUtMTU0Ljd6Ii8+PHBhdGggZmlsbD0iIzQyMGQwMCIgZD0iTTQyMy45IDIzMC41TDU0NiAyOTEuN2wtNDMuMS0xMDcgODAuNy0yNTcuNHoiLz48cGF0aCBmaWxsPSIjNTY0MTI1IiBkPSJNNDg1LjEgNTY0LjVMNTQ0IDYwMGwyMTcgMTk5LjQtMzAzLjcgMzg3eiIvPjxwYXRoIGZpbGw9IiNkY2JhYTIiIGQ9Ik02MDguNyAzMTkuNEwzNjUgMzEzLjNsNDYwLjMtODIuOEw1NDkgMTY3Ljd6Ii8+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTUyMi4yLTcyLjdsLTU3LjQgMzEuNEwzNTQuNyA2Ny4zbC0xNC4zIDg0Ljl6Ii8+PHBhdGggZmlsbD0iIzE2MTkxMCIgZD0iTTcwNC40IDE0MS45bDY4LjQtMTE3LTMzNy05Ny42TDc2NiAxMjQuNXoiLz48cGF0aCBmaWxsPSIjOWE5MTdkIiBkPSJNMjQ3IDEwMC4ybDEwOCAxNzkuNEwyNTUuNyA1MjkgMzQ0LTUwLjV6Ii8+PHBhdGggZmlsbD0iIzlhNzM1MCIgZD0iTTU0Ni41IDE4OC43TDEwMTItNzIuNyA3NDguNCAxNTkuNSA1MDcuMiA0Ni44eiIvPjxwYXRoIGZpbGw9IiNhNTg3NjciIGQ9Ik05NjQuNSAyNTcuOEw4OTAuOC00MC4xbC0yNyAzMTRMNzgyIDcyNy4yeiIvPjxwYXRoIGZpbGw9IiNkZGVhZTgiIGQ9Ik0yNjYuNiAxMTM1LjdsLTE2LjUgMzUuOEw3NC42IDEyNDVsNDAzLjctMTM0eiIvPjxwYXRoIGZpbGw9IiMxYzE2MDAiIGQ9Ik0tNzIuNyA1NzAuNGwxMDYgMjk0LjIgOTYuMy01NiAzNS42LTEwNS40eiIvPjxwYXRoIGZpbGw9IiNhMTg5NWEiIGQ9Ik00NjUuMSA3ODcuNGwtNTUuOC05MyA3NC0yOTMuNCA1My45LTE0Ljd6Ii8+PC9nPjwvc3ZnPg==\\\")'}         title=\\\"PROJECT_01\\\"         id={1}         isInForeground={false}         intersections={[0]}         distanceFromIntersection={{             base: 13,             large: 12,         }}     >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$7(ctx) {
    	let div;
    	let windowelement;
    	let current;

    	windowelement = new WindowElement({
    			props: {
    				width: 465,
    				height: 616,
    				parallax: "very-fast",
    				background: "#6EA179 url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA5NjAgMTIwMCI+PHBhdGggZmlsbD0iIzgwNzI1ZiIgZD0iTTAgMGg5NTZ2MTIwMEgweiIvPjxnIGZpbGwtb3BhY2l0eT0iLjUiPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0tMzkuNSAxMjcyLjdsNDQ2LTEzMzEgNTMuOSA2NjMuOS0yMjcuNiA2Njd6Ii8+PHBhdGggZD0iTS03Mi43IDkyMlYtLjVsMzY4LjggMy4yTDE2Mi40IDgwN3oiLz48cGF0aCBmaWxsPSIjMWExZjEzIiBkPSJNOTU5IDU0MS41TDQyOC40IDcyOCAzMjMgMTA5Mi4xbDYzMC43IDE4MC42eiIvPjxwYXRoIGZpbGw9IiNmZWRjYmUiIGQ9Ik0xMzQuNiA4MjlsMTY1LjEtNDA3LjIgNjA0LjctNDM2LTIxLjEgNDgxLjh6Ii8+PHBhdGggZD0iTS03Mi43IDk5Mi43bDIzOC4yLTI5M0wyNjAuOC02MSAxLjgtNzIuN3oiLz48cGF0aCBmaWxsPSJpdm9yeSIgZD0iTTM2NSA4NDkuOUw0NDEgMzYybC01MTMuNyA3NDYuOCA3NSAxMjQuNXoiLz48cGF0aCBmaWxsPSIjNjgzYjFjIiBkPSJNODk0LTcyLjdMMzg2IDcwLjdsMjMxLjQgMTIwMi0xNS4yLTExMjJ6Ii8+PHBhdGggZmlsbD0iI2ZmY2ZiMyIgZD0iTTQ0OCA5MS4zbC03OC40IDM1MEwyNzYuNi0xbDI5MC4yLTcxLjZ6Ii8+PHBhdGggZmlsbD0iI2NmZThlOSIgZD0iTTQ1My44IDEwODkuOGwtMjcxIDg5LjQtMzAuNiA5My41TDU1MyAxMDg5Ljl6Ii8+PHBhdGggZmlsbD0iI2QzYjhhMCIgZD0iTTU0Ny42IDIwOC4yTDc0OC41IDcwOWwxOTItNTAxLjZMNjM0LjEgODkuMXoiLz48cGF0aCBmaWxsPSIjMTMyNzI5IiBkPSJNNzI4LjQgNzg3LjJsMjA2LjMgMzgzLjItNzMwLjYgMTAyLjMgMzQ3LjctMTQxLjR6Ii8+PHBhdGggZmlsbD0iIzE1MGIwMiIgZD0iTTU0Mi43LTcyLjdsMzI0LjcgMjIuMUw0MDQgMjYwLjNsMTU0LjItMTAuOXoiLz48cGF0aCBmaWxsPSIjNTM4MzkwIiBkPSJNMTAyOSAxMDk5LjhsLTI5Ny41LTI4MiAxMDcuNS05MCAxNzEuNyA0NC4yeiIvPjxwYXRoIGZpbGw9IiNhOTgzNGEiIGQ9Ik0zMDUuNCA5NzQuN2wtMjY2IDI0Ni45IDI3OS04NC41IDIwMi40LTcwNC40eiIvPjxwYXRoIGZpbGw9IiM5OTZjMzMiIGQ9Ik0xMDUgODA1bDIwMC4zLTU3NS40TDE0NCA4OTQuOS03Mi43IDk5Ny44eiIvPjxwYXRoIGZpbGw9IiNmZmZhZjAiIGQ9Ik0yMzAuNiAxMDIzbDI1Ny45LTY0Ni0xNDUuOC0xMS4yLTEzMCAyODkuM3oiLz48cGF0aCBmaWxsPSIjYzlhODg3IiBkPSJNNTE1LjkgMzkwLjFMMzg1LjMgMjEzLjZsNDAuMyAzMzEuN0w4NDIgNjIzLjV6Ii8+PHBhdGggZmlsbD0iIzAwMGEwNyIgZD0iTTMxOC4xIDI0Ny44bC0zOTAuOCA0MjYgMjExLTc0Ni41IDE1Ni4xIDQ5My44eiIvPjxwYXRoIGZpbGw9IiM2ZjUwMmEiIGQ9Ik0xMDI5IDcxMS43TDM4NyA4MTMuNmw1MzUuNi0zMjIuMUw5NDQtMzcuM3oiLz48cGF0aCBmaWxsPSIjZmZlMGJmIiBkPSJNLTcyLjcgOTg2bDM4LjggMjg2LjcgMzUwLjgtMzM1IDgwLTE3My42eiIvPjxwYXRoIGZpbGw9IiNkZjNhMDAiIGQ9Ik01MTkuMSA1Ni4ybC05Mi4zIDU0LjYtNjUuNCA4Mi41IDYwLjUtMTU0Ljd6Ii8+PHBhdGggZmlsbD0iIzQyMGQwMCIgZD0iTTQyMy45IDIzMC41TDU0NiAyOTEuN2wtNDMuMS0xMDcgODAuNy0yNTcuNHoiLz48cGF0aCBmaWxsPSIjNTY0MTI1IiBkPSJNNDg1LjEgNTY0LjVMNTQ0IDYwMGwyMTcgMTk5LjQtMzAzLjcgMzg3eiIvPjxwYXRoIGZpbGw9IiNkY2JhYTIiIGQ9Ik02MDguNyAzMTkuNEwzNjUgMzEzLjNsNDYwLjMtODIuOEw1NDkgMTY3Ljd6Ii8+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTUyMi4yLTcyLjdsLTU3LjQgMzEuNEwzNTQuNyA2Ny4zbC0xNC4zIDg0Ljl6Ii8+PHBhdGggZmlsbD0iIzE2MTkxMCIgZD0iTTcwNC40IDE0MS45bDY4LjQtMTE3LTMzNy05Ny42TDc2NiAxMjQuNXoiLz48cGF0aCBmaWxsPSIjOWE5MTdkIiBkPSJNMjQ3IDEwMC4ybDEwOCAxNzkuNEwyNTUuNyA1MjkgMzQ0LTUwLjV6Ii8+PHBhdGggZmlsbD0iIzlhNzM1MCIgZD0iTTU0Ni41IDE4OC43TDEwMTItNzIuNyA3NDguNCAxNTkuNSA1MDcuMiA0Ni44eiIvPjxwYXRoIGZpbGw9IiNhNTg3NjciIGQ9Ik05NjQuNSAyNTcuOEw4OTAuOC00MC4xbC0yNyAzMTRMNzgyIDcyNy4yeiIvPjxwYXRoIGZpbGw9IiNkZGVhZTgiIGQ9Ik0yNjYuNiAxMTM1LjdsLTE2LjUgMzUuOEw3NC42IDEyNDVsNDAzLjctMTM0eiIvPjxwYXRoIGZpbGw9IiMxYzE2MDAiIGQ9Ik0tNzIuNyA1NzAuNGwxMDYgMjk0LjIgOTYuMy01NiAzNS42LTEwNS40eiIvPjxwYXRoIGZpbGw9IiNhMTg5NWEiIGQ9Ik00NjUuMSA3ODcuNGwtNTUuOC05MyA3NC0yOTMuNCA1My45LTE0Ljd6Ii8+PC9nPjwvc3ZnPg==\")",
    				title: "PROJECT_01",
    				id: 1,
    				isInForeground: false,
    				intersections: [0],
    				distanceFromIntersection: { base: 13, large: 12 },
    				$$slots: { default: [create_default_slot$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(windowelement.$$.fragment);
    			attr_dev(div, "class", "grid-area svelte-10yjo1h");
    			add_location(div, file$6, 7, 0, 199);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(windowelement, div, null);
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
    			if (detaching) detach_dev(div);
    			destroy_component(windowelement);
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

    const slug = "MortimerBaltus/Projects/ConCorazon_mksjj0";

    function instance$7($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ProjectCorazon",
    			options,
    			id: create_fragment$7.name
    		});
    	}
    }

    /* src/Windows/ProjectRaceworx.svelte generated by Svelte v3.32.1 */
    const file$7 = "src/Windows/ProjectRaceworx.svelte";

    // (9:4) <WindowElement         width={499}         height={392}         parallax="very-fast"         background={'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjgwIDg5NiI+PHBhdGggZmlsbD0iIzdiNzY3NSIgZD0iTTAgMGgxMjgwdjg5NUgweiIvPjxnIGZpbGwtb3BhY2l0eT0iLjUiPjxwYXRoIGZpbGw9IiMwYjAwMDAiIGQ9Ik05NjYgODA5LjZsLS40LTYzMy44TDYyMCAxNTYuNGwtMjkuNSA1OTcuMnoiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMjAzLjItNzcuNUwxMzU3LjUgOC42bC0yOTQuNyA4MTMuNSAxNy42LTY0MC4zeiIvPjxwYXRoIGZpbGw9IiMwMDAzMGMiIGQ9Ik0xMzAuNCA4NC43bC0xNi42IDQ2NCAyMjcuNCA2IDExNi42LTM2My4xeiIvPjxwYXRoIGZpbGw9IiNmY2ZmZjciIGQ9Ik0tNDIuOSA1NjQuMWwyNTEuMyA0OS4xIDM5Mi45IDI0LjIgOC4xLTEwNC40eiIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik04NjQuOSAzNS40bDQ5Mi42IDI4Ni41Vi0xNS45TDk4OC03Ny41eiIvPjxwYXRoIGZpbGw9IiNkMWM5YmIiIGQ9Ik0xOS42IDQ5NC42bC05Ny4xIDM4MkwxMjI5LjMgODQyIDE1MyA3MjkuNXoiLz48cGF0aCBmaWxsPSIjYmFiOWIyIiBkPSJNMTM1Ny41IDc3Ny45bC0zMzEuMi02MS41TDk5Mi44IDU0NCAxMjc1IDM2N3oiLz48cGF0aCBmaWxsPSIjZDZlMmUzIiBkPSJNNTk5LjYgMzYxbDUuNCAxMzEuM0w0MjQuMiA1MTFsMTMuMy0xNDAuM3oiLz48cGF0aCBkPSJNNjIuMiA2MTQuNmw0ODEuOCAxOSA0MDkuOSA1NS03NDQuMi0zNi45eiIvPjxwYXRoIGZpbGw9IiM2MDYxNjUiIGQ9Ik03MjkuNS0yNC41bDMwNC45IDI4Mi4zIDQxLjIgNzkuNSAyODEuOSA2eiIvPjxwYXRoIGZpbGw9IiM0MTE4MTkiIGQ9Ik01NDIuNyA5Ny41bDQzMS45IDYxNy4yTDEzNTcuNSA4MTZsLTY2OS44LTI5LjR6Ii8+PHBhdGggZD0iTTEzMy43IDIxNy42bDUxLjQgOTQuOEwxNTEuMyA3MzVsLTI0LjctNi4yeiIvPjxwYXRoIGZpbGw9IiNiN2I1YjgiIGQ9Ik00ODIuNyA2OC4zbDE0My43LTUyLjUgNDAyIDEyOS44TDY1NCAxNzh6Ii8+PHBhdGggZmlsbD0iIzQxNDc0ZSIgZD0iTTEyMzMuOCA1NDYuMmwxMC42LTQ5LjEtMzkyLTQ4LjQgMjU3LjUgMTA3LjJ6Ii8+PHBhdGggZmlsbD0iIzUzNTI1OCIgZD0iTTE3My4zIDM3LjdsLTI1MC44IDI2MiAxOTEuMiAzTDkwMyAyMjIuMnoiLz48cGF0aCBmaWxsPSIjZDlkZWQwIiBkPSJNNTg2LjEgNzExLjZsLTMzNS05LjJMMTUxIDY1MC4ybDQ3MCAzMHoiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMTE5MS4xIDQ4NGwtMTI1LTkuOCAxNi44LTEyMy4zIDEzMCA0eiIvPjxwYXRoIGZpbGw9IiNmOGY5ZWIiIGQ9Ik0xMzU3LjUgOTcyLjVWODQ0LjdMMzUxLjIgNzY5LjNsOTQ2LjQgMTA0eiIvPjxwYXRoIGZpbGw9IiM4MDE3MTciIGQ9Ik04OTIuNiA2MDEuNmwtMi40LTI1NC40LTE1Ny0xMi43LTU3LjYgMzUxeiIvPjxwYXRoIGZpbGw9IiMyODIzMmEiIGQ9Ik03NSA1MDNMNDAuNyAyNTguNCAzNi44IDU0NyA3NTUgMzg1LjR6Ii8+PHBhdGggZmlsbD0iIzA1MDQwYiIgZD0iTTUzNS45IDIyOC45TDc4NS4xIDE4OGwtMTE1LTEwLjQtNDgwLjcgNDAuMnoiLz48cGF0aCBmaWxsPSIjZGFkNWNmIiBkPSJNMTI5LjMgNTU4LjZsLTIwNi44LTMzLjVMLTQ4IDc4OS44bDE3MC0xMjF6Ii8+PHBhdGggZmlsbD0iI2U3ZjNlYyIgZD0iTTk2NSA0MTguN2wyNS42LTI3Ny4zLS4yIDI4Ni4yLTEzLjUgOTAuN3oiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMTM1Ny41LTQxLjRMODk1LjMtNzcuNWwtOS41IDEzOC42TDEzMjguNiAyNTF6Ii8+PHBhdGggZmlsbD0iIzg5OGQ4ZCIgZD0iTTM5OS4yIDUzNy41bDYuNi0yNzAgMzg0LjYtNTItNDU5IDI1LjN6Ii8+PHBhdGggZmlsbD0iIzAxMDAwOCIgZD0iTTIzOS42IDI0OS42TDI1NSA2MC43bC02Ni4zLTQuMyA2LjUgMTc5LjJ6Ii8+PHBhdGggZmlsbD0iIzE0MTQxOCIgZD0iTTgxMC40IDc1Ny44bDM1MC4zIDEzLjgtMTg1IDMwLjktNDkuMS01NzguOHoiLz48cGF0aCBmaWxsPSIjMTgyMTI3IiBkPSJNMjEzIDI2MC45bDIxNy4yIDI3MC44LTIyMi42IDI3LjZMMjI2LjQgNzczeiIvPjxwYXRoIGZpbGw9IiM4Zjg2N2QiIGQ9Ik0xNS40IDk3Mi41bDEzNDIuMS05NC42LTczMi42LTcyLjdMLTIwIDc0Mi42eiIvPjxwYXRoIGZpbGw9IiMxYzI0MmEiIGQ9Ik01MzUuOSA1NDEuMmw5OS42IDE0LjYtMzYtNjQuOC02OS41LTUuNnoiLz48cGF0aCBmaWxsPSIjYjNiMmFjIiBkPSJNOTk1LjUgMTkwbDEwMi4xIDM0MiAyNTkuOSAxNDkuMi0zMzkuNCAxMnoiLz48cGF0aCBmaWxsPSIjYmFiZGMzIiBkPSJNMjUgMTA5TDkuMyAxNzkuNSAyMTEtNzcuNWw3OCA4NC40eiIvPjwvZz48L3N2Zz4=")'}         title="PROJECT_02"         id={2}         isInForeground={true}     >
    function create_default_slot$3(ctx) {
    	let imageloader;
    	let current;

    	imageloader = new ImageLoader({
    			props: {
    				sizes: "497px",
    				srcset: "https://res.cloudinary.com/thdrstnr/image/upload/w_1280,f_auto/" + slug$1 + " 1280w,\n            https://res.cloudinary.com/thdrstnr/image/upload/w_497,f_auto,q_auto:best/" + slug$1 + " 497w,\n            https://res.cloudinary.com/thdrstnr/image/upload/w_312,f_auto,q_auto:best/" + slug$1 + " 312w,",
    				alt: "Raceworx",
    				src: "https://res.cloudinary.com/thdrstnr/image/upload/w_1280,f_auto/" + slug$1
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(imageloader.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(imageloader, target, anchor);
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
    			destroy_component(imageloader, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$3.name,
    		type: "slot",
    		source: "(9:4) <WindowElement         width={499}         height={392}         parallax=\\\"very-fast\\\"         background={'url(\\\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjgwIDg5NiI+PHBhdGggZmlsbD0iIzdiNzY3NSIgZD0iTTAgMGgxMjgwdjg5NUgweiIvPjxnIGZpbGwtb3BhY2l0eT0iLjUiPjxwYXRoIGZpbGw9IiMwYjAwMDAiIGQ9Ik05NjYgODA5LjZsLS40LTYzMy44TDYyMCAxNTYuNGwtMjkuNSA1OTcuMnoiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMjAzLjItNzcuNUwxMzU3LjUgOC42bC0yOTQuNyA4MTMuNSAxNy42LTY0MC4zeiIvPjxwYXRoIGZpbGw9IiMwMDAzMGMiIGQ9Ik0xMzAuNCA4NC43bC0xNi42IDQ2NCAyMjcuNCA2IDExNi42LTM2My4xeiIvPjxwYXRoIGZpbGw9IiNmY2ZmZjciIGQ9Ik0tNDIuOSA1NjQuMWwyNTEuMyA0OS4xIDM5Mi45IDI0LjIgOC4xLTEwNC40eiIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik04NjQuOSAzNS40bDQ5Mi42IDI4Ni41Vi0xNS45TDk4OC03Ny41eiIvPjxwYXRoIGZpbGw9IiNkMWM5YmIiIGQ9Ik0xOS42IDQ5NC42bC05Ny4xIDM4MkwxMjI5LjMgODQyIDE1MyA3MjkuNXoiLz48cGF0aCBmaWxsPSIjYmFiOWIyIiBkPSJNMTM1Ny41IDc3Ny45bC0zMzEuMi02MS41TDk5Mi44IDU0NCAxMjc1IDM2N3oiLz48cGF0aCBmaWxsPSIjZDZlMmUzIiBkPSJNNTk5LjYgMzYxbDUuNCAxMzEuM0w0MjQuMiA1MTFsMTMuMy0xNDAuM3oiLz48cGF0aCBkPSJNNjIuMiA2MTQuNmw0ODEuOCAxOSA0MDkuOSA1NS03NDQuMi0zNi45eiIvPjxwYXRoIGZpbGw9IiM2MDYxNjUiIGQ9Ik03MjkuNS0yNC41bDMwNC45IDI4Mi4zIDQxLjIgNzkuNSAyODEuOSA2eiIvPjxwYXRoIGZpbGw9IiM0MTE4MTkiIGQ9Ik01NDIuNyA5Ny41bDQzMS45IDYxNy4yTDEzNTcuNSA4MTZsLTY2OS44LTI5LjR6Ii8+PHBhdGggZD0iTTEzMy43IDIxNy42bDUxLjQgOTQuOEwxNTEuMyA3MzVsLTI0LjctNi4yeiIvPjxwYXRoIGZpbGw9IiNiN2I1YjgiIGQ9Ik00ODIuNyA2OC4zbDE0My43LTUyLjUgNDAyIDEyOS44TDY1NCAxNzh6Ii8+PHBhdGggZmlsbD0iIzQxNDc0ZSIgZD0iTTEyMzMuOCA1NDYuMmwxMC42LTQ5LjEtMzkyLTQ4LjQgMjU3LjUgMTA3LjJ6Ii8+PHBhdGggZmlsbD0iIzUzNTI1OCIgZD0iTTE3My4zIDM3LjdsLTI1MC44IDI2MiAxOTEuMiAzTDkwMyAyMjIuMnoiLz48cGF0aCBmaWxsPSIjZDlkZWQwIiBkPSJNNTg2LjEgNzExLjZsLTMzNS05LjJMMTUxIDY1MC4ybDQ3MCAzMHoiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMTE5MS4xIDQ4NGwtMTI1LTkuOCAxNi44LTEyMy4zIDEzMCA0eiIvPjxwYXRoIGZpbGw9IiNmOGY5ZWIiIGQ9Ik0xMzU3LjUgOTcyLjVWODQ0LjdMMzUxLjIgNzY5LjNsOTQ2LjQgMTA0eiIvPjxwYXRoIGZpbGw9IiM4MDE3MTciIGQ9Ik04OTIuNiA2MDEuNmwtMi40LTI1NC40LTE1Ny0xMi43LTU3LjYgMzUxeiIvPjxwYXRoIGZpbGw9IiMyODIzMmEiIGQ9Ik03NSA1MDNMNDAuNyAyNTguNCAzNi44IDU0NyA3NTUgMzg1LjR6Ii8+PHBhdGggZmlsbD0iIzA1MDQwYiIgZD0iTTUzNS45IDIyOC45TDc4NS4xIDE4OGwtMTE1LTEwLjQtNDgwLjcgNDAuMnoiLz48cGF0aCBmaWxsPSIjZGFkNWNmIiBkPSJNMTI5LjMgNTU4LjZsLTIwNi44LTMzLjVMLTQ4IDc4OS44bDE3MC0xMjF6Ii8+PHBhdGggZmlsbD0iI2U3ZjNlYyIgZD0iTTk2NSA0MTguN2wyNS42LTI3Ny4zLS4yIDI4Ni4yLTEzLjUgOTAuN3oiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMTM1Ny41LTQxLjRMODk1LjMtNzcuNWwtOS41IDEzOC42TDEzMjguNiAyNTF6Ii8+PHBhdGggZmlsbD0iIzg5OGQ4ZCIgZD0iTTM5OS4yIDUzNy41bDYuNi0yNzAgMzg0LjYtNTItNDU5IDI1LjN6Ii8+PHBhdGggZmlsbD0iIzAxMDAwOCIgZD0iTTIzOS42IDI0OS42TDI1NSA2MC43bC02Ni4zLTQuMyA2LjUgMTc5LjJ6Ii8+PHBhdGggZmlsbD0iIzE0MTQxOCIgZD0iTTgxMC40IDc1Ny44bDM1MC4zIDEzLjgtMTg1IDMwLjktNDkuMS01NzguOHoiLz48cGF0aCBmaWxsPSIjMTgyMTI3IiBkPSJNMjEzIDI2MC45bDIxNy4yIDI3MC44LTIyMi42IDI3LjZMMjI2LjQgNzczeiIvPjxwYXRoIGZpbGw9IiM4Zjg2N2QiIGQ9Ik0xNS40IDk3Mi41bDEzNDIuMS05NC42LTczMi42LTcyLjdMLTIwIDc0Mi42eiIvPjxwYXRoIGZpbGw9IiMxYzI0MmEiIGQ9Ik01MzUuOSA1NDEuMmw5OS42IDE0LjYtMzYtNjQuOC02OS41LTUuNnoiLz48cGF0aCBmaWxsPSIjYjNiMmFjIiBkPSJNOTk1LjUgMTkwbDEwMi4xIDM0MiAyNTkuOSAxNDkuMi0zMzkuNCAxMnoiLz48cGF0aCBmaWxsPSIjYmFiZGMzIiBkPSJNMjUgMTA5TDkuMyAxNzkuNSAyMTEtNzcuNWw3OCA4NC40eiIvPjwvZz48L3N2Zz4=\\\")'}         title=\\\"PROJECT_02\\\"         id={2}         isInForeground={true}     >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$8(ctx) {
    	let div;
    	let windowelement;
    	let current;

    	windowelement = new WindowElement({
    			props: {
    				width: 499,
    				height: 392,
    				parallax: "very-fast",
    				background: "url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjgwIDg5NiI+PHBhdGggZmlsbD0iIzdiNzY3NSIgZD0iTTAgMGgxMjgwdjg5NUgweiIvPjxnIGZpbGwtb3BhY2l0eT0iLjUiPjxwYXRoIGZpbGw9IiMwYjAwMDAiIGQ9Ik05NjYgODA5LjZsLS40LTYzMy44TDYyMCAxNTYuNGwtMjkuNSA1OTcuMnoiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMjAzLjItNzcuNUwxMzU3LjUgOC42bC0yOTQuNyA4MTMuNSAxNy42LTY0MC4zeiIvPjxwYXRoIGZpbGw9IiMwMDAzMGMiIGQ9Ik0xMzAuNCA4NC43bC0xNi42IDQ2NCAyMjcuNCA2IDExNi42LTM2My4xeiIvPjxwYXRoIGZpbGw9IiNmY2ZmZjciIGQ9Ik0tNDIuOSA1NjQuMWwyNTEuMyA0OS4xIDM5Mi45IDI0LjIgOC4xLTEwNC40eiIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik04NjQuOSAzNS40bDQ5Mi42IDI4Ni41Vi0xNS45TDk4OC03Ny41eiIvPjxwYXRoIGZpbGw9IiNkMWM5YmIiIGQ9Ik0xOS42IDQ5NC42bC05Ny4xIDM4MkwxMjI5LjMgODQyIDE1MyA3MjkuNXoiLz48cGF0aCBmaWxsPSIjYmFiOWIyIiBkPSJNMTM1Ny41IDc3Ny45bC0zMzEuMi02MS41TDk5Mi44IDU0NCAxMjc1IDM2N3oiLz48cGF0aCBmaWxsPSIjZDZlMmUzIiBkPSJNNTk5LjYgMzYxbDUuNCAxMzEuM0w0MjQuMiA1MTFsMTMuMy0xNDAuM3oiLz48cGF0aCBkPSJNNjIuMiA2MTQuNmw0ODEuOCAxOSA0MDkuOSA1NS03NDQuMi0zNi45eiIvPjxwYXRoIGZpbGw9IiM2MDYxNjUiIGQ9Ik03MjkuNS0yNC41bDMwNC45IDI4Mi4zIDQxLjIgNzkuNSAyODEuOSA2eiIvPjxwYXRoIGZpbGw9IiM0MTE4MTkiIGQ9Ik01NDIuNyA5Ny41bDQzMS45IDYxNy4yTDEzNTcuNSA4MTZsLTY2OS44LTI5LjR6Ii8+PHBhdGggZD0iTTEzMy43IDIxNy42bDUxLjQgOTQuOEwxNTEuMyA3MzVsLTI0LjctNi4yeiIvPjxwYXRoIGZpbGw9IiNiN2I1YjgiIGQ9Ik00ODIuNyA2OC4zbDE0My43LTUyLjUgNDAyIDEyOS44TDY1NCAxNzh6Ii8+PHBhdGggZmlsbD0iIzQxNDc0ZSIgZD0iTTEyMzMuOCA1NDYuMmwxMC42LTQ5LjEtMzkyLTQ4LjQgMjU3LjUgMTA3LjJ6Ii8+PHBhdGggZmlsbD0iIzUzNTI1OCIgZD0iTTE3My4zIDM3LjdsLTI1MC44IDI2MiAxOTEuMiAzTDkwMyAyMjIuMnoiLz48cGF0aCBmaWxsPSIjZDlkZWQwIiBkPSJNNTg2LjEgNzExLjZsLTMzNS05LjJMMTUxIDY1MC4ybDQ3MCAzMHoiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMTE5MS4xIDQ4NGwtMTI1LTkuOCAxNi44LTEyMy4zIDEzMCA0eiIvPjxwYXRoIGZpbGw9IiNmOGY5ZWIiIGQ9Ik0xMzU3LjUgOTcyLjVWODQ0LjdMMzUxLjIgNzY5LjNsOTQ2LjQgMTA0eiIvPjxwYXRoIGZpbGw9IiM4MDE3MTciIGQ9Ik04OTIuNiA2MDEuNmwtMi40LTI1NC40LTE1Ny0xMi43LTU3LjYgMzUxeiIvPjxwYXRoIGZpbGw9IiMyODIzMmEiIGQ9Ik03NSA1MDNMNDAuNyAyNTguNCAzNi44IDU0NyA3NTUgMzg1LjR6Ii8+PHBhdGggZmlsbD0iIzA1MDQwYiIgZD0iTTUzNS45IDIyOC45TDc4NS4xIDE4OGwtMTE1LTEwLjQtNDgwLjcgNDAuMnoiLz48cGF0aCBmaWxsPSIjZGFkNWNmIiBkPSJNMTI5LjMgNTU4LjZsLTIwNi44LTMzLjVMLTQ4IDc4OS44bDE3MC0xMjF6Ii8+PHBhdGggZmlsbD0iI2U3ZjNlYyIgZD0iTTk2NSA0MTguN2wyNS42LTI3Ny4zLS4yIDI4Ni4yLTEzLjUgOTAuN3oiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMTM1Ny41LTQxLjRMODk1LjMtNzcuNWwtOS41IDEzOC42TDEzMjguNiAyNTF6Ii8+PHBhdGggZmlsbD0iIzg5OGQ4ZCIgZD0iTTM5OS4yIDUzNy41bDYuNi0yNzAgMzg0LjYtNTItNDU5IDI1LjN6Ii8+PHBhdGggZmlsbD0iIzAxMDAwOCIgZD0iTTIzOS42IDI0OS42TDI1NSA2MC43bC02Ni4zLTQuMyA2LjUgMTc5LjJ6Ii8+PHBhdGggZmlsbD0iIzE0MTQxOCIgZD0iTTgxMC40IDc1Ny44bDM1MC4zIDEzLjgtMTg1IDMwLjktNDkuMS01NzguOHoiLz48cGF0aCBmaWxsPSIjMTgyMTI3IiBkPSJNMjEzIDI2MC45bDIxNy4yIDI3MC44LTIyMi42IDI3LjZMMjI2LjQgNzczeiIvPjxwYXRoIGZpbGw9IiM4Zjg2N2QiIGQ9Ik0xNS40IDk3Mi41bDEzNDIuMS05NC42LTczMi42LTcyLjdMLTIwIDc0Mi42eiIvPjxwYXRoIGZpbGw9IiMxYzI0MmEiIGQ9Ik01MzUuOSA1NDEuMmw5OS42IDE0LjYtMzYtNjQuOC02OS41LTUuNnoiLz48cGF0aCBmaWxsPSIjYjNiMmFjIiBkPSJNOTk1LjUgMTkwbDEwMi4xIDM0MiAyNTkuOSAxNDkuMi0zMzkuNCAxMnoiLz48cGF0aCBmaWxsPSIjYmFiZGMzIiBkPSJNMjUgMTA5TDkuMyAxNzkuNSAyMTEtNzcuNWw3OCA4NC40eiIvPjwvZz48L3N2Zz4=\")",
    				title: "PROJECT_02",
    				id: 2,
    				isInForeground: true,
    				$$slots: { default: [create_default_slot$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(windowelement.$$.fragment);
    			attr_dev(div, "class", "grid-area svelte-12ry46m");
    			add_location(div, file$7, 7, 0, 197);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(windowelement, div, null);
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
    			if (detaching) detach_dev(div);
    			destroy_component(windowelement);
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

    const slug$1 = "MortimerBaltus/Projects/Raceworx_wfjyou";

    function instance$8($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ProjectRaceworx",
    			options,
    			id: create_fragment$8.name
    		});
    	}
    }

    /* src/Windows/ProjectMueller.svelte generated by Svelte v3.32.1 */
    const file$8 = "src/Windows/ProjectMueller.svelte";

    // (9:4) <WindowElement         width={465}         height={497}         parallax="very-fast"         background={'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA5NjAgOTYwIj48cGF0aCBmaWxsPSIjMTcxNjE2IiBkPSJNMCAwaDk2MHY5NjBIMHoiLz48ZyBmaWxsLW9wYWNpdHk9Ii41Ij48cGF0aCBmaWxsPSIjNTM1MTRmIiBkPSJNMy4yIDMzNy41bDQyNy43IDIxNi44IDQzMS4zLTc3LjQgNjcuMy04NnoiLz48cGF0aCBmaWxsPSIjNWY1YzVhIiBkPSJNOTg3LjUgODMuM0w2MDIgMTg5LjJsLTY4LjMtMTI4IDM4MS0xMDguNnoiLz48cGF0aCBmaWxsPSIjNjQ2MTVmIiBkPSJNMjIxLjgtNTguMWwyODEuNSAyMjIuNS00OC45IDEwMi40TDE1Mi4zIDYxLjJ6Ii8+PHBhdGggZD0iTS01OC4xIDQ1Mi4zbDU3OS42IDQxMC4xIDI4MS44IDcuNC0xOTYuNy0yODR6TTc3OCA0MDBMLTU4IDI4OSAxMS4yLTU4IDI1NCAxMzcuNHoiLz48cGF0aCBmaWxsPSIjNGM0YzQ5IiBkPSJNNTk3LjYgODUzLjZsLTkxLjggMTY0LjVMODQxIDkzNGwxMi4zLTQxLjV6Ii8+PHBhdGggZD0iTTUyMC45IDE2Mi42TDEwMTggMTM1IDU4NC42IDM0MiAzNzUgMzU0LjV6TTE0NC40IDczMS43bDk2LjYgNDIuOEw2IDEwMTguMWwtMzMuMi03MzkuNXoiLz48L2c+PC9zdmc+")'}         title="PROJECT_03"         id={3}         isInForeground={false}         intersections={[10]}         distanceFromIntersection={{             base: -13,             large: -8,         }}     >
    function create_default_slot$4(ctx) {
    	let imageloader;
    	let current;

    	imageloader = new ImageLoader({
    			props: {
    				sizes: "463px",
    				srcset: "https://res.cloudinary.com/thdrstnr/image/upload/w_960,f_auto/" + slug$2 + " 960w,\n            https://res.cloudinary.com/thdrstnr/image/upload/w_463,f_auto,q_auto:best/" + slug$2 + " 463w,\n            https://res.cloudinary.com/thdrstnr/image/upload/w_291,f_auto,q_auto:best/" + slug$2 + " 291w,",
    				src: "https://res.cloudinary.com/thdrstnr/image/upload/w_960,f_auto/" + slug$2,
    				alt: "Eberhard Müller develops sophisticated textile interiors at the highest level"
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(imageloader.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(imageloader, target, anchor);
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
    			destroy_component(imageloader, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$4.name,
    		type: "slot",
    		source: "(9:4) <WindowElement         width={465}         height={497}         parallax=\\\"very-fast\\\"         background={'url(\\\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA5NjAgOTYwIj48cGF0aCBmaWxsPSIjMTcxNjE2IiBkPSJNMCAwaDk2MHY5NjBIMHoiLz48ZyBmaWxsLW9wYWNpdHk9Ii41Ij48cGF0aCBmaWxsPSIjNTM1MTRmIiBkPSJNMy4yIDMzNy41bDQyNy43IDIxNi44IDQzMS4zLTc3LjQgNjcuMy04NnoiLz48cGF0aCBmaWxsPSIjNWY1YzVhIiBkPSJNOTg3LjUgODMuM0w2MDIgMTg5LjJsLTY4LjMtMTI4IDM4MS0xMDguNnoiLz48cGF0aCBmaWxsPSIjNjQ2MTVmIiBkPSJNMjIxLjgtNTguMWwyODEuNSAyMjIuNS00OC45IDEwMi40TDE1Mi4zIDYxLjJ6Ii8+PHBhdGggZD0iTS01OC4xIDQ1Mi4zbDU3OS42IDQxMC4xIDI4MS44IDcuNC0xOTYuNy0yODR6TTc3OCA0MDBMLTU4IDI4OSAxMS4yLTU4IDI1NCAxMzcuNHoiLz48cGF0aCBmaWxsPSIjNGM0YzQ5IiBkPSJNNTk3LjYgODUzLjZsLTkxLjggMTY0LjVMODQxIDkzNGwxMi4zLTQxLjV6Ii8+PHBhdGggZD0iTTUyMC45IDE2Mi42TDEwMTggMTM1IDU4NC42IDM0MiAzNzUgMzU0LjV6TTE0NC40IDczMS43bDk2LjYgNDIuOEw2IDEwMTguMWwtMzMuMi03MzkuNXoiLz48L2c+PC9zdmc+\\\")'}         title=\\\"PROJECT_03\\\"         id={3}         isInForeground={false}         intersections={[10]}         distanceFromIntersection={{             base: -13,             large: -8,         }}     >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$9(ctx) {
    	let div;
    	let windowelement;
    	let current;

    	windowelement = new WindowElement({
    			props: {
    				width: 465,
    				height: 497,
    				parallax: "very-fast",
    				background: "url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA5NjAgOTYwIj48cGF0aCBmaWxsPSIjMTcxNjE2IiBkPSJNMCAwaDk2MHY5NjBIMHoiLz48ZyBmaWxsLW9wYWNpdHk9Ii41Ij48cGF0aCBmaWxsPSIjNTM1MTRmIiBkPSJNMy4yIDMzNy41bDQyNy43IDIxNi44IDQzMS4zLTc3LjQgNjcuMy04NnoiLz48cGF0aCBmaWxsPSIjNWY1YzVhIiBkPSJNOTg3LjUgODMuM0w2MDIgMTg5LjJsLTY4LjMtMTI4IDM4MS0xMDguNnoiLz48cGF0aCBmaWxsPSIjNjQ2MTVmIiBkPSJNMjIxLjgtNTguMWwyODEuNSAyMjIuNS00OC45IDEwMi40TDE1Mi4zIDYxLjJ6Ii8+PHBhdGggZD0iTS01OC4xIDQ1Mi4zbDU3OS42IDQxMC4xIDI4MS44IDcuNC0xOTYuNy0yODR6TTc3OCA0MDBMLTU4IDI4OSAxMS4yLTU4IDI1NCAxMzcuNHoiLz48cGF0aCBmaWxsPSIjNGM0YzQ5IiBkPSJNNTk3LjYgODUzLjZsLTkxLjggMTY0LjVMODQxIDkzNGwxMi4zLTQxLjV6Ii8+PHBhdGggZD0iTTUyMC45IDE2Mi42TDEwMTggMTM1IDU4NC42IDM0MiAzNzUgMzU0LjV6TTE0NC40IDczMS43bDk2LjYgNDIuOEw2IDEwMTguMWwtMzMuMi03MzkuNXoiLz48L2c+PC9zdmc+\")",
    				title: "PROJECT_03",
    				id: 3,
    				isInForeground: false,
    				intersections: [10],
    				distanceFromIntersection: { base: -13, large: -8 },
    				$$slots: { default: [create_default_slot$4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(windowelement.$$.fragment);
    			attr_dev(div, "class", "grid-area svelte-1nzwgc7");
    			add_location(div, file$8, 7, 0, 204);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(windowelement, div, null);
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
    			if (detaching) detach_dev(div);
    			destroy_component(windowelement);
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

    const slug$2 = "MortimerBaltus/Projects/EberhardMueller_v2tpxi";

    function instance$9($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ProjectMueller",
    			options,
    			id: create_fragment$9.name
    		});
    	}
    }

    /* src/Windows/CookieWindow.svelte generated by Svelte v3.32.1 */
    const file$9 = "src/Windows/CookieWindow.svelte";

    // (6:4) <WindowElement         width={300}         height={164}         parallax="very-slow"         background="#5E4B1B"         title="COOKIES"         enlargeable={false}         id={9}         isInForeground={true}     >
    function create_default_slot$5(ctx) {
    	let p;
    	let t0;
    	let br0;
    	let br1;
    	let t1;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t0 = text("Your privacy is important to us, therefore we don’t use any tracking\n            services by third-parties. ");
    			br0 = element("br");
    			br1 = element("br");
    			t1 = text(" Please read our Privacy Policy\n            for more info on this subject!");
    			add_location(br0, file$9, 17, 39, 457);
    			add_location(br1, file$9, 17, 45, 463);
    			attr_dev(p, "class", "svelte-17ckszq");
    			add_location(p, file$9, 15, 8, 333);
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
    		source: "(6:4) <WindowElement         width={300}         height={164}         parallax=\\\"very-slow\\\"         background=\\\"#5E4B1B\\\"         title=\\\"COOKIES\\\"         enlargeable={false}         id={9}         isInForeground={true}     >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$a(ctx) {
    	let div;
    	let windowelement;
    	let current;

    	windowelement = new WindowElement({
    			props: {
    				width: 300,
    				height: 164,
    				parallax: "very-slow",
    				background: "#5E4B1B",
    				title: "COOKIES",
    				enlargeable: false,
    				id: 9,
    				isInForeground: true,
    				$$slots: { default: [create_default_slot$5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(windowelement.$$.fragment);
    			attr_dev(div, "class", "grid-area svelte-17ckszq");
    			add_location(div, file$9, 4, 0, 80);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(windowelement, div, null);
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
    			if (detaching) detach_dev(div);
    			destroy_component(windowelement);
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
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CookieWindow",
    			options,
    			id: create_fragment$a.name
    		});
    	}
    }

    /* src/Windows/LegalWindow.svelte generated by Svelte v3.32.1 */
    const file$a = "src/Windows/LegalWindow.svelte";

    // (6:4) <WindowElement         width={268}         height={158}         parallax="very-slow"         background="#1C6370"         title="LEGAL NOTICE"         id={7}         isInForeground={true}     >
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
    			t1 = text(" We've got you\n            covered!");
    			add_location(br0, file$a, 15, 57, 371);
    			add_location(br1, file$a, 15, 63, 377);
    			attr_dev(p, "class", "svelte-1q30fpw");
    			add_location(p, file$a, 14, 8, 310);
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
    		source: "(6:4) <WindowElement         width={268}         height={158}         parallax=\\\"very-slow\\\"         background=\\\"#1C6370\\\"         title=\\\"LEGAL NOTICE\\\"         id={7}         isInForeground={true}     >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$b(ctx) {
    	let div;
    	let windowelement;
    	let current;

    	windowelement = new WindowElement({
    			props: {
    				width: 268,
    				height: 158,
    				parallax: "very-slow",
    				background: "#1C6370",
    				title: "LEGAL NOTICE",
    				id: 7,
    				isInForeground: true,
    				$$slots: { default: [create_default_slot$6] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(windowelement.$$.fragment);
    			attr_dev(div, "class", "grid-area svelte-1q30fpw");
    			add_location(div, file$a, 4, 0, 80);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(windowelement, div, null);
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
    			if (detaching) detach_dev(div);
    			destroy_component(windowelement);
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
    		init(this, options, instance$b, create_fragment$b, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "LegalWindow",
    			options,
    			id: create_fragment$b.name
    		});
    	}
    }

    /* src/Windows/PrivacyWindow.svelte generated by Svelte v3.32.1 */
    const file$b = "src/Windows/PrivacyWindow.svelte";

    // (6:4) <WindowElement         width={288}         height={207}         parallax="very-slow"         background="#FEC7A3"         title="PRIVACY POLICY"         id={5}         isInForeground={true}     >
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
    			add_location(br0, file$b, 15, 74, 390);
    			add_location(br1, file$b, 16, 12, 409);
    			attr_dev(p, "class", "svelte-da8dt3");
    			add_location(p, file$b, 14, 8, 312);
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
    		source: "(6:4) <WindowElement         width={288}         height={207}         parallax=\\\"very-slow\\\"         background=\\\"#FEC7A3\\\"         title=\\\"PRIVACY POLICY\\\"         id={5}         isInForeground={true}     >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$c(ctx) {
    	let div;
    	let windowelement;
    	let current;

    	windowelement = new WindowElement({
    			props: {
    				width: 288,
    				height: 207,
    				parallax: "very-slow",
    				background: "#FEC7A3",
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
    			div = element("div");
    			create_component(windowelement.$$.fragment);
    			attr_dev(div, "class", "grid-area svelte-da8dt3");
    			add_location(div, file$b, 4, 0, 80);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(windowelement, div, null);
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
    			if (detaching) detach_dev(div);
    			destroy_component(windowelement);
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
    		init(this, options, instance$c, create_fragment$c, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "PrivacyWindow",
    			options,
    			id: create_fragment$c.name
    		});
    	}
    }

    /* src/Windows/ReferencesWindow.svelte generated by Svelte v3.32.1 */
    const file$c = "src/Windows/ReferencesWindow.svelte";

    // (6:4) <WindowElement         width={347}         height={314}         parallax="medium"         background="#5F583D"         title="References"         enlargeable={false}         id={4}         isInForeground={true}     >
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
    			attr_dev(a0, "class", "svelte-jrcirl");
    			add_location(a0, file$c, 16, 16, 354);
    			attr_dev(li0, "class", "svelte-jrcirl");
    			add_location(li0, file$c, 16, 12, 350);
    			attr_dev(a1, "href", "www.reference.com");
    			attr_dev(a1, "class", "svelte-jrcirl");
    			add_location(a1, file$c, 17, 16, 429);
    			attr_dev(li1, "class", "svelte-jrcirl");
    			add_location(li1, file$c, 17, 12, 425);
    			attr_dev(a2, "href", "www.reference.com");
    			attr_dev(a2, "class", "svelte-jrcirl");
    			add_location(a2, file$c, 18, 16, 491);
    			attr_dev(li2, "class", "svelte-jrcirl");
    			add_location(li2, file$c, 18, 12, 487);
    			attr_dev(a3, "href", "www.reference.com");
    			attr_dev(a3, "class", "svelte-jrcirl");
    			add_location(a3, file$c, 20, 16, 573);
    			attr_dev(li3, "class", "svelte-jrcirl");
    			add_location(li3, file$c, 19, 12, 552);
    			attr_dev(a4, "href", "www.reference.com");
    			attr_dev(a4, "class", "svelte-jrcirl");
    			add_location(a4, file$c, 22, 16, 667);
    			attr_dev(li4, "class", "svelte-jrcirl");
    			add_location(li4, file$c, 22, 12, 663);
    			attr_dev(a5, "href", "www.reference.com");
    			attr_dev(a5, "class", "svelte-jrcirl");
    			add_location(a5, file$c, 23, 16, 747);
    			attr_dev(li5, "class", "svelte-jrcirl");
    			add_location(li5, file$c, 23, 12, 743);
    			attr_dev(a6, "href", "www.reference.com");
    			attr_dev(a6, "class", "svelte-jrcirl");
    			add_location(a6, file$c, 24, 16, 806);
    			attr_dev(li6, "class", "svelte-jrcirl");
    			add_location(li6, file$c, 24, 12, 802);
    			attr_dev(a7, "href", "www.reference.com");
    			attr_dev(a7, "class", "svelte-jrcirl");
    			add_location(a7, file$c, 25, 16, 874);
    			attr_dev(li7, "class", "svelte-jrcirl");
    			add_location(li7, file$c, 25, 12, 870);
    			attr_dev(a8, "href", "www.reference.com");
    			attr_dev(a8, "class", "svelte-jrcirl");
    			add_location(a8, file$c, 26, 16, 940);
    			attr_dev(li8, "class", "svelte-jrcirl");
    			add_location(li8, file$c, 26, 12, 936);
    			attr_dev(a9, "href", "www.reference.com");
    			attr_dev(a9, "class", "svelte-jrcirl");
    			add_location(a9, file$c, 28, 16, 1021);
    			attr_dev(li9, "class", "svelte-jrcirl");
    			add_location(li9, file$c, 27, 12, 1000);
    			attr_dev(a10, "href", "www.reference.com");
    			attr_dev(a10, "class", "svelte-jrcirl");
    			add_location(a10, file$c, 30, 16, 1116);
    			attr_dev(li10, "class", "svelte-jrcirl");
    			add_location(li10, file$c, 30, 12, 1112);
    			attr_dev(a11, "href", "www.reference.com");
    			attr_dev(a11, "class", "svelte-jrcirl");
    			add_location(a11, file$c, 31, 16, 1186);
    			attr_dev(li11, "class", "svelte-jrcirl");
    			add_location(li11, file$c, 31, 12, 1182);
    			attr_dev(a12, "href", "www.reference.com");
    			attr_dev(a12, "class", "svelte-jrcirl");
    			add_location(a12, file$c, 32, 16, 1248);
    			attr_dev(li12, "class", "svelte-jrcirl");
    			add_location(li12, file$c, 32, 12, 1244);
    			attr_dev(ul, "class", "svelte-jrcirl");
    			add_location(ul, file$c, 15, 8, 333);
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
    		source: "(6:4) <WindowElement         width={347}         height={314}         parallax=\\\"medium\\\"         background=\\\"#5F583D\\\"         title=\\\"References\\\"         enlargeable={false}         id={4}         isInForeground={true}     >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$d(ctx) {
    	let div;
    	let windowelement;
    	let current;

    	windowelement = new WindowElement({
    			props: {
    				width: 347,
    				height: 314,
    				parallax: "medium",
    				background: "#5F583D",
    				title: "References",
    				enlargeable: false,
    				id: 4,
    				isInForeground: true,
    				$$slots: { default: [create_default_slot$8] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(windowelement.$$.fragment);
    			attr_dev(div, "class", "grid-area svelte-jrcirl");
    			add_location(div, file$c, 4, 0, 80);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(windowelement, div, null);
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
    			if (detaching) detach_dev(div);
    			destroy_component(windowelement);
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
    		init(this, options, instance$d, create_fragment$d, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ReferencesWindow",
    			options,
    			id: create_fragment$d.name
    		});
    	}
    }

    /* src/Windows/GermanyJPG.svelte generated by Svelte v3.32.1 */
    const file$d = "src/Windows/GermanyJPG.svelte";

    // (18:4) <WindowElement         width={600}         height={436}         parallax="very-fast"         background={deGallery[randomIndex].svg}         title={deGallery[randomIndex].name}         id={11}         isInForeground={true}     >
    function create_default_slot$9(ctx) {
    	let imageloader;
    	let current;

    	imageloader = new ImageLoader({
    			props: {
    				srcset: "https://res.cloudinary.com/thdrstnr/image/upload/w_1280,f_auto/" + /*slug*/ ctx[2] + " 1280w,\n            https://res.cloudinary.com/thdrstnr/image/upload/w_1280,f_auto,q_auto:best/" + /*slug*/ ctx[2] + " 598w,\n            https://res.cloudinary.com/thdrstnr/image/upload/w_376,f_auto,q_auto:best/" + /*slug*/ ctx[2] + " 376w,",
    				src: "https://res.cloudinary.com/thdrstnr/image/upload/w_1280,f_auto/" + /*slug*/ ctx[2],
    				sizes: "598px",
    				alt: /*deGallery*/ ctx[0][/*randomIndex*/ ctx[1]].alt
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(imageloader.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(imageloader, target, anchor);
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
    			destroy_component(imageloader, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$9.name,
    		type: "slot",
    		source: "(18:4) <WindowElement         width={600}         height={436}         parallax=\\\"very-fast\\\"         background={deGallery[randomIndex].svg}         title={deGallery[randomIndex].name}         id={11}         isInForeground={true}     >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$e(ctx) {
    	let div;
    	let windowelement;
    	let current;

    	windowelement = new WindowElement({
    			props: {
    				width: 600,
    				height: 436,
    				parallax: "very-fast",
    				background: /*deGallery*/ ctx[0][/*randomIndex*/ ctx[1]].svg,
    				title: /*deGallery*/ ctx[0][/*randomIndex*/ ctx[1]].name,
    				id: 11,
    				isInForeground: true,
    				$$slots: { default: [create_default_slot$9] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(windowelement.$$.fragment);
    			attr_dev(div, "class", "grid-area svelte-lgv888");
    			add_location(div, file$d, 16, 0, 3549);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(windowelement, div, null);
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
    			if (detaching) detach_dev(div);
    			destroy_component(windowelement);
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
    	validate_slots("GermanyJPG", slots, []);

    	const deGallery = [
    		{
    			name: "OBERHAFEN.JPG",
    			src: "/MortimerBaltus/deGallery/Oberhafen_c5hvmx",
    			alt: "Oberhafen, Hamburg (DE)",
    			svg: "url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjgwIDg1MyI+PHBhdGggZmlsbD0iIzFkMjYyOSIgZD0iTTAgMGgxMjgwdjg1MEgweiIvPjxnIGZpbGwtb3BhY2l0eT0iLjUiPjxwYXRoIGZpbGw9IiM1ODY4NmUiIGQ9Ik00MjkuNyA1MDAuMUwxNS42IDkyNy41bC05My4xLTYyNS4xIDE0MzUgMTczLjV6Ii8+PHBhdGggZD0iTTg5NC4yIDM0Ni44bDQ2My4zLTM0MUwtNzcuNS0xNGw0NjcuMyA0NTguOHoiLz48cGF0aCBmaWxsPSIjNTI2MzZiIiBkPSJNMTAzMC4yIDQ5OS4zbDMyMiA0MjguMi01Ni4zLTc0Mi4xLTU4NyAyNDIuNHoiLz48cGF0aCBmaWxsPSIjYzNjY2UwIiBkPSJNMzcuNyAyNTEuOWw2LjItMzggNjUuOCAxNDguNkwxMjYuOSA1MzV6Ii8+PHBhdGggZmlsbD0iI2UzZTdmYSIgZD0iTS03Ny41IDY3OC4xdi01Ni42bDIwMS4zLTkuMiAzMi40IDE5LjR6Ii8+PHBhdGggZD0iTTEzNDcuNiA1MjYuNmwtMzI5LjgtNDMuOC0yNjMtNDEuNyA2MDIuNyAxNjcuN3oiLz48cGF0aCBmaWxsPSIjYmJjN2Q3IiBkPSJNMTM1Ny41IDY4NS4zbC0yMTEtNTMuMy0yOC0xOCAxODUuNy03LjV6Ii8+PHBhdGggZD0iTTMwOC45LTc3LjVsLTEzNCA1NjktODcuNS0xNzYuM0wxMzU3LjUgMTA1eiIvPjxwYXRoIGZpbGw9IiNhZWFhYTkiIGQ9Ik0yNjUuNiA0ODRsNDQzLTcxLjdMMjM0LjggNDgxIDI1MiAyMzIuNXoiLz48cGF0aCBmaWxsPSIjYjVhZmIzIiBkPSJNMTEzOS40IDQ2OC4zbDg5LTI5Ni02OS43IDMzMi43LTcyLjItMjEuMnoiLz48cGF0aCBmaWxsPSIjMDAwMDAxIiBkPSJNMTE0MC4yIDQzNi4zbDcyLjQtMTg0LjMtMTkuOC0zMjkuNS04OC44IDQ5OC4yeiIvPjxwYXRoIGZpbGw9IiNlOWUzZjYiIGQ9Ik0xMjE2IDQ2MS4zbC0zLjItMzA4LjcgMTAuNCAxMTguMi00LjcgMTc2LjJ6Ii8+PHBhdGggZmlsbD0iIzg3OTc5YiIgZD0iTTEwMzguNCAzNDcuNWwtOS40IDEyMS4zLTkwLjctMi4zIDY3LjMtMTc0LjV6Ii8+PHBhdGggZmlsbD0iIzAyMDYwMCIgZD0iTTU3OS44IDQzNi45bC0xMTYuOSAyOS01NDAuNCAxMjguNCA4Ny40LTcxeiIvPjxwYXRoIGZpbGw9IiNmNGYzZmYiIGQ9Ik01NSAzNjQuN2wuMi0xMDIuOC0xMi40LTM0IC43IDEzNy4zeiIvPjxwYXRoIGZpbGw9IiM1YzY4NmYiIGQ9Ik0xMzIuMiAyOUwxNTkgMzcwbC0yMi40LTEyMkw4MS41LTR6Ii8+PHBhdGggZmlsbD0iIzBkMTUxOCIgZD0iTTk2Mi42IDkyNy41SDM5Ni44TDI4Ni42IDU1MC43bDY2Ni43LTIyeiIvPjxwYXRoIGZpbGw9IiNhMzlmOWQiIGQ9Ik0xMDkuMyA0OTMuMmwtMTg1LjYgNDBMMTk0IDQ5Ni44IDcyLjIgMzg5LjJ6Ii8+PHBhdGggZmlsbD0iIzczODg5NSIgZD0iTTEyNDcuNiA1MDUuNGwxLjktMjgwLjcgMjEuMy01OS4xIDcyLjQgMzY4LjV6Ii8+PHBhdGggZmlsbD0iIzUwNWY2NCIgZD0iTTExMzgtMzZsNjQtMzktNzggMzQwLTEtMjguOHoiLz48cGF0aCBmaWxsPSIjYjRjMmQwIiBkPSJNMTAwNC4xIDYzOC45bC0xMS4zLTIyIDItNCA3MS45LTEuM3oiLz48cGF0aCBmaWxsPSIjMDAwMTA2IiBkPSJNLTc3LjUtNTYuNmwxMjggMjcyLjJMNjIgMzM5LjRsNzUuMy0yODEuN3oiLz48cGF0aCBmaWxsPSIjNjU2ZTc1IiBkPSJNLTcyLjIgNTk0LjZMNzQwIDQwNS43IDI1MC40IDU2NiAzMC43IDYyOXoiLz48cGF0aCBmaWxsPSIjMDAwMjA2IiBkPSJNMTI2Mi45IDQ4Mi40bC0xMC4xLTEwLTE0LjYtMzkyLTIxLjIgNDI2LjJ6Ii8+PHBhdGggZmlsbD0iIzAxMDEwMCIgZD0iTTU4OC44IDQyNy43TDEwMzcuNyAyNDcgMTAyOSAuMyA5NC0xNC40eiIvPjxwYXRoIGZpbGw9IiM0ODUyNTYiIGQ9Ik0yMDggMTg4LjNsOS43LTExMi44IDMxLjYgNTEuNS01MS42IDE5OXoiLz48cGF0aCBmaWxsPSIjMWUzMjNiIiBkPSJNLTYxLjEgNzc2TDc4LjMgNjUxLjIgNDkzIDYyOS44IDc5IDkyNy41eiIvPjxwYXRoIGZpbGw9IiMwZDE1MTUiIGQ9Ik04MzcgNDg3LjhsLTE4OS00OC41LTE3NC44IDE4OSA0OTAuNyAxMy4xeiIvPjxwYXRoIGZpbGw9IiMwMDA4MTYiIGQ9Ik0xOC44IDQ3NC4zbDkuNi01MDkgMTcgNDcwLjYgNi43IDY2LjJ6Ii8+PHBhdGggZmlsbD0iI2U5ZTZmOSIgZD0iTTc0LjIgMzY1LjZsMjUuOCAxM0w3Mi4zIDI0OGw1LjggMTI0LjZ6Ii8+PHBhdGggZmlsbD0iIzAwMDIwNSIgZD0iTTExNjMgODMuNGw5Ni42IDcwLjQtNTMuOSAyLjhMMTIwOSA0NDF6Ii8+PHBhdGggZmlsbD0iIzc5N2I3OCIgZD0iTTY2NS43IDQxMWwtNTQ5LjMgNTYuNiA4NTYuMi0yOS40IDIyLjcgMzkuNnoiLz48L2c+PC9zdmc+\")"
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
    		init(this, options, instance$e, create_fragment$e, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "GermanyJPG",
    			options,
    			id: create_fragment$e.name
    		});
    	}
    }

    /* src/Windows/JapanJPG.svelte generated by Svelte v3.32.1 */
    const file$e = "src/Windows/JapanJPG.svelte";

    // (32:4) <WindowElement         width={600}         height={436}         parallax="very-fast"         background={jpGallery[randomIndex].svg}         title={jpGallery[randomIndex].name}         id={8}         isInForeground={true}     >
    function create_default_slot$a(ctx) {
    	let imageloader;
    	let current;

    	imageloader = new ImageLoader({
    			props: {
    				sizes: "598px",
    				srcset: "https://res.cloudinary.com/thdrstnr/image/upload/w_1280,f_auto/" + /*slug*/ ctx[2] + " 1280w,\n            https://res.cloudinary.com/thdrstnr/image/upload/w_598,f_auto,q_auto:best/" + /*slug*/ ctx[2] + " 598w,\n            https://res.cloudinary.com/thdrstnr/image/upload/w_376,f_auto,q_auto:best/" + /*slug*/ ctx[2] + " 376w,",
    				src: "https://res.cloudinary.com/thdrstnr/image/upload/w_1280,f_auto/" + /*slug*/ ctx[2],
    				alt: /*jpGallery*/ ctx[0][/*randomIndex*/ ctx[1]].alt
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(imageloader.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(imageloader, target, anchor);
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
    			destroy_component(imageloader, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$a.name,
    		type: "slot",
    		source: "(32:4) <WindowElement         width={600}         height={436}         parallax=\\\"very-fast\\\"         background={jpGallery[randomIndex].svg}         title={jpGallery[randomIndex].name}         id={8}         isInForeground={true}     >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$f(ctx) {
    	let div;
    	let windowelement;
    	let current;

    	windowelement = new WindowElement({
    			props: {
    				width: 600,
    				height: 436,
    				parallax: "very-fast",
    				background: /*jpGallery*/ ctx[0][/*randomIndex*/ ctx[1]].svg,
    				title: /*jpGallery*/ ctx[0][/*randomIndex*/ ctx[1]].name,
    				id: 8,
    				isInForeground: true,
    				$$slots: { default: [create_default_slot$a] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(windowelement.$$.fragment);
    			attr_dev(div, "class", "grid-area svelte-9kfdj4");
    			add_location(div, file$e, 30, 0, 10186);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(windowelement, div, null);
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
    			if (detaching) detach_dev(div);
    			destroy_component(windowelement);
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
    	validate_slots("JapanJPG", slots, []);

    	const jpGallery = [
    		{
    			name: "SHINJUKU.JPG",
    			src: "/MortimerBaltus/jpGallery/ShinjukuSakura_dgdj2h",
    			alt: "Shinjuku, Tokyo (JP)",
    			svg: "url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjgwIDg1MyI+PHBhdGggZmlsbD0iIzg4ODY4YSIgZD0iTTAgMGgxMjgwdjg1MEgweiIvPjxnIGZpbGwtb3BhY2l0eT0iLjUiPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0xMzU3LjUgMTAuM0w1NDIgMzk0LjlsLTI4IDE1Ny43TDI3MS41LTc3LjV6Ii8+PHBhdGggZD0iTTMgNDAyLjhMLTIzIDYwMmwxMzgwLjUtMTkuNy02Ny42LTIzOHoiLz48cGF0aCBmaWxsPSIjMDAxOTI0IiBkPSJNLTc3LjUgNzQyLjNsNDUxLTE0LjMgMTcuMS02MDAuNi0zNzctMjA0Ljl6Ii8+PHBhdGggZmlsbD0iI2Y1ZGRlMiIgZD0iTTkwOS41IDkyNy41bC05ODctOTIuNSA4MDgtMjYzLjEgNTg3LjggNTV6Ii8+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTQ1MSA1MTUuM0wzNDguOC03Ny41aDc3NC41bC00NzYgNTQ2eiIvPjxwYXRoIGZpbGw9IiMwNDA5MDYiIGQ9Ik0xMTYyLjQgMTQ1LjhsLTE0NS44IDI5MS41LTM3OSA0Mi40IDcxOS45IDE1Ni44eiIvPjxwYXRoIGZpbGw9IiM3MzZlNmQiIGQ9Ik01NjIuMiA1MDRsLTMyLjMtMTIzLjQgNzg3LjMtMTc1LjgtMjE3LjMgMjA2eiIvPjxwYXRoIGZpbGw9IiM0ZTY5NzQiIGQ9Ik01MjMuMSA2NzAuNUwzMjguNyA1NzAuMy03Ny41IDY5Ny45IDQ4Ny4zIDc1MHoiLz48cGF0aCBmaWxsPSIjZWFkNWRiIiBkPSJNNDI3IDU4MC44bDQyMy42IDguNi0xNTQgMjIyLTI0MS0xODguNHoiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNNzU4IDM4OC4zTDMzNi4yIDEwNiAyODMuNC0zNS40IDkyMi03Ny41eiIvPjxwYXRoIGQ9Ik04NTcuMSAyMDguMmwxNy4xIDU2LjctNjIuOCAxNS4zIDkuMS01OS42eiIvPjxwYXRoIGZpbGw9IiM2YjY2NjciIGQ9Ik0xMDY1LjIgNDUuM2wyMDIuNiAxMDIuNSA4OS43IDMyMy40LTMyNS4xLTMzMC40eiIvPjxwYXRoIGZpbGw9IiMwMDEwMWQiIGQ9Ik03ODAgMzkzLjJsLTExMCAyNi4yLTEzOS43LTEyIDEzNi4zLTQ3Ljl6Ii8+PHBhdGggZmlsbD0iI2ZmZmVmZiIgZD0iTTY4OC4yIDU0N2wxNC42LTM5LjUgNjMuNSA5MS44IDMyLjYtNTR6Ii8+PHBhdGggZmlsbD0iI2IwYjViOSIgZD0iTTUwLjQgNDI1TC0xNyA0NDcuNWwtNjAuNS0xNzguMiAxMjgtMTIuNXoiLz48cGF0aCBmaWxsPSIjMGUxMzE4IiBkPSJNNzkuMyA2MjguN2w1My41LTMwNy40LTUuNC0yNzMuNyAyNjUuOCA1MjQuN3oiLz48cGF0aCBmaWxsPSIjYTg5Yjk4IiBkPSJNOTMxLjUgMTkyLjdMNzYzLjMgMzk5bC0xODIuMSA4NSAzMjEuMy01MnoiLz48cGF0aCBmaWxsPSIjNzc3NTc5IiBkPSJNMjgxLjYgMzAzLjdMNTIzIDU4NmwtNzcuMy0yNjAtMjUxLTM1Ni45eiIvPjxwYXRoIGZpbGw9IiNlMWNiY2YiIGQ9Ik0tNzcuNSA5MDIuOGw2NDItMTYwLTIzMiAxLjEtNDEwLTZ6Ii8+PHBhdGggZmlsbD0iIzAwMDAwNCIgZD0iTTYxLjcgMTE3LjJsLTgwLjggMTA0LjUgNjMuNCA1MSA2Mi42IDI2Ny43eiIvPjxwYXRoIGZpbGw9IiNmZmYyZjkiIGQ9Ik02MTIuMSAyODcuOWwtMjgzLjYgNDYuOUw2ODcuOC03Ny41aDY2OS43eiIvPjxwYXRoIGZpbGw9IiMwODBjMGMiIGQ9Ik0xMjUyIDI3NUw5MzcuMSA1NzlsMjU3LjUgMjUuOCA3MC40LTU0LjN6Ii8+PHBhdGggZmlsbD0iIzA4MGEwYyIgZD0iTTMzMS41IDM3MGwxMDUuMSAxOTguOC0xNjUuNC02MC4yTDQ1OCAzMTkuNHoiLz48cGF0aCBmaWxsPSIjZmFlZGY0IiBkPSJNMTM1Ny41IDEzMC43TDc0Mi42LTc3LjVsMTM2LjYgMzExTDExMzcuNC0zOXoiLz48cGF0aCBmaWxsPSIjYTc5Y2EyIiBkPSJNMTM1Ny41IDU3Mi40bC0xNjQgMzMxLjEtNTA2LjEgMy40IDQ2Mi40LTI4Ni4zeiIvPjxwYXRoIGZpbGw9IiM0NTQzNDIiIGQ9Ik0xMDgyLjcgMjg2LjVsMjUwLjQgMi40LTQ2NC4yIDEwNC44IDkuNy02NS45eiIvPjxwYXRoIGZpbGw9IiNmZmY5ZmUiIGQ9Ik0xMjM1LjkgMzU3LjNsMTIxLjYgNTR2NTUuOGwtMzcuNC0xNzEuNnoiLz48cGF0aCBmaWxsPSIjNTg2YTc0IiBkPSJNLTc3LjUgNjQybDM2Ny44LTQ1LjYgMjgxLjEgMTU3LjQtMzM2LjMtMzd6Ii8+PHBhdGggZmlsbD0iI2FhYWRiNCIgZD0iTTI3Ny41IDE2Ni4xTDI0NC40LTMxLjYgMjM0IDIyMi4zbDE1LjggMTAuM3oiLz48cGF0aCBmaWxsPSIjYTA5OTlmIiBkPSJNMTM1LjUgMjA2LjJsLTU4LjgtOCA4Ny4xIDE3Mi4yLTc0LjYtNTZ6Ii8+PHBhdGggZmlsbD0iIzA5MWMyOSIgZD0iTTExMC43IDMwMC44bDYwLjQtMzc4LjMgNjIuMyAyMzMtNC4yLTE2MHoiLz48cGF0aCBmaWxsPSIjZjFlMmU3IiBkPSJNNjY3LjcgNTgxLjFMNjU2LjMgNTM3bC0xNy44IDYuNEw2NDMgNTg3eiIvPjwvZz48L3N2Zz4=\")"
    		},
    		{
    			name: "TAXI.JPG",
    			src: "/MortimerBaltus/jpGallery/TokyoTaxi_zbokhg",
    			alt: "A cab in Tokyo (JP)",
    			svg: "url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjgwIDg1MCI+PHBhdGggZmlsbD0iIzZlNjY2MyIgZD0iTTAgMGgxMjgwdjg1MEgweiIvPjxnIGZpbGwtb3BhY2l0eT0iLjUiPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0tNzcuNSA4OTMuOFY3NTUuNmwxNDE1LjktMzA5LjgtMTg2LjggNDgxLjd6Ii8+PHBhdGggZD0iTTEzNTcuNS0zMnYzOTlsLTE0MzUtMTQ1LjNMLTI1LTc3LjV6Ii8+PHBhdGggZmlsbD0iIzAyMDAwMCIgZD0iTTk0NS44IDQ2NUw3MzUuNCA2NDUgMTAuMiA1OTkuMWw0NjkuNi0xMjcuN3oiLz48cGF0aCBmaWxsPSIjZjNlMWNiIiBkPSJNMTM1Ny41IDcyNy4yTC03Ny41IDYwMSAzMS42IDQzMmw5NC44IDQ5NS42eiIvPjxwYXRoIGZpbGw9IiNjM2MwYmQiIGQ9Ik01NzkuNiA0MTBsLTQ2LTE5MiAyOTItNDEtODIuMyAyNDkuMXoiLz48cGF0aCBmaWxsPSIjMDAwMDA2IiBkPSJNNzc5LTE3LjdsNTc4LjUgNDk1LTM4MS0xOS41IDM4MS00NTkuNHoiLz48cGF0aCBmaWxsPSIjZjFlMmQwIiBkPSJNNTYwLjIgODU1LjNsNjI3LjggNzIuMi0yNi42LTQ2NC40TDk1MSA0OTQuNnoiLz48cGF0aCBmaWxsPSIjMDAwNDA4IiBkPSJNMjIwLjEgMjU0LjVsMTA0Mi0yMDguM0wtNzcuNSA1OGwyNDIuMSAzNjh6Ii8+PHBhdGggZD0iTTExNzYuNCA4NjQuMmwxODEuMS04NC4zLTE5NS40LTEyMy40IDE3OC02MC4zeiIvPjxwYXRoIGZpbGw9IiNmZTVkMzgiIGQ9Ik0yNjIuMyA0MDcuNWwxMzggMTAyLjcgNTQwLjEtNzMuOC04Ny43LTQ4Ljd6Ii8+PHBhdGggZmlsbD0iI2MwZDRlOCIgZD0iTTEwMTIgMjQ2LjJsLTQxMy43LTM2LjYgMjg5LjMtMjEuNCAxNzkuMiAyNy4zeiIvPjxwYXRoIGZpbGw9IiMyNjA5MDkiIGQ9Ik01MTUuMiA2NDYuN2wyODYuNy0zMi0zMTQuNC0xNjUtMzQyLjItMjQuNnoiLz48cGF0aCBmaWxsPSIjMDAwNDA2IiBkPSJNMTE3NC4yIDI1NS40bC0zNTIuMy0yNy43LTMxOC40IDQuMyA2MDQuOCA5OC40eiIvPjxwYXRoIGZpbGw9IiNmMGRmYmYiIGQ9Ik02MTMuNiA0MTguN2wyODcuOC0yLjRMNTI0IDI3Ny41bDM4LjctNDV6Ii8+PHBhdGggZmlsbD0iI2JlY2VkZiIgZD0iTTEwNDYgMzQwLjRsNDEuNSA1MjUuNC0zNy4yLTQ3NS42LTM2OS42LTk3LjF6Ii8+PHBhdGggZmlsbD0iI2NlYzdjNyIgZD0iTS03Ny41IDI4My40bDI5MS40IDQ2NS0yOTEuNC0zMTUuMUwxMTEgMzIwLjh6Ii8+PHBhdGggZmlsbD0iIzAwMDQxNCIgZD0iTTkwOS42IDM5NC43bDQwMC43IDkuMi0yOS40LTg3LjUtMzQxLjcgMTYwLjl6Ii8+PHBhdGggZmlsbD0iI2Y4ZWZlNCIgZD0iTTk0MS4zIDQ4My41TDkwOCA1NTBsNDA4LjQtNTUtLjMtMjh6Ii8+PHBhdGggZmlsbD0iIzI5MmUzMyIgZD0iTTM2My45IDEyMi4ybDcuNiAxOTcuNy00MTkgODUuNEw1MzYgMzc5LjF6Ii8+PHBhdGggZmlsbD0iI2E1Y2JlZiIgZD0iTTU0MC40IDE0MC42bDYuNC0yNS44IDU0LjkgMTAuMy00MS42IDUzLjR6Ii8+PHBhdGggZmlsbD0iIzA3MGQxZCIgZD0iTTEyMTkuNSA1MzAuNmwxMzggNjMuMi01LjctOTUuNC0xNTguNyAxNy40eiIvPjxwYXRoIGQ9Ik0xMjYxLjUgNzE0LjdsNjkuMi00MiAyNi44IDIxNi43LTIzMS45IDM4LjF6Ii8+PHBhdGggZmlsbD0iI2U0MTAwMCIgZD0iTTU2NS45IDQwNGwtMTkuNC0xMDcuNy00NiAxMzQuOEw3MzQgNDU2LjJ6Ii8+PHBhdGggZmlsbD0iI2U4ZTFjYSIgZD0iTTc2MS43IDU4M2wtMzcuNC0yOC43LTg2LjcgMTFMNzE0IDU3OHoiLz48cGF0aCBmaWxsPSIjMGEwZTE1IiBkPSJNNzE2IDMwNy4zbC0xMzMuNy0xNEw4MzIuOCAxMjkgNjQ1LjItNzcuNXoiLz48cGF0aCBmaWxsPSIjZDhjY2JmIiBkPSJNNTc5LjEgNjMyLjFMODg4IDkyMC4ybDQyMS40LTM4NS44TDkzMiA2MjMuN3oiLz48cGF0aCBmaWxsPSIjY2RjNmJlIiBkPSJNNTMwIDYyM2wtMjE5LjUtMTJMMjYuMiA5MjcuNSA4OC44IDYzM3oiLz48cGF0aCBmaWxsPSIjYTVjMGQ0IiBkPSJNMTIwLjYgNDAwLjZsMzc1LjcgMjYuNiAxODYgMzkuMi0yMTYuMS0xOS42eiIvPjxwYXRoIGZpbGw9IiMzODQ3NjMiIGQ9Ik0zMjguNyA2MjIuNGwtMzk5LjItMjI4TDMwNSA0MzEuOCA0LjggNjA0LjV6Ii8+PHBhdGggZmlsbD0iIzExMTIxMyIgZD0iTTYwOS40IDEwbC01MzkgMjkyLTg3LjMtLjMgNDEtMjAxLjZ6Ii8+PHBhdGggZmlsbD0iI2MwMjEwZSIgZD0iTTQ0OS42IDUzNy40TDI3OSA0MzIuOCA0OTkgNDU1bC0xNi4yIDc1Ljd6Ii8+PHBhdGggZmlsbD0iIzczOWNiOSIgZD0iTTExNzguMyAyNzYuM2wxMS41LTY4IDU1LjcgMTM5LjYgNDIuMS01OHoiLz48L2c+PC9zdmc+\")"
    		},
    		{
    			name: "TRAINSTATION.JPG",
    			src: "/MortimerBaltus/jpGallery/TokyoTrainstation_sovh7s",
    			alt: "A Trainstation in Tokyo",
    			svg: "url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjgwIDg1MyI+PHBhdGggZmlsbD0iIzg4OCIgZD0iTTAgMGgxMjgwdjg1MEgweiIvPjxnIGZpbGwtb3BhY2l0eT0iLjUiPjxwYXRoIGQ9Ik01NTEuOCA1NjUuNEwtMjMuOSAyNzEuMmwzNy43IDYwOEwxMjc5IDkyNy40eiIvPjxwYXRoIGZpbGw9IiNlMGUwZTAiIGQ9Ik00ODAuNSA1MjkuOGwtNTU3LjItMzI3IDE0MzQuMi01NS45TDEyMjYgODc5eiIvPjxwYXRoIGZpbGw9IiMyYjJiMmIiIGQ9Ik0xMDAyLjYgMzI4LjdsLTYwLTMxMi4zLTM0NS44IDcgNC45IDI4OS40eiIvPjxwYXRoIGZpbGw9IiNlY2VjZWMiIGQ9Ik01OTAuNCAxODguN2w4LTE5OS4xLTY3NS45LTY3LjF2MjczLjJ6Ii8+PHBhdGggZD0iTS01Mi4yIDM0Ni4xbDEwNzcgNTgxLjRINTc0LjNMLjIgNTg3Ljd6Ii8+PHBhdGggZmlsbD0iI2RmZGZkZiIgZD0iTTk1NC03Ny41bDUwLjggOTIuNCAzMDYuNCAxMTlMOTY4LjEgNDIzeiIvPjxwYXRoIGQ9Ik0xMzU3LjUgMTUzLjVMMTI3Mi44IDkgOTU5LTM5LjRsLTUzLjggNC42eiIvPjxwYXRoIGZpbGw9IiNkYWRhZGEiIGQ9Ik03NTUuNSAxNzEuNWwxNDMuMS0xLjctNi4zIDkzLjEtMzE1LjgtODQuNXoiLz48cGF0aCBmaWxsPSIjMDIwMjAyIiBkPSJNODYxIDk3LjVsNTcuNyAyMjEgNTAuMy02Mi4zLTM3LjctMTUzLjZ6Ii8+PHBhdGggZmlsbD0iIzg3ODc4NyIgZD0iTTI0LjMgOTI3LjVMMjcgNjgyLjNsMTYwLjUgMjcuNSA1OC4zIDc2LjZ6Ii8+PHBhdGggZmlsbD0iI2ZiZmJmYiIgZD0iTTc4Mi44IDIxLjNsMjQwLjcuOC0zNDguOC05OS42LTEwMS45IDk1Ljd6Ii8+PHBhdGggZmlsbD0iI2NhY2FjYSIgZD0iTTEyNzAuMyA4ODEuNGwtMTM4LjktNTc0LjgtOTYyLjUgMjggNDExLjIgMjExLjh6Ii8+PHBhdGggZmlsbD0iIzE1MTUxNSIgZD0iTTcxMS4xIDIxN2wtNzUgMTQuNkw2MDUuOS0xNWwtMTEuNyAzNTAuN3oiLz48cGF0aCBmaWxsPSIjOWU5ZTllIiBkPSJNNjY4LjEgMTA0LjdsLTU4LjQtNTYuMUw4MjcgNTguOWwzNi41IDQyLjZ6Ii8+PHBhdGggZmlsbD0iIzFjMWMxYyIgZD0iTTc1MS42IDgwNy44TDM1OS40IDQ2NGwyMTIuOCAxMTAuMyAyMzMuNSAxMTcuNXoiLz48cGF0aCBmaWxsPSIjMTIxMjEyIiBkPSJNOTYwLjggMjYuM2wtNDU2LjggMyA0MzguNyAzMS4yIDExLjYgMzYuOHoiLz48cGF0aCBmaWxsPSIjM2UzZTNlIiBkPSJNNzYxIDMzNWwtLjktMjIzLjMgMjEuMi00NyAxMSAxOTd6Ii8+PHBhdGggZmlsbD0iI2M3YzdjNyIgZD0iTTU5NS44LTI5LjRsLTUzOCAzNDUgMzYyLjUgMTU0LjggMTc5LjItMjU5LjJ6Ii8+PHBhdGggZmlsbD0iI2M2YzZjNiIgZD0iTTk5NyAuMmwtNDEuMyAyOTEuOSAyODAuNyAzMDMtMjYtNDk2LjV6Ii8+PHBhdGggZmlsbD0iIzdkN2Q3ZCIgZD0iTTk0NiA4MjlsMzMuMi0yMi4yLTEwMC4zLTcwLjZMNzU4IDc0OXoiLz48cGF0aCBmaWxsPSIjZDdkN2Q3IiBkPSJNNzA3LjcgMTY2LjVsLTc3LjUgMTguMyAxMjkgNzUuNy0yMy4zLTgwLjh6Ii8+PHBhdGggZmlsbD0iIzFhMWExYSIgZD0iTTgyOC42IDMwNC40TDg5MyAyODBsMTEtMTAyLjNMOTc1LjQgMzE3eiIvPjxwYXRoIGZpbGw9IiM5Njk2OTYiIGQ9Ik0xMjQwLjEgNjM2LjdsLTE1LjktNTE5LjQgMTMzLjMgMTY2LjUtMTEwIDY0My43eiIvPjxwYXRoIGZpbGw9IiM4YzhjOGMiIGQ9Ik0xMDUuNCAzMzkuM2wxNS44LTQxMUw3NC0xOS42bC0uNSAzMzF6Ii8+PHBhdGggZmlsbD0iIzBkMGQwZCIgZD0iTTUzNiA1NjIuNWwtNjA0LjItMzEwLTkuMyAzNTkuMUw3NC42IDM0OC44eiIvPjxwYXRoIGZpbGw9IiNjM2MzYzMiIGQ9Ik04OTkuMiAxNzRsLTI2IDgxLjQtOTQuNiAxOUw4MDAgMTc1eiIvPjxwYXRoIGZpbGw9IiMyNDI0MjQiIGQ9Ik02ODQuOCAyMDJsLTMxLjIgNSAyMi45IDExNy44IDI5LjgtNjB6Ii8+PHBhdGggZmlsbD0iIzZiNmI2YiIgZD0iTTYyLjEgMzg1LjFsMzguMy0yOS44IDEyMy43IDE1NCAxMTYtMTl6Ii8+PHBhdGggZmlsbD0iIzJjMmMyYyIgZD0iTTYzNS4yIDMyNC41bDQtMTkyLjcgNDI0LjggMzguNy00NjEuOS02LjV6Ii8+PHBhdGggZmlsbD0iIzQ3NDc0NyIgZD0iTTM5OS40IDg3OWwtMS4yIDQ0LjctNDQtMTcyLjhMNzIuNiA2MTF6Ii8+PHBhdGggZmlsbD0iIzE1MTUxNSIgZD0iTTQyNi4xIDczNi40bDQzMS4xIDE5MS4xTDM4MCA4NjguOGwtNjgtNDQ5eiIvPjxwYXRoIGZpbGw9IiNhNmE2YTYiIGQ9Ik0xMDA5LjYgMzg1LjlsLTE5IDMzMy42LTI5LTM5Ni41LTUuMy0yMTYuOXoiLz48L2c+PC9zdmc+\")"
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
    		init(this, options, instance$f, create_fragment$f, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "JapanJPG",
    			options,
    			id: create_fragment$f.name
    		});
    	}
    }

    /* src/Windows/CleanCode.svelte generated by Svelte v3.32.1 */
    const file$f = "src/Windows/CleanCode.svelte";

    // (6:4) <WindowElement         width={378}         height={273}         parallax="very-slow"         background="#7d7d7d"         title="CLEAN.CODE"         id={10}         isInForeground={true}         intersections={[3]}         distanceFromIntersection={{             base: 13,             large: 8,         }}     >
    function create_default_slot$b(ctx) {
    	let p0;
    	let t0;
    	let br0;
    	let t1;
    	let br1;
    	let t2;
    	let t3;
    	let p1;
    	let t4;
    	let br2;
    	let br3;
    	let t5;
    	let p2;
    	let t6;
    	let br4;
    	let t7;
    	let p3;

    	const block = {
    		c: function create() {
    			p0 = element("p");
    			t0 = text("I suppose it is tempting, ");
    			br0 = element("br");
    			t1 = text(" if the only tool you have is a\n            hammer,");
    			br1 = element("br");
    			t2 = text("\n            to treat everything as if it were a nail.");
    			t3 = space();
    			p1 = element("p");
    			t4 = text("- Abraham Maslow ");
    			br2 = element("br");
    			br3 = element("br");
    			t5 = space();
    			p2 = element("p");
    			t6 = text("You wouldn't change a lightbulb with a hammer. ");
    			br4 = element("br");
    			t7 = space();
    			p3 = element("p");
    			p3.textContent = "We won't either.";
    			add_location(br0, file$f, 20, 38, 470);
    			add_location(br1, file$f, 21, 19, 527);
    			attr_dev(p0, "class", "svelte-nlgqqt");
    			add_location(p0, file$f, 19, 8, 428);
    			add_location(br2, file$f, 24, 47, 648);
    			add_location(br3, file$f, 24, 53, 654);
    			attr_dev(p1, "class", "text-right svelte-nlgqqt");
    			add_location(p1, file$f, 24, 8, 609);
    			add_location(br4, file$f, 26, 59, 736);
    			attr_dev(p2, "class", "svelte-nlgqqt");
    			add_location(p2, file$f, 25, 8, 673);
    			attr_dev(p3, "class", "text-right svelte-nlgqqt");
    			add_location(p3, file$f, 28, 8, 764);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p0, anchor);
    			append_dev(p0, t0);
    			append_dev(p0, br0);
    			append_dev(p0, t1);
    			append_dev(p0, br1);
    			append_dev(p0, t2);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, p1, anchor);
    			append_dev(p1, t4);
    			append_dev(p1, br2);
    			append_dev(p1, br3);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, p2, anchor);
    			append_dev(p2, t6);
    			append_dev(p2, br4);
    			insert_dev(target, t7, anchor);
    			insert_dev(target, p3, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p0);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(p1);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(p2);
    			if (detaching) detach_dev(t7);
    			if (detaching) detach_dev(p3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$b.name,
    		type: "slot",
    		source: "(6:4) <WindowElement         width={378}         height={273}         parallax=\\\"very-slow\\\"         background=\\\"#7d7d7d\\\"         title=\\\"CLEAN.CODE\\\"         id={10}         isInForeground={true}         intersections={[3]}         distanceFromIntersection={{             base: 13,             large: 8,         }}     >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$g(ctx) {
    	let div;
    	let windowelement;
    	let current;

    	windowelement = new WindowElement({
    			props: {
    				width: 378,
    				height: 273,
    				parallax: "very-slow",
    				background: "#7d7d7d",
    				title: "CLEAN.CODE",
    				id: 10,
    				isInForeground: true,
    				intersections: [3],
    				distanceFromIntersection: { base: 13, large: 8 },
    				$$slots: { default: [create_default_slot$b] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(windowelement.$$.fragment);
    			attr_dev(div, "class", "grid-area svelte-nlgqqt");
    			add_location(div, file$f, 4, 0, 80);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(windowelement, div, null);
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
    			if (detaching) detach_dev(div);
    			destroy_component(windowelement);
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
    		init(this, options, instance$g, create_fragment$g, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CleanCode",
    			options,
    			id: create_fragment$g.name
    		});
    	}
    }

    /* src/Windows/Logopedia.svelte generated by Svelte v3.32.1 */
    const file$g = "src/Windows/Logopedia.svelte";

    // (6:4) <WindowElement         width={472}         height={344}         parallax="slowish"         title="LOGOPEDIA.MP4"         enlargeable={false}         background="#C4BDBD"         id={6}         isInForeground={true}     >
    function create_default_slot$c(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			if (img.src !== (img_src_value = "images/Logopedia.svg")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "Logo Portfolio");
    			attr_dev(img, "class", "svelte-1yftxa2");
    			add_location(img, file$g, 15, 8, 337);
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
    		id: create_default_slot$c.name,
    		type: "slot",
    		source: "(6:4) <WindowElement         width={472}         height={344}         parallax=\\\"slowish\\\"         title=\\\"LOGOPEDIA.MP4\\\"         enlargeable={false}         background=\\\"#C4BDBD\\\"         id={6}         isInForeground={true}     >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$h(ctx) {
    	let div;
    	let windowelement;
    	let current;

    	windowelement = new WindowElement({
    			props: {
    				width: 472,
    				height: 344,
    				parallax: "slowish",
    				title: "LOGOPEDIA.MP4",
    				enlargeable: false,
    				background: "#C4BDBD",
    				id: 6,
    				isInForeground: true,
    				$$slots: { default: [create_default_slot$c] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(windowelement.$$.fragment);
    			attr_dev(div, "class", "grid-area svelte-1yftxa2");
    			add_location(div, file$g, 4, 0, 80);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(windowelement, div, null);
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
    			if (detaching) detach_dev(div);
    			destroy_component(windowelement);
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
    		init(this, options, instance$h, create_fragment$h, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Logopedia",
    			options,
    			id: create_fragment$h.name
    		});
    	}
    }

    /* src/Windows/LanguageWindow.svelte generated by Svelte v3.32.1 */
    const file$h = "src/Windows/LanguageWindow.svelte";

    // (13:4) <WindowElement         width={266}         height={273}         parallax="very-slow"         background=".C96161"         title="LANGUAGE"         id={13}         enlargeable={false}     >
    function create_default_slot$d(ctx) {
    	let div7;
    	let div6;
    	let div0;
    	let t0_value = (/*languageSelected*/ ctx[0] === "japanese" ? "あ" : "A") + "";
    	let t0;
    	let t1;
    	let div1;
    	let t2_value = (/*languageSelected*/ ctx[0] === "japanese" ? "A" : "あ") + "";
    	let t2;
    	let t3;
    	let div2;
    	let t4_value = (/*languageSelected*/ ctx[0] === "japanese" ? "あ" : "A") + "";
    	let t4;
    	let t5;
    	let div3;
    	let t6_value = (/*languageSelected*/ ctx[0] === "japanese" ? "A" : "あ") + "";
    	let t6;
    	let t7;
    	let div4;
    	let t8_value = (/*languageSelected*/ ctx[0] === "japanese" ? "あ" : "A") + "";
    	let t8;
    	let t9;
    	let div5;
    	let t10_value = (/*languageSelected*/ ctx[0] === "japanese" ? "A" : "あ") + "";
    	let t10;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div7 = element("div");
    			div6 = element("div");
    			div0 = element("div");
    			t0 = text(t0_value);
    			t1 = space();
    			div1 = element("div");
    			t2 = text(t2_value);
    			t3 = space();
    			div2 = element("div");
    			t4 = text(t4_value);
    			t5 = space();
    			div3 = element("div");
    			t6 = text(t6_value);
    			t7 = space();
    			div4 = element("div");
    			t8 = text(t8_value);
    			t9 = space();
    			div5 = element("div");
    			t10 = text(t10_value);
    			attr_dev(div0, "class", "animate svelte-4owd20");
    			toggle_class(div0, "layer1-japanese", /*languageSelected*/ ctx[0] === "japanese");
    			toggle_class(div0, "layer1-english", /*languageSelected*/ ctx[0] === "english");
    			add_location(div0, file$h, 23, 16, 594);
    			attr_dev(div1, "class", "animate svelte-4owd20");
    			toggle_class(div1, "layer2-japanese", /*languageSelected*/ ctx[0] === "japanese");
    			toggle_class(div1, "layer2-english", /*languageSelected*/ ctx[0] === "english");
    			add_location(div1, file$h, 30, 16, 908);
    			attr_dev(div2, "class", "animate svelte-4owd20");
    			toggle_class(div2, "layer3-japanese", /*languageSelected*/ ctx[0] === "japanese");
    			toggle_class(div2, "layer3-english", /*languageSelected*/ ctx[0] === "english");
    			add_location(div2, file$h, 37, 16, 1222);
    			attr_dev(div3, "class", "animate svelte-4owd20");
    			toggle_class(div3, "layerX-japanese", /*languageSelected*/ ctx[0] === "japanese");
    			toggle_class(div3, "layerX-english", /*languageSelected*/ ctx[0] === "english");
    			add_location(div3, file$h, 44, 16, 1536);
    			attr_dev(div4, "class", "animate svelte-4owd20");
    			toggle_class(div4, "layer4-japanese", /*languageSelected*/ ctx[0] === "japanese");
    			toggle_class(div4, "layer4-english", /*languageSelected*/ ctx[0] === "english");
    			add_location(div4, file$h, 51, 16, 1850);
    			attr_dev(div5, "class", "animate svelte-4owd20");
    			toggle_class(div5, "layer5-japanese", /*languageSelected*/ ctx[0] === "japanese");
    			toggle_class(div5, "layer5-english", /*languageSelected*/ ctx[0] === "english");
    			add_location(div5, file$h, 58, 16, 2164);
    			attr_dev(div6, "class", "animation-wrap svelte-4owd20");
    			add_location(div6, file$h, 22, 12, 549);
    			attr_dev(div7, "class", "container svelte-4owd20");
    			add_location(div7, file$h, 21, 8, 487);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div7, anchor);
    			append_dev(div7, div6);
    			append_dev(div6, div0);
    			append_dev(div0, t0);
    			append_dev(div6, t1);
    			append_dev(div6, div1);
    			append_dev(div1, t2);
    			append_dev(div6, t3);
    			append_dev(div6, div2);
    			append_dev(div2, t4);
    			append_dev(div6, t5);
    			append_dev(div6, div3);
    			append_dev(div3, t6);
    			append_dev(div6, t7);
    			append_dev(div6, div4);
    			append_dev(div4, t8);
    			append_dev(div6, t9);
    			append_dev(div6, div5);
    			append_dev(div5, t10);

    			if (!mounted) {
    				dispose = listen_dev(div7, "click", /*changeLanguage*/ ctx[1], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*languageSelected*/ 1 && t0_value !== (t0_value = (/*languageSelected*/ ctx[0] === "japanese" ? "あ" : "A") + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*languageSelected*/ 1) {
    				toggle_class(div0, "layer1-japanese", /*languageSelected*/ ctx[0] === "japanese");
    			}

    			if (dirty & /*languageSelected*/ 1) {
    				toggle_class(div0, "layer1-english", /*languageSelected*/ ctx[0] === "english");
    			}

    			if (dirty & /*languageSelected*/ 1 && t2_value !== (t2_value = (/*languageSelected*/ ctx[0] === "japanese" ? "A" : "あ") + "")) set_data_dev(t2, t2_value);

    			if (dirty & /*languageSelected*/ 1) {
    				toggle_class(div1, "layer2-japanese", /*languageSelected*/ ctx[0] === "japanese");
    			}

    			if (dirty & /*languageSelected*/ 1) {
    				toggle_class(div1, "layer2-english", /*languageSelected*/ ctx[0] === "english");
    			}

    			if (dirty & /*languageSelected*/ 1 && t4_value !== (t4_value = (/*languageSelected*/ ctx[0] === "japanese" ? "あ" : "A") + "")) set_data_dev(t4, t4_value);

    			if (dirty & /*languageSelected*/ 1) {
    				toggle_class(div2, "layer3-japanese", /*languageSelected*/ ctx[0] === "japanese");
    			}

    			if (dirty & /*languageSelected*/ 1) {
    				toggle_class(div2, "layer3-english", /*languageSelected*/ ctx[0] === "english");
    			}

    			if (dirty & /*languageSelected*/ 1 && t6_value !== (t6_value = (/*languageSelected*/ ctx[0] === "japanese" ? "A" : "あ") + "")) set_data_dev(t6, t6_value);

    			if (dirty & /*languageSelected*/ 1) {
    				toggle_class(div3, "layerX-japanese", /*languageSelected*/ ctx[0] === "japanese");
    			}

    			if (dirty & /*languageSelected*/ 1) {
    				toggle_class(div3, "layerX-english", /*languageSelected*/ ctx[0] === "english");
    			}

    			if (dirty & /*languageSelected*/ 1 && t8_value !== (t8_value = (/*languageSelected*/ ctx[0] === "japanese" ? "あ" : "A") + "")) set_data_dev(t8, t8_value);

    			if (dirty & /*languageSelected*/ 1) {
    				toggle_class(div4, "layer4-japanese", /*languageSelected*/ ctx[0] === "japanese");
    			}

    			if (dirty & /*languageSelected*/ 1) {
    				toggle_class(div4, "layer4-english", /*languageSelected*/ ctx[0] === "english");
    			}

    			if (dirty & /*languageSelected*/ 1 && t10_value !== (t10_value = (/*languageSelected*/ ctx[0] === "japanese" ? "A" : "あ") + "")) set_data_dev(t10, t10_value);

    			if (dirty & /*languageSelected*/ 1) {
    				toggle_class(div5, "layer5-japanese", /*languageSelected*/ ctx[0] === "japanese");
    			}

    			if (dirty & /*languageSelected*/ 1) {
    				toggle_class(div5, "layer5-english", /*languageSelected*/ ctx[0] === "english");
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div7);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$d.name,
    		type: "slot",
    		source: "(13:4) <WindowElement         width={266}         height={273}         parallax=\\\"very-slow\\\"         background=\\\".C96161\\\"         title=\\\"LANGUAGE\\\"         id={13}         enlargeable={false}     >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$i(ctx) {
    	let div;
    	let windowelement;
    	let current;

    	windowelement = new WindowElement({
    			props: {
    				width: 266,
    				height: 273,
    				parallax: "very-slow",
    				background: ".C96161",
    				title: "LANGUAGE",
    				id: 13,
    				enlargeable: false,
    				$$slots: { default: [create_default_slot$d] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(windowelement.$$.fragment);
    			attr_dev(div, "class", "wrapper grid-area svelte-4owd20");
    			add_location(div, file$h, 11, 0, 254);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(windowelement, div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const windowelement_changes = {};

    			if (dirty & /*$$scope, languageSelected*/ 5) {
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
    			if (detaching) detach_dev(div);
    			destroy_component(windowelement);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$i.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$i($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("LanguageWindow", slots, []);
    	let languageSelected = "english";

    	function changeLanguage() {
    		$$invalidate(0, languageSelected = languageSelected === "english" ? "japanese" : "english");
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<LanguageWindow> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		WindowElement,
    		languageSelected,
    		changeLanguage
    	});

    	$$self.$inject_state = $$props => {
    		if ("languageSelected" in $$props) $$invalidate(0, languageSelected = $$props.languageSelected);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [languageSelected, changeLanguage];
    }

    class LanguageWindow extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$i, create_fragment$i, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "LanguageWindow",
    			options,
    			id: create_fragment$i.name
    		});
    	}
    }

    /* src/Windows/ContactWindow.svelte generated by Svelte v3.32.1 */

    const { Error: Error_1, console: console_1 } = globals;
    const file$i = "src/Windows/ContactWindow.svelte";

    // (372:12) {:else}
    function create_else_block$1(ctx) {
    	let div2;
    	let div1;
    	let div0;
    	let img;
    	let img_src_value;
    	let img_alt_value;
    	let t0;
    	let p;

    	let t1_value = (/*success*/ ctx[7]
    	? "Thank's! I'll get back to you as soon as possible."
    	: "Oops, something went terribly wrong... Please try again or use your own e-mail client") + "";

    	let t1;
    	let div2_transition;
    	let current;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			img = element("img");
    			t0 = space();
    			p = element("p");
    			t1 = text(t1_value);

    			if (img.src !== (img_src_value = /*view*/ ctx[4] === "moritz@mortimerbaltus.com"
    			? moritzmoji
    			: theomoji)) attr_dev(img, "src", img_src_value);

    			attr_dev(img, "alt", img_alt_value = /*view*/ ctx[4] === "moritz@mortimerbaltus.com"
    			? "Moritz Mortimer Müller as a Memoji"
    			: "Theodor Baltus Steiner as a Memoji");

    			attr_dev(img, "class", "message-img svelte-rtrn63");
    			attr_dev(img, "draggable", "false");
    			add_location(img, file$i, 379, 28, 16354);
    			attr_dev(p, "class", "message-bubble svelte-rtrn63");
    			add_location(p, file$i, 392, 28, 17056);
    			attr_dev(div0, "class", "message svelte-rtrn63");
    			add_location(div0, file$i, 378, 24, 16304);
    			attr_dev(div1, "class", "fixed svelte-rtrn63");
    			add_location(div1, file$i, 377, 20, 16260);
    			attr_dev(div2, "class", "message-container svelte-rtrn63");
    			add_location(div2, file$i, 372, 16, 16090);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div1);
    			append_dev(div1, div0);
    			append_dev(div0, img);
    			append_dev(div0, t0);
    			append_dev(div0, p);
    			append_dev(p, t1);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(img, "click", /*click_handler_8*/ ctx[30], false, false, false),
    					action_destroyer(/*resetView*/ ctx[12].call(null, div2))
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (!current || dirty[0] & /*view*/ 16 && img.src !== (img_src_value = /*view*/ ctx[4] === "moritz@mortimerbaltus.com"
    			? moritzmoji
    			: theomoji)) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (!current || dirty[0] & /*view*/ 16 && img_alt_value !== (img_alt_value = /*view*/ ctx[4] === "moritz@mortimerbaltus.com"
    			? "Moritz Mortimer Müller as a Memoji"
    			: "Theodor Baltus Steiner as a Memoji")) {
    				attr_dev(img, "alt", img_alt_value);
    			}

    			if ((!current || dirty[0] & /*success*/ 128) && t1_value !== (t1_value = (/*success*/ ctx[7]
    			? "Thank's! I'll get back to you as soon as possible."
    			: "Oops, something went terribly wrong... Please try again or use your own e-mail client") + "")) set_data_dev(t1, t1_value);
    		},
    		i: function intro(local) {
    			if (current) return;

    			add_render_callback(() => {
    				if (!div2_transition) div2_transition = create_bidirectional_transition(div2, /*horizontalSlide*/ ctx[11], {}, true);
    				div2_transition.run(1);
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			if (!div2_transition) div2_transition = create_bidirectional_transition(div2, /*horizontalSlide*/ ctx[11], {}, false);
    			div2_transition.run(0);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			if (detaching && div2_transition) div2_transition.end();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(372:12) {:else}",
    		ctx
    	});

    	return block;
    }

    // (291:47) 
    function create_if_block_4(ctx) {
    	let div1;
    	let form;
    	let input;
    	let input_placeholder_value;
    	let t0;
    	let textarea;
    	let t1;
    	let div0;
    	let button0;
    	let svg;
    	let title;
    	let t2;
    	let g1;
    	let g0;
    	let line0;
    	let line1;
    	let t3;
    	let button1;
    	let t4_value = (/*isLoading*/ ctx[8] ? "Sending..." : "Send Email") + "";
    	let t4;
    	let div1_transition;
    	let current;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			form = element("form");
    			input = element("input");
    			t0 = space();
    			textarea = element("textarea");
    			t1 = space();
    			div0 = element("div");
    			button0 = element("button");
    			svg = svg_element("svg");
    			title = svg_element("title");
    			t2 = text("Group 2");
    			g1 = svg_element("g");
    			g0 = svg_element("g");
    			line0 = svg_element("line");
    			line1 = svg_element("line");
    			t3 = space();
    			button1 = element("button");
    			t4 = text(t4_value);
    			attr_dev(input, "type", "text");
    			attr_dev(input, "name", "email");
    			attr_dev(input, "class", "user-email svelte-rtrn63");

    			attr_dev(input, "placeholder", input_placeholder_value = /*emailTouched*/ ctx[6] && !/*isEmailValid*/ ctx[2]
    			? "Please enter a valid Email address"
    			: "Your Email");

    			toggle_class(input, "invalid-email", /*emailTouched*/ ctx[6] && !/*isEmailValid*/ ctx[2]);
    			add_location(input, file$i, 293, 24, 12202);
    			attr_dev(textarea, "cols", "30");
    			attr_dev(textarea, "rows", "10");
    			attr_dev(textarea, "class", "user-body svelte-rtrn63");
    			attr_dev(textarea, "name", "message");
    			attr_dev(textarea, "placeholder", "Your Message");
    			add_location(textarea, file$i, 305, 24, 12843);
    			add_location(title, file$i, 341, 36, 14586);
    			attr_dev(line0, "x2", "22");
    			attr_dev(line0, "y2", "22");
    			attr_dev(line0, "class", "svelte-rtrn63");
    			add_location(line0, file$i, 347, 44, 14939);
    			attr_dev(line1, "transform", "translate(11 11) scale(-1 1) translate(-11 -11)");
    			attr_dev(line1, "x2", "22");
    			attr_dev(line1, "y2", "22");
    			attr_dev(line1, "class", "svelte-rtrn63");
    			add_location(line1, file$i, 348, 44, 15008);
    			attr_dev(g0, "transform", "translate(1 1)");
    			attr_dev(g0, "stroke", "#fff");
    			add_location(g0, file$i, 343, 40, 14721);
    			attr_dev(g1, "fill", "none");
    			attr_dev(g1, "fill-rule", "evenodd");
    			add_location(g1, file$i, 342, 36, 14645);
    			attr_dev(svg, "version", "1.1");
    			attr_dev(svg, "viewBox", "0 0 24 24");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "class", "svelte-rtrn63");
    			add_location(svg, file$i, 336, 32, 14334);
    			attr_dev(button0, "ontouchstart", "");
    			attr_dev(button0, "class", "cancel-button svelte-rtrn63");
    			add_location(button0, file$i, 314, 28, 13233);
    			attr_dev(button1, "class", "action-button svelte-rtrn63");
    			attr_dev(button1, "type", "submit");
    			attr_dev(button1, "ontouchstart", "");
    			button1.disabled = /*disabled*/ ctx[9];
    			toggle_class(button1, "disabled", !/*isFormValid*/ ctx[3]);
    			add_location(button1, file$i, 357, 28, 15472);
    			attr_dev(div0, "class", "button-container svelte-rtrn63");
    			add_location(div0, file$i, 313, 24, 13174);
    			attr_dev(form, "method", "POST");
    			attr_dev(form, "class", "fixed svelte-rtrn63");
    			add_location(form, file$i, 292, 20, 12118);
    			attr_dev(div1, "class", "email-container svelte-rtrn63");
    			add_location(div1, file$i, 291, 16, 12041);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, form);
    			append_dev(form, input);
    			set_input_value(input, /*userEmail*/ ctx[0]);
    			append_dev(form, t0);
    			append_dev(form, textarea);
    			set_input_value(textarea, /*userBody*/ ctx[1]);
    			append_dev(form, t1);
    			append_dev(form, div0);
    			append_dev(div0, button0);
    			append_dev(button0, svg);
    			append_dev(svg, title);
    			append_dev(title, t2);
    			append_dev(svg, g1);
    			append_dev(g1, g0);
    			append_dev(g0, line0);
    			append_dev(g0, line1);
    			append_dev(div0, t3);
    			append_dev(div0, button1);
    			append_dev(button1, t4);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "input", /*input_input_handler*/ ctx[25]),
    					listen_dev(input, "blur", /*blur_handler*/ ctx[26], false, false, false),
    					listen_dev(input, "focus", /*focus_handler*/ ctx[27], false, false, false),
    					listen_dev(textarea, "input", /*textarea_input_handler*/ ctx[28]),
    					listen_dev(button0, "click", /*click_handler_7*/ ctx[29], false, false, false),
    					listen_dev(button1, "click", /*submitForm*/ ctx[15], false, false, false),
    					listen_dev(form, "submit", prevent_default(/*submit_handler*/ ctx[17]), false, true, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (!current || dirty[0] & /*emailTouched, isEmailValid*/ 68 && input_placeholder_value !== (input_placeholder_value = /*emailTouched*/ ctx[6] && !/*isEmailValid*/ ctx[2]
    			? "Please enter a valid Email address"
    			: "Your Email")) {
    				attr_dev(input, "placeholder", input_placeholder_value);
    			}

    			if (dirty[0] & /*userEmail*/ 1 && input.value !== /*userEmail*/ ctx[0]) {
    				set_input_value(input, /*userEmail*/ ctx[0]);
    			}

    			if (dirty[0] & /*emailTouched, isEmailValid*/ 68) {
    				toggle_class(input, "invalid-email", /*emailTouched*/ ctx[6] && !/*isEmailValid*/ ctx[2]);
    			}

    			if (dirty[0] & /*userBody*/ 2) {
    				set_input_value(textarea, /*userBody*/ ctx[1]);
    			}

    			if ((!current || dirty[0] & /*isLoading*/ 256) && t4_value !== (t4_value = (/*isLoading*/ ctx[8] ? "Sending..." : "Send Email") + "")) set_data_dev(t4, t4_value);

    			if (!current || dirty[0] & /*disabled*/ 512) {
    				prop_dev(button1, "disabled", /*disabled*/ ctx[9]);
    			}

    			if (dirty[0] & /*isFormValid*/ 8) {
    				toggle_class(button1, "disabled", !/*isFormValid*/ ctx[3]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			add_render_callback(() => {
    				if (!div1_transition) div1_transition = create_bidirectional_transition(div1, /*horizontalSlide*/ ctx[11], {}, true);
    				div1_transition.run(1);
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			if (!div1_transition) div1_transition = create_bidirectional_transition(div1, /*horizontalSlide*/ ctx[11], {}, false);
    			div1_transition.run(0);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (detaching && div1_transition) div1_transition.end();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4.name,
    		type: "if",
    		source: "(291:47) ",
    		ctx
    	});

    	return block;
    }

    // (172:59) 
    function create_if_block_1$2(ctx) {
    	let div5;
    	let div4;
    	let div0;
    	let img;
    	let img_src_value;
    	let img_alt_value;
    	let t0;
    	let p;

    	let t1_value = (/*view*/ ctx[4] === "moritz"
    	? "Hi, nice to meet you!"
    	: "Hey, I'm Theo!") + "";

    	let t1;
    	let t2;
    	let div1;
    	let t3;
    	let div2;
    	let t4;
    	let div3;
    	let button0;
    	let svg;
    	let title;
    	let t5;
    	let g1;
    	let g0;
    	let line0;
    	let line1;
    	let t6;
    	let button1;
    	let div5_transition;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block0 = /*messageCounter*/ ctx[5] > 0 && create_if_block_3(ctx);
    	let if_block1 = /*messageCounter*/ ctx[5] > 1 && create_if_block_2$1(ctx);

    	const block = {
    		c: function create() {
    			div5 = element("div");
    			div4 = element("div");
    			div0 = element("div");
    			img = element("img");
    			t0 = space();
    			p = element("p");
    			t1 = text(t1_value);
    			t2 = space();
    			div1 = element("div");
    			if (if_block0) if_block0.c();
    			t3 = space();
    			div2 = element("div");
    			if (if_block1) if_block1.c();
    			t4 = space();
    			div3 = element("div");
    			button0 = element("button");
    			svg = svg_element("svg");
    			title = svg_element("title");
    			t5 = text("Group 2");
    			g1 = svg_element("g");
    			g0 = svg_element("g");
    			line0 = svg_element("line");
    			line1 = svg_element("line");
    			t6 = space();
    			button1 = element("button");
    			button1.textContent = "Compose Email";
    			if (img.src !== (img_src_value = /*view*/ ctx[4] === "moritz" ? moritzmoji : theomoji)) attr_dev(img, "src", img_src_value);

    			attr_dev(img, "alt", img_alt_value = /*view*/ ctx[4] === "moritz"
    			? "Moritz Mortimer Müller as a Memoji"
    			: "Theodor Baltus Steiner as a Memoji");

    			attr_dev(img, "class", "message-img svelte-rtrn63");
    			attr_dev(img, "draggable", "false");
    			toggle_class(img, "hidden", /*messageCounter*/ ctx[5] != 0);
    			add_location(img, file$i, 175, 28, 5809);
    			set_style(p, "height", "38px");
    			attr_dev(p, "class", "message-bubble svelte-rtrn63");
    			add_location(p, file$i, 187, 28, 6466);
    			attr_dev(div0, "class", "message svelte-rtrn63");
    			set_style(div0, "height", "54px");
    			add_location(div0, file$i, 174, 24, 5737);
    			attr_dev(div1, "class", "message long-message svelte-rtrn63");
    			set_style(div1, "height", "95px");
    			add_location(div1, file$i, 197, 24, 6919);
    			attr_dev(div2, "class", "message svelte-rtrn63");
    			set_style(div2, "height", "54px");
    			add_location(div2, file$i, 224, 24, 8568);
    			add_location(title, file$i, 259, 36, 10412);
    			attr_dev(line0, "x2", "22");
    			attr_dev(line0, "y2", "22");
    			attr_dev(line0, "class", "svelte-rtrn63");
    			add_location(line0, file$i, 265, 44, 10765);
    			attr_dev(line1, "transform", "translate(11 11) scale(-1 1) translate(-11 -11)");
    			attr_dev(line1, "x2", "22");
    			attr_dev(line1, "y2", "22");
    			attr_dev(line1, "class", "svelte-rtrn63");
    			add_location(line1, file$i, 266, 44, 10834);
    			attr_dev(g0, "transform", "translate(1 1)");
    			attr_dev(g0, "stroke", "#fff");
    			add_location(g0, file$i, 261, 40, 10547);
    			attr_dev(g1, "fill", "none");
    			attr_dev(g1, "fill-rule", "evenodd");
    			add_location(g1, file$i, 260, 36, 10471);
    			attr_dev(svg, "version", "1.1");
    			attr_dev(svg, "viewBox", "0 0 24 24");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "class", "svelte-rtrn63");
    			add_location(svg, file$i, 254, 32, 10160);
    			attr_dev(button0, "ontouchstart", "");
    			attr_dev(button0, "class", "cancel-button svelte-rtrn63");
    			add_location(button0, file$i, 247, 28, 9850);
    			attr_dev(button1, "class", "action-button svelte-rtrn63");
    			attr_dev(button1, "ontouchstart", "");
    			add_location(button1, file$i, 275, 28, 11298);
    			attr_dev(div3, "class", "button-container svelte-rtrn63");
    			add_location(div3, file$i, 246, 24, 9791);
    			attr_dev(div4, "class", "fixed svelte-rtrn63");
    			add_location(div4, file$i, 173, 20, 5693);
    			attr_dev(div5, "class", "message-container svelte-rtrn63");
    			add_location(div5, file$i, 172, 16, 5614);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div5, anchor);
    			append_dev(div5, div4);
    			append_dev(div4, div0);
    			append_dev(div0, img);
    			append_dev(div0, t0);
    			append_dev(div0, p);
    			append_dev(p, t1);
    			append_dev(div4, t2);
    			append_dev(div4, div1);
    			if (if_block0) if_block0.m(div1, null);
    			append_dev(div4, t3);
    			append_dev(div4, div2);
    			if (if_block1) if_block1.m(div2, null);
    			append_dev(div4, t4);
    			append_dev(div4, div3);
    			append_dev(div3, button0);
    			append_dev(button0, svg);
    			append_dev(svg, title);
    			append_dev(title, t5);
    			append_dev(svg, g1);
    			append_dev(g1, g0);
    			append_dev(g0, line0);
    			append_dev(g0, line1);
    			append_dev(div3, t6);
    			append_dev(div3, button1);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(img, "click", /*click_handler_2*/ ctx[20], false, false, false),
    					action_destroyer(/*startMessageTimer*/ ctx[13].call(null, p)),
    					listen_dev(button0, "click", /*click_handler_5*/ ctx[23], false, false, false),
    					listen_dev(button1, "click", /*click_handler_6*/ ctx[24], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (!current || dirty[0] & /*view*/ 16 && img.src !== (img_src_value = /*view*/ ctx[4] === "moritz" ? moritzmoji : theomoji)) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (!current || dirty[0] & /*view*/ 16 && img_alt_value !== (img_alt_value = /*view*/ ctx[4] === "moritz"
    			? "Moritz Mortimer Müller as a Memoji"
    			: "Theodor Baltus Steiner as a Memoji")) {
    				attr_dev(img, "alt", img_alt_value);
    			}

    			if (dirty[0] & /*messageCounter*/ 32) {
    				toggle_class(img, "hidden", /*messageCounter*/ ctx[5] != 0);
    			}

    			if ((!current || dirty[0] & /*view*/ 16) && t1_value !== (t1_value = (/*view*/ ctx[4] === "moritz"
    			? "Hi, nice to meet you!"
    			: "Hey, I'm Theo!") + "")) set_data_dev(t1, t1_value);

    			if (/*messageCounter*/ ctx[5] > 0) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_3(ctx);
    					if_block0.c();
    					if_block0.m(div1, null);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (/*messageCounter*/ ctx[5] > 1) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block_2$1(ctx);
    					if_block1.c();
    					if_block1.m(div2, null);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			add_render_callback(() => {
    				if (!div5_transition) div5_transition = create_bidirectional_transition(div5, /*horizontalSlide*/ ctx[11], {}, true);
    				div5_transition.run(1);
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			if (!div5_transition) div5_transition = create_bidirectional_transition(div5, /*horizontalSlide*/ ctx[11], {}, false);
    			div5_transition.run(0);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div5);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    			if (detaching && div5_transition) div5_transition.end();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$2.name,
    		type: "if",
    		source: "(172:59) ",
    		ctx
    	});

    	return block;
    }

    // (134:12) {#if view === "overview"}
    function create_if_block$4(ctx) {
    	let div1;
    	let div0;
    	let h1;
    	let t0;
    	let br;
    	let t1;
    	let t2;
    	let hr0;
    	let t3;
    	let button0;
    	let img0;
    	let img0_src_value;
    	let t4;
    	let p0;
    	let t6;
    	let hr1;
    	let t7;
    	let button1;
    	let img1;
    	let img1_src_value;
    	let t8;
    	let p1;
    	let div1_transition;
    	let current;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			h1 = element("h1");
    			t0 = text("GET IN ");
    			br = element("br");
    			t1 = text("TOUCH");
    			t2 = space();
    			hr0 = element("hr");
    			t3 = space();
    			button0 = element("button");
    			img0 = element("img");
    			t4 = space();
    			p0 = element("p");
    			p0.textContent = "Moritz Mortimer (DE)";
    			t6 = space();
    			hr1 = element("hr");
    			t7 = space();
    			button1 = element("button");
    			img1 = element("img");
    			t8 = space();
    			p1 = element("p");
    			p1.textContent = "Theodor Baltus (JP)";
    			add_location(br, file$i, 137, 35, 4193);
    			attr_dev(h1, "class", "svelte-rtrn63");
    			add_location(h1, file$i, 136, 24, 4153);
    			add_location(hr0, file$i, 139, 24, 4259);
    			if (img0.src !== (img0_src_value = moritzmoji)) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "alt", "Moritz Mortimer Müller as a Memoji");
    			attr_dev(img0, "draggable", "false");
    			attr_dev(img0, "class", "svelte-rtrn63");
    			add_location(img0, file$i, 147, 28, 4566);
    			attr_dev(p0, "class", "svelte-rtrn63");
    			add_location(p0, file$i, 152, 28, 4802);
    			attr_dev(button0, "ontouchstart", "");
    			attr_dev(button0, "class", "contact svelte-rtrn63");
    			add_location(button0, file$i, 140, 24, 4290);
    			add_location(hr1, file$i, 154, 24, 4888);
    			if (img1.src !== (img1_src_value = theomoji)) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "alt", "Theodor Baltus Steiner as a Memoji");
    			attr_dev(img1, "draggable", "false");
    			attr_dev(img1, "class", "svelte-rtrn63");
    			add_location(img1, file$i, 162, 28, 5193);
    			attr_dev(p1, "class", "svelte-rtrn63");
    			add_location(p1, file$i, 167, 28, 5427);
    			attr_dev(button1, "ontouchstart", "");
    			attr_dev(button1, "class", "contact svelte-rtrn63");
    			add_location(button1, file$i, 155, 24, 4919);
    			attr_dev(div0, "class", "fixed svelte-rtrn63");
    			add_location(div0, file$i, 135, 20, 4109);
    			attr_dev(div1, "class", "contact-container svelte-rtrn63");
    			add_location(div1, file$i, 134, 16, 4030);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, h1);
    			append_dev(h1, t0);
    			append_dev(h1, br);
    			append_dev(h1, t1);
    			append_dev(div0, t2);
    			append_dev(div0, hr0);
    			append_dev(div0, t3);
    			append_dev(div0, button0);
    			append_dev(button0, img0);
    			append_dev(button0, t4);
    			append_dev(button0, p0);
    			append_dev(div0, t6);
    			append_dev(div0, hr1);
    			append_dev(div0, t7);
    			append_dev(div0, button1);
    			append_dev(button1, img1);
    			append_dev(button1, t8);
    			append_dev(button1, p1);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", /*click_handler*/ ctx[18], false, false, false),
    					listen_dev(button1, "click", /*click_handler_1*/ ctx[19], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;

    			add_render_callback(() => {
    				if (!div1_transition) div1_transition = create_bidirectional_transition(div1, /*horizontalSlide*/ ctx[11], {}, true);
    				div1_transition.run(1);
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			if (!div1_transition) div1_transition = create_bidirectional_transition(div1, /*horizontalSlide*/ ctx[11], {}, false);
    			div1_transition.run(0);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (detaching && div1_transition) div1_transition.end();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$4.name,
    		type: "if",
    		source: "(134:12) {#if view === \\\"overview\\\"}",
    		ctx
    	});

    	return block;
    }

    // (199:28) {#if messageCounter > 0}
    function create_if_block_3(ctx) {
    	let img;
    	let img_src_value;
    	let img_alt_value;
    	let t0;
    	let p;

    	let t1_value = (/*view*/ ctx[4] === "moritz"
    	? "You can send me a message right from this window or shoot me an email the old fashioned way at moritz@mortimerbaltus.de"
    	: "If you wanna talk tech, ask me anything or just need someone to share memes with... hit me up at theo@mortimerbaltus.de") + "";

    	let t1;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			img = element("img");
    			t0 = space();
    			p = element("p");
    			t1 = text(t1_value);
    			if (img.src !== (img_src_value = /*view*/ ctx[4] === "moritz" ? moritzmoji : theomoji)) attr_dev(img, "src", img_src_value);

    			attr_dev(img, "alt", img_alt_value = /*view*/ ctx[4] === "moritz"
    			? "Moritz Mortimer Müller as a Memoji"
    			: "Theodor Baltus Steiner as a Memoji");

    			attr_dev(img, "class", "message-img svelte-rtrn63");
    			attr_dev(img, "draggable", "false");
    			toggle_class(img, "hidden", /*messageCounter*/ ctx[5] != 1);
    			add_location(img, file$i, 199, 32, 7061);
    			set_style(p, "height", "95px");
    			attr_dev(p, "class", "message-bubble svelte-rtrn63");
    			add_location(p, file$i, 213, 32, 7846);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, p, anchor);
    			append_dev(p, t1);

    			if (!mounted) {
    				dispose = [
    					listen_dev(img, "click", /*click_handler_3*/ ctx[21], false, false, false),
    					action_destroyer(/*startMessageTimer*/ ctx[13].call(null, p))
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*view*/ 16 && img.src !== (img_src_value = /*view*/ ctx[4] === "moritz" ? moritzmoji : theomoji)) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty[0] & /*view*/ 16 && img_alt_value !== (img_alt_value = /*view*/ ctx[4] === "moritz"
    			? "Moritz Mortimer Müller as a Memoji"
    			: "Theodor Baltus Steiner as a Memoji")) {
    				attr_dev(img, "alt", img_alt_value);
    			}

    			if (dirty[0] & /*messageCounter*/ 32) {
    				toggle_class(img, "hidden", /*messageCounter*/ ctx[5] != 1);
    			}

    			if (dirty[0] & /*view*/ 16 && t1_value !== (t1_value = (/*view*/ ctx[4] === "moritz"
    			? "You can send me a message right from this window or shoot me an email the old fashioned way at moritz@mortimerbaltus.de"
    			: "If you wanna talk tech, ask me anything or just need someone to share memes with... hit me up at theo@mortimerbaltus.de") + "")) set_data_dev(t1, t1_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(p);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(199:28) {#if messageCounter > 0}",
    		ctx
    	});

    	return block;
    }

    // (226:28) {#if messageCounter > 1}
    function create_if_block_2$1(ctx) {
    	let img;
    	let img_src_value;
    	let img_alt_value;
    	let t0;
    	let p;

    	let t1_value = (/*view*/ ctx[4] === "moritz"
    	? "I can't wait to hear from you!"
    	: "I'm excited to hear from you!") + "";

    	let t1;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			img = element("img");
    			t0 = space();
    			p = element("p");
    			t1 = text(t1_value);
    			if (img.src !== (img_src_value = /*view*/ ctx[4] === "moritz" ? moritzmoji : theomoji)) attr_dev(img, "src", img_src_value);

    			attr_dev(img, "alt", img_alt_value = /*view*/ ctx[4] === "moritz"
    			? "Moritz Mortimer Müller as a Memoji"
    			: "Theodor Baltus Steiner as a Memoji");

    			attr_dev(img, "class", "message-img svelte-rtrn63");
    			attr_dev(img, "draggable", "false");
    			add_location(img, file$i, 226, 32, 8697);
    			set_style(p, "height", "38px");
    			attr_dev(p, "class", "message-bubble svelte-rtrn63");
    			add_location(p, file$i, 239, 32, 9411);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, p, anchor);
    			append_dev(p, t1);

    			if (!mounted) {
    				dispose = listen_dev(img, "click", /*click_handler_4*/ ctx[22], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*view*/ 16 && img.src !== (img_src_value = /*view*/ ctx[4] === "moritz" ? moritzmoji : theomoji)) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty[0] & /*view*/ 16 && img_alt_value !== (img_alt_value = /*view*/ ctx[4] === "moritz"
    			? "Moritz Mortimer Müller as a Memoji"
    			: "Theodor Baltus Steiner as a Memoji")) {
    				attr_dev(img, "alt", img_alt_value);
    			}

    			if (dirty[0] & /*view*/ 16 && t1_value !== (t1_value = (/*view*/ ctx[4] === "moritz"
    			? "I can't wait to hear from you!"
    			: "I'm excited to hear from you!") + "")) set_data_dev(t1, t1_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(p);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$1.name,
    		type: "if",
    		source: "(226:28) {#if messageCounter > 1}",
    		ctx
    	});

    	return block;
    }

    // (124:4) <WindowElement         width={378}         height={313}         parallax="very-slow"         background="#EFEFEF"         title="CONTACT"         id={14}         enlargeable={false}     >
    function create_default_slot$e(ctx) {
    	let div;
    	let show_if;
    	let current_block_type_index;
    	let if_block;
    	let current;
    	const if_block_creators = [create_if_block$4, create_if_block_1$2, create_if_block_4, create_else_block$1];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*view*/ ctx[4] === "overview") return 0;
    		if (/*view*/ ctx[4] === "theo" || /*view*/ ctx[4] === "moritz") return 1;
    		if (dirty[0] & /*view*/ 16) show_if = !!/*view*/ ctx[4].includes("mailto:");
    		if (show_if) return 2;
    		return 3;
    	}

    	current_block_type_index = select_block_type(ctx, [-1]);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if_block.c();
    			attr_dev(div, "class", "container svelte-rtrn63");
    			toggle_class(div, "inverse-slide", /*view*/ ctx[4] === "overview");
    			add_location(div, file$i, 132, 8, 3910);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if_blocks[current_block_type_index].m(div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx, dirty);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(div, null);
    			}

    			if (dirty[0] & /*view*/ 16) {
    				toggle_class(div, "inverse-slide", /*view*/ ctx[4] === "overview");
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
    			if (detaching) detach_dev(div);
    			if_blocks[current_block_type_index].d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$e.name,
    		type: "slot",
    		source: "(124:4) <WindowElement         width={378}         height={313}         parallax=\\\"very-slow\\\"         background=\\\"#EFEFEF\\\"         title=\\\"CONTACT\\\"         id={14}         enlargeable={false}     >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$j(ctx) {
    	let div;
    	let windowelement;
    	let current;

    	windowelement = new WindowElement({
    			props: {
    				width: 378,
    				height: 313,
    				parallax: "very-slow",
    				background: "#EFEFEF",
    				title: "CONTACT",
    				id: 14,
    				enlargeable: false,
    				$$slots: { default: [create_default_slot$e] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(windowelement.$$.fragment);
    			attr_dev(div, "class", "wrapper grid-area svelte-rtrn63");
    			add_location(div, file$i, 122, 0, 3678);
    		},
    		l: function claim(nodes) {
    			throw new Error_1("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(windowelement, div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const windowelement_changes = {};

    			if (dirty[0] & /*view, messageCounter, disabled, isFormValid, isLoading, userEmail, userBody, emailTouched, isEmailValid, success*/ 1023 | dirty[1] & /*$$scope*/ 2) {
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
    			if (detaching) detach_dev(div);
    			destroy_component(windowelement);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$j.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const moritzmoji = "/images/moritzmemoji.jpg";
    const theomoji = "/images/theomemoji.png";

    function isEmpty(body) {
    	return body.trim().length === 0;
    }

    function isValidEmail(email) {
    	return new RegExp("[a-z0-9!#$%&' * +/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?").test(email);
    }

    function instance$j($$self, $$props, $$invalidate) {
    	let isEmailValid;
    	let isBodyValid;
    	let isFormValid;
    	let disabled;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("ContactWindow", slots, []);
    	let view = "overview";
    	let messageCounter = 0;
    	let userEmail = "";
    	let userBody = "";
    	let emailTouched = false;
    	let success = false;
    	let isLoading = false;

    	function resetEmail() {
    		$$invalidate(0, userEmail = "");
    		$$invalidate(1, userBody = "");
    		$$invalidate(6, emailTouched = false);
    	}

    	function horizontalSlide(node, { delay = 0, duration = 400, easing = cubicOut, inverse = 1 }) {
    		const style = getComputedStyle(node);
    		const opacity = +style.opacity;
    		const width = parseFloat(style.width);
    		const paddingLeft = parseFloat(style.paddingLeft);
    		const paddingRight = parseFloat(style.paddingRight);
    		const marginLeft = parseFloat(style.marginLeft);
    		const marginRight = parseFloat(style.marginRight);
    		const borderLeftWidth = parseFloat(style.borderLeftWidth);
    		const borderRightWidth = parseFloat(style.borderRightWidth);

    		return {
    			delay,
    			duration,
    			easing,
    			css: t => `overflow: hidden;` + `opacity: ${Math.min(t * 20, 1) * opacity};` + `width: ${t * width}px;` + `padding-left: ${t * paddingLeft}px;` + `padding-right: ${t * paddingRight}px;` + `margin-left: ${t * marginLeft}px;` + `margin-right: ${t * marginRight}px;` + `border-left-width: ${t * borderLeftWidth}px;` + `border-right-width: ${t * borderRightWidth}px;`
    		};
    	}

    	function resetView() {
    		setTimeout(
    			() => {
    				$$invalidate(4, view = "overview");
    			},
    			5000
    		);
    	}

    	let messageTimer;

    	function startMessageTimer() {
    		clearTimeout(messageTimer);

    		messageTimer = setTimeout(
    			() => {
    				$$invalidate(5, messageCounter++, messageCounter);
    			},
    			1500
    		);
    	}

    	function resetChatView() {
    		clearTimeout(messageTimer);
    		$$invalidate(4, view = view === "moritz" || view === "theo" ? "overview" : view);
    		$$invalidate(5, messageCounter = 0);
    	}

    	function submitForm() {
    		$$invalidate(8, isLoading = true);

    		fetch("/api/sendmail", {
    			method: "POST",
    			body: JSON.stringify({
    				userEmail,
    				recipient: view.substring(7),
    				message: userBody
    			}),
    			headers: {
    				Accept: "application/json",
    				"Content-Type": "application/json"
    			}
    		}).then(res => {
    			if (!res.ok) {
    				throw new Error("Failed to send email");
    			}

    			$$invalidate(7, success = true);
    			$$invalidate(8, isLoading = false);
    			resetEmail();
    			$$invalidate(4, view = view.substring(7));
    		}).catch(err => {
    			console.log(err);
    			$$invalidate(7, success = false);
    			$$invalidate(8, isLoading = false);
    			$$invalidate(4, view = view.substring(7));
    		});
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn(`<ContactWindow> was created with unknown prop '${key}'`);
    	});

    	function submit_handler(event) {
    		bubble($$self, event);
    	}

    	const click_handler = () => {
    		$$invalidate(4, view = "moritz");
    	};

    	const click_handler_1 = () => {
    		$$invalidate(4, view = "theo");
    	};

    	const click_handler_2 = () => {
    		resetChatView();
    	};

    	const click_handler_3 = () => {
    		resetChatView();
    	};

    	const click_handler_4 = () => {
    		resetChatView();
    	};

    	const click_handler_5 = () => {
    		resetChatView();
    	};

    	const click_handler_6 = () => {
    		$$invalidate(4, view = `mailto:${view === "moritz"
		? "moritz@mortimerbaltus.com"
		: "theo@mortimerbaltus.com"}`);

    		resetChatView();
    	};

    	function input_input_handler() {
    		userEmail = this.value;
    		$$invalidate(0, userEmail);
    	}

    	const blur_handler = () => $$invalidate(6, emailTouched = true);
    	const focus_handler = () => $$invalidate(6, emailTouched = false);

    	function textarea_input_handler() {
    		userBody = this.value;
    		$$invalidate(1, userBody);
    	}

    	const click_handler_7 = () => {
    		if (!isEmpty(userEmail) && !isEmpty(userBody)) {
    			if (confirm("Do you really want to discard your Message?")) {
    				$$invalidate(4, view = "overview");
    				resetEmail();
    			}
    		} else {
    			$$invalidate(4, view = "overview");
    			resetEmail();
    		}
    	};

    	const click_handler_8 = () => {
    		$$invalidate(4, view = "overview");
    	};

    	$$self.$capture_state = () => ({
    		WindowElement,
    		cubicOut,
    		view,
    		messageCounter,
    		userEmail,
    		userBody,
    		emailTouched,
    		success,
    		isLoading,
    		isEmpty,
    		isValidEmail,
    		resetEmail,
    		horizontalSlide,
    		moritzmoji,
    		theomoji,
    		resetView,
    		messageTimer,
    		startMessageTimer,
    		resetChatView,
    		submitForm,
    		isEmailValid,
    		isBodyValid,
    		isFormValid,
    		disabled
    	});

    	$$self.$inject_state = $$props => {
    		if ("view" in $$props) $$invalidate(4, view = $$props.view);
    		if ("messageCounter" in $$props) $$invalidate(5, messageCounter = $$props.messageCounter);
    		if ("userEmail" in $$props) $$invalidate(0, userEmail = $$props.userEmail);
    		if ("userBody" in $$props) $$invalidate(1, userBody = $$props.userBody);
    		if ("emailTouched" in $$props) $$invalidate(6, emailTouched = $$props.emailTouched);
    		if ("success" in $$props) $$invalidate(7, success = $$props.success);
    		if ("isLoading" in $$props) $$invalidate(8, isLoading = $$props.isLoading);
    		if ("messageTimer" in $$props) messageTimer = $$props.messageTimer;
    		if ("isEmailValid" in $$props) $$invalidate(2, isEmailValid = $$props.isEmailValid);
    		if ("isBodyValid" in $$props) $$invalidate(16, isBodyValid = $$props.isBodyValid);
    		if ("isFormValid" in $$props) $$invalidate(3, isFormValid = $$props.isFormValid);
    		if ("disabled" in $$props) $$invalidate(9, disabled = $$props.disabled);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*userEmail*/ 1) {
    			$$invalidate(2, isEmailValid = isValidEmail(userEmail) && !isEmpty(userEmail));
    		}

    		if ($$self.$$.dirty[0] & /*userBody*/ 2) {
    			$$invalidate(16, isBodyValid = !isEmpty(userBody));
    		}

    		if ($$self.$$.dirty[0] & /*isEmailValid, isBodyValid*/ 65540) {
    			$$invalidate(3, isFormValid = isEmailValid && isBodyValid);
    		}

    		if ($$self.$$.dirty[0] & /*isFormValid*/ 8) {
    			$$invalidate(9, disabled = !isFormValid);
    		}
    	};

    	return [
    		userEmail,
    		userBody,
    		isEmailValid,
    		isFormValid,
    		view,
    		messageCounter,
    		emailTouched,
    		success,
    		isLoading,
    		disabled,
    		resetEmail,
    		horizontalSlide,
    		resetView,
    		startMessageTimer,
    		resetChatView,
    		submitForm,
    		isBodyValid,
    		submit_handler,
    		click_handler,
    		click_handler_1,
    		click_handler_2,
    		click_handler_3,
    		click_handler_4,
    		click_handler_5,
    		click_handler_6,
    		input_input_handler,
    		blur_handler,
    		focus_handler,
    		textarea_input_handler,
    		click_handler_7,
    		click_handler_8
    	];
    }

    class ContactWindow extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$j, create_fragment$j, safe_not_equal, {}, [-1, -1]);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ContactWindow",
    			options,
    			id: create_fragment$j.name
    		});
    	}
    }

    /* src/App.svelte generated by Svelte v3.32.1 */

    function create_fragment$k(ctx) {
    	let scrollhandler;
    	let t0;
    	let projectcorazon;
    	let t1;
    	let aboutwindow;
    	let t2;
    	let japanjpg;
    	let t3;
    	let projectraceworx;
    	let t4;
    	let cookiewindow;
    	let t5;
    	let legalwindow;
    	let t6;
    	let privacywindow;
    	let t7;
    	let projectmueller;
    	let t8;
    	let cleancode;
    	let t9;
    	let germanyjpg;
    	let t10;
    	let referenceswindow;
    	let t11;
    	let logopedia;
    	let t12;
    	let language;
    	let t13;
    	let contact;
    	let current;
    	scrollhandler = new ScrollHandler({ $$inline: true });
    	projectcorazon = new ProjectCorazon({ $$inline: true });
    	aboutwindow = new AboutWindow({ $$inline: true });
    	japanjpg = new JapanJPG({ $$inline: true });
    	projectraceworx = new ProjectRaceworx({ $$inline: true });
    	cookiewindow = new CookieWindow({ $$inline: true });
    	legalwindow = new LegalWindow({ $$inline: true });
    	privacywindow = new PrivacyWindow({ $$inline: true });
    	projectmueller = new ProjectMueller({ $$inline: true });
    	cleancode = new CleanCode({ $$inline: true });
    	germanyjpg = new GermanyJPG({ $$inline: true });
    	referenceswindow = new ReferencesWindow({ $$inline: true });
    	logopedia = new Logopedia({ $$inline: true });
    	language = new LanguageWindow({ $$inline: true });
    	contact = new ContactWindow({ $$inline: true });

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
    			create_component(projectraceworx.$$.fragment);
    			t4 = space();
    			create_component(cookiewindow.$$.fragment);
    			t5 = space();
    			create_component(legalwindow.$$.fragment);
    			t6 = space();
    			create_component(privacywindow.$$.fragment);
    			t7 = space();
    			create_component(projectmueller.$$.fragment);
    			t8 = space();
    			create_component(cleancode.$$.fragment);
    			t9 = space();
    			create_component(germanyjpg.$$.fragment);
    			t10 = space();
    			create_component(referenceswindow.$$.fragment);
    			t11 = space();
    			create_component(logopedia.$$.fragment);
    			t12 = space();
    			create_component(language.$$.fragment);
    			t13 = space();
    			create_component(contact.$$.fragment);
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
    			mount_component(projectraceworx, target, anchor);
    			insert_dev(target, t4, anchor);
    			mount_component(cookiewindow, target, anchor);
    			insert_dev(target, t5, anchor);
    			mount_component(legalwindow, target, anchor);
    			insert_dev(target, t6, anchor);
    			mount_component(privacywindow, target, anchor);
    			insert_dev(target, t7, anchor);
    			mount_component(projectmueller, target, anchor);
    			insert_dev(target, t8, anchor);
    			mount_component(cleancode, target, anchor);
    			insert_dev(target, t9, anchor);
    			mount_component(germanyjpg, target, anchor);
    			insert_dev(target, t10, anchor);
    			mount_component(referenceswindow, target, anchor);
    			insert_dev(target, t11, anchor);
    			mount_component(logopedia, target, anchor);
    			insert_dev(target, t12, anchor);
    			mount_component(language, target, anchor);
    			insert_dev(target, t13, anchor);
    			mount_component(contact, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(scrollhandler.$$.fragment, local);
    			transition_in(projectcorazon.$$.fragment, local);
    			transition_in(aboutwindow.$$.fragment, local);
    			transition_in(japanjpg.$$.fragment, local);
    			transition_in(projectraceworx.$$.fragment, local);
    			transition_in(cookiewindow.$$.fragment, local);
    			transition_in(legalwindow.$$.fragment, local);
    			transition_in(privacywindow.$$.fragment, local);
    			transition_in(projectmueller.$$.fragment, local);
    			transition_in(cleancode.$$.fragment, local);
    			transition_in(germanyjpg.$$.fragment, local);
    			transition_in(referenceswindow.$$.fragment, local);
    			transition_in(logopedia.$$.fragment, local);
    			transition_in(language.$$.fragment, local);
    			transition_in(contact.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(scrollhandler.$$.fragment, local);
    			transition_out(projectcorazon.$$.fragment, local);
    			transition_out(aboutwindow.$$.fragment, local);
    			transition_out(japanjpg.$$.fragment, local);
    			transition_out(projectraceworx.$$.fragment, local);
    			transition_out(cookiewindow.$$.fragment, local);
    			transition_out(legalwindow.$$.fragment, local);
    			transition_out(privacywindow.$$.fragment, local);
    			transition_out(projectmueller.$$.fragment, local);
    			transition_out(cleancode.$$.fragment, local);
    			transition_out(germanyjpg.$$.fragment, local);
    			transition_out(referenceswindow.$$.fragment, local);
    			transition_out(logopedia.$$.fragment, local);
    			transition_out(language.$$.fragment, local);
    			transition_out(contact.$$.fragment, local);
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
    			destroy_component(projectraceworx, detaching);
    			if (detaching) detach_dev(t4);
    			destroy_component(cookiewindow, detaching);
    			if (detaching) detach_dev(t5);
    			destroy_component(legalwindow, detaching);
    			if (detaching) detach_dev(t6);
    			destroy_component(privacywindow, detaching);
    			if (detaching) detach_dev(t7);
    			destroy_component(projectmueller, detaching);
    			if (detaching) detach_dev(t8);
    			destroy_component(cleancode, detaching);
    			if (detaching) detach_dev(t9);
    			destroy_component(germanyjpg, detaching);
    			if (detaching) detach_dev(t10);
    			destroy_component(referenceswindow, detaching);
    			if (detaching) detach_dev(t11);
    			destroy_component(logopedia, detaching);
    			if (detaching) detach_dev(t12);
    			destroy_component(language, detaching);
    			if (detaching) detach_dev(t13);
    			destroy_component(contact, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$k.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$k($$self, $$props, $$invalidate) {
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
    		Logopedia,
    		Language: LanguageWindow,
    		Contact: ContactWindow
    	});

    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$k, create_fragment$k, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment$k.name
    		});
    	}
    }

    const app = new App({
    	target: document.querySelector("main .grid-box"),
    	intro: true,
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
