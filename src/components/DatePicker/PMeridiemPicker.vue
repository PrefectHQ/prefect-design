<template>
  <div class="p-meridiem-picker">
    <template v-for="option in meridiemOptions" :key="option">
      <p-button
        size="sm"
        :flat="meridiem !== option"
        class="p-meridiem-picker__meridiem"
        @click="updateSelectedDate(option)"
      >
        <span ref="meridiemElements" :data-meridiem="option">{{ option }}</span>
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

  const meridiemElements = useScrollIntoViewOnMounted(x => x.dataset.meridiem === meridiem.value.toString())
  const meridiemOptions = ['AM', 'PM'] as const
  const meridiem = computed(() => format(selectedDate.value, 'a'))

  function updateSelectedDate(meridiem: typeof meridiemOptions[number]): void {
    const currentMeridiem = format(selectedDate.value, 'a')
    const currentHours = selectedDate.value.getHours()

    if (meridiem === 'AM' && currentMeridiem !== 'AM') {
      selectedDate.value = setHours(selectedDate.value, currentHours - 12)
    }

    if (meridiem === 'PM' && currentMeridiem !== 'PM') {
      selectedDate.value = setHours(selectedDate.value, currentHours + 12)
    }
  }
</script>

<style>
.p-meridiem-picker { @apply
  flex
  flex-col
  py-1
  px-3
  gap-2
  overflow-y-auto
  justify-center
}

.p-meridiem-picker__meridiem { @apply
  justify-center
}
</style>