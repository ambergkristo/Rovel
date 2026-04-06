import { useEffect } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { categories, siteInfo } from '../data/storefront'
import { useCart } from '../context/useCart'
import { CartDrawer } from './CartDrawer'

export function StorefrontLayout() {
  const location = useLocation()
  const { itemCount, openCart, closeCart } = useCart()

  useEffect(() => {
    closeCart()
  }, [closeCart, location.pathname])

  return (
    <div className="site-shell">
      <div className="topbar">
        <span>Made for serious timber joinery sales, not an internal worksheet.</span>
        <span>{siteInfo.contactPhone}</span>
      </div>

      <header className="site-header">
        <NavLink to="/" className="site-brand">
          <span className="site-brand__mark">RG</span>
          <span>
            <strong>{siteInfo.name}</strong>
            <small>Wood products storefront</small>
          </span>
        </NavLink>

        <nav className="site-nav" aria-label="Main navigation">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Products</NavLink>
          {categories.map((category) => (
            <NavLink key={category.id} to={`/products/${category.id}`}>
              {category.label}
            </NavLink>
          ))}
          <NavLink to="/custom-order">Custom solution</NavLink>
        </nav>

        <div className="site-header__actions">
          <a href={`mailto:${siteInfo.contactEmail}`} className="button button--ghost">
            Contact
          </a>
          <button type="button" className="button button--primary cart-button" onClick={openCart}>
            Cart
            <span className="cart-button__count">{itemCount}</span>
          </button>
        </div>
      </header>

      <main className="site-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="site-footer__grid">
          <div>
            <p className="eyebrow">Rovel Grupp</p>
            <h2>Timber products for practical buyers and bespoke projects.</h2>
            <p>
              Doors, windows and stairs now share one customer-facing storefront shell, with room for custom ordering next.
            </p>
          </div>

          <div>
            <h3>Browse</h3>
            <ul className="footer-list">
              <li><NavLink to="/products/doors">Doors</NavLink></li>
              <li><NavLink to="/products/windows">Windows</NavLink></li>
              <li><NavLink to="/products/stairs">Stairs</NavLink></li>
              <li><NavLink to="/custom-order">Custom solutions</NavLink></li>
            </ul>
          </div>

          <div>
            <h3>Storefront foundation</h3>
            <ul className="footer-list">
              <li>Category browsing</li>
              <li>Product detail pages</li>
              <li>Persisted cart basics</li>
              <li>Quote path placeholders</li>
            </ul>
          </div>

          <div>
            <h3>Contact</h3>
            <ul className="footer-list">
              <li>{siteInfo.contactPhone}</li>
              <li>{siteInfo.contactEmail}</li>
              <li>{siteInfo.hours}</li>
              <li>Estonia based manufacturing</li>
            </ul>
          </div>
        </div>
      </footer>

      <CartDrawer />
    </div>
  )
}
