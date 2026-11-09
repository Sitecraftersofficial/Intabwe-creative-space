import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Reveal from "../components/Reveal/Reveal";
import { PRODUCTS, PRODUCT_CATEGORIES } from "../data/products";
import "./shop.css";

export default function ShopPage() {
  const [searchParams] = useSearchParams();
  const requestedCategory = searchParams.get("category");
  const [category, setCategory] = useState(() =>
    PRODUCT_CATEGORIES.includes(requestedCategory)
      ? requestedCategory
      : "All products",
  );
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");
  const [bag, setBag] = useState({});
  const [bagOpen, setBagOpen] = useState(false);

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = PRODUCTS.filter((product) => {
      const matchesCategory =
        category === "All products" || product.category === category;
      const matchesQuery =
        !normalizedQuery ||
        `${product.name} ${product.category}`.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });

    return sort === "name"
      ? [...filtered].sort((a, b) => a.name.localeCompare(b.name))
      : filtered;
  }, [category, query, sort]);

  const bagCount = Object.values(bag).reduce((total, quantity) => total + quantity, 0);

  const categoryCards = PRODUCT_CATEGORIES.filter(
    (item) => item !== "All products",
  ).map((item) => ({
    name: item,
    image: PRODUCTS.find((product) => product.category === item)?.image,
    count: PRODUCTS.filter((product) => product.category === item).length,
  }));

  function addToBag(productId) {
    setBag((current) => ({
      ...current,
      [productId]: (current[productId] || 0) + 1,
    }));
  }

  return (
    <main id="main" className="shop-page">
      <section className="container shop-content" id="products">
        <div className="shop-heading">
          <div>
            <p className="shop-eyebrow">INTAMBWE CREATIVE SPACE</p>
            <h1>Shop products</h1>
            <p>Explore pieces selected for your home and everyday spaces.</p>
          </div>
        </div>

        <section className="shop-category-section" aria-label="Shop categories">
          <div className="shop-section-heading">
            <h2>Shop by category</h2>
            <button
              type="button"
              className="shop-view-all"
              onClick={() => setCategory("All products")}
            >
              View all products <span aria-hidden="true">→</span>
            </button>
          </div>
          <div className="shop-category-grid">
            {categoryCards.map((item) => (
              <button
                key={item.name}
                type="button"
                className={`shop-category-card ${category === item.name ? "is-active" : ""}`}
                aria-pressed={category === item.name}
                onClick={() => setCategory(item.name)}
              >
                <span className="shop-category-image">
                  <img src={item.image} alt="" loading="lazy" />
                </span>
                <span className="shop-category-name">{item.name}</span>
                <span className="shop-category-count">{item.count} items</span>
              </button>
            ))}
          </div>
        </section>

        <section className="shop-listing" aria-label="Product listing">
          <div className="shop-toolbar">
            <div className="shop-listing-title">
              <h2>{category}</h2>
              <p>{visibleProducts.length} products</p>
            </div>
            <div className="shop-tools">
              <label className="shop-search">
                <span className="sr-only">Search products</span>
                <input
                  type="search"
                  placeholder="Search products"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </label>
              <label className="shop-sort">
                <span className="sr-only">Sort products</span>
                <select
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                >
                  <option value="featured">Sort: Featured</option>
                  <option value="name">Name</option>
                </select>
              </label>
              <button
                className="shop-bag-button"
                type="button"
                aria-expanded={bagOpen}
                aria-controls="shop-bag"
                onClick={() => setBagOpen((open) => !open)}
              >
                Cart ({bagCount})
              </button>
            </div>
          </div>

          <div className="shop-results">
            {bagOpen && (
              <aside className="shop-bag" id="shop-bag" aria-live="polite">
                <div>
                  <h3>Your cart</h3>
                  <button
                    type="button"
                    className="shop-bag-close"
                    aria-label="Close cart"
                    onClick={() => setBagOpen(false)}
                  >
                    ×
                  </button>
                </div>
                {bagCount === 0 ? (
                  <p>Your cart is empty.</p>
                ) : (
                  <>
                    <ul>
                      {PRODUCTS.filter((product) => bag[product.id]).map(
                        (product) => (
                          <li key={product.id}>
                            <span>{product.name}</span>
                            <span>Qty {bag[product.id]}</span>
                          </li>
                        ),
                      )}
                    </ul>
                    <p className="shop-placeholder-note">
                      Prices and checkout will be available when product details
                      are added.
                    </p>
                  </>
                )}
              </aside>
            )}

            {visibleProducts.length ? (
              <div className="shop-grid">
                {visibleProducts.map((product, index) => (
                  <Reveal
                    as="article"
                    className="shop-card"
                    key={product.id}
                    delay={index * 60}
                  >
                    <div className="shop-card-image">
                      <img src={product.image} alt="" loading="lazy" />
                      <span className="shop-placeholder-badge">Sample item</span>
                    </div>
                    <div className="shop-card-info">
                      <div>
                        <h3>{product.name}</h3>
                        <p>{product.category}</p>
                      </div>
                      <p className="shop-price">Price coming soon</p>
                      <button type="button" onClick={() => addToBag(product.id)}>
                        Add to cart
                      </button>
                    </div>
                  </Reveal>
                ))}
              </div>
            ) : (
              <div className="shop-empty">
                <h3>No products found</h3>
                <p>Try a different search or category.</p>
                <button
                  type="button"
                  onClick={() => {
                    setCategory("All products");
                    setQuery("");
                  }}
                >
                  Show all products
                </button>
              </div>
            )}
          </div>
        </section>
      </section>

      <section className="container shop-contact">
        <p>Looking for something specific?</p>
        <Link to="/contact">Talk to our team →</Link>
      </section>
    </main>
  );
}
