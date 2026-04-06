import { Link } from 'react-router-dom'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { customOrderTracks, siteInfo } from '../data/storefront'

export function CustomOrderPage() {
  return (
    <div className="page-stack">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Custom solution' }]} />

      <section className="collection-hero">
        <div>
          <p className="eyebrow">Custom solution entry point</p>
          <h1>Project work belongs in the storefront too.</h1>
          <p>
            Rovel Grupp does not sell only fixed catalog items. This page gives custom doors, windows and stairs a customer-facing place before the deeper request workflow is rebuilt.
          </p>
        </div>
        <div className="hero-stat-stack">
          <div className="hero-stat"><strong>1</strong><span>Shared quote path</span></div>
          <div className="hero-stat"><strong>3</strong><span>Custom product families</span></div>
          <div className="hero-stat"><strong>Next</strong><span>Structured request form / consultation flow</span></div>
        </div>
      </section>

      <section className="section">
        <div className="trust-grid">
          {customOrderTracks.map((track) => (
            <article key={track.title} className="trust-card">
              <h2>{track.title}</h2>
              <p>{track.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--split">
        <div className="support-card">
          <p className="eyebrow">Suggested customer flow</p>
          <h2>How this should work today</h2>
          <ol className="process-list">
            <li>Browse standard products and save a baseline in the cart.</li>
            <li>Open the custom solution path when sizing, profile details or finish requirements go beyond stock selections.</li>
            <li>Continue with email or phone-based consultation until a dedicated request form is added.</li>
          </ol>
        </div>

        <div className="support-card">
          <p className="eyebrow">Contact placeholder</p>
          <h2>Start the conversation</h2>
          <p>{siteInfo.contactPhone}</p>
          <p>{siteInfo.contactEmail}</p>
          <p>{siteInfo.hours}</p>
          <div className="stack-actions">
            <a href={`mailto:${siteInfo.contactEmail}`} className="button button--primary">
              Email the team
            </a>
            <Link to="/products/doors" className="button button--ghost">
              Back to products
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
