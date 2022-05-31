<template>
  <button ref="el" type="button" class="p-button" :class="classes" :disabled="disabled || loading">
    <div class="p-button__content">
      <template v-if="icon">
        <p-icon :icon="icon" class="p-button__icon" />
      </template>
      <slot />
    </div>
    <template v-if="loading">
      <div class="p-button__loading-icon">
        <p-icon icon="RefreshIcon" />
      </div>
    </template>
  </button>
</template>

<script lang="ts" setup>
  import { computed, useSlots, PropType, ref } from 'vue'
  import PIcon from '@/components/Icon/PIcon.vue'
  import { Icon } from '@/types/icon'
  import { Size } from '@/types/size'

  type ButtonClass = 'primary' | 'secondary' | 'inset' | 'flat'

  const props = defineProps({
    secondary: Boolean,
    inset: Boolean,
    flat: Boolean,
    rounded: Boolean,
    disabled: Boolean,
    loading: Boolean,
    size: {
      type: String as PropType<Size>,
      default: 'md',
    },
    icon: {
      type: String as PropType<Icon>,
      default: undefined,
    },
  })

  const slots = useSlots()
  const el = ref<HTMLButtonElement>()

  defineExpose({
    el,
  })

  const classes = computed(() => ({
    'p-button--primary': buttonClass.value === 'primary',
    'p-button--secondary': buttonClass.value === 'secondary',
    'p-button--inset': buttonClass.value === 'inset',
    'p-button--flat': buttonClass.value === 'flat',
    'p-button--rounded': props.rounded,
    'p-button--equal-padding': props.icon && !slots.default,
    'p-button-xs': props.size === 'xs',
    'p-button-sm': props.size === 'sm',
    'p-button-md': props.size === 'md',
    'p-button-lg': props.size === 'lg',
    'p-button-xl': props.size === 'xl',
    'p-button--disabled': props.disabled || props.loading,
    'p-button--loading': props.loading,
  }))

  const buttonClass = computed<ButtonClass>(() => {
    if (props.flat) {
      return 'flat'
    }

    if (props.inset) {
      return 'inset'
    }

    if (props.secondary) {
      return 'secondary'
    }

    return 'primary'
  })
</script>

<style>
.p-button { @apply
  relative
  border
  border-transparent
  focus:outline-none
  focus:ring-2
  focus:ring-offset-2
  font-medium
  inline-flex
  items-center
  rounded-md
  shadow-sm
}

.p-button__content { @apply
  gap-1
  inline-flex
  items-center
}

.p-button--primary { @apply
  text-white
  bg-prefect-600
  focus:ring-prefect-600
}
.p-button--primary:not(.p-button--disabled) { @apply
  hover:bg-prefect-700
}

.p-button--secondary { @apply
  text-prefect-600
  bg-prefect-100
  focus:ring-prefect-100
}
.p-button--secondary:not(.p-button--disabled) { @apply
  hover:bg-prefect-200
}

.p-button--inset { @apply
  border
  border-gray-300
  focus:border-transparent
  text-gray-500
  bg-white
  focus:ring-prefect-600
}
.p-button--inset:not(.p-button--disabled) { @apply
  hover:bg-gray-300
}

.p-button--flat { @apply
  border
  border-transparent
  focus:outline-none
  text-gray-700
  focus:ring-2
  focus:ring-offset-2
  focus:ring-prefect-600
  shadow-none
}
.p-button--flat:not(.p-button--disabled) { @apply
  hover:bg-gray-100
}

.p-button-xs { @apply
  text-xs
  px-2
  py-1
}
.p-button-xs .p-button__loading-icon,
.p-button-xs .p-button__icon { @apply
  h-3
  w-3
}
.p-button-xs.p-button--equal-padding { @apply
  p-2
}

.p-button-sm { @apply
  text-sm
  px-3
  py-1
}
.p-button-sm .p-button__loading-icon,
.p-button-sm .p-button__icon { @apply
  h-3.5
  w-3.5
}
.p-button-sm.p-button--equal-padding { @apply
  p-2.5
}

.p-button-md { @apply
  text-base
  px-4
  py-2
}
.p-button-md .p-button__loading-icon,
.p-button-md .p-button__icon { @apply
  h-4
  w-4
}
.p-button-md.p-button--equal-padding { @apply
  p-3
}

.p-button-lg { @apply
  text-lg
  px-5
  py-2
}
.p-button-lg .p-button__loading-icon,
.p-button-lg .p-button__icon { @apply
  h-5
  w-5
}
.p-button-lg.p-button--equal-padding { @apply
  p-3.5
}

.p-button-xl { @apply
  text-xl
  px-6
  py-3
}
.p-button-xl .p-button__loading-icon,
.p-button-xl .p-button__icon { @apply
  h-6
  w-6
}
.p-button-xl.p-button--equal-padding { @apply
  p-4
}

.p-button--rounded { @apply
  rounded-full
}

.p-button--disabled { @apply
  cursor-not-allowed
  opacity-50
}

.p-button--loading { @apply
  cursor-wait
}

.p-button--loading .p-button__content { @apply
  invisible
}

.p-button__loading-icon {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}

.p-button__loading-icon svg { @apply
  animate-spin
}
</style>