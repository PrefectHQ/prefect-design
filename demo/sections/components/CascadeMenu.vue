<template>
  <ComponentPage title="Cascade Menu" :demos="[{ title: 'Cascade Menu' }]">
    <template #description>
      This is where we add a short description of <p-code inline>
        p-cascade-menu
      </p-code>. Describe the components intent, not hyper specific documentation that belongs on vitepress page.
    </template>

    <template #cascade-menu>
      <div>{{ selected }}</div>
      <PCascadeMenu v-model:selected="selected" :data="data" />
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { PCascadeMenu } from '@/components/CascadeMenu'
  import { CascadeData } from '@/utilities'
  import {ref} from 'vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const selected = ref([])

  const data: CascadeData[] = [
    {
      label: 'Item 1',
      value: 1,
      children: [
        {
          label: 'Item 1.1',
          value: 11,
        },
        {
          label: 'Item 1.2',
          value: 12,
        },
        {
          label: 'Item 1.3',
          value: 13,
        }
      ],
    },
    {
      label: 'Item 2',
      value: 2,
      children: [
        {
          label: 'Item 2.1',
          value: 21,
        },
        {
          label: 'Item 2.2',
          value: 22,
        },
        {
          label: 'Item 2.3',
          value: 23,
        },
        {
          label: 'Item 2.4',
          value: 24,
        }
      ],
    },
    {
      label: 'Item 3',
      value: 3,
      children: [
        {
          label: 'Item 3.1',
          value: 31,
        },
        {
          label: 'Item 3.2',
          value: 32,
        },
        {
          label: 'Item 3.3',
          value: 33,
        }
      ],
    },
  ]
</script>