<template>
  <ComponentPage
    title="Stepper"
    :demos="[
      { title: 'Min and Max Props' },
      { title: 'Step Size' },
      { title: 'Disabled' },
    ]"
  >
    <template #min-and-max-props>
      <div class="stepper__demo">
        <p-stepper
          v-model="minMaxValue"
          :min="min"
          :max="max"
        />
        <p-divider />
        <div class="stepper__demo-options">
          <p-label label="Min Value">
            <p-number-input v-model="min" />
          </p-label>
          <p-label label="Max Value">
            <p-number-input v-model="max" />
          </p-label>
        </div>
        {{ { minMaxValue } }}
        <p-button
          class="stepper__value-reset-button"
          :disabled="minMaxValue === null"
          @click="minMaxValue = null"
        >
          Reset Value
        </p-button>
      </div>
    </template>

    <template #step-size>
      <div class="stepper__demo">
        <p-stepper
          v-model="stepValue"
          :step="step"
        />
        <p-divider />
        <div class="stepper__demo-options">
          <p-label label="Step">
            <p-number-input v-model="step" />
          </p-label>
        </div>
        {{ { stepValue } }}
        <p-button
          class="stepper__value-reset-button"
          :disabled="stepValue === null"
          @click="stepValue = null"
        >
          Reset Value
        </p-button>
      </div>
    </template>

    <template #disabled>
      <div class="stepper__demo">
        <p-stepper
          :model-value="0"
          disabled
        />
      </div>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const min = ref<number | null>(null)
  const max = ref<number | null>(null)
  const step = ref<number>(0.25)

  const minMaxValue = ref<number | null>(null)
  const stepValue = ref<number | null>(null)
</script>

<style>
.stepper__demo { @apply
  flex
  flex-col
  justify-start
  gap-4
}

.stepper__demo .p-stepper {
  max-width: 120px;
}

.stepper__demo-options { @apply
  flex
  gap-2
}

.stepper__value-reset-button { @apply
  self-start
}
</style>