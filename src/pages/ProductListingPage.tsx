import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { ProductCard } from '../components/ProductCard'
import { ProductFilters } from '../components/ProductFilters'
import {
  createDefaultFilters,
  filterProducts,
  getCategoryById,
  getFilterOptions,
  getProductsByCategory,
  toggleNumberFilter,
  toggleStringFilter,
} from '../lib/shop'
import type {
  CategorySummary,
  ListingFilters,
  SortOption,
  StockStatus,
} from '../types'

export function ProductListingPage() {
  const { categoryId } = useParams()
  const category = getCategoryById(categoryId)

  if (!category) {
    return (
      <div className="page-stack">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Products', to: '/products' }, { label: 'Not found' }]} />
        <section className="empty-state">
          <h1>Category not found</h1>
          <p>The requested product family does not exist in the launch catalog.</p>
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

  const filteredProducts = filterProducts(categoryProducts, filters, sortBy)

  return (
    <div className="page-stack">
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          { label: 'Products', to: '/products' },
          { label: category.label },
        ]}
      />

      <section className="collection-hero">
        <div>
          <p className="eyebrow">{category.label}</p>
          <h1>{category.heroTitle}</h1>
          <p>{category.listingIntro}</p>
        </div>
        <div className="hero-stat-stack">
          {category.keyFacts.map((fact) => (
            <div key={fact} className="hero-stat">
              <strong>{fact}</strong>
            </div>
          ))}
        </div>
      </section>

      <div className="listing-layout">
        <ProductFilters
          filters={filters}
          options={filterOptions}
          onToggleType={(value) =>
            setFilters((current) => ({ ...current, types: toggleStringFilter(current.types, value) }))
          }
          onToggleMaterial={(value) =>
            setFilters((current) => ({
              ...current,
              materials: toggleStringFilter(current.materials, value),
            }))
          }
          onToggleFinish={(value) =>
            setFilters((current) => ({
              ...current,
              finishes: toggleStringFilter(current.finishes, value),
            }))
          }
          onToggleWidth={(value) =>
            setFilters((current) => ({ ...current, widths: toggleNumberFilter(current.widths, value) }))
          }
          onToggleHeight={(value) =>
            setFilters((current) => ({ ...current, heights: toggleNumberFilter(current.heights, value) }))
          }
          onToggleHanding={(value) =>
            setFilters((current) => ({
              ...current,
              handings: toggleStringFilter(current.handings, value),
            }))
          }
          onToggleStatus={(value) =>
            setFilters((current) => ({
              ...current,
              stockStatuses: toggleStringFilter(current.stockStatuses, value) as StockStatus[],
            }))
          }
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
              <p className="eyebrow">Results</p>
              <h2>{filteredProducts.length} products</h2>
            </div>

            <label className="field listing-results__sort">
              <span>Sort by</span>
              <select value={sortBy} onChange={(event) => setSortBy(event.target.value as SortOption)}>
                <option value="featured">Featured</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
                <option value="name-asc">Name</option>
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
              <h3>No products match these filters</h3>
              <p>Reset the filter set or loosen the price and size constraints.</p>
              <button
                type="button"
                className="button button--primary"
                onClick={() => setFilters(createDefaultFilters(filterOptions))}
              >
                Reset filters
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
