import type { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'UmaTools - Uma Musume Skill Optimizer & Rating Calculator',
  description: 'Uma Musume skill optimizer and rating calculator to plan builds, manage skill points, and project final ratings.',
}

export default function OptimizerPage() {
  return (
    <>
      <main className="container">
        <h1>Skill Optimizer</h1>

        {/* Budget + library status */}
        <section className="card card-elevated">
          <div className="toolbar" style={{ alignItems: 'flex-end' }}>
            <label className="labelTitle" style={{ minWidth: '220px' }}>
              Skill Points Budget
              <input id="budget" type="number" min="0" step="1" defaultValue="1200" />
            </label>
            <label className="target-check" style={{ marginLeft: '16px' }}>
              <input id="fast-learner" type="checkbox" />
              Fast Learner (-10% cost)
            </label>
            <div className="spacer"></div>
            <div id="lib-status" className="status" aria-live="polite"></div>
          </div>
        </section>

        {/* Race configuration + Ideal builder */}
        <section className="card card-elevated race-config-container" aria-labelledby="raceConfigTitle">
          <div className="race-card-grid">
            <div className="race-config-pane">
              <div className="race-card-header">
                <h2 id="raceConfigTitle">Race Configuration</h2>
                <p className="muted">Set your target affinities so the optimizer scores skills appropriately.</p>
              </div>
              <div className="opt-grid">
                <div className="kv-row">
                  <div className="k">Track</div>
                  <div className="v row">
                    <label> Turf
                      <select id="cfg-turf" defaultValue="A">
                        <option value="S">S</option><option value="A">A</option><option value="B">B</option>
                        <option value="C">C</option><option value="D">D</option><option value="E">E</option>
                        <option value="F">F</option><option value="G">G</option>
                      </select>
                    </label>
                    <label> Dirt
                      <select id="cfg-dirt" defaultValue="G">
                        <option value="S">S</option><option value="A">A</option><option value="B">B</option>
                        <option value="C">C</option><option value="D">D</option><option value="E">E</option>
                        <option value="F">F</option><option value="G">G</option>
                      </select>
                    </label>
                  </div>
                </div>

                <div className="kv-row">
                  <div className="k">Distance</div>
                  <div className="v row">
                    <label> Sprint
                      <select id="cfg-sprint" defaultValue="D">
                        <option value="S">S</option><option value="A">A</option><option value="B">B</option>
                        <option value="C">C</option><option value="D">D</option><option value="E">E</option>
                        <option value="F">F</option><option value="G">G</option>
                      </select>
                    </label>
                    <label> Mile
                      <select id="cfg-mile" defaultValue="C">
                        <option value="S">S</option><option value="A">A</option><option value="B">B</option>
                        <option value="C">C</option><option value="D">D</option><option value="E">E</option>
                        <option value="F">F</option><option value="G">G</option>
                      </select>
                    </label>
                    <label> Medium
                      <select id="cfg-medium" defaultValue="A">
                        <option value="S">S</option><option value="A">A</option><option value="B">B</option>
                        <option value="C">C</option><option value="D">D</option><option value="E">E</option>
                        <option value="F">F</option><option value="G">G</option>
                      </select>
                    </label>
                    <label> Long
                      <select id="cfg-long" defaultValue="B">
                        <option value="S">S</option><option value="A">A</option><option value="B">B</option>
                        <option value="C">C</option><option value="D">D</option><option value="E">E</option>
                        <option value="F">F</option><option value="G">G</option>
                      </select>
                    </label>
                  </div>
                </div>

                <div className="kv-row">
                  <div className="k">Strategy</div>
                  <div className="v row">
                    <label> Front
                      <select id="cfg-front" defaultValue="A">
                        <option value="S">S</option><option value="A">A</option><option value="B">B</option>
                        <option value="C">C</option><option value="D">D</option><option value="E">E</option>
                        <option value="F">F</option><option value="G">G</option>
                      </select>
                    </label>
                    <label> Pace
                      <select id="cfg-pace" defaultValue="B">
                        <option value="S">S</option><option value="A">A</option><option value="B">B</option>
                        <option value="C">C</option><option value="D">D</option><option value="E">E</option>
                        <option value="F">F</option><option value="G">G</option>
                      </select>
                    </label>
                    <label> Late
                      <select id="cfg-late" defaultValue="C">
                        <option value="S">S</option><option value="A">A</option><option value="B">B</option>
                        <option value="C">C</option><option value="D">D</option><option value="E">E</option>
                        <option value="F">F</option><option value="G">G</option>
                      </select>
                    </label>
                    <label> End
                      <select id="cfg-end" defaultValue="B">
                        <option value="S">S</option><option value="A">A</option><option value="B">B</option>
                        <option value="C">C</option><option value="D">D</option><option value="E">E</option>
                        <option value="F">F</option><option value="G">G</option>
                      </select>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="ideal-builder-pane">
              <div className="ideal-header">
                <h3 id="autoBuilderTitle">Ideal Skill Builder</h3>
                <p className="muted">Pick the aptitudes you care about &mdash; matching rows will be highlighted.</p>
              </div>
              <div className="ideal-target-groups">
                <div>
                  <div className="target-group-title">Track</div>
                  <div className="ideal-targets auto-targets">
                    <label className="target-check"><input type="checkbox" name="auto-target" value="turf" defaultChecked /> Turf</label>
                    <label className="target-check"><input type="checkbox" name="auto-target" value="dirt" defaultChecked /> Dirt</label>
                  </div>
                </div>
                <div>
                  <div className="target-group-title">Distance</div>
                  <div className="ideal-targets auto-targets">
                    <label className="target-check"><input type="checkbox" name="auto-target" value="sprint" defaultChecked /> Sprint</label>
                    <label className="target-check"><input type="checkbox" name="auto-target" value="mile" defaultChecked /> Mile</label>
                    <label className="target-check"><input type="checkbox" name="auto-target" value="medium" defaultChecked /> Medium</label>
                    <label className="target-check"><input type="checkbox" name="auto-target" value="long" defaultChecked /> Long</label>
                  </div>
                </div>
                <div>
                  <div className="target-group-title">Strategy</div>
                  <div className="ideal-targets auto-targets">
                    <label className="target-check"><input type="checkbox" name="auto-target" value="front" defaultChecked /> Front</label>
                    <label className="target-check"><input type="checkbox" name="auto-target" value="pace" defaultChecked /> Pace</label>
                    <label className="target-check"><input type="checkbox" name="auto-target" value="late" defaultChecked /> Late</label>
                    <label className="target-check"><input type="checkbox" name="auto-target" value="end" defaultChecked /> End</label>
                  </div>
                </div>
              </div>
              <div className="ideal-actions">
                <label className="target-check general-check"><input type="checkbox" name="auto-target" value="general" defaultChecked /> General</label>
                <button id="auto-build-btn" className="btn" type="button">Generate Build</button>
                <div id="auto-builder-status" className="status muted" aria-live="polite"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Rating calculator */}
        <section className="card card-elevated" id="rating-card" aria-labelledby="ratingCalcTitle">
          <div className="toolbar rating-card-toolbar">
            <div className="rating-card-header">
              <h2 id="ratingCalcTitle">Rating Calculator</h2>
              <p className="muted">
                Enter your Uma&apos;s final stats, star rarity, and unique skill level.
                The optimized skill score fills in automatically to project the final evaluation.
              </p>
            </div>
            <div className="spacer"></div>
            <div className="pill rating-total-pill">
              <div className="label">Projected Rating</div>
              <div id="rating-total" className="value">0</div>
              <div className="rating-progress" aria-live="polite">
                <div className="rating-progress-label">
                  <span id="rating-next-label">Next: G+ at 300</span>
                  <span id="rating-next-needed">+0</span>
                </div>
                <div className="rating-progress-bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={0}>
                  <div id="rating-progress-fill" className="rating-progress-fill"></div>
                </div>
              </div>
            </div>
            <div className="rating-badge" id="rating-badge">
              <div id="rating-badge-sprite" className="rating-badge-sprite" role="img"
                   aria-label="Projected rank badge"></div>
            </div>
          </div>
          <div className="rating-grid">
            <label>Speed
              <input id="stat-speed" type="number" min="0" max="1600" step="1" defaultValue="0" inputMode="numeric" />
            </label>
            <label>Stamina
              <input id="stat-stamina" type="number" min="0" max="1600" step="1" defaultValue="0" inputMode="numeric" />
            </label>
            <label>Power
              <input id="stat-power" type="number" min="0" max="1600" step="1" defaultValue="0" inputMode="numeric" />
            </label>
            <label>Guts
              <input id="stat-guts" type="number" min="0" max="1600" step="1" defaultValue="0" inputMode="numeric" />
            </label>
            <label>Wisdom
              <input id="stat-wisdom" type="number" min="0" max="1600" step="1" defaultValue="0" inputMode="numeric" />
            </label>
            <label>Star Level
              <select id="star-level" defaultValue="3">
                <option value="1">★1</option>
                <option value="2">★2</option>
                <option value="3">★3</option>
                <option value="4">★4</option>
                <option value="5">★5</option>
              </select>
            </label>
            <label>Unique Skill Level
              <select id="unique-level" defaultValue="3">
                <option value="1">Lv1</option>
                <option value="2">Lv2</option>
                <option value="3">Lv3</option>
                <option value="4">Lv4</option>
                <option value="5">Lv5</option>
                <option value="6">Lv6</option>
              </select>
            </label>
          </div>
          <div className="rating-summary">
            <div className="pill">
              <div className="label">Stats Score</div>
              <div id="rating-stats-score" className="value">0</div>
            </div>
            <div className="pill">
              <div className="label">Skill Score</div>
              <div id="rating-skills-score" className="value">0</div>
            </div>
            <div className="pill">
              <div className="label">Unique Bonus</div>
              <div id="rating-unique-bonus" className="value">0</div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="card card-elevated" style={{ marginBottom: '16px' }}>
          <h3 style={{ margin: '.2rem 0 .5rem 0' }}>Results</h3>
          <div id="results" className="results">
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
              <div className="pill"><b>Best Score:</b> <span id="best-score">0</span></div>
              <div className="pill"><b>Used Points:</b> <span id="used-points">0</span></div>
              <div className="pill"><b>Total Points:</b> <span id="total-points">0</span></div>
              <div className="pill"><b>Remaining:</b> <span id="remaining-points">0</span></div>
            </div>
            <div className="results-list" id="selected-list" style={{ marginTop: '.75rem' }}></div>
          </div>
        </section>

        {/* Rows builder (auto-add; live optimize) */}
        <section className="card card-elevated">
          <div className="toolbar" role="group" aria-label="Skill rows">
            <span className="muted">Tip: just enter the skill name and cost - its type auto-detects</span>
            <div className="spacer"></div>
            <button id="import-screenshot" className="btn btn-secondary" type="button">Import from Screenshot</button>
            <input type="file" id="screenshot-file-input" accept="image/*" style={{ display: 'none' }} />
            <button id="copy-build" className="btn btn-secondary" type="button">Copy Build</button>
            <button id="load-build" className="btn btn-secondary" type="button">Load Build</button>
            <button id="clear-all" className="btn" type="button">Clear All</button>
          </div>
          <div id="ocr-import-status" className="status muted" style={{ marginTop: '8px' }} aria-live="polite"></div>
          <div id="rows" className="rows"></div>
        </section>
      </main>

      <div id="rating-float" className="rating-float" aria-live="polite">
        <div className="rating-float-badge" aria-hidden="true">
          <div id="rating-float-badge-sprite" className="rating-float-badge-sprite"></div>
        </div>
        <div className="rating-float-meta">
          <div className="label">Projected</div>
          <div id="rating-float-total" className="value">0</div>
        </div>
      </div>

      <Script src="https://cdn.jsdelivr.net/npm/tesseract.js@4/dist/tesseract.min.js" strategy="beforeInteractive" />
      <Script src="/skill-ocr.js" strategy="afterInteractive" />
      <Script src="/optimizer.js" strategy="afterInteractive" />
    </>
  )
}
