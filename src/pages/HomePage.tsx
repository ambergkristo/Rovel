import { Link } from 'react-router-dom'
import { categories, customOrderTracks, trustHighlights } from '../data/storefront'
import { getFeaturedProducts } from '../lib/shop'
import { ProductCard } from '../components/ProductCard'

export function HomePage() {
  const featuredProducts = getFeaturedProducts(4)

  return (
    <div className="page-stack">
      <section className="hero">
        <div className="hero__content">
          <p className="eyebrow">Customer-facing storefront foundation</p>
          <h1>Doors, windows and stairs with a warmer, more credible ecommerce presence.</h1>
          <p className="hero__lede">
            Rovel Grupp now has a real storefront shell: browse categories, compare products, configure a practical baseline and carry items into a persistent cart before deeper custom-order systems arrive.
          </p>
          <div className="hero__actions">
            <Link to="/products/doors" className="button button--primary">
              Shop doors
            </Link>
            <Link to="/custom-order" className="button button--ghost">
              Explore custom work
            </Link>
          </div>
        </div>

        <div className="hero__panel">
          <div className="hero-stat">
            <strong>12</strong>
            <span>Launch catalog products across three categories</span>
          </div>
          <div className="hero-stat">
            <strong>Doors first</strong>
            <span>Exterior, interior, glazed and heritage ranges lead the assortment</span>
          </div>
          <div className="hero-stat">
            <strong>Custom-ready</strong>
            <span>Every category keeps a quote path visible for bespoke projects</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Category paths</p>
            <h2>Shop by product family</h2>
          </div>
          <p>
            The storefront is built to feel balanced across standard browsing and eventual custom-order behavior.
          </p>
        </div>
        <div className="category-grid">
          {categories.map((category) => (
            <article key={category.id} className="category-card">
              <p className="eyebrow">{category.label}</p>
              <h3>{category.heroTitle}</h3>
              <p>{category.shortDescription}</p>
              <ul className="feature-list">
                {category.keyFacts.map((fact) => (
                  <li key={fact}>{fact}</li>
                ))}
              </ul>
              <Link to={`/products/${category.id}`} className="button button--ghost">
                Browse {category.label.toLowerCase()}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--tinted">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Why this feels like a store</p>
            <h2>Trust signals shaped for wood-product ecommerce</h2>
          </div>
        </div>
        <div className="trust-grid">
          {trustHighlights.map((highlight) => (
            <article key={highlight.title} className="trust-card">
              <h3>{highlight.title}</h3>
              <p>{highlight.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Featured products</p>
            <h2>Strong launch assortment</h2>
          </div>
          <Link to="/products" className="button button--ghost">
            View all categories
          </Link>
        </div>
        <div className="product-grid">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="cta-band">
        <div>
          <p className="eyebrow">Standard products</p>
          <h2>Browse ready-made product lines with filters, pricing and cart flow.</h2>
        </div>
        <Link to="/products" className="button button--primary">
          Open storefront
        </Link>
      </section>

      <section className="section section--split">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Custom solutions</p>
            <h2>Keep bespoke work visible from the first sprint.</h2>
          </div>
          <Link to="/custom-order" className="button button--ghost">
            See custom path
          </Link>
        </div>
        <div className="trust-grid">
          {customOrderTracks.map((track) => (
            <article key={track.title} className="trust-card">
              <h3>{track.title}</h3>
              <p>{track.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
