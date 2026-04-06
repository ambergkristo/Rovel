import type {
  LocalizedText,
  LocalizedValue,
  ProductImage,
} from '../../types'

export const lt = (et: string, en: string, ru: string): LocalizedText => ({
  et,
  en,
  ru,
})

export const value = (
  key: string,
  et: string,
  en: string,
  ru: string,
): LocalizedValue => ({
  key,
  label: lt(et, en, ru),
})

const toDataUri = (svg: string) =>
  `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`

const createIllustration = (
  kind: 'door' | 'window' | 'stairs',
  title: LocalizedText,
  label: LocalizedText,
  palette: {
    background: string
    backgroundSoft: string
    wood: string
    accent: string
    frame: string
  },
  variant: 1 | 2,
): ProductImage => {
  const idBase = `${kind}-${title.en}-${label.en}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')

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
        <text x="88" y="880" fill="${palette.frame}" font-size="58" font-family="Georgia, serif">${title.en}</text>
        <text x="88" y="926" fill="${palette.accent}" font-size="26" font-family="Manrope, Arial, sans-serif" letter-spacing="3">${label.en.toUpperCase()}</text>
      </svg>
    `),
    alt: title,
    label,
  }
}

export const createGallery = (
  kind: 'door' | 'window' | 'stairs',
  title: LocalizedText,
  palette: {
    background: string
    backgroundSoft: string
    wood: string
    accent: string
    frame: string
  },
  labels: [LocalizedText, LocalizedText],
) => labels.map((label, index) => createIllustration(kind, title, label, palette, index === 0 ? 1 : 2))

export const palettes = {
  oak: {
    background: '#f7efe3',
    backgroundSoft: '#dfc7aa',
    wood: '#a96c43',
    accent: '#355647',
    frame: '#46372b',
  },
  pine: {
    background: '#f5f0e8',
    backgroundSoft: '#d5c5aa',
    wood: '#b68758',
    accent: '#51715d',
    frame: '#4a3a2d',
  },
  charcoal: {
    background: '#efe8e1',
    backgroundSoft: '#cbb8a4',
    wood: '#3d4141',
    accent: '#8c6848',
    frame: '#282726',
  },
  ash: {
    background: '#f0eee8',
    backgroundSoft: '#d9d4c8',
    wood: '#90806d',
    accent: '#2c5048',
    frame: '#3f3b36',
  },
  stair: {
    background: '#f2ebe0',
    backgroundSoft: '#d7c2a5',
    wood: '#8f603f',
    accent: '#26463d',
    frame: '#3f3024',
  },
}

export const labelPair = (
  etOne: string,
  enOne: string,
  ruOne: string,
  etTwo: string,
  enTwo: string,
  ruTwo: string,
): [LocalizedText, LocalizedText] => [
  lt(etOne, enOne, ruOne),
  lt(etTwo, enTwo, ruTwo),
]
