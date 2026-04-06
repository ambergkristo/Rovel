import { useEffect } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { categories, siteInfo } from '../data/storefront'
import { localeLabels } from '../i18n/messages'
import { resolveText, supportedLocales } from '../lib/localization'
import { useCart } from '../context/useCart'
import { useLocale } from '../context/useLocale'
import { CartDrawer } from './CartDrawer'

export function StorefrontLayout() {
  const location = useLocation()
  const { itemCount, openCart, closeCart } = useCart()
  const { locale, setLocale, messages } = useLocale()

  useEffect(() => {
    closeCart()
  }, [closeCart, location.pathname])

  return (
    <div className="site-shell">
      <div className="topbar">
        <span>{messages.header.topbar}</span>
        <span>{siteInfo.contactPhone}</span>
      </div>

      <header className="site-header">
        <NavLink to="/" className="site-brand">
          <span className="site-brand__mark">RG</span>
          <span>
            <strong>{siteInfo.name}</strong>
            <small>{messages.header.storefrontLabel}</small>
          </span>
        </NavLink>

        <nav className="site-nav" aria-label={messages.header.allProducts}>
          <NavLink to="/">{messages.common.home}</NavLink>
          <NavLink to="/products">{messages.common.products}</NavLink>
          {categories.map((category) => (
            <NavLink key={category.id} to={`/products/${category.id}`}>
              {resolveText(category.label, locale)}
            </NavLink>
          ))}
          <NavLink to="/custom-order">{messages.common.customOrder}</NavLink>
        </nav>

        <div className="site-header__actions">
          <div className="locale-switcher" aria-label={messages.header.language}>
            {supportedLocales.map((entry) => (
              <button
                key={entry}
                type="button"
                className={`locale-switcher__button ${locale === entry ? 'is-active' : ''}`}
                onClick={() => setLocale(entry)}
              >
                {localeLabels[entry]}
              </button>
            ))}
          </div>

          <a href={`mailto:${siteInfo.contactEmail}`} className="button button--ghost">
            {messages.common.contact}
          </a>
          <button type="button" className="button button--primary cart-button" onClick={openCart}>
            {messages.common.cart}
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
            <p className="eyebrow">{siteInfo.name}</p>
            <h2>{messages.footer.title}</h2>
            <p>{messages.footer.description}</p>
          </div>

          <div>
            <h3>{messages.footer.browse}</h3>
            <ul className="footer-list">
              {categories.map((category) => (
                <li key={category.id}>
                  <NavLink to={`/products/${category.id}`}>{resolveText(category.label, locale)}</NavLink>
                </li>
              ))}
              <li><NavLink to="/custom-order">{messages.common.customOrder}</NavLink></li>
            </ul>
          </div>

          <div>
            <h3>{messages.footer.foundation}</h3>
            <ul className="footer-list">
              <li>{messages.footer.categoryBrowsing}</li>
              <li>{messages.footer.productPages}</li>
              <li>{messages.footer.persistedCart}</li>
              <li>{messages.footer.quotePath}</li>
            </ul>
          </div>

          <div>
            <h3>{messages.footer.contact}</h3>
            <ul className="footer-list">
              <li>{siteInfo.contactPhone}</li>
              <li>{siteInfo.contactEmail}</li>
              <li>{siteInfo.hours}</li>
              <li>{messages.footer.estonia}</li>
            </ul>
          </div>
        </div>
      </footer>

      <CartDrawer />
    </div>
  )
}
