export type Locale = 'et' | 'en' | 'ru'

export type CategoryId = 'doors' | 'windows' | 'stairs'

export type CurrencyCode = 'EUR'

export type StockStatus = 'in-stock' | 'low-stock' | 'made-to-order'

export type SortOption = 'featured' | 'popular' | 'price-asc' | 'price-desc' | 'name-asc'

export type BadgeTone = 'new' | 'popular' | 'project' | 'stock' | 'custom'

export interface LocalizedText {
  et: string
  en: string
  ru: string
}

export interface LocalizedValue {
  key: string
  label: LocalizedText
}

export interface PromoCard {
  title: LocalizedText
  description: LocalizedText
  eyebrow?: LocalizedText
}

export interface CategorySummary {
  id: CategoryId
  label: LocalizedText
  heroTitle: LocalizedText
  shortDescription: LocalizedText
  listingIntro: LocalizedText
  keyFacts: LocalizedText[]
  merchandisingCards: PromoCard[]
}

export interface ProductImage {
  id: string
  src: string
  alt: LocalizedText
  label: LocalizedText
}

export interface ProductOptionValue {
  id: string
  label: LocalizedText
  priceDelta?: number
  note?: LocalizedText
}

export interface ProductOptionGroup {
  id: string
  label: LocalizedText
  helperText?: LocalizedText
  values: ProductOptionValue[]
}

export interface ProductSpecification {
  label: LocalizedText
  value: LocalizedText
}

export interface ProductBadge {
  tone: BadgeTone
  label: LocalizedText
}

export interface Product {
  id: string
  slug: string
  category: CategoryId
  line: LocalizedText
  subcategory: LocalizedText
  type: LocalizedValue
  name: LocalizedText
  shortDescription: LocalizedText
  description: LocalizedText
  basePrice: number
  currency: CurrencyCode
  images: ProductImage[]
  material: LocalizedValue
  finish: LocalizedValue
  widthOptions: number[]
  heightOptions: number[]
  handings: LocalizedValue[]
  stockStatus: StockStatus
  madeToOrder: boolean
  customOrderCapable: boolean
  tags: LocalizedText[]
  specifications: ProductSpecification[]
  leadTime: LocalizedText
  deliveryNote: LocalizedText
  featured: boolean
  popular?: boolean
  newArrival?: boolean
  badge?: ProductBadge
  rating: number
  reviewCount: number
  purchaseOptions: ProductOptionGroup[]
  cardHighlights: LocalizedText[]
  useCases: LocalizedText[]
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
  types: LocalizedValue[]
  materials: LocalizedValue[]
  finishes: LocalizedValue[]
  widths: number[]
  heights: number[]
  handings: LocalizedValue[]
  stockStatuses: StockStatus[]
  minPrice: number
  maxPrice: number
}

export interface SelectedOptionDetail {
  groupId: string
  valueId: string
  priceDelta: number
}

export interface CartItem {
  id: string
  productId: string
  slug: string
  unitPrice: number
  quantity: number
  currency: CurrencyCode
  selectedOptions: SelectedOptionDetail[]
  stockStatus: StockStatus
}

export interface BreadcrumbItem {
  label: string
  to?: string
}
