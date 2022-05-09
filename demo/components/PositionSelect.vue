<template>
  <p-native-select v-model="selected" :options="options" />
</template>

<script lang="ts" setup>
  /* eslint-disable import/namespace */
  import { computed } from 'vue'
  import PNativeSelect from '@/components/NativeSelect/PNativeSelect.vue'
  import { PositionMethod } from '@/types/position'
  import * as positions from '@/utilities/position'

  const props = defineProps<{
    position: PositionMethod,
  }>()

  const emit = defineEmits<{
    (event: 'update:position', value: PositionMethod): void,
  }>()

  const options = Object.keys(positions)

  const selected = computed({
    get: (): keyof typeof positions => {
      const keys = Object.keys(positions) as (keyof typeof positions)[]
      let selected: keyof typeof positions

      keys.forEach(key => {
        if (positions[key] == props.position) {
          selected = key
        }
      })

      return selected!
    },
    set: (value: keyof typeof positions): void => {
      emit('update:position', positions[value])
    },
  })
</script>

<style></style>