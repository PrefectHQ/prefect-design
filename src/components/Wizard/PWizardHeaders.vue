<template>
  <div ref="container" class="p-wizard-headers" :class="classes.container">
    <template v-for="(step, index) in steps" :key="index">
      <span ref="children" class="p-wizard-headers__heading">
        <PWizardStepHeader
          :step="step"
          :index="index"
          :current="index === currentStepIndex"
          :loading="loading && index === currentStepIndex"
          :complete="index < wizard.furthestStepIndex.value"
          class="p-wizard-headers__step-header"
          :class="classes.stepHeader(index)"
          @click="handleStepHeaderClick(index)"
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
  import { useChildrenAreWrapped } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import PWizardStepHeader from '@/components/Wizard/PWizardStepHeader.vue'
  import { useWizard } from '@/compositions'
  import { WizardStep } from '@/types/wizard'
  import { getStepKey } from '@/utilities/wizard'

  const props = defineProps<{
    steps: WizardStep[],
    currentStepIndex: number,
    loading: boolean,
    nonlinear?: boolean,
  }>()

  const container = ref<HTMLDivElement>()
  const children = ref<HTMLSpanElement[]>([])
  const wrapped = useChildrenAreWrapped(children, container)

  const wizard = useWizard()

  function handleStepHeaderClick(index: number): void {
    if (!props.nonlinear && index > wizard.furthestStepIndex.value) {
      return
    }
    wizard.goto(index + 1)
  }

  const classes = computed(() => ({
    container: {
      'p-wizard-headers--wrapped': wrapped.value,
    },
    stepHeader: (index: number) => {
      return {
        'p-wizard-headers__step-header--interactive': !props.loading && (props.nonlinear || index < wizard.furthestStepIndex.value),
      }
    },
  }))
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

.p-wizard-headers__step-header { @apply
  cursor-default
}

.p-wizard-headers__step-header--interactive { @apply
  cursor-pointer
}
</style>