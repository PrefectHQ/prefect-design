<template>
  <ComponentPage title="Nav" :demos="[{ title: 'Global Nav Item' }, { title: 'Global Sidebar' }]">
    <template #description>
      This is the global nav component
    </template>

    <template #global-nav-item>
      <p-global-nav-item :to="link" title="Home" icon="HomeIcon" />
    </template>

    <template #global-sidebar>
      <p-global-sidebar class="global-sidebar__sidebar">
        <template #upper-links>
          <router-link :to="link">
            <p-icon icon="Prefect" class="global-sidebar__prefect-icon" />
          </router-link>
          <router-link :to="link">
            <p-icon icon="HeartIcon" solid />
          </router-link>
          <router-link :to="link">
            <p-icon icon="SparklesIcon" solid />
          </router-link>
        </template>
      </p-global-sidebar>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const link = '#global-sidebar'
</script>

<style>
.global-sidebar__sidebar {
  max-height: 600px;
}

.global-sidebar__prefect-icon {
  @apply
  w-8
  h-8
}
</style>