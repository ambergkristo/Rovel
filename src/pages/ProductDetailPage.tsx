import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { ProductCard } from '../components/ProductCard'
import { useLocale } from '../context/useLocale'
import { useCart } from '../context/useCart'
import { resolveText } from '../lib/localization'
import {
  createCartItem,
  formatPrice,
  getCategoryLabel,
  getDefaultOptionSelection,
  getOptionGroupLabel,
  getOptionValueLabel,
  getProductBySlug,
  getRelatedProducts,
  getSelectedOptionDetails,
} from '../lib/shop'
import type { Product } from '../types'

export function ProductDetailPage() {
  const { slug } = useParams()
  const product = getProductBySlug(slug)
  const { messages } = useLocale()

  if (!product) {
    return (
      <div className="page-stack">
        <Breadcrumbs items={[{ label: messages.common.home, to: '/' }, { label: messages.errors.productNotFound }]} />
        <section className="empty-state">
          <h1>{messages.errors.productNotFound}</h1>
          <p>{messages.errors.productNotFoundText}</p>
          <Link to="/products" className="button button--primary">
            {messages.common.browseProducts}
          </Link>
        </section>
      </div>
    )
  }

  return <ProductDetailView key={product.id} product={product} />
}

function ProductDetailView({ product }: { product: Product }) {
  const { addItem } = useCart()
  const { locale, messages } = useLocale()
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() =>
    getDefaultOptionSelection(product),
  )

  const selectedOptionDetails = getSelectedOptionDetails(product, selectedOptions)
  const totalPrice = product.basePrice + selectedOptionDetails.reduce((sum, option) => sum + option.priceDelta, 0)
  const relatedProducts = getRelatedProducts(product)
  const stockLabel =
    product.stockStatus === 'in-stock'
      ? messages.common.inStock
      : product.stockStatus === 'low-stock'
        ? messages.common.lowStock
        : messages.common.madeToOrder

  return (
    <div className="page-stack">
      <Breadcrumbs
        items={[
          { label: messages.common.home, to: '/' },
          { label: messages.common.products, to: '/products' },
          { label: getCategoryLabel(product.category, locale), to: `/products/${product.category}` },
          { label: resolveText(product.name, locale) },
        ]}
      />

      <div className="details-layout">
        <section className="details-gallery">
          <div className="details-gallery__main">
            <img src={product.images[activeImageIndex]?.src} alt={resolveText(product.images[activeImageIndex]?.alt, locale)} />
          </div>
          <div className="details-gallery__thumbs">
            {product.images.map((image, index) => (
              <button
                key={image.id}
                type="button"
                className={`thumbnail-button ${activeImageIndex === index ? 'is-active' : ''}`}
                onClick={() => setActiveImageIndex(index)}
              >
                <img src={image.src} alt={resolveText(image.alt, locale)} />
                <span>{resolveText(image.label, locale)}</span>
              </button>
            ))}
          </div>
        </section>

        <aside className="buy-box">
          <div className="buy-box__header">
            <div className="product-card__badges">
              <span className={`status-badge status-badge--${product.stockStatus}`}>{stockLabel}</span>
              {product.badge ? <span className={`accent-badge accent-badge--${product.badge.tone}`}>{resolveText(product.badge.label, locale)}</span> : null}
            </div>
            <p className="product-card__type">{resolveText(product.subcategory, locale)}</p>
            <h1>{resolveText(product.name, locale)}</h1>
            <p>{resolveText(product.shortDescription, locale)}</p>
            <div className="rating-row">
              <strong>{product.rating.toFixed(1)}</strong>
              <span>{product.reviewCount} {messages.pdp.reviews}</span>
            </div>
            <div className="buy-box__price">{formatPrice(totalPrice, locale)}</div>
          </div>

          <div className="support-card support-card--compact">
            <h2>{messages.pdp.deliveryNoteTitle}</h2>
            <div className="summary-row"><span>{messages.common.availability}</span><strong>{stockLabel}</strong></div>
            <div className="summary-row"><span>{messages.common.leadTime}</span><strong>{resolveText(product.leadTime, locale)}</strong></div>
            <p>{resolveText(product.deliveryNote, locale)}</p>
          </div>

          <div className="option-stack">
            {product.purchaseOptions.map((group) => (
              <section key={group.id} className="option-group">
                <div className="option-group__header">
                  <h2>{resolveText(group.label, locale)}</h2>
                  {group.helperText ? <p>{resolveText(group.helperText, locale)}</p> : null}
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
                      <span>{resolveText(value.label, locale)}</span>
                      {value.priceDelta ? <small>+{formatPrice(value.priceDelta, locale)}</small> : null}
                    </button>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="stack-actions">
            <button
              type="button"
              className="button button--primary"
              onClick={() => addItem(createCartItem(product, selectedOptions))}
            >
              {messages.common.addToCart}
            </button>
            {product.customOrderCapable ? (
              <Link to="/custom-order" className="button button--ghost">
                {messages.pdp.customVersion}
              </Link>
            ) : null}
          </div>
        </aside>
      </div>

      <section className="section section--split">
        <div className="product-story">
          <p className="eyebrow">{messages.pdp.productOverview}</p>
          <h2>{messages.pdp.productOverviewTitle}</h2>
          <p>{resolveText(product.description, locale)}</p>

          <div className="spec-grid spec-grid--compact">
            <div className="spec-card">
              <span>{messages.common.material}</span>
              <strong>{resolveText(product.material.label, locale)}</strong>
            </div>
            <div className="spec-card">
              <span>{messages.common.finish}</span>
              <strong>{resolveText(product.finish.label, locale)}</strong>
            </div>
            <div className="spec-card">
              <span>{messages.common.dimensions}</span>
              <strong>{product.widthOptions[0]}-{product.widthOptions.at(-1)} mm</strong>
            </div>
          </div>

          <div className="tag-list">
            {product.tags.map((tag) => (
              <span key={tag.en} className="accent-badge accent-badge--soft">
                {resolveText(tag, locale)}
              </span>
            ))}
          </div>

          <div className="use-case-list">
            <h3>{messages.pdp.useCases}</h3>
            <div className="chip-list">
              {product.useCases.map((useCase) => (
                <span key={useCase.en} className="product-card__fact">
                  {resolveText(useCase, locale)}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="spec-card">
          <h2>{messages.pdp.selectedConfiguration}</h2>
          <ul className="spec-list">
            {selectedOptionDetails.map((option) => (
              <li key={option.groupId}>
                <span>{getOptionGroupLabel(product, option.groupId, locale)}</span>
                <strong>{getOptionValueLabel(product, option.groupId, option.valueId, locale)}</strong>
              </li>
            ))}
          </ul>
          <p className="supporting-text">
            {product.customOrderCapable
              ? messages.pdp.configurationNoteCustom
              : messages.pdp.configurationNoteStandard}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{messages.pdp.specifications}</p>
            <h2>{messages.pdp.specificationsTitle}</h2>
          </div>
        </div>
        <div className="spec-grid">
          {product.specifications.map((specification) => (
            <div key={specification.label.en} className="spec-card">
              <span>{resolveText(specification.label, locale)}</span>
              <strong>{resolveText(specification.value, locale)}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{messages.pdp.related}</p>
            <h2>{messages.pdp.relatedTitle}</h2>
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
