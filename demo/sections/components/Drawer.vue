<template>
  <ComponentPage title="Drawer" :demos="demos">
    <template #description>
      <p-select v-model="placement" :options="placements" />
    </template>

    <template #basic>
      <p-button size="sm" @click="toggle('basic')">
        Open
      </p-button>

      <p-drawer v-model:open="drawers.basic" class="drawer__basic" :placement="placement">
        Basic drawer
      </p-drawer>
    </template>

    <template #advanced>
      <p-button size="sm" @click="toggle('advanced')">
        Open
      </p-button>

      <p-drawer v-model:open="drawers.advanced" :placement="placement" resizable>
        <p-navigation-bar class="drawer__navigation-bar">
          <template #leading>
            <p-heading :heading="5">
              Advanced drawer
            </p-heading>
          </template>

          <p-drawer v-model:open="drawers.nested" resizable :placement="placement">
            <p-navigation-bar class="drawer__navigation-bar">
              <template #leading>
                <p-heading :heading="5">
                  Nested drawer
                </p-heading>
              </template>

              <template #trailing>
                <p-button size="sm" class="my-2" @click="toggle('nestedBottom')">
                  Open nested
                </p-button>
              </template>

              <p-drawer v-model:open="drawers.nestedBottom" resizable placement="bottom">
                <p-navigation-bar horizontal class="drawer__navigation-bar">
                  <template #leading>
                    <p-heading :heading="5">
                      Nested drawer
                    </p-heading>
                  </template>
                </p-navigation-bar>
              </p-drawer>
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
  rounded-l-2xl
}

.p-drawer--left .drawer__navigation-bar { @apply
  rounded-r-2xl
}

.p-drawer--top .drawer__navigation-bar { @apply
  rounded-b-xl
}

.p-drawer--bottom .drawer__navigation-bar { @apply
  rounded-t-xl
}
</style>