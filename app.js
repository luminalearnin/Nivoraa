const sitePrefix = location.hostname === 'luminalearnin.github.io' ? '/Nivoraa' : '';
const imagePath = name => `${sitePrefix}/assets/${name}`;
function currentRoute() { const pathname = location.pathname; return sitePrefix && (pathname === sitePrefix || pathname.startsWith(`${sitePrefix}/`)) ? pathname.slice(sitePrefix.length) || '/' : pathname || '/'; }
function siteUrl(path) { const url = new URL(path, location.origin); let pathname = url.pathname; if (sitePrefix && pathname !== sitePrefix && !pathname.startsWith(`${sitePrefix}/`)) pathname = `${sitePrefix}${pathname === '/' ? '/' : pathname}`; return `${pathname}${url.search}${url.hash}`; }
function syncRouteLinks() { document.querySelectorAll('a[data-route]').forEach(link => { const target = link.dataset.routeTarget || link.getAttribute('href') || '/'; link.dataset.routeTarget = target; link.setAttribute('href', siteUrl(target)); }); }

const products = [
  { id: 'gulabi-midi', slug: 'gulabi-midi', name: 'The Gulabi Midi', category: 'women', categoryLabel: 'For her · New in', price: 2890, image: imagePath('dress-rose.webp'), badge: 'Just landed', description: 'A soft, sweeping silhouette for slow brunches and the spontaneous plan after. Light, easy, and designed to make the everyday feel like an occasion.', sizes: ['XS', 'S', 'M', 'L', 'XL'], color: 'Rose · sample' },
  { id: 'noir-dress', slug: 'noir-dress', name: 'After Hours in Noir', category: 'women', categoryLabel: 'For her · Occasions', price: 3490, image: imagePath('black-evening.webp'), badge: 'The occasion edit', description: 'A little drama, a lot of movement. This sample evening look has an airy, layered feel made for nights that deserve a second look.', sizes: ['XS', 'S', 'M', 'L'], color: 'Midnight · sample' },
  { id: 'sunday-cotton', slug: 'sunday-cotton', name: 'Sunday Cotton Set', category: 'women', categoryLabel: 'For her · Everyday', price: 2290, image: imagePath('cotton-set.webp'), badge: 'Easy does it', description: 'An easy-breezy cotton-inspired set in a garden-soft print. A comfortable, put-together sample look for warm afternoons.', sizes: ['S', 'M', 'L', 'XL'], color: 'Sage · sample' },
  { id: 'small-moments', slug: 'small-moments', name: 'Small Moments Set', category: 'jewellery', categoryLabel: 'Jewellery · Finishing touches', price: 1190, image: imagePath('jewelry-set.webp'), badge: 'A little shine', description: 'A delicate trio-inspired jewellery sample: fine chain, sculptural studs and a subtle everyday gleam. Material, plating and exact set contents are illustrative only.', sizes: ['One size'], color: 'Warm gold · sample' }
];
const categories = [
  { slug: 'women', title: 'For her', sub: 'WOMEN · THE NEW EDIT', image: imagePath('dress-rose.webp') },
  { slug: 'men', title: 'For him', sub: 'MEN · DETAILS TO FOLLOW', image: imagePath('menswear-editorial.webp') },
  { slug: 'kids', title: 'For little ones', sub: 'KIDS · DETAILS TO FOLLOW', image: imagePath('kidswear-editorial.webp') },
  { slug: 'jewellery', title: 'Jewellery', sub: 'THE FINISHING TOUCH', image: imagePath('jewelry-set.webp') }
];
const imageHero = imagePath('editorial-hero.webp');
const currency = value => `₹${Number(value).toLocaleString('en-IN')}`;
const app = document.querySelector('#main-content');
const cartCount = document.querySelector('#cart-count');
const drawer = document.querySelector('#cart-drawer');
const overlay = document.querySelector('#overlay');
const modal = document.querySelector('#message-modal');
const cartLinesEl = document.querySelector('#cart-lines');
const cartEmpty = document.querySelector('#cart-empty');
const cartSummary = document.querySelector('#cart-summary');
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#site-search');
let activeFilter = 'all';
let selectedSize = {};
let toastTimer;
let cart = readCart();

