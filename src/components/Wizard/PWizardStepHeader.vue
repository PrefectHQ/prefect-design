<template>
  <div class="p-wizard-step-header" :class="classes">
    <div class="p-wizard-step-header__index">
      <template v-if="complete">
        <PIcon icon="CheckIcon" />
      </template>
      <template v-else-if="loading">
        <PLoadingIcon />
      </template>
      <template v-else>
        {{ paddedIndex }}
      </template>
    </div>
    <div class="p-wizard-step-header__title">
      <slot :title="step.title">
        {{ step.title }}
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import PIcon from '@/components/Icon/PIcon.vue'
  import PLoadingIcon from '@/components/LoadingIcon/PLoadingIcon.vue'
  import { WizardStep } from '@/types/wizard'

  const props = defineProps<{
    step: WizardStep,
    index: number,
    current: boolean,
    loading: boolean,
    complete: boolean,
  }>()

  const classes = computed(() => ({
    'p-wizard-step-header--current': props.current,
    'p-wizard-step-header--loading': props.loading,
    'p-wizard-step-header--complete': props.complete,
  }))

  const paddedIndex = computed(() => String(props.index + 1).padStart(2, '0'))
</script>

<style>
.p-wizard-step-header { @apply
  inline-flex
  items-center
  gap-4
  text-subdued
}

.p-wizard-step-header__index { @apply
  relative
  flex
  items-center
  justify-center
  rounded-full
  h-12
  w-12
  flex-shrink-0
  border-2
  border-current
}

.p-wizard-step-header--current { @apply
  text-selected
}
</style>