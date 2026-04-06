import { doorProducts } from './catalog/doors'
import { stairProducts } from './catalog/stairs'
import { lt } from './catalog/shared'
import { windowProducts } from './catalog/windows'
import type { CategorySummary, PromoCard } from '../types'

const doorsMerch: PromoCard[] = [
  {
    eyebrow: lt('Renoveerimine', 'Renovation', 'Реновация'),
    title: lt('Miljöö ja traditsioon', 'Heritage and traditional lines', 'Исторические и традиционные линии'),
    description: lt('Sobib vanematele fassaadidele, linnakorteritele ja detailitundlikule kliendile.', 'Suited to visible facades, restoration work and detail-driven buyers.', 'Подходит для заметных фасадов, реставрации и клиентов, ценящих детали.'),
  },
  {
    eyebrow: lt('Uusarendus', 'New build', 'Новое строительство'),
    title: lt('Soojustatud välisuksed', 'Insulated exterior doors', 'Утепленные входные двери'),
    description: lt('Tugevamad sissepääsulahendused eramutele ja arendusprojektidele.', 'Stronger entrance solutions for detached homes and developments.', 'Более сильные входные решения для частных домов и новых проектов.'),
  },
  {
    eyebrow: lt('Siseviimistlus', 'Interior finish', 'Интерьер'),
    title: lt('Sile, spoonitud ja akustiline', 'Flush, veneered and acoustic', 'Гладкие, шпонированные и акустические'),
    description: lt('Kaasaegsest korterist kuni premium-magamisruumideni.', 'From modern apartments to premium bedroom suites.', 'От современных квартир до премиальных спален.'),
  },
]

const windowsMerch: PromoCard[] = [
  {
    eyebrow: lt('Energiatõhusus', 'Energy', 'Энергия'),
    title: lt('Kolmekordsed puitaknad', 'Triple glazed timber windows', 'Тройные деревянные окна'),
    description: lt('Põhivalik Eesti kliimasse ja eramajadele.', 'Core range for Estonian climate and detached houses.', 'Основной выбор для климата Эстонии и частных домов.'),
  },
  {
    eyebrow: lt('Linnarenoveerimine', 'Urban renovation', 'Городская реновация'),
    title: lt('Miljöö ja sissepoole avanevad süsteemid', 'Heritage and inward-opening systems', 'Исторические и открывающиеся внутрь системы'),
    description: lt('Lahendused objektidele, kus detail ja kasutusmugavus on mõlemad olulised.', 'Solutions for projects where both detailing and usability matter.', 'Решения для объектов, где важны и детализация, и удобство использования.'),
  },
  {
    eyebrow: lt('Panoraam', 'Panoramic', 'Панорама'),
    title: lt('Suuremad avatäited terrassile', 'Larger glazed openings to terraces', 'Большие остекленные проемы на террасу'),
    description: lt('Kui akna roll on valgus, vaade ja ühendus väliruumiga.', 'For projects where the window delivers light, view and outdoor connection.', 'Для проектов, где окно должно давать свет, вид и связь с внешним пространством.'),
  },
]

const stairsMerch: PromoCard[] = [
  {
    eyebrow: lt('Kaasaegne kodu', 'Modern home', 'Современный дом'),
    title: lt('Õhulised avatud trepid', 'Open and lighter stair forms', 'Открытые и более легкие лестницы'),
    description: lt('Trepp kui sisearhitektuuri osa, mitte ainult ühendus korruste vahel.', 'A stair as part of the architecture, not just vertical circulation.', 'Лестница как часть архитектуры, а не только связь между этажами.'),
  },
  {
    eyebrow: lt('Pereelamu', 'Family home', 'Семейный дом'),
    title: lt('Praktilised kinnised lahendused', 'Practical closed stair solutions', 'Практичные закрытые решения'),
    description: lt('Turvalisemad ja pehmemad lahendused igapäevaseks kasutuseks.', 'Safer, softer options for everyday use.', 'Более безопасные и спокойные решения для ежедневного использования.'),
  },
  {
    eyebrow: lt('Projektitöö', 'Project work', 'Проектная работа'),
    title: lt('Eritellimus tammest', 'Custom oak stair projects', 'Индивидуальные дубовые проекты'),
    description: lt('Storefrontis nähtav tee konsultatsioonipõhiste treppideni.', 'A visible storefront path into consultation-led stair projects.', 'Понятный путь из магазина к консультационным проектам лестниц.'),
  },
]

