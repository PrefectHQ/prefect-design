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
      <p-layout-resizable :collapse-point="50" class="layout-resizable">
        <template #aside="{ collapsed }">
          <div class="layout-resizable__aside" :class="{ 'layout-resizable__aside--collapsed': collapsed }" />
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
    { title: 'Collapse point' },
  ]
</script>


<style>
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
  bg-background
}

.layout-resizable__aside { @apply
  bg-background-900
}

.layout-resizable__aside--collapsed { @apply
  w-0
}
</style>

