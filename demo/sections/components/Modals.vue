<template>
  <ComponentPage title="Modals" :demos="demos">
    <template #modals>
      <p-button @click="showModal = true">
        Open Modal
      </p-button>

      <p-modal v-model:showModal="showModal" title="Modal Title" icon="CakeIcon">
        <p class="text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in aliquam erat. Proin elit dui, tristique non consequat at, gravida ac lectus
        </p>

        <template #actions>
          <p-button primary @click="showModal = false">
            Submit
          </p-button>
        </template>
      </p-modal>
    </template>

    <template #long-content>
      <p-button @click="showLongContentModal = true">
        Open Modal
      </p-button>

      <p-modal v-model:showModal="showLongContentModal" title="Modal Title" icon="CakeIcon">
        <template v-for="i in 10" :key="i">
          <p class="text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in aliquam erat. Proin elit dui, tristique non consequat at, gravida ac lectus
          </p>
        </template>

        <template #actions>
          <p-button primary @click="showLongContentModal = false">
            Submit
          </p-button>
        </template>
      </p-modal>
    </template>

    <template #auto-close>
      <p-button @click="showAutoCloseModal = true">
        Open Modal
      </p-button>

      <p-modal v-model:showModal="showAutoCloseModal" title="Auto-Close Modal" icon="CakeIcon" auto-close>
        <p class="text-sm">
          Click on modal mask to automatically dismiss modal
        </p> :modelValue=

        <template #actions>
          <p-button primary @click="showAutoCloseModal = false">
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

  const demos = [
    { title: 'Modals' },
    { title: 'Auto Close' },
    { title: 'Long Content' },
  ]

  const showModal = ref(false)
  const showLongContentModal = ref(false)
  const showAutoCloseModal = ref(false)
</script>