<template>
  <PPopOver :placement="[positions.bottomLeft, positions.topLeft]">
    <template #target="{ toggle, open, close, visible }">
      <slot name="target" v-bind="{ toggle, open, close, visible, values }">
        <PCascadePanelsButton
          v-bind="{ disabled, clearable, small }"
          :class="getControlClass(visible)"
          @click="toggle"
          @clear="clear"
        >
          <slot v-if="empty" name="placeholder" v-bind="{ visible, open, close, toggle }">
            <span class="p-cascade-panels-button__placeholder">Select value</span>
          </slot>
          <slot v-else name="value" v-bind="{ visible, values, open, close, toggle }">
            {{ values }}
          </slot>
        </PCascadePanelsButton>
      </slot>
    </template>
    <template #context-menu="{ close }">
      <!--
        <slot name="context-menu" v-bind="{ close, value }">
        <PCascadePanel v-model:value="value" :data="rootData" />
        </slot>
      -->
    </template>
  </PPopOver>
</template>

<script setup lang="ts">
  import { watch } from 'vue'
  import { PCascadePanelsButton, PPopOver, PCascadePanel } from '@/components'
  import { CascadePanel, CascadeValue, useCascadePanels } from '@/compositions'
  import { ClassValue } from '@/types'
  import { positions } from '@/utilities'

  const props = defineProps<{
    panels: CascadePanel[],
    disabled?: boolean,
    clearable?: boolean,
    small?: boolean,
  }>()

  const { values, empty } = useCascadePanels(props.panels)

  const value = defineModel<CascadeValue>('value', { required: true })
  watch(() => values, (newValues) => {
    value.value = newValues
  }, { deep: true })

  const clear = (): void => {
    Object.assign(values, {})
  }

  function getControlClass(open: boolean): ClassValue {
    return {
      'p-cascade-panels--open': open,
    }
  }
</script>

<style>
.p-cascade-panels { @apply
  text-sm
  min-w-48
  w-full
}

.p-cascade-panels--open { @apply
  ring-spacing-focus-ring
  ring-focus-ring
  ring-offset-focus-ring
  ring-offset-focus-ring-offset;
  background-color: var(--p-color-input-bg-focus);
  border-color: var(--p-color-input-border-focus);
}

.p-cascade-panels-button__placeholder { @apply
  text-subdued
}
</style>