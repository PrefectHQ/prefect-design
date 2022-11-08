<template>
  <ComponentPage
    title="Key Value"
    :demos="[
      { title: 'Basic' },
      { title: 'Using Slots' },
      { title: 'Empty Value' },
      { title: 'Empty Text Prop' },
      { title: 'Dates' },
    ]"
  >
    <template #description>
      This is where we add a short description of <p-code>p-key-value</p-code>. Describe the components intent, not hyper specific documentation that belongs on vitepress page.

      <p-checkbox v-model="alternate" label="use 'alternate' style" />
    </template>

    <template #basic>
      <p-key-value label="Flow Run ID" value="3fa85f64" :alternate="alternate" />
    </template>

    <template #using-slots>
      <p-key-value :alternate="alternate">
        <template #label>
          <div class="text-pink-400 uppercase">
            Created
          </div>
        </template>
        <template #value>
          {{ new Date().toISOString().slice(0, 10) }}
        </template>
      </p-key-value>
    </template>

    <template #empty-value>
      <p-key-value label="This should say 'None' below" :alternate="alternate" />
    </template>

    <template #empty-text-prop>
      <p-key-value label="This uses the empty-text prop" :alternate="alternate" empty-text="N/A" />
    </template>

    <template #dates>
      <p-key-value label="Displays a date" :value="dateValue" :alternate="alternate" />
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const alternate = ref(true)
  const dateValue = new Date()
</script>

<style>
.key-value-section__turtles {
  background-image: linear-gradient(to left, #E3331C, #EA9500, #4C9C23, #00AAE6, #995AA0);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>