# Nivoraa — Website PRD & Design

## Product summary
A mobile-first storefront and brand-discovery experience for Nivoraa, a Guwahati fashion boutique. The site translates the supplied Instagram profile into a more shoppable destination while retaining the source identity: **“Stand out. Don’t blend in.”** The screenshot describes women’s, men’s and kids’ fashion, jewellery, and pan-India delivery. These are reference-sourced statements; all operational details and all seeded inventory/prices remain illustrative pending verification.

## Goals
1. Make Nivoraa’s point of view recognizable within the first screen.
2. Let visitors discover fashion and jewellery through categories, collections, search, filters and product details.
3. Offer low-friction contact/order-assistance actions while making unverified details transparent.
4. Deliver an accessible experience across phone, tablet and desktop.

## Audience & use cases
- Guwahati-area shoppers discovering a local boutique and its style.
- Pan-India visitors browsing the collection (delivery availability, rates and timing are unverified).
- Visitors looking for women’s fashion, jewellery, men’s or kids’ styles.
- Social-profile visitors who want to browse a featured look, find an item, ask a question, or reach the store.

## Scope
**In scope:** responsive homepage; brand statement; editorial fashion visuals; categories and collections; illustrative product cards/details, sizes and availability; search/filter/sort; local demonstration cart; contact/enquiry links; placeholder disclosure; Instagram-inspired editorial discovery.

**Not configured / deferred:** Shopify integration and production checkout (the Shopify power-up was not selected); verified live inventory, prices, sizes, delivery rules, return policies, store address/phone, WhatsApp number and social account URL. Do not fabricate these facts. Replace explicitly marked demo values before launch.

## Information architecture
- `/` — Brand-led home, featured collection, categories, curated products, editorial strip and contact callout.
- `/shop` — All products with query/filter/sort state.
- `/collections/:slug` — Category or collection listing.
- `/products/:slug` — Product gallery, title, illustrative price/status, size/color choices, cart or enquiry action.
- `#about`, `#contact` — Brand and contact sections within the home experience.

## Functional requirements
- Visitors can navigate categories and collections, search products, filter by category, and sort the displayed catalog.
- Product cards link to detail pages. Product details include an image gallery, size/color choices when applicable, an illustrative price/availability indicator and a clear cart/enquiry action.
- Add-to-cart updates a visible cart count and cart drawer; quantities can be changed or removed. Cart is a demonstration only and does not submit payment or create a real order.
- Provide contact/order-help actions with conspicuous placeholder labels; never create a working link to invented customer-service details.
- Show a persistent, unobtrusive notice that product, price, inventory, delivery and business-contact data is illustrative/unverified.
- Responsive navigation supports mobile and desktop; keyboard users can operate menus, filters, gallery controls and cart.

## Design direction
- **Movement:** contemporary boutique editorial with quiet luxury and a vivid social-commerce edge, grounded in the dark Instagram reference without reproducing Instagram UI.
- **Principles:** image-led; clear merchandising; warm and human; transparent about uncertain data.
- **Color philosophy:** warm ivory and ink provide a tactile editorial canvas; restrained rose-magenta evokes the reference’s profile-ring energy; muted olive and champagne reinforce garment/jewellery warmth.
- **Layout paradigm:** asymmetrical editorial opening, flowing section transitions, category-led horizontal browsing on narrow screens, and flexible product rows rather than a generic centered dashboard grid.
- **Signature elements:** thin multicolor halo around the Nivoraa monogram; oversized editorial serif headlines paired with concise sans-serif utility copy; small pill labels for “Guwahati” and “Illustrative sample”.
- **Interaction philosophy:** direct, calm, touch-first; obvious affordances, no hover-only controls, with reduced-motion support.
- **Animation:** subtle opacity/translate reveal, 180–260 ms button/drawer transitions and gentle image scale on hover; respect `prefers-reduced-motion`; avoid autoplay.
- **Typography:** Cormorant Garamond for display/editorial moments, DM Sans for body, navigation and controls; strong readable sizes and generous line-height.
- **Brand essence:** expressive everyday fashion from a Guwahati boutique for shoppers who want to stand apart; **bold, warm, curated**.
- **Brand voice:** self-assured, playful, plainspoken. Examples: “Stand out. Don’t blend in.” / “A little unexpected. Entirely you.”
- **Wordmark/logo:** custom typeset NIVORAA wordmark with an N-inspired half-sun/needle mark, set inside a thin rose-to-coral halo; avoid dependence on autogenerated raster lettering.
- **Ownable brand color:** vivid hibiscus/rose-magenta, used as a controlled accent.

## Success indicators
- Visitors can reach a category/product/contact action from the first screen without confusion.
- Search, filters, sorting, product options and the demo cart behave coherently on touch and keyboard.
- Illustrative facts are never presented as verified operational promises.

## Content and assumptions
The screenshot is the sole supplied business reference. The profile name is “nivoraa.guwahati”; the store calls itself “Nivoraa | Guwahati’s Fashion store”; the bio says “Stand out. Don’t blend in.”, women/men/kids, Guwahati, and pan-India delivery. Product photos, SKUs, pricing, sizes, policies, phone, messaging link, address, exact social URL and branding assets were not supplied. Any sample merchandising or counts are design placeholders.
