<template>
  <PBaseInput class="p-cascade-panel-button" :class="classes.root">
    <template v-for="(index, name) in $slots" #[name]="data">
      <slot :name="name" v-bind="data" />
    </template>
    <template #control="{ attrs }">
      <button
        ref="buttonElement"
        type="button"
        class="p-cascade-panel-button__control"
        aria-hidden="true"
        v-bind="attrs"
      >
        <span class="p-cascade-panel-button__value" :class="classes.value">
          <slot>
            {{ displayValue }}
          </slot>
        </span>
      </button>
    </template>
    <template #append>
      <div class="p-cascade-panel-button__actions">
        <PButton
          v-if="showClear"
          small
          flat
          icon="ClearInput"
          class="p-cascade-panel-button__clear-button"
          @click="emit('clear')"
        />
        <PIcon icon="ChevronDownIcon" size="small" class="p-cascade-panel-button__chevron" />
      </div>
    </template>
  </PBaseInput>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue'
  import { PIcon, PBaseInput, PButton } from '@/components'
  import { getInjectedCascadePanels } from '@/compositions'

  const props = defineProps<{
    clearable?: boolean,
    small?: boolean,
  }>()

  const emit = defineEmits<{
    'clear': [],
  }>()

  const buttonElement = ref<HTMLButtonElement>()
  const el = computed(() => buttonElement.value)

  const { values, empty } = getInjectedCascadePanels()

  const showClear = computed(() => props.clearable && !empty.value)

  const displayValue = computed(() => {
    return Object.values(values).join(' / ') || 'Select value'
  })

  const classes = computed(() => {
    return {
      root: {
        'p-cascade-panel-button--small': props.small,
      },
      value: {
        'p-cascade-panel-button__value--small': props.small,
      },
    }
  })

  defineExpose({ el })
</script>

<style>
.p-cascade-panel-button { @apply
  text-base
  cursor-pointer
}

.p-cascade-panel-button--small { @apply
  text-sm
}

.p-cascade-panel-button__control { @apply
  w-full
  h-full
  py-1
  px-3
  text-left
  text-inherit
  outline-none
  border-none
  ring-0
  focus:ring-0
  truncate
}

.p-cascade-panel-button__control:disabled { @apply
  cursor-not-allowed
}

.p-cascade-panel-button__value { @apply
  flex
  justify-start
  items-center
  min-h-8
  w-full
  h-full
  text-inherit
}

.p-cascade-panel-button__value--small { @apply
  min-h-5
}

.p-cascade-panel-button__actions { @apply
  flex
  gap-1
}

.p-cascade-panel-button__chevron { @apply
  self-center
  mr-2
}

.p-cascade-panel-button__clear-button { @apply
  p-0.5
}
</style>