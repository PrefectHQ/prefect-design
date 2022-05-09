<template>
  <p-native-select v-model="selected" :options="options" />
</template>

<script lang="ts" setup>
  /* eslint-disable import/namespace */
  import { computed } from 'vue'
  import PNativeSelect from '@/components/NativeSelect/PNativeSelect.vue'
  import { PositionMethod } from '@/types/position'
  import * as placements from '@/utilities/placement'

  const props = defineProps<{
    position: PositionMethod,
  }>()

  const emit = defineEmits<{
    (event: 'update:position', value: PositionMethod): void,
  }>()

  const options = Object.keys(placements)

  const selected = computed({
    get: (): keyof typeof placements => {
      const keys = Object.keys(placements) as (keyof typeof placements)[]
      let selected: keyof typeof placements

      keys.forEach(key => {
        if (placements[key] == props.position) {
          selected = key
        }
      })

      return selected!
    },
    set: (value: keyof typeof placements): void => {
      emit('update:position', placements[value])
    },
  })
</script>

<style></style>