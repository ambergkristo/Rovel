import type { CategorySummary, Product } from '../types'

const toDataUri = (svg: string) =>
  `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`

const createIllustration = (
  kind: 'door' | 'window' | 'stairs',
  title: string,
  label: string,
  palette: {
    background: string
    backgroundSoft: string
    wood: string
    accent: string
    frame: string
  },
  variant: 1 | 2,
) => {
  const idBase = `${kind}-${title}-${label}`.toLowerCase().replace(/[^a-z0-9]+/g, '-')

  const artwork =
    kind === 'door'
      ? `
        <rect x="210" y="118" width="380" height="700" rx="22" fill="${palette.frame}" opacity="0.16" />
        <rect x="234" y="102" width="332" height="726" rx="20" fill="${palette.wood}" stroke="${palette.frame}" stroke-width="12" />
        <rect x="272" y="162" width="256" height="264" rx="12" fill="${variant === 1 ? palette.backgroundSoft : '#f8f4ec'}" opacity="0.72" />
        <rect x="272" y="466" width="256" height="264" rx="12" fill="${variant === 1 ? '#fff6e8' : palette.backgroundSoft}" opacity="0.56" />
        <circle cx="490" cy="468" r="12" fill="${palette.accent}" />
        <rect x="520" y="453" width="18" height="128" rx="9" fill="${palette.accent}" />
        <rect x="180" y="168" width="26" height="312" rx="13" fill="${palette.frame}" opacity="0.48" />
      `
      : kind === 'window'
        ? `
          <rect x="172" y="148" width="456" height="600" rx="28" fill="${palette.frame}" opacity="0.18" />
          <rect x="192" y="124" width="416" height="636" rx="26" fill="${palette.wood}" stroke="${palette.frame}" stroke-width="10" />
          <rect x="234" y="166" width="156" height="236" rx="12" fill="#dbeaf0" />
          <rect x="410" y="166" width="156" height="236" rx="12" fill="#dbeaf0" />
          <rect x="234" y="444" width="156" height="236" rx="12" fill="#dbeaf0" />
          <rect x="410" y="444" width="156" height="236" rx="12" fill="#dbeaf0" />
          <rect x="391" y="144" width="22" height="604" rx="11" fill="${palette.frame}" />
          <rect x="214" y="422" width="372" height="22" rx="11" fill="${palette.frame}" />
          <circle cx="${variant === 1 ? '388' : '430'}" cy="520" r="10" fill="${palette.accent}" />
        `
        : `
          <rect x="148" y="708" width="506" height="38" rx="19" fill="${palette.frame}" opacity="0.18" />
          <path d="M184 672h92l68-52h90l64-52h88l70-52h0v70h-88l-64 52h-90l-68 52h-92z" fill="${palette.wood}" stroke="${palette.frame}" stroke-width="10" stroke-linejoin="round" />
          <path d="M214 640l88-66 58 34-82 64zm160-118l84-64 62 36-84 64zm164-118l88-66 60 36-86 66z" fill="${palette.backgroundSoft}" opacity="0.88" />
          <path d="M202 666V344l34-26v322zm160-120V224l34-26v322zm164-120V108l34-26v322z" fill="${palette.frame}" opacity="0.72" />
          <path d="M204 344h474" stroke="${palette.accent}" stroke-width="16" stroke-linecap="round" opacity="${variant === 1 ? '0.38' : '0.24'}" />
        `

  return {
    id: `${idBase}-${variant}`,
    src: toDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" fill="none">
        <defs>
          <linearGradient id="${idBase}-bg" x1="80" y1="54" x2="708" y2="942" gradientUnits="userSpaceOnUse">
            <stop stop-color="${palette.background}" />
            <stop offset="1" stop-color="${palette.backgroundSoft}" />
          </linearGradient>
          <radialGradient id="${idBase}-glow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(640 184) rotate(142) scale(288 310)">
            <stop stop-color="#ffffff" stop-opacity="0.85" />
            <stop offset="1" stop-color="#ffffff" stop-opacity="0" />
          </radialGradient>
        </defs>
        <rect width="800" height="1000" rx="40" fill="url(#${idBase}-bg)" />
        <rect x="34" y="34" width="732" height="932" rx="30" stroke="rgba(58,44,31,0.12)" />
        <circle cx="632" cy="212" r="240" fill="url(#${idBase}-glow)" />
        <rect x="72" y="74" width="656" height="852" rx="28" fill="rgba(255,255,255,0.26)" />
        ${artwork}
        <text x="88" y="128" fill="${palette.frame}" font-size="28" font-family="Manrope, Arial, sans-serif" letter-spacing="5">ROVEL GRUPP</text>
        <text x="88" y="880" fill="${palette.frame}" font-size="58" font-family="Georgia, serif">${title}</text>
        <text x="88" y="926" fill="${palette.accent}" font-size="26" font-family="Manrope, Arial, sans-serif" letter-spacing="3">${label.toUpperCase()}</text>
      </svg>
    `),
    alt: `${title} - ${label}`,
    label,
  }
}

const createGallery = (
  kind: 'door' | 'window' | 'stairs',
  title: string,
  palette: {
    background: string
    backgroundSoft: string
    wood: string
    accent: string
    frame: string
  },
  labels: [string, string],
) => labels.map((label, index) => createIllustration(kind, title, label, palette, index === 0 ? 1 : 2))

export const siteInfo = {
  name: 'Rovel Grupp',
  tagline: 'Timber doors, windows and stairs for homes, renovations and bespoke projects.',
  contactEmail: 'info@rovel-grupp.ee',
  contactPhone: '+372 50 97 133',
  hours: 'Mon-Fri 9:00-18:00',
}

export const categories: CategorySummary[] = [
  {
    id: 'doors',
    label: 'Doors',
    heroTitle: 'Exterior, interior and heritage timber doors with custom-ready detailing.',
    shortDescription:
      'Browse standard-ready door models built to feel credible for renovations, new homes and premium joinery projects.',
    listingIntro:
      'Choose from insulated exterior doors, refined interior models and heritage-led panel doors. Every listing is structured so it can evolve toward full configurators later.',
    keyFacts: ['Exterior and interior ranges', 'Handing-aware options', 'Custom frame and hardware packages'],
  },
  {
    id: 'windows',
    label: 'Windows',
    heroTitle: 'Nordic timber windows shaped for climate performance and quiet architecture.',
    shortDescription:
      'A starting range for casement, heritage and panoramic timber window systems with finish and glazing decisions already modeled.',
    listingIntro:
      'These mock catalog products cover painted pine, heritage joinery and large glazed openings, giving the storefront a real cross-category direction from day one.',
    keyFacts: ['Triple-glazed packages', 'Heritage and modern profiles', 'Made-to-order sizing'],
  },
  {
    id: 'stairs',
    label: 'Stairs',
    heroTitle: 'Crafted stair solutions from family houses to compact upper-floor connections.',
    shortDescription:
      'The stair range introduces open-riser, family-friendly and compact models so the storefront clearly extends beyond doors and windows.',
    listingIntro:
      'Use the range to present timber stair solutions that can be ordered in standard configurations today and expanded into quote-driven custom projects next.',
    keyFacts: ['Open and closed constructions', 'Balustrade options', 'Prepared for bespoke quoting'],
  },
]

export const trustHighlights = [
  {
    title: 'Joinery-first quality',
    description:
      'Built around solid timber, stable constructions and finish combinations that suit both new-build and restoration work.',
  },
  {
    title: 'Sales-ready ecommerce flow',
    description:
      'Clear category browsing, structured product details and cart behavior are in place before deeper configurators or ERP links.',
  },
  {
    title: 'Custom solution path',
    description:
      'The storefront does not pretend everything is off-the-shelf. Custom entry points stay visible where they belong.',
  },
]

export const customOrderTracks = [
  {
    title: 'Custom doors',
    description:
      'Panel patterns, glazing, security hardware, frame builds and restoration-sensitive profiles can move into a guided quote flow.',
  },
  {
    title: 'Custom windows',
    description:
      'Opening style, glazing package, heritage detailing and project-specific dimensions are ready to become structured quote inputs.',
  },
  {
    title: 'Custom stairs',
    description:
      'Open-riser, closed string, space-saving and balustrade-heavy stair projects can start from a consultation-led path instead of forcing a fixed SKU.',
  },
]

const oakPalette = {
  background: '#f7efe3',
  backgroundSoft: '#dfc7aa',
  wood: '#a96c43',
  accent: '#355647',
  frame: '#46372b',
}

const pinePalette = {
  background: '#f5f0e8',
  backgroundSoft: '#d5c5aa',
  wood: '#b68758',
  accent: '#51715d',
  frame: '#4a3a2d',
}

const charcoalPalette = {
  background: '#efe8e1',
  backgroundSoft: '#cbb8a4',
  wood: '#3d4141',
  accent: '#8c6848',
  frame: '#282726',
}

const ashPalette = {
  background: '#f0eee8',
  backgroundSoft: '#d9d4c8',
  wood: '#90806d',
  accent: '#2c5048',
  frame: '#3f3b36',
}

const stairPalette = {
  background: '#f2ebe0',
  backgroundSoft: '#d7c2a5',
  wood: '#8f603f',
  accent: '#26463d',
  frame: '#3f3024',
}

export const products: Product[] = [
  {
    id: 'door-001',
    slug: 'nordic-oak-entry-92',
    category: 'doors',
    subcategory: 'Exterior door',
    type: 'Exterior',
    name: 'Nordic Oak Entry 92',
    shortDescription: 'Insulated solid-oak exterior door with deep profile, thermal threshold and secure hardware set.',
    description:
      'A premium front-door baseline for detached homes and higher-end renovations. The construction is oriented around oak presence, Nordic weather sealing and a calm panel layout that feels substantial without drifting into heavy ornament.',
    basePrice: 2690,
    currency: 'EUR',
    images: createGallery('door', 'Nordic Oak Entry 92', oakPalette, ['Front elevation', 'Interior finish']),
    material: 'Oak',
    finish: 'Oiled oak',
    widthOptions: [890, 990, 1090],
    heightOptions: [2090, 2190],
    handings: ['Left in', 'Right in', 'Left out', 'Right out'],
    stockStatus: 'made-to-order',
    madeToOrder: true,
    customOrderCapable: true,
    tags: ['Thermal threshold', 'Triple seal', 'Security hardware'],
    specifications: [
      { label: 'Construction', value: '92 mm insulated solid-timber leaf' },
      { label: 'Frame set', value: 'Thermal hardwood frame with weather lip' },
      { label: 'Glass option', value: 'Optional satin insulated lite' },
      { label: 'Use case', value: 'Main entrances and architect-led homes' },
    ],
    leadTime: '6-8 weeks',
    featured: true,
    badge: 'Bespoke exterior',
    rating: 4.9,
    reviewCount: 18,
    purchaseOptions: [
      {
        id: 'size',
        label: 'Size',
        helperText: 'Standard exterior modules with prepared frame allowances.',
        values: [
          { id: '890x2090', label: '890 x 2090 mm' },
          { id: '990x2090', label: '990 x 2090 mm', priceDelta: 110 },
          { id: '1090x2190', label: '1090 x 2190 mm', priceDelta: 290 },
        ],
      },
      {
        id: 'handing',
        label: 'Handing',
        values: [
          { id: 'left-in', label: 'Left in' },
          { id: 'right-in', label: 'Right in' },
          { id: 'left-out', label: 'Left out' },
          { id: 'right-out', label: 'Right out' },
        ],
      },
      {
        id: 'finish',
        label: 'Finish',
        values: [
          { id: 'oiled-oak', label: 'Oiled oak' },
          { id: 'dark-stain', label: 'Dark stain', priceDelta: 90 },
          { id: 'painted-ral-7016', label: 'Painted RAL 7016', priceDelta: 160 },
        ],
      },
      {
        id: 'hardware',
        label: 'Hardware package',
        values: [
          { id: 'secure-steel', label: 'Secure steel pull set' },
          { id: 'black-architectural', label: 'Black architectural set', priceDelta: 85 },
          { id: 'brass-heritage', label: 'Brushed brass exterior set', priceDelta: 130 },
        ],
      },
    ],
  },
  {
    id: 'door-002',
    slug: 'painted-cottage-entry',
    category: 'doors',
    subcategory: 'Exterior door',
    type: 'Exterior',
    name: 'Painted Cottage Entry',
    shortDescription: 'Paint-ready pine entrance door with glazed upper panel and classic proportions.',
    description:
      'A softer exterior option for timber houses, smaller developments and renovation projects that want a welcoming painted expression without giving up weather-ready detailing.',
    basePrice: 2140,
    currency: 'EUR',
    images: createGallery('door', 'Painted Cottage Entry', pinePalette, ['Exterior painted view', 'Glass and frame detail']),
    material: 'Pine',
    finish: 'Painted',
    widthOptions: [890, 990],
    heightOptions: [2090, 2190],
    handings: ['Left in', 'Right in'],
    stockStatus: 'low-stock',
    madeToOrder: false,
    customOrderCapable: true,
    tags: ['Painted finish', 'Glazed upper panel', 'Exterior frame'],
    specifications: [
      { label: 'Construction', value: '68 mm insulated pine leaf' },
      { label: 'Threshold', value: 'Low hardwood thermal threshold' },
      { label: 'Glazing', value: 'Double-glazed satin top lite' },
      { label: 'Use case', value: 'Family homes and cottage projects' },
    ],
    leadTime: '2-3 weeks',
    featured: true,
    badge: 'Popular entry',
    rating: 4.7,
    reviewCount: 12,
    purchaseOptions: [
      {
        id: 'size',
        label: 'Size',
        values: [
          { id: '890x2090', label: '890 x 2090 mm' },
          { id: '990x2090', label: '990 x 2090 mm', priceDelta: 120 },
        ],
      },
      {
        id: 'handing',
        label: 'Handing',
        values: [
          { id: 'left-in', label: 'Left in' },
          { id: 'right-in', label: 'Right in' },
        ],
      },
      {
        id: 'finish',
        label: 'Finish',
        values: [
          { id: 'warm-white', label: 'Warm white' },
          { id: 'sage-green', label: 'Sage green', priceDelta: 60 },
          { id: 'deep-blue', label: 'Deep blue', priceDelta: 60 },
        ],
      },
      {
        id: 'hardware',
        label: 'Hardware package',
        values: [
          { id: 'lever-set', label: 'Exterior lever set' },
          { id: 'pull-set', label: 'Exterior pull set', priceDelta: 95 },
        ],
      },
    ],
  },
  {
    id: 'door-003',
    slug: 'flush-ash-interior',
    category: 'doors',
    subcategory: 'Interior door',
    type: 'Interior',
    name: 'Flush Ash Interior',
    shortDescription: 'Minimal ash interior door with concealed hinges and calm architectural edge detailing.',
    description:
      'Designed for cleaner interiors, apartment fit-outs and modern private houses. The model acts as the straightforward in-stock interior option in the launch catalog while keeping premium detailing in the buy path.',
    basePrice: 860,
    currency: 'EUR',
    images: createGallery('door', 'Flush Ash Interior', ashPalette, ['Flush door face', 'Concealed hinge detail']),
    material: 'Ash',
    finish: 'Clear lacquer',
    widthOptions: [790, 890, 990],
    heightOptions: [2090],
    handings: ['Left in', 'Right in'],
    stockStatus: 'in-stock',
    madeToOrder: false,
    customOrderCapable: false,
    tags: ['Concealed hinges', 'Acoustic seal', 'Interior joinery'],
    specifications: [
      { label: 'Construction', value: '40 mm engineered ash veneered leaf' },
      { label: 'Frame set', value: 'Flush interior split frame' },
      { label: 'Hardware', value: 'Magnetic lock and concealed hinges' },
      { label: 'Use case', value: 'Apartments, offices and modern homes' },
    ],
    leadTime: 'In stock',
    featured: true,
    badge: 'Stock interior',
    rating: 4.8,
    reviewCount: 27,
    purchaseOptions: [
      {
        id: 'size',
        label: 'Size',
        values: [
          { id: '790x2090', label: '790 x 2090 mm' },
          { id: '890x2090', label: '890 x 2090 mm', priceDelta: 40 },
          { id: '990x2090', label: '990 x 2090 mm', priceDelta: 75 },
        ],
      },
      {
        id: 'handing',
        label: 'Handing',
        values: [
          { id: 'left-in', label: 'Left in' },
          { id: 'right-in', label: 'Right in' },
        ],
      },
      {
        id: 'finish',
        label: 'Finish',
        values: [
          { id: 'clear-lacquer', label: 'Clear lacquer' },
          { id: 'smoked-ash', label: 'Smoked ash', priceDelta: 95 },
          { id: 'painted-ivory', label: 'Painted ivory', priceDelta: 80 },
        ],
      },
      {
        id: 'hardware',
        label: 'Hardware package',
        values: [
          { id: 'standard-ss', label: 'Stainless lever set' },
          { id: 'minimal-black', label: 'Minimal black lever', priceDelta: 55 },
        ],
      },
    ],
  },
  {
    id: 'door-004',
    slug: 'alpi-shadow-line',
    category: 'doors',
    subcategory: 'Interior premium',
    type: 'Interior premium',
    name: 'Alpi Shadow Line',
    shortDescription: '73 mm premium interior door with shadow-gap frame and smoked veneer character.',
    description:
      'A premium interior model for architects and clients who want a quieter plane, stronger thickness and concealed detailing. It gives the storefront a serious upper-tier product, not just commodity doors.',
    basePrice: 1480,
    currency: 'EUR',
    images: createGallery('door', 'Alpi Shadow Line', charcoalPalette, ['Architectural front', 'Shadow-gap frame']),
    material: 'Veneered ash',
    finish: 'Smoked veneer',
    widthOptions: [890, 990, 1090],
    heightOptions: [2090, 2290],
    handings: ['Left in', 'Right in'],
    stockStatus: 'made-to-order',
    madeToOrder: true,
    customOrderCapable: true,
    tags: ['73 mm leaf', 'Shadow-gap frame', 'Concealed hardware'],
    specifications: [
      { label: 'Construction', value: '73 mm thick premium interior leaf' },
      { label: 'Frame set', value: 'Shadow-gap aluminium-supported frame' },
      { label: 'Hardware', value: 'Magnetic lock with concealed hinges' },
      { label: 'Use case', value: 'Architectural interiors and premium suites' },
    ],
    leadTime: '5-6 weeks',
    featured: false,
    badge: 'Architect series',
    rating: 4.9,
    reviewCount: 9,
    purchaseOptions: [
      {
        id: 'size',
        label: 'Size',
        values: [
          { id: '890x2090', label: '890 x 2090 mm' },
          { id: '990x2090', label: '990 x 2090 mm', priceDelta: 80 },
          { id: '1090x2290', label: '1090 x 2290 mm', priceDelta: 240 },
        ],
      },
      {
        id: 'handing',
        label: 'Handing',
        values: [
          { id: 'left-in', label: 'Left in' },
          { id: 'right-in', label: 'Right in' },
        ],
      },
      {
        id: 'finish',
        label: 'Finish',
        values: [
          { id: 'smoked-veneer', label: 'Smoked veneer' },
          { id: 'natural-ash', label: 'Natural ash veneer' },
          { id: 'painted-clay', label: 'Painted clay tone', priceDelta: 65 },
        ],
      },
      {
        id: 'hardware',
        label: 'Hardware package',
        values: [
          { id: 'flush-black', label: 'Flush black lever' },
          { id: 'pivot-pull', label: 'Hidden pull prep', priceDelta: 130 },
        ],
      },
    ],
  },
  {
    id: 'door-005',
    slug: 'heritage-panel-no-3',
    category: 'doors',
    subcategory: 'Heritage door',
    type: 'Heritage',
    name: 'Heritage Panel No. 3',
    shortDescription: 'Traditional panel door with balanced mouldings, solid timber feel and curated heritage hardware.',
    description:
      'Built to represent restoration-sensitive projects and classically detailed homes. The heritage line makes the storefront feel aligned with real-world joinery work instead of only modern flush catalog products.',
    basePrice: 1890,
    currency: 'EUR',
    images: createGallery('door', 'Heritage Panel No. 3', pinePalette, ['Panel composition', 'Profile detail']),
    material: 'Pine',
    finish: 'Painted',
    widthOptions: [890, 990],
    heightOptions: [2090, 2190],
    handings: ['Left in', 'Right in', 'Left out', 'Right out'],
    stockStatus: 'made-to-order',
    madeToOrder: true,
    customOrderCapable: true,
    tags: ['Traditional profile', 'Heritage hardware', 'Renovation frame'],
    specifications: [
      { label: 'Construction', value: '62 mm traditional solid-timber leaf' },
      { label: 'Frame set', value: 'Deep profile heritage frame' },
      { label: 'Hardware', value: 'Classic brass or forged black sets' },
      { label: 'Use case', value: 'Historic homes and design-led renovations' },
    ],
    leadTime: '6-7 weeks',
    featured: true,
    badge: 'Heritage joinery',
    rating: 4.9,
    reviewCount: 14,
    purchaseOptions: [
      {
        id: 'size',
        label: 'Size',
        values: [
          { id: '890x2090', label: '890 x 2090 mm' },
          { id: '990x2090', label: '990 x 2090 mm', priceDelta: 95 },
          { id: '990x2190', label: '990 x 2190 mm', priceDelta: 140 },
        ],
      },
      {
        id: 'handing',
        label: 'Handing',
        values: [
          { id: 'left-in', label: 'Left in' },
          { id: 'right-in', label: 'Right in' },
          { id: 'left-out', label: 'Left out' },
          { id: 'right-out', label: 'Right out' },
        ],
      },
      {
        id: 'finish',
        label: 'Finish',
        values: [
          { id: 'painted-linen', label: 'Painted linen white' },
          { id: 'linseed-green', label: 'Linseed green', priceDelta: 85 },
          { id: 'stained-oak', label: 'Stained oak tone', priceDelta: 140 },
        ],
      },
      {
        id: 'hardware',
        label: 'Hardware package',
        values: [
          { id: 'classic-brass', label: 'Classic brass set' },
          { id: 'forged-black', label: 'Forged black set', priceDelta: 70 },
          { id: 'nickel-heritage', label: 'Nickel heritage lever', priceDelta: 95 },
        ],
      },
    ],
  },
  {
    id: 'door-006',
    slug: 'garden-glazed-terrace-door',
    category: 'doors',
    subcategory: 'Exterior glazed door',
    type: 'Exterior glazed',
    name: 'Garden Glazed Terrace Door',
    shortDescription: 'Timber terrace door with generous glazing, painted frame and everyday weather-ready construction.',
    description:
      'A lighter exterior model for terraces, utility entrances and garden-side elevations. It broadens the door category beyond solid entries and strengthens the storefront merchandising range.',
    basePrice: 1760,
    currency: 'EUR',
    images: createGallery('door', 'Garden Glazed Terrace Door', ashPalette, ['Glazed exterior', 'Rail and stile detail']),
    material: 'Pine',
    finish: 'Painted',
    widthOptions: [890, 990],
    heightOptions: [2090, 2190],
    handings: ['Left out', 'Right out'],
    stockStatus: 'made-to-order',
    madeToOrder: true,
    customOrderCapable: true,
    tags: ['Insulated glazing', 'Terrace access', 'Painted timber'],
    specifications: [
      { label: 'Construction', value: '68 mm insulated glazed timber leaf' },
      { label: 'Glazing', value: 'Double- or triple-glazed packages' },
      { label: 'Threshold', value: 'Low exterior hardwood threshold' },
      { label: 'Use case', value: 'Terraces, garden rooms and side entrances' },
    ],
    leadTime: '5-6 weeks',
    featured: false,
    badge: 'Light-filled entry',
    rating: 4.6,
    reviewCount: 8,
    purchaseOptions: [
      {
        id: 'size',
        label: 'Size',
        values: [
          { id: '890x2090', label: '890 x 2090 mm' },
          { id: '990x2090', label: '990 x 2090 mm', priceDelta: 100 },
        ],
      },
      {
        id: 'handing',
        label: 'Handing',
        values: [
          { id: 'left-out', label: 'Left out' },
          { id: 'right-out', label: 'Right out' },
        ],
      },
      {
        id: 'finish',
        label: 'Finish',
        values: [
          { id: 'soft-white', label: 'Soft white' },
          { id: 'warm-greige', label: 'Warm greige', priceDelta: 55 },
          { id: 'forest-green', label: 'Forest green', priceDelta: 60 },
        ],
      },
      {
        id: 'hardware',
        label: 'Hardware package',
        values: [
          { id: 'standard-lockset', label: 'Standard lockset' },
          { id: 'balcony-pull', label: 'Balcony pull set', priceDelta: 65 },
        ],
      },
    ],
  },
  {
    id: 'window-001',
    slug: 'triple-glazed-pine-window',
    category: 'windows',
    subcategory: 'Timber window',
    type: 'Casement',
    name: 'Triple Glazed Pine Window',
    shortDescription: 'Clean-lined pine window set with painted finish and Nordic triple glazing.',
    description:
      'A straightforward timber window product for new-build and renovation work where performance, paint finish and dependable proportions matter more than visual noise.',
    basePrice: 980,
    currency: 'EUR',
    images: createGallery('window', 'Triple Glazed Pine Window', pinePalette, ['Facade view', 'Frame section']),
    material: 'Pine',
    finish: 'Painted',
    widthOptions: [990, 1190, 1390],
    heightOptions: [1190, 1390, 1490],
    handings: [],
    stockStatus: 'made-to-order',
    madeToOrder: true,
    customOrderCapable: true,
    tags: ['Triple glazing', 'Painted timber', 'Nordic profile'],
    specifications: [
      { label: 'Frame depth', value: '116 mm engineered pine frame' },
      { label: 'Glazing', value: 'Triple-glazed energy package' },
      { label: 'Opening type', value: 'Side-hung casement' },
      { label: 'Use case', value: 'Detached houses and energy upgrades' },
    ],
    leadTime: '5-7 weeks',
    featured: true,
    badge: 'Energy-ready',
    rating: 4.8,
    reviewCount: 11,
    purchaseOptions: [
      {
        id: 'size',
        label: 'Module size',
        values: [
          { id: '990x1190', label: '990 x 1190 mm' },
          { id: '1190x1390', label: '1190 x 1390 mm', priceDelta: 140 },
          { id: '1390x1490', label: '1390 x 1490 mm', priceDelta: 240 },
        ],
      },
      {
        id: 'glazing',
        label: 'Glazing package',
        values: [
          { id: 'clear-triple', label: 'Clear triple glazing' },
          { id: 'solar-control', label: 'Solar control glazing', priceDelta: 120 },
          { id: 'acoustic', label: 'Acoustic glazing', priceDelta: 160 },
        ],
      },
      {
        id: 'finish',
        label: 'Frame finish',
        values: [
          { id: 'painted-white', label: 'Painted white' },
          { id: 'painted-clay', label: 'Painted clay', priceDelta: 40 },
          { id: 'painted-charcoal', label: 'Painted charcoal', priceDelta: 55 },
        ],
      },
    ],
  },
  {
    id: 'window-002',
    slug: 'heritage-double-casement-window',
    category: 'windows',
    subcategory: 'Heritage window',
    type: 'Heritage',
    name: 'Heritage Double Casement Window',
    shortDescription: 'Traditional timber casement with slim profiles, putty-style detailing and restoration-friendly character.',
    description:
      'A heritage-oriented window product for older houses, manor projects and visible renovation work where line weight and historical calm matter as much as insulation values.',
    basePrice: 1260,
    currency: 'EUR',
    images: createGallery('window', 'Heritage Double Casement Window', ashPalette, ['Heritage exterior', 'Moulding detail']),
    material: 'Oak',
    finish: 'Painted',
    widthOptions: [1190, 1390],
    heightOptions: [1390, 1490, 1690],
    handings: [],
    stockStatus: 'made-to-order',
    madeToOrder: true,
    customOrderCapable: true,
    tags: ['Heritage profile', 'Slim sightlines', 'Restoration-ready'],
    specifications: [
      { label: 'Frame depth', value: 'Traditional profile timber frame' },
      { label: 'Glazing', value: 'Slim insulated glazing with heritage bars' },
      { label: 'Opening type', value: 'Double outward-opening casement' },
      { label: 'Use case', value: 'Restoration and character projects' },
    ],
    leadTime: '7-9 weeks',
    featured: false,
    badge: 'Restoration line',
    rating: 4.9,
    reviewCount: 6,
    purchaseOptions: [
      {
        id: 'size',
        label: 'Module size',
        values: [
          { id: '1190x1390', label: '1190 x 1390 mm' },
          { id: '1390x1490', label: '1390 x 1490 mm', priceDelta: 170 },
          { id: '1390x1690', label: '1390 x 1690 mm', priceDelta: 250 },
        ],
      },
      {
        id: 'glazing',
        label: 'Glazing package',
        values: [
          { id: 'heritage-clear', label: 'Clear heritage glazing' },
          { id: 'heritage-wavy', label: 'Wavy heritage effect', priceDelta: 150 },
        ],
      },
      {
        id: 'finish',
        label: 'Frame finish',
        values: [
          { id: 'linseed-white', label: 'Linseed white' },
          { id: 'heritage-green', label: 'Heritage green', priceDelta: 55 },
          { id: 'deep-umber', label: 'Deep umber', priceDelta: 55 },
        ],
      },
    ],
  },
  {
    id: 'window-003',
    slug: 'panoramic-lift-slide-window',
    category: 'windows',
    subcategory: 'Large opening system',
    type: 'Panoramic',
    name: 'Panoramic Lift-Slide Window',
    shortDescription: 'Large-format timber-aluminium glazed opening for terrace-facing living spaces.',
    description:
      'This product establishes the premium end of the window category, showing the storefront can support larger openings, heavier glazing and quote-led custom development.',
    basePrice: 3480,
    currency: 'EUR',
    images: createGallery('window', 'Panoramic Lift-Slide Window', charcoalPalette, ['Panoramic opening', 'Track and frame']),
    material: 'Timber-aluminium',
    finish: 'Charcoal exterior / oak interior',
    widthOptions: [2190, 2990, 3590],
    heightOptions: [2090, 2290],
    handings: [],
    stockStatus: 'made-to-order',
    madeToOrder: true,
    customOrderCapable: true,
    tags: ['Lift-slide system', 'Large glazing', 'Timber-aluminium'],
    specifications: [
      { label: 'System', value: 'Lift-slide timber-aluminium system' },
      { label: 'Glazing', value: 'Triple-glazed panoramic package' },
      { label: 'Threshold', value: 'Low aluminium thermal threshold' },
      { label: 'Use case', value: 'Terrace-facing living rooms and premium projects' },
    ],
    leadTime: '8-10 weeks',
    featured: false,
    badge: 'Project glazing',
    rating: 4.8,
    reviewCount: 4,
    purchaseOptions: [
      {
        id: 'size',
        label: 'Module size',
        values: [
          { id: '2190x2090', label: '2190 x 2090 mm' },
          { id: '2990x2290', label: '2990 x 2290 mm', priceDelta: 690 },
          { id: '3590x2290', label: '3590 x 2290 mm', priceDelta: 1120 },
        ],
      },
      {
        id: 'glazing',
        label: 'Glazing package',
        values: [
          { id: 'clear-triple', label: 'Clear triple glazing' },
          { id: 'solar-control', label: 'Solar control triple glazing', priceDelta: 180 },
        ],
      },
      {
        id: 'finish',
        label: 'Frame finish',
        values: [
          { id: 'charcoal-oak', label: 'Charcoal exterior / oak interior' },
          { id: 'black-ash', label: 'Black exterior / ash interior', priceDelta: 95 },
        ],
      },
    ],
  },
  {
    id: 'stair-001',
    slug: 'oak-open-riser-stair',
    category: 'stairs',
    subcategory: 'Open-riser stair',
    type: 'Open riser',
    name: 'Oak Open Riser Stair',
    shortDescription: 'Open-riser oak stair with calm lines, steel support detailing and light architectural presence.',
    description:
      'A modern stair product for open-plan interiors where timber should remain warm but visually light. It adds a clear premium statement to the category without becoming flashy.',
    basePrice: 4320,
    currency: 'EUR',
    images: createGallery('stairs', 'Oak Open Riser Stair', stairPalette, ['Architectural side view', 'Tread and rail detail']),
    material: 'Oak',
    finish: 'Hardwax oil',
    widthOptions: [900, 1000, 1100],
    heightOptions: [2800, 3000],
    handings: ['Left turn', 'Right turn'],
    stockStatus: 'made-to-order',
    madeToOrder: true,
    customOrderCapable: true,
    tags: ['Open riser', 'Oak treads', 'Architectural rail'],
    specifications: [
      { label: 'Construction', value: 'Open-riser stair with oak treads and steel support' },
      { label: 'Balustrade', value: 'Timber handrail with slim verticals' },
      { label: 'Installation', value: 'Prepared for site survey and fitting' },
      { label: 'Use case', value: 'Open-plan houses and premium interiors' },
    ],
    leadTime: '7-9 weeks',
    featured: true,
    badge: 'Signature stair',
    rating: 4.9,
    reviewCount: 7,
    purchaseOptions: [
      {
        id: 'width',
        label: 'Stair width',
        values: [
          { id: '900', label: '900 mm' },
          { id: '1000', label: '1000 mm', priceDelta: 180 },
          { id: '1100', label: '1100 mm', priceDelta: 320 },
        ],
      },
      {
        id: 'turn',
        label: 'Turn direction',
        values: [
          { id: 'left-turn', label: 'Left turn' },
          { id: 'right-turn', label: 'Right turn' },
        ],
      },
      {
        id: 'finish',
        label: 'Timber finish',
        values: [
          { id: 'hardwax-oil', label: 'Hardwax oil' },
          { id: 'smoked-oak', label: 'Smoked oak', priceDelta: 160 },
          { id: 'deep-brown', label: 'Deep brown stain', priceDelta: 160 },
        ],
      },
      {
        id: 'balustrade',
        label: 'Balustrade',
        values: [
          { id: 'vertical-spindles', label: 'Vertical timber spindles' },
          { id: 'steel-rods', label: 'Slim steel rods', priceDelta: 210 },
          { id: 'glass-side', label: 'Glass side panel', priceDelta: 480 },
        ],
      },
    ],
  },
  {
    id: 'stair-002',
    slug: 'painted-family-stair',
    category: 'stairs',
    subcategory: 'Closed-string stair',
    type: 'Closed string',
    name: 'Painted Family Stair',
    shortDescription: 'Closed-string family stair with painted body, oak accents and practical everyday durability.',
    description:
      'Designed as a dependable standard stair offer with warmer detailing, suitable for family houses and renovation work where safety, durability and easy material coordination are priorities.',
    basePrice: 3560,
    currency: 'EUR',
    images: createGallery('stairs', 'Painted Family Stair', pinePalette, ['Closed-string view', 'Balustrade detail']),
    material: 'Pine and oak',
    finish: 'Painted body / oiled oak treads',
    widthOptions: [900, 1000],
    heightOptions: [2800, 3000],
    handings: ['Left turn', 'Right turn'],
    stockStatus: 'made-to-order',
    madeToOrder: true,
    customOrderCapable: true,
    tags: ['Closed string', 'Painted finish', 'Family-safe rise'],
    specifications: [
      { label: 'Construction', value: 'Closed-string painted stair with oak treads' },
      { label: 'Balustrade', value: 'Painted square balusters and oak handrail' },
      { label: 'Installation', value: 'Site measurement and assembly planning included' },
      { label: 'Use case', value: 'Family houses and practical renovations' },
    ],
    leadTime: '6-8 weeks',
    featured: false,
    badge: 'Family-ready',
    rating: 4.7,
    reviewCount: 5,
    purchaseOptions: [
      {
        id: 'width',
        label: 'Stair width',
        values: [
          { id: '900', label: '900 mm' },
          { id: '1000', label: '1000 mm', priceDelta: 140 },
        ],
      },
      {
        id: 'turn',
        label: 'Turn direction',
        values: [
          { id: 'left-turn', label: 'Left turn' },
          { id: 'right-turn', label: 'Right turn' },
        ],
      },
      {
        id: 'finish',
        label: 'Body finish',
        values: [
          { id: 'warm-white', label: 'Warm white with oiled oak treads' },
          { id: 'soft-grey', label: 'Soft grey with oiled oak treads', priceDelta: 70 },
        ],
      },
      {
        id: 'balustrade',
        label: 'Balustrade',
        values: [
          { id: 'painted-balusters', label: 'Painted balusters' },
          { id: 'oak-slats', label: 'Vertical oak slats', priceDelta: 260 },
        ],
      },
    ],
  },
  {
    id: 'stair-003',
    slug: 'compact-loft-stair',
    category: 'stairs',
    subcategory: 'Compact stair',
    type: 'Compact',
    name: 'Compact Loft Stair',
    shortDescription: 'Space-saving timber stair for lofts, studios and secondary upper-floor access.',
    description:
      'A compact model that makes the category feel commercially useful from the first sprint. It is practical, clearly different from the premium open-riser line and still compatible with future custom quoting.',
    basePrice: 2480,
    currency: 'EUR',
    images: createGallery('stairs', 'Compact Loft Stair', charcoalPalette, ['Compact profile', 'Tread module detail']),
    material: 'Birch',
    finish: 'Clear lacquer',
    widthOptions: [700, 800, 900],
    heightOptions: [2600, 2800],
    handings: ['Left turn', 'Right turn'],
    stockStatus: 'low-stock',
    madeToOrder: false,
    customOrderCapable: true,
    tags: ['Compact footprint', 'Secondary access', 'Birch construction'],
    specifications: [
      { label: 'Construction', value: 'Compact timber stair with alternating-step geometry' },
      { label: 'Balustrade', value: 'Single-side safety rail' },
      { label: 'Installation', value: 'Delivered in prepared modules' },
      { label: 'Use case', value: 'Lofts, studios and compact renovations' },
    ],
    leadTime: '3-4 weeks',
    featured: false,
    badge: 'Space-saving',
    rating: 4.5,
    reviewCount: 10,
    purchaseOptions: [
      {
        id: 'width',
        label: 'Stair width',
        values: [
          { id: '700', label: '700 mm' },
          { id: '800', label: '800 mm', priceDelta: 90 },
          { id: '900', label: '900 mm', priceDelta: 180 },
        ],
      },
      {
        id: 'turn',
        label: 'Turn direction',
        values: [
          { id: 'left-turn', label: 'Left turn' },
          { id: 'right-turn', label: 'Right turn' },
        ],
      },
      {
        id: 'finish',
        label: 'Timber finish',
        values: [
          { id: 'clear-lacquer', label: 'Clear lacquer' },
          { id: 'white-oil', label: 'White oil', priceDelta: 60 },
          { id: 'black-stain', label: 'Black stain', priceDelta: 90 },
        ],
      },
    ],
  },
]
