import { Link } from 'react-router-dom'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { ProductCard } from '../components/ProductCard'
import { categories, products } from '../data/storefront'

export function ProductsPage() {
  return (
    <div className="page-stack">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Products' }]} />

      <section className="collection-hero">
        <div>
          <p className="eyebrow">Storefront overview</p>
          <h1>Browse the full launch assortment by category.</h1>
          <p>
            This first sprint is not a full business system. It is the first credible customer-facing foundation: category merchandising, reusable product detail structure and cart flow.
          </p>
        </div>
        <div className="hero-stat-stack">
          <div className="hero-stat"><strong>3</strong><span>Categories</span></div>
          <div className="hero-stat"><strong>12</strong><span>Products</span></div>
          <div className="hero-stat"><strong>1</strong><span>Shared storefront system</span></div>
        </div>
      </section>

      <section className="section">
        <div className="category-grid">
          {categories.map((category) => (
            <article key={category.id} className="category-card">
              <p className="eyebrow">{category.label}</p>
              <h3>{category.heroTitle}</h3>
              <p>{category.listingIntro}</p>
              <Link to={`/products/${category.id}`} className="button button--ghost">
                Browse {category.label.toLowerCase()}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">All products</p>
            <h2>Cross-category snapshot</h2>
          </div>
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}
