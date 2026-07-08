import { create } from "zustand"
import type { AppSettings } from "@/types/settings"
import { initialSettings } from "@/data/mockSettings"

interface SettingsState {
  settings: AppSettings
  updateSettings: (patch: Partial<AppSettings>) => void
}

export const useSettingsStore = create<SettingsState>((set) => ({
  settings: initialSettings,
  updateSettings: (patch) =>
    set((state) => ({ settings: { ...state.settings, ...patch } })),
}))
