import { categories, products } from '../data/storefront'
import type {
  CartItem,
  CategoryId,
  FilterOptions,
  ListingFilters,
  Product,
  SelectedOptionDetail,
  SortOption,
  StockStatus,
} from '../types'

export const currencyFormatter = new Intl.NumberFormat('en-EE', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
})

export const formatPrice = (value: number) => currencyFormatter.format(value)

export const categoryLabelMap = Object.fromEntries(
  categories.map((category) => [category.id, category.label]),
) as Record<CategoryId, string>

export const stockStatusLabelMap: Record<StockStatus, string> = {
  'in-stock': 'In stock',
  'low-stock': 'Low stock',
  'made-to-order': 'Made to order',
}

export const getCategoryById = (categoryId?: string | null) =>
  categories.find((category) => category.id === categoryId)

export const getProductsByCategory = (categoryId: CategoryId) =>
  products.filter((product) => product.category === categoryId)

export const getProductBySlug = (slug?: string | null) =>
  products.find((product) => product.slug === slug)

export const getFeaturedProducts = (limit = 4) =>
  products.filter((product) => product.featured).slice(0, limit)

export const getRelatedProducts = (product: Product, limit = 3) =>
  products
    .filter((candidate) => candidate.category === product.category && candidate.id !== product.id)
    .slice(0, limit)

export const getDefaultOptionSelection = (product: Product) =>
  Object.fromEntries(
    product.purchaseOptions.map((group) => [group.id, group.values[0]?.id ?? '']),
  )

export const getSelectedOptionDetails = (
  product: Product,
  selection: Record<string, string>,
): SelectedOptionDetail[] =>
  product.purchaseOptions
    .map((group) => {
      const value = group.values.find((entry) => entry.id === selection[group.id]) ?? group.values[0]

      if (!value) {
        return null
      }

      return {
        groupId: group.id,
        groupLabel: group.label,
        valueId: value.id,
        valueLabel: value.label,
        priceDelta: value.priceDelta ?? 0,
      }
    })
    .filter((detail): detail is SelectedOptionDetail => Boolean(detail))

export const getConfiguredPrice = (product: Product, selection: Record<string, string>) =>
  product.basePrice +
  getSelectedOptionDetails(product, selection).reduce(
    (sum, option) => sum + option.priceDelta,
    0,
  )

const buildCartItemId = (productId: string, selectedOptions: SelectedOptionDetail[]) =>
  `${productId}-${selectedOptions
    .map((option) => `${option.groupId}:${option.valueId}`)
    .sort()
    .join('|')}`

export const createCartItem = (
  product: Product,
  selection: Record<string, string>,
  quantity = 1,
): CartItem => {
  const selectedOptions = getSelectedOptionDetails(product, selection)

  return {
    id: buildCartItemId(product.id, selectedOptions),
    productId: product.id,
    slug: product.slug,
    name: product.name,
    image: product.images[0]?.src ?? '',
    unitPrice: getConfiguredPrice(product, selection),
    quantity,
    currency: product.currency,
    selectedOptions,
    stockStatus: product.stockStatus,
    leadTime: product.leadTime,
    customOrderCapable: product.customOrderCapable,
  }
}

export const getFilterOptions = (categoryProducts: Product[]): FilterOptions => {
  const prices = categoryProducts.map((product) => product.basePrice)

  return {
    types: Array.from(new Set(categoryProducts.map((product) => product.type))).sort(),
    materials: Array.from(new Set(categoryProducts.map((product) => product.material))).sort(),
    finishes: Array.from(new Set(categoryProducts.map((product) => product.finish))).sort(),
    widths: Array.from(new Set(categoryProducts.flatMap((product) => product.widthOptions))).sort(
      (left, right) => left - right,
    ),
    heights: Array.from(new Set(categoryProducts.flatMap((product) => product.heightOptions))).sort(
      (left, right) => left - right,
    ),
    handings: Array.from(new Set(categoryProducts.flatMap((product) => product.handings))).sort(),
    stockStatuses: ['in-stock', 'low-stock', 'made-to-order'],
    minPrice: Math.min(...prices),
    maxPrice: Math.max(...prices),
  }
}

export const createDefaultFilters = (filterOptions: FilterOptions): ListingFilters => ({
  types: [],
  materials: [],
  finishes: [],
  widths: [],
  heights: [],
  handings: [],
  stockStatuses: [],
  priceMin: filterOptions.minPrice,
  priceMax: filterOptions.maxPrice,
  customOrderOnly: false,
  madeToOrderOnly: false,
})

export const toggleStringFilter = (selectedValues: string[], value: string) =>
  selectedValues.includes(value)
    ? selectedValues.filter((entry) => entry !== value)
    : [...selectedValues, value]

export const toggleNumberFilter = (selectedValues: number[], value: number) =>
  selectedValues.includes(value)
    ? selectedValues.filter((entry) => entry !== value)
    : [...selectedValues, value]

export const filterProducts = (
  categoryProducts: Product[],
  filters: ListingFilters,
  sortBy: SortOption,
) => {
  const results = categoryProducts.filter((product) => {
    if (filters.types.length && !filters.types.includes(product.type)) {
      return false
    }

    if (filters.materials.length && !filters.materials.includes(product.material)) {
      return false
    }

    if (filters.finishes.length && !filters.finishes.includes(product.finish)) {
      return false
    }

    if (
      filters.widths.length &&
      !filters.widths.some((width) => product.widthOptions.includes(width))
    ) {
      return false
    }

    if (
      filters.heights.length &&
      !filters.heights.some((height) => product.heightOptions.includes(height))
    ) {
      return false
    }

    if (
      filters.handings.length &&
      product.handings.length > 0 &&
      !filters.handings.some((handing) => product.handings.includes(handing))
    ) {
      return false
    }

    if (filters.handings.length && product.handings.length === 0) {
      return false
    }

    if (filters.stockStatuses.length && !filters.stockStatuses.includes(product.stockStatus)) {
      return false
    }

    if (product.basePrice < filters.priceMin || product.basePrice > filters.priceMax) {
      return false
    }

    if (filters.customOrderOnly && !product.customOrderCapable) {
      return false
    }

    if (filters.madeToOrderOnly && !product.madeToOrder) {
      return false
    }

    return true
  })

  if (sortBy === 'price-asc') {
    return [...results].sort((left, right) => left.basePrice - right.basePrice)
  }

  if (sortBy === 'price-desc') {
    return [...results].sort((left, right) => right.basePrice - left.basePrice)
  }

  if (sortBy === 'name-asc') {
    return [...results].sort((left, right) => left.name.localeCompare(right.name))
  }

  return [...results].sort((left, right) => {
    if (left.featured !== right.featured) {
      return left.featured ? -1 : 1
    }

    return right.rating - left.rating
  })
}
