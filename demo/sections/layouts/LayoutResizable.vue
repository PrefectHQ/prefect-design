<template>
  <ComponentPage title="Resizable Layout" :demos="demos">
    <p-layout-resizable resizable class="layout-resizable">
      <template #aside>
        <div class="layout-resizable__aside" />
      </template>

      <div class="layout-resizable__main" />
    </p-layout-resizable>
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
</style>

