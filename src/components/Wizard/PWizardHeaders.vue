<template>
  <div class="p-wizard-headers">
    <template v-for="(step, index) in steps" :key="index">
      <span class="p-wizard-headers__heading">
        <PWizardStepHeader
          :step="step"
          :index="index"
          :current="index === currentStepIndex"
          :loading="loading && index === currentStepIndex"
          :complete="index < currentStepIndex"
        >
          <template #default="data">
            <slot :name="`${getStepKey(step)}-heading`" v-bind="data" />
          </template>
        </PWizardStepHeader>
      </span>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import PWizardStepHeader from './PWizardStepHeader.vue'
  import { WizardStep } from './types'
  import { getStepKey } from './utilities'

  defineProps<{
    steps: WizardStep[],
    currentStepIndex: number,
    loading: boolean,
  }>()
</script>

<style>
.p-wizard-headers { @apply
  flex
  flex-wrap
  justify-around
  items-start
  gap-2
}

.p-wizard-headers--wrapped { @apply
  justify-start
  flex-col
}
</style>