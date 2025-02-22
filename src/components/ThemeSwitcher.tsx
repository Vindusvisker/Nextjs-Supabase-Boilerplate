'use client'

import { useTheme } from '@/utils/useTheme'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select'
import { Monitor, Moon, Sun, Palette, Laptop2, Grid } from 'lucide-react'

export function ThemeSwitcher() {
  const { theme, setTheme, mode, setMode } = useTheme()

  return (
    <div className="flex items-center gap-2 p-4 rounded-lg bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border">
      <Select value={theme} onValueChange={(value: typeof theme) => setTheme(value)}>
        <SelectTrigger className="w-[150px]">
          <Palette className="mr-2 h-4 w-4" />
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="default">
            <div className="flex items-center">
              <Grid className="mr-2 h-4 w-4" />
              Default
            </div>
          </SelectItem>
          <SelectItem value="ios">
            <div className="flex items-center">
              <Laptop2 className="mr-2 h-4 w-4" />
              iOS
            </div>
          </SelectItem>
          <SelectItem value="minimal">
            <div className="flex items-center">
              <Monitor className="mr-2 h-4 w-4" />
              Minimal
            </div>
          </SelectItem>
        </SelectContent>
      </Select>

      <Select value={mode} onValueChange={(value: typeof mode) => setMode(value)}>
        <SelectTrigger className="w-[150px]">
          {mode === 'light' && <Sun className="mr-2 h-4 w-4" />}
          {mode === 'dark' && <Moon className="mr-2 h-4 w-4" />}
          {mode === 'system' && <Monitor className="mr-2 h-4 w-4" />}
          <SelectValue placeholder="Mode" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">
            <div className="flex items-center">
              <Sun className="mr-2 h-4 w-4" />
              Light
            </div>
          </SelectItem>
          <SelectItem value="dark">
            <div className="flex items-center">
              <Moon className="mr-2 h-4 w-4" />
              Dark
            </div>
          </SelectItem>
          <SelectItem value="system">
            <div className="flex items-center">
              <Monitor className="mr-2 h-4 w-4" />
              System
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
} 