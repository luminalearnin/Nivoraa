const BASE = location.hostname === 'luminalearnin.github.io' ? '/Nivoraa/' : '/';
const legacy = (() => {
  const p = location.pathname;
  if (p === BASE || p.endsWith('/index.html')) return null;
  let rel = (p.startsWith(BASE) ? p.slice(BASE.length) : p.replace(/^\//, '')).replace(/\/$/, '');
  if (rel === 'shop') rel = 'collections/all';
  return `${BASE}#/${rel}`;
})();
if (legacy) location.replace(legacy); else start();

function start() {
  const IG = 'https://www.instagram.com/nivoraa.guwahati/';
  const DM = 'https://ig.me/m/nivoraa.guwahati';
  const A = n => `assets/${n}`;
  const I = {
    plus: '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
    bm: '<svg viewBox="0 0 24 24"><path d="M7 4h10v16l-5-4-5 4V4Z"/></svg>',
    arrow: '<svg viewBox="0 0 24 24"><path d="M5 12h14m-5-5 5 5-5 5"/></svg>'
  };
  const P = [
    { id: 'gulabi-midi', n: 'The Gulabi Midi', c: 'women', cl: 'For her', p: 2890, img: A('dress-rose.webp'), o: '50% 30%', sizes: ['XS', 'S', 'M', 'L', 'XL'], tag: 'Just landed', d: 'A soft, sweeping silhouette for slow brunches and the spontaneous plan after. Light, easy, and designed to make the everyday feel like an occasion.' },
    { id: 'noir-dress', n: 'After Hours in Noir', c: 'women', cl: 'For her', p: 3490, img: A('black-evening.webp'), o: '50% 28%', sizes: ['XS', 'S', 'M', 'L'], tag: 'Occasion edit', d: 'A little drama, a lot of movement. An airy, layered evening look made for nights that deserve a second look.' },
    { id: 'sunday-cotton', n: 'Sunday Cotton Set', c: 'women', cl: 'For her', p: 2290, img: A('cotton-set.webp'), o: '50% 32%', sizes: ['S', 'M', 'L', 'XL'], tag: 'Easy does it', d: 'An easy-breezy cotton-inspired set in a garden-soft print. Comfortable and put-together for warm afternoons.' },
    { id: 'small-moments', n: 'Small Moments Set', c: 'jewellery', cl: 'Jewellery', p: 1190, img: A('jewelry-set.webp'), o: '50% 40%', sizes: ['One size'], tag: 'A little shine', d: 'A delicate trio of fine chain, sculptural studs and a subtle everyday gleam.' }
  ];
  const C = [
    { s: 'women', t: 'For her', img: A('dress-rose.webp') },
    { s: 'men', t: 'For him', img: A('menswear-editorial.webp') },
    { s: 'kids', t: 'For little ones', img: A('kidswear-editorial.webp') },
    { s: 'jewellery', t: 'Jewellery', img: A('jewelry-set.webp') }
  ];
  // Public profile/category signals: Women, Men, Kids, jewellery highlights,
  // and current clothing/footwear edits. Product records remain unchanged.
  const EDITS = ['Dresses', 'Co-ord sets', 'Tops', 'Pants', 'Jewellery', 'Shoes', 'Men', 'Kids'];
  const HERO = A('editorial-hero.webp');
  const INFO = {
    story: ['Our story', 'Nivoraa is a fashion store from Guwahati for expressive, everyday style. Stand out. Don’t blend in.'],
    ship: ['Shipping', 'Nivoraa delivers across India from Guwahati. Rates and timelines are confirmed when you order.'],
    ret: ['Returns & exchange', 'Message the store on Instagram with your order details and they will guide you through returns and exchanges.'],
    track: ['Track your order', 'Message the store on Instagram with your order details and they will share an update.'],
    faq: ['FAQ’s', 'Questions about sizes, availability or delivery? Message the store on Instagram and they will help.'],
    terms: ['Terms of service', 'Order terms are shared by the store when you place an order.'],
    size: ['Size guide', 'Not sure about your size? Message the store on Instagram with your measurements and they will help you pick.']
  };
  const $ = s => document.querySelector(s);
  const fmt = n => n.toLocaleString('en-IN');
  const price = n => `RS. ${fmt(n)}`;
  const find = id => P.find(p => p.id === id);
  const ls = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch (e) { return d; } };
  const lset = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage unavailable */ } };
  let bag = ls('nivoraa-bag', []).filter(l => find(l.id));
  let saved = ls('nivoraa-saved', []).filter(find);
  let recent = ls('nivoraa-recent', []).filter(find);
  let sel = null, F = { sort: 'featured', price: 'all' }, curCat = 'all', toastT;

  const view = $('#view'), sheet = $('#sheet'), scrim = $('#scrim'), menu = $('#menu');
  const isSaved = id => saved.includes(id);

  /* ---------- pieces ---------- */
  const slides = p => `<div class="slides" data-slides><div><img src="${p.img}" alt="${p.n}" loading="lazy" decoding="async"></div><div class="z" style="--o:${p.o}"><img src="${p.img}" alt="${p.n}, close-up" loading="lazy" decoding="async"></div></div>`;
  const dots = n => `<span class="dots">${Array.from({ length: n }, (_, i) => `<i class="${i ? '' : 'on'}"></i>`).join('')}</span>`;
  const bm = id => `<button class="bm ${isSaved(id) ? 'on' : ''}" data-save="${id}" aria-label="Save to wishlist">${I.bm}</button>`;
  const card = p => `<article class="pc" data-id="${p.id}"><div class="pimg">${slides(p)}${bm(p.id)}${dots(2)}</div><div class="pmeta"><a href="#/products/${p.id}"><b>${p.n}</b><small>${price(p.p)}</small></a><button data-quick="${p.id}" aria-label="Quick add ${p.n}">${I.plus}</button></div></article>`;
  const hcard = p => `<article class="hc" data-id="${p.id}"><div class="pimg">${slides(p)}${bm(p.id)}${dots(2)}</div><div class="pmeta"><a href="#/products/${p.id}"><b>${p.n}</b><small>${price(p.p)}</small></a><button data-quick="${p.id}" aria-label="Quick add ${p.n}">${I.plus}</button></div></article>`;
  const glideCard = p => `<a class="sc product-slide" href="#/products/${p.id}"><div class="pglide-img">${slides(p)}</div><div class="pglide-meta"><small>${p.cl}</small><b>${p.n}</b><span>${price(p.p)}</span></div></a>`;
  const editStrip = `<section class="edit-strip"><div class="edit-copy"><span class="tag2">The Nivoraa edit</span><h2>Pieces for every version of you.</h2><p>From everyday clothes and pants to jewellery, shoes and occasion finds — browse the current store edit or ask the Guwahati team for what’s in stock.</p><a class="chip dark" href="${IG}" target="_blank" rel="noopener">See current drops ↗</a></div><div class="edit-tags">${EDITS.map(x => `<span>${x}</span>`).join('')}</div></section>`;
  const storeCard = `<div class="st"><div class="stimg"><b>Nivoraa</b><span>Guwahati · Assam</span></div><div class="stm"><b>Guwahati</b><small>Guwahati, Assam<br>@nivoraa.guwahati</small></div><a class="stl" href="${IG}" target="_blank" rel="noopener">Visit on Instagram ↗</a></div>`;
  const footer = () => `<footer class="ft"><div class="flogo">Nivoraa</div><div class="fgrid">
    <div><h4>Connect with us</h4><a href="${IG}" target="_blank" rel="noopener">Instagram</a><a href="${DM}" target="_blank" rel="noopener">Message us</a></div>
    <div><h4>We are NIVORAA</h4><button data-info="story">Our story</button><a href="#/stores">Our store</a><a href="#/collections/all">Collections</a></div>
    <div><h4>Order Support</h4><button data-info="ret">Make a return/Exchange</button><button data-info="track">Track your order</button><button data-info="ship">Shipping policy</button><button data-info="faq">FAQ’s</button><button data-info="terms">Terms</button></div>
  </div><div class="copy">© 2026 Nivoraa, Guwahati. All rights reserved.<small>Prices shown are preview prices and are confirmed by the store when you order.</small></div></footer>`;

  /* ---------- views ---------- */
  const home = () => `<section class="hero" style="--hero:url('${HERO}')"><div class="hero-in"><p class="tagline">Stand out. <em>Don’t blend in.</em></p><a class="shopnow" href="#/collections/all">Shop now</a></div></section>
  <section class="blk"><div class="bh"><h2>Latest drop</h2><a class="chip dark" href="#/collections/all">Discover more</a></div><div class="pg">${P.map(card).join('')}</div></section>
  <section class="blk white"><div class="bh"><h2>For her</h2><a class="chip dark" href="#/collections/women">Discover more</a></div><div class="hs">${P.filter(p => p.c === 'women').map(hcard).join('')}</div></section>
  <section class="stackwrap product-glide"><div class="bh"><h2>Glide through the edit</h2><a class="chip dark" href="#/collections/all">View all</a></div><div class="stack" id="stack">${P.map(glideCard).join('')}</div></section>
  ${editStrip}
  <section class="blk white"><span class="tag2">Our store · Guwahati</span><div class="hs">${storeCard}</div></section>
  <section class="blk white seo"><h3>Feel the style of Nivoraa, a fashion store from Guwahati</h3><p>Nivoraa brings expressive everyday style from Guwahati: clothes, pants, co-ord sets, jewellery, shoes and finishing touches picked to make a regular day feel like your day.</p><p id="seo-more" hidden>Delivery across India is mentioned on the store’s profile. Rates and timelines are confirmed when you order.</p><button class="more" data-act="more">Read more...</button>
    <div class="pop"><b>Popular searches</b></div><div class="pop"><a href="#/collections/all">Shop by category</a><a href="#/collections/all">Shop by style</a><a href="#/collections/all">Shop by color</a></div></section>
  ${footer()}`;

  const chipsHtml = () => [['all', 'View all'], ['women', 'For her'], ['jewellery', 'Jewellery'], ['men', 'For him'], ['kids', 'For kids']].map(([s, t]) => `<a class="chip ${curCat === s ? 'on' : ''}" href="#/collections/${s}">${t}</a>`).join('');
  const list = () => {
    let l = P.filter(p => curCat === 'all' || p.c === curCat);
    if (F.price === 'low') l = l.filter(p => p.p < 2500);
    if (F.price === 'high') l = l.filter(p => p.p >= 2500);
    if (F.sort === 'low') l.sort((a, b) => a.p - b.p);
    if (F.sort === 'high') l.sort((a, b) => b.p - a.p);
    if (F.sort === 'az') l.sort((a, b) => a.n.localeCompare(b.n));
    return l;
  };
  const gridHtml = () => { const l = list(); return l.length ? `<div class="pg">${l.map(card).join('')}</div>` : `<div class="empty"><h3>Nothing in this edit just yet.</h3><p>More is on its way. Message the store on Instagram to ask about current availability.</p></div>`; };
  const collections = () => `<section class="tc"><h1>${curCat === 'all' ? 'All Products' : (C.find(c => c.s === curCat)?.t || 'All Products')}</h1><div class="chips">${chipsHtml()}</div></section><section class="gridwrap" id="grid">${gridHtml()}</section>${footer()}`;

  const tabs = { det: p => `<h4>Details</h4><p>${p.cl} · ${p.tag}</p><h4>Description</h4><p>${p.d}</p>`, care: () => '<p>Care details are shared with each piece. Message the store on Instagram for fabric-specific care.</p>', ship: () => '<p>Delivery across India from Guwahati. Rates and timelines are confirmed when you order.</p>' };
  const product = p => {
    const more = P.filter(x => x.id !== p.id);
    const rec = recent.filter(id => id !== p.id).map(find);
    return `<div class="pdm"><div class="crumb"><a href="#/">Home</a> &gt; <a href="#/collections/${p.c}">${p.cl}</a> &gt; ${p.n}</div>
    <div class="gal" id="gal"><div class="slides" data-slides><div><img src="${p.img}" alt="${p.n}"></div><div class="z" style="--o:${p.o}"><img src="${p.img}" alt="${p.n}, close-up"></div></div><span class="cnt" id="cnt">1 / 2</span></div>
    <div class="pi"><div class="nm"><h1>${p.n}</h1><button class="sv bm-i ${isSaved(p.id) ? 'on' : ''}" data-save="${p.id}" aria-label="Save">${I.bm}</button><button class="sg" data-info="size">Size Guide</button></div>
    <p class="pp">${price(p.p)}</p>
    <div class="sz" id="sz">${p.sizes.map((s, i) => `<button class="${i ? '' : 'on'}" data-size="${s}">${s}</button>`).join('')}</div>
    <button class="btn" data-act="add" data-id="${p.id}">Add to bag</button><button class="btn k" data-act="buy" data-id="${p.id}">Buy now</button></div></div>
    <section class="tabs"><div class="tb"><button class="on" data-tab="det">Details &amp; Description</button><button data-tab="care">Washcare</button><button data-tab="ship">Shipping</button></div><div class="tp" id="tp">${tabs.det(p)}</div></section>
    ${rec.length ? `<section class="blk white"><div class="bh"><h2>Recently visited</h2></div><div class="hs">${rec.map(hcard).join('')}</div></section>` : ''}
    <section class="blk"><div class="bh"><h2>More from Nivoraa</h2><a class="chip dark" href="#/collections/all">Discover more</a></div><div class="pg">${more.slice(0, 2).map(card).join('')}</div></section>${footer()}`;
  };
  const stores = () => `<section class="tc"><h1>Stores across India</h1><span class="tag2" style="margin:0">Guwahati · Instagram</span></section><section class="gridwrap"><div class="storegrid">${storeCard}</div></section>${footer()}`;
  const account = () => `<div class="acc"><a class="back" href="#/">← Back to Nivoraa</a><div class="alogo">Nivoraa</div><div class="box"><h1>Sign in</h1><p class="mut">Sign in or create an account</p>
    <a class="igb" href="${DM}" target="_blank" rel="noopener">Message Nivoraa on Instagram</a><div class="or">or</div>
    <form id="sf"><label class="em"><input type="email" id="se" placeholder="Email" required autocomplete="email"><button aria-label="Continue">${I.arrow}</button></label>
    <label class="chk"><input type="checkbox" checked> Email me with news and offers</label>
    <p class="tos">By continuing, you agree to our <a href="#" data-info="terms">Terms of service</a></p></form><p class="msg" id="am" role="status"></p></div></div>`;
  const notFound = () => `<div class="empty" style="padding-top:140px"><h3>Not quite this way.</h3><p>Take a look at what’s new instead.</p><a class="chip dark" href="#/collections/all">Shop all</a></div>${footer()}`;

  /* ---------- sheets / panels ---------- */
  function openSheet(html, cls = '') { $('#toast').classList.remove('on'); menu.classList.remove('open'); sheet.className = 'sheet open ' + cls; sheet.innerHTML = `<div class="grab"></div><button class="sx" data-act="close" aria-label="Close">×</button>${html}`; scrim.classList.add('on'); document.body.classList.add('lock'); }
  function closeAll() { sheet.classList.remove('open'); menu.classList.remove('open'); scrim.classList.remove('on'); document.body.classList.remove('lock'); }
  function toast(t) { const el = $('#toast'); el.textContent = t; el.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove('on'), 1800); }
  const sizesHtml = p => `<div class="opts" id="qs">${p.sizes.map((s, i) => `<button class="chip ${i ? '' : 'on'}" data-qsize="${s}">${s}</button>`).join('')}</div>`;
  function quick(id) { const p = find(id); sel = p.sizes[0]; openSheet(`<h3>${p.n}</h3><p class="sub">${price(p.p)}</p><div class="lbl">Select size</div>${sizesHtml(p)}<button class="btn k" data-act="qadd" data-id="${id}">Add to bag</button>`); }
  function addBag(id, size) { const l = bag.find(x => x.id === id && x.size === size); l ? l.qty++ : bag.push({ id, size, qty: 1 }); lset('nivoraa-bag', bag); badge(); }
  function badge() { const n = bag.reduce((a, l) => a + l.qty, 0); $('#bc').textContent = n; $('#bc').hidden = !n; }
  function bagSheet() {
    if (!bag.length) return openSheet('<h3>Your bag</h3><p class="sub">Your bag is empty. A little room for something lovely.</p><a class="btn k" href="#/collections/all">Shop all</a>');
    const total = bag.reduce((a, l) => a + find(l.id).p * l.qty, 0);
    openSheet(`<h3>Your bag (${bag.reduce((a, l) => a + l.qty, 0)})</h3>${bag.map((l, i) => { const p = find(l.id); return `<div class="row"><img src="${p.img}" alt=""><div><b>${p.n}</b><span>Size ${l.size}</span><div class="qty"><button data-q="${i}" data-d="-1" aria-label="Fewer">−</button><i>${l.qty}</i><button data-q="${i}" data-d="1" aria-label="More">+</button></div></div><b>${price(p.p * l.qty)}</b></div>`; }).join('')}<div class="tot"><span>Total</span><span>${price(total)}</span></div><button class="btn k" data-act="checkout">Buy now</button>`);
  }
  let co = [];
  function checkout(lines) {
    co = lines; const total = lines.reduce((a, l) => a + find(l.id).p * l.qty, 0);
    openSheet(`<h3>Your order</h3><p class="sub">One last look</p>${lines.map(l => { const p = find(l.id); return `<div class="row"><img src="${p.img}" alt=""><div><b>${p.n}</b><span>Size ${l.size} × ${l.qty}</span></div><b>${price(p.p * l.qty)}</b></div>`; }).join('')}<div class="tot"><span>Total</span><span>${price(total)}</span></div><button class="btn r" data-act="place">Place order</button><div class="done" id="cm" role="status"></div>`);
  }
  function place() {
    const L = co.map((l, i) => { const p = find(l.id); return `${i + 1}. ${p.n} · Size ${l.size} × ${l.qty} – ${price(p.p * l.qty)}`; }).join('\n');
    $('#cm').innerHTML = `Thanks! Online payment isn’t open yet, so the store confirms orders directly. <a href="${DM}" target="_blank" rel="noopener">Message the store on Instagram to confirm →</a><p class="note">Tip: copy your order summary below and paste it in the chat.</p><p class="note" style="white-space:pre-line">${L}</p>`;
    sheet.querySelector('[data-act=place]').hidden = true;
  }
  function wishSheet() {
    openSheet(`<h3>Saved pieces</h3>${saved.length ? saved.map(id => { const p = find(id); return `<div class="row"><img src="${p.img}" alt=""><div><b>${p.n}</b><span>${price(p.p)}</span></div><a class="chip" href="#/products/${p.id}">View</a></div>`; }).join('') : '<p class="sub">Tap the bookmark on any piece to save it here.</p>'}`);
  }
  function filtersSheet() {
    const o = (k, v, t) => `<button class="chip ${F[k] === v ? 'on' : ''}" data-f="${k}:${v}">${t}</button>`;
    openSheet(`<h3>Advance Filters</h3><div class="lbl">Sort by</div><div class="opts">${o('sort', 'featured', 'Featured')}${o('sort', 'low', 'Price: low to high')}${o('sort', 'high', 'Price: high to low')}${o('sort', 'az', 'Name: A to Z')}</div><div class="lbl">Price</div><div class="opts">${o('price', 'all', 'All')}${o('price', 'low', 'Under RS. 2,500')}${o('price', 'high', 'RS. 2,500 &amp; above')}</div><button class="btn k" data-act="close">Show ${list().length} ${list().length === 1 ? 'piece' : 'pieces'}</button>`);
  }
  function searchSheet() { openSheet('<input class="sq" id="sq" type="search" placeholder="Search Nivoraa" autocomplete="off" aria-label="Search"><div id="sr"></div>', 'full'); results(''); setTimeout(() => $('#sq')?.focus(), 150); }
  function results(q) {
    q = q.trim().toLowerCase();
    const l = q ? P.filter(p => `${p.n} ${p.cl} ${p.d}`.toLowerCase().includes(q)) : [];
    $('#sr').innerHTML = !q ? `<p class="sub" style="margin-top:18px">Try “dress”, “set” or “jewellery”.</p>` : l.length ? l.map(p => `<a class="row" href="#/products/${p.id}"><img src="${p.img}" alt=""><div><b>${p.n}</b><span>${p.cl}</span></div><b>${price(p.p)}</b></a>`).join('') : '<p class="sub" style="margin-top:18px">No pieces match that search.</p>';
  }

  /* ---------- router ---------- */
  function route() {
    const parts = (location.hash.replace(/^#/, '') || '/').split('/').filter(Boolean);
    const [a, b] = parts; closeAll();
    let page = 'home', title = 'Nivoraa — Stand out. Don’t blend in.';
    if (!a) view.innerHTML = home();
    else if (a === 'collections') { page = 'collections'; curCat = ['all', 'women', 'men', 'kids', 'jewellery'].includes(b) ? b : 'all'; view.innerHTML = collections(); title = 'Collections — Nivoraa'; }
    else if (a === 'products' && find(b)) { const p = find(b); page = 'product'; sel = p.sizes[0]; view.innerHTML = product(p); title = `${p.n} — Nivoraa`; recent = [p.id, ...recent.filter(x => x !== p.id)].slice(0, 6); lset('nivoraa-recent', recent); }
    else if (a === 'account') { page = 'account'; view.innerHTML = account(); title = 'Sign in — Nivoraa'; }
    else if (a === 'stores') { page = 'stores'; view.innerHTML = stores(); title = 'Our store — Nivoraa'; }
    else { page = 'other'; view.innerHTML = notFound(); }
    document.body.dataset.page = page; document.title = title;
    document.querySelectorAll('[data-nav]').forEach(el => el.classList.toggle('on', el.dataset.nav === page));
    window.scrollTo({ top: 0, behavior: 'instant' }); fx(); onScroll();
  }
  window.addEventListener('hashchange', route);

  /* ---------- stacked cards + chat button ---------- */
  function fx() {
    const s = $('#stack'); if (!s) return;
    const r = s.getBoundingClientRect(), cx = r.left + r.width / 2;
    [...s.children].forEach(c => { const b = c.getBoundingClientRect(), d = Math.min(Math.abs(b.left + b.width / 2 - cx) / b.width, 1.6); c.style.transform = `scale(${1 - .13 * d})`; c.style.zIndex = 10 - Math.round(d * 3); c.style.filter = `brightness(${1 - .2 * d})`; });
  }
  function onScroll() { $('#chat').classList.toggle('show', scrollY > 120); }
  document.addEventListener('scroll', e => {
    if (e.target === document) { onScroll(); return; }
    const t = e.target;
    if (t.id === 'stack') fx();
    if (t.matches?.('[data-slides]')) {
      const i = Math.round(t.scrollLeft / t.clientWidth), host = t.parentElement;
      host.querySelectorAll('.dots i').forEach((d, k) => d.classList.toggle('on', k === i));
      const cnt = host.querySelector('.cnt'); if (cnt) cnt.textContent = `${i + 1} / 2`;
    }
  }, true);
  window.addEventListener('resize', fx);

  /* ---------- events ---------- */
  document.addEventListener('click', e => {
    const t = e.target; let el;
    if ((el = t.closest('[data-info]'))) { e.preventDefault(); const [h, b] = INFO[el.dataset.info]; openSheet(`<h3>${h}</h3><p class="sub">${b}</p><a class="btn k" href="${DM}" target="_blank" rel="noopener">Message on Instagram</a>`); return; }
    if ((el = t.closest('[data-act]'))) {
      const a = el.dataset.act;
      if (a === 'close') closeAll();
      else if (a === 'menu') { menu.classList.add('open'); scrim.classList.add('on'); document.body.classList.add('lock'); }
      else if (a === 'bag') bagSheet(); else if (a === 'wish') wishSheet(); else if (a === 'search') searchSheet(); else if (a === 'filters') filtersSheet();
      else if (a === 'add') { addBag(el.dataset.id, sel); toast('Added to your bag'); }
      else if (a === 'buy') checkout([{ id: el.dataset.id, size: sel, qty: 1 }]);
      else if (a === 'qadd') { addBag(el.dataset.id, sel); closeAll(); toast('Added to your bag'); }
      else if (a === 'checkout') checkout(bag.map(x => ({ ...x })));
      else if (a === 'place') place();
      else if (a === 'more') { $('#seo-more').hidden = false; el.hidden = true; }
      return;
    }
    if ((el = t.closest('[data-save]'))) { const id = el.dataset.save; saved = isSaved(id) ? saved.filter(x => x !== id) : [...saved, id]; lset('nivoraa-saved', saved); document.querySelectorAll(`[data-save="${id}"]`).forEach(b => b.classList.toggle('on', isSaved(id))); toast(isSaved(id) ? 'Saved' : 'Removed from saved'); return; }
    if ((el = t.closest('[data-quick]'))) { quick(el.dataset.quick); return; }
    if ((el = t.closest('[data-size]'))) { sel = el.dataset.size; document.querySelectorAll('#sz button').forEach(b => b.classList.toggle('on', b === el)); return; }
    if ((el = t.closest('[data-qsize]'))) { sel = el.dataset.qsize; document.querySelectorAll('#qs button').forEach(b => b.classList.toggle('on', b === el)); return; }
    if ((el = t.closest('[data-tab]'))) { const p = find(location.hash.split('/')[2]); document.querySelectorAll('[data-tab]').forEach(b => b.classList.toggle('on', b === el)); $('#tp').innerHTML = tabs[el.dataset.tab](p); return; }
    if ((el = t.closest('[data-f]'))) { const [k, v] = el.dataset.f.split(':'); F[k] = v; el.parentElement.querySelectorAll('.chip').forEach(c => c.classList.toggle('on', c === el)); const g = $('#grid'); if (g) g.innerHTML = gridHtml(); const btn = sheet.querySelector('[data-act=close]'); if (btn && btn.classList.contains('btn')) { const n = list().length; btn.textContent = `Show ${n} ${n === 1 ? 'piece' : 'pieces'}`; } return; }
    if ((el = t.closest('[data-q]'))) { const i = +el.dataset.q; bag[i].qty += +el.dataset.d; if (bag[i].qty <= 0) bag.splice(i, 1); lset('nivoraa-bag', bag); badge(); bagSheet(); return; }
    if ((el = t.closest('.pimg'))) { const c = el.closest('[data-id]'); if (c) location.hash = `#/products/${c.dataset.id}`; return; }
    if (t.closest('.sheet a, .drawer a, .scrim')) closeAll();
  });
  document.addEventListener('input', e => { if (e.target.id === 'sq') results(e.target.value); });
  document.addEventListener('submit', e => { if (e.target.id === 'sf') { e.preventDefault(); $('#am').textContent = 'Thanks! Sign-in is coming soon.'; e.target.reset(); } });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAll(); });

  badge(); route();
}
