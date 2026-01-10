'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import DarkModeToggle from './DarkModeToggle'

const ROUTES = [
  { label: 'Support Hints', path: '/hints' },
  { label: 'Umadle', path: '/umadle' },
  { label: 'Randomizer', path: '/random' },
  { label: 'Optimizer', path: '/optimizer' },
]

const FOOTER_LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com/blushymostly/Uma-Optimizer-Web',
  },
  { label: 'YouTube', href: 'https://youtube.com/@MaybeVoid' },
]

export default function Navigation() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 640 && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isMenuOpen])

  return (
    <>
      <nav className={`site-nav ${isMenuOpen ? 'open' : ''}`}>
        <div className="nav-inner">
          <div className="nav-left">
            <Link className="brand" href="/hints" aria-label="Uma Tools Home">
              UmaTools
            </Link>
            <button
              className="menu-btn"
              aria-label="Menu"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="nav-links" role="navigation" aria-label="Primary">
              {ROUTES.map((route) => (
                <Link
                  key={route.path}
                  href={route.path}
                  className={`nav-link ${pathname === route.path ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {route.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="nav-right">
            <DarkModeToggle />
          </div>
        </div>
      </nav>
      <footer className="site-footer">
        <span>Made with ❤️</span>
        {FOOTER_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.label}
          </a>
        ))}
      </footer>
    </>
  )
}
