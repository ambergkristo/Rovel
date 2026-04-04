import { useEffect, useState } from 'react'
import './App.css'
import { SummarySidebar } from './components/SummarySidebar'
import { WorksheetView } from './components/WorksheetView'
import { doorCatalog, doorTypeOptions } from './data/doorCatalog'
import {
  createEmptyFormData,
  getActiveDoorType,
  getDoorTypeDefaults,
  sanitizeDoorConfiguration,
  storageKey,
  toggleListValue,
} from './lib/doorRules'
import { getValidationResult } from './lib/validation'
import type {
  DoorFormData,
  DoorTypeId,
  StepDefinition,
  ValidationIssueMap,
} from './types'

const steps: StepDefinition[] = [
  { id: 1, title: 'Basic order info' },
  { id: 2, title: 'Door type' },
  { id: 3, title: 'Dimensions and handing' },
  { id: 4, title: 'Material and finish' },
  { id: 5, title: 'Hardware and extras' },
  { id: 6, title: 'Review worksheet' },
]

const initialDraft = (): DoorFormData => {
  const emptyDraft = createEmptyFormData()
  const storedDraft = window.localStorage.getItem(storageKey)

  if (!storedDraft) {
    return emptyDraft
  }

  try {
    const parsed = JSON.parse(storedDraft) as Partial<DoorFormData>
    return sanitizeDoorConfiguration({ ...emptyDraft, ...parsed })
  } catch {
    return emptyDraft
  }
}

