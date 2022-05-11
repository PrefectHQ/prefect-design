<template>
  <div class="p-meridiem-picker">
    <template v-for="option in meridiemOptions" :key="option">
      <p-button
        size="sm"
        :inset="meridiem !== option"
        class="p-meridiem-picker__meridiem"
        @click="setMeridiem(option)"
      >
        <span ref="meridiemElements" :data-meridiem="option">{{ option }}</span>
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

  const meridiemElements = useScrollIntoViewOnMounted(x => x.dataset.meridiem === meridiem.value.toString())
  const meridiemOptions = ['AM', 'PM'] as const
  const meridiem = computed(() => format(selectedDate.value, 'a'))

  function setMeridiem(meridiem: typeof meridiemOptions[number]): void {
    const value = new Date(selectedDate.value)
    const currentMeridiem = format(value, 'a')

    if (meridiem === 'AM' && currentMeridiem !== 'AM') {
      value.setHours(value.getHours() - 12)
    }

    if (meridiem === 'PM' && currentMeridiem !== 'PM') {
      value.setHours(value.getHours() + 12)
    }

    selectedDate.value = value
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