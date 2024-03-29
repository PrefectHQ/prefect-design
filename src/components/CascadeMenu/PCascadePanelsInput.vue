<template>
  <PPopOver :placement="placement" :auto-close="!disableAutoClose">
    <template #target="{ toggle, open, close, visible }">
      <slot name="target" v-bind="{ toggle, open, close, visible }">
        <PCascadePanelsButton
          v-bind="{ disabled, clearable, small }"
          :class="getControlClass(visible)"
          @click="toggle"
          @clear="clear"
        >
          <slot v-if="empty" name="target-placeholder" v-bind="{ visible, open, close, toggle }">
            <span class="p-cascade-panels-input__button-placeholder">Select value</span>
          </slot>
          <slot v-else name="target-value" v-bind="{ visible, open, close, toggle, value: populatedKeyValues }">
            {{ populatedKeyValues }}
          </slot>
        </PCascadePanelsButton>
      </slot>
    </template>

    <PCascadePanels v-model:value="value" :panels="panels" />
  </PPopOver>
</template>

<script setup lang="ts">
  import { useKeyDown } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import { PCascadePanelsButton, PPopOver, PCascadePanels } from '@/components'
  import { CascadePanel, CascadeValue } from '@/compositions'
  import { ClassValue, keys, PositionMethod } from '@/types'
  import { isDefined } from '@/utilities'

  const props = defineProps<{
    panels: CascadePanel[],
    disabled?: boolean,
    clearable?: boolean,
    small?: boolean,
    placement?: PositionMethod | PositionMethod[],
    disableAutoClose?: boolean,
    disableCloseOnEscape?: boolean,
  }>()

  const popOver = ref<typeof PPopOver>()

  const value = defineModel<CascadeValue>('value', { required: true })

  const clear = (): void => {
    Object.assign(value.value, {})
  }

  const empty = computed(() => Object.values(value.value).length === 0)
  const populatedKeyValues = computed(() => Object.entries(value.value).filter(([, value]) => isDefined(value)))

  function getControlClass(open: boolean): ClassValue {
    return {
      'p-cascade-panels--open': open,
    }
  }

  function internalClose(): void {
    popOver.value?.close()
  }

  function closeOnEscape(): void {
    if (props.disableCloseOnEscape) {
      return
    }

    internalClose()
  }

  useKeyDown(keys.escape, closeOnEscape)
</script>

<style>
.p-cascade-panels-input--open { @apply
  ring-spacing-focus-ring
  ring-focus-ring
  ring-offset-focus-ring
  ring-offset-focus-ring-offset;
  background-color: var(--p-color-input-bg-focus);
  border-color: var(--p-color-input-border-focus);
}

.p-cascade-panels-input__button-placeholder { @apply
  text-subdued
}
</style>