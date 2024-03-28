<template>
  <PBaseInput class="p-cascade-menu-button" :class="classes.root">
    <template v-for="(index, name) in $slots" #[name]="data">
      <slot :name="name" v-bind="data" />
    </template>
    <template #control="{ attrs }">
      <button
        ref="buttonElement"
        type="button"
        class="p-cascade-menu-button__control"
        aria-hidden="true"
        v-bind="attrs"
      >
        <span class="p-cascade-menu-button__value" :class="classes.value">
          <slot>
            {{ displayValue }}
          </slot>
        </span>
      </button>
    </template>
    <template #append>
      <div class="p-cascade-menu-button__actions">
        <PButton
          v-if="showClear"
          small
          flat
          icon="ClearInput"
          class="p-cascade-menu-button__clear-button"
          @click="emit('clear')"
        />
        <PIcon icon="ChevronDownIcon" size="small" class="p-cascade-menu-button__chevron" />
      </div>
    </template>
  </PBaseInput>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue'
  import { PIcon, PBaseInput, PButton } from '@/components'
  import { CascadeValue, valueIsSet } from '@/utilities'

  const props = defineProps<{
    value?: CascadeValue,
    clearable?: boolean,
    small?: boolean,
  }>()

  const emit = defineEmits<{
    'clear': [],
  }>()

  const buttonElement = ref<HTMLButtonElement>()
  const el = computed(() => buttonElement.value)

  const showClear = computed(() => props.clearable && valueIsSet(props.value))

  const displayValue = computed(() => {
    if (props.value) {
      if (Array.isArray(props.value)) {
        return props.value.join(', ')
      }

      return props.value
    }

    return ''
  })

  const classes = computed(() => {
    return {
      root: {
        'p-cascade-menu-button--small': props.small,
      },
      value: {
        'p-cascade-menu-button__value--small': props.small,
      },
    }
  })

  defineExpose({ el })
</script>

<style>
.p-cascade-menu-button { @apply
  text-base
  cursor-pointer
}

.p-cascade-menu-button--small { @apply
  text-sm
}

.p-cascade-menu-button__control { @apply
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

.p-cascade-menu-button__control:disabled { @apply
  cursor-not-allowed
}

.p-cascade-menu-button__value { @apply
  flex
  justify-start
  items-center
  min-h-8
  w-full
  h-full
  text-inherit
}

.p-cascade-menu-button__value--small { @apply
  min-h-5
}

.p-cascade-menu-button__actions { @apply
  flex
  gap-1
}

.p-cascade-menu-button__chevron { @apply
  self-center
  mr-1
}

.p-cascade-menu-button__clear-button { @apply
  p-0.5
}
</style>