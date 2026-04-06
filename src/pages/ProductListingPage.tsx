import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { ProductCard } from '../components/ProductCard'
import { ProductFilters } from '../components/ProductFilters'
import { useLocale } from '../context/useLocale'
import { resolveText } from '../lib/localization'
import {
  createDefaultFilters,
  filterProducts,
  getCategoryById,
  getFilterOptions,
  getProductsByCategory,
  toggleNumberFilter,
  toggleStringFilter,
} from '../lib/shop'
import type { CategorySummary, ListingFilters, SortOption, StockStatus } from '../types'

export function ProductListingPage() {
  const { categoryId } = useParams()
  const category = getCategoryById(categoryId)
  const { messages } = useLocale()

  if (!category) {
    return (
      <div className="page-stack">
        <Breadcrumbs items={[{ label: messages.common.home, to: '/' }, { label: messages.common.products, to: '/products' }, { label: messages.errors.categoryNotFound }]} />
        <section className="empty-state">
          <h1>{messages.errors.categoryNotFound}</h1>
          <p>{messages.errors.categoryNotFoundText}</p>
        </section>
      </div>
    )
  }

  return <CategoryListingView key={category.id} category={category} />
}

function CategoryListingView({ category }: { category: CategorySummary }) {
  const categoryProducts = getProductsByCategory(category.id)
  const filterOptions = getFilterOptions(categoryProducts)
  const [filters, setFilters] = useState<ListingFilters>(() => createDefaultFilters(filterOptions))
  const [sortBy, setSortBy] = useState<SortOption>('featured')
  const { locale, messages } = useLocale()

  const filteredProducts = filterProducts(categoryProducts, filters, sortBy, locale)

  return (
    <div className="page-stack">
      <Breadcrumbs
        items={[
          { label: messages.common.home, to: '/' },
          { label: messages.common.products, to: '/products' },
          { label: resolveText(category.label, locale) },
        ]}
      />

      <section className="collection-hero">
        <div>
          <p className="eyebrow">{resolveText(category.label, locale)}</p>
          <h1>{resolveText(category.heroTitle, locale)}</h1>
          <p>{resolveText(category.listingIntro, locale)}</p>
        </div>
        <div className="hero-stat-stack">
          {category.keyFacts.map((fact) => (
            <div key={fact.en} className="hero-stat">
              <strong>{resolveText(fact, locale)}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="merch-strip">
        {category.merchandisingCards.map((card) => (
          <article key={card.title.en} className="mini-merch-card mini-merch-card--wide">
            {card.eyebrow ? <span>{resolveText(card.eyebrow, locale)}</span> : null}
            <strong>{resolveText(card.title, locale)}</strong>
            <p>{resolveText(card.description, locale)}</p>
          </article>
        ))}
      </section>

      <div className="listing-layout">
        <ProductFilters
          filters={filters}
          options={filterOptions}
          onToggleType={(value) => setFilters((current) => ({ ...current, types: toggleStringFilter(current.types, value) }))}
          onToggleMaterial={(value) => setFilters((current) => ({ ...current, materials: toggleStringFilter(current.materials, value) }))}
          onToggleFinish={(value) => setFilters((current) => ({ ...current, finishes: toggleStringFilter(current.finishes, value) }))}
          onToggleWidth={(value) => setFilters((current) => ({ ...current, widths: toggleNumberFilter(current.widths, value) }))}
          onToggleHeight={(value) => setFilters((current) => ({ ...current, heights: toggleNumberFilter(current.heights, value) }))}
          onToggleHanding={(value) => setFilters((current) => ({ ...current, handings: toggleStringFilter(current.handings, value) }))}
          onToggleStatus={(value) => setFilters((current) => ({ ...current, stockStatuses: toggleStringFilter(current.stockStatuses, value) as StockStatus[] }))}
          onPriceChange={(field, value) =>
            setFilters((current) => ({
              ...current,
              [field]:
                field === 'priceMin'
                  ? Math.max(filterOptions.minPrice, Math.min(value, current.priceMax))
                  : Math.min(filterOptions.maxPrice, Math.max(value, current.priceMin)),
            }))
          }
          onBooleanChange={(field, value) => setFilters((current) => ({ ...current, [field]: value }))}
          onReset={() => setFilters(createDefaultFilters(filterOptions))}
        />

        <section className="listing-results">
          <div className="listing-results__top">
            <div>
              <p className="eyebrow">{resolveText(category.label, locale)}</p>
              <h2>{filteredProducts.length} {messages.products.results}</h2>
            </div>
            <label className="field listing-results__sort">
              <span>{messages.products.sortBy}</span>
              <select value={sortBy} onChange={(event) => setSortBy(event.target.value as SortOption)}>
                <option value="featured">{messages.sort.featured}</option>
                <option value="popular">{messages.sort.popular}</option>
                <option value="price-asc">{messages.sort.priceAsc}</option>
                <option value="price-desc">{messages.sort.priceDesc}</option>
                <option value="name-asc">{messages.sort.nameAsc}</option>
              </select>
            </label>
          </div>

          {filteredProducts.length ? (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3>{messages.products.noResultsTitle}</h3>
              <p>{messages.products.noResultsText}</p>
              <button type="button" className="button button--primary" onClick={() => setFilters(createDefaultFilters(filterOptions))}>
                {messages.products.resetFilters}
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
