import { computed } from 'vue'

export const browser = computed(() => {
  return {
    opera: navigator.userAgent.includes('Opera') || navigator.userAgent.includes('OPR'),
    edge: navigator.userAgent.includes('Edg'),
    chrome: navigator.userAgent.includes('Chrome'),
    safari: navigator.userAgent.includes('Safari'),
    firefox: navigator.userAgent.includes('Firefox'),
    msie: navigator.userAgent.includes('MSIE'),
  }
})