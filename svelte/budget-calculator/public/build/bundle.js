
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
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
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
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
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function to_number(value) {
        return value === '' ? null : +value;
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
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
    function setContext(key, context) {
        get_current_component().$$.context.set(key, context);
    }
    function getContext(key) {
        return get_current_component().$$.context.get(key);
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
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
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
        seen_callbacks.clear();
        set_current_component(saved_component);
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

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
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
        }
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
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
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
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
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
            mount_component(component, options.target, options.anchor, options.customElement);
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
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.44.3' }, detail), true));
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
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
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

    /* src/Navbar.svelte generated by Svelte v3.44.3 */

    const file$6 = "src/Navbar.svelte";

    function create_fragment$6(ctx) {
    	let html;
    	let nav;
    	let div;
    	let h1;
    	let t1;
    	let button;
    	let i;

    	const block = {
    		c: function create() {
    			html = element("html");
    			nav = element("nav");
    			div = element("div");
    			h1 = element("h1");
    			h1.textContent = "budget calculator";
    			t1 = space();
    			button = element("button");
    			i = element("i");
    			i.textContent = "add item";
    			attr_dev(h1, "class", "nav-title");
    			add_location(h1, file$6, 3, 6, 62);
    			attr_dev(div, "class", "nav-center");
    			add_location(div, file$6, 2, 4, 31);
    			attr_dev(i, "class", "far fa-plus-square");
    			add_location(i, file$6, 6, 2, 149);
    			attr_dev(button, "class", "nav-btn");
    			add_location(button, file$6, 5, 4, 122);
    			attr_dev(nav, "class", "nav");
    			add_location(nav, file$6, 1, 2, 9);
    			add_location(html, file$6, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, html, anchor);
    			append_dev(html, nav);
    			append_dev(nav, div);
    			append_dev(div, h1);
    			append_dev(nav, t1);
    			append_dev(nav, button);
    			append_dev(button, i);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(html);
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

    function instance$6($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Navbar', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Navbar> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Navbar extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Navbar",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    /* src/Title.svelte generated by Svelte v3.44.3 */

    const file$5 = "src/Title.svelte";

    function create_fragment$5(ctx) {
    	let div;
    	let h2;
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			h2 = element("h2");
    			t = text(/*title*/ ctx[0]);
    			add_location(h2, file$5, 5, 4, 89);
    			attr_dev(div, "class", "main-title");
    			add_location(div, file$5, 4, 0, 60);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h2);
    			append_dev(h2, t);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*title*/ 1) set_data_dev(t, /*title*/ ctx[0]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
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
    	validate_slots('Title', slots, []);
    	let { title = "default title" } = $$props;
    	const writable_props = ['title'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Title> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    	};

    	$$self.$capture_state = () => ({ title });

    	$$self.$inject_state = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [title];
    }

    class Title extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, { title: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Title",
    			options,
    			id: create_fragment$5.name
    		});
    	}

    	get title() {
    		throw new Error("<Title>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Title>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Expense.svelte generated by Svelte v3.44.3 */
    const file$4 = "src/Expense.svelte";

    // (19:8) {#if showAmount}
    function create_if_block$1(ctx) {
    	let h4;
    	let t0;
    	let t1;

    	const block = {
    		c: function create() {
    			h4 = element("h4");
    			t0 = text("amount: $");
    			t1 = text(/*amount*/ ctx[2]);
    			add_location(h4, file$4, 19, 12, 557);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h4, anchor);
    			append_dev(h4, t0);
    			append_dev(h4, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*amount*/ 4) set_data_dev(t1, /*amount*/ ctx[2]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h4);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(19:8) {#if showAmount}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let article;
    	let div0;
    	let h2;
    	let t0;
    	let button0;
    	let i0;
    	let t1;
    	let t2;
    	let div1;
    	let button1;
    	let i1;
    	let t3;
    	let button2;
    	let i2;
    	let mounted;
    	let dispose;
    	let if_block = /*showAmount*/ ctx[3] && create_if_block$1(ctx);

    	const block = {
    		c: function create() {
    			article = element("article");
    			div0 = element("div");
    			h2 = element("h2");
    			t0 = text(/*name*/ ctx[1]);
    			button0 = element("button");
    			i0 = element("i");
    			t1 = space();
    			if (if_block) if_block.c();
    			t2 = space();
    			div1 = element("div");
    			button1 = element("button");
    			i1 = element("i");
    			t3 = space();
    			button2 = element("button");
    			i2 = element("i");
    			attr_dev(i0, "class", "fas fa-caret-down");
    			add_location(i0, file$4, 14, 12, 441);
    			attr_dev(button0, "class", "amount-btn");
    			add_location(button0, file$4, 13, 18, 364);
    			add_location(h2, file$4, 13, 8, 354);
    			attr_dev(div0, "class", "expense-info");
    			add_location(div0, file$4, 12, 4, 319);
    			attr_dev(i1, "class", "fas fa-pen");
    			add_location(i1, file$4, 24, 12, 701);
    			attr_dev(button1, "class", "expense-btn edit-btn");
    			add_location(button1, file$4, 23, 8, 651);
    			attr_dev(i2, "class", "fas fa-trash");
    			add_location(i2, file$4, 28, 12, 856);
    			attr_dev(button2, "class", "expense-btn delete-btn");
    			add_location(button2, file$4, 26, 8, 754);
    			attr_dev(div1, "class", "expense-buttons");
    			add_location(div1, file$4, 22, 4, 613);
    			attr_dev(article, "class", "single-expense");
    			add_location(article, file$4, 11, 0, 282);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, article, anchor);
    			append_dev(article, div0);
    			append_dev(div0, h2);
    			append_dev(h2, t0);
    			append_dev(h2, button0);
    			append_dev(button0, i0);
    			append_dev(div0, t1);
    			if (if_block) if_block.m(div0, null);
    			append_dev(article, t2);
    			append_dev(article, div1);
    			append_dev(div1, button1);
    			append_dev(button1, i1);
    			append_dev(div1, t3);
    			append_dev(div1, button2);
    			append_dev(button2, i2);

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", /*click_handler*/ ctx[6], false, false, false),
    					listen_dev(button2, "click", /*click_handler_1*/ ctx[7], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*name*/ 2) set_data_dev(t0, /*name*/ ctx[1]);

    			if (/*showAmount*/ ctx[3]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$1(ctx);
    					if_block.c();
    					if_block.m(div0, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(article);
    			if (if_block) if_block.d();
    			mounted = false;
    			run_all(dispose);
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
    	validate_slots('Expense', slots, []);
    	let { id } = $$props;
    	let { name = "" } = $$props;
    	let { amount = 0 } = $$props;
    	let showAmount = false;

    	function toggleDisplayAmount() {
    		$$invalidate(3, showAmount = !showAmount);
    	}

    	const removeExpense = getContext("remove");
    	const writable_props = ['id', 'name', 'amount'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Expense> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => toggleDisplayAmount();
    	const click_handler_1 = () => removeExpense(id);

    	$$self.$$set = $$props => {
    		if ('id' in $$props) $$invalidate(0, id = $$props.id);
    		if ('name' in $$props) $$invalidate(1, name = $$props.name);
    		if ('amount' in $$props) $$invalidate(2, amount = $$props.amount);
    	};

    	$$self.$capture_state = () => ({
    		getContext,
    		id,
    		name,
    		amount,
    		showAmount,
    		toggleDisplayAmount,
    		removeExpense
    	});

    	$$self.$inject_state = $$props => {
    		if ('id' in $$props) $$invalidate(0, id = $$props.id);
    		if ('name' in $$props) $$invalidate(1, name = $$props.name);
    		if ('amount' in $$props) $$invalidate(2, amount = $$props.amount);
    		if ('showAmount' in $$props) $$invalidate(3, showAmount = $$props.showAmount);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		id,
    		name,
    		amount,
    		showAmount,
    		toggleDisplayAmount,
    		removeExpense,
    		click_handler,
    		click_handler_1
    	];
    }

    class Expense extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, { id: 0, name: 1, amount: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Expense",
    			options,
    			id: create_fragment$4.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*id*/ ctx[0] === undefined && !('id' in props)) {
    			console.warn("<Expense> was created without expected prop 'id'");
    		}
    	}

    	get id() {
    		throw new Error("<Expense>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<Expense>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get name() {
    		throw new Error("<Expense>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<Expense>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get amount() {
    		throw new Error("<Expense>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set amount(value) {
    		throw new Error("<Expense>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/ExpensesList.svelte generated by Svelte v3.44.3 */
    const file$3 = "src/ExpensesList.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	child_ctx[3] = i;
    	return child_ctx;
    }

    // (16:12) {:else}
    function create_else_block(ctx) {
    	let h2;

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			h2.textContent = "no expenses in the list";
    			attr_dev(h2, "class", "svelte-j7fdk");
    			add_location(h2, file$3, 16, 12, 379);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(16:12) {:else}",
    		ctx
    	});

    	return block;
    }

    // (14:8) {#each expenses as expense,index}
    function create_each_block(ctx) {
    	let expense;
    	let current;
    	const expense_spread_levels = [/*expense*/ ctx[1]];
    	let expense_props = {};

    	for (let i = 0; i < expense_spread_levels.length; i += 1) {
    		expense_props = assign(expense_props, expense_spread_levels[i]);
    	}

    	expense = new Expense({ props: expense_props, $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(expense.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(expense, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const expense_changes = (dirty & /*expenses*/ 1)
    			? get_spread_update(expense_spread_levels, [get_spread_object(/*expense*/ ctx[1])])
    			: {};

    			expense.$set(expense_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(expense.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(expense.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(expense, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(14:8) {#each expenses as expense,index}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let section;
    	let sectiontitle;
    	let t;
    	let ul;
    	let current;

    	sectiontitle = new Title({
    			props: { title: "expense list" },
    			$$inline: true
    		});

    	let each_value = /*expenses*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	let each_1_else = null;

    	if (!each_value.length) {
    		each_1_else = create_else_block(ctx);
    	}

    	const block = {
    		c: function create() {
    			section = element("section");
    			create_component(sectiontitle.$$.fragment);
    			t = space();
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			if (each_1_else) {
    				each_1_else.c();
    			}

    			add_location(ul, file$3, 12, 4, 263);
    			add_location(section, file$3, 10, 0, 207);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			mount_component(sectiontitle, section, null);
    			append_dev(section, t);
    			append_dev(section, ul);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}

    			if (each_1_else) {
    				each_1_else.m(ul, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*expenses*/ 1) {
    				each_value = /*expenses*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(ul, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();

    				if (each_value.length) {
    					if (each_1_else) {
    						each_1_else.d(1);
    						each_1_else = null;
    					}
    				} else if (!each_1_else) {
    					each_1_else = create_else_block(ctx);
    					each_1_else.c();
    					each_1_else.m(ul, null);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(sectiontitle.$$.fragment, local);

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(sectiontitle.$$.fragment, local);
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			destroy_component(sectiontitle);
    			destroy_each(each_blocks, detaching);
    			if (each_1_else) each_1_else.d();
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
    	validate_slots('ExpensesList', slots, []);
    	let { expenses = [] } = $$props;
    	const writable_props = ['expenses'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ExpensesList> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('expenses' in $$props) $$invalidate(0, expenses = $$props.expenses);
    	};

    	$$self.$capture_state = () => ({ SectionTitle: Title, Expense, expenses });

    	$$self.$inject_state = $$props => {
    		if ('expenses' in $$props) $$invalidate(0, expenses = $$props.expenses);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [expenses];
    }

    class ExpensesList extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { expenses: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ExpensesList",
    			options,
    			id: create_fragment$3.name
    		});
    	}

    	get expenses() {
    		throw new Error("<ExpensesList>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set expenses(value) {
    		throw new Error("<ExpensesList>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Totals.svelte generated by Svelte v3.44.3 */

    const file$2 = "src/Totals.svelte";

    function create_fragment$2(ctx) {
    	let section;
    	let h2;
    	let t0;
    	let t1;
    	let t2;

    	const block = {
    		c: function create() {
    			section = element("section");
    			h2 = element("h2");
    			t0 = text(/*title*/ ctx[0]);
    			t1 = text(": $");
    			t2 = text(/*total*/ ctx[1]);
    			add_location(h2, file$2, 6, 4, 118);
    			attr_dev(section, "class", "main-title");
    			add_location(section, file$2, 5, 0, 85);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, h2);
    			append_dev(h2, t0);
    			append_dev(h2, t1);
    			append_dev(h2, t2);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*title*/ 1) set_data_dev(t0, /*title*/ ctx[0]);
    			if (dirty & /*total*/ 2) set_data_dev(t2, /*total*/ ctx[1]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
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
    	validate_slots('Totals', slots, []);
    	let { title = "default text" } = $$props;
    	let { total = 0 } = $$props;
    	const writable_props = ['title', 'total'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Totals> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('total' in $$props) $$invalidate(1, total = $$props.total);
    	};

    	$$self.$capture_state = () => ({ title, total });

    	$$self.$inject_state = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('total' in $$props) $$invalidate(1, total = $$props.total);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [title, total];
    }

    class Totals extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { title: 0, total: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Totals",
    			options,
    			id: create_fragment$2.name
    		});
    	}

    	get title() {
    		throw new Error("<Totals>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Totals>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get total() {
    		throw new Error("<Totals>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set total(value) {
    		throw new Error("<Totals>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/ExpenseForm.svelte generated by Svelte v3.44.3 */
    const file$1 = "src/ExpenseForm.svelte";

    // (31:4) {#if isEmpty}
    function create_if_block(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "please fill all fields";
    			attr_dev(p, "class", "form-empty");
    			add_location(p, file$1, 31, 6, 753);
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
    		id: create_if_block.name,
    		type: "if",
    		source: "(31:4) {#if isEmpty}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let section;
    	let title;
    	let t0;
    	let form;
    	let div0;
    	let label0;
    	let t2;
    	let input0;
    	let t3;
    	let div1;
    	let label1;
    	let t5;
    	let input1;
    	let t6;
    	let t7;
    	let button0;
    	let t8;
    	let t9;
    	let button1;
    	let i;
    	let t10;
    	let current;
    	let mounted;
    	let dispose;

    	title = new Title({
    			props: { title: "add expense" },
    			$$inline: true
    		});

    	let if_block = /*isEmpty*/ ctx[2] && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			section = element("section");
    			create_component(title.$$.fragment);
    			t0 = space();
    			form = element("form");
    			div0 = element("div");
    			label0 = element("label");
    			label0.textContent = "name";
    			t2 = space();
    			input0 = element("input");
    			t3 = space();
    			div1 = element("div");
    			label1 = element("label");
    			label1.textContent = "amount";
    			t5 = space();
    			input1 = element("input");
    			t6 = space();
    			if (if_block) if_block.c();
    			t7 = space();
    			button0 = element("button");
    			t8 = text("add expense");
    			t9 = space();
    			button1 = element("button");
    			i = element("i");
    			t10 = text("\n      close");
    			attr_dev(label0, "for", "name");
    			add_location(label0, file$1, 23, 6, 486);
    			attr_dev(input0, "type", "text");
    			attr_dev(input0, "id", "name");
    			add_location(input0, file$1, 24, 6, 523);
    			attr_dev(div0, "class", "form-control");
    			add_location(div0, file$1, 22, 4, 453);
    			attr_dev(label1, "for", "amount");
    			add_location(label1, file$1, 27, 6, 621);
    			attr_dev(input1, "type", "number");
    			attr_dev(input1, "id", "amount");
    			add_location(input1, file$1, 28, 6, 662);
    			attr_dev(div1, "class", "form-control");
    			add_location(div1, file$1, 26, 4, 588);
    			attr_dev(button0, "type", "submit");
    			attr_dev(button0, "class", "btn btn-block");
    			button0.disabled = /*isEmpty*/ ctx[2];
    			toggle_class(button0, "disabled", /*isEmpty*/ ctx[2]);
    			add_location(button0, file$1, 33, 4, 816);
    			attr_dev(i, "class", "fas fa-times");
    			add_location(i, file$1, 37, 6, 988);
    			attr_dev(button1, "type", "button");
    			attr_dev(button1, "class", "close-btn");
    			add_location(button1, file$1, 36, 4, 941);
    			attr_dev(form, "class", "expense-form");
    			add_location(form, file$1, 21, 2, 381);
    			attr_dev(section, "class", "form");
    			add_location(section, file$1, 19, 0, 324);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			mount_component(title, section, null);
    			append_dev(section, t0);
    			append_dev(section, form);
    			append_dev(form, div0);
    			append_dev(div0, label0);
    			append_dev(div0, t2);
    			append_dev(div0, input0);
    			set_input_value(input0, /*name*/ ctx[0]);
    			append_dev(form, t3);
    			append_dev(form, div1);
    			append_dev(div1, label1);
    			append_dev(div1, t5);
    			append_dev(div1, input1);
    			set_input_value(input1, /*amount*/ ctx[1]);
    			append_dev(form, t6);
    			if (if_block) if_block.m(form, null);
    			append_dev(form, t7);
    			append_dev(form, button0);
    			append_dev(button0, t8);
    			append_dev(form, t9);
    			append_dev(form, button1);
    			append_dev(button1, i);
    			append_dev(button1, t10);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(input0, "input", /*input0_input_handler*/ ctx[5]),
    					listen_dev(input1, "input", /*input1_input_handler*/ ctx[6]),
    					listen_dev(form, "submit", prevent_default(/*handleSubmit*/ ctx[3]), false, true, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*name*/ 1 && input0.value !== /*name*/ ctx[0]) {
    				set_input_value(input0, /*name*/ ctx[0]);
    			}

    			if (dirty & /*amount*/ 2 && to_number(input1.value) !== /*amount*/ ctx[1]) {
    				set_input_value(input1, /*amount*/ ctx[1]);
    			}

    			if (/*isEmpty*/ ctx[2]) {
    				if (if_block) ; else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					if_block.m(form, t7);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (!current || dirty & /*isEmpty*/ 4) {
    				prop_dev(button0, "disabled", /*isEmpty*/ ctx[2]);
    			}

    			if (dirty & /*isEmpty*/ 4) {
    				toggle_class(button0, "disabled", /*isEmpty*/ ctx[2]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(title.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(title.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			destroy_component(title);
    			if (if_block) if_block.d();
    			mounted = false;
    			run_all(dispose);
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
    	let isEmpty;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ExpenseForm', slots, []);
    	let name = "";
    	let amount = null;
    	let { addExpense } = $$props;

    	function handleSubmit() {
    		addExpense({ name, amount });
    		$$invalidate(0, name = "");
    		$$invalidate(1, amount = null);
    	}

    	const writable_props = ['addExpense'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ExpenseForm> was created with unknown prop '${key}'`);
    	});

    	function input0_input_handler() {
    		name = this.value;
    		$$invalidate(0, name);
    	}

    	function input1_input_handler() {
    		amount = to_number(this.value);
    		$$invalidate(1, amount);
    	}

    	$$self.$$set = $$props => {
    		if ('addExpense' in $$props) $$invalidate(4, addExpense = $$props.addExpense);
    	};

    	$$self.$capture_state = () => ({
    		Title,
    		name,
    		amount,
    		addExpense,
    		handleSubmit,
    		isEmpty
    	});

    	$$self.$inject_state = $$props => {
    		if ('name' in $$props) $$invalidate(0, name = $$props.name);
    		if ('amount' in $$props) $$invalidate(1, amount = $$props.amount);
    		if ('addExpense' in $$props) $$invalidate(4, addExpense = $$props.addExpense);
    		if ('isEmpty' in $$props) $$invalidate(2, isEmpty = $$props.isEmpty);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*name, amount*/ 3) {
    			//$: console.log({ name, amount });
    			$$invalidate(2, isEmpty = !name || !amount);
    		}
    	};

    	return [
    		name,
    		amount,
    		isEmpty,
    		handleSubmit,
    		addExpense,
    		input0_input_handler,
    		input1_input_handler
    	];
    }

    class ExpenseForm extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { addExpense: 4 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ExpenseForm",
    			options,
    			id: create_fragment$1.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*addExpense*/ ctx[4] === undefined && !('addExpense' in props)) {
    			console.warn("<ExpenseForm> was created without expected prop 'addExpense'");
    		}
    	}

    	get addExpense() {
    		throw new Error("<ExpenseForm>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set addExpense(value) {
    		throw new Error("<ExpenseForm>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var expensesData = [
      {
        id: Math.random() * Date.now(),
        name: "rent",
        amount: 2300
      },
      {
        id: Math.random() * Date.now(),
        name: "car payment",
        amount: 400
      },
      {
        id: Math.random() * Date.now(),
        name: "student loan",
        amount: 400
      },
      {
        id: Math.random() * Date.now(),
        name: "credit card",
        amount: 2000
      }
    ];

    /* src/App.svelte generated by Svelte v3.44.3 */

    const file = "src/App.svelte";

    function create_fragment(ctx) {
    	let navbar;
    	let t0;
    	let main;
    	let expenseform;
    	let t1;
    	let totals;
    	let t2;
    	let expenseslist;
    	let t3;
    	let button;
    	let current;
    	let mounted;
    	let dispose;
    	navbar = new Navbar({ $$inline: true });

    	expenseform = new ExpenseForm({
    			props: { addExpense: /*addExpense*/ ctx[3] },
    			$$inline: true
    		});

    	totals = new Totals({
    			props: {
    				title: "total expenses",
    				total: /*total*/ ctx[1]
    			},
    			$$inline: true
    		});

    	expenseslist = new ExpensesList({
    			props: { expenses: /*expenses*/ ctx[0] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(navbar.$$.fragment);
    			t0 = space();
    			main = element("main");
    			create_component(expenseform.$$.fragment);
    			t1 = space();
    			create_component(totals.$$.fragment);
    			t2 = space();
    			create_component(expenseslist.$$.fragment);
    			t3 = space();
    			button = element("button");
    			button.textContent = "clear expenses";
    			attr_dev(button, "type", "button");
    			attr_dev(button, "class", "btn btn-primary btn-block");
    			add_location(button, file, 35, 2, 1017);
    			attr_dev(main, "class", "content");
    			add_location(main, file, 31, 0, 889);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(navbar, target, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, main, anchor);
    			mount_component(expenseform, main, null);
    			append_dev(main, t1);
    			mount_component(totals, main, null);
    			append_dev(main, t2);
    			mount_component(expenseslist, main, null);
    			append_dev(main, t3);
    			append_dev(main, button);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*clearExpenses*/ ctx[2], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			const totals_changes = {};
    			if (dirty & /*total*/ 2) totals_changes.total = /*total*/ ctx[1];
    			totals.$set(totals_changes);
    			const expenseslist_changes = {};
    			if (dirty & /*expenses*/ 1) expenseslist_changes.expenses = /*expenses*/ ctx[0];
    			expenseslist.$set(expenseslist_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(navbar.$$.fragment, local);
    			transition_in(expenseform.$$.fragment, local);
    			transition_in(totals.$$.fragment, local);
    			transition_in(expenseslist.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(navbar.$$.fragment, local);
    			transition_out(expenseform.$$.fragment, local);
    			transition_out(totals.$$.fragment, local);
    			transition_out(expenseslist.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(navbar, detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(main);
    			destroy_component(expenseform);
    			destroy_component(totals);
    			destroy_component(expenseslist);
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
    	let total;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	let expenses = [...expensesData];

    	// functions
    	function removeExpense(id) {
    		$$invalidate(0, expenses = expenses.filter(item => item.id != id));
    	}

    	function clearExpenses() {
    		$$invalidate(0, expenses = []);
    	}

    	function addExpense({ name, amount }) {
    		let expense = {
    			id: Math.random() * Date.now(),
    			name,
    			amount
    		};

    		//console.log(expense);
    		$$invalidate(0, expenses = [expense, ...expenses]); // add the obj to the obj-array; works like a push()
    	}

    	setContext("remove", removeExpense);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Navbar,
    		ExpensesList,
    		setContext,
    		Totals,
    		ExpenseForm,
    		expensesData,
    		expenses,
    		removeExpense,
    		clearExpenses,
    		addExpense,
    		total
    	});

    	$$self.$inject_state = $$props => {
    		if ('expenses' in $$props) $$invalidate(0, expenses = $$props.expenses);
    		if ('total' in $$props) $$invalidate(1, total = $$props.total);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*expenses*/ 1) {
    			// REACTIVE
    			$$invalidate(1, total = expenses.reduce(
    				(acc, curr) => {
    					return acc += curr.amount;
    				},
    				0
    			));
    		}
    	};

    	return [expenses, total, clearExpenses, addExpense];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		name: 'world'
    	}
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map