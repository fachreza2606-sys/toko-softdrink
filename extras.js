(function(){
var h=document.head;
function add(t,a){var e=document.createElement(t);for(var k in a)e.setAttribute(k,a[k]);h.appendChild(e);return e}
/* PWA: manifest, meta Apple, service worker */
if(!document.querySelector('link[rel=manifest]'))add('link',{rel:'manifest',href:'manifest.json'});
[['apple-mobile-web-app-capable','yes'],['mobile-web-app-capable','yes'],['apple-mobile-web-app-title','Softdrink'],['apple-mobile-web-app-status-bar-style','black-translucent']].forEach(function(m){if(!document.querySelector('meta[name="'+m[0]+'"]'))add('meta',{name:m[0],content:m[1]})});
add('link',{rel:'apple-touch-icon',href:'icon-192.png'});
if('serviceWorker' in navigator)addEventListener('load',function(){navigator.serviceWorker.register('sw.js').catch(function(){})});
/* Gaya tambahan (kalah oleh modern.css kalau sudah ada) */
var st=document.createElement('style');
st.textContent='.chips{display:flex;gap:6px;overflow-x:auto;padding:2px 0 10px;scrollbar-width:none}.chips::-webkit-scrollbar{display:none}'
+'.chip{flex:0 0 auto;border:1px solid var(--ln);background:var(--card);color:var(--tx);padding:7px 14px;border-radius:99px;cursor:pointer;font:inherit;font-size:14px}'
+'.chip.on{background:var(--pr);color:var(--prt);border-color:var(--pr);font-weight:600}'
+':where(.cartbar){position:fixed;left:50%;transform:translateX(-50%);bottom:calc(66px + env(safe-area-inset-bottom,0px));width:calc(100% - 28px);max-width:832px;display:flex;justify-content:space-between;align-items:center;border:0;border-radius:99px;padding:13px 20px;background:var(--pr);color:var(--prt);font:inherit;font-weight:700;cursor:pointer;z-index:4;box-shadow:0 8px 24px rgba(0,0,0,.35)}';
h.appendChild(st);
/* Filter kategori di halaman Menu */
var cur='Semua';
function chips(){
 var b=document.getElementById('buyer');if(!b||b.hidden||b.querySelector('.chips'))return;
 var secs=[].map.call(b.querySelectorAll('.mg'),function(g){var l=g.previousElementSibling;l=l&&l.classList.contains('mut')?l:null;return{l:l,g:g,n:l?l.textContent.trim():'Menu'}});
 if(secs.length<2)return;
 var names=['Semua'].concat(secs.map(function(s){return s.n}));
 if(names.indexOf(cur)<0)cur='Semua';
 var bar=document.createElement('div');bar.className='chips';
 function apply(){secs.forEach(function(s){var show=cur==='Semua'||s.n===cur;if(s.l)s.l.hidden=!show;s.g.hidden=!show});[].forEach.call(bar.children,function(c){c.classList.toggle('on',c.textContent===cur)})}
 names.forEach(function(n){var c=document.createElement('button');c.type='button';c.className='chip';c.textContent=n;c.onclick=function(){cur=n;apply()};bar.appendChild(c)});
 var first=secs[0].l||secs[0].g;first.parentNode.insertBefore(bar,first);apply();
}
var b=document.getElementById('buyer');
if(b){new MutationObserver(chips).observe(b,{childList:true});chips()}
})();
