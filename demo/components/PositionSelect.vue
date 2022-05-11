<template>
  <p-select v-model="selected" :options="options" />
</template>

<script lang="ts" setup>
  /* eslint-disable import/namespace */
  import { computed } from 'vue'
  import PSelect from '@/components/Select/PSelect.vue'
  import { PositionMethod } from '@/types/position'
  import { left, right, bottom, top } from '@/utilities/position'

  const props = defineProps<{
    // using any because vue's type warnings for props is dumb...
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    position: any,
  }>()

  const emit = defineEmits<{
    (event: 'update:position', value: PositionMethod | PositionMethod[]): void,
  }>()

  const keyToFunction = new Map([
    ['left', left],
    ['right', right],
    ['bottom', bottom],
    ['top', top],
  ])

  const functionToKey = new Map([
    [left, 'left'],
    [right, 'right'],
    [bottom, 'bottom'],
    [top, 'top'],
  ])

  const options = Array.from(keyToFunction.keys())

  const selected = computed({
    get: (): string | string[] => {
      if (Array.isArray(props.position)) {
        return props.position.map(key => functionToKey.get(key)!)
      }

      return functionToKey.get(props.position)!
    },
    set: (value: string | string[]): void => {
      if (typeof value === 'string') {
        emit('update:position', keyToFunction.get(value)!)
      } else {
        const allSorted = Array.from(keyToFunction.keys())
        const sorted = [...value].sort((a, b) => allSorted.indexOf(a) - allSorted.indexOf(b))
        const selected = sorted.map(key => keyToFunction.get(key)!)

        emit('update:position', selected)
      }
    },
  })
</script>

<style></style>