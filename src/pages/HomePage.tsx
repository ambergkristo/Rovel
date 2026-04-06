import { Link } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard'
import { useLocale } from '../context/useLocale'
import {
  categories,
  customOrderTracks,
  products,
  trustHighlights,
} from '../data/storefront'
import { resolveText } from '../lib/localization'
import { getFeaturedProducts, getPopularProducts } from '../lib/shop'

export function HomePage() {
  const featuredProducts = getFeaturedProducts(4)
  const popularProducts = getPopularProducts(4)
  const { locale, messages } = useLocale()

  return (
    <div className="page-stack">
      <section className="hero hero--store">
        <div className="hero__content">
          <p className="eyebrow">{messages.home.eyebrow}</p>
          <h1>{messages.home.title}</h1>
          <p className="hero__lede">{messages.home.lede}</p>
          <div className="hero__actions">
            <Link to="/products/doors" className="button button--primary">
              {messages.home.shopDoors}
            </Link>
            <Link to="/custom-order" className="button button--ghost">
              {messages.home.exploreCustom}
            </Link>
          </div>
        </div>

        <div className="hero__panel">
          <div className="hero-stat">
            <strong>{products.length}</strong>
            <span>{messages.home.statCatalog}</span>
          </div>
          <div className="hero-stat">
            <strong>{categories[0] ? resolveText(categories[0].label, locale) : ''}</strong>
            <span>{messages.home.statDoors}</span>
          </div>
          <div className="hero-stat">
            <strong>ET</strong>
            <span>{messages.home.statLocale}</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{messages.home.categoryEyebrow}</p>
            <h2>{messages.home.categoryTitle}</h2>
          </div>
          <p>{messages.home.categoryText}</p>
        </div>
        <div className="category-grid">
          {categories.map((category) => (
            <article key={category.id} className="category-card category-card--rich">
              <p className="eyebrow">{resolveText(category.label, locale)}</p>
              <h3>{resolveText(category.heroTitle, locale)}</h3>
              <p>{resolveText(category.shortDescription, locale)}</p>
              <ul className="feature-list">
                {category.keyFacts.map((fact) => (
                  <li key={fact.en}>{resolveText(fact, locale)}</li>
                ))}
              </ul>
              <div className="category-card__subgrid">
                {category.merchandisingCards.slice(0, 2).map((card) => (
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

      <section className="section section--tinted">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{messages.home.trustEyebrow}</p>
            <h2>{messages.home.trustTitle}</h2>
          </div>
        </div>
        <div className="trust-grid">
          {trustHighlights.map((highlight) => (
            <article key={highlight.title.en} className="trust-card">
              <h3>{resolveText(highlight.title, locale)}</h3>
              <p>{resolveText(highlight.description, locale)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{messages.home.featuredEyebrow}</p>
            <h2>{messages.home.featuredTitle}</h2>
          </div>
          <Link to="/products" className="button button--ghost">
            {messages.home.featuredAction}
          </Link>
        </div>
        <div className="product-grid">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{messages.home.popularEyebrow}</p>
            <h2>{messages.home.popularTitle}</h2>
          </div>
        </div>
        <div className="product-grid">
          {popularProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="cta-band">
        <div>
          <p className="eyebrow">{messages.home.standardEyebrow}</p>
          <h2>{messages.home.standardTitle}</h2>
        </div>
        <Link to="/products" className="button button--primary">
          {messages.home.openStorefront}
        </Link>
      </section>

      <section className="section section--split">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{messages.home.customEyebrow}</p>
            <h2>{messages.home.customTitle}</h2>
          </div>
          <Link to="/custom-order" className="button button--ghost">
            {messages.home.customAction}
          </Link>
        </div>
        <div className="trust-grid">
          {customOrderTracks.map((track) => (
            <article key={track.title.en} className="trust-card">
              <h3>{resolveText(track.title, locale)}</h3>
              <p>{resolveText(track.description, locale)}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
