<template>
  <p-context-sidebar>
    <template #header>
      <div class="flex flex-col pt-3 sm:pt-0">
        <span class="font-normal text-sm mx-3">Prefect Design</span>
        <span class="font-bold text-base mx-3">UI Team Demo Collection</span>
      </div>
      <hr class="border-none h-[1px] bg-slate-600 my-2 -mx-3">
    </template>

    <template #upper-links>
      <div class="flex flex-col gap-1">
        <p-context-nav-item title="Components" icon="PuzzleIcon" to="/components" />
        <hr class="border-none sm:h-0 sm:my-0 h-[1px] bg-slate-600 my-1 -mx-3">
        <p-context-nav-item title="Layouts" icon="TemplateIcon" to="/layouts" />
        <hr class="border-none sm:h-0 sm:my-0 h-[1px] bg-slate-600 my-1 -mx-3">
      </div>
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