<template>
  <BaseInput :disabled="disabled">
    <template v-for="(index, name) in $slots" #[name]="data">
      <slot :name="name" v-bind="data" />
    </template>
    <template #control="{ attrs }">
      <button
        ref="buttonElement"
        type="button"
        class="p-date-button"
        :class="classes"
        aria-hidden="true"
        v-bind="attrs"
      >
        {{ displayValue }}
      </button>
    </template>
    <template #append>
      <span class="p-date-button__icon">
        <PIcon icon="CalendarIcon" />
      </span>
    </template>
  </BaseInput>
</template>

<script lang="ts" setup>
  import { format } from 'date-fns'
  import { computed, ref } from 'vue'
  import BaseInput from '@/components/BaseInput/BaseInput.vue'

  const props = defineProps<{
    date: Date | null | undefined,
    disabled?: boolean,
  }>()

  const buttonElement = ref<HTMLButtonElement>()
  const el = computed(() => buttonElement.value)
  const displayValue = computed(() => {
    if (props.disabled) {
      return ''
    }

    if (props.date) {
      return format(props.date, 'MM/dd/yyyy')
    }

    return 'mm/dd/yyyy'
  })

  const classes = computed(() => ({
    'p-date-button--disabled': props.disabled,
  }))

  defineExpose({ el })
</script>

<style>
.p-date-button { @apply
  w-full
  h-full
  py-2
  px-3
  text-left
  text-base
  cursor-default
  outline-none
  border-none
  ring-0
  focus:ring-0
  truncate
}

.p-date-button--disabled { @apply
  cursor-not-allowed
}

.p-date-button:empty:before {
  content: "\200b";
}

.p-date-button__icon { @apply
  pr-2
  flex
  items-center
  pointer-events-none
}

.p-date-button__icon .p-icon { @apply
  w-4
  h-4
}
</style>