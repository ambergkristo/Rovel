import { useLocale } from '../context/useLocale'
import { resolveText } from '../lib/localization'
import type { FilterOptions, ListingFilters, LocalizedValue, StockStatus } from '../types'

interface ProductFiltersProps {
  filters: ListingFilters
  options: FilterOptions
  onClose?: () => void
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

interface FilterSectionProps {
  title: string
  values: LocalizedValue[]
  selectedValues: string[]
  onToggle: (value: string) => void
}

function FilterSection({ title, values, selectedValues, onToggle }: FilterSectionProps) {
  const { locale } = useLocale()

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
            key={value.key}
            type="button"
            className={`chip-button ${selectedValues.includes(value.key) ? 'is-active' : ''}`}
            onClick={() => onToggle(value.key)}
          >
            {resolveText(value.label, locale)}
          </button>
        ))}
      </div>
    </section>
  )
}

export function ProductFilters({
  filters,
  options,
  onClose,
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
  const { messages } = useLocale()

  const stockValues: LocalizedValue[] = [
    { key: 'in-stock', label: { et: messages.common.inStock, en: messages.common.inStock, ru: messages.common.inStock } },
    { key: 'low-stock', label: { et: messages.common.lowStock, en: messages.common.lowStock, ru: messages.common.lowStock } },
    { key: 'made-to-order', label: { et: messages.common.madeToOrder, en: messages.common.madeToOrder, ru: messages.common.madeToOrder } },
  ]

  return (
    <aside className="filter-panel">
      <div className="filter-panel__top">
        <div>
          <p className="eyebrow">{messages.products.overviewEyebrow}</p>
          <h2>{messages.products.refineTitle}</h2>
        </div>
        <div className="filter-panel__actions">
          <button type="button" className="button button--ghost button--compact" onClick={onReset}>
            {messages.common.reset}
          </button>
          {onClose ? (
            <button
              type="button"
              className="icon-button filter-panel__close"
              onClick={onClose}
              aria-label={messages.common.close}
            >
              ×
            </button>
          ) : null}
        </div>
      </div>

      <FilterSection title={messages.filters.type} values={options.types} selectedValues={filters.types} onToggle={onToggleType} />
      <FilterSection title={messages.filters.material} values={options.materials} selectedValues={filters.materials} onToggle={onToggleMaterial} />
      <FilterSection title={messages.filters.finish} values={options.finishes} selectedValues={filters.finishes} onToggle={onToggleFinish} />
      <FilterSection title={messages.filters.handing} values={options.handings} selectedValues={filters.handings} onToggle={onToggleHanding} />

      <section className="filter-group">
        <div className="filter-group__header">
          <h3>{messages.filters.width}</h3>
        </div>
        <div className="chip-list">
          {options.widths.map((value) => (
            <button
              key={value}
              type="button"
              className={`chip-button ${filters.widths.includes(value) ? 'is-active' : ''}`}
              onClick={() => onToggleWidth(value)}
            >
              {value} mm
            </button>
          ))}
        </div>
      </section>

      <section className="filter-group">
        <div className="filter-group__header">
          <h3>{messages.filters.height}</h3>
        </div>
        <div className="chip-list">
          {options.heights.map((value) => (
            <button
              key={value}
              type="button"
              className={`chip-button ${filters.heights.includes(value) ? 'is-active' : ''}`}
              onClick={() => onToggleHeight(value)}
            >
              {value} mm
            </button>
          ))}
        </div>
      </section>

      <FilterSection
        title={messages.filters.availability}
        values={stockValues}
        selectedValues={filters.stockStatuses}
        onToggle={(value) => onToggleStatus(value as StockStatus)}
      />

      <section className="filter-group">
        <div className="filter-group__header">
          <h3>{messages.filters.priceRange}</h3>
        </div>
        <div className="filter-range">
          <label className="field">
            <span>{messages.filters.min}</span>
            <input
              type="number"
              min={options.minPrice}
              max={filters.priceMax}
              value={filters.priceMin}
              onChange={(event) => onPriceChange('priceMin', Number(event.target.value))}
            />
          </label>
          <label className="field">
            <span>{messages.filters.max}</span>
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
              onChange={(event) => onBooleanChange('customOrderOnly', event.target.checked)}
            />
            <span>{messages.filters.customOnly}</span>
          </label>
        </div>
        <div className="checkbox-card">
          <label>
            <input
              type="checkbox"
              checked={filters.madeToOrderOnly}
              onChange={(event) => onBooleanChange('madeToOrderOnly', event.target.checked)}
            />
            <span>{messages.filters.madeToOrderOnly}</span>
          </label>
        </div>
      </section>
    </aside>
  )
}
