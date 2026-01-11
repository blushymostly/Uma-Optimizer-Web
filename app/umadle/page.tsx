import type { Metadata } from 'next'
import Script from 'next/script'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Umaptimizer - Uma Musume Umadle',
  description: 'Daily Uma Musume guessing game where you narrow down the mystery Uma with stat hints.',
}

export default function UmadlePage() {
  return (
    <>
      <div className="container">
        <Card className="glass-card border-0 shadow-lg mb-6">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Umadle</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form
              className="flex flex-col sm:flex-row gap-3"
              id="guess-form"
              autoComplete="off"
            >
              <Input
                id="guess"
                list="umaList"
                type="text"
                placeholder="Select an Uma"
                className="flex-1"
              />
              <datalist id="umaList"></datalist>
              <Button id="guess-btn" type="submit" className="whitespace-nowrap">
                Guess
              </Button>
            </form>
            <CardDescription id="legend" className="text-center">
              Legend: <b>✓</b> exact match, <span className="sym up">▲</span> your guess
              is lower (go up), <span className="sym down">▼</span> your guess is higher
              (go down)
            </CardDescription>
          </CardContent>
        </Card>

        <div id="rows" className="umadle-grid"></div>
        <div id="footer" className="text-sm text-muted-foreground mt-4"></div>
      </div>

      {/* WIN MODAL - kept structure for JavaScript compatibility */}
      <div 
        id="winModal" 
        className="modal-backdrop"
        aria-hidden="true"
      >
        <div
          className="modal glass-card"
          role="dialog"
          aria-modal="true"
          aria-labelledby="winTitle"
        >
          <h3 id="winTitle" className="text-2xl font-bold mb-2">You got it! 🎉</h3>
          <p id="winMsg" className="text-muted-foreground mb-4"></p>
          <div className="flex gap-3 justify-end">
            <Button id="winNewBtn" variant="outline">Keep Board</Button>
            <Button id="winCloseBtn">New UMA</Button>
          </div>
        </div>
      </div>

      <Script src="/umadle.js" strategy="afterInteractive" type="module" />
    </>
  )
}
