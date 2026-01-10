import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from './components/Navigation'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: 'UmaTools - Uma Musume Tools',
  description: 'Uma Musume tools including skill optimizer, rating calculator, support hints, randomizer, and Umadle.',
  metadataBase: new URL('https://umtools.vercel.app'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <Script
          id="dark-mode-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var pref = localStorage.getItem("umasearch-darkmode");
                  var dark = pref
                    ? pref === "dark"
                    : window.matchMedia &&
                      window.matchMedia("(prefers-color-scheme: dark)").matches;
                  document.documentElement.classList.toggle("dark-mode", dark);
                  document.body.classList.toggle("dark-mode", dark);
                  document.documentElement.style.colorScheme = dark ? "dark" : "light";
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <Navigation />
        {children}
        <Script defer src="/_vercel/insights/script.js" />
      </body>
    </html>
  )
}
