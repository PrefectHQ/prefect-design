<template>
  <p-pop-over
    ref="popOver"
    :placement="[bottomRight, topRight]"
    class="p-date-input"
    :class="classes"
    :style="styles"
    auto-close
  >
    <template #target="{ toggle }">
      <div class="p-date-input__target">
        <p-native-date-input
          v-model="adjustedSelectedDate"
          class="p-date-input__native"
          v-bind="attrs"
          @keydown="handleTargetKeydown"
        />

        <span ref="toggleButtonElement" class="p-date-input__icon" @click="toggle">
          <p-icon icon="CalendarIcon" />
        </span>
      </div>
    </template>

    <p-date-picker
      v-model="adjustedSelectedDate"
      class="p-date-input__date-picker"
      :show-time="showTime"
      :clearable="clearable"
      :min="min"
      :max="max"
      v-bind="attrs"
      @click.stop
      @keydown="handleContentKeydown"
    />
  </p-pop-over>
</template>

<script lang="ts">
  import { computed, defineComponent, ref } from 'vue'

  export default defineComponent({
    name: 'PDateInput',
    expose: [],
    inheritAttrs: false,
  })
</script>

<script lang="ts" setup>
  import PDatePicker from '@/components/DatePicker'
  import PNativeDateInput from '@/components/NativeDateInput'
  import PPopOver from '@/components/PopOver/PPopOver.vue'
  import { useAttrsStylesAndClasses } from '@/compositions/attributes'
  import { useAdjustedDate, useUnadjustedDate } from '@/compositions/useAdjustedDate'
  import { keys } from '@/types'
  import { bottomRight, topRight } from '@/utilities/position'
  import { isAfter, isBefore } from 'date-fns'

  const props = defineProps<{
    // eslint-disable-next-line vue/no-unused-properties
    modelValue: Date | null | undefined,
    showTime?: boolean,
    clearable?: boolean,
    min?: Date | null | undefined,
    max?: Date | null | undefined,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: Date | null): void,
    (event: 'open' | 'close'): void,
  }>()

  const { classes, styles, attrs } = useAttrsStylesAndClasses()
  const toggleButtonElement = ref<HTMLSpanElement>()
  const popOver = ref<typeof PPopOver>()

  const selectedDate = computed({
    get() {
      return props.modelValue ?? null
    },
    set(value: Date | null) {
      if (value && props.min && isBefore(value, props.min)) {
        return emits('update:modelValue', props.min)
      }

      if (value && props.max && isAfter(value, props.max)) {
        return emits('update:modelValue', props.max)
      }

      emits('update:modelValue', value)
    },
  })

  const adjustedSelectedDate = computed({
    get() {
      console.log('adjustedSelectedDate', selectedDate.value)
      return selectedDate.value ? useAdjustedDate(selectedDate.value) : null
    },
    set(value: Date | null) {
      emits('update:modelValue', value ? useUnadjustedDate(value) : null)
    },
  })

  function isUsingNativeMode(): boolean {
    const style = window.getComputedStyle(toggleButtonElement.value!)

    return style.display === 'none'
  }

  function handleTargetKeydown(event: KeyboardEvent): void {
    if (isUsingNativeMode()) {
      return
    }

    switch (event.key) {
      case keys.space:
        popOver.value!.open()
        event.preventDefault()
        break
      case keys.escape:
        popOver.value!.close()
        event.preventDefault()
        break
      default:
        break
    }
  }

  function handleContentKeydown(event: KeyboardEvent): void {
    if (event.key === keys.escape && !isUsingNativeMode()) {
      popOver.value!.close()
      event.preventDefault()
    }
  }
</script>

<style>
.p-date-input__target { @apply
  relative
}

.p-date-input__icon { @apply
  absolute
  hidden
  inset-y-0
  right-0
  pr-3
  z-10
  items-center
}

.p-date-input__icon svg { @apply
  w-4
  h-4
}

.p-date-input__date-picker { @apply
  bg-white
  my-1
}

@media (hover: hover) {
  .p-date-input__icon { @apply
    flex
  }

  .p-date-input__native .p-native-date-input__icon,
  .p-date-input__native input[type="date"]::-webkit-calendar-picker-indicator { @apply
    hidden
  }
}
</style>