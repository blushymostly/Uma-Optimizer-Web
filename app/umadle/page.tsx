import type { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'UmaTools - Uma Musume Umadle',
  description: 'Daily Uma Musume guessing game where you narrow down the mystery Uma with stat hints.',
}

export default function UmadlePage() {
  return (
    <>
      <div className="container">
        <h1>Umadle</h1>

        <section className="search-panel">
          <form
            className="controls search-form"
            id="guess-form"
            autoComplete="off"
          >
            <input
              id="guess"
              list="umaList"
              type="text"
              placeholder="Select an Uma"
            />
            <datalist id="umaList"></datalist>
            <button className="primary" id="guess-btn" type="submit">Guess</button>
          </form>
          <div id="legend" className="status">
            Legend: <b>✓</b> exact match, <span className="sym up">▲</span> your guess
            is lower (go up), <span className="sym down">▼</span> your guess is higher
            (go down)
          </div>
        </section>

        <div id="rows" className="umadle-grid"></div>
        <div id="footer" className="status"></div>
      </div>

      {/* WIN MODAL */}
      <div id="winModal" className="modal-backdrop" aria-hidden="true">
        <div
          className="modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="winTitle"
        >
          <h3 id="winTitle">You got it! 🎉</h3>
          <p id="winMsg" className="muted"></p>
          <div className="btn-row">
            <button id="winNewBtn" className="btn primary">New UMA</button>
            <button id="winCloseBtn" className="btn">Keep Board</button>
          </div>
        </div>
      </div>

      <Script src="/umadle.js" strategy="afterInteractive" type="module" />
    </>
  )
}
