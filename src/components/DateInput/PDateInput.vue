<template>
  <PPopOver
    ref="popOver"
    :placement="[bottomRight, topRight]"
    class="p-date-input"
    auto-close
    @open="handleOpenChange"
    @keydown="handleKeydown"
  >
    <template #target>
      <template v-if="media.hover">
        <PDateButton
          ref="buttonElement"
          :date="adjustedSelectedDate"
          :class="classes"
          :style="styles"
          v-bind="attrs"
          @click="openPicker"
        />
      </template>
      <template v-else>
        <PNativeDateInput
          v-model="adjustedSelectedDate"
          class="p-date-input__native"
          :min="min"
          :max="max"
          :class="classes"
          :style="styles"
          v-bind="attrs"
          @keydown="handleTargetKeydown"
        />
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
    />
  </PPopOver>
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
  import PDateButton from '@/components/DateInput/PDateButton.vue'
  import PDatePicker from '@/components/DatePicker'
  import PNativeDateInput from '@/components/NativeDateInput'
  import PPopOver from '@/components/PopOver/PPopOver.vue'
  import { useAttrsStylesAndClasses } from '@/compositions/attributes'
  import { useAdjustedDate, useUnadjustedDate } from '@/compositions/useAdjustedDate'
  import { keys } from '@/types'
  import { keepDateInRange } from '@/utilities/dates'
  import { media } from '@/utilities/media'
  import { bottomRight, topRight } from '@/utilities/position'

  const props = defineProps<{
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

  const { classes:attrClasses, styles, attrs } = useAttrsStylesAndClasses()
  const popOver = ref<typeof PPopOver>()
  const buttonElement = ref<typeof PDateButton>()
  const targetElement = computed(() => buttonElement.value?.el)

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
    control: {
      ...attrClasses,
      'p-date-input--open': isOpen.value,
    },
  }))

  function openPicker(): void {
    if (!isOpen.value) {
      popOver.value!.open()
    }
  }

  function closePicker(): void {
    if (isOpen.value) {
      popOver.value!.close()
    }
  }

  function handleTargetKeydown(event: KeyboardEvent): void {
    if (!media.hover) {
      return
    }

    switch (event.key) {
      case keys.space:
        openPicker()
        event.preventDefault()
        break
      case keys.escape:
        closePicker()
        event.preventDefault()
        break
      default:
        break
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
      targetElement.value?.focus()
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