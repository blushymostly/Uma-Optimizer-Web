import type { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'UmaTools - Uma Musume Support Hint Finder',
  description: 'Find Uma Musume support card hints by skill keywords. Filter by rarity and match modes to locate supports fast.',
}

export default function HintsPage() {
  return (
    <>
      <div className="container">
        <h1>Uma Support Hint Finder</h1>

        <p className="subtle">
          Type a skill hint (e.g., <em>Medium Corners</em>), press Enter to add
          it.
        </p>

        <div className="toolbar">
          <div className="controls" id="guess-form" style={{ flex: 1 }}>
            <input
              id="hintInput"
              list="hintList"
              type="text"
              placeholder="Add hint (e.g., Medium Corners ○)"
            />
            <button id="addBtn" className="primary">Add</button>
            <select id="modeSelect" aria-label="Match mode">
              <option value="AND">Match ALL (AND)</option>
              <option value="OR">Match ANY (OR)</option>
            </select>
          </div>

          <div className="row">
            <label><input type="checkbox" id="fSSR" defaultChecked /> SSR</label>
            <label><input type="checkbox" id="fSR" defaultChecked /> SR</label>
            <label><input type="checkbox" id="fR" defaultChecked /> R</label>
          </div>

          <div className="row">
            <button id="clearBtn">Clear</button>
          </div>
        </div>

        <datalist id="hintList"></datalist>

        <div className="chips" id="chips"></div>
        <div className="inline-note muted" id="counts"></div>
        <div className="spacer"></div>

        <div id="results" className="grid"></div>
      </div>
      <Script src="/hints.js" strategy="afterInteractive" />
    </>
  )
}
