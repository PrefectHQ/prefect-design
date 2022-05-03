<template>
  <div>
    <p-button @click="showModal = true">
      Open Modal
    </p-button>


    <p-modal
      :show-modal="showModal"
      @close="showModal = false"
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
      <template #content>
        <div class="mt-2">
          <p class="text-sm text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in aliquam erat. Proin elit dui, tristique non consequat at, gravida ac lectus
          </p>
        </div>
      </template>
      <template #action-btn>
        <p-button class="w-full inline-flex justify-center sm:ml-3 sm:w-auto sm:text-sm">
          Submit
        </p-button>
      </template>
    </p-modal>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const showModal = ref(false)
</script>