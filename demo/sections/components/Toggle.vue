<template>
  <ComponentPage title="Toggle" :demos="[{ title: 'Toggle' }]">
    <template #description>
      This is where we add a short description of <p-code inline>
        p-toggle
      </p-code>. Describe the components intent, not hyper specific documentation that belongs on vitepress page.

      <DemoState v-model:state="exampleState" v-model:disabled="disabled" />
    </template>

    <template #toggle>
      <p-label label="Toggle">
        <div class="flex flex-col gap-2">
          <p-toggle v-model="exampleBoolean" :disabled="disabled" :state="exampleState" :append="exampleBoolean?.toString() ?? 'null'" />
          <p-toggle
            v-model="exampleSecondBoolean"
            class="color-toggle"
            :disabled="disabled"
            :state="exampleState"
            prepend="green"
            append="blue"
          />
        </div>
      </p-label>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { State } from '@/types'
  import { ref } from 'vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import DemoState from '@/demo/components/DemoState.vue'

  const exampleState = ref<State>()
  const disabled = ref(false)

  const exampleBoolean = ref<boolean | null>(null)
  const exampleSecondBoolean = ref(false)
</script>

<style>
.color-toggle .p-toggle__control:not(.p-toggle__control--checked) { @apply
    bg-green-600
    border-green-600
  }
</style>