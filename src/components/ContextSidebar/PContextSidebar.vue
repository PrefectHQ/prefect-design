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
  fixed
  lg:sticky
  top-16
  lg:top-0
  bottom-0
  lg:bottom-auto
  w-screen
  flex
  flex-col
  px-4
  lg:h-screen
  lg:w-64
}

.p-context-sidebar {
  z-index: var(--p-context-sidebar-z-index, 20)
}

.p-context-sidebar__header,
.p-context-sidebar__footer { @apply
  py-4
}

.p-context-sidebar__body { @apply
  py-3
  overflow-y-auto
}

.p-context-sidebar__header { @apply
  border-b
  border-divider
  flex-shrink-0
}

.p-context-sidebar__body,
.p-context-sidebar__footer { @apply
  grid
  gap-0.5
}

.p-context-sidebar__footer { @apply
  mt-auto
  border-t
  flex-shrink-0
  border-divider
}
</style>