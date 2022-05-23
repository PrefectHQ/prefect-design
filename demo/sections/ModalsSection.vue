<template>
  <Section heading="Modals">
    <p-button @click="showModal = true">
      Open Modal
    </p-button>


    <p-modal
      v-model:showModal="showModal"
    >
      <template #icon>
        <div>
          <p-icon
            icon="CakeIcon"
            class="mx-auto h-12 w-12 sm:mx-0 sm:h-10 sm:w-10"
          />
        </div>
      </template>

      <template #title>
        <h3>Modal title</h3>
      </template>

      <p class="text-sm text-gray-500">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in aliquam erat. Proin elit dui, tristique non consequat at, gravida ac lectus
      </p>

      <template #actions>
        <p-button class="w-full inline-flex justify-center sm:w-auto sm:text-sm" @click="showModal = false">
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