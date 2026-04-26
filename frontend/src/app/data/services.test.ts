import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fetchServices, fetchTotalBudget } from './services'

// Mock Supabase client
vi.mock('../../lib/supabaseClient', () => {
  const mockQuery = {
    select: vi.fn().mockReturnThis(),
    order: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis(),
    lte: vi.fn().mockReturnThis(),
    maybeSingle: vi.fn(),
  }

  return {
    supabase: {
      from: vi.fn(() => mockQuery),
    },
    __mockQuery: mockQuery,
  }
})

import { supabase } from '../../lib/supabaseClient'

function getMockQuery() {
  return (supabase.from as ReturnType<typeof vi.fn>).mock.results[0]?.value
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('fetchServices', () => {
  it('gibt gemappte ServiceData-Objekte zurück', async () => {
    const rows = [
      { id: 1, title: 'Haushaltshilfe', subtitle: 'Hilfe im Haushalt', budget: 25, pflegegrad: 2, icon: 'Home', rank: 1 },
      { id: 2, title: 'Betreuung', subtitle: 'Soziale Betreuung', budget: 30, pflegegrad: null, icon: 'Heart', rank: 2 },
    ]

    const mockChain = {
      select: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
    }
    ;(mockChain as any).then = undefined
    Object.assign(mockChain, { data: rows, error: null })
    vi.mocked(supabase.from).mockReturnValue(mockChain as any)

    // Resolve the select chain as a promise
    const selectMock = vi.fn().mockReturnThis()
    const orderMock = vi.fn().mockResolvedValue({ data: rows, error: null })
    vi.mocked(supabase.from).mockReturnValue({
      select: selectMock,
      order: orderMock,
    } as any)
    selectMock.mockReturnValue({ order: orderMock })

    const result = await fetchServices()

    expect(result).toHaveLength(2)
    expect(result[0]).toMatchObject({
      id: '1',
      title: 'Haushaltshilfe',
      description: 'Hilfe im Haushalt',
      pricePerHour: 25,
      minPflegegrad: 2,
    })
    expect(result[1].minPflegegrad).toBe(1) // null → default 1
  })

  it('verwendet Home-Icon als Fallback für unbekannte Icon-Namen', async () => {
    const rows = [
      { id: 3, title: 'Test', subtitle: 'Desc', budget: 10, pflegegrad: 1, icon: 'UnknownIcon', rank: 1 },
    ]

    const orderMock = vi.fn().mockResolvedValue({ data: rows, error: null })
    const selectMock = vi.fn().mockReturnValue({ order: orderMock })
    vi.mocked(supabase.from).mockReturnValue({ select: selectMock } as any)

    const result = await fetchServices()

    // Icon sollte auf Home fallen (Fallback)
    expect(result[0].icon).toBeDefined()
  })

  it('wirft bei Datenbankfehler', async () => {
    const dbError = new Error('DB connection failed')

    const orderMock = vi.fn().mockResolvedValue({ data: null, error: dbError })
    const selectMock = vi.fn().mockReturnValue({ order: orderMock })
    vi.mocked(supabase.from).mockReturnValue({ select: selectMock } as any)

    await expect(fetchServices()).rejects.toEqual(dbError)
  })

  it('gibt leeres Array zurück wenn keine Daten vorhanden', async () => {
    const orderMock = vi.fn().mockResolvedValue({ data: null, error: null })
    const selectMock = vi.fn().mockReturnValue({ order: orderMock })
    vi.mocked(supabase.from).mockReturnValue({ select: selectMock } as any)

    const result = await fetchServices()

    expect(result).toEqual([])
  })
})

describe('fetchTotalBudget', () => {
  it('gibt das Budget für einen bestimmten Pflegegrad zurück', async () => {
    const maybeSingleMock = vi.fn().mockResolvedValue({ data: { budget: 125.50 }, error: null })
    const lteMock = vi.fn().mockReturnValue({ maybeSingle: maybeSingleMock })
    const limitMock = vi.fn().mockReturnValue({ lte: lteMock })
    const orderMock = vi.fn().mockReturnValue({ limit: limitMock })
    const selectMock = vi.fn().mockReturnValue({ order: orderMock })
    vi.mocked(supabase.from).mockReturnValue({ select: selectMock } as any)

    const result = await fetchTotalBudget(3)

    expect(result).toBe(125.50)
    expect(lteMock).toHaveBeenCalledWith('pflegegrad', 3)
  })

  it('gibt 0 zurück wenn keine Budget-Daten vorhanden', async () => {
    const maybeSingleMock = vi.fn().mockResolvedValue({ data: null, error: null })
    const limitMock = vi.fn().mockReturnValue({ maybeSingle: maybeSingleMock })
    const orderMock = vi.fn().mockReturnValue({ limit: limitMock })
    const selectMock = vi.fn().mockReturnValue({ order: orderMock })
    vi.mocked(supabase.from).mockReturnValue({ select: selectMock } as any)

    const result = await fetchTotalBudget()

    expect(result).toBe(0)
  })

  it('ignoriert pflegegrad-Filter wenn NaN übergeben wird', async () => {
    const maybeSingleMock = vi.fn().mockResolvedValue({ data: { budget: 100 }, error: null })
    const limitMock = vi.fn().mockReturnValue({ maybeSingle: maybeSingleMock })
    const orderMock = vi.fn().mockReturnValue({ limit: limitMock })
    const selectMock = vi.fn().mockReturnValue({ order: orderMock })
    const lteMock = vi.fn()
    vi.mocked(supabase.from).mockReturnValue({ select: selectMock } as any)

    await fetchTotalBudget(NaN)

    // lte sollte nicht aufgerufen worden sein
    expect(lteMock).not.toHaveBeenCalled()
  })

  it('ignoriert pflegegrad-Filter wenn kein Wert übergeben wird', async () => {
    const maybeSingleMock = vi.fn().mockResolvedValue({ data: { budget: 200 }, error: null })
    const limitMock = vi.fn().mockReturnValue({ maybeSingle: maybeSingleMock })
    const orderMock = vi.fn().mockReturnValue({ limit: limitMock })
    const selectMock = vi.fn().mockReturnValue({ order: orderMock })
    vi.mocked(supabase.from).mockReturnValue({ select: selectMock } as any)

    const result = await fetchTotalBudget(undefined)

    expect(result).toBe(200)
  })

  it('wirft bei Datenbankfehler', async () => {
    const dbError = new Error('query failed')
    const maybeSingleMock = vi.fn().mockResolvedValue({ data: null, error: dbError })
    const limitMock = vi.fn().mockReturnValue({ maybeSingle: maybeSingleMock })
    const orderMock = vi.fn().mockReturnValue({ limit: limitMock })
    const selectMock = vi.fn().mockReturnValue({ order: orderMock })
    vi.mocked(supabase.from).mockReturnValue({ select: selectMock } as any)

    await expect(fetchTotalBudget()).rejects.toEqual(dbError)
  })
})