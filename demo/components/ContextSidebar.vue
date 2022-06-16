<template>
  <p-context-sidebar>
    <template #header>
      <div class="flex flex-col pt-3 sm:pt-0">
        <span class="font-normal text-sm mx-3">Prefect Design</span>
        <span class="font-bold text-base mx-3">UI Team Demo Collection</span>
      </div>
    </template>

    <p-context-nav-item title="Components" icon="PuzzleIcon" to="/components" />
    <p-context-nav-item title="Tables" icon="TableIcon" to="/tables" />
    <p-context-nav-item title="Icons" icon="AdjustmentsIcon" to="/icons" />
    <p-context-divider />
    <p-context-nav-item title="Layouts" icon="TemplateIcon" to="/layouts" />
  </p-context-sidebar>
</template>