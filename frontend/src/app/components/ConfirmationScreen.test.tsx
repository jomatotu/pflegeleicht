import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ConfirmationScreen } from './ConfirmationScreen'

// Mock Supabase
vi.mock('../../lib/supabaseClient', () => ({
  supabase: {
    functions: {
      invoke: vi.fn(),
    },
  },
}))

// Mock logo import
vi.mock('../../imports/image.png', () => ({ default: 'logo.png' }))

import { supabase } from '../../lib/supabaseClient'

const mockService = {
  id: '1',
  title: 'Haushaltshilfe',
  description: 'Hilfe',
  cost: 40,
  monthlyPrice: 40,
  pricePerHour: 20,
  hours: 2,
}

const fullExtractedData = {
  firstname: 'Max',
  lastname: 'Mustermann',
  street: 'Musterstraße 1',
  city: 'Berlin',
  postalCode: '10115',
  contact_person_email: 'max@example.com',
  contact_person_phone: '030123456',
  insurance_number: 'A123456789',
  order_number_md: 'MD-001',
  date_of_birth: '1950-01-01',
}

const defaultProps = {
  pflegegrad: 2,
  selectedServices: [mockService],
  totalBudget: 200,
  remainingBudget: 160,
  onConfirm: vi.fn(),
  onBack: vi.fn(),
  extractedData: fullExtractedData,
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('ConfirmationScreen – Formularvalidierung', () => {
  it('zeigt Fehler wenn Pflichtfelder leer sind', async () => {
    render(
      <ConfirmationScreen
        {...defaultProps}
        extractedData={{}}
      />
    )

    fireEvent.click(screen.getByText('Jetzt verbindlich bestätigen'))

    await waitFor(() => {
      expect(screen.getByText(/Bitte füllen Sie alle Pflichtfelder aus/i)).toBeInTheDocument()
    })
  })

  it('listet fehlende Pflichtfelder auf', async () => {
    render(
      <ConfirmationScreen
        {...defaultProps}
        extractedData={{ firstname: 'Max' }} // nur Vorname gefüllt
      />
    )

    fireEvent.click(screen.getByText('Jetzt verbindlich bestätigen'))

    await waitFor(() => {
      const error = screen.getByText(/Pflichtfelder/i)
      expect(error.textContent).toContain('Nachname')
      expect(error.textContent).toContain('Straße')
      expect(error.textContent).toContain('PLZ')
      expect(error.textContent).toContain('Ort')
    })
  })

  it('sendet Antrag wenn alle Felder ausgefüllt', async () => {
    vi.mocked(supabase.functions.invoke).mockResolvedValue({ data: {}, error: null } as any)

    render(<ConfirmationScreen {...defaultProps} />)

    fireEvent.click(screen.getByText('Jetzt verbindlich bestätigen'))

    await waitFor(() => {
      expect(supabase.functions.invoke).toHaveBeenCalledWith('process-antrag', expect.any(Object))
      expect(defaultProps.onConfirm).toHaveBeenCalledWith(true)
    })
  })

  it('zeigt Fehler bei API-Fehler', async () => {
    vi.mocked(supabase.functions.invoke).mockResolvedValue({
      data: null,
      error: 'Server error',
    } as any)

    render(<ConfirmationScreen {...defaultProps} />)

    fireEvent.click(screen.getByText('Jetzt verbindlich bestätigen'))

    await waitFor(() => {
      expect(screen.getByText(/Fehler/i)).toBeInTheDocument()
    })
  })

  it('deaktiviert Submit-Button während Übermittlung', async () => {
    // Einfrieren des API-Calls
    vi.mocked(supabase.functions.invoke).mockReturnValue(new Promise(() => {}))

    render(<ConfirmationScreen {...defaultProps} />)

    fireEvent.click(screen.getByText('Jetzt verbindlich bestätigen'))

    await waitFor(() => {
      expect(screen.getByText('Wird gesendet...')).toBeInTheDocument()
    })

    const submitButton = screen.getByText('Wird gesendet...')
    expect(submitButton.closest('button')).toBeDisabled()
  })
})

describe('ConfirmationScreen – Budget-Anzeige', () => {
  it('zeigt Gesamtkosten und verbleibendes Budget', () => {
    render(<ConfirmationScreen {...defaultProps} totalBudget={200} remainingBudget={160} />)

    expect(screen.getByText('40.00 €')).toBeInTheDocument() // usedBudget = 200-160
    expect(screen.getByText(/160\.00 €/)).toBeInTheDocument()
  })

  it('zeigt Budget-überschritten-Warnung bei negativem Budget', () => {
    render(
      <ConfirmationScreen
        {...defaultProps}
        totalBudget={200}
        remainingBudget={-20}
      />
    )

    expect(screen.getByText(/Budget überschritten/i)).toBeInTheDocument()
    expect(screen.getAllByText(/20\.00 €/).length).toBeGreaterThan(0)
  })

  it('zeigt Pflegegrad korrekt an', () => {
    render(<ConfirmationScreen {...defaultProps} pflegegrad={3} />)

    expect(screen.getByText(/Stufe 3/)).toBeInTheDocument()
  })
})

describe('ConfirmationScreen – Navigation', () => {
  it('ruft onBack auf wenn Zurück-Button geklickt', () => {
    const onBack = vi.fn()
    render(<ConfirmationScreen {...defaultProps} onBack={onBack} />)

    fireEvent.click(screen.getByText('Zurück zur Auswahl'))

    expect(onBack).toHaveBeenCalledOnce()
  })

  it('zeigt Bestätigungs-Screen wenn isConfirmed true', () => {
    render(<ConfirmationScreen {...defaultProps} isConfirmed={true} />)

    expect(screen.getByText('Fertig!')).toBeInTheDocument()
    expect(screen.getByText(/48 Stunden/i)).toBeInTheDocument()
  })
})