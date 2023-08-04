<template>
  <div class="p-wizard">
    <PCard class="p-wizard__header">
      <PWizardHeaders
        :steps="steps"
        :loading="loading"
        :current-step-index="currentStepIndex"
      />
    </PCard>

    <PCard>
      <slot name="before-steps" />

      <template v-for="(step, index) in steps" :key="index">
        <div v-show="index === currentStepIndex" class="p-wizard__step">
          <PWizardStep :step="step">
            <slot :name="getStepKey(step)" />
          </PWizardStep>
        </div>
      </template>

      <slot name="after-steps" />

      <div class="p-wizard__footer">
        <slot name="actions" :next-button-text="nextButtonText" :handle-next-button-click="handleNextButtonClick">
          <template v-if="showCancel">
            <p-button @click="emit('cancel')">
              Cancel
            </p-button>
          </template>
          <p-button :disabled="isOnFirstStep" @click="handlePreviousButtonClick">
            Previous
          </p-button>
          <p-button primary :loading="loading" @click="handleNextButtonClick">
            {{ nextButtonText }}
          </p-button>
        </slot>
      </div>
    </PCard>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import PButton from '@/components/Button/PButton.vue'
  import PCard from '@/components/Card/PCard.vue'
  import PWizardHeaders from '@/components/Wizard/PWizardHeaders.vue'
  import PWizardStep from '@/components/Wizard/PWizardStep.vue'
  import { useWizard } from '@/compositions/wizard'
  import { WizardStep } from '@/types/wizard'
  import { getStepKey } from '@/utilities/wizard'

  const props = withDefaults(defineProps<{
    steps: WizardStep[],
    showCancel?: boolean,
    lastStepText?: string,
  }>(), {
    lastStepText: 'Submit',
  })

  const emit = defineEmits<{
    (event: 'cancel' | 'next' | 'previous' | 'submit'): void,
  }>()

  const {
    steps,
    currentStepIndex,
    currentStep,
    loading,
    next,
    previous,
    goto,
    getStepIndex,
    getStep,
    setStep,
    isValid,
  } = useWizard(props.steps)

  defineExpose({
    steps,
    currentStepIndex,
    currentStep,
    loading,
    next,
    previous,
    goto,
    getStepIndex,
    getStep,
    setStep,
    isValid,
    setLoading,
  })

  const isOnFirstStep = computed(() => currentStepIndex.value === 0)
  const isOnLastStep = computed(() => currentStepIndex.value === steps.value.length - 1)

  const nextButtonText = computed(() => isOnLastStep.value ? props.lastStepText : 'Next')

  async function handlePreviousButtonClick(): Promise<void> {
    const { success } = await previous()

    if (success) {
      emit('previous')
    }
  }

  async function handleNextButtonClick(): Promise<void> {
    const last = isOnLastStep.value
    const { success } = await next()

    if (success) {
      emit('next')

      if (last) {
        emit('submit')
      }
    }
  }

  function setLoading(value: boolean): void {
    loading.value = value
  }
</script>

<style>
.p-wizard { @apply
  flex
  flex-col
  gap-8
}

.p-wizard__step { @apply
  pt-4
  pb-6
}

.p-wizard__footer { @apply
  flex
  flex-wrap
  gap-2
  justify-end
}
</style>