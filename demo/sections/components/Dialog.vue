<template>
  <ComponentPage title="Dialog" :demos="[{ title: 'Dialog' }]">
    <template #dialog>
      <p-dialog v-model:open="open" auto-close modal>
        <p-card>
          hello world <p-button size="sm" @click="open = false">
            close
          </p-button>
        </p-card>
      </p-dialog>

      <p-button @click="open = true">
        Open
      </p-button>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const open = ref(false)
</script>