function readCart() { try { return JSON.parse(localStorage.getItem('nivoraa-demo-cart') || '[]'); } catch { return []; } }
function saveCart() { localStorage.setItem('nivoraa-demo-cart', JSON.stringify(cart)); }
function setRoute(path, replace = false) { const destination = siteUrl(path); if (replace) history.replaceState({}, '', destination); else history.pushState({}, '', destination); renderRoute(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
function linkAttrs(route) { return `href="${route}" data-route`; }
function productCard(product) {
  return `<article class="product-card"><a class="product-photo" href="/products/${product.slug}" data-route aria-label="View ${product.name}"><img src="${product.image}" alt="Illustrative editorial photograph for ${product.name}" loading="lazy" /><span class="product-badge">${product.badge}</span></a><button class="quick-add" type="button" aria-label="Add ${product.name} to sample bag" data-add="${product.id}">+</button><div class="product-info"><span class="product-category">${product.categoryLabel}</span><div class="product-title-row"><a class="product-title" href="/products/${product.slug}" data-route>${product.name}</a><span class="product-price">${currency(product.price)}</span></div><div class="price-hint">Illustrative price · sample only</div></div></article>`;
}
function homeTemplate() {
  return `<div class="page-shell"><section class="hero" aria-labelledby="hero-title"><div class="hero-copy"><span class="hero-kicker">A fashion store from Guwahati</span><h1 id="hero-title">Stand out.<br /><em>Don’t blend</em> in.</h1><p class="hero-subtitle">Good clothes have a way of making a regular day feel like your day. Find your next favourite in our little corner of Guwahati.</p><div class="hero-actions"><a class="button button-dark" href="/shop" data-route>Explore the edit <span>↗</span></a><a class="text-link" href="#about" data-scroll>Get to know us</a></div><div class="hero-meta"><b>✳</b> Women · Men · Kids · Jewellery</div></div><div class="hero-visual"><span class="hero-arch" aria-hidden="true"></span><div class="hero-photo-frame"><img src="${imageHero}" alt="Illustrative independent fashion editorial for Nivoraa" fetchpriority="high" /></div><span class="hero-index">NIVORAA · THE NEW EDIT</span><div class="hero-photo-stamp"><div><span>MADE TO</span>Stand out</div></div></div></section>
  <section class="categories-section" aria-labelledby="category-title"><div class="section-heading"><div><span class="eyebrow">Find your kind of lovely</span><h2 id="category-title">A good place to start.</h2></div><p>Four little corners. One point of view.</p></div><div class="category-list">${categories.map(category => `<a class="category-card" ${linkAttrs(`/collections/${category.slug}`)}><img src="${category.image}" alt="Illustrative ${category.title} fashion" loading="lazy" /><span class="category-label"><span>${category.sub}</span><b>${category.title}</b></span><span class="category-arrow" aria-hidden="true">↗</span></a>`).join('')}</div></section>
  <section class="products-section" aria-labelledby="new-in-title"><div class="section-heading"><div><span class="eyebrow">A few good things</span><h2 id="new-in-title">The new edit.</h2></div><a class="button button-outline" href="/shop" data-route>See all pieces <span>↗</span></a></div><div class="product-grid">${products.map(productCard).join('')}</div></section>
  <section class="editorial-band" id="about"><div class="editorial-image"><img src="${imageHero}" alt="Illustrative styling from a warm, independent boutique" loading="lazy" /></div><div class="editorial-copy"><span class="eyebrow">A little place called Guwahati</span><h2>Local roots.<br /><em>Far-reaching</em> style.</h2><p>Nivoraa’s Instagram profile describes a Guwahati fashion store with a point of view all its own. We’re making room here to tell that story—with a little more space to find what feels like you.</p><a class="text-link" href="https://www.instagram.com/nivoraa.guwahati/" target="_blank" rel="noreferrer">See the profile that started it all ↗</a></div></section>
  <section class="about-note"><span class="about-mark" aria-hidden="true">N</span><div><h2>From Guwahati, with a little extra.</h2><p>The supplied profile says pan-India delivery. This site’s shipping availability, rates and timelines are not yet verified—please check before placing a real order.</p></div></section></div>`;
}
function shopTemplate(category = null, query = '') {
  const collection = categories.find(item => item.slug === category);
  const title = collection ? collection.title : (query ? `Looking for “${escapeHtml(query)}”` : 'Shop the edit');
  const description = category && ['men', 'kids'].includes(category) ? 'More from this part of the Nivoraa story is on its way. This preview has no verified men’s or kids’ product listings yet—ask the boutique for current availability.' : 'Curated sample pieces to help you explore the feel of Nivoraa. Product information, stock and prices are illustrative until confirmed.';
  return `<div class="page-shell collection-page"><div class="collection-header"><div><span class="eyebrow">Nivoraa · Guwahati</span><h1 class="page-title">${title}</h1></div><p class="collection-intro">${description}</p></div><section class="products-section" aria-label="Products"><div class="shop-tools"><div class="filter-chips" role="group" aria-label="Filter products by category"><button class="chip ${activeFilter === 'all' ? 'active' : ''}" data-filter="all">Everything</button><button class="chip ${activeFilter === 'women' ? 'active' : ''}" data-filter="women">For her</button><button class="chip ${activeFilter === 'jewellery' ? 'active' : ''}" data-filter="jewellery">Jewellery</button><button class="chip ${activeFilter === 'men' ? 'active' : ''}" data-filter="men">For him</button><button class="chip ${activeFilter === 'kids' ? 'active' : ''}" data-filter="kids">For kids</button></div><label class="sr-only" for="sort-products">Sort products</label><select class="sort-select" id="sort-products"><option value="featured">Sort: Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option><option value="az">Name: A to Z</option></select></div><div class="product-grid" id="shop-grid"></div></section></div>`;
}
function productTemplate(product) {
  return `<div class="page-shell"><div class="product-detail"><div class="detail-photo"><img src="${product.image}" alt="Illustrative editorial photograph for ${product.name}" /><span class="detail-photo-caption">Sample image · 01 / 01</span></div><div class="detail-copy"><div class="breadcrumbs"><a href="/" data-route>Home</a> &nbsp; / &nbsp; <a href="/shop" data-route>Shop</a> &nbsp; / &nbsp; ${product.categoryLabel}</div><span class="eyebrow">${product.categoryLabel}</span><h1 class="detail-title">${product.name}</h1><div class="detail-price">${currency(product.price)}</div><div class="detail-price-note">Illustrative price · sample only · not a confirmed listing</div><p class="detail-description">${product.description}</p><div class="option-title">Sample colour</div><button class="chip active" type="button">${product.color}</button><div class="option-title">Select a sample size</div><div class="size-row">${product.sizes.map((size, index) => `<button class="size-choice ${index === 0 ? 'selected' : ''}" type="button" data-size="${escapeHtml(size)}" aria-pressed="${index === 0}">${size}</button>`).join('')}</div><div class="detail-buttons"><button class="button button-dark" type="button" data-add="${product.id}">Add to sample bag <span>＋</span></button><button class="button button-outline" type="button" data-action="enquire">Ask about this piece <span>↗</span></button></div><p class="availability-note">Availability and size options shown here are demonstration content, not live stock.</p><div class="detail-trust"><span>Guwahati boutique identity inspired by the supplied profile.</span><span>Delivery eligibility and timelines require confirmation.</span><span>Secure online checkout is not connected in this preview.</span></div></div></div><section class="detail-more"><div class="section-heading"><div><span class="eyebrow">Keep looking</span><h2>A few more favourites.</h2></div><a class="text-link" href="/shop" data-route>All pieces ↗</a></div><div class="product-grid">${products.filter(item => item.id !== product.id).slice(0, 2).map(productCard).join('')}</div></section></div>`;
}
function escapeHtml(value) { return String(value).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]); }
function visibleProducts() {
  const q = new URLSearchParams(location.search).get('q')?.toLowerCase().trim() || '';
  let items = products.filter(product => (activeFilter === 'all' || product.category === activeFilter) && (!q || `${product.name} ${product.categoryLabel} ${product.description}`.toLowerCase().includes(q)));
  const sort = document.querySelector('#sort-products')?.value || 'featured';
  if (sort === 'low') items.sort((a, b) => a.price - b.price);
  if (sort === 'high') items.sort((a, b) => b.price - a.price);
  if (sort === 'az') items.sort((a, b) => a.name.localeCompare(b.name));
  return items;
}
function refreshGrid() {
  const grid = document.querySelector('#shop-grid');
  if (!grid) return;
  const items = visibleProducts();
  grid.innerHTML = items.length ? items.map(productCard).join('') : `<div class="empty-state"><h3>Nothing in this edit just yet.</h3><p>The preview catalogue is intentionally small. Ask the boutique about current availability or browse another category.</p><button class="button button-outline" type="button" data-filter="all">Browse everything</button></div>`;
}
function renderRoute() {
  const path = currentRoute().replace(/\/$/, '') || '/';
  activeFilter = path.startsWith('/collections/') ? (path.split('/')[2] || 'all') : 'all';
  if (path === '/') app.innerHTML = homeTemplate();
  else if (path === '/shop') app.innerHTML = shopTemplate(null, new URLSearchParams(location.search).get('q') || '');
  else if (path.startsWith('/collections/')) app.innerHTML = shopTemplate(activeFilter);
  else if (path.startsWith('/products/')) {
    const product = products.find(item => item.slug === path.split('/')[2]);
    app.innerHTML = product ? productTemplate(product) : notFoundTemplate();
  } else app.innerHTML = notFoundTemplate();
  refreshGrid();
  updateCartUI();
  syncRouteLinks();
  document.title = path.startsWith('/products/') ? `${products.find(p => p.slug === path.split('/')[2])?.name || 'Style'} — Nivoraa` : path === '/' ? 'Nivoraa — Stand out. Don’t blend in.' : `${activeFilter !== 'all' ? categories.find(c => c.slug === activeFilter)?.title || 'Edit' : 'Shop the edit'} — Nivoraa`;
}
function notFoundTemplate() { return `<div class="page-shell not-found"><span class="eyebrow">This page took a little detour</span><h1>Not quite this way.</h1><p>Take a look at what’s in the edit instead.</p><a class="button button-dark" href="/shop" data-route>Shop the edit <span>↗</span></a></div>`; }
function showToast(message) { const toast = document.querySelector('#toast'); toast.textContent = message; toast.classList.add('visible'); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('visible'), 2100); }
function addItem(id) { const product = products.find(item => item.id === id); if (!product) return; const size = selectedSize[id] || product.sizes[0]; const found = cart.find(item => item.id === id && item.size === size); if (found) found.qty += 1; else cart.push({ id, size, qty: 1 }); saveCart(); updateCartUI(); showToast(`${product.name} added to your sample bag.`); }
function updateCartUI() {
  const total = cart.reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll('.cart-count').forEach(el => { el.textContent = total; });
  if (!cartLinesEl) return;
  cartEmpty.hidden = total > 0;
  cartSummary.hidden = total === 0;
  cartLinesEl.innerHTML = cart.map(item => { const p = products.find(product => product.id === item.id); if (!p) return ''; return `<div class="cart-line"><img src="${p.image}" alt="" /><div><h3>${p.name}</h3><p>Sample size: ${escapeHtml(item.size)} · illustrative listing</p><div class="quantity-control"><button type="button" aria-label="Decrease quantity" data-qty="-1" data-id="${p.id}" data-size="${escapeHtml(item.size)}">−</button><span>${item.qty}</span><button type="button" aria-label="Increase quantity" data-qty="1" data-id="${p.id}" data-size="${escapeHtml(item.size)}">+</button></div><button class="remove-link" data-remove="${p.id}" data-size="${escapeHtml(item.size)}">Remove</button></div><span class="cart-line-price">${currency(p.price * item.qty)}</span></div>`; }).join('');
  document.querySelector('#cart-subtotal').textContent = currency(cart.reduce((sum, item) => sum + (products.find(p => p.id === item.id)?.price || 0) * item.qty, 0));
}
function openCart() { drawer.hidden = false; overlay.hidden = false; document.body.style.overflow = 'hidden'; drawer.querySelector('.close-button').focus(); }
function closePanels() { drawer.hidden = true; modal.hidden = true; overlay.hidden = true; document.body.style.overflow = ''; }
function openMessage() { drawer.hidden = true; modal.hidden = false; overlay.hidden = false; modal.querySelector('.modal-close').focus(); }
function adjustQty(id, size, amount) { const entry = cart.find(item => item.id === id && item.size === size); if (!entry) return; entry.qty += amount; if (entry.qty <= 0) cart = cart.filter(item => item !== entry); saveCart(); updateCartUI(); }
function removeItem(id, size) { cart = cart.filter(item => !(item.id === id && item.size === size)); saveCart(); updateCartUI(); }