export const siteInfo = {
  name: 'Rovel Grupp',
  tagline: lt(
    'Puituksed, aknad ja trepid Eesti turule.',
    'Timber doors, windows and stairs for the Estonian market.',
    'Деревянные двери, окна и лестницы для рынка Эстонии.',
  ),
  contactEmail: 'info@rovel-grupp.ee',
  contactPhone: '+372 50 97 133',
  hours: 'Mon-Fri 9:00-18:00',
}

export const categories: CategorySummary[] = [
  {
    id: 'doors',
    label: lt('Uksed', 'Doors', 'Двери'),
    heroTitle: lt(
      'Puituksed sissepääsule, interjööri ja renoveerimisprojektidele.',
      'Timber doors for entrances, interiors and renovation projects.',
      'Деревянные двери для входа, интерьера и проектов реновации.',
    ),
    shortDescription: lt(
      'Valikus on soojustatud välisuksed, spoonitud siseuksed, akustilised mudelid ja miljööuksed.',
      'The range includes insulated exterior doors, veneered interior doors, acoustic models and heritage styles.',
      'В ассортименте утепленные входные двери, шпонированные межкомнатные, акустические модели и исторические решения.',
    ),
    listingIntro: lt(
      'Kategooria on kõige tugevam just ustes: kiiremini ostetavad standardmudelid, arhitektuursemad premium-uksed ja erilahenduse suunas liikuvad projektitooted.',
      'Doors remain the strongest category: faster-buy standard models, more architectural premium doors and project items that lead naturally into custom work.',
      'Категория дверей самая сильная: более быстрые стандартные модели, архитектурные премиум-двери и проектные товары, ведущие к индивидуальному заказу.',
    ),
    keyFacts: [
      lt('Välis- ja siseuksed', 'Exterior and interior doors', 'Наружные и межкомнатные двери'),
      lt('Miljöö ja premium valikud', 'Heritage and premium options', 'Исторические и премиальные варианты'),
      lt('Käelisus ja viimistlus valikutena', 'Handing and finish options', 'Варианты открывания и отделки'),
    ],
    merchandisingCards: doorsMerch,
  },
  {
    id: 'windows',
    label: lt('Aknad', 'Windows', 'Окна'),
    heroTitle: lt(
      'Puitaknad ja suuremad klaassüsteemid Eesti kliimasse.',
      'Timber windows and larger glazed systems built for the Estonian climate.',
      'Деревянные окна и большие остекленные системы для климата Эстонии.',
    ),
    shortDescription: lt(
      'Näidiskataloogis on põhjamaised puitaknad, miljööaknad, sissepoole avanevad lahendused ja panoraamsüsteemid.',
      'The sample catalog includes Nordic timber windows, heritage models, inward-opening systems and panoramic units.',
      'В демонстрационном каталоге есть северные деревянные окна, исторические модели, системы с открыванием внутрь и панорамные решения.',
    ),
    listingIntro: lt(
      'Akende kategooria näitab poe laiemat suunda: standardsed energiatõhusad aknad, ajaloolise joonega lahendused ja suuremate avatäidete projektitooted.',
      'The window category shows the broader store direction: standard energy-efficient windows, historically calmer options and larger project-based glazing systems.',
      'Категория окон показывает более широкий вектор магазина: стандартные энергоэффективные окна, более исторические решения и большие проектные системы остекления.',
    ),
    keyFacts: [
      lt('Kolmekordne klaaspakett', 'Triple glazing options', 'Варианты тройного остекления'),
      lt('Miljöö ja linnarenoveerimine', 'Heritage and urban renovation', 'Исторические и городские реновации'),
      lt('Puit-alumiinium projektitooted', 'Timber-aluminium project systems', 'Проектные системы дерево-алюминий'),
    ],
    merchandisingCards: windowsMerch,
  },
  {
    id: 'stairs',
    label: lt('Trepid', 'Stairs', 'Лестницы'),
    heroTitle: lt(
      'Puidust trepid standardlahendusest kuni projektipõhise tammepuittrepini.',
      'Timber stairs from standard family solutions to custom oak projects.',
      'Деревянные лестницы от стандартных семейных решений до индивидуальных дубовых проектов.',
    ),
    shortDescription: lt(
      'Kategoorias on avatud trepid, kinnised pereelamu lahendused, kompaktsed trepid ja selge eritellimuse suund.',
      'The category includes open-riser stairs, family-friendly closed models, compact stairs and a clear custom path.',
      'Категория включает открытые лестницы, семейные закрытые модели, компактные лестницы и понятный путь к индивидуальному заказу.',
    ),
    listingIntro: lt(
      'Treppide vaates on oluline näidata nii kohe võrreldavaid lahendusi kui ka seda, et suurem osa tugevamaid tammepuittreppe liigub loomulikult konsultatsioonipõhisesse müüki.',
      'The stair category needs to show both directly comparable products and the fact that stronger oak stair projects naturally move into consultation-led sales.',
      'Категория лестниц должна показывать и сравнимые товары, и то, что более серьезные дубовые проекты естественно переходят в консультационный формат продажи.',
    ),
    keyFacts: [
      lt('Avatud ja kinnised konstruktsioonid', 'Open and closed constructions', 'Открытые и закрытые конструкции'),
      lt('Pereelamudest villadeni', 'From family homes to villas', 'От семейных домов до вилл'),
      lt('Projektipõhine eritellimus nähtaval', 'Visible path into custom work', 'Понятный путь к индивидуальному заказу'),
    ],
    merchandisingCards: stairsMerch,
  },
]

