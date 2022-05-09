<template>
  <Section heading="Pop Overs">
    <p-native-select v-model="placement" :options="options" />
    <div ref="container" style="position: relative">
      <div ref="target" class="inline-block bg-black text-white">
        target
      </div>
      <div ref="content" style="position: absolute;" :style="styles">
        content<br>test
      </div>
    </div>

    {{ styles }}
  </Section>
</template>

<script lang="ts" setup>
  import { onMounted, reactive, ref, computed } from 'vue'
  import Section from '../components/Section.vue'
  import PNativeSelect from '@/components/NativeSelect/PNativeSelect.vue'
  import { usePositionStyles } from '@/compositions/placement'
  import { Position } from '@/types/position'
  import { left, right } from '@/utilities/placement'


  const placements = {
    left,
    right,
  } as const

  const placement = ref<keyof typeof placements>('left')
  const options = Object.keys(placements)

  const target = ref()
  const content = ref()
  const container = ref()
  const placementReactive = computed(() => placements[placement.value])

  const styles = usePositionStyles(target, content, container, placementReactive)
</script>

<style></style>