<template>
  <ComponentPage title="Drawer" :demos="demos">
    <template #description>
      <p-select v-model="placement" :options="placements" />
    </template>

    <template #basic>
      <p-button size="sm" @click="toggle('basic')">
        Open
      </p-button>

      <p-drawer v-model="drawers.basic" :placement="placement">
        Basic drawer
      </p-drawer>
    </template>

    <template #advanced>
      <p-button size="sm" @click="toggle('advanced')">
        Open
      </p-button>

      <p-drawer v-model="drawers.advanced" :placement="placement" resizable>
        <p-navigation-bar class="drawer__navigation-bar">
          <template #leading>
            <p-heading :heading="5">
              Advanced drawer
            </p-heading>
          </template>

          <p-drawer v-model="drawers.nested" resizable :placement="placement">
            <p-navigation-bar class="drawer__navigation-bar">
              Nested drawer
            </p-navigation-bar>
          </p-drawer>

          <template #trailing>
            <p-button size="sm" class="my-2" @click="toggle('nested')">
              Open nested
            </p-button>
          </template>
        </p-navigation-bar>
      </p-drawer>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { PDrawerPlacement } from '@/components/Drawer/PDrawer.vue'
  import { reactive, ref } from 'vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const demos = [
    {
      title: 'Basic',
    },
    {
      title: 'Nested',
    },
    {
      title: 'Advanced',
    },
  ]

  const placement = ref<PDrawerPlacement>('left')
  const placements: PDrawerPlacement[] = ['left', 'right', 'top', 'bottom']

  const drawers = reactive({
    basic: false,
    nested: false,
    advanced: false,
  })

  const toggle = (name: keyof typeof drawers): void => {
    drawers[name] = !drawers[name]
  }
</script>

<style>
.drawer__navigation-bar { @apply
  w-full
}
</style>