function App() {
  const [formData, setFormData] = useState<DoorFormData>(initialDraft)
  const [currentStep, setCurrentStep] = useState(1)
  const [extraInput, setExtraInput] = useState('')
  const [localNotice, setLocalNotice] = useState('')

  const activeDoorType = getActiveDoorType(formData.doorType)
  const activeSpec = activeDoorType ? doorCatalog[activeDoorType] : null
  const validation = getValidationResult(formData)
  const issueMap = validation.issueMap
  const stepStatus = steps.reduce<Record<number, 'complete' | 'attention' | 'idle'>>(
    (accumulator, step) => {
      const relevantIssues = Object.values(issueMap).filter(
        (issue) => issue.step === step.id,
      )

      if (relevantIssues.length > 0) {
        accumulator[step.id] = 'attention'
      } else if (step.id < currentStep || (step.id === 6 && validation.status === 'ready')) {
        accumulator[step.id] = 'complete'
      } else {
        accumulator[step.id] = 'idle'
      }

      return accumulator
    },
    {},
  )

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(formData))
  }, [formData])

  const updateForm = (updater: (current: DoorFormData) => DoorFormData) => {
    setFormData((current) => sanitizeDoorConfiguration(updater(current)))
  }

  const setField = <K extends keyof DoorFormData>(field: K, value: DoorFormData[K]) => {
    updateForm((current) => ({ ...current, [field]: value }))
  }

  const changeDoorType = (nextDoorType: DoorTypeId | '') => {
    updateForm((current) => {
      const defaults = nextDoorType ? getDoorTypeDefaults(nextDoorType) : {}

      return {
        ...current,
        ...defaults,
        doorType: nextDoorType,
      }
    })
  }

  const addExtra = () => {
    const normalized = extraInput.trim()

    if (!normalized) {
      return
    }

    updateForm((current) => ({
      ...current,
      extras: Array.from(new Set([...current.extras, normalized])),
    }))
    setExtraInput('')
  }

  const clearDraft = () => {
    const cleared = createEmptyFormData()
    setFormData(cleared)
    setCurrentStep(1)
    setExtraInput('')
    window.localStorage.setItem(storageKey, JSON.stringify(cleared))
    setLocalNotice('Draft reset to a blank worksheet.')
  }

  const jumpToReview = () => {
    setCurrentStep(6)
  }

  const nextStep = () => {
    setCurrentStep((current) => Math.min(current + 1, steps.length))
  }

  const previousStep = () => {
    setCurrentStep((current) => Math.max(current - 1, 1))
  }

  const renderFieldIssue = (field: keyof DoorFormData, issues: ValidationIssueMap) => {
    const issue = issues[field]
    if (!issue) {
      return null
    }

    return <p className="field-issue">{issue.message}</p>
  }

  return (
    <div className="app-shell">
      <header className="page-header screen-only">
        <div>
          <p className="eyebrow">Internal order-entry / production worksheet tool</p>
          <h1>Rovel Grupp Door Worksheet MVP</h1>
          <p className="lede">
            Structured internal order flow for door compilation, production prep,
            and printable workshop handoff.
          </p>
        </div>
        <div className="header-actions">
          <button className="ghost-button" type="button" onClick={clearDraft}>
            Reset draft
          </button>
          <button className="secondary-button" type="button" onClick={jumpToReview}>
            Open worksheet view
          </button>
        </div>
      </header>

      {localNotice ? (
        <div className="screen-only notice-banner">
          <span>{localNotice}</span>
          <button type="button" className="inline-button" onClick={() => setLocalNotice('')}>
            Dismiss
          </button>
        </div>
      ) : null}

      <div className="layout-grid">
        <main className="wizard-column">
          <nav className="stepper screen-only" aria-label="Wizard steps">
            {steps.map((step) => (
              <button
                key={step.id}
                type="button"
                className={`step-pill ${currentStep === step.id ? 'is-active' : ''} step-pill--${stepStatus[step.id]}`}
                onClick={() => setCurrentStep(step.id)}
              >
                <span className="step-pill-index">{step.id}</span>
                <span>{step.title}</span>
              </button>
            ))}
          </nav>

          {currentStep === 1 ? (
            <section className="panel">
              <div className="panel-heading">
                <div>
                  <p className="section-kicker">Step 1</p>
                  <h2>Basic order info</h2>
                </div>
                <p>Capture the internal reference before technical selections begin.</p>
              </div>
              <div className="form-grid">
                <label className="field">
                  <span>Order reference</span>
                  <input
                    value={formData.orderReference}
                    onChange={(event) => setField('orderReference', event.target.value)}
                    placeholder="RG-2026-041"
                  />
                  {renderFieldIssue('orderReference', issueMap)}
                </label>
                <label className="field">
                  <span>Due date</span>
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={(event) => setField('dueDate', event.target.value)}
                  />
                  {renderFieldIssue('dueDate', issueMap)}
                </label>
                <label className="field">
                  <span>Customer name</span>
                  <input
                    value={formData.customerName}
                    onChange={(event) => setField('customerName', event.target.value)}
                    placeholder="Client or contractor"
                  />
                  {renderFieldIssue('customerName', issueMap)}
                </label>
                <label className="field">
                  <span>Project / object</span>
                  <input
                    value={formData.projectName}
                    onChange={(event) => setField('projectName', event.target.value)}
                    placeholder="Apartment house B / renovation"
                  />
                  {renderFieldIssue('projectName', issueMap)}
                </label>
                <label className="field field--wide">
                  <span>Location</span>
                  <input
                    value={formData.location}
                    onChange={(event) => setField('location', event.target.value)}
                    placeholder="Tallinn, Tondi 12"
                  />
                  {renderFieldIssue('location', issueMap)}
                </label>
                <label className="field field--wide">
                  <span>Internal notes</span>
                  <textarea
                    rows={4}
                    value={formData.internalNotes}
                    onChange={(event) => setField('internalNotes', event.target.value)}
                    placeholder="Special transport, sequencing, contact instructions..."
                  />
                </label>
              </div>
            </section>
          ) : null}

          {currentStep === 2 ? (
            <section className="panel">
              <div className="panel-heading">
                <div>
                  <p className="section-kicker">Step 2</p>
                  <h2>Door type</h2>
                </div>
                <p>Door type drives allowed materials, thickness, locks, seals, and finish logic.</p>
              </div>
              <div className="choice-grid">
                {doorTypeOptions.map((option) => {
                  const spec = doorCatalog[option.id]
                  const selected = formData.doorType === option.id

                  return (
                    <button
                      key={option.id}
                      type="button"
                      className={`choice-card ${selected ? 'is-selected' : ''}`}
                      onClick={() => changeDoorType(option.id)}
                    >
                      <div className="choice-card-top">
                        <strong>{spec.label}</strong>
                        {spec.fixedThicknessMm ? (
                          <span>{spec.fixedThicknessMm} mm fixed</span>
                        ) : (
                          <span>Custom thickness</span>
                        )}
                      </div>
                      <p>{spec.description}</p>
                      <ul className="mini-list">
                        <li>Materials: {spec.materials.join(', ')}</li>
                        <li>Finishes: {spec.finishTypes.join(', ')}</li>
                        <li>Locks: {spec.lockTypes.join(', ')}</li>
                      </ul>
                    </button>
                  )
                })}
              </div>
              {renderFieldIssue('doorType', issueMap)}
            </section>
          ) : null}

          {currentStep === 3 ? (
            <section className="panel">
              <div className="panel-heading">
                <div>
                  <p className="section-kicker">Step 3</p>
                  <h2>Dimensions and handing</h2>
                </div>
                <p>Use real production measurements. Invalid or impossible dimension values block readiness.</p>
              </div>
              <div className="form-grid">
                <label className="field">
                  <span>Width (mm)</span>
                  <input
                    type="number"
                    min="1"
                    value={formData.widthMm}
                    onChange={(event) => setField('widthMm', event.target.value)}
                    placeholder="990"
                  />
                  {renderFieldIssue('widthMm', issueMap)}
                </label>
                <label className="field">
                  <span>Height (mm)</span>
                  <input
                    type="number"
                    min="1"
                    value={formData.heightMm}
                    onChange={(event) => setField('heightMm', event.target.value)}
                    placeholder="2090"
                  />
                  {renderFieldIssue('heightMm', issueMap)}
                </label>
                <label className="field">
                  <span>Thickness (mm)</span>
                  <input
                    type="number"
                    min="1"
                    value={formData.thicknessMm}
                    onChange={(event) => setField('thicknessMm', event.target.value)}
                    readOnly={Boolean(activeSpec?.fixedThicknessMm)}
                  />
                  {activeSpec?.fixedThicknessMm ? (
                    <p className="field-hint">Locked by {activeSpec.label} rule set.</p>
                  ) : null}
                  {renderFieldIssue('thicknessMm', issueMap)}
                </label>
                <label className="field">
                  <span>Frame type</span>
                  <select
                    value={formData.frameType}
                    onChange={(event) => setField('frameType', event.target.value)}
                  >
                    <option value="">Select frame</option>
                    {(activeSpec?.frameTypes ?? []).map((frameType) => (
                      <option key={frameType} value={frameType}>
                        {frameType}
                      </option>
                    ))}
                  </select>
                  {renderFieldIssue('frameType', issueMap)}
                </label>
                <label className="field">
                  <span>Handing</span>
                  <select
                    value={formData.handing}
                    onChange={(event) => setField('handing', event.target.value)}
                  >
                    <option value="">Select handing</option>
                    <option value="Left">Left</option>
                    <option value="Right">Right</option>
                  </select>
                  {renderFieldIssue('handing', issueMap)}
                </label>
                <label className="field">
                  <span>Opening direction</span>
                  <select
                    value={formData.openingDirection}
                    onChange={(event) =>
                      setField('openingDirection', event.target.value)
                    }
                  >
                    <option value="">Select direction</option>
                    <option value="Inward">Inward</option>
                    <option value="Outward">Outward</option>
                  </select>
                  {renderFieldIssue('openingDirection', issueMap)}
                </label>
              </div>

              {activeSpec?.supportsThreshold ? (
                <div className="subpanel">
                  <div className="subpanel-header">
                    <div>
                      <h3>Threshold</h3>
                      <p>{activeSpec.thresholdNote}</p>
                    </div>
                    <label className="toggle">
                      <input
                        type="checkbox"
                        checked={formData.hasThreshold}
                        onChange={(event) => setField('hasThreshold', event.target.checked)}
                      />
                      <span>Threshold required</span>
                    </label>
                  </div>
                  {formData.hasThreshold ? (
                    <label className="field">
                      <span>Threshold type</span>
                      <select
                        value={formData.thresholdType}
                        onChange={(event) =>
                          setField('thresholdType', event.target.value)
                        }
                      >
                        <option value="">Select threshold</option>
                        {activeSpec.thresholdTypes.map((thresholdType) => (
                          <option key={thresholdType} value={thresholdType}>
                            {thresholdType}
                          </option>
                        ))}
                      </select>
                      {renderFieldIssue('thresholdType', issueMap)}
                    </label>
                  ) : null}
                </div>
              ) : null}
            </section>
          ) : null}

          {currentStep === 4 ? (
            <section className="panel">
              <div className="panel-heading">
                <div>
                  <p className="section-kicker">Step 4</p>
                  <h2>Material and finish</h2>
                </div>
                <p>Selections below are filtered by door type rules and reset automatically when incompatible.</p>
              </div>
              <div className="form-grid">
                <label className="field">
                  <span>Material</span>
                  <select
                    value={formData.material}
                    onChange={(event) => setField('material', event.target.value)}
                  >
                    <option value="">Select material</option>
                    {(activeSpec?.materials ?? []).map((material) => (
                      <option key={material} value={material}>
                        {material}
                      </option>
                    ))}
                  </select>
                  {renderFieldIssue('material', issueMap)}
                </label>
                <label className="field">
                  <span>Finish type</span>
                  <select
                    value={formData.finishType}
                    onChange={(event) => setField('finishType', event.target.value)}
                  >
                    <option value="">Select finish</option>
                    {(activeSpec?.finishTypes ?? []).map((finishType) => (
                      <option key={finishType} value={finishType}>
                        {finishType}
                      </option>
                    ))}
                  </select>
                  {renderFieldIssue('finishType', issueMap)}
                </label>
                <label className="field">
                  <span>Color code</span>
                  <input
                    value={formData.colorCode}
                    onChange={(event) => setField('colorCode', event.target.value)}
                    placeholder="RAL 9016 / stain sample"
                  />
                </label>
                {(formData.finishType === 'Veneered' || formData.material === 'Veneered') &&
                activeSpec?.veneerSpecies.length ? (
                  <label className="field">
                    <span>Veneer species</span>
                    <select
                      value={formData.veneerSpecies}
                      onChange={(event) =>
                        setField('veneerSpecies', event.target.value)
                      }
                    >
                      <option value="">Select veneer</option>
                      {activeSpec.veneerSpecies.map((veneer) => (
                        <option key={veneer} value={veneer}>
                          {veneer}
                        </option>
                      ))}
                    </select>
                    {renderFieldIssue('veneerSpecies', issueMap)}
                  </label>
                ) : null}
              </div>

              <div className="subpanel">
                <div className="subpanel-header">
                  <div>
                    <h3>Split finish</h3>
                    <p>Use when inside and outside need different descriptions.</p>
                  </div>
                  <label className="toggle">
                    <input
                      type="checkbox"
                      checked={formData.insideOutsideDifferentFinish}
                      onChange={(event) =>
                        setField('insideOutsideDifferentFinish', event.target.checked)
                      }
                    />
                    <span>Different inside / outside finish</span>
                  </label>
                </div>
                {formData.insideOutsideDifferentFinish ? (
                  <div className="form-grid">
                    <label className="field">
                      <span>Inside finish notes</span>
                      <textarea
                        rows={3}
                        value={formData.insideFinishNotes}
                        onChange={(event) =>
                          setField('insideFinishNotes', event.target.value)
                        }
                        placeholder="Inside paint, sheen, sample..."
                      />
                    </label>
                    <label className="field">
                      <span>Outside finish notes</span>
                      <textarea
                        rows={3}
                        value={formData.outsideFinishNotes}
                        onChange={(event) =>
                          setField('outsideFinishNotes', event.target.value)
                        }
                        placeholder="Outside stain, weather side notes..."
                      />
                    </label>
                  </div>
                ) : null}
              </div>

              {activeDoorType === 'heritage' ? (
                <label className="field field--wide heritage-field">
                  <span>Traditional profile / heritage notes</span>
                  <textarea
                    rows={4}
                    value={formData.heritageNotes}
                    onChange={(event) => setField('heritageNotes', event.target.value)}
                    placeholder="Panel profile, moulding expectation, heritage references..."
                  />
                </label>
              ) : null}
            </section>
          ) : null}

          {currentStep === 5 ? (
            <section className="panel">
              <div className="panel-heading">
                <div>
                  <p className="section-kicker">Step 5</p>
                  <h2>Hardware and extras</h2>
                </div>
                <p>Use the curated hardware subset for the selected door type.</p>
              </div>
              <div className="form-grid">
                <label className="field">
                  <span>Lock type</span>
                  <select
                    value={formData.lockType}
                    onChange={(event) => setField('lockType', event.target.value)}
                  >
                    <option value="">Select lock</option>
                    {(activeSpec?.lockTypes ?? []).map((lockType) => (
                      <option key={lockType} value={lockType}>
                        {lockType}
                      </option>
                    ))}
                  </select>
                  {renderFieldIssue('lockType', issueMap)}
                </label>
                <label className="field">
                  <span>Handle set</span>
                  <select
                    value={formData.handleSet}
                    onChange={(event) => setField('handleSet', event.target.value)}
                  >
                    <option value="">Select handle set</option>
                    {(activeSpec?.handleSets ?? []).map((handleSet) => (
                      <option key={handleSet} value={handleSet}>
                        {handleSet}
                      </option>
                    ))}
                  </select>
                  {renderFieldIssue('handleSet', issueMap)}
                </label>
                <label className="field">
                  <span>Glass</span>
                  <select
                    value={formData.glass}
                    onChange={(event) => setField('glass', event.target.value)}
                  >
                    {(activeSpec?.glassOptions ?? []).map((glassType) => (
                      <option key={glassType} value={glassType}>
                        {glassType}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="field inline-checkbox">
                  <span>Closer</span>
                  <input
                    type="checkbox"
                    checked={formData.closer}
                    onChange={(event) => setField('closer', event.target.checked)}
                  />
                </label>
              </div>

              <div className="hardware-grid">
                <div className="subpanel">
                  <div className="subpanel-header">
                    <div>
                      <h3>Hinges</h3>
                      <p>Select one or more hinge packs.</p>
                    </div>
                  </div>
                  <div className="checkbox-list">
                    {(activeSpec?.hingeOptions ?? []).map((hinge) => (
                      <label key={hinge} className="checkbox-item">
                        <input
                          type="checkbox"
                          checked={formData.hinges.includes(hinge)}
                          onChange={() =>
                            setField('hinges', toggleListValue(formData.hinges, hinge))
                          }
                        />
                        <span>{hinge}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="subpanel">
                  <div className="subpanel-header">
                    <div>
                      <h3>Seals</h3>
                      <p>Exterior doors default to double seal automatically.</p>
                    </div>
                  </div>
                  <div className="checkbox-list">
                    {(activeSpec?.sealOptions ?? []).map((seal) => (
                      <label key={seal} className="checkbox-item">
                        <input
                          type="checkbox"
                          checked={formData.seals.includes(seal)}
                          onChange={() =>
                            setField('seals', toggleListValue(formData.seals, seal))
                          }
                        />
                        <span>{seal}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="subpanel">
                <div className="subpanel-header">
                  <div>
                    <h3>Extras</h3>
                    <p>Checklist plus custom production extras.</p>
                  </div>
                </div>
                <div className="checkbox-list checkbox-list--columns">
                  {(activeSpec?.extras ?? []).map((extra) => (
                    <label key={extra} className="checkbox-item">
                      <input
                        type="checkbox"
                        checked={formData.extras.includes(extra)}
                        onChange={() =>
                          setField('extras', toggleListValue(formData.extras, extra))
                        }
                      />
                      <span>{extra}</span>
                    </label>
                  ))}
                </div>
                <div className="chip-builder">
                  <input
                    value={extraInput}
                    onChange={(event) => setExtraInput(event.target.value)}
                    placeholder="Add custom extra"
                  />
                  <button type="button" className="secondary-button" onClick={addExtra}>
                    Add extra
                  </button>
                </div>
                {formData.extras.length ? (
                  <div className="chip-row">
                    {formData.extras.map((extra) => (
                      <button
                        key={extra}
                        type="button"
                        className="chip"
                        onClick={() =>
                          setField('extras', formData.extras.filter((item) => item !== extra))
                        }
                      >
                        {extra}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>

              <label className="field field--wide">
                <span>Production notes</span>
                <textarea
                  rows={5}
                  value={formData.productionNotes}
                  onChange={(event) => setField('productionNotes', event.target.value)}
                  placeholder="Edge sealing, machining, packing, installation prep..."
                />
              </label>
            </section>
          ) : null}

          {currentStep === 6 ? (
            <section className="panel panel--review worksheet-area">
              <div className="panel-heading screen-only">
                <div>
                  <p className="section-kicker">Step 6</p>
                  <h2>Review / printable worksheet</h2>
                </div>
                <p>
                  Status: <strong>{validation.label}</strong>
                </p>
              </div>

              <div className={`status-banner status-banner--${validation.status}`}>
                <strong>{validation.label}</strong>
                <span>{validation.description}</span>
              </div>

              <WorksheetView formData={formData} validation={validation} />

              <div className="review-actions screen-only">
                <button type="button" className="ghost-button" onClick={previousStep}>
                  Back to editing
                </button>
                <button type="button" className="primary-button" onClick={() => window.print()}>
                  Print worksheet
                </button>
              </div>
            </section>
          ) : null}

          <footer className="wizard-actions screen-only">
            <button
              type="button"
              className="ghost-button"
              onClick={previousStep}
              disabled={currentStep === 1}
            >
              Previous
            </button>
            <div className="wizard-actions-meta">
              <span>
                {validation.status === 'ready'
                  ? 'Configuration currently ready.'
                  : `${validation.missing.length} missing, ${validation.invalid.length} invalid.`}
              </span>
              <button
                type="button"
                className="primary-button"
                onClick={currentStep === steps.length ? jumpToReview : nextStep}
              >
                {currentStep === steps.length ? 'Stay on worksheet' : 'Next step'}
              </button>
            </div>
          </footer>
        </main>

        <SummarySidebar formData={formData} validation={validation} />
      </div>
    </div>
  )
}

export default App
