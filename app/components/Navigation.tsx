'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import DarkModeToggle from './DarkModeToggle'
import { cn } from '@/lib/utils'

const ROUTES = [
  { label: 'Support Hints', path: '/hints' },
  { label: 'Umadle', path: '/umadle' },
  { label: 'Randomizer', path: '/random' },
  { label: 'Optimizer', path: '/optimizer' },
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
    <nav className={cn('site-nav', isMenuOpen && 'open')}>
      <div className="nav-inner">
        <div className="nav-left">
          <Link 
            className="brand text-lg font-bold transition-colors hover:text-[#3A7BC8]" 
            href="/hints" 
            aria-label="Uma Tools Home"
          >
            UmaTools
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden menu-btn"
            aria-label="Menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
          <div className="nav-links" role="navigation" aria-label="Primary">
            {ROUTES.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className={cn(
                  'nav-link px-3 py-1.5 rounded-md text-sm font-medium transition-all',
                  pathname === route.path 
                    ? 'active bg-[rgba(74,144,226,0.15)] border border-[rgba(74,144,226,0.4)] text-[#4A90E2] font-semibold' 
                    : 'text-[#475569] hover:bg-[rgba(74,144,226,0.1)] hover:border-[rgba(74,144,226,0.3)] hover:text-[#4A90E2]'
                )}
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
  )
}
