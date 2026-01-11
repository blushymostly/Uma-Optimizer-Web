'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { useEffect } from 'react'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Sync next-themes with existing dark-mode class system
    const updateTheme = () => {
      const theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light'
      const isDark = theme === 'dark'
      document.documentElement.classList.toggle('dark-mode', isDark)
      document.body.classList.toggle('dark-mode', isDark)
      document.documentElement.style.colorScheme = isDark ? 'dark' : 'light'
      
      // Also sync with existing localStorage key
      try {
        localStorage.setItem('umasearch-darkmode', isDark ? 'dark' : 'light')
      } catch (e) {
        // Ignore
      }
    }

    // Initial sync
    updateTheme()

    // Watch for theme changes
    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [])

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange={false}
      storageKey="umasearch-theme"
    >
      {children}
    </NextThemesProvider>
  )
}
