import { Link } from 'react-router-dom'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { ProductCard } from '../components/ProductCard'
import { useLocale } from '../context/useLocale'
import { categories, products } from '../data/storefront'
import { resolveText } from '../lib/localization'
import { getPopularProducts } from '../lib/shop'

export function ProductsPage() {
  const { locale, messages } = useLocale()
  const popularProducts = getPopularProducts(4)

  return (
    <div className="page-stack">
      <Breadcrumbs items={[{ label: messages.common.home, to: '/' }, { label: messages.common.products }]} />

      <section className="collection-hero">
        <div>
          <p className="eyebrow">{messages.products.overviewEyebrow}</p>
          <h1>{messages.products.overviewTitle}</h1>
          <p>{messages.products.overviewText}</p>
        </div>
        <div className="hero-stat-stack">
          <div className="hero-stat"><strong>{categories.length}</strong><span>{messages.products.overviewEyebrow}</span></div>
          <div className="hero-stat"><strong>{products.length}</strong><span>{messages.products.allProductsTitle}</span></div>
          <div className="hero-stat"><strong>ET / EN / RU</strong><span>{messages.header.language}</span></div>
        </div>
      </section>

      <section className="section">
        <div className="category-grid">
          {categories.map((category) => (
            <article key={category.id} className="category-card category-card--rich">
              <p className="eyebrow">{resolveText(category.label, locale)}</p>
              <h3>{resolveText(category.heroTitle, locale)}</h3>
              <p>{resolveText(category.listingIntro, locale)}</p>
              <div className="category-card__subgrid">
                {category.merchandisingCards.map((card) => (
                  <div key={card.title.en} className="mini-merch-card">
                    {card.eyebrow ? <span>{resolveText(card.eyebrow, locale)}</span> : null}
                    <strong>{resolveText(card.title, locale)}</strong>
                    <p>{resolveText(card.description, locale)}</p>
                  </div>
                ))}
              </div>
              <Link to={`/products/${category.id}`} className="button button--ghost">
                {messages.common.browseCategory}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{messages.products.popularSectionEyebrow}</p>
            <h2>{messages.products.popularSectionTitle}</h2>
          </div>
        </div>
        <div className="product-grid">
          {popularProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}