searchForm.addEventListener('submit', event => { event.preventDefault(); const q = searchInput.value.trim(); setRoute(q ? `/shop?q=${encodeURIComponent(q)}` : '/shop'); if (window.matchMedia('(max-width:720px)').matches) searchForm.classList.remove('expanded'); });
searchForm.querySelector('button').addEventListener('click', event => { if (!window.matchMedia('(max-width:720px)').matches || searchForm.classList.contains('expanded')) return; event.preventDefault(); searchForm.classList.add('expanded'); searchInput.focus(); });
searchInput.addEventListener('focus', () => { if (window.matchMedia('(max-width:720px)').matches) searchForm.classList.add('expanded'); });

document.addEventListener('click', event => {
  const routeLink = event.target.closest('[data-route]');
  if (routeLink) { if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return; event.preventDefault(); closePanels(); document.querySelector('#mobile-nav').hidden = true; document.querySelector('[data-action="menu"]').setAttribute('aria-expanded', 'false'); setRoute(routeLink.dataset.routeTarget || routeLink.getAttribute('href')); return; }
  const scrollLink = event.target.closest('[data-scroll]');
  if (scrollLink) { event.preventDefault(); closePanels(); document.querySelector('#mobile-nav').hidden = true; const id = scrollLink.getAttribute('href'); if (currentRoute() !== '/') setRoute('/'); setTimeout(() => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' }), 25); return; }
  const add = event.target.closest('[data-add]'); if (add) { addItem(add.dataset.add); return; }
  const filter = event.target.closest('[data-filter]'); if (filter) { activeFilter = filter.dataset.filter; document.querySelectorAll('.chip[data-filter]').forEach(chip => chip.classList.toggle('active', chip.dataset.filter === activeFilter)); refreshGrid(); return; }
  const action = event.target.closest('[data-action]')?.dataset.action;
  if (action === 'cart') openCart();
  if (action === 'close') closePanels();
  if (action === 'enquire') openMessage();
  if (action === 'message-close') closePanels();
  if (action === 'menu') { const nav = document.querySelector('#mobile-nav'); nav.hidden = !nav.hidden; event.target.closest('[data-action="menu"]').setAttribute('aria-expanded', String(!nav.hidden)); }
  const qty = event.target.closest('[data-qty]'); if (qty) adjustQty(qty.dataset.id, qty.dataset.size, Number(qty.dataset.qty));
  const remove = event.target.closest('[data-remove]'); if (remove) removeItem(remove.dataset.remove, remove.dataset.size);
  const size = event.target.closest('[data-size]'); if (size) { document.querySelectorAll('[data-size]').forEach(button => { button.classList.toggle('selected', button === size); button.setAttribute('aria-pressed', String(button === size)); }); const routeId = currentRoute().split('/')[2]; selectedSize[products.find(p => p.slug === routeId)?.id] = size.dataset.size; }
});

document.querySelector('#sort-products')?.addEventListener('change', refreshGrid);
document.addEventListener('change', event => { if (event.target.id === 'sort-products') refreshGrid(); });
overlay.addEventListener('click', closePanels);
document.addEventListener('keydown', event => { if (event.key === 'Escape') { closePanels(); document.querySelector('#mobile-nav').hidden = true; document.querySelector('[data-action="menu"]').setAttribute('aria-expanded', 'false'); } });
window.addEventListener('popstate', renderRoute);
renderRoute();
