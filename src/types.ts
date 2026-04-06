export type CategoryId = 'doors' | 'windows' | 'stairs'

export type CurrencyCode = 'EUR'

export type StockStatus = 'in-stock' | 'low-stock' | 'made-to-order'

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name-asc'

export interface CategorySummary {
  id: CategoryId
  label: string
  heroTitle: string
  shortDescription: string
  listingIntro: string
  keyFacts: string[]
}

export interface ProductImage {
  id: string
  src: string
  alt: string
  label: string
}

export interface ProductOptionValue {
  id: string
  label: string
  priceDelta?: number
  note?: string
}

export interface ProductOptionGroup {
  id: string
  label: string
  helperText?: string
  values: ProductOptionValue[]
}

export interface ProductSpecification {
  label: string
  value: string
}

export interface Product {
  id: string
  slug: string
  category: CategoryId
  subcategory: string
  type: string
  name: string
  shortDescription: string
  description: string
  basePrice: number
  currency: CurrencyCode
  images: ProductImage[]
  material: string
  finish: string
  widthOptions: number[]
  heightOptions: number[]
  handings: string[]
  stockStatus: StockStatus
  madeToOrder: boolean
  customOrderCapable: boolean
  tags: string[]
  specifications: ProductSpecification[]
  leadTime: string
  featured: boolean
  badge?: string
  rating: number
  reviewCount: number
  purchaseOptions: ProductOptionGroup[]
}

export interface ListingFilters {
  types: string[]
  materials: string[]
  finishes: string[]
  widths: number[]
  heights: number[]
  handings: string[]
  stockStatuses: StockStatus[]
  priceMin: number
  priceMax: number
  customOrderOnly: boolean
  madeToOrderOnly: boolean
}

export interface FilterOptions {
  types: string[]
  materials: string[]
  finishes: string[]
  widths: number[]
  heights: number[]
  handings: string[]
  stockStatuses: StockStatus[]
  minPrice: number
  maxPrice: number
}

export interface SelectedOptionDetail {
  groupId: string
  groupLabel: string
  valueId: string
  valueLabel: string
  priceDelta: number
}

export interface CartItem {
  id: string
  productId: string
  slug: string
  name: string
  image: string
  unitPrice: number
  quantity: number
  currency: CurrencyCode
  selectedOptions: SelectedOptionDetail[]
  stockStatus: StockStatus
  leadTime: string
  customOrderCapable: boolean
}

export interface BreadcrumbItem {
  label: string
  to?: string
}
