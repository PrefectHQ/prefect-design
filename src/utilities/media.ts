import { useMedia } from '@prefecthq/vue-compositions'
import { reactive, Ref } from 'vue'

function tryMatchMedia(media: string): Ref<boolean> | boolean {
  try {
    return useMedia(media)
  } catch {
    return false
  }
}

const sm = tryMatchMedia('(min-width: 640px)')
const md = tryMatchMedia('(min-width: 768px)')
const lg = tryMatchMedia('(min-width: 1024px)')
const xl = tryMatchMedia('(min-width: 1280px)')
const xxl = tryMatchMedia('(min-width: 1536px)')
const hover = tryMatchMedia('(hover: hover)')

export const media = reactive({
  sm,
  md,
  lg,
  xl,
  xxl,
  hover,
})