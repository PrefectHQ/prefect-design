<template>
  <ComponentPage title="Drawer" :demos="demos">
    <template #description>
      <p-select v-model="position" :options="positions" />
    </template>

    <template #basic>
      <p-button @click="toggle('basic')">
        Open
      </p-button>

      <p-drawer v-model="drawers.basic" :position="position">
        Basic drawer
      </p-drawer>
    </template>

    <template #advanced>
      <p-button @click="toggle('advanced')">
        Open
      </p-button>

      <p-drawer v-model="drawers.advanced" :position="position">
        <p-navigation-bar>
          Advanced drawer
        </p-navigation-bar>
      </p-drawer>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const demos = [
    {
      title: 'Basic',
    },
    {
      title: 'Advanced',
    },
  ]

  const position = ref('left')
  const positions = ['left', 'right', 'top', 'bottom']

  const drawers = reactive({
    basic: false,
    advanced: false,
  })

  const toggle = (name: keyof typeof drawers): void => {
    drawers[name] = !drawers[name]
  }
</script>