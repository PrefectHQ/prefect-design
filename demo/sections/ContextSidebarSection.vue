<template>
  <p-context-sidebar>
    <template #header>
      <div class="flex flex-col py-3 sm:pt-0">
        <span class="font-normal text-sm mx-3">Prefect Design</span>
        <span class="font-bold text-base mx-3">UI Team Demo Collection</span>
      </div>
    </template>

    <template #upper-links>
      <router-link
        v-slot="{ href, navigate, isExactActive }"
        to="/components"
        custom
      >
        <p-context-nav-item :is-active="isExactActive" :href="href" title="Components" icon="HomeIcon" @click="navigate" />
      </router-link>
      <router-link
        v-slot="{ href, navigate, isExactActive }"
        to="/layouts"
        custom
      >
        <p-context-nav-item :is-active="isExactActive" :href="href" title="Layouts" icon="Flow" @click="navigate" />
      </router-link>
    </template>

    <template #bottom-links>
      <p-button inset class="my-3" @click="toggleGlobalSidebar">
        Show Global Sidebar
      </p-button>
    </template>
  </p-context-sidebar>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  const emit = defineEmits<{
    (event: 'update:value', value: boolean): void,
  }>()

  const showGlobalSidebar = ref(false)

  const toggleGlobalSidebar = (): void => {
    showGlobalSidebar.value = !showGlobalSidebar.value
    emit('update:value', showGlobalSidebar.value)
  }
</script>