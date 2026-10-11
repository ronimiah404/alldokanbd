"use client";

import { useMemo, useState } from "react";

type Product = {
  id: number; name: string; category: string; price: number; oldPrice?: number;
  emoji: string; color: string; rating: string; tag?: string; description: string;
};

const products: Product[] = [
  { id: 1, name: "Everyday Wireless Earbuds", category: "Electronics", price: 1290, oldPrice: 1790, emoji: "🎧", color: "lavender", rating: "4.8", tag: "BESTSELLER", description: "Compact wireless earbuds for music, calls, and everyday commutes." },
  { id: 2, name: "Insulated Travel Tumbler", category: "Home & Living", price: 690, oldPrice: 850, emoji: "🥤", color: "mint", rating: "4.7", tag: "−19%", description: "A reusable tumbler for your desk, commute, or weekend trips." },
  { id: 3, name: "Classic Everyday Backpack", category: "Fashion", price: 1450, emoji: "🎒", color: "peach", rating: "4.6", description: "A versatile daily backpack with room for the essentials." },
  { id: 4, name: "Glow Desk Lamp", category: "Home & Living", price: 980, oldPrice: 1190, emoji: "💡", color: "yellow", rating: "4.9", tag: "POPULAR", description: "A warm, cozy desk light for work, study, and reading." },
  { id: 5, name: "Minimal Wrist Watch", category: "Fashion", price: 1890, oldPrice: 2290, emoji: "⌚", color: "blue", rating: "4.5", description: "A clean, timeless look that pairs easily with everyday outfits." },
  { id: 6, name: "Daily Skincare Set", category: "Beauty", price: 1150, emoji: "🧴", color: "pink", rating: "4.7", tag: "NEW", description: "A simple self-care set to refresh your daily routine." },
  { id: 7, name: "Portable Mini Speaker", category: "Electronics", price: 1590, oldPrice: 1990, emoji: "🔊", color: "mint", rating: "4.6", description: "Take your favorite playlists from room to room." },
  { id: 8, name: "Soft Cushion Set", category: "Home & Living", price: 790, emoji: "🛋️", color: "lavender", rating: "4.8", description: "A soft accent set to add a little comfort to your space." },
];

const categories = [
  { name: "All products", emoji: "✳️" },
  { name: "Electronics", emoji: "🎧" },
  { name: "Fashion", emoji: "👜" },
  { name: "Home & Living", emoji: "🏡" },
  { name: "Beauty", emoji: "✨" },
];

const taka = (amount: number) => `৳${amount.toLocaleString("en-BD")}`;

