<template>
  <div class="p-minute-picker">
    <template v-for="option in minuteOptions" :key="option">
      <p-button
        size="sm"
        :flat="minutes !== padMinutes(option)"
        class="p-minute-picker__minute"
        @click="setMinutes(option)"
      >
        <span ref="minuteElements" :data-minute="padMinutes(option)">{{ padMinutes(option) }}</span>
      </p-button>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { format } from 'date-fns'
  import { computed } from 'vue'
  import PButton from '@/components/Button'
  import { useScrollIntoViewOnMounted } from '@/compositions/useScrollIntoViewOnMounted'

  const props = defineProps<{
    modelValue: Date,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: Date): void,
  }>()

  const selectedDate = computed({
    get() {
      return props.modelValue
    },
    set(value: Date) {
      emits('update:modelValue', value)
    },
  })

  const minuteElements = useScrollIntoViewOnMounted(x => x.dataset.minute === minutes.value.toString())
  const minuteOptions = [...new Array(60).keys()]
  const minutes = computed(() => format(selectedDate.value, 'mm'))

  function setMinutes(minutes: number): void {
    const value = new Date(selectedDate.value)

    value.setMinutes(minutes)

    selectedDate.value = value
  }

  function padMinutes(minutes: number): string {
    return String(minutes).padStart(2, '0')
  }
</script>

<style>
.p-minute-picker { @apply
  flex
  flex-col
  py-1
  px-3
  gap-2
  overflow-y-auto
}

.p-minute-picker__minute { @apply
  justify-center
}
</style>