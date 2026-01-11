import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from './components/Navigation'
import { ThemeProvider } from './components/ThemeProvider'
import { FOOTER_LINKS } from './constants'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: 'Umaptimizer - Uma Musume Skill Optimizer',
  description: 'Uma Musume skill optimizer, rating calculator, support hints, randomizer, and Umadle.',
  metadataBase: new URL('https://umtools.vercel.app'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <Script
          id="dark-mode-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var pref = localStorage.getItem("umasearch-theme") || localStorage.getItem("umasearch-darkmode");
                  var dark = true; // Default to dark mode
                  if (pref === "light") {
                    dark = false;
                  } else if (pref === "dark") {
                    dark = true;
                  }
                  // Always default to dark if no preference is set
                  if (dark) {
                    document.documentElement.classList.add("dark", "dark-mode");
                  } else {
                    document.documentElement.classList.remove("dark", "dark-mode");
                  }
                  document.body.classList.toggle("dark-mode", dark);
                  document.documentElement.style.colorScheme = dark ? "dark" : "light";
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider>
          <Navigation />
          <main style={{ flex: '1 0 auto', width: '100%' }}>
            {children}
          </main>
          <footer className="site-footer glass">
            <span>Made with ❤️</span>
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                {link.label}
              </a>
            ))}
          </footer>
          <Script defer src="/_vercel/insights/script.js" />
        </ThemeProvider>
      </body>
    </html>
  )
}
