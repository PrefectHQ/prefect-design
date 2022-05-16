<template>
  <p-context-sidebar>
    <template #header>
      <div class="flex flex-col py-3 sm:pt-0">
        <span class="font-normal text-sm mx-3">Prefect Design</span>
        <span class="font-bold text-base mx-3">UI Team Demo Collection</span>
      </div>
    </template>

    <template #upper-links>
      <p-context-nav-item title="Components" icon="PuzzleIcon" to="/components" />
      <p-context-nav-item title="Layouts" icon="TemplateIcon" to="/layouts" />
    </template>

    <template #bottom-links>
      <p-button inset class="my-3 justify-center" @click="toggleGlobalSidebar">
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