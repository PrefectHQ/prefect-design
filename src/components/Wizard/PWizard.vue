<template>
  <div class="p-wizard">
    <p-card class="p-wizard__header">
      <template v-for="(step, index) in steps" :key="index">
        <PWizardStepHeader
          :step="step"
          :index="index"
          :current="index === currentStepIndex"
          :loading="loading && index === currentStepIndex"
          :complete="index < currentStepIndex"
          class="p-wizard__header-step"
        >
          <slot :name="`${getStepKey(step)}-heading`" />
        </PWizardStepHeader>
      </template>
    </p-card>

    <p-card>
      <div v-if="currentStep" class="p-wizard__step">
        <PWizardStep :step="currentStep">
          <slot :name="getStepKey(currentStep)" />
        </PWizardStep>
      </div>

      <div class="p-wizard__footer">
        <slot name="actions" :next-button-text="nextButtonText" :handle-next-button-click="handleNextButtonClick">
          <template v-if="showCancel">
            <p-button inset @click="emits('cancel')">
              Cancel
            </p-button>
          </template>
          <p-button secondary :disabled="isOnFirstStep" @click="handlePreviousButtonClick">
            Previous
          </p-button>
          <p-button primary :disabled="loading" @click="handleNextButtonClick">
            {{ nextButtonText }}
          </p-button>
        </slot>
      </div>
    </p-card>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useWizard } from './compositions'
  import PWizardStep from './PWizardStep.vue'
  import PWizardStepHeader from './PWizardStepHeader.vue'
  import { Step } from './types'
  import { getStepKey } from './utilities'

  const props = defineProps<{
    steps: Step[],
    showCancel?: boolean,
    lastStepText?: string,
  }>()

  const emits = defineEmits<{
    (event: 'cancel' | 'next' | 'previous' | 'submit'): void,
  }>()

  const { steps, currentStep, currentStepIndex, loading, next, previous } = useWizard(props.steps)

  const isOnFirstStep = computed(() => currentStepIndex.value === 0)
  const isOnLastStep = computed(() => currentStepIndex.value === steps.value.length -1)

  const nextButtonText = computed(() => isOnLastStep.value ? props.lastStepText ?? 'Submit' : 'Next')

  function handlePreviousButtonClick(): void {
    previous()

    emits('previous')
  }

  function handleNextButtonClick(): void {
    if (isOnLastStep.value) {
      emits('submit')
    } else {
      next()

      emits('next')
    }
  }
</script>

<style>
.p-wizard { @apply
  flex
  flex-col
  gap-8
}

.p-wizard__header { @apply
  flex
  flex-wrap
  justify-around
  gap-2
}

.p-wizard__step { @apply
  py-4
}

.p-wizard__footer { @apply
  flex
  flex-wrap
  gap-2
  justify-end
}
</style>