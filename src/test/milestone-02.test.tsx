/**
 * Milestone 2 — React Router and Single-Page Application Architecture
 *
 * Tests cover routing, navigation, loading/error states, and Milestone 1 regression.
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { MemoryRouter, Routes, Route } from 'react-router-dom'

import { AppProvider } from '../context/appContext'
import App from '../App'
import NotFoundPage from '../pages/NotFoundPage'
import AboutPage from '../pages/AboutPage'
import HomePage from '../pages/HomePage'
import type { Movie } from '../types'

// ── Shared test fixtures ──────────────────────────────────────────────────────

const MOCK_MOVIES: Movie[] = [
  {
    id: 76600,
    title: 'Avatar: The Way of Water',
    overview: 'Set more than a decade after the events of the first film.',
    poster_path: '/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg',
    backdrop_path: '/s16H6tpK2utvwpapmarhZVPAHJJ.jpg',
    release_date: '2022-12-14',
    vote_average: 7.7,
    vote_count: 7535,
    popularity: 1234.5,
    genre_ids: [878, 12, 28],
    adult: false,
  },
  {
    id: 603692,
    title: 'John Wick: Chapter 4',
    overview: 'With the price on his head ever increasing.',
    poster_path: '/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg',
    backdrop_path: '/fu8mPaVZ9Z3Yw2yUV5qzGnYzDXC.jpg',
    release_date: '2023-03-22',
    vote_average: 8.0,
    vote_count: 1211,
    popularity: 987.6,
    genre_ids: [28, 53, 80],
    adult: false,
  },
]

// ── Render helper ─────────────────────────────────────────────────────────────

function renderWithProviders(ui: React.ReactNode) {
  return render(<AppProvider>{ui}</AppProvider>)
}

// ── Fetch mock helpers ────────────────────────────────────────────────────────

function mockFetch() {
  return Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        results: MOCK_MOVIES,
        page: 1,
        total_pages: 1,
        total_results: MOCK_MOVIES.length,
      }),
  })
}

function mockFetchError() {
  return Promise.resolve({
    ok: false,
    status: 401,
    statusText: 'Unauthorized',
  })
}

beforeEach(() => {
  localStorage.clear()
  document.documentElement.removeAttribute('data-theme')
  vi.stubGlobal('fetch', vi.fn(mockFetch))
})

afterEach(() => {
  vi.unstubAllGlobals()
})

// ── App — routing shell ───────────────────────────────────────────────────────

describe('App — routing shell', () => {
  it('renders without crashing', () => {
    expect(() => render(<App />)).not.toThrow()
  })

  it('renders a search input on the home page', () => {
    render(<App />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('renders movie cards after the home page fetch resolves', async () => {
    render(<App />)
    await waitFor(() => {
      expect(screen.getAllByRole('heading', { level: 2 }).length).toBeGreaterThanOrEqual(1)
    })
  })
})

// ── Header — navigation links ─────────────────────────────────────────────────

describe('Header — navigation links', () => {
  it('renders a Home navigation link', () => {
    render(<App />)
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument()
  })

  it('the Home link points to "/"', () => {
    render(<App />)
    expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute('href', '/')
  })

  it('renders an About navigation link', () => {
    render(<App />)
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument()
  })

  it('the About link points to "/about"', () => {
    render(<App />)
    expect(screen.getByRole('link', { name: /about/i })).toHaveAttribute('href', '/about')
  })
})

// ── NotFoundPage — wildcard 404 route ─────────────────────────────────────────

describe('NotFoundPage — wildcard 404 route', () => {
  it('renders a 404 indicator', () => {
    renderWithProviders(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    )
    expect(screen.getByText(/404/)).toBeInTheDocument()
  })

  it('renders a message explaining the page was not found', () => {
    renderWithProviders(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    )
    expect(screen.getByText(/not found/i)).toBeInTheDocument()
  })

  it('renders a way to navigate back to the home page', () => {
    renderWithProviders(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    )
    const homeLink = screen.queryByRole('link', { name: /home/i })
    const homeButton = screen.queryByRole('button', { name: /home/i })
    const backButton = screen.queryByRole('button', { name: /back/i })
    expect(homeLink || homeButton || backButton).not.toBeNull()
  })

  it('is rendered when navigating to an unknown route', () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/this-route-does-not-exist']}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MemoryRouter>
    )
    expect(screen.getByText(/404/)).toBeInTheDocument()
  })

  it('does NOT render on the home route', () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MemoryRouter>
    )
    expect(screen.queryByText(/404/)).not.toBeInTheDocument()
  })
})

// ── AboutPage — /about route ──────────────────────────────────────────────────

describe('AboutPage — /about route', () => {
  it('renders without crashing', () => {
    expect(() =>
      renderWithProviders(
        <MemoryRouter>
          <AboutPage />
        </MemoryRouter>
      )
    ).not.toThrow()
  })

  it('renders a heading', () => {
    renderWithProviders(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    )
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('renders a link that navigates away from the page', () => {
    renderWithProviders(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    )
    expect(screen.getAllByRole('link').length).toBeGreaterThanOrEqual(1)
  })

  it('does NOT show a 404 indicator on the /about route', () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/about']}>
        <Routes>
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MemoryRouter>
    )
    expect(screen.queryByText(/404/)).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })
})

// ── HomePage — loading and error states ───────────────────────────────────────

describe('HomePage — loading state', () => {
  it('shows no movie headings while the fetch is pending', () => {
    vi.stubGlobal('fetch', vi.fn(() => new Promise(() => {})))

    renderWithProviders(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.queryAllByRole('heading', { level: 2 })).toHaveLength(0)
  })
})

describe('HomePage — error / empty state', () => {
  it('shows no movie headings when the fetch fails', async () => {
    vi.stubGlobal('fetch', vi.fn(mockFetchError))

    renderWithProviders(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.queryAllByRole('heading', { level: 2 })).toHaveLength(0)
    })
  })
})

// ── Milestone 1 regression ────────────────────────────────────────────────────

describe('Milestone 1 regression — props, state, and search still work', () => {
  it('renders movie cards after the home page fetch resolves', async () => {
    render(<App />)
    await waitFor(() => {
      expect(screen.getAllByRole('heading', { level: 2 }).length).toBeGreaterThanOrEqual(1)
    })
  })

  it('renders Avatar: The Way of Water from the mocked API response', async () => {
    render(<App />)
    await waitFor(() => {
      expect(screen.getByText(/Avatar: The Way of Water/i)).toBeInTheDocument()
    })
  })

  it('renders John Wick from the mocked API response', async () => {
    render(<App />)
    await waitFor(() => {
      expect(screen.getByText(/John Wick/i)).toBeInTheDocument()
    })
  })

  it('the search bar is present', async () => {
    render(<App />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('typing in the search bar updates its value', async () => {
    render(<App />)
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'Avatar' } })
    expect(input).toHaveValue('Avatar')
  })
})
