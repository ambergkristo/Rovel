import { Link } from 'react-router-dom'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { useCart } from '../context/useCart'
import { formatPrice, stockStatusLabelMap } from '../lib/shop'

export function CartPage() {
  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart()

  return (
    <div className="page-stack">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Cart' }]} />

      <section className="section-heading">
        <div>
          <p className="eyebrow">Cart</p>
          <h1>Review your product selection</h1>
        </div>
      </section>

      {items.length ? (
        <div className="cart-page">
          <section className="cart-page__items">
            {items.map((item) => (
              <article key={item.id} className="cart-line cart-line--page">
                <img src={item.image} alt={item.name} className="cart-line__image" />
                <div className="cart-line__content">
                  <div className="cart-line__header">
                    <div>
                      <h2>{item.name}</h2>
                      <span className={`status-badge status-badge--${item.stockStatus}`}>
                        {stockStatusLabelMap[item.stockStatus]}
                      </span>
                    </div>
                    <strong>{formatPrice(item.unitPrice)}</strong>
                  </div>

                  <ul className="cart-line__options">
                    {item.selectedOptions.map((option) => (
                      <li key={`${item.id}-${option.groupId}`}>
                        {option.groupLabel}: {option.valueLabel}
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
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))}

            <button type="button" className="button button--ghost" onClick={clearCart}>
              Clear cart
            </button>
          </section>

          <aside className="cart-summary">
            <div className="support-card">
              <h2>Order summary</h2>
              <div className="summary-row">
                <span>Subtotal</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>
              <div className="summary-row">
                <span>Shipping / installation</span>
                <span>Calculated next sprint</span>
              </div>
              <p className="supporting-text">
                Checkout is intentionally stubbed. This sprint ends at a realistic cart and pre-checkout handoff.
              </p>
              <button type="button" className="button button--primary" disabled>
                Checkout coming soon
              </button>
            </div>

            <div className="support-card">
              <h2>Need project-specific sizing?</h2>
              <p>Move from cart-ready products into a guided custom solution request without losing the storefront path.</p>
              <Link to="/custom-order" className="button button--ghost">
                Request custom solution
              </Link>
            </div>
          </aside>
        </div>
      ) : (
        <section className="empty-state">
          <h2>Your cart is empty</h2>
          <p>Start with doors, windows or stairs, then return here to review the selection.</p>
          <Link to="/products" className="button button--primary">
            Browse products
          </Link>
        </section>
      )}
    </div>
  )
}
