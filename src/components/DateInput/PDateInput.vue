<template>
  <PPopOver
    ref="popOver"
    :placement="[bottomRight, topRight, bottomLeft, topLeft]"
    class="p-date-input"
    auto-close
    @open="handleOpenChange"
    @keydown="handleKeydown"
  >
    <template #target>
      <template v-if="media.hover">
        <slot v-bind="{ openPicker, closePicker, isOpen, disabled }">
          <PDateButton
            :date="adjustedSelectedDate"
            :class="classes.control"
            :disabled="disabled"
            @click="openPicker"
          />
        </slot>
      </template>
      <template v-else>
        <slot>
          <PNativeDateInput
            v-model="adjustedSelectedDate"
            class="p-date-input__native"
            v-bind="{ min, max, disabled }"
          />
        </slot>
      </template>
    </template>

    <PDatePicker
      v-model="adjustedSelectedDate"
      class="p-date-input__date-picker"
      :show-time="showTime"
      :clearable="clearable"
      :min="min"
      :max="max"
      @click.stop
      @keydown="closeOnEscape"
    >
      <template v-for="(index, name) in $slots" #[name]="data">
        <slot :name="name" v-bind="data" />
      </template>
    </PDatePicker>
  </PPopOver>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue'
  import PDateButton from '@/components/DateInput/PDateButton.vue'
  import PDatePicker from '@/components/DatePicker/PDatePicker.vue'
  import PNativeDateInput from '@/components/NativeDateInput/PNativeDateInput.vue'
  import PPopOver from '@/components/PopOver/PPopOver.vue'
  import { useAdjustedDate, useUnadjustedDate } from '@/compositions/useAdjustedDate'
  import { keys } from '@/types'
  import { keepDateInRange } from '@/utilities/dates'
  import { media } from '@/utilities/media'
  import { bottomRight, topRight, bottomLeft, topLeft } from '@/utilities/position'

  const props = defineProps<{
    modelValue: Date | null | undefined,
    showTime?: boolean,
    clearable?: boolean,
    disabled?: boolean,
    min?: Date | null | undefined,
    max?: Date | null | undefined,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: Date | null): void,
    (event: 'open' | 'close'): void,
  }>()

  const popOver = ref<typeof PPopOver>()

  const selectedDate = computed({
    get() {
      return props.modelValue ?? null
    },
    set(value: Date | null) {
      emits('update:modelValue', keepDateInRange(value, { min: props.min, max: props.max }))
    },
  })

  const adjustedSelectedDate = computed({
    get() {
      return selectedDate.value ? useAdjustedDate(selectedDate.value) : null
    },
    set(value: Date | null) {
      emits('update:modelValue', value ? useUnadjustedDate(value) : null)
    },
  })

  const isOpen = computed(() => popOver.value?.visible ?? false)

  const classes = computed(() => ({
    control:
      {
        'p-date-input--open': isOpen.value,
      },
  }))

  function openPicker(): void {
    if (!isOpen.value && !props.disabled) {
      popOver.value!.open()
    }
  }

  function closePicker(): void {
    if (isOpen.value) {
      popOver.value!.close()
    }
  }

  function closeOnEscape(event: KeyboardEvent): void {
    if (media.hover && event.key === keys.escape) {
      closePicker()
      event.preventDefault()
    }
  }

  function handleOpenChange(open: boolean): void {
    if (open) {
      emits('open')
    } else {
      emits('close')
    }
  }

  function handleKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case keys.escape:
      case keys.tab:
        closePicker()
        break
      case keys.space:
        if (!isOpen.value) {
          openPicker()
        }
        event.preventDefault()
        break
      default:
        break
    }
  }
</script>

<style>
.p-date-input__date-picker { @apply
  bg-white
  my-1
  shadow-lg
}

.p-date-input--open { @apply
  outline-none
  ring-1
  ring-prefect-500
  border-prefect-500
}
</style>