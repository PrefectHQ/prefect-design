import { Ref, ref, SetupContext, StyleValue, useAttrs, watchEffect } from 'vue'

export type ClassValue = string | string[] | Record<string, boolean>
export type AttrsValue = Exclude<SetupContext['attrs'], 'class' | 'style'>
export type UseAttrsAndStyles = {
  classes: Ref<Record<string, boolean>>,
  styles: Ref<StyleValue[]>,
  attrs: Ref<AttrsValue>,
}
export type UseAttrsStylesAndListeners = UseAttrsAndStyles & {
  listeners: Ref<AttrsValue>,
}

const listenerRegexp = /^on[^a-z]/
export function isListener(key: string): boolean {
  return listenerRegexp.test(key)
}

export function useAttrsStylesAndClasses(): UseAttrsAndStyles {
  const classes: Ref<Record<string, boolean>> = ref({})
  const styles: Ref<StyleValue[]> = ref([])
  const attrs: Ref<AttrsValue> = ref({})
  const attributes = useAttrs()

  function convertToClassValueObject(value: ClassValue): Record<string, boolean> {
    if (!value) {
      return {}
    }

    if (Array.isArray(value)) {
      return value.reduce((reduced, key) => ({
        [key]: true,
      }), {})
    }

    if (typeof value === 'string') {
      return { [value]: true }
    }

    return value
  }

  function convertToStylesArray(value: StyleValue): StyleValue[] {
    if (!value) {
      return []
    }

    if (Array.isArray(value)) {
      return value
    }

    return [value]
  }

  watchEffect(() => {
    const { class: newClasses, style: newStyles, ...newAttrs } = attributes

    classes.value = convertToClassValueObject(newClasses as ClassValue)
    styles.value = convertToStylesArray(newStyles as StyleValue)
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
        listeners.value[attr] = (attrs.value as unknown as Record<string, unknown>)[attr]
      } else {
        nonListenerAttrs.value[attr] = (attrs.value as unknown as Record<string, unknown>)[attr]
      }
    }
  })

  return { attrs: nonListenerAttrs, listeners, styles, classes }
}