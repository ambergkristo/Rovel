import { doorCatalog } from '../data/doorCatalog'
import { getActiveDoorType } from '../lib/doorRules'
import type { DoorFormData, ValidationResult } from '../types'

interface SummarySidebarProps {
  formData: DoorFormData
  validation: ValidationResult
}

const summarizeNotes = (formData: DoorFormData) =>
  [formData.internalNotes, formData.heritageNotes, formData.productionNotes]
    .filter(Boolean)
    .join(' | ')

export function SummarySidebar({ formData, validation }: SummarySidebarProps) {
  const activeDoorType = getActiveDoorType(formData.doorType)
  const doorLabel = activeDoorType ? doorCatalog[activeDoorType].label : 'Not selected'
  const finishLabel = [formData.finishType, formData.colorCode].filter(Boolean).join(' / ')
  const notes = summarizeNotes(formData)

  return (
    <aside className="summary-column screen-only">
      <section className="summary-card">
        <div className="summary-card-header">
          <div>
            <p className="section-kicker">Live summary</p>
            <h2>Current worksheet</h2>
          </div>
          <span className={`status-dot status-dot--${validation.status}`}>
            {validation.label}
          </span>
        </div>

        <dl className="summary-list">
          <div>
            <dt>Order reference</dt>
            <dd>{formData.orderReference || 'Pending'}</dd>
          </div>
          <div>
            <dt>Customer / object</dt>
            <dd>
              {[formData.customerName, formData.projectName].filter(Boolean).join(' / ') ||
                'Pending'}
            </dd>
          </div>
          <div>
            <dt>Door type</dt>
            <dd>{doorLabel}</dd>
          </div>
          <div>
            <dt>Dimensions</dt>
            <dd>
              {[formData.widthMm, formData.heightMm, formData.thicknessMm]
                .filter(Boolean)
                .join(' x ') || 'Pending'}
              {formData.widthMm || formData.heightMm || formData.thicknessMm ? ' mm' : ''}
            </dd>
          </div>
          <div>
            <dt>Handing</dt>
            <dd>
              {[formData.handing, formData.openingDirection].filter(Boolean).join(' / ') ||
                'Pending'}
            </dd>
          </div>
          <div>
            <dt>Material</dt>
            <dd>{formData.material || 'Pending'}</dd>
          </div>
          <div>
            <dt>Finish</dt>
            <dd>{finishLabel || 'Pending'}</dd>
          </div>
          <div>
            <dt>Selected hardware</dt>
            <dd>
              {[formData.lockType, formData.handleSet, ...formData.hinges].filter(Boolean).join(', ') ||
                'Pending'}
            </dd>
          </div>
          <div>
            <dt>Notes</dt>
            <dd>{notes || 'No notes yet'}</dd>
          </div>
          <div>
            <dt>Validation</dt>
            <dd>
              {validation.status === 'ready'
                ? 'Ready for worksheet generation'
                : validation.invalid.length > 0
                ? `${validation.invalid.length} invalid value(s)`
                : `${validation.missing.length} required field(s) missing`}
            </dd>
          </div>
        </dl>
      </section>
    </aside>
  )
}
