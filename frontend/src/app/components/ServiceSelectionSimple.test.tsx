import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ServiceSelectionSimple } from './ServiceSelectionSimple'
import { ServiceData } from '../data/services'
import { Home } from 'lucide-react'

const mockService: ServiceData = {
  id: '1',
  title: 'Haushaltshilfe',
  description: 'Hilfe bei Haushaltstätigkeiten',
  pricePerHour: 20,
  minPflegegrad: 1,
  icon: Home,
}

const defaultProps = {
  totalBudget: 200,
  remainingBudget: 200,
  services: [mockService],
  isLoadingServices: false,
  servicesError: null,
  selectedServices: [],
  onSelectService: vi.fn(),
  onRemoveService: vi.fn(),
  onFinish: vi.fn(),
}

describe('ServiceSelectionSimple – Budget-Anzeige', () => {
  it('zeigt verbleibendes Budget und Gesamtbudget an', () => {
    render(<ServiceSelectionSimple {...defaultProps} remainingBudget={160} totalBudget={200} />)

    expect(screen.getByText('160.00 €')).toBeInTheDocument()
    expect(screen.getByText('von 200.00 €')).toBeInTheDocument()
  })

  it('zeigt Budget-überschritten-Warnung wenn remainingBudget negativ', () => {
    const services = [
      { id: '1', title: 'Test', description: '', cost: 50, monthlyPrice: 50, pricePerHour: 25, hours: 2 },
    ]
    render(
      <ServiceSelectionSimple
        {...defaultProps}
        selectedServices={services}
        remainingBudget={-10}
      />
    )

    expect(screen.getByText(/Budget überschritten/i)).toBeInTheDocument()
    expect(screen.getAllByText(/10\.00 €/).length).toBeGreaterThan(0)
  })

  it('zeigt keine Warnung wenn Budget nicht überschritten', () => {
    const services = [
      { id: '1', title: 'Test', description: '', cost: 40, monthlyPrice: 40, pricePerHour: 20, hours: 2 },
    ]
    render(
      <ServiceSelectionSimple
        {...defaultProps}
        selectedServices={services}
        remainingBudget={160}
      />
    )

    expect(screen.queryByText(/Budget überschritten/i)).not.toBeInTheDocument()
  })
})

describe('ServiceSelectionSimple – Leistungsauswahl', () => {
  it('berechnet monatlichen Preis korrekt (pricePerHour × 2)', () => {
    render(<ServiceSelectionSimple {...defaultProps} />)
    // 20 €/h × 2 h = 40 €
    expect(screen.getByText('40.00 €')).toBeInTheDocument()
  })

  it('ruft onSelectService mit korrektem Service-Objekt auf', () => {
    const onSelectService = vi.fn()
    render(<ServiceSelectionSimple {...defaultProps} onSelectService={onSelectService} />)

    fireEvent.click(screen.getByText('Auswählen'))

    expect(onSelectService).toHaveBeenCalledOnce()
    const calledWith = onSelectService.mock.calls[0][0]
    expect(calledWith.id).toBe('1')
    expect(calledWith.monthlyPrice).toBe(40)
    expect(calledWith.hours).toBe(2)
    expect(calledWith.pricePerHour).toBe(20)
  })

  it('ruft onRemoveService auf wenn ausgewählter Service abgewählt wird', () => {
    const onRemoveService = vi.fn()
    const selectedServices = [
      { id: '1', title: 'Haushaltshilfe', description: '', cost: 40, monthlyPrice: 40, pricePerHour: 20, hours: 2 },
    ]
    render(
      <ServiceSelectionSimple
        {...defaultProps}
        selectedServices={selectedServices}
        onRemoveService={onRemoveService}
      />
    )

    fireEvent.click(screen.getByText('Ausgewählt'))

    expect(onRemoveService).toHaveBeenCalledWith('1')
  })

  it('zeigt Fertig-Button nur wenn Services ausgewählt', () => {
    const { rerender } = render(<ServiceSelectionSimple {...defaultProps} selectedServices={[]} />)

    expect(screen.queryByText(/Fertig/i)).not.toBeInTheDocument()

    const selected = [
      { id: '1', title: 'Test', description: '', cost: 40, monthlyPrice: 40, pricePerHour: 20, hours: 2 },
    ]
    rerender(<ServiceSelectionSimple {...defaultProps} selectedServices={selected} />)

    expect(screen.getByText(/Fertig/i)).toBeInTheDocument()
  })

  it('ruft onFinish auf wenn Fertig-Button geklickt', () => {
    const onFinish = vi.fn()
    const selected = [
      { id: '1', title: 'Test', description: '', cost: 40, monthlyPrice: 40, pricePerHour: 20, hours: 2 },
    ]
    render(
      <ServiceSelectionSimple {...defaultProps} selectedServices={selected} onFinish={onFinish} />
    )

    fireEvent.click(screen.getByText(/Fertig/i))

    expect(onFinish).toHaveBeenCalledOnce()
  })
})

describe('ServiceSelectionSimple – Ladezustände', () => {
  it('zeigt Ladeindikator wenn isLoadingServices true', () => {
    render(<ServiceSelectionSimple {...defaultProps} isLoadingServices={true} />)

    expect(screen.getByText('Lade Leistungen...')).toBeInTheDocument()
  })

  it('zeigt Fehlermeldung wenn servicesError gesetzt', () => {
    render(
      <ServiceSelectionSimple
        {...defaultProps}
        isLoadingServices={false}
        servicesError="Fehler beim Laden"
      />
    )

    expect(screen.getByText('Fehler beim Laden')).toBeInTheDocument()
  })

  it('zeigt keine Services während Laden', () => {
    render(<ServiceSelectionSimple {...defaultProps} isLoadingServices={true} />)

    expect(screen.queryByText('Haushaltshilfe')).not.toBeInTheDocument()
  })
})