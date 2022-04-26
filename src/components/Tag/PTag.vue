<template>
  <span
    class="inline-flex items-center rounded-full bg-white text-black"
    :class="classes"
  >
    <div v-if="$slots.icon">
      <slot name="icon" />
    </div>
    <slot />
  </span>
</template>

<script lang="ts" setup>
  import { computed, withDefaults } from 'vue'

  const props = withDefaults(defineProps<{
    disabled?: boolean,

    size?: string,
    flat?: boolean,
    outlined?: boolean,
  }>(), {
    size: 'sm',
  })
  const classes = computed(() => ({
    'p-tag--disabled': props.disabled,
    'p-tag--flat': props.flat,
    'p-tag--outlined': props.outlined,

    'p-tag--sm': props.size === 'sm',
    'p-tag--lg': props.size === 'lg',
  }))
</script>

<style>
.p-tag--outlined {@apply
  border-2
  bg-transparent
}
.p-tag--flat {@apply
  text-sm
  font-semibold
  bg-transparent
}

.p-tag--sm{ @apply
 px-2.5
 py-0.5
 text-xs
}

.p-tag--lg{ @apply
  px-3
  py-0.5
  text-sm
}

.p-tag--disabled { @apply
  cursor-not-allowed
  opacity-50
}
</style>