export const trustHighlights = [
  {
    title: lt('Puit ja detail', 'Timber and detailing', 'Дерево и детали'),
    description: lt(
      'Tootekataloog ja tekstid on nüüd konkreetsemad: materjal, profiil, tarneaeg ja sobiv kasutusjuht on nähtavamad.',
      'The catalog and copy are now more concrete: material, profile, lead time and use case are easier to understand at a glance.',
      'Каталог и тексты стали конкретнее: материал, профиль, срок изготовления и сценарий применения видны намного лучше.',
    ),
  },
  {
    title: lt('Eesti turg esimesena', 'Estonian market first', 'Сначала рынок Эстонии'),
    description: lt(
      'Pood avaneb vaikimisi eesti keeles ning toetab lisaks inglise ja vene keelt.',
      'The storefront now opens in Estonian by default and also supports English and Russian.',
      'Магазин теперь по умолчанию открывается на эстонском языке и также поддерживает английский и русский.',
    ),
  },
  {
    title: lt('Standard + eritellimus', 'Standard + custom', 'Стандарт + индивидуально'),
    description: lt(
      'Standardtooted on ostetavamad, aga iga kategooria sees on endiselt nähtav tee erilahenduse konsultatsioonini.',
      'Standard items are more shoppable, but each category still keeps a visible path to custom consultation.',
      'Стандартные товары стали более удобны для покупки, но в каждой категории остается видимый путь к индивидуальной консультации.',
    ),
  },
]

export const customOrderTracks = [
  {
    title: lt('Eritellimusuksed', 'Custom doors', 'Индивидуальные двери'),
    description: lt(
      'Kui vaja on konkreetset paneelijaotust, suuremat julgestust, erimõõtu või miljööprofiili, liigub müük konsultatsiooni teele.',
      'When the project needs a specific panel layout, stronger security, non-standard size or heritage detailing, the sale should move into consultation.',
      'Если проекту нужна особая раскладка филенок, повышенная безопасность, нестандартный размер или исторический профиль, продажа должна переходить в консультационный формат.',
    ),
  },
  {
    title: lt('Eritellimusaknad', 'Custom windows', 'Индивидуальные окна'),
    description: lt(
      'Fassaaditööde, miljööobjektide ja suuremate avatäidete puhul on tähtis jätta juba poes nähtavaks projektipõhine tee.',
      'For facade work, heritage projects and larger glazed openings, the storefront should already show a project-based path.',
      'Для фасадных работ, исторических объектов и больших проемов магазин должен сразу показывать проектный путь.',
    ),
  },
  {
    title: lt('Eritellimustrepid', 'Custom stairs', 'Индивидуальные лестницы'),
    description: lt(
      'Tammepuidust trepid, keerukamad pöörded, klaaspiirded ja sisearhitektuursemad lahendused vajavad konsultatsioonimüüki.',
      'Oak stairs, more complex turns, glass balustrades and stronger architectural solutions require consultation-led sales.',
      'Дубовые лестницы, более сложные повороты, стеклянные ограждения и более архитектурные решения требуют консультационной продажи.',
    ),
  },
]

export const products = [...doorProducts, ...windowProducts, ...stairProducts]
