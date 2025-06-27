import { useLocalStorage } from '@prefecthq/vue-compositions'
import { ref, Ref, onMounted, onUnmounted } from 'vue'
import { globalExists } from '@/utilities/id'

const COLOR_THEME_KEY = 'color-scheme'
type ColorTheme = 'dark' | 'light'

let isInitialized = false
let instanceCount = 0
let mediaQueryListener: ((event: MediaQueryListEvent) => void) | null = null
let mediaQuery: MediaQueryList | null = null

const { value: storageTheme, set: setStorageTheme } = useLocalStorage<ColorTheme | undefined>(COLOR_THEME_KEY, undefined)

const initialTheme: ColorTheme = storageTheme.value ?? 'dark'

const internalValue = ref(initialTheme)

const setTheme = (theme: ColorTheme): void => {
  if (globalExists('document')) {
    document.documentElement.classList.remove(internalValue.value)
    document.documentElement.classList.add(theme)
  }
  setStorageTheme(theme)
  internalValue.value = theme
}

const toggleTheme = (): void => {
  setTheme(internalValue.value == 'dark' ? 'light' : 'dark')
}

const handlePrefersColorSchemeChange = (event: MediaQueryListEvent): void => {
  internalValue.value = event.matches ? 'dark' : 'light'
}

const initializeTheme = (): void => {
  if (isInitialized) {
    return
  }

  if (globalExists('document')) {
    if (!document.documentElement.classList.contains(internalValue.value)) {
      setTheme(initialTheme)
    }
  }

  if (globalExists('window')) {
    mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQueryListener = handlePrefersColorSchemeChange
    mediaQuery.addEventListener('change', mediaQueryListener)
  }

  isInitialized = true
}

const cleanup = (): void => {
  if (mediaQuery && mediaQueryListener) {
    mediaQuery.removeEventListener('change', mediaQueryListener)
    mediaQuery = null
    mediaQueryListener = null
  }
  isInitialized = false
}

export function useColorTheme(): { value: Ref<ColorTheme>, toggleTheme: () => void, setTheme: (theme: ColorTheme) => void } {
  onMounted(() => {
    instanceCount++
    initializeTheme()
  })

  onUnmounted(() => {
    instanceCount--

    if (instanceCount === 0) {
      cleanup()
    }
  })

  return { value: internalValue, toggleTheme, setTheme }
}