import { doorCatalog } from '../data/doorCatalog'
import { getActiveDoorType } from '../lib/doorRules'
import type { DoorFormData, ValidationResult } from '../types'

interface WorksheetViewProps {
  formData: DoorFormData
  validation: ValidationResult
}

const renderList = (values: string[], fallback = 'Not specified') =>
  values.length > 0 ? values.join(', ') : fallback

export function WorksheetView({ formData, validation }: WorksheetViewProps) {
  const activeDoorType = getActiveDoorType(formData.doorType)
  const doorLabel = activeDoorType ? doorCatalog[activeDoorType].label : 'Not selected'

  return (
    <article className="worksheet-sheet">
      <header className="worksheet-header">
        <div>
          <p className="worksheet-brand">Rovel Grupp</p>
          <h2>Door production worksheet</h2>
        </div>
        <div className="worksheet-meta">
          <span>Order ref: {formData.orderReference || 'Pending'}</span>
          <span>Status: {validation.label}</span>
          <span>Due: {formData.dueDate || 'Pending'}</span>
        </div>
      </header>

      <section className="worksheet-section">
        <h3>Order details</h3>
        <div className="worksheet-grid">
          <div>
            <span>Customer</span>
            <strong>{formData.customerName || 'Pending'}</strong>
          </div>
          <div>
            <span>Project / object</span>
            <strong>{formData.projectName || 'Pending'}</strong>
          </div>
          <div>
            <span>Location</span>
            <strong>{formData.location || 'Pending'}</strong>
          </div>
          <div>
            <span>Internal notes</span>
            <strong>{formData.internalNotes || 'None'}</strong>
          </div>
        </div>
      </section>

      <section className="worksheet-section">
        <h3>Product specification</h3>
        <div className="worksheet-grid">
          <div>
            <span>Door type</span>
            <strong>{doorLabel}</strong>
          </div>
          <div>
            <span>Dimensions</span>
            <strong>
              {[formData.widthMm, formData.heightMm, formData.thicknessMm]
                .filter(Boolean)
                .join(' x ') || 'Pending'}{' '}
              {formData.widthMm || formData.heightMm || formData.thicknessMm ? 'mm' : ''}
            </strong>
          </div>
          <div>
            <span>Handing / direction</span>
            <strong>
              {[formData.handing, formData.openingDirection].filter(Boolean).join(' / ') ||
                'Pending'}
            </strong>
          </div>
          <div>
            <span>Frame type</span>
            <strong>{formData.frameType || 'Pending'}</strong>
          </div>
          <div>
            <span>Threshold</span>
            <strong>
              {formData.hasThreshold
                ? formData.thresholdType || 'Threshold selected, type pending'
                : 'No threshold'}
            </strong>
          </div>
          <div>
            <span>Glass</span>
            <strong>{formData.glass || 'None'}</strong>
          </div>
        </div>
      </section>

      <section className="worksheet-section">
        <h3>Finish specification</h3>
        <div className="worksheet-grid">
          <div>
            <span>Material</span>
            <strong>{formData.material || 'Pending'}</strong>
          </div>
          <div>
            <span>Finish type</span>
            <strong>{formData.finishType || 'Pending'}</strong>
          </div>
          <div>
            <span>Color code</span>
            <strong>{formData.colorCode || 'Not specified'}</strong>
          </div>
          <div>
            <span>Veneer species</span>
            <strong>{formData.veneerSpecies || 'Not applicable'}</strong>
          </div>
          <div>
            <span>Inside finish notes</span>
            <strong>{formData.insideFinishNotes || 'Not specified'}</strong>
          </div>
          <div>
            <span>Outside finish notes</span>
            <strong>{formData.outsideFinishNotes || 'Not specified'}</strong>
          </div>
        </div>
      </section>

      <section className="worksheet-section">
        <h3>Hardware list</h3>
        <div className="worksheet-grid">
          <div>
            <span>Lock type</span>
            <strong>{formData.lockType || 'Pending'}</strong>
          </div>
          <div>
            <span>Handle set</span>
            <strong>{formData.handleSet || 'Pending'}</strong>
          </div>
          <div>
            <span>Hinges</span>
            <strong>{renderList(formData.hinges)}</strong>
          </div>
          <div>
            <span>Seals</span>
            <strong>{renderList(formData.seals)}</strong>
          </div>
          <div>
            <span>Closer</span>
            <strong>{formData.closer ? 'Yes' : 'No'}</strong>
          </div>
          <div>
            <span>Extras</span>
            <strong>{renderList(formData.extras, 'None')}</strong>
          </div>
        </div>
      </section>

      <section className="worksheet-section">
        <h3>Production notes</h3>
        <div className="worksheet-notes">
          <p>
            <strong>Production:</strong> {formData.productionNotes || 'No production notes.'}
          </p>
          <p>
            <strong>Heritage profile:</strong> {formData.heritageNotes || 'Not applicable.'}
          </p>
        </div>
      </section>
    </article>
  )
}
