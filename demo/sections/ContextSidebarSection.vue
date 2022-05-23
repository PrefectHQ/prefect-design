<template>
  <p-context-sidebar>
    <template #header>
      <div class="flex flex-col pt-3 sm:pt-0">
        <span class="font-normal text-sm mx-3">Prefect Design</span>
        <span class="font-bold text-base mx-3">UI Team Demo Collection</span>
      </div>
    </template>

    <p-context-nav-item title="Components" icon="PuzzleIcon" to="/components" />
    <p-context-nav-item title="Icons" icon="AdjustmentsIcon" to="/icons" />
    <p-context-divider />
    <p-context-nav-item title="Layouts" icon="TemplateIcon" to="/layouts" />

    <template #footer>
      <p-button inset class="justify-center" @click="toggleGlobalSidebar">
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