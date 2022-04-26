<template>
  <button type="button" class="p-button" :class="classes">
    <div v-if="$slots.icon" class="p-button__icon">
      <slot name="icon" />
    </div>
    <slot />
  </button>
</template>

<script lang="ts" setup>
  import { computed, withDefaults } from 'vue'
  import { Size } from '@/types/size'

  const props = withDefaults(defineProps<{
    secondary?: boolean,
    inset?: boolean,
    rounded?: boolean,
    size?: Size,
  }>(), {
    size: 'md',
  })

  const classes = computed(() => ({
    'p-button--primary': !props.secondary && !props.inset,
    'p-button--secondary': props.secondary && !props.inset,
    'p-button--inset': props.inset,
    'p-button--rounded': props.rounded,
    'p-button-xs': props.size === 'xs',
    'p-button-sm': props.size === 'sm',
    'p-button-md': props.size === 'md',
    'p-button-lg': props.size === 'lg',
    'p-button-xl': props.size === 'xl',
  }))
</script>

<style>
.p-button { @apply
  border
  border-transparent
  focus:outline-none
  focus:ring-2
  focus:ring-offset-2
  font-medium
  gap-1
  inline-flex
  items-center
  rounded-md
  shadow-sm
}

.p-button--primary { @apply
  text-white
  bg-prefect-600
  focus:ring-prefect-600
  hover:bg-prefect-700
}

.p-button--secondary { @apply
  text-prefect-600
  bg-prefect-100
  focus:ring-prefect-100
  hover:bg-prefect-200
}

.p-button--inset { @apply
  border
  border-gray-300
  focus:border-transparent
  text-gray-500
  bg-white
  focus:ring-prefect-600
  hover:bg-gray-300
}

.p-button-xs { @apply
  text-xs
  px-2
  py-1
}
.p-button-xs .p-button__icon { @apply
  h-3
  w-3
}

.p-button-sm { @apply
  text-sm
  px-3
  py-1
}
.p-button-sm .p-button__icon { @apply
  h-3.5
  w-3.5
}

.p-button-md { @apply
  text-base
  px-4
  py-2
}
.p-button-md .p-button__icon { @apply
  h-4
  w-4
}

.p-button-lg { @apply
  text-lg
  px-5
  py-2
}
.p-button-lg .p-button__icon { @apply
  h-5
  w-5
}

.p-button-xl { @apply
  text-xl
  px-6
  py-3
}
.p-button-xl .p-button__icon { @apply
  h-6
  w-6
}

.p-button--rounded { @apply
  rounded-full
  p-3
}
</style>