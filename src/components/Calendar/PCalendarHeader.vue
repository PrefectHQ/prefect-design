<template>
  <div class="p-calendar-header" :class="`p-calendar-header--${mode}`">
    <div class="p-calendar-header__before">
      <template v-if="mode === 'date'">
        <p-button
          class="p-calendar-header__arrow"
          icon="ChevronLeftIcon"
          small
          :disabled="previousDisabled"
          @click="selected = addMonths(selected, -1)"
        />
      </template>
      <template v-else>
        <p-button
          class="p-calendar-header__close"
          flat
          icon="XMarkIcon"
          small
          @click="emit('update:mode', 'date')"
        />
      </template>
    </div>
    <div class="p-calendar-header__title">
      <p-button class="p-date-picker__title-month" flat @click="emit('update:mode', 'month')">
        {{ month }}
      </p-button>
      <p-button class="p-date-picker__title-year" flat @click="emit('update:mode', 'year')">
        {{ year }}
      </p-button>
    </div>
    <div class="p-calendar-header__after">
      <p-button
        class="p-calendar-header__arrow"
        icon="ChevronRightIcon"
        small
        :disabled="nextDisabled"
        @click="selected = addMonths(selected, 1)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { addMonths, endOfMonth, format, startOfMonth } from 'date-fns'
  import { computed } from 'vue'
  import { isDateAfter, isDateBefore } from '@/utilities'

  const props = defineProps<{
    modelValue: Date,
    mode: 'year' | 'month' | 'date',
    min?: Date | null | undefined,
    max?: Date | null | undefined,
  }>()

  const emit = defineEmits<{
    'update:modelValue': [value: Date],
    'update:mode': [mode: 'year' | 'month' | 'date'],
  }>()

  const selected = computed({
    get() {
      return props.modelValue
    },
    set(value) {
      emit('update:modelValue', value)
    },
  })

  const month = computed(() => format(selected.value, 'MMMM'))
  const year = computed(() => format(selected.value, 'yyyy'))

  const previousDisabled = computed(() => {
    if (!props.min) {
      return false
    }

    const previousMonth = addMonths(selected.value, -1)

    return isDateBefore(endOfMonth(previousMonth), props.min)
  })

  const nextDisabled = computed(() => {
    if (!props.max) {
      return false
    }

    const nextMonth = addMonths(selected.value, 1)

    return isDateAfter(startOfMonth(nextMonth), props.max)
  })
</script>

<style>
.p-calendar-header { @apply
  flex
  justify-between
  items-center
}

.p-calendar-header__arrow { @apply
  invisible
  pointer-events-none
}

.p-calendar-header--date .p-calendar-header__arrow { @apply
  visible
  pointer-events-auto
}
</style>