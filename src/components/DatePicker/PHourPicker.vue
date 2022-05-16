<template>
  <div class="p-hour-picker">
    <template v-for="option in hourOptions" :key="option">
      <p-button
        size="sm"
        :flat="hours !== option.toString()"
        class="p-hour-picker__hour"
        @click="updateSelectedDate(option)"
      >
        <span ref="hourElements" :data-hour="option">{{ option }}</span>
      </p-button>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { format, setHours } from 'date-fns'
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

  const hourElements = useScrollIntoViewOnMounted(x => x.dataset.hour === hours.value.toString())
  const hourOptions = [...new Array(12).keys()].map(index => index + 1)
  const hours = computed(() => format(selectedDate.value, 'h'))
  const meridiem = computed(() => format(selectedDate.value, 'a'))

  function updateSelectedDate(hours: number): void {
    const selectedHours = hours % 12

    if (meridiem.value === 'AM') {
      selectedDate.value = setHours(selectedDate.value, selectedHours)
    } else {
      selectedDate.value = setHours(selectedDate.value, selectedHours + 12)
    }
  }
</script>

<style>
.p-hour-picker { @apply
  flex
  flex-col
  py-1
  px-3
  gap-2
  overflow-y-auto
}

.p-hour-picker__hour { @apply
  justify-center
}
</style>