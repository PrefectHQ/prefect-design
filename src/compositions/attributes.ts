import { Ref, ref, SetupContext, StyleValue, useAttrs, watchEffect } from 'vue'

export type ClassValue = string | string[] | Record<string, boolean>
export type AttrsValue = Exclude<SetupContext['attrs'], 'class' | 'style'>
export type UseAttrsAndStyles = {
  classes: Ref<ClassValue>,
  styles: Ref<StyleValue>,
  attrs: Ref<AttrsValue>,
}

export function useAttrsStylesAndClasses(): UseAttrsAndStyles {
  const classes: Ref<ClassValue> = ref('')
  const styles: Ref<StyleValue> = ref('')
  const attrs: Ref<AttrsValue> = ref({})

  watchEffect(() => {
    const { class: newClasses, style: newStyles, ...newAttrs } = useAttrs()

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