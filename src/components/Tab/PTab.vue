<template>
  <div class="p-tab" :class="classes.disabled">
    <div class="p-tab__div" :class="classes.active">
      <button type="button" class="p-tab__btn">
        <slot />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  const props = defineProps<{
    active?: boolean,
    disabled?: boolean,
  }>()

  const classes = computed(() => ({
    active: {
      'p-tab__btn-active': props.active,
    },
    disabled: {
      'p-tab__btn-disabled': props.disabled,
    },

  }))
</script>

<style>
.p-tab { @apply
  inline-flex
}
.p-tab__div {@apply
  py-4
  border-b-2
border-slate-200
}

.p-tab__div:not(.p-tab__btn-active) {@apply
  hover:border-gray-300
  text-gray-500
  hover:text-gray-600
}

.p-tab__btn { @apply
  px-10
  text-center
  font-medium
  text-sm
  cursor-pointer
  inline-flex
  items-center
}

.p-tab__btn-active { @apply
 border-prefect-600
 text-prefect-600
}

.p-tab__btn-disabled { @apply
  pointer-events-none
  opacity-50
}
</style>