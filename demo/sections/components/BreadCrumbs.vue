<template>
  <ComponentPage title="Bread Crumbs" :demos="[{ title: 'Bread Crumbs' }]">
    <template #description>
      This is where we add a short description of <p-code>p-bread-crumbs</p-code>. Describe the components intent, not hyper specific documentation that belongs on vitepress page.
    </template>

    <template #bread-crumbs>
      <p-bread-crumbs :crumbs="crumbs" :class="wrap ? 'flex-wrap' : 'flex-nowrap'" />

      <p-checkbox v-model="wrap" label="wrap" />

      <div class="border mt-2 p-4">
        <p-form @submit="addCrumb">
          <p-label label="New Crumb Title">
            <p-text-input v-model="newCrumb.text" />
          </p-label>
          <p-checkbox v-model="newCrumb.link" label="make it a link" />
          <template #footer>
            <p-button secondary @click="crumbs = []">
              Remove all
            </p-button>
            <p-button type="submit">
              Add new crumb
            </p-button>
          </template>
        </p-form>
      </div>
    </template>
  </ComponentPage>
</template>

<script setup lang="ts">
  import { Crumb } from '@/types'
  import { ref } from 'vue'
  import ComponentPage from '../../components/ComponentPage.vue'

  const wrap = ref(false)
  const newCrumb = ref<{ link?: boolean, text?: string }>({})

  function addCrumb(): void {
    if (!newCrumb.value.text) {
      return
    }

    crumbs.value.push({
      to: newCrumb.value.link ? '#' : undefined,
      text: newCrumb.value.text,
    })

    newCrumb.value = {}
  }

  const crumbs = ref<Crumb[]>([
    { text: 'ETL', to: '#' },
    { text: 'hungry-hippo' },
  ])
</script>