import { useLocalStorage } from '@prefecthq/vue-compositions'
import { onMounted, onUnmounted, ref, onBeforeMount, Ref } from 'vue'

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


export function useColorTheme(): { value: Ref<ColorTheme>, toggleTheme: () => void, setTheme: (theme: ColorTheme) => void } {
  onBeforeMount(() => {
    if (!document.documentElement.classList.contains(internalValue.value)) {
      setTheme(initialTheme)
    }
  })

  onMounted(() => {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handlePrefersColorSchemeChange)
  })

  onUnmounted(() => {
    window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', handlePrefersColorSchemeChange)
  })

  return { value: internalValue, toggleTheme, setTheme }
}