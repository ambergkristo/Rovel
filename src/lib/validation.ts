import { doorCatalog } from '../data/doorCatalog'
import { getActiveDoorType } from './doorRules'
import type { DoorFormData, ValidationIssue, ValidationIssueMap, ValidationResult } from '../types'

const addIssue = (
  issues: ValidationIssue[],
  field: ValidationIssue['field'],
  message: string,
  type: ValidationIssue['type'],
  step: number,
) => {
  issues.push({ field, message, type, step })
}

const isPositiveNumber = (value: string) => Number(value) > 0

export const getValidationResult = (formData: DoorFormData): ValidationResult => {
  const activeDoorType = getActiveDoorType(formData.doorType)
  const issues: ValidationIssue[] = []

  if (!formData.orderReference.trim()) {
    addIssue(issues, 'orderReference', 'Order reference is required.', 'missing', 1)
  }
  if (!formData.customerName.trim()) {
    addIssue(issues, 'customerName', 'Customer name is required.', 'missing', 1)
  }
  if (!formData.projectName.trim()) {
    addIssue(issues, 'projectName', 'Project / object is required.', 'missing', 1)
  }
  if (!formData.location.trim()) {
    addIssue(issues, 'location', 'Location is required.', 'missing', 1)
  }
  if (!formData.dueDate.trim()) {
    addIssue(issues, 'dueDate', 'Due date is required.', 'missing', 1)
  }
  if (!activeDoorType) {
    addIssue(issues, 'doorType', 'Door type is required.', 'missing', 2)
  }
  if (!formData.widthMm.trim()) {
    addIssue(issues, 'widthMm', 'Width is required.', 'missing', 3)
  } else if (!isPositiveNumber(formData.widthMm)) {
    addIssue(issues, 'widthMm', 'Width must be a positive number.', 'invalid', 3)
  }
  if (!formData.heightMm.trim()) {
    addIssue(issues, 'heightMm', 'Height is required.', 'missing', 3)
  } else if (!isPositiveNumber(formData.heightMm)) {
    addIssue(issues, 'heightMm', 'Height must be a positive number.', 'invalid', 3)
  }
  if (!formData.thicknessMm.trim()) {
    addIssue(issues, 'thicknessMm', 'Thickness is required.', 'missing', 3)
  } else if (!isPositiveNumber(formData.thicknessMm)) {
    addIssue(issues, 'thicknessMm', 'Thickness must be a positive number.', 'invalid', 3)
  }
  if (!formData.handing.trim()) {
    addIssue(issues, 'handing', 'Handing is required.', 'missing', 3)
  }
  if (!formData.openingDirection.trim()) {
    addIssue(issues, 'openingDirection', 'Opening direction is required.', 'missing', 3)
  }
  if (!formData.frameType.trim()) {
    addIssue(issues, 'frameType', 'Frame type is required.', 'missing', 3)
  }
  if (formData.hasThreshold && !formData.thresholdType.trim()) {
    addIssue(issues, 'thresholdType', 'Threshold type is required.', 'missing', 3)
  }
  if (!formData.material.trim()) {
    addIssue(issues, 'material', 'Material is required.', 'missing', 4)
  }
  if (!formData.finishType.trim()) {
    addIssue(issues, 'finishType', 'Finish type is required.', 'missing', 4)
  }
  if (activeDoorType) {
    const spec = doorCatalog[activeDoorType]
    const veneerRequired =
      (formData.finishType === 'Veneered' || formData.material === 'Veneered') &&
      spec.veneerSpecies.length > 0

    if (veneerRequired && !formData.veneerSpecies.trim()) {
      addIssue(issues, 'veneerSpecies', 'Veneer species is required.', 'missing', 4)
    }
  }
  if (!formData.lockType.trim()) {
    addIssue(issues, 'lockType', 'Lock type is required.', 'missing', 5)
  }
  if (!formData.handleSet.trim()) {
    addIssue(issues, 'handleSet', 'Handle set is required.', 'missing', 5)
  }

  const issueMap: ValidationIssueMap = issues.reduce((accumulator, issue) => {
    if (!accumulator[issue.field]) {
      accumulator[issue.field] = issue
    }

    return accumulator
  }, {} as ValidationIssueMap)

  const invalid = issues.filter((issue) => issue.type === 'invalid')
  const missing = issues.filter((issue) => issue.type === 'missing')

  if (invalid.length > 0) {
    return {
      status: 'invalid',
      label: 'Invalid configuration',
      description: 'Fix the invalid numeric or rule-driven values before printing the worksheet.',
      missing,
      invalid,
      issueMap,
    }
  }

  if (missing.length > 0) {
    return {
      status: 'missing',
      label: 'Missing required fields',
      description: 'Complete the required order, dimension, material, and hardware fields.',
      missing,
      invalid,
      issueMap,
    }
  }

  return {
    status: 'ready',
    label: 'Ready for worksheet generation',
    description: 'All required fields are complete and the current configuration is printable.',
    missing,
    invalid,
    issueMap,
  }
}
