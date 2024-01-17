<template>
  <PLabel class="p-date-time-input-group">
    <template #label>
      <div class="p-date-time-input__header">
        {{ label }}
        <PButton small class="ml-auto" @click="setToTodayOrNow">
          {{ nowOrTodayLabel }}
        </PButton>
      </div>
    </template>

    <PContent secondary>
      <PNativeDateInput v-model="startDate" disable-picker />

      <template v-if="showTime">
        <PNativeTimeInput v-model="startTime" disable-picker />
      </template>
    </PContent>
  </PLabel>
</template>

<script lang="ts" setup>
  import { startOfMinute, startOfToday } from 'date-fns'
  import { computed } from 'vue'
  import PButton from '@/components/Button/PButton.vue'
  import PContent from '@/components/Content/PContent.vue'
  import PLabel from '@/components/Label/PLabel.vue'
  import PNativeDateInput from '@/components/NativeDateInput/PNativeDateInput.vue'
  import PNativeTimeInput from '@/components/NativeTimeInput/PNativeTimeInput.vue'

  const props = defineProps<{
    modelValue: Date | null | undefined,
    label: string,
    showTime?: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value: Date | null): void,
  }>()

  const startDate = computed({
    get() {
      return props.modelValue ?? null
    },
    set(value) {
      emit('update:modelValue', value)
    },
  })

  const startTime = computed({
    get() {
      return props.modelValue ?? null
    },
    set(value) {
      if (!value) {
        return
      }

      emit('update:modelValue', value)
    },
  })
  const nowOrTodayLabel = computed(() => props.showTime ? 'Now' : 'Today')

  function setToTodayOrNow(): void {
    if (props.showTime) {
      emit('update:modelValue', startOfMinute(new Date()))
      return
    }

    emit('update:modelValue', startOfToday())
  }
</script>

<style>
.p-date-time-input__header { @apply
  flex
  gap-1
  items-center
  w-full
}

.p-date-time-input-group .p-label__label { @apply
  w-full
}
</style>