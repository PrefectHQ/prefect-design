<template>
  <ComponentPage title="Modals" :demos="[{ title: 'Modals' }]">
    <template #description>
      This is where we add a short description of <p-code>p-modals</p-code>. Describe the components intent, not hyper specific documentation that belongs on vitepress page.
    </template>

    <template #modals>
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
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const showModal = ref(false)
</script>