import type { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'UmaTools - Uma Musume Randomizer',
  description: 'Randomize Uma Musume support decks and pick a random Uma for training challenges.',
}

export default function RandomPage() {
  return (
    <main className="container">
      <h1>Randomizer</h1>

      {/* Support Deck Randomizer */}
      <section id="supportRandomizer" className="result">
        <div className="choice">
          <h3>Support Deck (5 cards)</h3>
          <div className="toolbar" role="group" aria-label="Support filters">
            <label><input type="checkbox" id="fSSR" defaultChecked /> SSR</label>
            <label><input type="checkbox" id="fSR" defaultChecked /> SR</label>
            <label><input type="checkbox" id="fR" defaultChecked /> R</label>

            <div style={{ flex: '1 1 220px' }}></div>

            <label className="toggle" style={{ marginRight: '.75rem' }}>
              <input type="checkbox" id="speed2x" /> 2× speed
            </label>
            <button className="btn primary" id="rollBtn" type="button">
              Roll 5
            </button>
            <button className="btn" id="clearExBtn" type="button">
              Clear Exclusions
            </button>
          </div>

          <div className="toolbar" role="group" aria-label="Exclude cards">
            <input
              list="supportList"
              id="excludeInput"
              placeholder="Exclude a support (choose from list)"
            />
            <datalist id="supportList"></datalist>
            <button className="btn" id="addExBtn" type="button">
              Add to Exclusions
            </button>
          </div>

          <div id="excludeChips" className="chips" aria-live="polite"></div>
        </div>

        <div id="deckResults" className="grid" aria-live="polite"></div>
      </section>

      <div className="spacer"></div>

      {/* Uma Randomizer */}
      <section id="umaRandomizer" className="result">
        <div className="choice">
          <h3>Random Uma</h3>
          <div className="toolbar">
            <label className="toggle" style={{ marginRight: '.75rem' }}>
              <input type="checkbox" id="speed2xUma" /> 2× speed
            </label>
            <button className="btn primary" id="pickUmaBtn" type="button">
              Pick Random Uma
            </button>
          </div>
        </div>

        <div id="umaResult" className="grid" aria-live="polite"></div>
      </section>

      <Script src="/random.js" strategy="afterInteractive" />
    </main>
  )
}
