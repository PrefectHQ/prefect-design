import { ref } from 'vue'

export const mobileMenuOpen = ref(false)

export function open(): void {
  mobileMenuOpen.value = true
}

export function close(): void {
  mobileMenuOpen.value = false
}

export function toggle(): void {
  mobileMenuOpen.value = !mobileMenuOpen.value
}