"use client"

import { useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

export function HintsClient() {
  const modeSelectRef = useRef<HTMLSelectElement>(null)
  const fSSRRef = useRef<HTMLInputElement>(null)
  const fSRRef = useRef<HTMLInputElement>(null)
  const fRRef = useRef<HTMLInputElement>(null)

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
              <Select 
                defaultValue="AND"
                onValueChange={(value) => {
                  if (modeSelectRef.current) {
                    modeSelectRef.current.value = value
                    modeSelectRef.current.dispatchEvent(new Event('change', { bubbles: true }))
                  }
                }}
              >
                <SelectTrigger aria-label="Match mode" className="w-full sm:w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AND">Match ALL (AND)</SelectItem>
                  <SelectItem value="OR">Match ANY (OR)</SelectItem>
                </SelectContent>
              </Select>
              {/* Hidden native select for hints.js compatibility */}
              <select
                ref={modeSelectRef}
                id="modeSelect"
                style={{ display: 'none' }}
                defaultValue="AND"
              >
                <option value="AND">AND</option>
                <option value="OR">OR</option>
              </select>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Checkbox 
                  defaultChecked
                  onCheckedChange={(checked) => {
                    if (fSSRRef.current) {
                      fSSRRef.current.checked = checked === true
                      fSSRRef.current.dispatchEvent(new Event('change', { bubbles: true }))
                    }
                  }}
                />
                <Label htmlFor="fSSR" className="cursor-pointer">SSR</Label>
                <input
                  ref={fSSRRef}
                  type="checkbox"
                  id="fSSR"
                  style={{ display: 'none' }}
                  defaultChecked
                />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox 
                  defaultChecked
                  onCheckedChange={(checked) => {
                    if (fSRRef.current) {
                      fSRRef.current.checked = checked === true
                      fSRRef.current.dispatchEvent(new Event('change', { bubbles: true }))
                    }
                  }}
                />
                <Label htmlFor="fSR" className="cursor-pointer">SR</Label>
                <input
                  ref={fSRRef}
                  type="checkbox"
                  id="fSR"
                  style={{ display: 'none' }}
                  defaultChecked
                />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox 
                  defaultChecked
                  onCheckedChange={(checked) => {
                    if (fRRef.current) {
                      fRRef.current.checked = checked === true
                      fRRef.current.dispatchEvent(new Event('change', { bubbles: true }))
                    }
                  }}
                />
                <Label htmlFor="fR" className="cursor-pointer">R</Label>
                <input
                  ref={fRRef}
                  type="checkbox"
                  id="fR"
                  style={{ display: 'none' }}
                  defaultChecked
                />
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
    </>
  )
}
