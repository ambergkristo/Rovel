export type DoorTypeId = 'exterior' | 'interior' | 'alpi' | 'heritage'

export interface DoorTypeCatalogEntry {
  id: DoorTypeId
  label: string
  description: string
  materials: string[]
  finishTypes: string[]
  veneerSpecies: string[]
  fixedThicknessMm?: number
  lockTypes: string[]
  handleSets: string[]
  hingeOptions: string[]
  sealOptions: string[]
  thresholdTypes: string[]
  thresholdNote: string
  supportsThreshold: boolean
  frameTypes: string[]
  glassOptions: string[]
  extras: string[]
  defaults: Partial<DoorFormData>
}

export interface DoorFormData {
  orderReference: string
  customerName: string
  projectName: string
  location: string
  dueDate: string
  internalNotes: string
  doorType: DoorTypeId | ''
  widthMm: string
  heightMm: string
  thicknessMm: string
  handing: string
  openingDirection: string
  frameType: string
  hasThreshold: boolean
  thresholdType: string
  material: string
  finishType: string
  veneerSpecies: string
  colorCode: string
  insideOutsideDifferentFinish: boolean
  insideFinishNotes: string
  outsideFinishNotes: string
  hinges: string[]
  lockType: string
  handleSet: string
  closer: boolean
  seals: string[]
  glass: string
  extras: string[]
  productionNotes: string
  heritageNotes: string
}

export interface ValidationIssue {
  field: keyof DoorFormData
  message: string
  type: 'missing' | 'invalid'
  step: number
}

export type ValidationIssueMap = Partial<Record<keyof DoorFormData, ValidationIssue>>

export interface ValidationResult {
  status: 'ready' | 'missing' | 'invalid'
  label: string
  description: string
  missing: ValidationIssue[]
  invalid: ValidationIssue[]
  issueMap: ValidationIssueMap
}

export interface StepDefinition {
  id: number
  title: string
}