export default function Home() {
  const [cart, setCart] = useState<Record<number, number>>({});
  const [activeCategory, setActiveCategory] = useState("All products");
  const [search, setSearch] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderDone, setOrderDone] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [customer, setCustomer] = useState({ name: "", phone: "", address: "" });

  const filtered = useMemo(() => products.filter(p =>
    (activeCategory === "All products" || p.category === activeCategory) &&
    `${p.name} ${p.category} ${p.description}`.toLowerCase().includes(search.toLowerCase())
  ), [activeCategory, search]);

  const cartItems = products.filter(p => cart[p.id]);
  const itemCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  const subtotal = cartItems.reduce((sum, p) => sum + p.price * cart[p.id], 0);
  const shipping = subtotal === 0 || subtotal >= 2500 ? 0 : 80;

  function addToCart(id: number) {
    setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    setOrderDone(false);
  }
  function changeQty(id: number, amount: number) {
    setCart(prev => {
      const next = { ...prev };
      next[id] = (next[id] || 0) + amount;
      if (next[id] <= 0) delete next[id];
      return next;
    });
  }
  function placeOrder(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!itemCount) return;
    const order = { customer, items: cartItems.map(p => ({ name: p.name, quantity: cart[p.id], price: p.price })), subtotal, shipping, total: subtotal + shipping, createdAt: new Date().toISOString() };
    try {
      const previous = JSON.parse(localStorage.getItem("alldokan_demo_orders") || "[]");
      localStorage.setItem("alldokan_demo_orders", JSON.stringify([...previous, order]));
    } catch {}
    setOrderDone(true);
    setCart({});
    setCheckoutOpen(false);
    setCartOpen(false);
  }

  return (
    <main>
      <div className="announcement">A little something for your everyday ✨ <span>Free delivery on orders over ৳2,500</span></div>
      <header className="site-header">
        <a className="brand" href="#" aria-label="Alldokan home"><span className="brand-mark">a</span><span>alldokan<span className="brand-dot">.</span><small>YOUR EVERYDAY DOKAN</small></span></a>
        <nav className={mobileMenu ? "nav-links nav-open" : "nav-links"}>
          <a href="#shop" onClick={() => setMobileMenu(false)}>Shop all</a>
          <a href="#categories" onClick={() => setMobileMenu(false)}>Categories</a>
          <a href="#why-us" onClick={() => setMobileMenu(false)}>Why Alldokan</a>
        </nav>
        <div className="header-actions">
          <label className="header-search"><span>⌕</span><input aria-label="Search products" placeholder="Search products..." value={search} onChange={e => { setSearch(e.target.value); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); }} /></label>
          <button className="cart-button" onClick={() => setCartOpen(true)} aria-label={`Open cart, ${itemCount} items`}>♧ <span>Cart</span><b>{itemCount}</b></button>
          <button className="menu-toggle" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Toggle menu">☰</button>
        </div>
      </header>

      {orderDone && <div className="success-banner">🎉 Demo order saved in this browser! Connect a backend before accepting real orders. <button onClick={() => setOrderDone(false)}>Dismiss</button></div>}

      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span></span> THE LITTLE THINGS, DELIVERED</div>
          <h1>Good finds.<br /><em>Good prices.</em><br />All in one dokan.</h1>
          <p>Discover everyday essentials and little upgrades that make life feel a bit better. Curated for you, delivered to your door.</p>
          <div className="hero-buttons"><a className="primary-button" href="#shop">Explore the store <span>↗</span></a><a className="text-button" href="#categories">Browse categories ↓</a></div>
          <div className="hero-proof"><div className="avatar-stack"><span>😊</span><span>🧡</span><span>🌼</span></div><div><strong>Your next favorite find awaits</strong><small>Thoughtful picks for everyday life</small></div></div>
        </div>
        <div className="hero-art">
          <div className="art-orbit orbit-one"></div><div className="art-orbit orbit-two"></div>
          <div className="hero-sun">✳</div>
          <div className="hero-product product-main"><div className="hero-product-emoji">🎧</div><div className="hero-product-caption"><span>DAILY ESSENTIALS</span><strong>Little things. Big joy.</strong></div></div>
          <div className="floating-card floating-top"><span>✦</span><div><b>Picked for you</b><small>Everyday favorites</small></div></div>
          <div className="floating-card floating-bottom"><span className="mini-emoji">📦</span><div><b>Doorstep happiness</b><small>Right to your door</small></div></div>
          <div className="hero-spark spark-one">✦</div><div className="hero-spark spark-two">✳</div>
        </div>
      </section>

      <section className="trust-strip">
        <div><span>🚚</span><p><b>Easy delivery</b><small>Across Bangladesh</small></p></div>
        <div><span>💳</span><p><b>Cash on delivery</b><small>Pay when it arrives</small></p></div>
        <div><span>♡</span><p><b>Curated with care</b><small>Useful finds, fair prices</small></p></div>
        <div><span>↺</span><p><b>Here to help</b><small>Friendly customer support</small></p></div>
      </section>

      <section className="categories-section" id="categories">
        <div className="section-heading"><div><span className="eyebrow">A LITTLE OF EVERYTHING</span><h2>Find your kind of <em>good.</em></h2></div><p>Everyday picks for every corner<br />of your life.</p></div>
        <div className="category-grid">
          {categories.slice(1).map((c, i) => <button className={`category-tile cat-${i}`} key={c.name} onClick={() => { setActiveCategory(c.name); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); }}><span className="category-emoji">{c.emoji}</span><span><b>{c.name}</b><small>{[ "Tech made simple", "Your everyday style", "Make home feel like you", "A little self-care" ][i]}</small></span><i>↗</i></button>)}
        </div>
      </section>

      <section className="shop-section" id="shop">
        <div className="section-heading shop-heading"><div><span className="eyebrow">THE GOOD STUFF</span><h2>Popular <em>right now.</em></h2></div><span className="product-count">{filtered.length} products to explore</span></div>
        <div className="filter-row">
          <div className="filter-pills">{categories.map(c => <button key={c.name} className={activeCategory === c.name ? "filter-pill active" : "filter-pill"} onClick={() => setActiveCategory(c.name)}>{c.name}</button>)}</div>
          <label className="mobile-search">⌕ <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search the store" /></label>
        </div>
        <div className="product-grid">
          {filtered.map(p => <article className="product-card" key={p.id}>
            <div className={`product-image ${p.color}`}><span className="product-emoji">{p.emoji}</span>{p.tag && <span className="product-tag">{p.tag}</span>}<button className="quick-add" onClick={() => addToCart(p.id)} aria-label={`Add ${p.name} to cart`}>+</button></div>
            <div className="product-info"><div className="product-meta"><span>{p.category}</span><span>★ {p.rating}</span></div><h3>{p.name}</h3><p className="product-description">{p.description}</p><div className="price-row"><div><strong>{taka(p.price)}</strong>{p.oldPrice && <del>{taka(p.oldPrice)}</del>}</div><button className="add-button" onClick={() => addToCart(p.id)}>Add to cart <span>+</span></button></div></div>
          </article>)}
        </div>
        {filtered.length === 0 && <div className="empty-state"><span>🔎</span><h3>No finds just yet</h3><p>Try another search or explore a different category.</p><button className="primary-button" onClick={() => { setSearch(""); setActiveCategory("All products"); }}>See all products</button></div>}
      </section>

      <section className="promo-section" id="why-us"><div className="promo-art"><span className="promo-flower">✿</span><span className="promo-bag">🛍️</span><span className="promo-star">✦</span></div><div className="promo-copy"><span className="eyebrow">YOUR NEW FAVORITE STORE</span><h2>Shopping should feel <em>this easy.</em></h2><p>Good products, clear prices, and a smoother way to find those everyday things you didn’t know you needed.</p><a className="primary-button" href="#shop">Find your next favorite <span>↗</span></a></div></section>

      <section className="newsletter"><div><span className="eyebrow">A NOTE FROM THE DOKAN</span><h2>Good things are <em>on the way.</em></h2><p>Stay close for new finds, little offers, and everyday inspiration.</p></div><form onSubmit={e => { e.preventDefault(); alert("Thanks for your interest! Newsletter signup is a demo for now."); }}><input type="email" required placeholder="Your email address" aria-label="Your email address" /><button type="submit">Keep me posted ↗</button></form></section>

      <footer className="footer"><div className="footer-top"><a className="brand footer-brand" href="#"><span className="brand-mark">a</span><span>alldokan<span className="brand-dot">.</span><small>YOUR EVERYDAY DOKAN</small></span></a><p>Good finds for everyday life.<br />Made for your little moments.</p><div className="footer-links"><a href="#shop">Shop</a><a href="#categories">Categories</a><a href="mailto:hello@alldokan.com">Contact us</a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Alldokan. All rights reserved.</span><span>Made with care in Bangladesh 🇧🇩</span></div></footer>

      {cartOpen && <div className="drawer-backdrop" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={e => e.stopPropagation()}><div className="drawer-heading"><div><span className="eyebrow">YOUR LITTLE FINDS</span><h2>Your cart <span>({itemCount})</span></h2></div><button className="close-button" onClick={() => setCartOpen(false)} aria-label="Close cart">×</button></div>
        {cartItems.length === 0 ? <div className="empty-cart"><span>🛍️</span><h3>Your cart is taking a nap.</h3><p>Add something lovely to get started.</p><button className="primary-button" onClick={() => setCartOpen(false)}>Explore products ↗</button></div> : <>
          <div className="cart-items">{cartItems.map(p => <div className="cart-item" key={p.id}><div className={`cart-thumb ${p.color}`}>{p.emoji}</div><div className="cart-item-detail"><b>{p.name}</b><strong>{taka(p.price)}</strong><div className="quantity-control"><button onClick={() => changeQty(p.id, -1)} aria-label="Decrease quantity">−</button><span>{cart[p.id]}</span><button onClick={() => changeQty(p.id, 1)} aria-label="Increase quantity">+</button></div></div><button className="remove-item" onClick={() => changeQty(p.id, -cart[p.id])} aria-label={`Remove ${p.name}`}>×</button></div>)}</div>
          <div className="cart-summary"><div><span>Subtotal</span><b>{taka(subtotal)}</b></div><div><span>Delivery</span><b>{shipping === 0 ? "FREE" : taka(shipping)}</b></div>{subtotal > 0 && subtotal < 2500 && <small>Add {taka(2500-subtotal)} more for free delivery.</small>}<div className="total-line"><span>Total</span><b>{taka(subtotal+shipping)}</b></div><button className="primary-button checkout-button" onClick={() => { setCartOpen(false); setCheckoutOpen(true); }}>Continue to checkout ↗</button><p className="demo-note">🔒 Demo checkout · Cash on delivery</p></div>
        </>}
      </aside></div>}

      {checkoutOpen && <div className="drawer-backdrop checkout-backdrop" onClick={() => setCheckoutOpen(false)}><section className="checkout-modal" onClick={e => e.stopPropagation()}><div className="drawer-heading"><div><span className="eyebrow">ALMOST YOURS</span><h2>Delivery details</h2></div><button className="close-button" onClick={() => setCheckoutOpen(false)} aria-label="Close checkout">×</button></div><p className="checkout-intro">Where should we bring your good finds?</p><form className="checkout-form" onSubmit={placeOrder}><label>Full name<input required value={customer.name} onChange={e => setCustomer({...customer,name:e.target.value})} placeholder="Your name" /></label><label>Phone number<input required type="tel" pattern="[0-9+() -]{8,}" value={customer.phone} onChange={e => setCustomer({...customer,phone:e.target.value})} placeholder="01XXXXXXXXX" /></label><label>Delivery address<textarea required rows={3} value={customer.address} onChange={e => setCustomer({...customer,address:e.target.value})} placeholder="House, road, area, district" /></label><div className="payment-choice"><span>Payment method</span><b>💵 Cash on delivery</b><small>Demo only — no payment will be collected.</small></div><div className="checkout-total"><span>Total including delivery</span><strong>{taka(subtotal+shipping)}</strong></div><button className="primary-button checkout-button" type="submit">Place demo order ↗</button><p className="demo-note">This test version saves the order only in this browser.</p></form></section></div>}
    </main>
  );
}
