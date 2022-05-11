import { onMounted, Ref, ref } from 'vue'

export function useScrollIntoViewOnMounted(condition: (element: HTMLElement) => boolean): Ref<HTMLElement[]> {
  const element = ref<HTMLElement[]>([])

  onMounted(() => {
    const target = element.value.find(condition)

    if (target) {
      target.scrollIntoView({ block: 'center' })
    }
  })

  return element
}