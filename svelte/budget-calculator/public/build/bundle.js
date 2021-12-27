var app=function(){"use strict";function t(){}const n=t=>t;function e(t,n){for(const e in n)t[e]=n[e];return t}function o(t){return t()}function r(){return Object.create(null)}function i(t){t.forEach(o)}function s(t){return"function"==typeof t}function l(t,n){return t!=t?n==n:t!==n||t&&"object"==typeof t||"function"==typeof t}function c(t,n,o,r){return t[1]&&r?e(o.ctx.slice(),t[1](r(n))):o.ctx}const a="undefined"!=typeof window;let u=a?()=>window.performance.now():()=>Date.now(),f=a?t=>requestAnimationFrame(t):t;const d=new Set;function p(t){d.forEach((n=>{n.c(t)||(d.delete(n),n.f())})),0!==d.size&&f(p)}function m(t){let n;return 0===d.size&&f(p),{promise:new Promise((e=>{d.add(n={c:t,f:e})})),abort(){d.delete(n)}}}function $(t,n){t.appendChild(n)}function g(t){if(!t)return document;const n=t.getRootNode?t.getRootNode():t.ownerDocument;return n&&n.host?n:t.ownerDocument}function h(t){const n=b("style");return function(t,n){$(t.head||t,n)}(g(t),n),n}function y(t,n,e){t.insertBefore(n,e||null)}function x(t){t.parentNode.removeChild(t)}function b(t){return document.createElement(t)}function v(t){return document.createTextNode(t)}function w(){return v(" ")}function _(t,n,e,o){return t.addEventListener(n,e,o),()=>t.removeEventListener(n,e,o)}function k(t,n,e){null==e?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function E(t){return""===t?null:+t}function C(t,n){n=""+n,t.wholeText!==n&&(t.data=n)}function F(t,n){t.value=null==n?"":n}function S(t,n,e){t.classList[e?"add":"remove"](n)}const M=new Set;let R,T=0;function B(t,n,e,o,r,i,s,l=0){const c=16.666/o;let a="{\n";for(let t=0;t<=1;t+=c){const o=n+(e-n)*i(t);a+=100*t+`%{${s(o,1-o)}}\n`}const u=a+`100% {${s(e,1-e)}}\n}`,f=`__svelte_${function(t){let n=5381,e=t.length;for(;e--;)n=(n<<5)-n^t.charCodeAt(e);return n>>>0}(u)}_${l}`,d=g(t);M.add(d);const p=d.__svelte_stylesheet||(d.__svelte_stylesheet=h(t).sheet),m=d.__svelte_rules||(d.__svelte_rules={});m[f]||(m[f]=!0,p.insertRule(`@keyframes ${f} ${u}`,p.cssRules.length));const $=t.style.animation||"";return t.style.animation=`${$?`${$}, `:""}${f} ${o}ms linear ${r}ms 1 both`,T+=1,f}function L(t,n){const e=(t.style.animation||"").split(", "),o=e.filter(n?t=>t.indexOf(n)<0:t=>-1===t.indexOf("__svelte")),r=e.length-o.length;r&&(t.style.animation=o.join(", "),T-=r,T||f((()=>{T||(M.forEach((t=>{const n=t.__svelte_stylesheet;let e=n.cssRules.length;for(;e--;)n.deleteRule(e);t.__svelte_rules={}})),M.clear())})))}function O(t,n){const e=t.getBoundingClientRect();if(n.left!==e.left||n.top!==e.top){const o=getComputedStyle(t),r="none"===o.transform?"":o.transform;t.style.transform=`${r} translate(${n.left-e.left}px, ${n.top-e.top}px)`}}function j(t){R=t}function N(){if(!R)throw new Error("Function called outside component initialization");return R}function A(t,n){N().$$.context.set(t,n)}function q(t){return N().$$.context.get(t)}const D=[],H=[],z=[],I=[],P=Promise.resolve();let J=!1;function W(t){z.push(t)}const U=new Set;let G,K=0;function Q(){const t=R;do{for(;K<D.length;){const t=D[K];K++,j(t),V(t.$$)}for(j(null),D.length=0,K=0;H.length;)H.pop()();for(let t=0;t<z.length;t+=1){const n=z[t];U.has(n)||(U.add(n),n())}z.length=0}while(D.length);for(;I.length;)I.pop()();J=!1,U.clear(),j(t)}function V(t){if(null!==t.fragment){t.update(),i(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(W)}}function X(){return G||(G=Promise.resolve(),G.then((()=>{G=null}))),G}function Y(t,n,e){t.dispatchEvent(function(t,n,e=!1){const o=document.createEvent("CustomEvent");return o.initCustomEvent(t,e,!1,n),o}(`${n?"intro":"outro"}${e}`))}const Z=new Set;let tt;function nt(){tt={r:0,c:[],p:tt}}function et(){tt.r||i(tt.c),tt=tt.p}function ot(t,n){t&&t.i&&(Z.delete(t),t.i(n))}function rt(t,n,e,o){if(t&&t.o){if(Z.has(t))return;Z.add(t),tt.c.push((()=>{Z.delete(t),o&&(e&&t.d(1),o())})),t.o(n)}}const it={duration:0};function st(e,o,r){let i,l,c=o(e,r),a=!1,f=0;function d(){i&&L(e,i)}function p(){const{delay:o=0,duration:r=300,easing:s=n,tick:p=t,css:$}=c||it;$&&(i=B(e,0,1,r,o,s,$,f++)),p(0,1);const g=u()+o,h=g+r;l&&l.abort(),a=!0,W((()=>Y(e,!0,"start"))),l=m((t=>{if(a){if(t>=h)return p(1,0),Y(e,!0,"end"),d(),a=!1;if(t>=g){const n=s((t-g)/r);p(n,1-n)}}return a}))}let $=!1;return{start(){$||($=!0,L(e),s(c)?(c=c(),X().then(p)):p())},invalidate(){$=!1},end(){a&&(d(),a=!1)}}}function lt(e,o,r){let l,c=o(e,r),a=!0;const f=tt;function d(){const{delay:o=0,duration:r=300,easing:s=n,tick:d=t,css:p}=c||it;p&&(l=B(e,1,0,r,o,s,p));const $=u()+o,g=$+r;W((()=>Y(e,!1,"start"))),m((t=>{if(a){if(t>=g)return d(0,1),Y(e,!1,"end"),--f.r||i(f.c),!1;if(t>=$){const n=s((t-$)/r);d(1-n,n)}}return a}))}return f.r+=1,s(c)?X().then((()=>{c=c(),d()})):d(),{end(t){t&&c.tick&&c.tick(1,0),a&&(l&&L(e,l),a=!1)}}}function ct(e,o,r,l){let c=o(e,r),a=l?0:1,f=null,d=null,p=null;function $(){p&&L(e,p)}function g(t,n){const e=t.b-a;return n*=Math.abs(e),{a:a,b:t.b,d:e,duration:n,start:t.start,end:t.start+n,group:t.group}}function h(o){const{delay:r=0,duration:s=300,easing:l=n,tick:h=t,css:y}=c||it,x={start:u()+r,b:o};o||(x.group=tt,tt.r+=1),f||d?d=x:(y&&($(),p=B(e,a,o,s,r,l,y)),o&&h(0,1),f=g(x,s),W((()=>Y(e,o,"start"))),m((t=>{if(d&&t>d.start&&(f=g(d,s),d=null,Y(e,f.b,"start"),y&&($(),p=B(e,a,f.b,f.duration,0,l,c.css))),f)if(t>=f.end)h(a=f.b,1-a),Y(e,f.b,"end"),d||(f.b?$():--f.group.r||i(f.group.c)),f=null;else if(t>=f.start){const n=t-f.start;a=f.a+f.d*l(n/f.duration),h(a,1-a)}return!(!f&&!d)})))}return{run(t){s(c)?X().then((()=>{c=c(),h(t)})):h(t)},end(){$(),f=d=null}}}function at(t,n){t.f(),function(t,n){rt(t,1,1,(()=>{n.delete(t.key)}))}(t,n)}function ut(t){t&&t.c()}function ft(t,n,e,r){const{fragment:l,on_mount:c,on_destroy:a,after_update:u}=t.$$;l&&l.m(n,e),r||W((()=>{const n=c.map(o).filter(s);a?a.push(...n):i(n),t.$$.on_mount=[]})),u.forEach(W)}function dt(t,n){const e=t.$$;null!==e.fragment&&(i(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function pt(t,n){-1===t.$$.dirty[0]&&(D.push(t),J||(J=!0,P.then(Q)),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function mt(n,e,o,s,l,c,a,u=[-1]){const f=R;j(n);const d=n.$$={fragment:null,ctx:null,props:c,update:t,not_equal:l,bound:r(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(f?f.$$.context:[])),callbacks:r(),dirty:u,skip_bound:!1,root:e.target||f.$$.root};a&&a(d.root);let p=!1;if(d.ctx=o?o(n,e.props||{},((t,e,...o)=>{const r=o.length?o[0]:e;return d.ctx&&l(d.ctx[t],d.ctx[t]=r)&&(!d.skip_bound&&d.bound[t]&&d.bound[t](r),p&&pt(n,t)),e})):[],d.update(),p=!0,i(d.before_update),d.fragment=!!s&&s(d.ctx),e.target){if(e.hydrate){const t=function(t){return Array.from(t.childNodes)}(e.target);d.fragment&&d.fragment.l(t),t.forEach(x)}else d.fragment&&d.fragment.c();e.intro&&ot(n.$$.fragment),ft(n,e.target,e.anchor,e.customElement),Q()}j(f)}class $t{$destroy(){dt(this,1),this.$destroy=t}$on(t,n){const e=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return e.push(n),()=>{const t=e.indexOf(n);-1!==t&&e.splice(t,1)}}$set(t){var n;this.$$set&&(n=t,0!==Object.keys(n).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function gt(n){let e,o,r,i,l,c,a;return{c(){e=b("nav"),o=b("div"),r=b("h1"),r.textContent="budget calculator",i=w(),l=b("button"),l.innerHTML='<i class="far fa-plus-square"></i> add item',k(r,"class","nav-title"),k(l,"type","button"),k(l,"class","nav-btn"),k(o,"class","nav-center"),k(e,"class","nav")},m(t,u){y(t,e,u),$(e,o),$(o,r),$(o,i),$(o,l),c||(a=_(l,"click",(function(){s(n[0])&&n[0].apply(this,arguments)})),c=!0)},p(t,[e]){n=t},i:t,o:t,d(t){t&&x(e),c=!1,a()}}}function ht(t,n,e){let{showForm:o}=n;return t.$$set=t=>{"showForm"in t&&e(0,o=t.showForm)},[o]}class yt extends $t{constructor(t){super(),mt(this,t,ht,gt,l,{showForm:0})}}function xt(t){return t<.5?4*t*t*t:.5*Math.pow(2*t-2,3)+1}function bt(t){const n=t-1;return n*n*n+1}function vt(t,{delay:n=0,duration:e=400,easing:o=xt,amount:r=5,opacity:i=0}={}){const s=getComputedStyle(t),l=+s.opacity,c="none"===s.filter?"":s.filter,a=l*(1-i);return{delay:n,duration:e,easing:o,css:(t,n)=>`opacity: ${l-a*n}; filter: ${c} blur(${n*r}px);`}}function wt(t,{delay:e=0,duration:o=400,easing:r=n}={}){const i=+getComputedStyle(t).opacity;return{delay:e,duration:o,easing:r,css:t=>"opacity: "+t*i}}function _t(t,{delay:n=0,duration:e=400,easing:o=bt,x:r=0,y:i=0,opacity:s=0}={}){const l=getComputedStyle(t),c=+l.opacity,a="none"===l.transform?"":l.transform,u=c*(1-s);return{delay:n,duration:e,easing:o,css:(t,n)=>`\n\t\t\ttransform: ${a} translate(${(1-t)*r}px, ${(1-t)*i}px);\n\t\t\topacity: ${c-u*n}`}}function kt(t,{delay:n=0,duration:e=400,easing:o=bt}={}){const r=getComputedStyle(t),i=+r.opacity,s=parseFloat(r.height),l=parseFloat(r.paddingTop),c=parseFloat(r.paddingBottom),a=parseFloat(r.marginTop),u=parseFloat(r.marginBottom),f=parseFloat(r.borderTopWidth),d=parseFloat(r.borderBottomWidth);return{delay:n,duration:e,easing:o,css:t=>`overflow: hidden;opacity: ${Math.min(20*t,1)*i};height: ${t*s}px;padding-top: ${t*l}px;padding-bottom: ${t*c}px;margin-top: ${t*a}px;margin-bottom: ${t*u}px;border-top-width: ${t*f}px;border-bottom-width: ${t*d}px;`}}function Et(t,{from:n,to:e},o={}){const r=getComputedStyle(t),i="none"===r.transform?"":r.transform,[l,c]=r.transformOrigin.split(" ").map(parseFloat),a=n.left+n.width*l/e.width-(e.left+l),u=n.top+n.height*c/e.height-(e.top+c),{delay:f=0,duration:d=(t=>120*Math.sqrt(t)),easing:p=bt}=o;return{delay:f,duration:s(d)?d(Math.sqrt(a*a+u*u)):d,easing:p,css:(t,o)=>{const r=o*a,s=o*u,l=t+o*n.width/e.width,c=t+o*n.height/e.height;return`transform: ${i} translate(${r}px, ${s}px) scale(${l}, ${c});`}}}function Ct(n){let e,o,r;return{c(){e=b("div"),o=b("h2"),r=v(n[0]),k(e,"class","main-title")},m(t,n){y(t,e,n),$(e,o),$(o,r)},p(t,[n]){1&n&&C(r,t[0])},i:t,o:t,d(t){t&&x(e)}}}function Ft(t,n,e){let{title:o="default title"}=n;return t.$$set=t=>{"title"in t&&e(0,o=t.title)},[o]}class St extends $t{constructor(t){super(),mt(this,t,Ft,Ct,l,{title:0})}}function Mt(t){let n,e,o,r,i;return{c(){n=b("h4"),e=v("amount: $"),o=v(t[2])},m(t,r){y(t,n,r),$(n,e),$(n,o),i=!0},p(t,n){(!i||4&n)&&C(o,t[2])},i(t){i||(W((()=>{r||(r=ct(n,kt,{},!0)),r.run(1)})),i=!0)},o(t){r||(r=ct(n,kt,{},!1)),r.run(0),i=!1},d(t){t&&x(n),t&&r&&r.end()}}}function Rt(t){let n,e,o,r,s,l,c,a,u,f,d,p,m,g,h=t[3]&&Mt(t);return{c(){n=b("article"),e=b("div"),o=b("h2"),r=v(t[1]),s=b("button"),s.innerHTML='<i class="fas fa-caret-down"></i>',l=w(),h&&h.c(),c=w(),a=b("div"),u=b("button"),u.innerHTML='<i class="fas fa-pen"></i>',f=w(),d=b("button"),d.innerHTML='<i class="fas fa-trash"></i>',k(s,"class","amount-btn"),k(e,"class","expense-info"),k(u,"class","expense-btn edit-btn"),k(d,"class","expense-btn delete-btn"),k(a,"class","expense-buttons"),k(n,"class","single-expense")},m(i,x){y(i,n,x),$(n,e),$(e,o),$(o,r),$(o,s),$(e,l),h&&h.m(e,null),$(n,c),$(n,a),$(a,u),$(a,f),$(a,d),p=!0,m||(g=[_(s,"click",t[7]),_(u,"click",t[8]),_(d,"click",t[9])],m=!0)},p(t,[n]){(!p||2&n)&&C(r,t[1]),t[3]?h?(h.p(t,n),8&n&&ot(h,1)):(h=Mt(t),h.c(),ot(h,1),h.m(e,null)):h&&(nt(),rt(h,1,1,(()=>{h=null})),et())},i(t){p||(ot(h),p=!0)},o(t){rt(h),p=!1},d(t){t&&x(n),h&&h.d(),m=!1,i(g)}}}function Tt(t,n,e){let{id:o}=n,{name:r=""}=n,{amount:i=0}=n,s=!1;function l(){e(3,s=!s)}const c=q("remove"),a=q("modify");return t.$$set=t=>{"id"in t&&e(0,o=t.id),"name"in t&&e(1,r=t.name),"amount"in t&&e(2,i=t.amount)},[o,r,i,s,l,c,a,()=>l(),()=>a(o),()=>c(o)]}class Bt extends $t{constructor(t){super(),mt(this,t,Tt,Rt,l,{id:0,name:1,amount:2})}}function Lt(t,n,e){const o=t.slice();return o[1]=n[e],o[3]=e,o}function Ot(t){let n;return{c(){n=b("h2"),n.textContent="no expenses in the list",k(n,"class","svelte-j7fdk")},m(t,e){y(t,n,e)},d(t){t&&x(n)}}}function jt(o,r){let i,s,l,c,a,f,d,p=t;const g=[r[1]];let h={};for(let t=0;t<g.length;t+=1)h=e(h,g[t]);return s=new Bt({props:h}),{key:o,first:null,c(){i=b("div"),ut(s.$$.fragment),l=w(),this.first=i},m(t,n){y(t,i,n),ft(s,i,null),$(i,l),d=!0},p(t,n){r=t;const e=1&n?function(t,n){const e={},o={},r={$$scope:1};let i=t.length;for(;i--;){const s=t[i],l=n[i];if(l){for(const t in s)t in l||(o[t]=1);for(const t in l)r[t]||(e[t]=l[t],r[t]=1);t[i]=l}else for(const t in s)r[t]=1}for(const t in o)t in e||(e[t]=void 0);return e}(g,[(o=r[1],"object"==typeof o&&null!==o?o:{})]):{};var o;s.$set(e)},r(){f=i.getBoundingClientRect()},f(){!function(t){const n=getComputedStyle(t);if("absolute"!==n.position&&"fixed"!==n.position){const{width:e,height:o}=n,r=t.getBoundingClientRect();t.style.position="absolute",t.style.width=e,t.style.height=o,O(t,r)}}(i),p(),O(i,f)},a(){p(),p=function(e,o,r,i){if(!o)return t;const s=e.getBoundingClientRect();if(o.left===s.left&&o.right===s.right&&o.top===s.top&&o.bottom===s.bottom)return t;const{delay:l=0,duration:c=300,easing:a=n,start:f=u()+l,end:d=f+c,tick:p=t,css:$}=r(e,{from:o,to:s},i);let g,h=!0,y=!1;function x(){$&&L(e,g),h=!1}return m((t=>{if(!y&&t>=f&&(y=!0),y&&t>=d&&(p(1,0),x()),!h)return!1;if(y){const n=0+1*a((t-f)/c);p(n,1-n)}return!0})),$&&(g=B(e,0,1,c,l,a,$)),l||(y=!0),p(0,1),x}(i,f,Et,{})},i(t){d||(ot(s.$$.fragment,t),W((()=>{a&&a.end(1),c=st(i,_t,{x:-500,delay:500*(r[3]+1)}),c.start()})),d=!0)},o(t){rt(s.$$.fragment,t),c&&c.invalidate(),a=lt(i,_t,{x:500}),d=!1},d(t){t&&x(i),dt(s),t&&a&&a.end()}}}function Nt(t){let n,e,o,r,i,s=[],l=new Map;e=new St({props:{title:"expense list"}});let c=t[0];const a=t=>t[1].id;for(let n=0;n<c.length;n+=1){let e=Lt(t,c,n),o=a(e);l.set(o,s[n]=jt(o,e))}let u=null;return c.length||(u=Ot()),{c(){n=b("section"),ut(e.$$.fragment),o=w(),r=b("ul");for(let t=0;t<s.length;t+=1)s[t].c();u&&u.c()},m(t,l){y(t,n,l),ft(e,n,null),$(n,o),$(n,r);for(let t=0;t<s.length;t+=1)s[t].m(r,null);u&&u.m(r,null),i=!0},p(t,[n]){if(1&n){c=t[0],nt();for(let t=0;t<s.length;t+=1)s[t].r();s=function(t,n,e,o,r,i,s,l,c,a,u,f){let d=t.length,p=i.length,m=d;const $={};for(;m--;)$[t[m].key]=m;const g=[],h=new Map,y=new Map;for(m=p;m--;){const t=f(r,i,m),l=e(t);let c=s.get(l);c?o&&c.p(t,n):(c=a(l,t),c.c()),h.set(l,g[m]=c),l in $&&y.set(l,Math.abs(m-$[l]))}const x=new Set,b=new Set;function v(t){ot(t,1),t.m(l,u),s.set(t.key,t),u=t.first,p--}for(;d&&p;){const n=g[p-1],e=t[d-1],o=n.key,r=e.key;n===e?(u=n.first,d--,p--):h.has(r)?!s.has(o)||x.has(o)?v(n):b.has(r)?d--:y.get(o)>y.get(r)?(b.add(o),v(n)):(x.add(r),d--):(c(e,s),d--)}for(;d--;){const n=t[d];h.has(n.key)||c(n,s)}for(;p;)v(g[p-1]);return g}(s,n,a,1,t,c,l,r,at,jt,null,Lt);for(let t=0;t<s.length;t+=1)s[t].a();et(),c.length?u&&(u.d(1),u=null):u||(u=Ot(),u.c(),u.m(r,null))}},i(t){if(!i){ot(e.$$.fragment,t);for(let t=0;t<c.length;t+=1)ot(s[t]);i=!0}},o(t){rt(e.$$.fragment,t);for(let t=0;t<s.length;t+=1)rt(s[t]);i=!1},d(t){t&&x(n),dt(e);for(let t=0;t<s.length;t+=1)s[t].d();u&&u.d()}}}function At(t,n,e){let{expenses:o=[]}=n;return t.$$set=t=>{"expenses"in t&&e(0,o=t.expenses)},[o]}class qt extends $t{constructor(t){super(),mt(this,t,At,Nt,l,{expenses:0})}}function Dt(n){let e,o,r,i,s;return{c(){e=b("section"),o=b("h2"),r=v(n[0]),i=v(": $"),s=v(n[1]),k(e,"class","main-title")},m(t,n){y(t,e,n),$(e,o),$(o,r),$(o,i),$(o,s)},p(t,[n]){1&n&&C(r,t[0]),2&n&&C(s,t[1])},i:t,o:t,d(t){t&&x(e)}}}function Ht(t,n,e){let{title:o="default text"}=n,{total:r=0}=n;return t.$$set=t=>{"title"in t&&e(0,o=t.title),"total"in t&&e(1,r=t.total)},[o,r]}class zt extends $t{constructor(t){super(),mt(this,t,Ht,Dt,l,{title:0,total:1})}}function It(t){let n;return{c(){n=b("p"),n.textContent="please fill all fields",k(n,"class","form-empty")},m(t,e){y(t,n,e)},d(t){t&&x(n)}}}function Pt(t){let n;return{c(){n=v("add expense")},m(t,e){y(t,n,e)},d(t){t&&x(n)}}}function Jt(t){let n;return{c(){n=v("edit expense")},m(t,e){y(t,n,e)},d(t){t&&x(n)}}}function Wt(t){let n,e,o,r,l,c,a,u,f,d,p,m,g,h,v,C,M,R,T,B,L;e=new St({props:{title:t[5]}});let O=t[4]&&It();function j(t,n){return t[2]?Jt:Pt}let N=j(t),A=N(t);return{c(){n=b("section"),ut(e.$$.fragment),o=w(),r=b("form"),l=b("div"),c=b("label"),c.textContent="name",a=w(),u=b("input"),f=w(),d=b("div"),p=b("label"),p.textContent="amount",m=w(),g=b("input"),h=w(),O&&O.c(),v=w(),C=b("button"),A.c(),M=w(),R=b("button"),R.innerHTML='<i class="fas fa-times"></i>\n      close',k(c,"for","name"),k(u,"type","text"),k(u,"id","name"),k(l,"class","form-control"),k(p,"for","amount"),k(g,"type","number"),k(g,"id","amount"),k(d,"class","form-control"),k(C,"type","submit"),k(C,"class","btn btn-block"),C.disabled=t[4],S(C,"disabled",t[4]),k(R,"type","button"),k(R,"class","close-btn"),k(r,"class","expense-form"),k(n,"class","form")},m(i,x){var b;y(i,n,x),ft(e,n,null),$(n,o),$(n,r),$(r,l),$(l,c),$(l,a),$(l,u),F(u,t[0]),$(r,f),$(r,d),$(d,p),$(d,m),$(d,g),F(g,t[1]),$(r,h),O&&O.m(r,null),$(r,v),$(r,C),A.m(C,null),$(r,M),$(r,R),T=!0,B||(L=[_(u,"input",t[9]),_(g,"input",t[10]),_(R,"click",(function(){s(t[3])&&t[3].apply(this,arguments)})),_(r,"submit",(b=t[6],function(t){return t.preventDefault(),b.call(this,t)}))],B=!0)},p(n,[e]){t=n,1&e&&u.value!==t[0]&&F(u,t[0]),2&e&&E(g.value)!==t[1]&&F(g,t[1]),t[4]?O||(O=It(),O.c(),O.m(r,v)):O&&(O.d(1),O=null),N!==(N=j(t))&&(A.d(1),A=N(t),A&&(A.c(),A.m(C,null))),(!T||16&e)&&(C.disabled=t[4]),16&e&&S(C,"disabled",t[4])},i(t){T||(ot(e.$$.fragment,t),T=!0)},o(t){rt(e.$$.fragment,t),T=!1},d(t){t&&x(n),dt(e),O&&O.d(),A.d(),B=!1,i(L)}}}function Ut(t,n,e){let o,{name:r=""}=n,{amount:i=null}=n,{addExpense:s}=n,{isEditing:l}=n,{editExpense:c}=n,{hideForm:a}=n,u=l?"editing...":"adding...";return t.$$set=t=>{"name"in t&&e(0,r=t.name),"amount"in t&&e(1,i=t.amount),"addExpense"in t&&e(7,s=t.addExpense),"isEditing"in t&&e(2,l=t.isEditing),"editExpense"in t&&e(8,c=t.editExpense),"hideForm"in t&&e(3,a=t.hideForm)},t.$$.update=()=>{3&t.$$.dirty&&e(4,o=!r||!i)},[r,i,l,a,o,u,function(){l?c({name:r,amount:i}):s({name:r,amount:i}),e(0,r=""),e(1,i=null),a()},s,c,function(){r=this.value,e(0,r)},function(){i=E(this.value),e(1,i)}]}class Gt extends $t{constructor(t){super(),mt(this,t,Ut,Wt,l,{name:0,amount:1,addExpense:7,isEditing:2,editExpense:8,hideForm:3})}}function Kt(t){let n,e,o,r,i,s;const l=t[1].default,a=function(t,n,e,o){if(t){const r=c(t,n,e,o);return t[0](r)}}(l,t,t[0],null);return{c(){n=b("div"),e=b("div"),a&&a.c(),k(e,"class","modal-content"),k(n,"class","modal-container")},m(t,o){y(t,n,o),$(n,e),a&&a.m(e,null),s=!0},p(t,[n]){a&&a.p&&(!s||1&n)&&function(t,n,e,o,r,i){if(r){const s=c(n,e,o,i);t.p(s,r)}}(a,l,t,t[0],s?function(t,n,e,o){if(t[2]&&o){const r=t[2](o(e));if(void 0===n.dirty)return r;if("object"==typeof r){const t=[],e=Math.max(n.dirty.length,r.length);for(let o=0;o<e;o+=1)t[o]=n.dirty[o]|r[o];return t}return n.dirty|r}return n.dirty}(l,t[0],n,null):function(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let t=0;t<e;t++)n[t]=-1;return n}return-1}(t[0]),null)},i(t){s||(ot(a,t),W((()=>{o||(o=ct(e,_t,{y:500},!0)),o.run(1)})),W((()=>{i&&i.end(1),r=st(n,vt,{}),r.start()})),s=!0)},o(t){rt(a,t),o||(o=ct(e,_t,{y:500},!1)),o.run(0),r&&r.invalidate(),i=lt(n,wt,{}),s=!1},d(t){t&&x(n),a&&a.d(t),t&&o&&o.end(),t&&i&&i.end()}}}function Qt(t,n,e){let{$$slots:o={},$$scope:r}=n;return t.$$set=t=>{"$$scope"in t&&e(0,r=t.$$scope)},[r,o]}class Vt extends $t{constructor(t){super(),mt(this,t,Qt,Kt,l,{})}}function Xt(t){let n,e;return n=new Vt({props:{$$slots:{default:[Yt]},$$scope:{ctx:t}}}),{c(){ut(n.$$.fragment)},m(t,o){ft(n,t,o),e=!0},p(t,e){const o={};32846&e&&(o.$$scope={dirty:e,ctx:t}),n.$set(o)},i(t){e||(ot(n.$$.fragment,t),e=!0)},o(t){rt(n.$$.fragment,t),e=!1},d(t){dt(n,t)}}}function Yt(t){let n,e;return n=new Gt({props:{addExpense:t[10],name:t[2],id:t[1],amount:t[3],isEditing:t[6],editExpense:t[11],hideForm:t[8]}}),{c(){ut(n.$$.fragment)},m(t,o){ft(n,t,o),e=!0},p(t,e){const o={};4&e&&(o.name=t[2]),2&e&&(o.id=t[1]),8&e&&(o.amount=t[3]),64&e&&(o.isEditing=t[6]),n.$set(o)},i(t){e||(ot(n.$$.fragment,t),e=!0)},o(t){rt(n.$$.fragment,t),e=!1},d(t){dt(n,t)}}}function Zt(t){let n,e,o,r,i,s,l,c,a,u,f,d;n=new yt({props:{showForm:t[7]}});let p=t[4]&&Xt(t);return i=new zt({props:{title:"total expenses",total:t[5]}}),l=new qt({props:{expenses:t[0]}}),{c(){ut(n.$$.fragment),e=w(),o=b("main"),p&&p.c(),r=w(),ut(i.$$.fragment),s=w(),ut(l.$$.fragment),c=w(),a=b("button"),a.textContent="clear expenses",k(a,"type","button"),k(a,"class","btn btn-primary btn-block"),k(o,"class","content")},m(m,g){ft(n,m,g),y(m,e,g),y(m,o,g),p&&p.m(o,null),$(o,r),ft(i,o,null),$(o,s),ft(l,o,null),$(o,c),$(o,a),u=!0,f||(d=_(a,"click",t[9]),f=!0)},p(t,[n]){t[4]?p?(p.p(t,n),16&n&&ot(p,1)):(p=Xt(t),p.c(),ot(p,1),p.m(o,r)):p&&(nt(),rt(p,1,1,(()=>{p=null})),et());const e={};32&n&&(e.total=t[5]),i.$set(e);const s={};1&n&&(s.expenses=t[0]),l.$set(s)},i(t){u||(ot(n.$$.fragment,t),ot(p),ot(i.$$.fragment,t),ot(l.$$.fragment,t),u=!0)},o(t){rt(n.$$.fragment,t),rt(p),rt(i.$$.fragment,t),rt(l.$$.fragment,t),u=!1},d(t){dt(n,t),t&&x(e),t&&x(o),p&&p.d(),dt(i),dt(l),f=!1,d()}}}function tn(t,n,e){let o,r,i=[],s="",l=null,c=null,a=!1;function u(){e(4,a=!0)}var f;return A("remove",(function(t){e(0,i=i.filter((n=>n.id!=t)))})),A("modify",(function(t){let n=i.find((n=>n.id===t));e(1,c=n.id),e(2,s=n.name),e(3,l=n.amount),u()})),f=()=>{e(0,i=localStorage.getItem("expenses")?JSON.parse(localStorage.getItem("expenses")):[])},N().$$.on_mount.push(f),function(t){N().$$.after_update.push(t)}((()=>{console.count("afterUpdate()"),localStorage.setItem("expenses",JSON.stringify(i))})),t.$$.update=()=>{2&t.$$.dirty&&e(6,o=!!c),1&t.$$.dirty&&e(5,r=i.reduce(((t,n)=>t+n.amount),0))},[i,c,s,l,a,r,o,u,function(){e(4,a=!1),e(2,s=""),e(3,l=null),e(1,c=null)},function(){e(0,i=[])},function({name:t,amount:n}){let o={id:Math.random()*Date.now(),name:t,amount:n};e(0,i=[o,...i])},function({name:t,amount:n}){e(0,i=i.map((e=>e.id===c?{...e,name:t,amount:n}:{...e}))),e(2,s=""),e(3,l=null),e(1,c=null)}]}return new class extends $t{constructor(t){super(),mt(this,t,tn,Zt,l,{})}}({target:document.body,props:{name:"world"}})}();
//# sourceMappingURL=bundle.js.map
