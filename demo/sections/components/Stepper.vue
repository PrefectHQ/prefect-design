<template>
  <ComponentPage title="Stepper" :demos="[{ title: 'Stepper' }]">
    <template #description>
      This is where we add a short description of <p-code>p-stepper</p-code>. Describe the components intent, not hyper specific documentation that belongs on vitepress page.
    </template>

    <template #stepper>
      <div class="stepper__basic-demo">
        <p-stepper v-model="value" :max="9" />
        <p-divider />
        <div class="stepper-basic__basic-range">
          <p-label label="Min Value">
            <p-number-input v-model="min" />
          </p-label>
          <p-label label="Max Value">
            <p-number-input v-model="max" />
          </p-label>
        </div>
        {{ { value } }}
        <p-button
          inset
          class="stepper__basic-reset"
          size="xs"
          :disabled="value === null"
          @click="value = null"
        >
          Reset Value
        </p-button>
      </div>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const min = ref<number | null>(null)
  const max = ref<number | null>(null)
  const value = ref<number | null>(null)
</script>

<style>
.stepper__basic-demo { @apply
  flex
  flex-col
  gap-4
}

.stepper-basic__basic-range { @apply
  flex
  gap-2
}

.stepper__basic-reset { @apply
  self-start
}
</style>