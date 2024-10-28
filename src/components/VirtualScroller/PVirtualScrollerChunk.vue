<template>
  <div ref="el" class="p-virtual-scroller-chunk" :style="styles">
    <template v-if="forceVisible || visible">
      <slot />
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { useIntersectionObserver } from '@prefecthq/vue-compositions'
  import { computed, onMounted, ref } from 'vue'

  const props = defineProps<{
    height: number,
    observerOptions: IntersectionObserverInit,
    forceVisible?: boolean,
  }>()

  const styles = computed(() => ({
    height: visible.value ? undefined : `${internalHeight.value ?? props.height}px`,
  }))

  const el = ref<HTMLDivElement>()
  const visible = ref(false)
  const internalHeight = ref<number | null>(null)
  const { observe } = useIntersectionObserver(intersect, props.observerOptions)

  function setHeight(): void {
    setTimeout(() => {
      const rect = el.value!.getBoundingClientRect()

      internalHeight.value = rect.height
    })
  }

  function intersect(entries: IntersectionObserverEntry[]): void {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        setHeight()
      }

      setTimeout(() => {
        visible.value = entry.isIntersecting
      })
    })
  }

  onMounted(() => {
    observe(el)
  })
</script>