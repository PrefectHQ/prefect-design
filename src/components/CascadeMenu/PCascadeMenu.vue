<template>
  <PContextMenu :placement="[positions.bottomLeft, positions.topLeft]">
    <template #target="{ toggle, open, close, visible }">
      <slot name="target" v-bind="{ toggle, open, close, visible, value }">
        <PCascadeMenuButton
          :value="value"
          v-bind="{ disabled, clearable, small }"
          :class="getControlClass(visible)"
          @click="toggle"
          @clear="clear"
        >
          <slot v-if="valueIsSet(value)" name="value" v-bind="{ visible, value, open, close, toggle }">
            {{ value }}
          </slot>
          <slot v-else name="placeholder" v-bind="{ visible, open, close, toggle }">
            <span class="p-cascade-menu-button__placeholder">Select value</span>
          </slot>
        </PCascadeMenuButton>
      </slot>
    </template>
    <template #context-menu="{ close }">
      <slot name="context-menu" v-bind="{ close, value }">
        <PCascadePanel v-model:value="value" :data="rootData" />
      </slot>
    </template>
  </PContextMenu>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { PCascadeMenuButton, PContextMenu, PCascadePanel } from '@/components'
  import { ClassValue } from '@/types'
  import { CascadeData, CascadeValue, positions, valueIsSet } from '@/utilities'

  const props = defineProps<{
    data: CascadeData | CascadeData[],
    disabled?: boolean,
    clearable?: boolean,
    small?: boolean,
  }>()

  const value = defineModel<CascadeValue>('value', { required: true })

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

  const clear = (): void => {
    value.value = []
  }

  function getControlClass(open: boolean): ClassValue {
    return {
      'p-cascade-menu--open': open,
    }
  }
</script>

<style>
.p-cascade-menu { @apply
  text-sm
  min-w-48
  w-full
}

.p-cascade-menu--open { @apply
  ring-spacing-focus-ring
  ring-focus-ring
  ring-offset-focus-ring
  ring-offset-focus-ring-offset;
  background-color: var(--p-color-input-bg-focus);
  border-color: var(--p-color-input-border-focus);
}

.p-cascade-menu-button__placeholder { @apply
  text-subdued
}
</style>