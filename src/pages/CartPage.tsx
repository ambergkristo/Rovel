import { Link } from 'react-router-dom'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { useLocale } from '../context/useLocale'
import { useCart } from '../context/useCart'
import { resolveText } from '../lib/localization'
import {
  formatPrice,
  getOptionGroupLabel,
  getOptionValueLabel,
  getProductById,
} from '../lib/shop'

export function CartPage() {
  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart()
  const { locale, messages } = useLocale()

  return (
    <div className="page-stack">
      <Breadcrumbs
        items={[{ label: messages.common.home, to: '/' }, { label: messages.common.cart }]}
      />

      <section className="section-heading">
        <div>
          <p className="eyebrow">{messages.common.cart}</p>
          <h1>{messages.cart.subtitle}</h1>
        </div>
      </section>

      {items.length ? (
        <div className="cart-page">
          <section className="cart-page__items">
            {items.map((item) => {
              const product = getProductById(item.productId)

              if (!product) {
                return null
              }

              const stockLabel =
                item.stockStatus === 'in-stock'
                  ? messages.common.inStock
                  : item.stockStatus === 'low-stock'
                    ? messages.common.lowStock
                    : messages.common.madeToOrder

              return (
                <article key={item.id} className="cart-line cart-line--page">
                  <img
                    src={product.images[0]?.src}
                    alt={resolveText(product.images[0]?.alt, locale)}
                    className="cart-line__image"
                  />
                  <div className="cart-line__content">
                    <div className="cart-line__header">
                      <div>
                        <h2>{resolveText(product.name, locale)}</h2>
                        <span className={`status-badge status-badge--${item.stockStatus}`}>
                          {stockLabel}
                        </span>
                      </div>
                      <strong>{formatPrice(item.unitPrice, locale)}</strong>
                    </div>

                    <ul className="cart-line__options">
                      {item.selectedOptions.map((option) => (
                        <li key={`${item.id}-${option.groupId}`}>
                          {getOptionGroupLabel(product, option.groupId, locale)}:{' '}
                          {getOptionValueLabel(product, option.groupId, option.valueId, locale)}
                        </li>
                      ))}
                    </ul>

                    <div className="cart-line__footer">
                      <div className="qty-control">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        className="text-button"
                        onClick={() => removeItem(item.id)}
                      >
                        {messages.cart.remove}
                      </button>
                    </div>
                  </div>
                </article>
              )
            })}

            <button type="button" className="button button--ghost" onClick={clearCart}>
              {messages.cart.clear}
            </button>
          </section>

          <aside className="cart-summary">
            <div className="support-card">
              <h2>{messages.cart.title}</h2>
              <div className="summary-row">
                <span>{messages.cart.subtotal}</span>
                <strong>{formatPrice(subtotal, locale)}</strong>
              </div>
              <div className="summary-row">
                <span>{messages.cart.shipping}</span>
                <span>{messages.cart.nextSprint}</span>
              </div>
              <p className="supporting-text">{messages.cart.customSizingText}</p>
              <button type="button" className="button button--primary" disabled>
                {messages.cart.checkoutSoon}
              </button>
            </div>

            <div className="support-card">
              <h2>{messages.cart.customSizingTitle}</h2>
              <p>{messages.cart.customSizingText}</p>
              <Link to="/custom-order" className="button button--ghost">
                {messages.common.requestCustomSolution}
              </Link>
            </div>
          </aside>
        </div>
      ) : (
        <section className="empty-state">
          <h2>{messages.cart.emptyTitle}</h2>
          <p>{messages.cart.emptyText}</p>
          <Link to="/products" className="button button--primary">
            {messages.common.browseProducts}
          </Link>
        </section>
      )}
    </div>
  )
}
