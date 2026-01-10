import type { Metadata } from 'next'
import Script from 'next/script'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

export const metadata: Metadata = {
  title: 'UmaTools - Uma Musume Support Hint Finder',
  description: 'Find Uma Musume support card hints by skill keywords. Filter by rarity and match modes to locate supports fast.',
}

export default function HomePage() {
  // Display hints page content as home page
  return (
    <>
      <div className="container">
        <Card className="glass-card border-0 shadow-lg mb-6">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Uma Support Hint Finder</CardTitle>
            <CardDescription className="text-center">
              Type a skill hint (e.g., <em>Medium Corners</em>), press Enter to add it.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3" id="guess-form">
              <Input
                id="hintInput"
                list="hintList"
                type="text"
                placeholder="Add hint (e.g., Medium Corners ○)"
                className="flex-1"
              />
              <Button id="addBtn" className="whitespace-nowrap">
                Add
              </Button>
              <Select id="modeSelect" defaultValue="AND">
                <SelectTrigger aria-label="Match mode" className="w-full sm:w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AND">Match ALL (AND)</SelectItem>
                  <SelectItem value="OR">Match ANY (OR)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-wrap items-center gap-4">
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
              <Button id="clearBtn" variant="outline">
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        <datalist id="hintList"></datalist>

        <div className="chips flex flex-wrap gap-2 mb-4" id="chips"></div>
        <div className="text-sm text-muted-foreground mb-4" id="counts"></div>

        <div id="results" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"></div>
      </div>
      <Script src="/hints.js" strategy="afterInteractive" />
    </>
  )
}
