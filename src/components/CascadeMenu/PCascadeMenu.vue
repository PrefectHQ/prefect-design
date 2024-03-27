<template>
  <PContextMenu :placement="[positions.bottomLeft, positions.topLeft]">
    <template #target="{ toggle, open, close, visible }">
      <slot name="target" v-bind="{ toggle, open, close, visible }">
        <PButton @click="toggle">
          Open
        </PButton>
      </slot>
    </template>
    <template #context-menu="{ close }">
      <slot name="context-menu" v-bind="{ close }">
        <PCascadePanel v-model:selected="selected" :data="rootData" />
      </slot>
    </template>
  </PContextMenu>
</template>

<script setup lang="ts" generic="T, V">
  import { computed } from 'vue'
  import { PButton, PContextMenu, PCascadePanel } from '@/components'
  import { CascadeData, CascadeMenuValue, positions } from '@/utilities'

  const props = defineProps<{
    data: CascadeData<T, V> | CascadeData<T, V>[],
  }>()

  const selected = defineModel<CascadeMenuValue<V>[]>('selected', { required: true })

  const rootData = computed<CascadeData>(() => {
    if (Array.isArray(props.data)) {
      return {
        label: '',
        value: null,
        children: props.data,
      }
    }

    return props.data
  })
</script>

<style>
.p-cascade-menu { @apply
  text-sm
  min-w-48
  w-full
}
</style>