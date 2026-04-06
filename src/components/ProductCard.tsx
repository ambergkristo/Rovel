import { Link } from 'react-router-dom'
import { useLocale } from '../context/useLocale'
import { useCart } from '../context/useCart'
import { resolveText } from '../lib/localization'
import { createCartItem, formatPrice, getDefaultOptionSelection } from '../lib/shop'
import type { Product } from '../types'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const { locale, messages } = useLocale()

  const stockLabel =
    product.stockStatus === 'in-stock'
      ? messages.common.inStock
      : product.stockStatus === 'low-stock'
        ? messages.common.lowStock
        : messages.common.madeToOrder

  return (
    <article className="product-card">
      <Link to={`/product/${product.slug}`} className="product-card__image-link" aria-label={resolveText(product.name, locale)}>
        <img src={product.images[0]?.src} alt={resolveText(product.images[0]?.alt, locale)} className="product-card__image" />
      </Link>

      <div className="product-card__body">
        <div className="product-card__badges">
          <span className={`status-badge status-badge--${product.stockStatus}`}>{stockLabel}</span>
          {product.badge ? <span className={`accent-badge accent-badge--${product.badge.tone}`}>{resolveText(product.badge.label, locale)}</span> : null}
        </div>

        <div className="product-card__header">
          <div>
            <p className="product-card__type">{resolveText(product.line, locale)}</p>
            <h3>
              <Link to={`/product/${product.slug}`}>{resolveText(product.name, locale)}</Link>
            </h3>
          </div>
          <div className="product-card__price-block">
            <span>{messages.common.priceFrom}</span>
            <strong className="product-card__price">{formatPrice(product.basePrice, locale)}</strong>
          </div>
        </div>

        <p className="product-card__description">{resolveText(product.shortDescription, locale)}</p>

        <div className="product-card__meta">
          <span>{resolveText(product.material.label, locale)}</span>
          <span>{resolveText(product.finish.label, locale)}</span>
          <span>{resolveText(product.leadTime, locale)}</span>
        </div>

        <div className="product-card__facts">
          {product.cardHighlights.slice(0, 3).map((fact) => (
            <span key={fact.en} className="product-card__fact">
              {resolveText(fact, locale)}
            </span>
          ))}
        </div>

        <div className="product-card__actions">
          <Link to={`/product/${product.slug}`} className="button button--ghost">
            {messages.common.viewDetails}
          </Link>
          <button
            type="button"
            className="button button--primary"
            onClick={() => addItem(createCartItem(product, getDefaultOptionSelection(product)))}
          >
            {messages.common.addStandardBuild}
          </button>
        </div>
      </div>
    </article>
  )
}
