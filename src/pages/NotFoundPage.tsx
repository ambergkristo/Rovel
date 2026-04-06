import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="page-stack">
      <section className="empty-state">
        <h1>Page not found</h1>
        <p>The requested storefront page does not exist.</p>
        <Link to="/" className="button button--primary">
          Return home
        </Link>
      </section>
    </div>
  )
}
