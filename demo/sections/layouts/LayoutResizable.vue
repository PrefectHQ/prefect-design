<template>
  <ComponentPage title="Resizable Layout" :demos="demos">
    <template #description>
      <p-select v-model="placement" :options="placements" />
    </template>

    <template #basic>
      <div class="layout-resizable__container">
        <p-layout-resizable :placement="placement" class="layout-resizable">
          <template #aside>
            <div class="layout-resizable__aside" />
          </template>

          <div class="layout-resizable__main" />
        </p-layout-resizable>
      </div>
    </template>

    <template #collapse-point>
      <div class="layout-resizable__container">
        <p-layout-resizable :placement="placement" :collapse-point="100" class="layout-resizable__collapsible">
          <template #aside="{ collapsed }">
            <div class="layout-resizable__aside" :class="{ [`layout-resizable__aside--collapsed-${placement}`]: collapsed }">
              {{ collapsed ? 'Collapsed' : 'Expanded' }}
            </div>
          </template>

          <div class="layout-resizable__main" />
        </p-layout-resizable>
      </div>
    </template>

    <template #advanced>
      <div class="layout-resizable__container">
        <p-layout-resizable :placement="placement" :collapse-point="collapsePointAdvanced" class="layout-resizable__advanced">
          <template #aside="{ collapsed, toggle }">
            <div class="layout-resizable__aside" :class="classes.aside(collapsed)">
              <div class="layout-resizable__aside-header">
                <p-icon class="context-sidebar__icon" icon="GoogleIcon" />
                <template v-if="!collapsed">
                  Google
                </template>
              </div>

              <div class="layout-resizable__aside-item" :class="{ 'layout-resizable__aside-item--collapsed': collapsed }">
                <p-icon icon="UserIcon" />
                <template v-if="!collapsed">
                  <span>Profile</span>
                </template>
              </div>

              <div class="layout-resizable__aside-item" :class="{ 'layout-resizable__aside-item--collapsed': collapsed }">
                <p-icon icon="AcademicCapIcon" />
                <template v-if="!collapsed">
                  <span>Education</span>
                </template>
              </div>

              <div class="layout-resizable__aside-item" :class="{ 'layout-resizable__aside-item--collapsed': collapsed }">
                <p-icon icon="BriefcaseIcon" />
                <template v-if="!collapsed">
                  <span>Career</span>
                </template>
              </div>


              <div class="layout-resizable__aside-footer">
                <p-button flat :icon="collapsed ? 'ArrowRightOnRectangleIcon' : 'ArrowLeftOnRectangleIcon'" @click="toggle" />
              </div>
            </div>
          </template>

          <div class="layout-resizable__main" />
        </p-layout-resizable>
      </div>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { LayoutResizablePlacement } from '@/types'
  import { computed, ref } from 'vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const demos = [
    { title: 'Basic' },
    { title: 'Collapse point', description: 'Collapse the aside when the cursor is below the collapse-point threshold.' },
    {
      title: 'Advanced',
    },
  ]

  const placement = ref<LayoutResizablePlacement>('left')
  const placements: LayoutResizablePlacement[] = ['left', 'right', 'top', 'bottom']

  const classes = computed(() => {
    return {
      aside: (collapsed: boolean) => {
        return {
          'layout-resizable__aside--collapsed': collapsed,
          [`layout-resizable__aside-${placement.value}`]: true,
          [`layout-resizable__aside--collapsed-${placement.value}`]: collapsed,
        }
      },
    }
  })

  const collapsePointAdvanced = computed(() => {
    switch (placement.value) {
      case 'left':
      case 'right':
        return 196
      case 'top':
      case 'bottom':
      default:
        return 100
    }
  })
</script>


<style>
.layout-resizable__collapsible,
.layout-resizable__advanced,
.layout-resizable {
  --p-layout-resizable-aside-size: 256px;
  --p-layout-resizable-aside-collapsed-size: 4rem;
  --p-layout-resizable-aside-max-size: 100%;
  --p-layout-resizable-aside-min-size: 0%;
}

.layout-resizable__container { @apply
  h-96
}

.layout-resizable,
.layout-resizable__main,
.layout-resizable__aside { @apply
  h-full
  w-full
}

.layout-resizable__main { @apply
  bg-blue-400
  dark:bg-blue-800
}

.layout-resizable__aside { @apply
  bg-blue-600
  text-blue-50
  text-ellipsis
  overflow-hidden
  p-2
}

.layout-resizable__collapsible {
  --p-layout-resizable-aside-min-size: 256px;
}

.layout-resizable__advanced {
  --p-layout-resizable-aside-min-size: 196px;
  --p-layout-resizable-aside-max-size: 512px;
}

.layout-resizable__advanced .layout-resizable__aside { @apply
  text-slate-50
  flex
}

.layout-resizable__aside-top,
.layout-resizable__aside-bottom { @apply
  flex-row
}

.layout-resizable__aside-left,
.layout-resizable__aside-right { @apply
  flex-col
}

.layout-resizable__aside-header,
.layout-resizable__aside-footer,
.layout-resizable__aside-item { @apply
  flex
  items-center
  p-4
  gap-4
  justify-start
}

.layout-resizable__aside-item--collapsed { @apply
  justify-center
}

.layout-resizable__aside-left  .layout-resizable__aside-footer,
.layout-resizable__aside-right  .layout-resizable__aside-footer { @apply
  mt-auto
  ml-0
}

.layout-resizable__aside-top  .layout-resizable__aside-footer,
.layout-resizable__aside-bottom  .layout-resizable__aside-footer { @apply
  mt-0
  ml-auto
}

.layout-resizable__aside--collapsed .layout-resizable__aside-header,
.layout-resizable__aside--collapsed .layout-resizable__aside-footer { @apply
  justify-center
  p-0
}

.layout-resizable__aside--collapsed-left .layout-resizable__aside-header,
.layout-resizable__aside--collapsed-right .layout-resizable__aside-header,
.layout-resizable__aside--collapsed-left .layout-resizable__aside-footer,
.layout-resizable__aside--collapsed-right .layout-resizable__aside-footer { @apply
  py-4
}

.layout-resizable__aside--collapsed-top .layout-resizable__aside-header,
.layout-resizable__aside--collapsed-bottom .layout-resizable__aside-header,
.layout-resizable__aside--collapsed-top .layout-resizable__aside-footer,
.layout-resizable__aside--collapsed-bottom .layout-resizable__aside-footer { @apply
  px-4
}
</style>

