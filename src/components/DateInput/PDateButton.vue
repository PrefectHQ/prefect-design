<template>
  <BaseInput>
    <template v-for="(index, name) in $slots" #[name]="data">
      <slot :name="name" v-bind="data" />
    </template>
    <template #control="{ attrs }">
      <button
        ref="buttonElement"
        type="button"
        class="p-date-button"
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
  import BaseInput from '@/components/BaseInput'

  const props = defineProps<{
    date: Date | null | undefined,
  }>()

  const buttonElement = ref<HTMLButtonElement>()
  const el = computed(() => buttonElement.value)
  const displayValue = computed(() => props.date ? format(props.date, 'MM/dd/yyyy') : 'mm/dd/yyyy')

  defineExpose({ el })
</script>

<style>
.p-date-button { @apply
  w-full
  h-full
  pl-3
  pr-10
  py-2
  text-left
  cursor-default
  outline-none
  border-none
  ring-0
  focus:ring-0
}

.p-date-button__value { @apply
  truncate
  flex
  items-center
}

.p-date-button__value:empty:before {
  content: "\200b";
}

.p-date-button__icon { @apply
  pr-2
  flex
  items-center
  pointer-events-none
}

.p-date-button__icon svg { @apply
  w-4
  h-4
}
</style>