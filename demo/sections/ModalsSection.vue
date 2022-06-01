<template>
  <Section heading="Modals">
    <p-button @click="showModal = true">
      Open Modal
    </p-button>

    <p-modal v-model:showModal="showModal" title="Modal Title" icon="CakeIcon">
      <p class="text-sm text-gray-500">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in aliquam erat. Proin elit dui, tristique non consequat at, gravida ac lectus
      </p>

      <template #actions>
        <p-button @click="showModal = false">
          Submit
        </p-button>
      </template>
    </p-modal>
  </Section>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import Section from '../components/Section.vue'

  const showModal = ref(false)
</script>