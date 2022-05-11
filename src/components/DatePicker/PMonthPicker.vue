<template>
  <div class="p-month-picker">
    <template v-for="(option) in monthOptions" :key="option.value">
      <div class="p-month-picker__month">
        <p-button
          size="xs"
          class="p-month-picker__month-button"
          :flat="!isSelected(option.value)"
          @click="selectedDate = option.value"
        >
          <span ref="monthElements" :data-month="option.value">
            {{ option.label }}
          </span>
        </p-button>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { startOfDay, format, isSameMonth } from 'date-fns'
  import { computed, nextTick, onMounted, ref } from 'vue'
  import PButton from '@/components/Button'

  const props = defineProps<{
    modelValue: Date | null | undefined,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: Date | null): void,
  }>()

  const monthElements = ref<HTMLElement[]>([])

  const selectedDate = computed({
    get() {
      return props.modelValue ?? startOfDay(new Date())
    },
    set(value: Date) {
      emits('update:modelValue', value)
    },
  })

  const selectedMonth = computed(() => selectedDate.value.getMonth())
  const monthOptions = [...new Array(12).keys()].map(index => {
    const value = new Date(selectedDate.value)

    value.setMonth(index)

    return {
      value,
      label: format(value, 'MMMM'),
    }
  })

  function isSelected(value: Date): boolean {
    return isSameMonth(selectedDate.value, value)
  }

  onMounted(() => {
    const element = monthElements.value.find(node => node.dataset.month === selectedMonth.value.toString())

    if (element) {
      nextTick(() => element.parentElement?.focus())
    }
  })
</script>

<style>
.p-month-picker { @apply
  h-full
  grid
  grid-cols-3
  grid-rows-4
  gap-4
}

.p-month-picker__month { @apply
  text-center
}

.p-month-picker__month-button { @apply
  justify-center
}
</style>