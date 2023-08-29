<template>
  <ComponentPage title="Drawer" :demos="demos">
    <template #description>
      <p-select v-model="placement" :options="placements" />
    </template>

    <template #basic>
      <p-button @click="toggle('basic')">
        Open
      </p-button>

      <p-drawer v-model:open="drawers.basic" class="drawer__basic" :placement="placement">
        Basic drawer
      </p-drawer>
    </template>

    <template #advanced>
      <p-button @click="toggle('advanced')">
        Open
      </p-button>

      <p-drawer v-model:open="drawers.advanced" :placement="placement" resizable>
        <p-navigation-bar class="drawer__navigation-bar p-background">
          <template #prepend>
            <p-heading :heading="5">
              Advanced drawer
            </p-heading>
          </template>

          <p-drawer v-model:open="drawers.nested" resizable :placement="placement" class="p-background">
            <p-navigation-bar class="drawer__navigation-bar">
              <template #prepend>
                <p-heading :heading="5">
                  Nested drawer
                </p-heading>
              </template>

              <template #append>
                <p-button class="my-2" @click="toggle('nestedBottom')">
                  Open nested
                </p-button>
              </template>

              <p-drawer v-model:open="drawers.nestedBottom" resizable placement="bottom" class="p-background">
                <p-navigation-bar layout="horizontal" class="drawer__navigation-bar">
                  <template #prepend>
                    <p-heading :heading="5">
                      Nested drawer
                    </p-heading>
                  </template>
                </p-navigation-bar>
              </p-drawer>
            </p-navigation-bar>
          </p-drawer>

          <template #append>
            <p-button class="my-2" @click="toggle('nested')">
              Open nested
            </p-button>
          </template>
        </p-navigation-bar>
      </p-drawer>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { DrawerPlacement } from '@/types'
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

  const placement = ref<DrawerPlacement>('left')
  const placements: DrawerPlacement[] = ['left', 'right', 'top', 'bottom']

  const drawers = reactive({
    basic: false,
    nested: false,
    nestedBottom: false,
    advanced: false,
  })

  const toggle = (name: keyof typeof drawers): void => {
    drawers[name] = !drawers[name]
  }
</script>

<style>
.drawer__navigation-bar { @apply
  h-full
  rounded-none
  w-full
}

.drawer__basic {@apply
  text-white
  bg-green-500
}

.p-drawer--right .drawer__navigation-bar { @apply
  rounded-l-default
}

.p-drawer--left .drawer__navigation-bar { @apply
  rounded-r-default
}

.p-drawer--top .drawer__navigation-bar { @apply
  rounded-b-default
}

.p-drawer--bottom .drawer__navigation-bar { @apply
  rounded-t-default
}
</style>