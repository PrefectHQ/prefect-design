<template>
  <div class="p-wizard-step-header" :class="classes">
    <div class="p-wizard-step-header__index">
      <template v-if="complete">
        <p-icon icon="CheckIcon" />
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
  import { Step } from './types'
  import { PLoadingIcon } from '@/components/LoadingIcon'

  const props = defineProps<{
    step: Step,
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

  const paddedIndex = computed(() =>  String(props.index + 1).padStart(2, '0'))
</script>

<style>
.p-wizard-step-header { @apply
  inline-flex
  items-center
  gap-4
  text-gray-400
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
}

.p-wizard-step-header--current { @apply
  text-prefect-600
}

.p-wizard-step-header--current .p-wizard-step-header__index { @apply
  border-prefect-600
}

.p-wizard-step-header--loading .p-wizard-step-header__index,
.p-wizard-step-header--complete .p-wizard-step-header__index { @apply
  border-prefect-600
  bg-prefect-600
  text-white
}
</style>