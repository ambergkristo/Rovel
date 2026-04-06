import { Link } from 'react-router-dom'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { useLocale } from '../context/useLocale'
import { customOrderTracks, siteInfo } from '../data/storefront'
import { resolveText } from '../lib/localization'

export function CustomOrderPage() {
  const { locale, messages } = useLocale()

  return (
    <div className="page-stack">
      <Breadcrumbs
        items={[
          { label: messages.common.home, to: '/' },
          { label: messages.common.customOrder },
        ]}
      />

      <section className="collection-hero">
        <div>
          <p className="eyebrow">{messages.customOrder.eyebrow}</p>
          <h1>{messages.customOrder.title}</h1>
          <p>{messages.customOrder.text}</p>
        </div>
        <div className="hero-stat-stack">
          {customOrderTracks.map((track) => (
            <div key={track.title.en} className="hero-stat">
              <strong>{resolveText(track.title, locale)}</strong>
              <span>{resolveText(track.description, locale)}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="trust-grid">
          {customOrderTracks.map((track) => (
            <article key={track.title.en} className="trust-card">
              <h2>{resolveText(track.title, locale)}</h2>
              <p>{resolveText(track.description, locale)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--split">
        <div className="support-card">
          <p className="eyebrow">{messages.customOrder.flowEyebrow}</p>
          <h2>{messages.customOrder.flowTitle}</h2>
          <ol className="process-list">
            <li>{messages.customOrder.flowStep1}</li>
            <li>{messages.customOrder.flowStep2}</li>
            <li>{messages.customOrder.flowStep3}</li>
          </ol>
        </div>

        <div className="support-card">
          <p className="eyebrow">{messages.customOrder.contactEyebrow}</p>
          <h2>{messages.customOrder.contactTitle}</h2>
          <p>{siteInfo.contactPhone}</p>
          <p>{siteInfo.contactEmail}</p>
          <p>{siteInfo.hours}</p>
          <div className="stack-actions">
            <a href={`mailto:${siteInfo.contactEmail}`} className="button button--primary">
              {messages.customOrder.emailTeam}
            </a>
            <Link to="/products/doors" className="button button--ghost">
              {messages.customOrder.backToProducts}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
