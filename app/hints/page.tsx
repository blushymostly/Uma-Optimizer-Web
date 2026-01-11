import type { Metadata } from 'next'
import Script from 'next/script'
import { HintsClient } from './HintsClient'

export const metadata: Metadata = {
  title: 'Umaptimizer - Uma Musume Support Hint Finder',
  description: 'Find Uma Musume support card hints by skill keywords. Filter by rarity and match modes to locate supports fast.',
}

export default function HintsPage() {
  return (
    <>
      <HintsClient />
      <Script src="/hints.js" strategy="afterInteractive" />
    </>
  )
}
