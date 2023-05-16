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
              {{ collapsed }}
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

              <p-divider />

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
                <div class="layout-resizable__aside-item" :class="{ 'layout-resizable__aside-item--collapsed': collapsed }">
                  <p-button :icon="collapsed ? 'ArrowRightOnRectangleIcon' : 'ArrowLeftOnRectangleIcon'" inset @click="toggle" />
                </div>
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
  import { PLayoutResizablePlacement } from '@/layouts/PLayoutResizable/PLayoutResizable.vue'
  import { computed, ref } from 'vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const demos = [
    { title: 'Basic' },
    { title: 'Collapse point', description: 'Collapse the aside when the cursor is below the collapse-point threshold.' },
    {
      title: 'Advanced',
    },
  ]

  const placement = ref<PLayoutResizablePlacement>('bottom')
  const placements: PLayoutResizablePlacement[] = ['left', 'right', 'top', 'bottom']

  const classes = computed(() => {
    return {
      aside: (collapsed: boolean) => {
        return {
          [`layout-resizable__aside--${collapsed ? 'collapsed-' : ''}${placement.value}`]: !!placement.value,
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
  bg-background-500
  dark:bg-background
}

.layout-resizable__aside { @apply
  bg-cyan-600
  text-foreground-50
  flex
  flex-col
}

.layout-resizable__collapsible {
  --p-layout-resizable-aside-min-size: 256px;
}

/* .layout-resizable__aside--collapsed-top,
.layout-resizable__aside--collapsed-bottom { @apply

} */

.layout-resizable__aside--collapsed-right,
.layout-resizable__aside--collapsed-left { @apply
  h-full
  w-16
}

.layout-resizable__aside--collapsed-top,
.layout-resizable__aside--collapsed-bottom { @apply
  h-16
  w-full
}

.layout-resizable__advanced {
  --p-layout-resizable-aside-min-size: 196px;
  --p-layout-resizable-aside-max-size: 512px;
}

.layout-resizable__advanced { @apply
  text-foreground
}

.layout-resizable__aside-header { @apply
  flex
  items-center
  p-4
  gap-4
  justify-start
}

.layout-resizable__advanced .layout-resizable__aside { @apply
  dark:bg-background
  text-slate-50
}

.layout-resizable__advanced .layout-resizable__main { @apply
  dark:bg-background-100
}

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

.layout-resizable__aside-footer { @apply
  mt-auto
}
</style>

