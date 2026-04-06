import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { ProductCard } from '../components/ProductCard'
import { useCart } from '../context/useCart'
import {
  categoryLabelMap,
  createCartItem,
  formatPrice,
  getDefaultOptionSelection,
  getProductBySlug,
  getRelatedProducts,
  getSelectedOptionDetails,
  stockStatusLabelMap,
} from '../lib/shop'
import type { Product } from '../types'

export function ProductDetailPage() {
  const { slug } = useParams()
  const product = getProductBySlug(slug)

  if (!product) {
    return (
      <div className="page-stack">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Product not found' }]} />
        <section className="empty-state">
          <h1>Product not found</h1>
          <p>The requested product detail page is not available in the launch catalog.</p>
          <Link to="/products" className="button button--primary">
            Browse products
          </Link>
        </section>
      </div>
    )
  }

  return <ProductDetailView key={product.id} product={product} />
}

function ProductDetailView({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() =>
    getDefaultOptionSelection(product),
  )
  const selectedOptionDetails = getSelectedOptionDetails(product, selectedOptions)
  const totalPrice = product.basePrice + selectedOptionDetails.reduce((sum, option) => sum + option.priceDelta, 0)
  const relatedProducts = getRelatedProducts(product)

  return (
    <div className="page-stack">
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          { label: 'Products', to: '/products' },
          { label: categoryLabelMap[product.category], to: `/products/${product.category}` },
          { label: product.name },
        ]}
      />

      <div className="details-layout">
        <section className="details-gallery">
          <div className="details-gallery__main">
            <img src={product.images[activeImageIndex]?.src} alt={product.images[activeImageIndex]?.alt} />
          </div>
          <div className="details-gallery__thumbs">
            {product.images.map((image, index) => (
              <button
                key={image.id}
                type="button"
                className={`thumbnail-button ${activeImageIndex === index ? 'is-active' : ''}`}
                onClick={() => setActiveImageIndex(index)}
              >
                <img src={image.src} alt={image.alt} />
                <span>{image.label}</span>
              </button>
            ))}
          </div>
        </section>

        <aside className="buy-box">
          <div className="buy-box__header">
            <div className="product-card__badges">
              <span className={`status-badge status-badge--${product.stockStatus}`}>
                {stockStatusLabelMap[product.stockStatus]}
              </span>
              {product.badge ? <span className="accent-badge">{product.badge}</span> : null}
            </div>
            <p className="product-card__type">{product.subcategory}</p>
            <h1>{product.name}</h1>
            <p>{product.shortDescription}</p>
            <div className="rating-row">
              <strong>{product.rating.toFixed(1)}</strong>
              <span>{product.reviewCount} curated mock reviews</span>
            </div>
            <div className="buy-box__price">{formatPrice(totalPrice)}</div>
          </div>

          <div className="option-stack">
            {product.purchaseOptions.map((group) => (
              <section key={group.id} className="option-group">
                <div className="option-group__header">
                  <h2>{group.label}</h2>
                  {group.helperText ? <p>{group.helperText}</p> : null}
                </div>
                <div className="chip-list">
                  {group.values.map((value) => (
                    <button
                      key={value.id}
                      type="button"
                      className={`chip-button ${selectedOptions[group.id] === value.id ? 'is-active' : ''}`}
                      onClick={() =>
                        setSelectedOptions((current) => ({
                          ...current,
                          [group.id]: value.id,
                        }))
                      }
                    >
                      <span>{value.label}</span>
                      {value.priceDelta ? <small>+{formatPrice(value.priceDelta)}</small> : null}
                    </button>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="support-card">
            <h2>Availability</h2>
            <p>{product.leadTime}</p>
            <p>
              {product.customOrderCapable
                ? 'This model is structured to evolve into a project-specific custom flow.'
                : 'This model is aimed at fast-moving standard configurations.'}
            </p>
          </div>

          <div className="stack-actions">
            <button
              type="button"
              className="button button--primary"
              onClick={() => addItem(createCartItem(product, selectedOptions))}
            >
              Add to cart
            </button>
            <Link to="/custom-order" className="button button--ghost">
              Need a custom version?
            </Link>
          </div>
        </aside>
      </div>

      <section className="section section--split">
        <div className="product-story">
          <p className="eyebrow">Product overview</p>
          <h2>Built for real joinery sales conversations</h2>
          <p>{product.description}</p>
          <div className="tag-list">
            {product.tags.map((tag) => (
              <span key={tag} className="accent-badge accent-badge--soft">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="spec-card">
          <h2>Selected configuration</h2>
          <ul className="spec-list">
            {selectedOptionDetails.map((option) => (
              <li key={option.groupId}>
                <span>{option.groupLabel}</span>
                <strong>{option.valueLabel}</strong>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Specifications</p>
            <h2>Structured for future configurators</h2>
          </div>
        </div>
        <div className="spec-grid">
          {product.specifications.map((specification) => (
            <div key={specification.label} className="spec-card">
              <span>{specification.label}</span>
              <strong>{specification.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Related products</p>
            <h2>Continue browsing</h2>
          </div>
        </div>
        <div className="product-grid">
          {relatedProducts.map((relatedProduct) => (
            <ProductCard key={relatedProduct.id} product={relatedProduct} />
          ))}
        </div>
      </section>
    </div>
  )
}
