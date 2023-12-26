import { useLocalStorage } from '@prefecthq/vue-compositions'
import { ref, Ref } from 'vue'
import { globalExists } from '@/utilities/id'

const COLOR_THEME_KEY = 'color-scheme'
type ColorTheme = 'dark' | 'light'

const { value: storageTheme, set: setStorageTheme } = useLocalStorage<ColorTheme | undefined>(COLOR_THEME_KEY, undefined)

const initialTheme: ColorTheme = storageTheme.value ?? 'dark'

const internalValue = ref(initialTheme)
const setTheme = (theme: ColorTheme): void => {
  document.documentElement.classList.remove(internalValue.value)
  document.documentElement.classList.add(theme)
  setStorageTheme(theme)
  internalValue.value = theme
}

const toggleTheme = (): void => {
  setTheme(internalValue.value == 'dark' ? 'light' : 'dark')
}

const handlePrefersColorSchemeChange = (event: MediaQueryListEvent): void => {
  internalValue.value = event.matches ? 'dark' : 'light'
}

if (globalExists('document')) {
  if (!document.documentElement.classList.contains(internalValue.value)) {
    setTheme(initialTheme)
  }
}

if (globalExists('window')) {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handlePrefersColorSchemeChange)
}

export function useColorTheme(): { value: Ref<ColorTheme>, toggleTheme: () => void, setTheme: (theme: ColorTheme) => void } {
  return { value: internalValue, toggleTheme, setTheme }
}