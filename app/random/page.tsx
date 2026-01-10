import type { Metadata } from 'next'
import Script from 'next/script'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

export const metadata: Metadata = {
  title: 'UmaTools - Uma Musume Randomizer',
  description: 'Randomize Uma Musume support decks and pick a random Uma for training challenges.',
}

export default function RandomPage() {
  return (
    <main className="container space-y-6">
      <h1 className="text-3xl font-bold text-center mb-6">Randomizer</h1>

      {/* Support Deck Randomizer */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Support Deck (5 cards)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-4" role="group" aria-label="Support filters">
            <div className="flex items-center gap-2">
              <Checkbox id="fSSR" defaultChecked />
              <Label htmlFor="fSSR" className="cursor-pointer">SSR</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="fSR" defaultChecked />
              <Label htmlFor="fSR" className="cursor-pointer">SR</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="fR" defaultChecked />
              <Label htmlFor="fR" className="cursor-pointer">R</Label>
            </div>

            <div className="flex-1" />

            <div className="flex items-center gap-2">
              <Checkbox id="speed2x" />
              <Label htmlFor="speed2x" className="cursor-pointer">2× speed</Label>
            </div>
            <Button id="rollBtn" type="button">
              Roll 5
            </Button>
            <Button id="clearExBtn" variant="outline" type="button">
              Clear Exclusions
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3" role="group" aria-label="Exclude cards">
            <Input
              list="supportList"
              id="excludeInput"
              placeholder="Exclude a support (choose from list)"
              className="flex-1"
            />
            <datalist id="supportList"></datalist>
            <Button id="addExBtn" variant="outline" type="button">
              Add to Exclusions
            </Button>
          </div>

          <div id="excludeChips" className="flex flex-wrap gap-2" aria-live="polite"></div>
        </CardContent>
      </Card>

      <div id="deckResults" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4" aria-live="polite"></div>

      {/* Uma Randomizer */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Random Uma</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Checkbox id="speed2xUma" />
              <Label htmlFor="speed2xUma" className="cursor-pointer">2× speed</Label>
            </div>
            <Button id="pickUmaBtn" type="button">
              Pick Random Uma
            </Button>
          </div>
        </CardContent>
      </Card>

      <div id="umaResult" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" aria-live="polite"></div>

      <Script src="/random.js" strategy="afterInteractive" />
    </main>
  )
}
