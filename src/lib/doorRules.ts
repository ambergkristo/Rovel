import { doorCatalog } from '../data/doorCatalog'
import type { DoorFormData, DoorTypeId } from '../types'

export const storageKey = 'rovel-door-worksheet-draft'

export const createEmptyFormData = (): DoorFormData => ({
  orderReference: '',
  customerName: '',
  projectName: '',
  location: '',
  dueDate: '',
  internalNotes: '',
  doorType: '',
  widthMm: '',
  heightMm: '',
  thicknessMm: '',
  handing: '',
  openingDirection: '',
  frameType: '',
  hasThreshold: false,
  thresholdType: '',
  material: '',
  finishType: '',
  veneerSpecies: '',
  colorCode: '',
  insideOutsideDifferentFinish: false,
  insideFinishNotes: '',
  outsideFinishNotes: '',
  hinges: [],
  lockType: '',
  handleSet: '',
  closer: false,
  seals: [],
  glass: 'None',
  extras: [],
  productionNotes: '',
  heritageNotes: '',
})

export const getActiveDoorType = (doorType: DoorFormData['doorType']) =>
  doorType && doorType in doorCatalog ? doorType : null

export const getDoorTypeDefaults = (doorType: DoorTypeId) => {
  const defaults = doorCatalog[doorType].defaults

  return {
    doorType,
    thicknessMm: defaults.thicknessMm ?? '',
    hasThreshold: defaults.hasThreshold ?? false,
    thresholdType: defaults.thresholdType ?? '',
    material: '',
    finishType: defaults.finishType ?? '',
    veneerSpecies: '',
    colorCode: '',
    insideOutsideDifferentFinish: false,
    insideFinishNotes: '',
    outsideFinishNotes: '',
    hinges: [],
    lockType: '',
    handleSet: '',
    closer: false,
    seals: [...(defaults.seals ?? [])],
    glass: defaults.glass ?? 'None',
    extras: [],
    productionNotes: '',
    heritageNotes: '',
  }
}

const isAllowed = (value: string, allowedValues: string[]) =>
  Boolean(value) && allowedValues.includes(value)

const toUniqueAllowedList = (values: string[], allowedValues: string[]) =>
  values.filter((value, index) => allowedValues.includes(value) && values.indexOf(value) === index)

export const sanitizeDoorConfiguration = (formData: DoorFormData): DoorFormData => {
  const activeDoorType = getActiveDoorType(formData.doorType)

  if (!activeDoorType) {
    return {
      ...formData,
      thresholdType: formData.hasThreshold ? formData.thresholdType : '',
      extras: Array.from(new Set(formData.extras)),
    }
  }

  const spec = doorCatalog[activeDoorType]
  const thicknessMm = spec.fixedThicknessMm
    ? String(spec.fixedThicknessMm)
    : formData.thicknessMm
  const hasThreshold = spec.supportsThreshold ? formData.hasThreshold : false
  const finishType = isAllowed(formData.finishType, spec.finishTypes)
    ? formData.finishType
    : spec.defaults.finishType ?? ''
  const material = isAllowed(formData.material, spec.materials) ? formData.material : ''
  const veneerRequired =
    (finishType === 'Veneered' || material === 'Veneered') && spec.veneerSpecies.length > 0

  const filteredSeals = toUniqueAllowedList(formData.seals, spec.sealOptions)

  return {
    ...formData,
    thicknessMm,
    hasThreshold,
    thresholdType:
      hasThreshold && isAllowed(formData.thresholdType, spec.thresholdTypes)
        ? formData.thresholdType
        : hasThreshold
          ? spec.defaults.thresholdType ?? ''
          : '',
    material,
    finishType,
    veneerSpecies:
      veneerRequired && isAllowed(formData.veneerSpecies, spec.veneerSpecies)
        ? formData.veneerSpecies
        : '',
    frameType: isAllowed(formData.frameType, spec.frameTypes) ? formData.frameType : '',
    lockType: isAllowed(formData.lockType, spec.lockTypes) ? formData.lockType : '',
    handleSet: isAllowed(formData.handleSet, spec.handleSets) ? formData.handleSet : '',
    hinges: toUniqueAllowedList(formData.hinges, spec.hingeOptions),
    seals: filteredSeals.length > 0 ? filteredSeals : [...(spec.defaults.seals ?? [])],
    glass: isAllowed(formData.glass, spec.glassOptions)
      ? formData.glass
      : spec.defaults.glass ?? 'None',
    extras: Array.from(new Set(formData.extras)),
    heritageNotes: activeDoorType === 'heritage' ? formData.heritageNotes : '',
    insideFinishNotes: formData.insideOutsideDifferentFinish ? formData.insideFinishNotes : '',
    outsideFinishNotes: formData.insideOutsideDifferentFinish ? formData.outsideFinishNotes : '',
  }
}

export const toggleListValue = (values: string[], value: string) =>
  values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value]
