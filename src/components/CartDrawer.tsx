import { Link } from 'react-router-dom'
import { useLocale } from '../context/useLocale'
import { useCart } from '../context/useCart'
import { resolveText } from '../lib/localization'
import {
  formatPrice,
  getOptionGroupLabel,
  getOptionValueLabel,
  getProductById,
} from '../lib/shop'

export function CartDrawer() {
  const { items, isCartOpen, subtotal, closeCart, updateQuantity, removeItem } = useCart()
  const { locale, messages } = useLocale()

  return (
    <>
      <div
        className={`cart-overlay ${isCartOpen ? 'is-open' : ''}`}
        aria-hidden={!isCartOpen}
        onClick={closeCart}
      />
      <aside className={`cart-drawer ${isCartOpen ? 'is-open' : ''}`} aria-label={messages.cart.title}>
        <header className="cart-drawer__header">
          <div>
            <p className="eyebrow">{messages.common.cart}</p>
            <h2>{messages.cart.drawerTitle}</h2>
          </div>
          <button type="button" className="icon-button" onClick={closeCart} aria-label={messages.common.cart}>
            ×
          </button>
        </header>

        {items.length ? (
          <>
            <div className="cart-drawer__items">
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
                  <article key={item.id} className="cart-line">
                    <img src={product.images[0]?.src} alt={resolveText(product.images[0]?.alt, locale)} className="cart-line__image" />
                    <div className="cart-line__content">
                      <div className="cart-line__header">
                        <div>
                          <h3>{resolveText(product.name, locale)}</h3>
                          <span className={`status-badge status-badge--${item.stockStatus}`}>{stockLabel}</span>
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
                          <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                            +
                          </button>
                        </div>
                        <button type="button" className="text-button" onClick={() => removeItem(item.id)}>
                          {messages.cart.remove}
                        </button>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>

            <footer className="cart-drawer__footer">
              <div className="cart-total">
                <span>{messages.cart.subtotal}</span>
                <strong>{formatPrice(subtotal, locale)}</strong>
              </div>
              <p className="supporting-text">{messages.cart.customSizingText}</p>
              <div className="stack-actions">
                <Link to="/cart" className="button button--primary" onClick={closeCart}>
                  {messages.cart.reviewCart}
                </Link>
                <Link to="/custom-order" className="button button--ghost" onClick={closeCart}>
                  {messages.common.requestCustomSolution}
                </Link>
              </div>
            </footer>
          </>
        ) : (
          <div className="empty-state empty-state--drawer">
            <h3>{messages.cart.emptyTitle}</h3>
            <p>{messages.cart.drawerEmptyText}</p>
            <Link to="/products/doors" className="button button--primary" onClick={closeCart}>
              {messages.home.shopDoors}
            </Link>
          </div>
        )}
      </aside>
    </>
  )
}
