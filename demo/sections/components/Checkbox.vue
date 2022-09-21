<template>
  <ComponentPage
    title="Checkbox"
    :demos="[
      { title: 'Checkbox' },
      { title: 'Multiple' },
      { title: 'Label Slot' },
    ]"
  >
    <template #description>
      This is where we add a short description of <p-code>p-checkbox</p-code>. Describe the components intent, not hyper specific documentation that belongs on vitepress page.
    </template>

    <template #checkbox>
      <p-checkbox v-model="simple" label="A simple checkbox" />
      {{ simple }}
    </template>

    <template #multiple>
      <p-checkbox v-model="multiple" value="A" label="A" />
      <p-checkbox v-model="multiple" value="B" label="B" />
      <p-checkbox v-model="multiple" value="C" label="C" />
      {{ multiple }}
    </template>

    <template #label-slot>
      <p-checkbox v-model="slot">
        <template #label>
          Using the <span class="font-bold">label</span> slot
        </template>
      </p-checkbox>
      {{ simple }}
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const simple = ref(false)
  const slot = ref(false)
  const multiple = ref([])
</script>