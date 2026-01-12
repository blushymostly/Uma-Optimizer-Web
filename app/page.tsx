'use client'

import Script from 'next/script'
import { useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardAction } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'

const GRADE_OPTIONS = ['S', 'A', 'B', 'C', 'D', 'E', 'F', 'G']

export default function OptimizerPage() {
  // Refs for hidden select elements (for optimizer.js compatibility)
  const cfgRefs = {
    turf: useRef<HTMLSelectElement>(null),
    dirt: useRef<HTMLSelectElement>(null),
    sprint: useRef<HTMLSelectElement>(null),
    mile: useRef<HTMLSelectElement>(null),
    medium: useRef<HTMLSelectElement>(null),
    long: useRef<HTMLSelectElement>(null),
    front: useRef<HTMLSelectElement>(null),
    pace: useRef<HTMLSelectElement>(null),
    late: useRef<HTMLSelectElement>(null),
    end: useRef<HTMLSelectElement>(null),
  }
  const starLevelRef = useRef<HTMLSelectElement>(null)
  const uniqueLevelRef = useRef<HTMLSelectElement>(null)

  const syncSelectValue = (key: string, value: string) => {
    const ref = cfgRefs[key as keyof typeof cfgRefs]
    if (ref?.current) {
      ref.current.value = value
      ref.current.dispatchEvent(new Event('change', { bubbles: true }))
    }
  }

  const syncStarLevel = (value: string) => {
    if (starLevelRef.current) {
      starLevelRef.current.value = value
      starLevelRef.current.dispatchEvent(new Event('change', { bubbles: true }))
    }
  }

  const syncUniqueLevel = (value: string) => {
    if (uniqueLevelRef.current) {
      uniqueLevelRef.current.value = value
      uniqueLevelRef.current.dispatchEvent(new Event('change', { bubbles: true }))
    }
  }

  // Initialize hidden selects on mount and sync with optimizer.js
  useEffect(() => {
    // Wait for optimizer.js to initialize, then trigger change events
    const initTimer = setTimeout(() => {
      Object.values(cfgRefs).forEach(ref => {
        if (ref.current) {
          ref.current.dispatchEvent(new Event('change', { bubbles: true }))
        }
      })
      if (starLevelRef.current) {
        starLevelRef.current.dispatchEvent(new Event('change', { bubbles: true }))
      }
      if (uniqueLevelRef.current) {
        uniqueLevelRef.current.dispatchEvent(new Event('change', { bubbles: true }))
      }
    }, 500)

    return () => clearTimeout(initTimer)
  }, [])

  return (
    <>
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 space-y-6 sm:space-y-8 overflow-x-hidden">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 break-words">Skill Optimizer</h1>

        {/* Race Configuration */}
        <Card className="glass-card race-config-container overflow-hidden" aria-labelledby="raceConfigTitle">
              <CardContent className="pt-6 pb-6 min-w-0">
                <div className="space-y-5 sm:space-y-6 min-w-0">
                  <div className="min-w-0">
                    <CardTitle id="raceConfigTitle" className="text-xl mb-3 break-words">Race Configuration</CardTitle>
                    <CardDescription className="text-sm break-words">
                      Set your target affinities so the optimizer scores skills appropriately.
                    </CardDescription>
                  </div>
                  
                  <div className="space-y-4 sm:space-y-5">
                    <div className="min-w-0">
                      <div className="text-sm font-medium mb-2">Track</div>
                      <div className="flex flex-wrap gap-3 sm:grid sm:grid-cols-2 sm:gap-2 max-w-2xl">
                        <div className="flex items-center gap-2 min-h-[44px] min-w-0">
                          <Label htmlFor="cfg-turf" className="text-sm font-medium whitespace-nowrap flex-shrink-0">Turf</Label>
                          <Select defaultValue="A" onValueChange={(value) => syncSelectValue('turf', value)}>
                            <SelectTrigger className="h-10 w-16 sm:w-14 min-w-16 sm:min-w-14 flex-shrink-0">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {GRADE_OPTIONS.map(grade => (
                                <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <select ref={cfgRefs.turf} id="cfg-turf" style={{ display: 'none' }} defaultValue="A">
                            {GRADE_OPTIONS.map(grade => (
                              <option key={grade} value={grade}>{grade}</option>
                            ))}
                          </select>
                        </div>
                        <div className="flex items-center gap-2 min-h-[44px] min-w-0">
                          <Label htmlFor="cfg-dirt" className="text-sm font-medium whitespace-nowrap flex-shrink-0">Dirt</Label>
                          <Select defaultValue="G" onValueChange={(value) => syncSelectValue('dirt', value)}>
                            <SelectTrigger className="h-10 w-16 sm:w-14 min-w-16 sm:min-w-14 flex-shrink-0">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {GRADE_OPTIONS.map(grade => (
                                <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <select ref={cfgRefs.dirt} id="cfg-dirt" style={{ display: 'none' }} defaultValue="G">
                            {GRADE_OPTIONS.map(grade => (
                              <option key={grade} value={grade}>{grade}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="min-w-0">
                      <div className="text-sm font-medium mb-2">Distance</div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-2 max-w-2xl">
                        <div className="flex items-center gap-2 min-h-[44px] min-w-0">
                          <Label htmlFor="cfg-sprint" className="text-sm font-medium whitespace-nowrap flex-shrink-0">Sprint</Label>
                          <Select defaultValue="D" onValueChange={(value) => syncSelectValue('sprint', value)}>
                            <SelectTrigger className="h-10 w-16 sm:w-14 min-w-16 sm:min-w-14 flex-shrink-0">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {GRADE_OPTIONS.map(grade => (
                                <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <select ref={cfgRefs.sprint} id="cfg-sprint" style={{ display: 'none' }} defaultValue="D">
                            {GRADE_OPTIONS.map(grade => (
                              <option key={grade} value={grade}>{grade}</option>
                            ))}
                          </select>
                        </div>
                        <div className="flex items-center gap-2 min-h-[44px] min-w-0">
                          <Label htmlFor="cfg-mile" className="text-sm font-medium whitespace-nowrap flex-shrink-0">Mile</Label>
                          <Select defaultValue="C" onValueChange={(value) => syncSelectValue('mile', value)}>
                            <SelectTrigger className="h-10 w-16 sm:w-14 min-w-16 sm:min-w-14 flex-shrink-0">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {GRADE_OPTIONS.map(grade => (
                                <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <select ref={cfgRefs.mile} id="cfg-mile" style={{ display: 'none' }} defaultValue="C">
                            {GRADE_OPTIONS.map(grade => (
                              <option key={grade} value={grade}>{grade}</option>
                            ))}
                          </select>
                        </div>
                        <div className="flex items-center gap-2 min-h-[44px] min-w-0">
                          <Label htmlFor="cfg-medium" className="text-sm font-medium whitespace-nowrap flex-shrink-0">Medium</Label>
                          <Select defaultValue="A" onValueChange={(value) => syncSelectValue('medium', value)}>
                            <SelectTrigger className="h-10 w-16 sm:w-14 min-w-16 sm:min-w-14 flex-shrink-0">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {GRADE_OPTIONS.map(grade => (
                                <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <select ref={cfgRefs.medium} id="cfg-medium" style={{ display: 'none' }} defaultValue="A">
                            {GRADE_OPTIONS.map(grade => (
                              <option key={grade} value={grade}>{grade}</option>
                            ))}
                          </select>
                        </div>
                        <div className="flex items-center gap-2 min-h-[44px] min-w-0">
                          <Label htmlFor="cfg-long" className="text-sm font-medium whitespace-nowrap flex-shrink-0">Long</Label>
                          <Select defaultValue="B" onValueChange={(value) => syncSelectValue('long', value)}>
                            <SelectTrigger className="h-10 w-16 sm:w-14 min-w-16 sm:min-w-14 flex-shrink-0">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {GRADE_OPTIONS.map(grade => (
                                <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <select ref={cfgRefs.long} id="cfg-long" style={{ display: 'none' }} defaultValue="B">
                            {GRADE_OPTIONS.map(grade => (
                              <option key={grade} value={grade}>{grade}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="min-w-0">
                      <div className="text-sm font-medium mb-2">Strategy</div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-2 max-w-2xl">
                        <div className="flex items-center gap-2 min-h-[44px] min-w-0">
                          <Label htmlFor="cfg-front" className="text-sm font-medium whitespace-nowrap flex-shrink-0">Front</Label>
                          <Select defaultValue="A" onValueChange={(value) => syncSelectValue('front', value)}>
                            <SelectTrigger className="h-10 w-16 sm:w-14 min-w-16 sm:min-w-14 flex-shrink-0">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {GRADE_OPTIONS.map(grade => (
                                <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <select ref={cfgRefs.front} id="cfg-front" style={{ display: 'none' }} defaultValue="A">
                            {GRADE_OPTIONS.map(grade => (
                              <option key={grade} value={grade}>{grade}</option>
                            ))}
                          </select>
                        </div>
                        <div className="flex items-center gap-2 min-h-[44px] min-w-0">
                          <Label htmlFor="cfg-pace" className="text-sm font-medium whitespace-nowrap flex-shrink-0">Pace</Label>
                          <Select defaultValue="B" onValueChange={(value) => syncSelectValue('pace', value)}>
                            <SelectTrigger className="h-10 w-16 sm:w-14 min-w-16 sm:min-w-14 flex-shrink-0">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {GRADE_OPTIONS.map(grade => (
                                <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <select ref={cfgRefs.pace} id="cfg-pace" style={{ display: 'none' }} defaultValue="B">
                            {GRADE_OPTIONS.map(grade => (
                              <option key={grade} value={grade}>{grade}</option>
                            ))}
                          </select>
                        </div>
                        <div className="flex items-center gap-2 min-h-[44px] min-w-0">
                          <Label htmlFor="cfg-late" className="text-sm font-medium whitespace-nowrap flex-shrink-0">Late</Label>
                          <Select defaultValue="C" onValueChange={(value) => syncSelectValue('late', value)}>
                            <SelectTrigger className="h-10 w-16 sm:w-14 min-w-16 sm:min-w-14 flex-shrink-0">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {GRADE_OPTIONS.map(grade => (
                                <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <select ref={cfgRefs.late} id="cfg-late" style={{ display: 'none' }} defaultValue="C">
                            {GRADE_OPTIONS.map(grade => (
                              <option key={grade} value={grade}>{grade}</option>
                            ))}
                          </select>
                        </div>
                        <div className="flex items-center gap-2 min-h-[44px] min-w-0">
                          <Label htmlFor="cfg-end" className="text-sm font-medium whitespace-nowrap flex-shrink-0">End</Label>
                          <Select defaultValue="B" onValueChange={(value) => syncSelectValue('end', value)}>
                            <SelectTrigger className="h-10 w-16 sm:w-14 min-w-16 sm:min-w-14 flex-shrink-0">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {GRADE_OPTIONS.map(grade => (
                                <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <select ref={cfgRefs.end} id="cfg-end" style={{ display: 'none' }} defaultValue="B">
                            {GRADE_OPTIONS.map(grade => (
                              <option key={grade} value={grade}>{grade}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

        {/* Rating Calculator */}
          <Card className="glass-card overflow-hidden" id="rating-card" aria-labelledby="ratingCalcTitle">
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full min-w-0">
              <div className="flex-1 min-w-0">
                <CardTitle id="ratingCalcTitle" className="text-xl mb-2 break-words">Rating Calculator</CardTitle>
                <CardDescription className="break-words">
                  Enter your Uma&apos;s final stats, star rarity, and unique skill level.
                  The optimized skill score fills in automatically to project the final evaluation.
                </CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 flex-shrink-0 w-full sm:w-auto">
                <div className="pill rating-total-pill bg-primary/10 border border-primary/20 rounded-lg p-3 w-full sm:w-auto sm:min-w-[140px]">
                  <div className="text-xs font-medium text-muted-foreground mb-1">Projected Rating</div>
                  <div id="rating-total" className="text-2xl font-bold break-words">0</div>
                  <div className="rating-progress mt-2" aria-live="polite">
                    <div className="rating-progress-label flex justify-between text-xs mb-1">
                      <span id="rating-next-label" className="break-words">Next: G+ at 300</span>
                      <span id="rating-next-needed" className="flex-shrink-0">+0</span>
                    </div>
                    <div className="rating-progress-bar h-2 bg-secondary rounded-full overflow-hidden" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={0}>
                      <div id="rating-progress-fill" className="rating-progress-fill h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all"></div>
                    </div>
                  </div>
                </div>
                <div className="rating-badge flex-shrink-0 self-center sm:self-auto" id="rating-badge">
                  <div id="rating-badge-sprite" className="rating-badge-sprite w-16 h-16 sm:w-24 sm:h-24" role="img" aria-label="Projected rank badge"></div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="min-w-0">
            <div className="rating-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 mb-6">
              <div className="space-y-2 min-w-0">
                <Label htmlFor="stat-speed" style={{ color: 'rgba(66, 180, 250, 1)' }} className="break-words">Speed</Label>
                <Input id="stat-speed" type="number" min="0" max="1600" step="1" defaultValue="0" inputMode="numeric" style={{ color: 'rgba(66, 180, 250, 1)' }} className="w-full" />
              </div>
              <div className="space-y-2 min-w-0">
                <Label htmlFor="stat-stamina" style={{ color: 'rgba(255, 125, 110, 1)' }} className="break-words">Stamina</Label>
                <Input id="stat-stamina" type="number" min="0" max="1600" step="1" defaultValue="0" inputMode="numeric" style={{ color: 'rgba(255, 125, 110, 1)' }} className="w-full" />
              </div>
              <div className="space-y-2 min-w-0">
                <Label htmlFor="stat-power" style={{ color: 'rgba(255, 164, 12, 1)' }} className="break-words">Power</Label>
                <Input id="stat-power" type="number" min="0" max="1600" step="1" defaultValue="0" inputMode="numeric" style={{ color: 'rgba(255, 164, 12, 1)' }} className="w-full" />
              </div>
              <div className="space-y-2 min-w-0">
                <Label htmlFor="stat-guts" style={{ color: 'rgba(255, 109, 174, 1)' }} className="break-words">Guts</Label>
                <Input id="stat-guts" type="number" min="0" max="1600" step="1" defaultValue="0" inputMode="numeric" style={{ color: 'rgba(255, 109, 174, 1)' }} className="w-full" />
              </div>
              <div className="space-y-2 min-w-0">
                <Label htmlFor="stat-wisdom" style={{ color: 'rgba(60, 224, 170, 1)' }} className="break-words">Wisdom</Label>
                <Input id="stat-wisdom" type="number" min="0" max="1600" step="1" defaultValue="0" inputMode="numeric" style={{ color: 'rgba(60, 224, 170, 1)' }} className="w-full" />
              </div>
              <div className="space-y-2 min-w-0">
                <Label htmlFor="star-level" className="break-words">Star Level</Label>
                <Select defaultValue="3" onValueChange={syncStarLevel}>
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map(level => (
                      <SelectItem key={level} value={String(level)}>★{level}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <select ref={starLevelRef} id="star-level" style={{ display: 'none' }} defaultValue="3">
                  {[1, 2, 3, 4, 5].map(level => (
                    <option key={level} value={String(level)}>{level}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2 min-w-0">
                <Label htmlFor="unique-level" className="break-words">Unique Skill Level</Label>
                <Select defaultValue="3" onValueChange={syncUniqueLevel}>
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6].map(level => (
                      <SelectItem key={level} value={String(level)}>Lv{level}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <select ref={uniqueLevelRef} id="unique-level" style={{ display: 'none' }} defaultValue="3">
                  {[1, 2, 3, 4, 5, 6].map(level => (
                    <option key={level} value={String(level)}>{level}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="rating-summary flex flex-wrap gap-4 sm:gap-5 justify-start min-w-0">
              <Badge variant="secondary" className="px-4 py-2 min-w-0 flex-1 sm:flex-initial">
                <div className="text-xs font-medium mb-1 break-words">Stats Score</div>
                <div id="rating-stats-score" className="text-lg font-bold break-words">0</div>
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 min-w-0 flex-1 sm:flex-initial">
                <div className="text-xs font-medium mb-1 break-words">Skill Score</div>
                <div id="rating-skills-score" className="text-lg font-bold break-words">0</div>
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 min-w-0 flex-1 sm:flex-initial">
                <div className="text-xs font-medium mb-1 break-words">Unique Bonus</div>
                <div id="rating-unique-bonus" className="text-lg font-bold break-words">0</div>
              </Badge>
            </div>
          </CardContent>
          </Card>

        {/* Ideal Skill Builder */}
        <Card className="glass-card ideal-skill-builder-container overflow-hidden" aria-labelledby="autoBuilderTitle">
          <CardContent className="pt-6 pb-6 min-w-0">
            <div className="space-y-5 sm:space-y-6">
              <div className="min-w-0">
                <CardTitle id="autoBuilderTitle" className="text-xl mb-3 break-words">Ideal Skill Builder</CardTitle>
                <CardDescription className="text-sm break-words">
                  Pick the aptitudes you care about &mdash; matching rows will be highlighted.
                </CardDescription>
              </div>
              
              <div className="space-y-4 sm:space-y-5 min-w-0">
                <div className="min-w-0">
                  <div className="text-sm font-medium mb-3 break-words">Track</div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-2 max-w-2xl">
                    <div className="flex items-center gap-2 min-w-0">
                      <Checkbox name="auto-target" id="auto-target-turf" value="turf" defaultChecked />
                      <Label htmlFor="auto-target-turf" className="cursor-pointer text-sm break-words">Turf</Label>
                    </div>
                    <div className="flex items-center gap-2 min-w-0">
                      <Checkbox name="auto-target" id="auto-target-dirt" value="dirt" defaultChecked />
                      <Label htmlFor="auto-target-dirt" className="cursor-pointer text-sm break-words">Dirt</Label>
                    </div>
                  </div>
                </div>

                <div className="min-w-0">
                  <div className="text-sm font-medium mb-3 break-words">Distance</div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-2 max-w-2xl">
                    <div className="flex items-center gap-2 min-w-0">
                      <Checkbox name="auto-target" id="auto-target-sprint" value="sprint" defaultChecked />
                      <Label htmlFor="auto-target-sprint" className="cursor-pointer text-sm break-words">Sprint</Label>
                    </div>
                    <div className="flex items-center gap-2 min-w-0">
                      <Checkbox name="auto-target" id="auto-target-mile" value="mile" defaultChecked />
                      <Label htmlFor="auto-target-mile" className="cursor-pointer text-sm break-words">Mile</Label>
                    </div>
                    <div className="flex items-center gap-2 min-w-0">
                      <Checkbox name="auto-target" id="auto-target-medium" value="medium" defaultChecked />
                      <Label htmlFor="auto-target-medium" className="cursor-pointer text-sm break-words">Medium</Label>
                    </div>
                    <div className="flex items-center gap-2 min-w-0">
                      <Checkbox name="auto-target" id="auto-target-long" value="long" defaultChecked />
                      <Label htmlFor="auto-target-long" className="cursor-pointer text-sm break-words">Long</Label>
                    </div>
                  </div>
                </div>

                <div className="min-w-0">
                  <div className="text-sm font-medium mb-3 break-words">Strategy</div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-2 max-w-2xl">
                    <div className="flex items-center gap-2 min-w-0">
                      <Checkbox name="auto-target" id="auto-target-front" value="front" defaultChecked />
                      <Label htmlFor="auto-target-front" className="cursor-pointer text-sm break-words">Front</Label>
                    </div>
                    <div className="flex items-center gap-2 min-w-0">
                      <Checkbox name="auto-target" id="auto-target-pace" value="pace" defaultChecked />
                      <Label htmlFor="auto-target-pace" className="cursor-pointer text-sm break-words">Pace</Label>
                    </div>
                    <div className="flex items-center gap-2 min-w-0">
                      <Checkbox name="auto-target" id="auto-target-late" value="late" defaultChecked />
                      <Label htmlFor="auto-target-late" className="cursor-pointer text-sm break-words">Late</Label>
                    </div>
                    <div className="flex items-center gap-2 min-w-0">
                      <Checkbox name="auto-target" id="auto-target-end" value="end" defaultChecked />
                      <Label htmlFor="auto-target-end" className="cursor-pointer text-sm break-words">End</Label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-2 min-w-0">
                <div className="flex items-center gap-2 min-h-[44px] min-w-0">
                  <Checkbox name="auto-target" id="auto-target-general" value="general" defaultChecked />
                  <Label htmlFor="auto-target-general" className="cursor-pointer text-sm break-words">General</Label>
                </div>
                <Button id="auto-build-btn" type="button" className="whitespace-nowrap min-h-[44px] w-full sm:w-auto">Generate Build</Button>
                <div id="auto-builder-status" className="text-sm text-muted-foreground flex-1 min-h-[44px] flex items-center min-w-0 break-words" aria-live="polite"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <Card className="glass-card mb-4 overflow-hidden">
          <CardHeader className="min-w-0">
            <CardTitle className="break-words">Results</CardTitle>
          </CardHeader>
          <CardContent id="results" className="space-y-4 min-w-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Badge variant="outline" className="p-3 justify-start w-full min-w-0">
                <span className="font-semibold mr-2 break-words">Best Score:</span>
                <span id="best-score" className="break-words">0</span>
              </Badge>
              <Badge variant="outline" className="p-3 justify-start w-full min-w-0">
                <span className="font-semibold mr-2 break-words">Used Points:</span>
                <span id="used-points" className="break-words">0</span>
              </Badge>
              <Badge variant="outline" className="p-3 justify-start w-full min-w-0">
                <span className="font-semibold mr-2 break-words">Total Points:</span>
                <span id="total-points" className="break-words">0</span>
              </Badge>
              <Badge variant="outline" className="p-3 justify-start w-full min-w-0">
                <span className="font-semibold mr-2 break-words">Remaining:</span>
                <span id="remaining-points" className="break-words">0</span>
              </Badge>
            </div>
            <div className="results-list min-w-0" id="selected-list"></div>
          </CardContent>
        </Card>

        {/* Budget Section */}
        <Card className="glass-card overflow-hidden">
          <CardContent className="pt-6 min-w-0">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between min-w-0">
              <div className="flex-1 min-w-0 w-full sm:max-w-md">
                <Label htmlFor="budget" className="text-sm font-medium mb-2 block break-words">
                  Skill Points Budget
                </Label>
                <Input id="budget" type="number" min="0" step="1" defaultValue="1200" className="w-full" />
              </div>
              <div className="flex items-center gap-2 min-h-[2.5rem] flex-shrink-0">
                <Checkbox id="fast-learner" />
                <Label htmlFor="fast-learner" className="cursor-pointer break-words">
                  Fast Learner (-10% cost)
                </Label>
              </div>
              <div id="lib-status" className="text-sm text-muted-foreground sm:text-right min-w-0 break-words" aria-live="polite"></div>
            </div>
          </CardContent>
        </Card>

        {/* Rows builder */}
        <Card className="glass-card overflow-hidden">
          <CardContent className="pt-6 min-w-0">
            <div className="flex flex-col gap-4 mb-6 min-w-0" role="group" aria-label="Skill rows">
              <span className="text-sm text-muted-foreground break-words">Tip: just enter the skill name and cost - its type auto-detects</span>
              <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
                <Button id="import-screenshot" variant="secondary" type="button" className="min-h-[44px] w-full sm:w-auto">Import from Screenshot</Button>
                <input type="file" id="screenshot-file-input" accept="image/*" className="hidden" />
                <Button id="copy-build" variant="secondary" type="button" className="min-h-[44px] w-full sm:w-auto">Copy Build</Button>
                <Button id="load-build" variant="secondary" type="button" className="min-h-[44px] w-full sm:w-auto">Load Build</Button>
                <Button id="clear-all" variant="destructive" type="button" className="min-h-[44px] w-full sm:w-auto">Clear All</Button>
              </div>
            </div>
            <div id="ocr-import-status" className="text-sm text-muted-foreground mb-4 min-w-0 break-words" aria-live="polite"></div>
            <div id="rows" className="rows space-y-2 min-w-0"></div>
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
