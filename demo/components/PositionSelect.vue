<template>
  <div class="position-select">
    <p-select v-model="selected" :options="options" />
  </div>
</template>

<script lang="ts" setup>
  import PSelect from '@/components/Select/PSelect.vue'
  import { PositionMethod } from '@/types/position'

  /*  eslint import/namespace: ['error', { allowComputed: true }] */
  import * as positions from '@/utilities/position'
  import { computed } from 'vue'

  type PositionsKey = keyof typeof positions

  const props = defineProps<{
    position: PositionMethod | PositionMethod[],
  }>()

  const emit = defineEmits<{
    (event: 'update:position', value: PositionMethod | PositionMethod[]): void,
  }>()

  const options = Object.keys(positions)

  const selected = computed({
    get: (): string | string[] => {
      if (Array.isArray(props.position)) {
        return props.position.map(position => position.name)
      }

      return props.position.name
    },
    set: (value: string | string[]): void => {
      if (typeof value === 'string') {
        emit('update:position', positions[value as PositionsKey])
      } else {
        // eslint-disable-next-line id-length
        const sorted = [...value].sort((a, b) => options.indexOf(a) - options.indexOf(b))
        const selected = sorted.map(key => positions[key as PositionsKey])

        emit('update:position', selected)
      }
    },
  })
</script>

<style>
.position-select {
  flex-grow:1;
}
</style>