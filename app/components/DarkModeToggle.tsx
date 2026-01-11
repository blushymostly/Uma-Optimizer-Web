'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function DarkModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    // Sync next-themes with existing dark-mode class system
    const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
    document.documentElement.classList.toggle('dark-mode', isDark)
    document.body.classList.toggle('dark-mode', isDark)
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light'
    
    // Sync localStorage
    try {
      localStorage.setItem('umasearch-darkmode', isDark ? 'dark' : 'light')
    } catch (e) {
      // Ignore
    }
  }, [theme, mounted])

  if (!mounted) {
    return (
      <Button
        id="modeToggleBtn"
        variant="ghost"
        size="icon"
        aria-label="Toggle dark/light mode"
        className="in-nav"
      >
        <Sun className="h-5 w-5" />
      </Button>
    )
  }

  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)

  return (
    <Button
      id="modeToggleBtn"
      variant="ghost"
      size="icon"
      aria-label="Toggle dark/light mode"
      title="Toggle dark/light mode"
      className="in-nav"
      onClick={() => {
        const newTheme = isDark ? 'light' : 'dark'
        setTheme(newTheme)
      }}
    >
      {isDark ? (
        <Sun id="iconSun" className="h-5 w-5" />
      ) : (
        <Moon id="iconMoon" className="h-5 w-5" />
      )}
    </Button>
  )
}
