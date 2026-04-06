import { stockStatusLabelMap } from '../lib/shop'
import type { FilterOptions, ListingFilters, StockStatus } from '../types'

interface ProductFiltersProps {
  filters: ListingFilters
  options: FilterOptions
  onToggleType: (value: string) => void
  onToggleMaterial: (value: string) => void
  onToggleFinish: (value: string) => void
  onToggleWidth: (value: number) => void
  onToggleHeight: (value: number) => void
  onToggleHanding: (value: string) => void
  onToggleStatus: (value: StockStatus) => void
  onPriceChange: (field: 'priceMin' | 'priceMax', value: number) => void
  onBooleanChange: (field: 'customOrderOnly' | 'madeToOrderOnly', value: boolean) => void
  onReset: () => void
}

interface FilterSectionProps<T> {
  title: string
  values: T[]
  selectedValues: T[]
  getLabel: (value: T) => string
  onToggle: (value: T) => void
}

function FilterSection<T extends string | number>({
  title,
  values,
  selectedValues,
  getLabel,
  onToggle,
}: FilterSectionProps<T>) {
  if (!values.length) {
    return null
  }

  return (
    <section className="filter-group">
      <div className="filter-group__header">
        <h3>{title}</h3>
      </div>
      <div className="chip-list">
        {values.map((value) => (
          <button
            key={String(value)}
            type="button"
            className={`chip-button ${selectedValues.includes(value) ? 'is-active' : ''}`}
            onClick={() => onToggle(value)}
          >
            {getLabel(value)}
          </button>
        ))}
      </div>
    </section>
  )
}

export function ProductFilters({
  filters,
  options,
  onToggleType,
  onToggleMaterial,
  onToggleFinish,
  onToggleWidth,
  onToggleHeight,
  onToggleHanding,
  onToggleStatus,
  onPriceChange,
  onBooleanChange,
  onReset,
}: ProductFiltersProps) {
  return (
    <aside className="filter-panel">
      <div className="filter-panel__top">
        <div>
          <p className="eyebrow">Browse filters</p>
          <h2>Refine products</h2>
        </div>
        <button type="button" className="button button--ghost button--compact" onClick={onReset}>
          Reset
        </button>
      </div>

      <FilterSection
        title="Type"
        values={options.types}
        selectedValues={filters.types}
        getLabel={(value) => value}
        onToggle={onToggleType}
      />

      <FilterSection
        title="Material"
        values={options.materials}
        selectedValues={filters.materials}
        getLabel={(value) => value}
        onToggle={onToggleMaterial}
      />

      <FilterSection
        title="Finish"
        values={options.finishes}
        selectedValues={filters.finishes}
        getLabel={(value) => value}
        onToggle={onToggleFinish}
      />

      <FilterSection
        title="Width"
        values={options.widths}
        selectedValues={filters.widths}
        getLabel={(value) => `${value} mm`}
        onToggle={onToggleWidth}
      />

      <FilterSection
        title="Height"
        values={options.heights}
        selectedValues={filters.heights}
        getLabel={(value) => `${value} mm`}
        onToggle={onToggleHeight}
      />

      <FilterSection
        title="Opening / turn"
        values={options.handings}
        selectedValues={filters.handings}
        getLabel={(value) => value}
        onToggle={onToggleHanding}
      />

      <FilterSection
        title="Availability"
        values={options.stockStatuses}
        selectedValues={filters.stockStatuses}
        getLabel={(value) => stockStatusLabelMap[value]}
        onToggle={onToggleStatus}
      />

      <section className="filter-group">
        <div className="filter-group__header">
          <h3>Price range</h3>
        </div>
        <div className="filter-range">
          <label className="field">
            <span>Min</span>
            <input
              type="number"
              min={options.minPrice}
              max={filters.priceMax}
              value={filters.priceMin}
              onChange={(event) => onPriceChange('priceMin', Number(event.target.value))}
            />
          </label>
          <label className="field">
            <span>Max</span>
            <input
              type="number"
              min={filters.priceMin}
              max={options.maxPrice}
              value={filters.priceMax}
              onChange={(event) => onPriceChange('priceMax', Number(event.target.value))}
            />
          </label>
        </div>
      </section>

      <section className="filter-group">
        <div className="checkbox-card">
          <label>
            <input
              type="checkbox"
              checked={filters.customOrderOnly}
              onChange={(event) =>
                onBooleanChange('customOrderOnly', event.target.checked)
              }
            />
            <span>Custom order capable only</span>
          </label>
        </div>
        <div className="checkbox-card">
          <label>
            <input
              type="checkbox"
              checked={filters.madeToOrderOnly}
              onChange={(event) =>
                onBooleanChange('madeToOrderOnly', event.target.checked)
              }
            />
            <span>Made-to-order only</span>
          </label>
        </div>
      </section>
    </aside>
  )
}
