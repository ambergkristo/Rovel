import { Link } from 'react-router-dom'
import { useLocale } from '../context/useLocale'

export function NotFoundPage() {
  const { messages } = useLocale()

  return (
    <div className="page-stack">
      <section className="empty-state">
        <h1>{messages.errors.pageNotFound}</h1>
        <p>{messages.errors.pageNotFoundText}</p>
        <Link to="/" className="button button--primary">
          {messages.common.home}
        </Link>
      </section>
    </div>
  )
}
