<template>
  <ComponentPage title="Resizable Layout" :demos="demos">
    <template #basic>
      <p-layout-resizable class="layout-resizable">
        <template #aside>
          <div class="layout-resizable__aside" />
        </template>

        <div class="layout-resizable__main" />
      </p-layout-resizable>
    </template>

    <template #collapse-point>
      <p-layout-resizable :collapse-point="100" class="layout-resizable__collapsible">
        <template #aside="{ collapsed }">
          <div class="layout-resizable__aside" :class="{ 'layout-resizable__aside--collapsed': collapsed }" />
        </template>

        <div class="layout-resizable__main" />
      </p-layout-resizable>
    </template>

    <template #advanced>
      <p-layout-resizable :collapse-point="248" class="layout-resizable__advanced">
        <template #aside="{ collapsed, toggle }">
          <div class="layout-resizable__aside" :class="{ 'layout-resizable__aside--collapsed': collapsed }">
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
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const demos = [
    { title: 'Basic' },
    { title: 'Collapse point', description: 'Collapse the aside when the divider is dragged to the left of the 100px mark.' },
    {
      title: 'Advanced',
    },
  ]
</script>


<style>
.layout-resizable__collapsible,
.layout-resizable__advanced,
.layout-resizable {
  --p-layout-resizable-aside-width: 256px;
  --p-layout-resizable-aside-max-width: 100%;
  --p-layout-resizable-aside-min-width: 0%;
}

.layout-resizable__aside,
.layout-resizable__main { @apply
  h-96
}

.layout-resizable__main { @apply
  bg-background-500
  dark:bg-background
}

.layout-resizable__aside { @apply
  bg-background-50
  dark:bg-background-900
  flex
  flex-col
}

.layout-resizable__collapsible {
  --p-layout-resizable-aside-min-width: 256px;
}

.layout-resizable__aside--collapsed { @apply
  w-16
}

.layout-resizable__advanced {
  --p-layout-resizable-aside-min-width: 196px;
  --p-layout-resizable-aside-max-width: 512px;
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

