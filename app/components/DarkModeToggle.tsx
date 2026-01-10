'use client'

import { useEffect, useState } from 'react'

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check initial theme
    const checkTheme = () => {
      try {
        const pref = localStorage.getItem('umasearch-darkmode')
        const dark = pref
          ? pref === 'dark'
          : window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: dark)').matches
        setIsDark(dark)
        applyTheme(dark, false)
      } catch (e) {
        // Ignore errors
      }
    }

    const applyTheme = (dark: boolean, persist: boolean) => {
      document.documentElement.classList.toggle('dark-mode', dark)
      document.body.classList.toggle('dark-mode', dark)
      document.documentElement.style.colorScheme = dark ? 'dark' : 'light'
      if (persist) {
        try {
          localStorage.setItem('umasearch-darkmode', dark ? 'dark' : 'light')
        } catch (e) {
          // Ignore errors
        }
      }
    }

    checkTheme()

    // Listen for storage changes (sync across tabs)
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'umasearch-darkmode') {
        const dark = e.newValue === 'dark'
        setIsDark(dark)
        applyTheme(dark, false)
      }
    }

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleMediaChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('umasearch-darkmode')) {
        setIsDark(e.matches)
        applyTheme(e.matches, false)
      }
    }

    window.addEventListener('storage', handleStorage)
    mediaQuery.addEventListener('change', handleMediaChange)

    return () => {
      window.removeEventListener('storage', handleStorage)
      mediaQuery.removeEventListener('change', handleMediaChange)
    }
  }, [])

  const toggleTheme = () => {
    const newDark = !isDark
    setIsDark(newDark)
    document.documentElement.classList.toggle('dark-mode', newDark)
    document.body.classList.toggle('dark-mode', newDark)
    document.documentElement.style.colorScheme = newDark ? 'dark' : 'light'
    try {
      localStorage.setItem('umasearch-darkmode', newDark ? 'dark' : 'light')
    } catch (e) {
      // Ignore errors
    }
  }

  return (
    <button
      id="modeToggleBtn"
      aria-label="Toggle dark/light mode"
      className="mode-toggle-btn in-nav"
      title="Toggle dark/light mode"
      onClick={toggleTheme}
    >
      <svg
        id="iconSun"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ display: isDark ? 'none' : 'inline' }}
      >
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
      <svg
        id="iconMoon"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ display: isDark ? 'inline' : 'none' }}
      >
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
      </svg>
    </button>
  )
}
