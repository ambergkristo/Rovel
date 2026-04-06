import { Link } from 'react-router-dom'
import { useCart } from '../context/useCart'
import { formatPrice, stockStatusLabelMap } from '../lib/shop'

export function CartDrawer() {
  const { items, isCartOpen, subtotal, closeCart, updateQuantity, removeItem } = useCart()

  return (
    <>
      <div
        className={`cart-overlay ${isCartOpen ? 'is-open' : ''}`}
        aria-hidden={!isCartOpen}
        onClick={closeCart}
      />
      <aside className={`cart-drawer ${isCartOpen ? 'is-open' : ''}`} aria-label="Shopping cart">
        <header className="cart-drawer__header">
          <div>
            <p className="eyebrow">Cart</p>
            <h2>Your selection</h2>
          </div>
          <button type="button" className="icon-button" onClick={closeCart} aria-label="Close cart">
            ×
          </button>
        </header>

        {items.length ? (
          <>
            <div className="cart-drawer__items">
              {items.map((item) => (
                <article key={item.id} className="cart-line">
                  <img src={item.image} alt={item.name} className="cart-line__image" />
                  <div className="cart-line__content">
                    <div className="cart-line__header">
                      <div>
                        <h3>{item.name}</h3>
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
            </div>

            <footer className="cart-drawer__footer">
              <div className="cart-total">
                <span>Subtotal</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>
              <p className="supporting-text">
                Checkout is the next sprint. Use the cart now to collect a realistic basket and continue to the cart page.
              </p>
              <div className="stack-actions">
                <Link to="/cart" className="button button--primary" onClick={closeCart}>
                  Review cart
                </Link>
                <Link to="/custom-order" className="button button--ghost" onClick={closeCart}>
                  Request custom solution
                </Link>
              </div>
            </footer>
          </>
        ) : (
          <div className="empty-state empty-state--drawer">
            <h3>Your cart is empty</h3>
            <p>Start with standard products, then branch to custom work where the project needs it.</p>
            <Link to="/products/doors" className="button button--primary" onClick={closeCart}>
              Browse doors
            </Link>
          </div>
        )}
      </aside>
    </>
  )
}
