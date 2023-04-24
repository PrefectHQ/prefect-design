<template>
  <div class="p-context-sidebar">
    <template v-if="$slots.header">
      <div class="p-context-sidebar__header">
        <slot name="header" />
      </div>
    </template>
    <div class="p-context-sidebar__body">
      <slot />
    </div>
    <template v-if="$slots.footer">
      <div class="p-context-sidebar__footer">
        <slot name="footer" />
      </div>
    </template>
  </div>
</template>

<style>
.p-context-sidebar { @apply
  bg-background-50
  text-slate-300
  fixed
  lg:sticky
  top-16
  lg:top-0
  bottom-0
  lg:bottom-auto
  w-screen
  flex
  flex-col
  lg:h-screen
  lg:w-64
}



.p-context-sidebar {
  z-index: var(--p-context-sidebar-z-index, 20)

}

.p-context-sidebar__header,
.p-context-sidebar__body,
.p-context-sidebar__footer { @apply
  p-3
  overflow-y-auto
}

.p-context-sidebar__header { @apply
  border-b-2
  border-slate-600
  flex-shrink-0
}

.p-context-sidebar__body,
.p-context-sidebar__footer { @apply
  grid
  gap-1
}

.p-context-sidebar__footer { @apply
  mt-auto
  border-t-2
  flex-shrink-0
  border-slate-600
}

.dark .context-sidebar {
  background: #15213D;
}

.p-context-sidebar__footer{
  border-top: solid 1px rgba(106,126,156,0.19);
}

.p-context-sidebar__header{
  border-bottom: solid 1px rgba(106,126,156,0.19);
}
</style>