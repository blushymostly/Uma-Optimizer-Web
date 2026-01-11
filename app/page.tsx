import type { Metadata } from 'next'
import Script from 'next/script'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardAction } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Umaptimizer - Uma Musume Skill Optimizer & Rating Calculator',
  description: 'Uma Musume skill optimizer and rating calculator to plan builds, manage skill points, and project final ratings.',
}

const GRADE_OPTIONS = ['S', 'A', 'B', 'C', 'D', 'E', 'F', 'G']

export default function OptimizerPage() {
  return (
    <>
      <main className="container space-y-8 mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Skill Optimizer</h1>

        {/* Budget + library status */}
        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4">
              <div className="flex-1 min-w-[220px] max-w-md">
                <Label htmlFor="budget" className="text-sm font-medium mb-2 block">
                  Skill Points Budget
                </Label>
                <Input id="budget" type="number" min="0" step="1" defaultValue="1200" />
              </div>
              <div className="flex items-center gap-2 h-10 w-[198px] pl-0 pr-0">
                <Checkbox id="fast-learner" />
                <Label htmlFor="fast-learner" className="cursor-pointer">
                  Fast Learner (-10% cost)
                </Label>
              </div>
              <div id="lib-status" className="text-sm text-muted-foreground text-right" aria-live="polite"></div>
            </div>
          </CardContent>
        </Card>

        {/* Race configuration + Ideal builder */}
        <Card className="glass-card race-config-container" aria-labelledby="raceConfigTitle">
          <CardContent className="pt-6 pb-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-12">
              {/* Race Config Pane */}
              <div className="space-y-6 min-w-0" style={{ width: '367px', paddingLeft: '0px', paddingRight: '0px' }}>
                <div>
                  <CardTitle id="raceConfigTitle" className="text-xl mb-3">Race Configuration</CardTitle>
                  <CardDescription className="text-sm">
                    Set your target affinities so the optimizer scores skills appropriately.
                  </CardDescription>
                </div>
                
                <div className="space-y-5">
                  <div>
                    <div className="text-sm font-medium mb-2">Track</div>
                    <div className="flex flex-wrap gap-3 items-end">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="cfg-turf" className="text-sm font-medium whitespace-nowrap">Turf</Label>
                        <Select defaultValue="A">
                          <SelectTrigger id="cfg-turf" className="w-14 h-8 min-w-14 max-w-14 flex-shrink-0">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {GRADE_OPTIONS.map(grade => (
                              <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center gap-2">
                        <Label htmlFor="cfg-dirt" className="text-sm font-medium whitespace-nowrap">Dirt</Label>
                        <Select defaultValue="G">
                          <SelectTrigger id="cfg-dirt" className="w-14 h-8 min-w-14 max-w-14 flex-shrink-0">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {GRADE_OPTIONS.map(grade => (
                              <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium mb-2">Distance</div>
                    <div className="grid grid-cols-2 gap-2.5 items-center" style={{ gridTemplateColumns: 'repeat(2, 1fr)', width: '100%' }}>
                      <div className="flex flex-row items-center gap-2 w-full">
                        <Label htmlFor="cfg-sprint" className="text-xs font-medium leading-tight whitespace-nowrap">Sprint</Label>
                        <Select defaultValue="D">
                          <SelectTrigger id="cfg-sprint" className="w-14 h-8 min-w-14 max-w-14 flex-shrink-0">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {GRADE_OPTIONS.map(grade => (
                              <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex flex-row items-center gap-2 w-full">
                        <Label htmlFor="cfg-mile" className="text-xs font-medium leading-tight whitespace-nowrap">Mile</Label>
                        <Select defaultValue="C">
                          <SelectTrigger id="cfg-mile" className="w-14 h-8 min-w-14 max-w-14 flex-shrink-0">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {GRADE_OPTIONS.map(grade => (
                              <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex flex-row items-center gap-2 w-full">
                        <Label htmlFor="cfg-medium" className="text-xs font-medium leading-tight whitespace-nowrap">Medium</Label>
                        <Select defaultValue="A">
                          <SelectTrigger id="cfg-medium" className="w-14 h-8 min-w-14 max-w-14 flex-shrink-0">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {GRADE_OPTIONS.map(grade => (
                              <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex flex-row items-center gap-2 w-full">
                        <Label htmlFor="cfg-long" className="text-xs font-medium leading-tight whitespace-nowrap">Long</Label>
                        <Select defaultValue="B">
                          <SelectTrigger id="cfg-long" className="w-14 h-8 min-w-14 max-w-14 flex-shrink-0">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {GRADE_OPTIONS.map(grade => (
                              <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium mb-2">Strategy</div>
                    <div className="grid grid-cols-2 gap-2.5 items-center" style={{ gridTemplateColumns: 'repeat(2, 1fr)', width: '100%' }}>
                      <div className="flex flex-row items-center gap-2 w-full">
                        <Label htmlFor="cfg-front" className="text-xs font-medium leading-tight whitespace-nowrap">Front</Label>
                        <Select defaultValue="A">
                          <SelectTrigger id="cfg-front" className="w-14 h-8 min-w-14 max-w-14 flex-shrink-0">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {GRADE_OPTIONS.map(grade => (
                              <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex flex-row items-center gap-2 w-full">
                        <Label htmlFor="cfg-pace" className="text-xs font-medium leading-tight whitespace-nowrap">Pace</Label>
                        <Select defaultValue="B">
                          <SelectTrigger id="cfg-pace" className="w-14 h-8 min-w-14 max-w-14 flex-shrink-0">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {GRADE_OPTIONS.map(grade => (
                              <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex flex-row items-center gap-2 w-full">
                        <Label htmlFor="cfg-late" className="text-xs font-medium leading-tight whitespace-nowrap">Late</Label>
                        <Select defaultValue="C">
                          <SelectTrigger id="cfg-late" className="w-14 h-8 min-w-14 max-w-14 flex-shrink-0">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {GRADE_OPTIONS.map(grade => (
                              <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex flex-row items-center gap-2 w-full">
                        <Label htmlFor="cfg-end" className="text-xs font-medium leading-tight whitespace-nowrap">End</Label>
                        <Select defaultValue="B">
                          <SelectTrigger id="cfg-end" className="w-14 h-8 min-w-14 max-w-14 flex-shrink-0">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {GRADE_OPTIONS.map(grade => (
                              <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ideal Builder Pane */}
              <div className="space-y-6 min-w-0" style={{ width: '278px', marginTop: '0px', marginBottom: '0px', marginLeft: '115px', marginRight: '115px' }}>
                <div>
                  <CardTitle id="autoBuilderTitle" className="text-xl mb-3">Ideal Skill Builder</CardTitle>
                  <CardDescription className="text-sm">
                    Pick the aptitudes you care about &mdash; matching rows will be highlighted.
                  </CardDescription>
                </div>
                
                <div className="space-y-5">
                  <div>
                    <div className="text-sm font-medium mb-3">Track</div>
                    <div className="flex flex-wrap gap-3">
                      <div className="flex items-center gap-2">
                        <Checkbox name="auto-target" id="auto-target-turf" value="turf" defaultChecked />
                        <Label htmlFor="auto-target-turf" className="cursor-pointer text-sm">Turf</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox name="auto-target" id="auto-target-dirt" value="dirt" defaultChecked />
                        <Label htmlFor="auto-target-dirt" className="cursor-pointer text-sm">Dirt</Label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium mb-3">Distance</div>
                    <div className="flex flex-wrap gap-3">
                      <div className="flex items-center gap-2">
                        <Checkbox name="auto-target" id="auto-target-sprint" value="sprint" defaultChecked />
                        <Label htmlFor="auto-target-sprint" className="cursor-pointer text-sm">Sprint</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox name="auto-target" id="auto-target-mile" value="mile" defaultChecked />
                        <Label htmlFor="auto-target-mile" className="cursor-pointer text-sm">Mile</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox name="auto-target" id="auto-target-medium" value="medium" defaultChecked />
                        <Label htmlFor="auto-target-medium" className="cursor-pointer text-sm">Medium</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox name="auto-target" id="auto-target-long" value="long" defaultChecked />
                        <Label htmlFor="auto-target-long" className="cursor-pointer text-sm">Long</Label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium mb-3">Strategy</div>
                    <div className="flex flex-wrap gap-3">
                      <div className="flex items-center gap-2">
                        <Checkbox name="auto-target" id="auto-target-front" value="front" defaultChecked />
                        <Label htmlFor="auto-target-front" className="cursor-pointer text-sm">Front</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox name="auto-target" id="auto-target-pace" value="pace" defaultChecked />
                        <Label htmlFor="auto-target-pace" className="cursor-pointer text-sm">Pace</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox name="auto-target" id="auto-target-late" value="late" defaultChecked />
                        <Label htmlFor="auto-target-late" className="cursor-pointer text-sm">Late</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox name="auto-target" id="auto-target-end" value="end" defaultChecked />
                        <Label htmlFor="auto-target-end" className="cursor-pointer text-sm">End</Label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-2">
                  <div className="flex items-center gap-2">
                    <Checkbox name="auto-target" id="auto-target-general" value="general" defaultChecked />
                    <Label htmlFor="auto-target-general" className="cursor-pointer text-sm">General</Label>
                  </div>
                  <Button id="auto-build-btn" type="button" className="whitespace-nowrap">Generate Build</Button>
                  <div id="auto-builder-status" className="text-sm text-muted-foreground flex-1" aria-live="polite"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rating calculator */}
        <Card className="glass-card" id="rating-card" aria-labelledby="ratingCalcTitle">
          <CardHeader>
            <div>
              <CardTitle id="ratingCalcTitle" className="text-xl mb-2">Rating Calculator</CardTitle>
              <CardDescription>
                Enter your Uma&apos;s final stats, star rarity, and unique skill level.
                The optimized skill score fills in automatically to project the final evaluation.
              </CardDescription>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0">
              <div className="pill rating-total-pill bg-primary/10 border border-primary/20 rounded-lg p-3 min-w-[140px]">
                <div className="text-xs font-medium text-muted-foreground mb-1">Projected Rating</div>
                <div id="rating-total" className="text-2xl font-bold">0</div>
                <div className="rating-progress mt-2" aria-live="polite">
                  <div className="rating-progress-label flex justify-between text-xs mb-1">
                    <span id="rating-next-label">Next: G+ at 300</span>
                    <span id="rating-next-needed">+0</span>
                  </div>
                  <div className="rating-progress-bar h-2 bg-secondary rounded-full overflow-hidden" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={0}>
                    <div id="rating-progress-fill" className="rating-progress-fill h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all"></div>
                  </div>
                </div>
              </div>
              <div className="rating-badge" id="rating-badge">
                <div id="rating-badge-sprite" className="rating-badge-sprite w-24 h-24" role="img" aria-label="Projected rank badge"></div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rating-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mb-6">
              <div className="space-y-2">
                <Label htmlFor="stat-speed" style={{ color: 'rgba(66, 180, 250, 1)' }}>Speed</Label>
                <Input id="stat-speed" type="number" min="0" max="1600" step="1" defaultValue="0" inputMode="numeric" style={{ color: 'rgba(66, 180, 250, 1)' }} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stat-stamina" style={{ color: 'rgba(255, 125, 110, 1)' }}>Stamina</Label>
                <Input id="stat-stamina" type="number" min="0" max="1600" step="1" defaultValue="0" inputMode="numeric" style={{ color: 'rgba(255, 125, 110, 1)' }} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stat-power" style={{ color: 'rgba(255, 164, 12, 1)' }}>Power</Label>
                <Input id="stat-power" type="number" min="0" max="1600" step="1" defaultValue="0" inputMode="numeric" style={{ color: 'rgba(255, 164, 12, 1)' }} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stat-guts" style={{ color: 'rgba(255, 109, 174, 1)' }}>Guts</Label>
                <Input id="stat-guts" type="number" min="0" max="1600" step="1" defaultValue="0" inputMode="numeric" style={{ color: 'rgba(255, 109, 174, 1)' }} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stat-wisdom" style={{ color: 'rgba(60, 224, 170, 1)' }}>Wisdom</Label>
                <Input id="stat-wisdom" type="number" min="0" max="1600" step="1" defaultValue="0" inputMode="numeric" style={{ color: 'rgba(60, 224, 170, 1)' }} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="star-level">Star Level</Label>
                <Select defaultValue="3">
                  <SelectTrigger id="star-level">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map(level => (
                      <SelectItem key={level} value={String(level)}>★{level}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="unique-level">Unique Skill Level</Label>
                <Select defaultValue="3">
                  <SelectTrigger id="unique-level">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6].map(level => (
                      <SelectItem key={level} value={String(level)}>Lv{level}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="rating-summary flex flex-wrap gap-5 justify-start">
              <Badge variant="secondary" className="px-4 py-2">
                <div className="text-xs font-medium mb-1">Stats Score</div>
                <div id="rating-stats-score" className="text-lg font-bold">0</div>
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <div className="text-xs font-medium mb-1">Skill Score</div>
                <div id="rating-skills-score" className="text-lg font-bold">0</div>
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <div className="text-xs font-medium mb-1">Unique Bonus</div>
                <div id="rating-unique-bonus" className="text-lg font-bold">0</div>
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <Card className="glass-card mb-4">
          <CardHeader>
            <CardTitle>Results</CardTitle>
          </CardHeader>
          <CardContent id="results" className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Badge variant="outline" className="p-3 justify-start">
                <span className="font-semibold mr-2">Best Score:</span>
                <span id="best-score">0</span>
              </Badge>
              <Badge variant="outline" className="p-3 justify-start">
                <span className="font-semibold mr-2">Used Points:</span>
                <span id="used-points">0</span>
              </Badge>
              <Badge variant="outline" className="p-3 justify-start">
                <span className="font-semibold mr-2">Total Points:</span>
                <span id="total-points">0</span>
              </Badge>
              <Badge variant="outline" className="p-3 justify-start">
                <span className="font-semibold mr-2">Remaining:</span>
                <span id="remaining-points">0</span>
              </Badge>
            </div>
            <div className="results-list" id="selected-list"></div>
          </CardContent>
        </Card>

        {/* Rows builder */}
        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6" role="group" aria-label="Skill rows">
              <span className="text-sm text-muted-foreground">Tip: just enter the skill name and cost - its type auto-detects</span>
              <div className="flex flex-wrap gap-3">
                <Button id="import-screenshot" variant="secondary" type="button">Import from Screenshot</Button>
                <input type="file" id="screenshot-file-input" accept="image/*" className="hidden" />
                <Button id="copy-build" variant="secondary" type="button">Copy Build</Button>
                <Button id="load-build" variant="secondary" type="button">Load Build</Button>
                <Button id="clear-all" variant="destructive" type="button">Clear All</Button>
              </div>
            </div>
            <div id="ocr-import-status" className="text-sm text-muted-foreground mb-4" aria-live="polite"></div>
            <div id="rows" className="rows space-y-2"></div>
          </CardContent>
        </Card>
      </main>

      <div id="rating-float" className="rating-float fixed top-20 right-5 z-70 opacity-0 pointer-events-none transition-all" aria-live="polite">
        <div className="rating-float-badge w-9 h-9 rounded-full bg-secondary flex items-center justify-center" aria-hidden="true">
          <div id="rating-float-badge-sprite" className="rating-float-badge-sprite w-8 h-8"></div>
        </div>
        <div className="rating-float-meta">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Projected</div>
          <div id="rating-float-total" className="text-base font-bold">0</div>
        </div>
      </div>

      <Script src="https://cdn.jsdelivr.net/npm/tesseract.js@4/dist/tesseract.min.js" strategy="beforeInteractive" />
      <Script src="/skill-ocr.js" strategy="afterInteractive" />
      <Script src="/optimizer.js" strategy="afterInteractive" />
    </>
  )
}
