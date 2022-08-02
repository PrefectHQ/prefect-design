<template>
  <Section heading="Modals">
    <p-button @click="showModal = true">
      Open Modal
    </p-button>

    <p-modal
      v-model:showModal="showModal"
      class="modals-section__modal-1"
      :style="styles.modal1"
      title="Modal Title"
      icon="CakeIcon"
    >
      <p class="text-sm text-gray-500">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in aliquam erat. Proin elit dui, tristique non
        consequat at, gravida ac lectus
      </p>

      <p-select v-model="selectedHeight" :options="heightOptions" />
      <p-select v-model="selectedWidth" :options="widthOptions" />

      <template #actions>
        <p-button @click="showModal = false">
          Submit
        </p-button>
      </template>
    </p-modal>
  </Section>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import Section from '../components/Section.vue'

  const showModal = ref(false)

  const widthOptions = ['min-content', '16rem', '32rem', '50%', '100%', '100vw']
  const heightOptions = ['min-content', '32rem', '500px', '100vh']

  const selectedWidth = ref('min-content')
  const selectedHeight = ref('min-content')

  const styles = computed(() => {
    return {
      modal1: {
        height: selectedHeight.value,
        width: selectedWidth.value,
      },
    }
  })
</script>

<style>
.modals-section__modal-1 {
  max-height: calc(100vh - 2rem);
  max-width: calc(100vh - 2rem);
}
</style>