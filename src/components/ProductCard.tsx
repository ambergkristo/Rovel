import { Link } from 'react-router-dom'
import { useCart } from '../context/useCart'
import {
  createCartItem,
  formatPrice,
  getDefaultOptionSelection,
  stockStatusLabelMap,
} from '../lib/shop'
import type { Product } from '../types'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()

  return (
    <article className="product-card">
      <Link to={`/product/${product.slug}`} className="product-card__image-link" aria-label={product.name}>
        <img src={product.images[0]?.src} alt={product.images[0]?.alt} className="product-card__image" />
      </Link>

      <div className="product-card__body">
        <div className="product-card__badges">
          <span className={`status-badge status-badge--${product.stockStatus}`}>
            {stockStatusLabelMap[product.stockStatus]}
          </span>
          {product.badge ? <span className="accent-badge">{product.badge}</span> : null}
        </div>

        <div className="product-card__header">
          <div>
            <p className="product-card__type">{product.type}</p>
            <h3>
              <Link to={`/product/${product.slug}`}>{product.name}</Link>
            </h3>
          </div>
          <strong className="product-card__price">{formatPrice(product.basePrice)}</strong>
        </div>

        <p className="product-card__description">{product.shortDescription}</p>

        <div className="product-card__meta">
          <span>{product.material}</span>
          <span>{product.finish}</span>
          <span>{product.leadTime}</span>
        </div>

        <div className="product-card__actions">
          <Link to={`/product/${product.slug}`} className="button button--ghost">
            View details
          </Link>
          <button
            type="button"
            className="button button--primary"
            onClick={() => addItem(createCartItem(product, getDefaultOptionSelection(product)))}
          >
            Add standard build
          </button>
        </div>
      </div>
    </article>
  )
}
