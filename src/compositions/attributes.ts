import { Ref, ref, SetupContext, StyleValue, useAttrs, watchEffect } from 'vue'

export type ClassValue = string | string[] | Record<string, boolean>
export type AttrsValue = Exclude<SetupContext['attrs'], 'class' | 'style'>
export type UseAttrsAndStyles = {
  classes: Ref<Record<string, boolean>>,
  styles: Ref<StyleValue[]>,
  attrs: Ref<AttrsValue>,
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