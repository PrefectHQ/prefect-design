<template>
  <div class="p-wizard">
    <p-card class="p-wizard__header">
      <PWizardHeaders
        :steps="steps"
        :loading="loading"
        :current-step-index="currentStepIndex"
      />
    </p-card>

    <p-card>
      <template v-for="(step, index) in steps" :key="index">
        <div v-show="index === currentStepIndex" class="p-wizard__step">
          <PWizardStep :step="step">
            <slot :name="getStepKey(step)" />
          </PWizardStep>
        </div>
      </template>

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
  import { computed, withDefaults } from 'vue'
  import { useWizard } from './compositions'
  import PWizardHeaders from './PWizardHeaders.vue'
  import PWizardStep from './PWizardStep.vue'
  import { WizardStep } from './types'
  import { getStepKey } from './utilities'

  const props = withDefaults(defineProps<{
    steps: WizardStep[],
    showCancel?: boolean,
    lastStepText?: string,
  }>(), {
    lastStepText: 'Submit',
  })

  const emits = defineEmits<{
    (event: 'cancel' | 'next' | 'previous' | 'submit'): void,
  }>()

  const { steps, currentStepIndex, loading, next, previous } = useWizard(props.steps)

  const isOnFirstStep = computed(() => currentStepIndex.value === 0)
  const isOnLastStep = computed(() => currentStepIndex.value === steps.value.length -1)

  const nextButtonText = computed(() => isOnLastStep.value ? props.lastStepText : 'Next')

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