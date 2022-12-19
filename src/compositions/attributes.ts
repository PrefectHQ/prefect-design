import { Ref, ref, useAttrs, watchEffect } from 'vue'
import { AttrsValue, ClassValue, StyleValue } from '@/types/attributes'
import { isListener } from '@/utilities/attributes'

export type UseAttrsAndStyles = {
  classes: Ref<ClassValue>,
  styles: Ref<StyleValue>,
  attrs: Ref<AttrsValue>,
}
export type UseAttrsStylesAndListeners = UseAttrsAndStyles & {
  listeners: Ref<AttrsValue>,
}

export function useAttrsStylesAndClasses(): UseAttrsAndStyles {
  const classes: Ref<ClassValue> = ref({})
  const styles: Ref<StyleValue> = ref([])
  const attrs: Ref<AttrsValue> = ref({})
  const attributes = useAttrs()

  watchEffect(() => {
    const { class: newClasses, style: newStyles, ...newAttrs } = attributes

    classes.value = newClasses as ClassValue
    styles.value = newStyles as StyleValue
    attrs.value = newAttrs
  })

  return {
    classes,
    styles,
    attrs,
  }
}

export function useAttrsStylesClassesAndListeners(): UseAttrsStylesAndListeners {
  const { attrs, styles, classes } = useAttrsStylesAndClasses()
  const nonListenerAttrs: Ref<AttrsValue> = ref({})
  const listeners: Ref<AttrsValue> = ref({})

  watchEffect(() => {
    for (const attr in attrs.value) {
      if (isListener(attr)) {
        listeners.value[attr] = attrs.value[attr]
      } else {
        nonListenerAttrs.value[attr] = attrs.value[attr]
      }
    }
  })

  return { attrs: nonListenerAttrs, listeners, styles, classes }
}